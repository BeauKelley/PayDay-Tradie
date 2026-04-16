const USERS_KEY = "paydaytradie-users-v2";
const SESSION_KEY = "paydaytradie-session-v2";

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const demoForm = document.getElementById("demoForm");
const formNote = document.getElementById("formNote");
const year = document.getElementById("year");
const siteHeader = document.querySelector(".site-header");
const landingApp = document.getElementById("landingApp");
const workspaceApp = document.getElementById("workspaceApp");
const siteFooter = document.getElementById("siteFooter");
const signInButton = document.getElementById("signInButton");
const createAccountButton = document.getElementById("createAccountButton");
const signOutButton = document.getElementById("signOutButton");
const authOverlay = document.getElementById("authOverlay");
const authForm = document.getElementById("authForm");
const authTitle = document.getElementById("authTitle");
const authCopy = document.getElementById("authCopy");
const authModeLabel = document.getElementById("authModeLabel");
const authSubmitButton = document.getElementById("authSubmitButton");
const toggleAuthMode = document.getElementById("toggleAuthMode");
const closeAuthButton = document.getElementById("closeAuthButton");
const nameField = document.getElementById("nameField");
const workspaceTitle = document.getElementById("workspaceTitle");
const workspaceSubtitle = document.getElementById("workspaceSubtitle");
const invoiceTotal = document.getElementById("invoiceTotal");
const expenseTotal = document.getElementById("expenseTotal");
const gstTotal = document.getElementById("gstTotal");
const recordCount = document.getElementById("recordCount");
const recordsList = document.getElementById("recordsList");
const invoiceForm = document.getElementById("invoiceForm");
const expenseForm = document.getElementById("expenseForm");

let authMode = "signup";
let currentUser = null;

year.textContent = new Date().getFullYear();
initAuthStore();
bindEvents();
restoreSession();

function bindEvents() {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  createAccountButton.addEventListener("click", () => openAuth("signup"));
  signInButton.addEventListener("click", () => openAuth("signin"));
  toggleAuthMode.addEventListener("click", () => openAuth(authMode === "signup" ? "signin" : "signup"));
  closeAuthButton.addEventListener("click", closeAuth);
  signOutButton.addEventListener("click", signOut);
  authForm.addEventListener("submit", handleAuthSubmit);
  invoiceForm.addEventListener("submit", handleInvoiceSubmit);
  expenseForm.addEventListener("submit", handleExpenseSubmit);

  document.querySelectorAll("[data-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedPlan = button.dataset.plan;
      const messageField = demoForm.elements.message;
      const currentText = messageField.value.trim();
      const planText = `I'm interested in the ${selectedPlan} plan.`;
      messageField.value = currentText ? `${planText} ${currentText}` : planText;
    });
  });

  demoForm.addEventListener("submit", handleDemoSubmit);
}

function initAuthStore() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify({}));
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function restoreSession() {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return;
  const users = getUsers();
  if (users[email]) {
    currentUser = users[email];
    openWorkspace();
  }
}

function openAuth(mode) {
  authMode = mode;
  const isSignup = mode === "signup";
  siteNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");

  authModeLabel.textContent = isSignup ? "Create account" : "Sign in";
  authTitle.textContent = isSignup ? "Set up your PayDay Tradie login" : "Welcome back to PayDay Tradie";
  authCopy.textContent = isSignup
    ? "Create a local demo account saved in this browser, then jump into the accounting dashboard."
    : "Sign in with the local account you created in this browser to open your dashboard.";
  authSubmitButton.textContent = isSignup ? "Create account" : "Sign in";
  toggleAuthMode.textContent = isSignup ? "Already have an account? Sign in" : "Need an account? Create one";
  nameField.classList.toggle("hidden", !isSignup);
  nameField.querySelector("input").required = isSignup;
  authForm.reset();
  authOverlay.classList.remove("hidden");
  window.setTimeout(() => authForm.elements.email.focus(), 50);
}

function closeAuth() {
  authOverlay.classList.add("hidden");
}

function handleAuthSubmit(event) {
  event.preventDefault();

  const users = getUsers();
  const formData = new FormData(authForm);
  const name = String(formData.get("name") || "").trim() || "Tradie";
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (authMode === "signup") {
    if (users[email]) {
      authCopy.textContent = "That email already has an account in this browser. Switch to sign in.";
      return;
    }

    users[email] = {
      name,
      email,
      password,
      invoices: [
        { id: crypto.randomUUID(), client: "Southside Build Co", job: "Warehouse fit-off", amount: 18420, gst: 1674.55 },
      ],
      expenses: [
        { id: crypto.randomUUID(), supplier: "Bunnings", job: "Warehouse fit-off", amount: 286.9, gst: 26.08 },
      ],
    };
    saveUsers(users);
    currentUser = users[email];
    localStorage.setItem(SESSION_KEY, email);
    closeAuth();
    openWorkspace();
    return;
  }

  if (!users[email] || users[email].password !== password) {
    authCopy.textContent = "Sign in failed. Double-check your email and password or create a new account.";
    return;
  }

  currentUser = users[email];
  localStorage.setItem(SESSION_KEY, email);
  closeAuth();
  openWorkspace();
}

function openWorkspace() {
  siteHeader.classList.add("hidden");
  landingApp.classList.add("hidden");
  siteFooter.classList.add("hidden");
  workspaceApp.classList.remove("hidden");
  workspaceTitle.textContent = `G'day, ${currentUser.name}`;
  workspaceSubtitle.textContent = `${currentUser.email} is signed in. Add invoices and expenses below to keep your numbers tidy.`;
  renderWorkspace();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function signOut() {
  currentUser = null;
  localStorage.removeItem(SESSION_KEY);
  siteHeader.classList.remove("hidden");
  workspaceApp.classList.add("hidden");
  landingApp.classList.remove("hidden");
  siteFooter.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleInvoiceSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(invoiceForm));
  currentUser.invoices.unshift({
    id: crypto.randomUUID(),
    client: String(data.client).trim(),
    job: String(data.job).trim(),
    amount: Number(data.amount),
    gst: Number(data.gst),
  });
  persistCurrentUser();
  invoiceForm.reset();
  invoiceForm.elements.amount.value = "1250";
  invoiceForm.elements.gst.value = "125";
  renderWorkspace();
}

function handleExpenseSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(expenseForm));
  currentUser.expenses.unshift({
    id: crypto.randomUUID(),
    supplier: String(data.supplier).trim(),
    job: String(data.job).trim(),
    amount: Number(data.amount),
    gst: Number(data.gst),
  });
  persistCurrentUser();
  expenseForm.reset();
  expenseForm.elements.amount.value = "286.90";
  expenseForm.elements.gst.value = "26.08";
  renderWorkspace();
}

function persistCurrentUser() {
  const users = getUsers();
  users[currentUser.email] = currentUser;
  saveUsers(users);
}

function renderWorkspace() {
  const invoices = currentUser.invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const expenses = currentUser.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const gst = currentUser.invoices.reduce((sum, invoice) => sum + invoice.gst, 0)
    + currentUser.expenses.reduce((sum, expense) => sum + expense.gst, 0);
  const records = [
    ...currentUser.invoices.map((item) => ({ ...item, type: "Invoice", title: item.client })),
    ...currentUser.expenses.map((item) => ({ ...item, type: "Expense", title: item.supplier })),
  ];

  invoiceTotal.textContent = formatMoney(invoices);
  expenseTotal.textContent = formatMoney(expenses);
  gstTotal.textContent = formatMoney(gst);
  recordCount.textContent = `${records.length} records`;

  recordsList.innerHTML = records.map((record) => `
    <article class="record-row">
      <div>
        <span>${record.type} · ${record.job}</span>
        <strong>${record.title}</strong>
      </div>
      <p class="record-amount">${formatMoney(record.amount)}</p>
    </article>
  `).join("");
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

function handleDemoSubmit(event) {
  event.preventDefault();

  const formData = new FormData(demoForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const trade = String(formData.get("trade") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const subject = encodeURIComponent(`PayDay Tradie demo request from ${name}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Trade: ${trade}`,
      "",
      "What I want to fix first:",
      message || "I'd like a walkthrough of invoicing, expense tracking, GST/BAS support, and job costing.",
    ].join("\n")
  );

  formNote.textContent = "Opening your email app with a pre-filled demo request...";
  window.location.href = `mailto:hello@paydaytradie.com.au?subject=${subject}&body=${body}`;

  window.setTimeout(() => {
    formNote.textContent = "If your email app didn't open, email hello@paydaytradie.com.au and we'll tee up a demo.";
  }, 1200);
}
