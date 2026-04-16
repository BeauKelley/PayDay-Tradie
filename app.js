const STORE_KEY = "paydaytradie-app-v1";
const SESSION_KEY = "paydaytradie-session-v1";

const seedData = {
  jobs: [
    {
      id: crypto.randomUUID(),
      title: "Garden refresh",
      client: "Swan Plumbing",
      status: "In progress",
      amount: 3820,
      note: "Install edging and finish mulch tomorrow",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: "Fence install",
      client: "Hampton Build Co",
      status: "Completed",
      amount: 7460,
      note: "Ready to invoice final 50%",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: "Retaining wall quote",
      client: "Northside Homes",
      status: "Quote sent",
      amount: 11950,
      note: "Follow up with revised drainage allowance",
      createdAt: new Date().toISOString(),
    },
  ],
  invoices: [
    {
      id: crypto.randomUUID(),
      title: "Fence install progress claim",
      client: "Hampton Build Co",
      status: "Sent",
      amount: 3980,
      dueDate: offsetDate(5),
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: "Garden refresh final invoice",
      client: "Swan Plumbing",
      status: "Draft",
      amount: 1840,
      dueDate: offsetDate(12),
      createdAt: new Date().toISOString(),
    },
  ],
  receipts: [
    {
      id: crypto.randomUUID(),
      supplier: "Coles Express",
      job: "Garden refresh",
      amount: 74.35,
      gst: 6.76,
      date: offsetDate(-2),
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      supplier: "Bunnings",
      job: "Fence install",
      amount: 286.9,
      gst: 26.08,
      date: offsetDate(-6),
      createdAt: new Date().toISOString(),
    },
  ],
};

const els = {
  marketingApp: document.getElementById("marketingApp"),
  workspaceApp: document.getElementById("workspaceApp"),
  marketingNav: document.getElementById("marketingNav"),
  appNav: document.getElementById("appNav"),
  startFreeButton: document.getElementById("startFreeButton"),
  heroStartButton: document.getElementById("heroStartButton"),
  accountButton: document.getElementById("accountButton"),
  signOutButton: document.getElementById("signOutButton"),
  sidebarSignOutButton: document.getElementById("sidebarSignOutButton"),
  exportDataButton: document.getElementById("exportDataButton"),
  resetDemoButton: document.getElementById("resetDemoButton"),
  quickJobButton: document.getElementById("quickJobButton"),
  quickReceiptButton: document.getElementById("quickReceiptButton"),
  authOverlay: document.getElementById("authOverlay"),
  closeAuthButton: document.getElementById("closeAuthButton"),
  authTitle: document.getElementById("authTitle"),
  authCopy: document.getElementById("authCopy"),
  authForm: document.getElementById("authForm"),
  nameField: document.getElementById("nameField"),
  authSubmit: document.getElementById("authSubmit"),
  toggleAuthMode: document.getElementById("toggleAuthMode"),
  workspaceGreeting: document.getElementById("workspaceGreeting"),
  workspaceSubcopy: document.getElementById("workspaceSubcopy"),
  openJobsMetric: document.getElementById("openJobsMetric"),
  outstandingMetric: document.getElementById("outstandingMetric"),
  gstMetric: document.getElementById("gstMetric"),
  recordsKicker: document.getElementById("recordsKicker"),
  recordsTitle: document.getElementById("recordsTitle"),
  viewBanner: document.getElementById("viewBanner"),
  recordSearch: document.getElementById("recordSearch"),
  insightRow: document.getElementById("insightRow"),
  recordsList: document.getElementById("recordsList"),
  appToast: document.getElementById("appToast"),
  siteFooter: document.getElementById("siteFooter"),
};

let authMode = "signup";
let activeView = "overview";
let activeForm = "job";
let currentUser = null;
let toastTimer;

init();

function init() {
  ensureStore();
  setDefaultDates();
  bindEvents();
  const sessionEmail = localStorage.getItem(SESSION_KEY);
  if (sessionEmail) {
    const user = getStore().users[sessionEmail];
    if (user) {
      currentUser = user;
      openWorkspace("Welcome back. Your latest jobs and invoices are right where you left them.");
      return;
    }
  }
  showLanding();
}

function bindEvents() {
  els.startFreeButton.addEventListener("click", () => openAuth("signup"));
  els.heroStartButton.addEventListener("click", () => openAuth("signup"));
  els.accountButton.addEventListener("click", () => openAuth("login"));
  els.closeAuthButton.addEventListener("click", closeAuth);
  els.toggleAuthMode.addEventListener("click", () => openAuth(authMode === "signup" ? "login" : "signup"));
  els.authForm.addEventListener("submit", handleAuthSubmit);
  els.signOutButton.addEventListener("click", handleSignOut);
  els.sidebarSignOutButton.addEventListener("click", handleSignOut);
  els.exportDataButton.addEventListener("click", handleExportData);
  els.resetDemoButton.addEventListener("click", handleResetDemo);
  els.quickJobButton.addEventListener("click", () => {
    setActiveForm("job");
    activeView = "jobs";
    syncActiveTab();
    renderActiveView();
  });
  els.quickReceiptButton.addEventListener("click", () => {
    setActiveForm("receipt");
    activeView = "receipts";
    syncActiveTab();
    renderActiveView();
  });
  els.recordSearch.addEventListener("input", renderActiveView);

  document.querySelectorAll(".plan-button").forEach((button) => {
    button.addEventListener("click", () => openAuth("signup", button.dataset.plan));
  });

  document.querySelectorAll(".nav-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      els.recordSearch.value = "";
      syncActiveTab();
      renderActiveView();
    });
  });

  document.querySelectorAll(".side-link").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      els.recordSearch.value = "";
      syncActiveTab();
      renderActiveView();
    });
  });

  document.querySelectorAll(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveForm(button.dataset.form);
    });
  });

  document.getElementById("jobForm").addEventListener("submit", handleJobSubmit);
  document.getElementById("invoiceForm").addEventListener("submit", handleInvoiceSubmit);
  document.getElementById("receiptForm").addEventListener("submit", handleReceiptSubmit);
  els.viewBanner.addEventListener("click", handleViewAction);
  els.recordsList.addEventListener("click", handleRecordAction);
}

function ensureStore() {
  if (!localStorage.getItem(STORE_KEY)) {
    localStorage.setItem(STORE_KEY, JSON.stringify({ users: {} }));
  }
}

function getStore() {
  return JSON.parse(localStorage.getItem(STORE_KEY) || '{"users":{}}');
}

function saveStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function openAuth(mode, selectedPlan = "") {
  if (currentUser) {
    openWorkspace("You're already signed in. Here's your current workspace.");
    return;
  }

  authMode = mode;
  const isSignup = mode === "signup";
  els.authTitle.textContent = isSignup ? "Create your PayDay Tradie workspace" : "Sign in to your workspace";
  els.authCopy.textContent = isSignup
    ? `Start with a local account${selectedPlan ? ` on the ${selectedPlan} plan` : ""} and we’ll save your jobs, invoices, and receipts in this browser.`
    : "Use the account you created on this browser to open your saved dashboard.";
  els.nameField.classList.toggle("hidden", !isSignup);
  els.nameField.querySelector("input").required = isSignup;
  els.authSubmit.textContent = isSignup ? "Create workspace" : "Sign in";
  els.toggleAuthMode.textContent = isSignup ? "I already have an account" : "Create a new account";
  els.authForm.reset();
  els.authOverlay.classList.remove("hidden");
  setTimeout(() => els.authForm.email.focus(), 50);
}

function closeAuth() {
  els.authOverlay.classList.add("hidden");
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const formData = new FormData(els.authForm);
  const email = String(formData.get("email")).trim().toLowerCase();
  const password = String(formData.get("password"));
  const name = String(formData.get("name") || "").trim() || "Beau";
  const store = getStore();

  if (authMode === "signup") {
    if (store.users[email]) {
      showToast("That email already exists. Switch to sign in and use your password.");
      return;
    }

    store.users[email] = {
      email,
      password,
      name,
      company: `${name.split(" ")[0]}'s Trade Co`,
      data: structuredClone(seedData),
    };
    saveStore(store);
    currentUser = store.users[email];
    localStorage.setItem(SESSION_KEY, email);
    closeAuth();
    openWorkspace("Workspace created. Starter jobs and receipts are loaded so the dashboard feels alive straight away.");
    return;
  }

  const user = store.users[email];
  if (!user || user.password !== password) {
    showToast("Sign in failed. Double-check your email and password, or create a new workspace.");
    return;
  }

  currentUser = user;
  localStorage.setItem(SESSION_KEY, email);
  closeAuth();
  openWorkspace("Signed in. Your local workspace data is loaded.");
}

function handleSignOut() {
  currentUser = null;
  localStorage.removeItem(SESSION_KEY);
  showLanding();
  showToast("Signed out. Your workspace data stays saved in this browser.");
}

function openWorkspace(message) {
  document.body.classList.add("workspace-mode");
  els.marketingApp.classList.add("hidden");
  els.workspaceApp.classList.remove("hidden");
  els.marketingNav.classList.add("hidden");
  els.appNav.classList.remove("hidden");
  els.startFreeButton.classList.add("hidden");
  els.signOutButton.classList.remove("hidden");
  els.siteFooter.classList.add("hidden");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";
  els.workspaceGreeting.textContent = `G'day, ${currentUser.name}`;
  els.workspaceSubcopy.textContent = `${currentUser.company} is synced locally in this browser. Keep adding jobs, invoices, and receipts as you work.`;

  activeView = "overview";
  activeForm = "job";
  syncActiveTab();
  setActiveForm("job");
  els.recordSearch.value = "";
  setDefaultDates();
  renderActiveView();
  showToast(message);
}

function showLanding() {
  document.body.classList.remove("workspace-mode");
  els.marketingApp.classList.remove("hidden");
  els.workspaceApp.classList.add("hidden");
  els.marketingNav.classList.remove("hidden");
  els.appNav.classList.add("hidden");
  els.startFreeButton.classList.remove("hidden");
  els.signOutButton.classList.add("hidden");
  els.siteFooter.classList.remove("hidden");
}

function handleJobSubmit(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.currentTarget));
  mutateCurrentUser((data) => {
    data.jobs.unshift({
      id: crypto.randomUUID(),
      title: payload.title.trim(),
      client: payload.client.trim(),
      status: payload.status,
      amount: Number(payload.amount),
      note: payload.note.trim() || "No note added yet",
      createdAt: new Date().toISOString(),
    });
  });
  event.currentTarget.reset();
  showToast("Job saved. It’s now in your active pipeline.");
  activeView = "jobs";
  syncActiveTab();
  renderActiveView();
}

function handleInvoiceSubmit(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.currentTarget));
  mutateCurrentUser((data) => {
    data.invoices.unshift({
      id: crypto.randomUUID(),
      title: payload.title.trim(),
      client: payload.client.trim(),
      status: payload.status,
      amount: Number(payload.amount),
      dueDate: payload.dueDate,
      createdAt: new Date().toISOString(),
    });
  });
  event.currentTarget.reset();
  setDefaultDates();
  showToast("Invoice saved. You can mark it paid from the list.");
  activeView = "invoices";
  syncActiveTab();
  renderActiveView();
}

function handleReceiptSubmit(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.currentTarget));
  mutateCurrentUser((data) => {
    data.receipts.unshift({
      id: crypto.randomUUID(),
      supplier: payload.supplier.trim(),
      job: payload.job.trim() || "Unassigned",
      amount: Number(payload.amount),
      gst: Number(payload.gst),
      date: payload.date,
      createdAt: new Date().toISOString(),
    });
  });
  event.currentTarget.reset();
  setDefaultDates();
  showToast("Receipt filed. GST and supplier are now tracked.");
  activeView = "receipts";
  syncActiveTab();
  renderActiveView();
}

function mutateCurrentUser(updater) {
  const store = getStore();
  const freshUser = store.users[currentUser.email];
  updater(freshUser.data);
  store.users[currentUser.email] = freshUser;
  currentUser = freshUser;
  saveStore(store);
}

function renderActiveView() {
  if (!currentUser) return;
  const query = els.recordSearch.value.trim().toLowerCase();
  updateMetrics();
  const viewMeta = getViewMeta()[activeView];

  const viewConfig = {
    overview: {
      kicker: "Overview",
      title: "Recent activity",
      records: [
        ...currentUser.data.jobs.slice(0, 4).map((item) => ({ ...item, type: "job" })),
        ...currentUser.data.invoices.slice(0, 4).map((item) => ({ ...item, type: "invoice" })),
        ...currentUser.data.receipts.slice(0, 4).map((item) => ({ ...item, type: "receipt" })),
      ]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8),
    },
    jobs: {
      kicker: "Jobs",
      title: "Active job pipeline",
      records: currentUser.data.jobs.map((item) => ({ ...item, type: "job" })),
    },
    clients: {
      kicker: "Clients",
      title: "People and businesses you work with",
      records: buildClientRecords(),
    },
    quotes: {
      kicker: "Quotes",
      title: "Quotes to follow up and convert",
      records: currentUser.data.jobs
        .filter((job) => job.status === "Quote sent" || job.status === "In progress")
        .map((item) => ({ ...item, type: "quote" })),
    },
    invoices: {
      kicker: "Invoices",
      title: "Quotes, sent invoices, and payment status",
      records: currentUser.data.invoices.map((item) => ({ ...item, type: "invoice" })),
    },
    receipts: {
      kicker: "Receipts",
      title: "Supplier spend and GST capture",
      records: currentUser.data.receipts.map((item) => ({ ...item, type: "receipt" })),
    },
    reports: {
      kicker: "Reports",
      title: "Business overview and BAS-ready totals",
      records: buildReportRecords(),
    },
    settings: {
      kicker: "Settings",
      title: "Workspace preferences and local account details",
      records: buildSettingsRecords(),
    },
  };

  const config = viewConfig[activeView];
  els.recordsKicker.textContent = config.kicker;
  els.recordsTitle.textContent = config.title;
  els.recordSearch.placeholder = viewMeta.searchPlaceholder;
  renderViewBanner(viewMeta);
  renderInsights();

  const filteredRecords = config.records.filter((record) => {
    const haystack = Object.values(record).join(" ").toLowerCase();
    return !query || haystack.includes(query);
  });

  if (!filteredRecords.length) {
    els.recordsList.innerHTML = `<div class="empty-state">No matches yet. Add something in Quick add or clear the search box.</div>`;
    return;
  }

  els.recordsList.innerHTML = filteredRecords.map(renderRecordCard).join("");
}

function renderInsights() {
  const { jobs, invoices, receipts } = currentUser.data;
  const jobsDone = jobs.filter((job) => job.status === "Completed" || job.status === "Paid").length;
  const invoicesPaid = invoices.filter((invoice) => invoice.status === "Paid").length;
  const recentSpend = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  els.insightRow.innerHTML = `
    <article class="insight-chip"><span>Jobs completed</span><strong>${jobsDone}/${jobs.length}</strong></article>
    <article class="insight-chip"><span>Invoices paid</span><strong>${invoicesPaid}/${invoices.length}</strong></article>
    <article class="insight-chip"><span>Receipt spend</span><strong>${formatMoney(recentSpend)}</strong></article>
  `;
}

function getViewMeta() {
  return {
    overview: {
      heading: "What do you want to do now?",
      copy: "Pick one job and follow the prompts. Step by step.",
      searchPlaceholder: "Search everything",
      actions: [
        { label: "New job", action: "open-job-form", primary: true },
        { label: "Add client", action: "open-clients" },
        { label: "Create quote", action: "open-quote-form" },
        { label: "Create invoice", action: "open-invoice-form" },
        { label: "Log expense", action: "open-receipt-form" },
      ],
    },
    jobs: {
      heading: "Jobs board",
      copy: "Track quote sent, in progress, completed, and paid jobs without losing the next step.",
      searchPlaceholder: "Search jobs or clients",
      actions: [
        { label: "New job", action: "open-job-form", primary: true },
        { label: "Review quotes", action: "open-quotes" },
      ],
    },
    clients: {
      heading: "Client book",
      copy: "See who you work for most, how many jobs they have, and where money is still outstanding.",
      searchPlaceholder: "Search client names",
      actions: [
        { label: "New client job", action: "open-job-form", primary: true },
        { label: "Create invoice", action: "open-invoice-form" },
      ],
    },
    quotes: {
      heading: "Quote pipeline",
      copy: "Keep new quotes moving and convert accepted work into jobs and invoices fast.",
      searchPlaceholder: "Search quotes or clients",
      actions: [
        { label: "Create quote", action: "open-quote-form", primary: true },
        { label: "Create invoice", action: "open-invoice-form" },
      ],
    },
    invoices: {
      heading: "Invoice tracker",
      copy: "Send, chase, and mark invoices paid so cash flow stays clear before BAS.",
      searchPlaceholder: "Search invoices or clients",
      actions: [
        { label: "Create invoice", action: "open-invoice-form", primary: true },
        { label: "Review reports", action: "open-reports" },
      ],
    },
    receipts: {
      heading: "Expense vault",
      copy: "Log supplier receipts, attach them to jobs, and keep GST captured while you're on site.",
      searchPlaceholder: "Search suppliers or jobs",
      actions: [
        { label: "Quick receipt", action: "open-receipt-form", primary: true },
        { label: "Open reports", action: "open-reports" },
      ],
    },
    reports: {
      heading: "Business reports",
      copy: "Review revenue pipeline, expense totals, GST, and job conversion in one BAS-ready view.",
      searchPlaceholder: "Search reports",
      actions: [
        { label: "Export data", action: "export-data", primary: true },
        { label: "Back to dashboard", action: "open-overview" },
      ],
    },
    settings: {
      heading: "Workspace settings",
      copy: "Manage your local demo workspace, export a backup, or reset starter data while we build the cloud backend.",
      searchPlaceholder: "Search settings",
      actions: [
        { label: "Export backup", action: "export-data", primary: true },
        { label: "Reset demo", action: "reset-demo" },
      ],
    },
  };
}

function renderViewBanner(meta) {
  els.viewBanner.innerHTML = `
    <div>
      <h4>${escapeHtml(meta.heading)}</h4>
      <p>${escapeHtml(meta.copy)}</p>
    </div>
    <div class="view-actions">
      ${meta.actions
        .map(
          (item) => `
            <button class="view-action-btn ${item.primary ? "primary" : ""}" type="button" data-view-action="${item.action}">
              ${escapeHtml(item.label)}
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function handleViewAction(event) {
  const button = event.target.closest("button[data-view-action]");
  if (!button) return;

  const actions = {
    "open-job-form": () => {
      setActiveForm("job");
      activeView = "jobs";
      syncActiveTab();
      renderActiveView();
    },
    "open-clients": () => {
      activeView = "clients";
      syncActiveTab();
      renderActiveView();
    },
    "open-quotes": () => {
      activeView = "quotes";
      syncActiveTab();
      renderActiveView();
    },
    "open-quote-form": () => {
      setActiveForm("job");
      document.querySelector('#jobForm select[name="status"]').value = "Quote sent";
      activeView = "quotes";
      syncActiveTab();
      renderActiveView();
      showToast("Use Save job to add this as a quote, then Convert when it gets accepted.");
    },
    "open-invoice-form": () => {
      setActiveForm("invoice");
      activeView = "invoices";
      syncActiveTab();
      renderActiveView();
    },
    "open-receipt-form": () => {
      setActiveForm("receipt");
      activeView = "receipts";
      syncActiveTab();
      renderActiveView();
    },
    "open-reports": () => {
      activeView = "reports";
      syncActiveTab();
      renderActiveView();
    },
    "open-overview": () => {
      activeView = "overview";
      syncActiveTab();
      renderActiveView();
    },
    "export-data": handleExportData,
    "reset-demo": handleResetDemo,
  };

  actions[button.dataset.viewAction]?.();
}

function buildClientRecords() {
  const clientMap = new Map();
  currentUser.data.jobs.forEach((job) => {
    const entry = clientMap.get(job.client) || {
      type: "client",
      client: job.client,
      jobCount: 0,
      invoiceCount: 0,
      totalQuoted: 0,
      totalOutstanding: 0,
      lastDate: job.createdAt.slice(0, 10),
    };
    entry.jobCount += 1;
    entry.totalQuoted += job.amount;
    if (job.status !== "Paid") entry.totalOutstanding += job.amount;
    if (new Date(job.createdAt) > new Date(`${entry.lastDate}T00:00:00`)) {
      entry.lastDate = job.createdAt.slice(0, 10);
    }
    clientMap.set(job.client, entry);
  });

  currentUser.data.invoices.forEach((invoice) => {
    const entry = clientMap.get(invoice.client) || {
      type: "client",
      client: invoice.client,
      jobCount: 0,
      invoiceCount: 0,
      totalQuoted: 0,
      totalOutstanding: 0,
      lastDate: invoice.createdAt.slice(0, 10),
    };
    entry.invoiceCount += 1;
    if (invoice.status !== "Paid") entry.totalOutstanding += invoice.amount;
    if (new Date(invoice.createdAt) > new Date(`${entry.lastDate}T00:00:00`)) {
      entry.lastDate = invoice.createdAt.slice(0, 10);
    }
    clientMap.set(invoice.client, entry);
  });

  return [...clientMap.values()].sort((a, b) => b.totalOutstanding - a.totalOutstanding);
}

function buildReportRecords() {
  const { jobs, invoices, receipts } = currentUser.data;
  const quotedTotal = jobs.reduce((sum, job) => sum + job.amount, 0);
  const invoicedTotal = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const expenseTotal = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  const gstTotal = receipts.reduce((sum, receipt) => sum + receipt.gst, 0);

  return [
    {
      type: "report",
      period: "This month",
      title: "Revenue pipeline",
      description: `${jobs.length} jobs tracked and ${invoices.length} invoices created from this workspace.`,
      value: formatMoney(quotedTotal + invoicedTotal),
      badge: "Live",
    },
    {
      type: "report",
      period: "This month",
      title: "Expense and GST summary",
      description: `${receipts.length} receipts logged and ready for BAS review.`,
      value: formatMoney(expenseTotal),
      badge: `GST ${formatMoney(gstTotal)}`,
    },
    {
      type: "report",
      period: "Workflow",
      title: "Conversion tracker",
      description: "Use Advance on quote/job cards to move work from quote sent to paid.",
      value: `${jobs.filter((job) => job.status === "Paid").length}/${jobs.length}`,
      badge: "Jobs paid",
    },
  ];
}

function buildSettingsRecords() {
  return [
    {
      type: "setting",
      title: "Signed-in user",
      description: "This is the local browser account currently loaded into the app.",
      value: currentUser.email,
    },
    {
      type: "setting",
      title: "Business profile",
      description: "Used in greetings and dashboard labels while this rebuild is local-first.",
      value: currentUser.company,
    },
    {
      type: "setting",
      title: "Storage mode",
      description: "Your current rebuild stores data in browser localStorage until we add a real backend.",
      value: "Local only",
    },
  ];
}

function renderRecordCard(record) {
  if (record.type === "client") {
    return `
      <article class="record-card">
        <div>
          <div class="record-meta">Client | ${record.jobCount} jobs</div>
          <h4>${escapeHtml(record.client)}</h4>
          <p class="metric-label">${record.invoiceCount} invoices issued | Last activity ${formatDate(record.lastDate)}</p>
        </div>
        <div class="record-side">
          <span class="tag sent">${formatMoney(record.totalQuoted)} quoted</span>
          <div class="record-amount">${formatMoney(record.totalOutstanding)}</div>
        </div>
      </article>
    `;
  }

  if (record.type === "quote") {
    return `
      <article class="record-card">
        <div>
          <div class="record-meta">Quote | ${escapeHtml(record.client)}</div>
          <h4>${escapeHtml(record.title)}</h4>
          <p class="metric-label">${escapeHtml(record.note)}</p>
        </div>
        <div class="record-side">
          <span class="tag ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
          <div class="record-amount">${formatMoney(record.amount)}</div>
          <div class="record-actions">
            <button class="mini-button" type="button" data-action="advance-job" data-id="${record.id}">Convert</button>
          </div>
        </div>
      </article>
    `;
  }

  if (record.type === "report") {
    return `
      <article class="record-card">
        <div>
          <div class="record-meta">Report | ${escapeHtml(record.period)}</div>
          <h4>${escapeHtml(record.title)}</h4>
          <p class="metric-label">${escapeHtml(record.description)}</p>
        </div>
        <div class="record-side">
          <span class="tag paid">${escapeHtml(record.badge)}</span>
          <div class="record-amount">${escapeHtml(record.value)}</div>
        </div>
      </article>
    `;
  }

  if (record.type === "setting") {
    return `
      <article class="record-card">
        <div>
          <div class="record-meta">Setting | Local workspace</div>
          <h4>${escapeHtml(record.title)}</h4>
          <p class="metric-label">${escapeHtml(record.description)}</p>
        </div>
        <div class="record-side">
          <span class="tag sent">${escapeHtml(record.value)}</span>
        </div>
      </article>
    `;
  }

  if (record.type === "job") {
    return `
      <article class="record-card">
        <div>
          <div class="record-meta">Job | ${escapeHtml(record.client)}</div>
          <h4>${escapeHtml(record.title)}</h4>
          <p class="metric-label">${escapeHtml(record.note)}</p>
        </div>
        <div class="record-side">
          <span class="tag ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
          <div class="record-amount">${formatMoney(record.amount)}</div>
          <div class="record-actions">
            <button class="mini-button" type="button" data-action="advance-job" data-id="${record.id}">Advance</button>
            <button class="mini-button" type="button" data-action="delete-job" data-id="${record.id}">Delete</button>
          </div>
        </div>
      </article>
    `;
  }

  if (record.type === "invoice") {
    return `
      <article class="record-card">
        <div>
          <div class="record-meta">Invoice | ${escapeHtml(record.client)}</div>
          <h4>${escapeHtml(record.title)}</h4>
          <p class="metric-label">Due ${formatDate(record.dueDate)}</p>
        </div>
        <div class="record-side">
          <span class="tag ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
          <div class="record-amount">${formatMoney(record.amount)}</div>
          <div class="record-actions">
            <button class="mini-button" type="button" data-action="pay-invoice" data-id="${record.id}">Mark paid</button>
            <button class="mini-button" type="button" data-action="delete-invoice" data-id="${record.id}">Delete</button>
          </div>
        </div>
      </article>
    `;
  }

  return `
    <article class="record-card">
      <div>
        <div class="record-meta">Receipt | ${escapeHtml(record.job)}</div>
        <h4>${escapeHtml(record.supplier)}</h4>
        <p class="metric-label">Purchased ${formatDate(record.date)} | GST ${formatMoney(record.gst)}</p>
      </div>
      <div class="record-side">
        <span class="tag paid">Filed</span>
        <div class="record-amount">${formatMoney(record.amount)}</div>
        <div class="record-actions">
          <button class="mini-button" type="button" data-action="delete-receipt" data-id="${record.id}">Delete</button>
        </div>
      </div>
    </article>
  `;
}

function handleRecordAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button || !currentUser) return;

  const { action, id } = button.dataset;
  const jobFlow = ["Quote sent", "In progress", "Completed", "Paid"];

  mutateCurrentUser((data) => {
    if (action === "advance-job") {
      const job = data.jobs.find((item) => item.id === id);
      if (!job) return;
      const nextIndex = Math.min(jobFlow.indexOf(job.status) + 1, jobFlow.length - 1);
      job.status = jobFlow[nextIndex];
      job.note = job.status === "Paid" ? "Nice work. This one has been paid." : `Moved to ${job.status.toLowerCase()}.`;
    }

    if (action === "delete-job") {
      data.jobs = data.jobs.filter((item) => item.id !== id);
    }

    if (action === "pay-invoice") {
      const invoice = data.invoices.find((item) => item.id === id);
      if (invoice) invoice.status = "Paid";
    }

    if (action === "delete-invoice") {
      data.invoices = data.invoices.filter((item) => item.id !== id);
    }

    if (action === "delete-receipt") {
      data.receipts = data.receipts.filter((item) => item.id !== id);
    }
  });

  showToast("Updated.");
  renderActiveView();
}

function updateMetrics() {
  const { jobs, invoices, receipts } = currentUser.data;
  const openJobs = jobs.filter((job) => job.status !== "Paid").length;
  const outstanding = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const gst = receipts.reduce((sum, receipt) => sum + receipt.gst, 0);
  els.openJobsMetric.textContent = String(openJobs);
  els.outstandingMetric.textContent = formatMoney(outstanding);
  els.gstMetric.textContent = formatMoney(gst);
}

function setActiveForm(formName) {
  activeForm = formName;
  document.querySelectorAll(".segment").forEach((segment) => {
    segment.classList.toggle("active", segment.dataset.form === activeForm);
  });
  document.querySelectorAll("[data-record-form]").forEach((form) => {
    form.classList.toggle("hidden", form.dataset.recordForm !== activeForm);
  });
}

function setDefaultDates() {
  const dueDateInput = document.querySelector('#invoiceForm input[name="dueDate"]');
  const receiptDateInput = document.querySelector('#receiptForm input[name="date"]');
  if (dueDateInput) dueDateInput.value = offsetDate(14);
  if (receiptDateInput) receiptDateInput.value = offsetDate(0);
}

function syncActiveTab() {
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === activeView);
  });
  document.querySelectorAll(".side-link").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === activeView);
  });
}

function handleExportData() {
  if (!currentUser) return;
  const payload = JSON.stringify(currentUser.data, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `payday-tradie-${currentUser.name.toLowerCase().replaceAll(" ", "-")}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Exported your local workspace data as a JSON file.");
}

function handleResetDemo() {
  if (!currentUser) return;
  mutateCurrentUser((data) => {
    data.jobs = structuredClone(seedData.jobs);
    data.invoices = structuredClone(seedData.invoices);
    data.receipts = structuredClone(seedData.receipts);
  });
  activeView = "overview";
  syncActiveTab();
  setActiveForm("job");
  renderActiveView();
  showToast("Demo data reset to the starter PayDay Tradie workspace.");
}

function showToast(message) {
  els.appToast.textContent = message;
  els.appToast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.appToast.classList.remove("visible");
  }, 3200);
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function offsetDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function statusClass(status) {
  const map = {
    Paid: "paid",
    Sent: "sent",
    "Quote sent": "sent",
    "In progress": "sent",
    Draft: "draft",
    Overdue: "draft",
    Completed: "paid",
  };
  return map[status] || "paid";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
