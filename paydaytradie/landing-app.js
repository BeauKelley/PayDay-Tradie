const USERS_KEY = "paydaytradie-users-v3";
const SESSION_KEY = "paydaytradie-session-v3";
const PLAN_ORDER = ["Starter", "Crew", "Business"];
const PLAN_DEFINITIONS = {
  Starter: {
    rank: 0,
    maxUsers: 1,
    features: [
      "clientsPage",
      "jobsPage",
      "quotesPage",
      "invoicesPage",
      "expensesPage",
      "settingsBasic",
      "receiptCapture",
      "jobNotes",
      "overdueInvoiceView",
    ],
  },
  Crew: {
    rank: 1,
    maxUsers: 5,
    features: [
      "teamJobBoard",
      "jobProfitability",
      "overdueReminders",
      "payrollPage",
      "payrollExports",
      "dashboardCrewInsights",
    ],
  },
  Business: {
    rank: 2,
    maxUsers: 15,
    features: [
      "staffPermissions",
      "businessReporting",
      "compareActiveJobs",
      "invoiceApprovalControls",
      "sharedTemplates",
      "adminOversight",
      "dashboardBusinessInsights",
    ],
  },
};
const WORKSPACE_PAGE_FEATURES = {
  "workspace-payroll": "payrollPage",
  "workspace-reports": "businessReporting",
};
const FEATURE_UPGRADE_PLAN = {
  payrollPage: "Crew",
  payrollExports: "Crew",
  teamJobBoard: "Crew",
  jobProfitability: "Crew",
  overdueReminders: "Crew",
  businessReporting: "Business",
  compareActiveJobs: "Business",
  invoiceApprovalControls: "Business",
  sharedTemplates: "Business",
  staffPermissions: "Business",
  adminOversight: "Business",
};
const PLAN_MARKETING = {
  Starter: {
    price: "$19/month",
    audience: "Solo tradie essentials",
    summary: "Quotes, invoices, receipts, GST totals, client details, job notes, and overdue invoice tracking.",
    features: [
      "1 user",
      "Unlimited quotes and invoices",
      "Receipt capture with GST totals",
      "Client list and job notes",
      "Overdue invoice tracking",
    ],
  },
  Crew: {
    price: "$39/month",
    audience: "Run jobs with a small crew",
    summary: "Assigned jobs, a real team board, job profitability, overdue reminders, payroll, and payroll-ready exports.",
    features: [
      "Up to 5 workers",
      "Assigned jobs and team job board",
      "Job profitability by job",
      "Overdue reminders",
      "Payroll-ready exports",
    ],
  },
  Business: {
    price: "$69/month",
    audience: "Run staff and jobs with more control",
    summary: "Business-wide reporting, active job comparison, invoice approvals, and shared business settings.",
    features: [
      "Up to 15 staff",
      "Business-wide reporting across jobs, invoices, expenses, and payroll",
      "Compare all active jobs in one view",
      "Invoice approval controls",
      "Shared settings and invoice defaults",
    ],
  },
};
const LOCKED_FEATURE_CONTENT = {
  payrollPage: {
    title: "Payroll",
    intro: "",
    detail: "Unlock payroll to manage wages, labour, and staff payments.",
    eyebrow: "Payroll locked",
    pageId: "workspace-payroll",
    buttonLabel: "Upgrade plan",
  },
  businessReporting: {
    title: "Reports are available on Business plan",
    intro: "",
    detail: "See profit across jobs, unpaid money, expenses, payroll, and business performance in one place.",
    eyebrow: "Reports locked",
    pageId: "workspace-reports",
    buttonLabel: "Upgrade plan",
  },
  staffPermissions: {
    title: "This feature is not included in your current plan",
    intro: "Upgrade to unlock this feature.",
    detail: "Staff permissions and admin access levels are available on the Business plan.",
    eyebrow: "Team access locked",
    buttonLabel: "Upgrade plan",
  },
  invoiceApprovalControls: {
    title: "This feature is not included in your current plan",
    intro: "Upgrade to unlock this feature.",
    detail: "Invoice approval controls before sending are available on the Business plan.",
    eyebrow: "Invoice approvals locked",
    buttonLabel: "Upgrade plan",
  },
};

const els = {
  navToggle: document.getElementById("navToggle"),
  siteNav: document.getElementById("siteNav"),
  siteHeader: document.querySelector(".site-header"),
  landingApp: document.getElementById("landingApp"),
  workspaceApp: document.getElementById("workspaceApp"),
  siteFooter: document.getElementById("siteFooter"),
  signInButton: document.getElementById("signInButton"),
  createAccountButton: document.getElementById("createAccountButton"),
  signOutButton: document.getElementById("signOutButton"),
  authOverlay: document.getElementById("authOverlay"),
  authForm: document.getElementById("authForm"),
  authTitle: document.getElementById("authTitle"),
  authCopy: document.getElementById("authCopy"),
  authModeLabel: document.getElementById("authModeLabel"),
  authSubmitButton: document.getElementById("authSubmitButton"),
  toggleAuthMode: document.getElementById("toggleAuthMode"),
  closeAuthButton: document.getElementById("closeAuthButton"),
  pricingModalOverlay: document.getElementById("pricingModalOverlay"),
  closePricingModalButton: document.getElementById("closePricingModalButton"),
  pricingModalCards: document.getElementById("pricingModalCards"),
  pricingModalTitle: document.getElementById("pricingModalTitle"),
  pricingModalCopy: document.getElementById("pricingModalCopy"),
  upgradeModalOverlay: document.getElementById("upgradeModalOverlay"),
  closeUpgradeModalButton: document.getElementById("closeUpgradeModalButton"),
  cancelUpgradeModalButton: document.getElementById("cancelUpgradeModalButton"),
  upgradeModalTitle: document.getElementById("upgradeModalTitle"),
  upgradeModalCopy: document.getElementById("upgradeModalCopy"),
  upgradeModalPrice: document.getElementById("upgradeModalPrice"),
  upgradeModalFeatureList: document.getElementById("upgradeModalFeatureList"),
  confirmUpgradeButton: document.getElementById("confirmUpgradeButton"),
  nameField: document.getElementById("nameField"),
  workspaceTitle: document.getElementById("workspaceTitle"),
  workspaceSubtitle: document.getElementById("workspaceSubtitle"),
  workspacePlanBadge: document.getElementById("workspacePlanBadge"),
  workspacePlanCopy: document.getElementById("workspacePlanCopy"),
  dashboardHeroCard1Label: document.getElementById("dashboardHeroCard1Label"),
  dashboardHeroCard1Copy: document.getElementById("dashboardHeroCard1Copy"),
  dashboardHeroCard2Label: document.getElementById("dashboardHeroCard2Label"),
  dashboardHeroCard2Copy: document.getElementById("dashboardHeroCard2Copy"),
  dashboardHeroCard3Label: document.getElementById("dashboardHeroCard3Label"),
  dashboardHeroCard4Label: document.getElementById("dashboardHeroCard4Label"),
  taxSafetyLabel: document.getElementById("taxSafetyLabel"),
  dashboardUrgentUnpaid: document.getElementById("dashboardUrgentUnpaid"),
  dashboardUrgentUnpaidCopy: document.getElementById("dashboardUrgentUnpaidCopy"),
  dashboardUrgentMargin: document.getElementById("dashboardUrgentMargin"),
  dashboardUrgentMarginCopy: document.getElementById("dashboardUrgentMarginCopy"),
  dashboardUrgentTax: document.getElementById("dashboardUrgentTax"),
  dashboardUrgentTaxCopy: document.getElementById("dashboardUrgentTaxCopy"),
  moneyAvailable: document.getElementById("moneyAvailable"),
  taxSaved: document.getElementById("taxSaved"),
  invoiceTotal: document.getElementById("invoiceTotal"),
  expenseTotal: document.getElementById("expenseTotal"),
  quoteCount: document.getElementById("quoteCount"),
  quotesList: document.getElementById("quotesList"),
  quoteForm: document.getElementById("quoteForm"),
  quoteSearchInput: document.getElementById("quoteSearchInput"),
  quoteSourceSelect: document.getElementById("quoteSourceSelect"),
  quoteClientSelect: document.getElementById("quoteClientSelect"),
  quoteClientPhone: document.getElementById("quoteClientPhone"),
  quoteClientEmail: document.getElementById("quoteClientEmail"),
  quoteJobNameInput: document.getElementById("quoteJobNameInput"),
  quoteSiteAddressInput: document.getElementById("quoteSiteAddressInput"),
  quoteDescriptionInput: document.getElementById("quoteDescriptionInput"),
  quoteDescriptionQuickSuggestions: document.getElementById("quoteDescriptionQuickSuggestions"),
  quoteLabourItemsInput: document.getElementById("quoteLabourItemsInput"),
  quoteLabourQuickSuggestions: document.getElementById("quoteLabourQuickSuggestions"),
  quoteMaterialItemsInput: document.getElementById("quoteMaterialItemsInput"),
  quoteMaterialQuickSuggestions: document.getElementById("quoteMaterialQuickSuggestions"),
  quoteLabourAmountInput: document.getElementById("quoteLabourAmountInput"),
  quoteMaterialAmountInput: document.getElementById("quoteMaterialAmountInput"),
  quoteGstInput: document.getElementById("quoteGstInput"),
  quoteTotalInput: document.getElementById("quoteTotalInput"),
  quoteNotesInput: document.getElementById("quoteNotesInput"),
  quoteExpiryInput: document.getElementById("quoteExpiryInput"),
  quoteResetButton: document.getElementById("quoteResetButton"),
  quoteStartOptions: document.querySelectorAll("[data-quote-start]"),
  quoteClientSearchWrap: document.getElementById("quoteClientSearchWrap"),
  quoteClientSearchInput: document.getElementById("quoteClientSearchInput"),
  quoteClientContext: document.getElementById("quoteClientContext"),
  quoteBlankActionsWrap: document.getElementById("quoteBlankActionsWrap"),
  quoteRepeatWrap: document.getElementById("quoteRepeatWrap"),
  quoteRepeatSelect: document.getElementById("quoteRepeatSelect"),
  quotePreviewOverlay: document.getElementById("quotePreviewOverlay"),
  quotePreviewContent: document.getElementById("quotePreviewContent"),
  closeQuotePreviewButton: document.getElementById("closeQuotePreviewButton"),
  sendQuotePreviewButton: document.getElementById("sendQuotePreviewButton"),
  quoteSummaryLabour: document.getElementById("quoteSummaryLabour"),
  quoteSummaryMaterials: document.getElementById("quoteSummaryMaterials"),
  quoteSummaryMargin: document.getElementById("quoteSummaryMargin"),
  quoteSummaryGst: document.getElementById("quoteSummaryGst"),
  quoteSummaryTotal: document.getElementById("quoteSummaryTotal"),
  invoiceCount: document.getElementById("invoiceCount"),
  invoicesList: document.getElementById("invoicesList"),
  invoiceSummaryUnpaid: document.getElementById("invoiceSummaryUnpaid"),
  invoiceSummaryOverdue: document.getElementById("invoiceSummaryOverdue"),
  invoiceSummaryPaid: document.getElementById("invoiceSummaryPaid"),
  invoiceSearchInput: document.getElementById("invoiceSearchInput"),
  invoiceStartOptions: document.querySelectorAll("[data-invoice-start]"),
  invoiceJobSourceWrap: document.getElementById("invoiceJobSourceWrap"),
  invoiceQuoteSourceWrap: document.getElementById("invoiceQuoteSourceWrap"),
  invoiceDuplicateWrap: document.getElementById("invoiceDuplicateWrap"),
  expenseCount: document.getElementById("expenseCount"),
  expensesList: document.getElementById("expensesList"),
  expenseSummaryMonth: document.getElementById("expenseSummaryMonth"),
  expenseSummaryMaterials: document.getElementById("expenseSummaryMaterials"),
  expenseSummaryFuel: document.getElementById("expenseSummaryFuel"),
  expenseSummaryUncategorised: document.getElementById("expenseSummaryUncategorised"),
  expenseSearchInput: document.getElementById("expenseSearchInput"),
  expenseCategoryFilter: document.getElementById("expenseCategoryFilter"),
  expenseJobFilter: document.getElementById("expenseJobFilter"),
  expensePaymentFilter: document.getElementById("expensePaymentFilter"),
  expenseDateFrom: document.getElementById("expenseDateFrom"),
  expenseDateTo: document.getElementById("expenseDateTo"),
  reportsGrid: document.getElementById("reportsGrid"),
  exportReportsButton: document.getElementById("exportReportsButton"),
  reportDateRangeSelect: document.getElementById("reportDateRangeSelect"),
  reportJobFilter: document.getElementById("reportJobFilter"),
  reportClientFilter: document.getElementById("reportClientFilter"),
  reportCategoryFilter: document.getElementById("reportCategoryFilter"),
  reportTeamFilter: document.getElementById("reportTeamFilter"),
  reportProfitJobs: document.getElementById("reportProfitJobs"),
  reportActiveJobsCompare: document.getElementById("reportActiveJobsCompare"),
  reportCashFlowBars: document.getElementById("reportCashFlowBars"),
  reportExpenseBreakdown: document.getElementById("reportExpenseBreakdown"),
  reportInvoicePerformance: document.getElementById("reportInvoicePerformance"),
  reportMainInsight: document.getElementById("reportMainInsight"),
  reportSecondaryInsight: document.getElementById("reportSecondaryInsight"),
  exportPayrollButton: document.getElementById("exportPayrollButton"),
  runPayrollButton: document.getElementById("runPayrollButton"),
  payrollNextDate: document.getElementById("payrollNextDate"),
  payrollCycleTotal: document.getElementById("payrollCycleTotal"),
  payrollSuperDue: document.getElementById("payrollSuperDue"),
  payrollStaffCount: document.getElementById("payrollStaffCount"),
  payrollSearchInput: document.getElementById("payrollSearchInput"),
  payrollEmployeeForm: document.getElementById("payrollEmployeeForm"),
  payrollOpenEmployeeModalButton: document.getElementById("payrollOpenEmployeeModalButton"),
  payrollCopyLastWeekButton: document.getElementById("payrollCopyLastWeekButton"),
  payrollAddOvertimeButton: document.getElementById("payrollAddOvertimeButton"),
  payrollAddAllowanceButton: document.getElementById("payrollAddAllowanceButton"),
  payrollQuickWorker: document.getElementById("payrollQuickWorker"),
  payrollQuickHours: document.getElementById("payrollQuickHours"),
  payrollQuickRate: document.getElementById("payrollQuickRate"),
  payrollQuickTotal: document.getElementById("payrollQuickTotal"),
  payrollLastPayInput: document.getElementById("payrollLastPayInput"),
  payrollHistoryDateFilter: document.getElementById("payrollHistoryDateFilter"),
  payrollList: document.getElementById("payrollList"),
  payrollRunCount: document.getElementById("payrollRunCount"),
  payrollHistoryList: document.getElementById("payrollHistoryList"),
  alertCount: document.getElementById("alertCount"),
  alertsList: document.getElementById("alertsList"),
  dashboardPriorityStrip: document.getElementById("dashboardPriorityStrip"),
  activityCount: document.getElementById("activityCount"),
  dashboardActivityList: document.getElementById("dashboardActivityList"),
  clientCount: document.getElementById("clientCount"),
  clientsList: document.getElementById("clientsList"),
  clientSearchInput: document.getElementById("clientSearchInput"),
  clientSortSelect: document.getElementById("clientSortSelect"),
  clientDetailOverlay: document.getElementById("clientDetailOverlay"),
  clientDetailContent: document.getElementById("clientDetailContent"),
  closeClientDetailButton: document.getElementById("closeClientDetailButton"),
  jobClientOverlay: document.getElementById("jobClientOverlay"),
  jobClientForm: document.getElementById("jobClientForm"),
  jobClientOverlayEyebrow: document.getElementById("jobClientOverlayEyebrow"),
  jobClientOverlayTitle: document.getElementById("jobClientOverlayTitle"),
  jobClientOverlayCopy: document.getElementById("jobClientOverlayCopy"),
  jobClientOverlaySubmitButton: document.getElementById("jobClientOverlaySubmitButton"),
  closeJobClientOverlayButton: document.getElementById("closeJobClientOverlayButton"),
  cancelJobClientOverlayButton: document.getElementById("cancelJobClientOverlayButton"),
  quickJobOverlay: document.getElementById("quickJobOverlay"),
  quickJobForm: document.getElementById("quickJobForm"),
  closeQuickJobOverlayButton: document.getElementById("closeQuickJobOverlayButton"),
  cancelQuickJobOverlayButton: document.getElementById("cancelQuickJobOverlayButton"),
  quickJobClientSelect: document.getElementById("quickJobClientSelect"),
  quickJobClientPhone: document.getElementById("quickJobClientPhone"),
  quickJobClientEmail: document.getElementById("quickJobClientEmail"),
  quickJobAddress: document.getElementById("quickJobAddress"),
  quickJobName: document.getElementById("quickJobName"),
  quickJobDescription: document.getElementById("quickJobDescription"),
  quickJobScheduledAt: document.getElementById("quickJobScheduledAt"),
  quickJobRecurringSelect: document.getElementById("quickJobRecurringSelect"),
  quickJobStatusSelect: document.getElementById("quickJobStatusSelect"),
  quickJobInternalNotes: document.getElementById("quickJobInternalNotes"),
  quickQuoteOverlay: document.getElementById("quickQuoteOverlay"),
  quickQuoteForm: document.getElementById("quickQuoteForm"),
  closeQuickQuoteOverlayButton: document.getElementById("closeQuickQuoteOverlayButton"),
  cancelQuickQuoteOverlayButton: document.getElementById("cancelQuickQuoteOverlayButton"),
  quickQuoteClientSelect: document.getElementById("quickQuoteClientSelect"),
  quickQuoteSourceJobSelect: document.getElementById("quickQuoteSourceJobSelect"),
  quickQuoteClientPhone: document.getElementById("quickQuoteClientPhone"),
  quickQuoteClientEmail: document.getElementById("quickQuoteClientEmail"),
  quickQuoteJobName: document.getElementById("quickQuoteJobName"),
  quickQuoteSiteAddress: document.getElementById("quickQuoteSiteAddress"),
  quickQuoteDescription: document.getElementById("quickQuoteDescription"),
  quickQuoteLabourItems: document.getElementById("quickQuoteLabourItems"),
  quickQuoteMaterialItems: document.getElementById("quickQuoteMaterialItems"),
  quickQuoteLabourAmount: document.getElementById("quickQuoteLabourAmount"),
  quickQuoteMaterialAmount: document.getElementById("quickQuoteMaterialAmount"),
  quickQuoteExpiryDate: document.getElementById("quickQuoteExpiryDate"),
  quickQuoteNotes: document.getElementById("quickQuoteNotes"),
  quickEmployeeOverlay: document.getElementById("quickEmployeeOverlay"),
  quickEmployeeForm: document.getElementById("quickEmployeeForm"),
  closeQuickEmployeeOverlayButton: document.getElementById("closeQuickEmployeeOverlayButton"),
  cancelQuickEmployeeOverlayButton: document.getElementById("cancelQuickEmployeeOverlayButton"),
  quickEmployeeLastPayDate: document.getElementById("quickEmployeeLastPayDate"),
  jobCount: document.getElementById("jobCount"),
  jobsList: document.getElementById("jobsList"),
  teamJobBoardCard: document.getElementById("teamJobBoardCard"),
  teamJobBoardCount: document.getElementById("teamJobBoardCount"),
  teamJobBoard: document.getElementById("teamJobBoard"),
  teamJobBoardLockedPrompt: document.getElementById("teamJobBoardLockedPrompt"),
  archiveCount: document.getElementById("archiveCount"),
  archiveList: document.getElementById("archiveList"),
  clientForm: document.getElementById("clientForm"),
  jobForm: document.getElementById("jobForm"),
  jobStartOptions: document.querySelectorAll("[data-job-start]"),
  jobBlankClientActions: document.getElementById("jobBlankClientActions"),
  jobPreviousWrap: document.getElementById("jobPreviousWrap"),
  jobPreviousSelect: document.getElementById("jobPreviousSelect"),
  jobClientSelect: document.getElementById("jobClientSelect"),
  jobClientPhone: document.getElementById("jobClientPhone"),
  jobClientEmail: document.getElementById("jobClientEmail"),
  jobAddress: document.getElementById("jobAddress"),
  jobNameInput: document.getElementById("jobNameInput"),
  jobDescriptionInput: document.getElementById("jobDescriptionInput"),
  jobDescriptionQuickSuggestions: document.getElementById("jobDescriptionQuickSuggestions"),
  jobStatusSelect: document.getElementById("jobStatusSelect"),
  jobNameSuggestions: document.getElementById("jobNameSuggestions"),
  jobDescriptionSuggestions: document.getElementById("jobDescriptionSuggestions"),
  jobInternalNotes: document.getElementById("jobInternalNotes"),
  quoteJobButton: document.getElementById("quoteJobButton"),
  jobSearchInput: document.getElementById("jobSearchInput"),
  archiveSearchInput: document.getElementById("archiveSearchInput"),
  invoiceJobSelect: document.getElementById("invoiceJobSelect"),
  invoiceQuoteSearchInput: document.getElementById("invoiceQuoteSearchInput"),
  invoiceQuoteRecentList: document.getElementById("invoiceQuoteRecentList"),
  invoiceQuoteResults: document.getElementById("invoiceQuoteResults"),
  invoiceQuoteConfirmation: document.getElementById("invoiceQuoteConfirmation"),
  invoiceQuickClientButton: document.getElementById("invoiceQuickClientButton"),
  invoiceQuickJobButton: document.getElementById("invoiceQuickJobButton"),
  invoiceQuickQuoteButton: document.getElementById("invoiceQuickQuoteButton"),
  invoiceDuplicateSelect: document.getElementById("invoiceDuplicateSelect"),
  invoiceClientSelect: document.getElementById("invoiceClientSelect"),
  invoiceClientWarning: document.getElementById("invoiceClientWarning"),
  invoiceClientPhone: document.getElementById("invoiceClientPhone"),
  invoiceClientEmail: document.getElementById("invoiceClientEmail"),
  invoiceJobNameInput: document.getElementById("invoiceJobNameInput"),
  invoiceSiteAddressInput: document.getElementById("invoiceSiteAddressInput"),
  invoiceTermsSelect: document.getElementById("invoiceTermsSelect"),
  invoiceTermPills: document.querySelectorAll("[data-invoice-term]"),
  invoiceTypeSelect: document.getElementById("invoiceTypeSelect"),
  invoiceMaterialsInput: document.getElementById("invoiceMaterialsInput"),
  invoiceLabourInput: document.getElementById("invoiceLabourInput"),
  invoiceGstInput: document.getElementById("invoiceGstInput"),
  invoiceAmountInput: document.getElementById("invoiceAmountInput"),
  invoiceLineDescription1: document.getElementById("invoiceLineDescription1"),
  invoiceLineQty1: document.getElementById("invoiceLineQty1"),
  invoiceLineRate1: document.getElementById("invoiceLineRate1"),
  invoiceLineTotal1: document.getElementById("invoiceLineTotal1"),
  invoiceLineDescription2: document.getElementById("invoiceLineDescription2"),
  invoiceLineQty2: document.getElementById("invoiceLineQty2"),
  invoiceLineRate2: document.getElementById("invoiceLineRate2"),
  invoiceLineTotal2: document.getElementById("invoiceLineTotal2"),
  invoiceItemSuggestions: document.getElementById("invoiceItemSuggestions"),
  invoiceSubtotalValue: document.getElementById("invoiceSubtotalValue"),
  invoiceGstDisplay: document.getElementById("invoiceGstDisplay"),
  invoiceTotalDisplay: document.getElementById("invoiceTotalDisplay"),
  invoiceStickySubtotal: document.getElementById("invoiceStickySubtotal"),
  invoiceStickyGst: document.getElementById("invoiceStickyGst"),
  invoiceStickyTotal: document.getElementById("invoiceStickyTotal"),
  invoiceGstNote: document.getElementById("invoiceGstNote"),
  invoiceIssueDateInput: document.getElementById("invoiceIssueDateInput"),
  invoiceDueDateInput: document.getElementById("invoiceDueDateInput"),
  invoiceStatusSelect: document.getElementById("invoiceStatusSelect"),
  invoicePaymentMethodSelect: document.getElementById("invoicePaymentMethodSelect"),
  invoiceNotesInput: document.getElementById("invoiceNotesInput"),
  invoiceAttachmentInput: document.getElementById("invoiceAttachmentInput"),
  invoiceForm: document.getElementById("invoiceForm"),
  invoiceResetButton: document.getElementById("invoiceResetButton"),
  invoicePreviewOverlay: document.getElementById("invoicePreviewOverlay"),
  invoicePreviewContent: document.getElementById("invoicePreviewContent"),
  closeInvoicePreviewButton: document.getElementById("closeInvoicePreviewButton"),
  exportInvoicePdfButton: document.getElementById("exportInvoicePdfButton"),
  sendInvoicePreviewButton: document.getElementById("sendInvoicePreviewButton"),
  invoiceDraftNumber: document.getElementById("invoiceDraftNumber"),
  invoiceDraftClient: document.getElementById("invoiceDraftClient"),
  invoiceDraftIssueDate: document.getElementById("invoiceDraftIssueDate"),
  invoiceDraftDueDate: document.getElementById("invoiceDraftDueDate"),
  invoiceDraftGst: document.getElementById("invoiceDraftGst"),
  invoiceDraftTotal: document.getElementById("invoiceDraftTotal"),
  invoiceDraftMeta: document.getElementById("invoiceDraftMeta"),
  expenseForm: document.getElementById("expenseForm"),
  expenseStartOptions: document.querySelectorAll("[data-expense-start]"),
  expenseCategorySelect: document.getElementById("expenseCategorySelect"),
  expenseJobSelect: document.getElementById("expenseJobSelect"),
  expensePaymentSelect: document.getElementById("expensePaymentSelect"),
  expenseDateInput: document.getElementById("expenseDateInput"),
  expenseReceiptInput: document.getElementById("expenseReceiptInput"),
  expenseSupplierInput: document.getElementById("expenseSupplierInput"),
  expenseSupplierSuggestions: document.getElementById("expenseSupplierSuggestions"),
  expenseAmountInput: document.getElementById("expenseAmountInput"),
  expenseGstInput: document.getElementById("expenseGstInput"),
  expenseNotesInput: document.getElementById("expenseNotesInput"),
  expenseReceiptPreviewWrap: document.getElementById("expenseReceiptPreviewWrap"),
  expenseReceiptPreviewImage: document.getElementById("expenseReceiptPreviewImage"),
  expenseReceiptName: document.getElementById("expenseReceiptName"),
  expenseQuickJobButton: document.getElementById("expenseQuickJobButton"),
  settingsForm: document.getElementById("settingsForm"),
  businessNameInput: document.getElementById("businessNameInput"),
  abnInput: document.getElementById("abnInput"),
  tradeTypeInput: document.getElementById("tradeTypeInput"),
  taxVaultRateInput: document.getElementById("taxVaultRateInput"),
  settingsLogoInput: document.getElementById("settingsLogoInput"),
  settingsLogoPreview: document.getElementById("settingsLogoPreview"),
  settingsBusinessEmailInput: document.getElementById("settingsBusinessEmailInput"),
  settingsBusinessPhoneInput: document.getElementById("settingsBusinessPhoneInput"),
  settingsBusinessAddressInput: document.getElementById("settingsBusinessAddressInput"),
  settingsBrandToneSelect: document.getElementById("settingsBrandToneSelect"),
  settingsPaymentTermsSelect: document.getElementById("settingsPaymentTermsSelect"),
  settingsQuoteExpirySelect: document.getElementById("settingsQuoteExpirySelect"),
  settingsInvoicePrefixInput: document.getElementById("settingsInvoicePrefixInput"),
  settingsQuotePrefixInput: document.getElementById("settingsQuotePrefixInput"),
  settingsGstModeSelect: document.getElementById("settingsGstModeSelect"),
  settingsInvoiceReminderToggle: document.getElementById("settingsInvoiceReminderToggle"),
  settingsOverdueReminderToggle: document.getElementById("settingsOverdueReminderToggle"),
  settingsPayrollReminderToggle: document.getElementById("settingsPayrollReminderToggle"),
  settingsPaymentAlertToggle: document.getElementById("settingsPaymentAlertToggle"),
  settingsJobAlertToggle: document.getElementById("settingsJobAlertToggle"),
  settingsTeamUserNameInput: document.getElementById("settingsTeamUserNameInput"),
  settingsTeamUserRoleSelect: document.getElementById("settingsTeamUserRoleSelect"),
  settingsTeamUserEmailInput: document.getElementById("settingsTeamUserEmailInput"),
  settingsTeamUserStatusSelect: document.getElementById("settingsTeamUserStatusSelect"),
  settingsUserList: document.getElementById("settingsUserList"),
  settingsTeamAccessCard: document.getElementById("settingsTeamAccessCard"),
  settingsTeamLockedPrompt: document.getElementById("settingsTeamLockedPrompt"),
  settingsBankConnectionSelect: document.getElementById("settingsBankConnectionSelect"),
  settingsPaymentMethodSelect: document.getElementById("settingsPaymentMethodSelect"),
  settingsIntegrationNotesInput: document.getElementById("settingsIntegrationNotesInput"),
  settingsDefaultViewSelect: document.getElementById("settingsDefaultViewSelect"),
  settingsThemeSelect: document.getElementById("settingsThemeSelect"),
  settingsNewPasswordInput: document.getElementById("settingsNewPasswordInput"),
  settingsTwoFactorSelect: document.getElementById("settingsTwoFactorSelect"),
  settingsSessionNotesInput: document.getElementById("settingsSessionNotesInput"),
  settingsNote: document.getElementById("settingsNote"),
  settingsPlanName: document.getElementById("settingsPlanName"),
  settingsPlanCopy: document.getElementById("settingsPlanCopy"),
  settingsPlanLimit: document.getElementById("settingsPlanLimit"),
  quickCreateWrap: document.getElementById("quickCreateWrap"),
  quickCreateToggle: document.getElementById("quickCreateToggle"),
  quickCreateMenu: document.getElementById("quickCreateMenu"),
  quickCreateQuote: document.getElementById("quickCreateQuote"),
  quickCreateInvoice: document.getElementById("quickCreateInvoice"),
  quickCreateJob: document.getElementById("quickCreateJob"),
  quickCreateExpense: document.getElementById("quickCreateExpense"),
  toastNotice: document.getElementById("toastNotice"),
  demoForm: document.getElementById("demoForm"),
  formNote: document.getElementById("formNote"),
  year: document.getElementById("year"),
  payrollLockedPrompt: document.getElementById("payrollLockedPrompt"),
  reportsLockedPrompt: document.getElementById("reportsLockedPrompt"),
  invoiceApprovalPrompt: document.getElementById("invoiceApprovalPrompt"),
  invoiceApprovalField: document.getElementById("invoiceApprovalField"),
  invoiceApprovalRequiredSelect: document.getElementById("invoiceApprovalRequiredSelect"),
  dashboardMarginLabel: document.querySelector(".kpi-margin span"),
};

let authMode = "signup";
let activeJobFilter = "All";
let jobSearchQuery = "";
let archiveSearchQuery = "";
let activeJobStartMode = "client";
let activeJobBlankClientMode = "existing";
let activeQuoteFilter = "All";
let quoteSearchQuery = "";
let selectedQuoteId = null;
let activeQuoteStartMode = "client";
let quoteClientSearchQuery = "";
let activeInvoiceFilter = "All";
let invoiceSearchQuery = "";
let selectedInvoiceId = null;
let activeInvoiceStartMode = "quote";
let activeInvoiceQuoteFilter = "Recent";
let invoiceQuoteSearchQuery = "";
let expenseSearchQuery = "";
let activeExpenseCategory = "All";
let activeExpenseJobId = "All";
let activeExpensePayment = "All";
let expenseDateFromValue = "";
let expenseDateToValue = "";
let pendingExpenseReceipt = null;
let activeExpenseStartMode = "receipt";
let activePayrollFilter = "All";
let payrollSearchQuery = "";
let payrollHistoryFromValue = "";
let reportDateRange = "30";
let reportJobFilterValue = "All";
let reportClientFilterValue = "All";
let reportCategoryFilterValue = "All";
let reportTeamFilterValue = "All";
let pendingSettingsLogo = null;
let clientSearchQuery = "";
let clientSortMode = "newest";
let editingClientId = null;
let jobClientModalOpen = false;
let quickCreateContext = null;
let currentUser = null;
let workspacePageSlots = null;
let pendingSelectedPlan = "Starter";
let pendingUpgradeFeature = "";
let pendingUpgradePlan = "Starter";

els.year.textContent = new Date().getFullYear();
initStore();
bindEvents();
restoreSession();

function bindEvents() {
  els.navToggle.addEventListener("click", () => {
    const isOpen = els.siteNav.classList.toggle("open");
    els.navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  els.siteNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", handleLandingNavClick);
  });

  els.createAccountButton.addEventListener("click", () => openAuth("signup"));
  els.signInButton.addEventListener("click", () => openAuth("signin"));
  els.toggleAuthMode.addEventListener("click", () => openAuth(authMode === "signup" ? "signin" : "signup"));
  els.closeAuthButton.addEventListener("click", closeAuth);
  els.closePricingModalButton?.addEventListener("click", closePricingModal);
  els.pricingModalOverlay?.addEventListener("click", (event) => {
    if (event.target === els.pricingModalOverlay) closePricingModal();
  });
  els.closeUpgradeModalButton?.addEventListener("click", closeUpgradeModal);
  els.cancelUpgradeModalButton?.addEventListener("click", closeUpgradeModal);
  els.upgradeModalOverlay?.addEventListener("click", (event) => {
    if (event.target === els.upgradeModalOverlay) closeUpgradeModal();
  });
  els.confirmUpgradeButton?.addEventListener("click", handleConfirmUpgradePlan);
  els.signOutButton.addEventListener("click", signOut);
  els.authForm.addEventListener("submit", handleAuthSubmit);
  els.clientForm.addEventListener("submit", handleClientSubmit);
  els.clientSearchInput.addEventListener("input", () => {
    clientSearchQuery = els.clientSearchInput.value.trim().toLowerCase();
    renderClients();
  });
  els.clientSortSelect.addEventListener("change", () => {
    clientSortMode = els.clientSortSelect.value;
    renderClients();
  });
  els.clientsList.addEventListener("click", handleClientAction);
  els.closeClientDetailButton.addEventListener("click", () => {
    els.clientDetailOverlay.classList.add("hidden");
  });
  els.clientDetailOverlay.addEventListener("click", (event) => {
    if (event.target === els.clientDetailOverlay) {
      els.clientDetailOverlay.classList.add("hidden");
    }
  });
  els.jobClientForm?.addEventListener("submit", handleJobClientSubmit);
  els.closeJobClientOverlayButton?.addEventListener("click", closeJobClientOverlay);
  els.cancelJobClientOverlayButton?.addEventListener("click", closeJobClientOverlay);
  els.jobClientOverlay?.addEventListener("click", (event) => {
    if (event.target === els.jobClientOverlay) {
      closeJobClientOverlay();
    }
  });
  els.quickJobForm?.addEventListener("submit", handleQuickJobSubmit);
  els.closeQuickJobOverlayButton?.addEventListener("click", closeQuickJobOverlay);
  els.cancelQuickJobOverlayButton?.addEventListener("click", closeQuickJobOverlay);
  els.quickJobOverlay?.addEventListener("click", (event) => {
    if (event.target === els.quickJobOverlay) {
      closeQuickJobOverlay();
    }
  });
  els.quickQuoteForm?.addEventListener("submit", handleQuickQuoteSubmit);
  els.closeQuickQuoteOverlayButton?.addEventListener("click", closeQuickQuoteOverlay);
  els.cancelQuickQuoteOverlayButton?.addEventListener("click", closeQuickQuoteOverlay);
  els.quickQuoteOverlay?.addEventListener("click", (event) => {
    if (event.target === els.quickQuoteOverlay) {
      closeQuickQuoteOverlay();
    }
  });
  els.quickEmployeeForm?.addEventListener("submit", handleQuickEmployeeSubmit);
  els.closeQuickEmployeeOverlayButton?.addEventListener("click", closeQuickEmployeeOverlay);
  els.cancelQuickEmployeeOverlayButton?.addEventListener("click", closeQuickEmployeeOverlay);
  els.quickEmployeeOverlay?.addEventListener("click", (event) => {
    if (event.target === els.quickEmployeeOverlay) {
      closeQuickEmployeeOverlay();
    }
  });
  els.jobForm.addEventListener("submit", handleJobSubmit);
  els.jobStartOptions.forEach((button) => {
    button.addEventListener("click", () => handleJobStartModeChange(button.dataset.jobStart || "client"));
  });
  document.querySelectorAll("[data-job-blank-client]").forEach((button) => {
    button.addEventListener("click", () => handleJobBlankClientChoice(button.dataset.jobBlankClient || "existing"));
  });
  els.jobPreviousSelect?.addEventListener("change", handlePreviousJobPrefill);
  els.jobDescriptionQuickSuggestions?.addEventListener("click", handleSmartFillClick);
  els.jobClientSelect.addEventListener("change", syncSelectedClientDetails);
  els.quoteJobButton.addEventListener("click", handleQuoteForJob);
  els.quoteForm.addEventListener("submit", handleQuoteSubmit);
  els.quoteStartOptions.forEach((button) => {
    button.addEventListener("click", () => handleQuoteStartModeChange(button.dataset.quoteStart || "client"));
  });
  els.quoteClientSearchInput?.addEventListener("input", () => {
    quoteClientSearchQuery = els.quoteClientSearchInput.value.trim().toLowerCase();
    syncClientSelect({ quote: els.quoteClientSelect.value });
    renderQuoteClientContext();
  });
  document.querySelectorAll("[data-quote-blank-action]").forEach((button) => {
    button.addEventListener("click", () => handleQuoteBlankAction(button.dataset.quoteBlankAction || "standalone"));
  });
  els.quickJobClientSelect?.addEventListener("change", syncQuickJobClientDetails);
  els.quickQuoteClientSelect?.addEventListener("change", syncQuickQuoteClientDetails);
  els.quickQuoteSourceJobSelect?.addEventListener("change", handleQuickQuoteSourceChange);
  els.quoteSourceSelect.addEventListener("change", handleQuoteSourceChange);
  els.quoteRepeatSelect?.addEventListener("change", handleQuoteRepeatChange);
  els.quoteDescriptionQuickSuggestions?.addEventListener("click", handleSmartFillClick);
  els.quoteLabourQuickSuggestions?.addEventListener("click", handleSmartFillClick);
  els.quoteMaterialQuickSuggestions?.addEventListener("click", handleSmartFillClick);
  els.quoteClientSelect.addEventListener("change", syncSelectedQuoteClientDetails);
  els.quoteResetButton.addEventListener("click", resetQuoteForm);
  els.quoteSearchInput.addEventListener("input", () => {
    quoteSearchQuery = els.quoteSearchInput.value.trim().toLowerCase();
    renderQuotes();
  });
  [els.quoteLabourAmountInput, els.quoteMaterialAmountInput].forEach((input) => {
    input.addEventListener("input", recalculateQuoteTotals);
  });
  document.querySelectorAll("[data-quote-add]").forEach((button) => {
    button.addEventListener("click", () => handleQuoteQuickAdd(button.dataset.quoteAdd || ""));
  });
  [
    els.quoteClientSelect,
    els.quoteJobNameInput,
    els.quoteLabourAmountInput,
    els.quoteMaterialAmountInput,
    els.quoteGstInput,
    els.quoteTotalInput,
  ].forEach((input) => {
    input.addEventListener("input", renderQuoteBuilderSummary);
    input.addEventListener("change", renderQuoteBuilderSummary);
  });
  document.querySelectorAll("[data-quote-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-quote-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeQuoteFilter = button.dataset.quoteFilter;
      renderQuotes();
    });
  });
  els.jobSearchInput.addEventListener("input", () => {
    jobSearchQuery = els.jobSearchInput.value.trim().toLowerCase();
    renderJobs();
  });
  els.archiveSearchInput.addEventListener("input", () => {
    archiveSearchQuery = els.archiveSearchInput.value.trim().toLowerCase();
    renderArchive();
  });
  document.querySelectorAll("[data-job-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-job-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeJobFilter = button.dataset.jobFilter;
      renderJobs();
      renderArchive();
    });
  });
  els.invoiceForm.addEventListener("submit", handleInvoiceSubmit);
  els.invoiceStartOptions.forEach((button) => {
    button.addEventListener("click", () => handleInvoiceStartModeChange(button.dataset.invoiceStart || "blank"));
  });
  els.invoiceQuickClientButton?.addEventListener("click", () => openQuickClientOverlay("invoice"));
  els.invoiceQuickJobButton?.addEventListener("click", () => openQuickJobOverlay("invoice"));
  els.invoiceQuickQuoteButton?.addEventListener("click", () => openQuickQuoteOverlay("invoice"));
  els.invoiceClientSelect.addEventListener("change", syncSelectedInvoiceClientDetails);
  els.invoiceJobSelect.addEventListener("change", handleInvoiceSourceChange);
  els.invoiceQuoteSearchInput?.addEventListener("input", () => {
    invoiceQuoteSearchQuery = els.invoiceQuoteSearchInput.value.trim().toLowerCase();
    clearInvoiceQuoteConfirmation();
    renderInvoiceQuotePicker();
  });
  document.querySelectorAll("[data-invoice-quote-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-invoice-quote-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeInvoiceQuoteFilter = button.dataset.invoiceQuoteFilter || "Recent";
      clearInvoiceQuoteConfirmation();
      renderInvoiceQuotePicker();
    });
  });
  els.invoiceQuoteResults?.addEventListener("click", handleInvoiceQuoteCardClick);
  els.invoiceQuoteRecentList?.addEventListener("click", handleInvoiceQuoteCardClick);
  els.invoiceDuplicateSelect?.addEventListener("change", handleInvoiceDuplicateSourceChange);
  els.invoiceResetButton.addEventListener("click", resetInvoiceForm);
  els.invoiceSearchInput.addEventListener("input", () => {
    invoiceSearchQuery = els.invoiceSearchInput.value.trim().toLowerCase();
    renderInvoices();
  });
  [
    els.invoiceLineQty1,
    els.invoiceLineRate1,
    els.invoiceLineQty2,
    els.invoiceLineRate2,
  ].forEach((input) => {
    input.addEventListener("input", recalculateInvoiceTotals);
  });
  [
    els.invoiceLineDescription1,
    els.invoiceLineDescription2,
  ].forEach((input) => {
    input?.addEventListener("input", renderInvoiceDraftPreview);
  });
  els.invoiceTermsSelect.addEventListener("change", syncInvoiceDueDateFromTerms);
  els.invoiceTermPills.forEach((button) => {
    button.addEventListener("click", () => {
      els.invoiceTermsSelect.value = button.dataset.invoiceTerm || "7 days";
      syncInvoiceDueDateFromTerms();
      syncInvoiceTermPills();
    });
  });
  els.invoiceIssueDateInput.addEventListener("change", syncInvoiceDueDateFromTerms);
  [
    els.invoiceClientSelect,
    els.invoiceJobNameInput,
    els.invoiceSiteAddressInput,
    els.invoiceTypeSelect,
    els.invoiceIssueDateInput,
    els.invoiceDueDateInput,
    els.invoiceGstInput,
    els.invoiceAmountInput,
  ].forEach((input) => {
    input.addEventListener("input", renderInvoiceDraftPreview);
    input.addEventListener("change", renderInvoiceDraftPreview);
  });
  document.querySelectorAll("[data-invoice-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-invoice-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeInvoiceFilter = button.dataset.invoiceFilter;
      renderInvoices();
    });
  });
  els.expenseForm.addEventListener("submit", handleExpenseSubmit);
  els.expenseQuickJobButton?.addEventListener("click", () => openQuickJobOverlay("expense"));
  els.expenseStartOptions.forEach((button) => {
    button.addEventListener("click", () => handleExpenseStartModeChange(button.dataset.expenseStart || "receipt"));
  });
  els.expenseReceiptInput.addEventListener("change", handleExpenseReceiptUpload);
  els.expenseAmountInput.addEventListener("input", recalculateExpenseGst);
  els.expenseSearchInput.addEventListener("input", () => {
    expenseSearchQuery = els.expenseSearchInput.value.trim().toLowerCase();
    renderExpenses();
  });
  els.expenseCategoryFilter.addEventListener("change", () => {
    activeExpenseCategory = els.expenseCategoryFilter.value;
    renderExpenses();
  });
  els.expenseJobFilter.addEventListener("change", () => {
    activeExpenseJobId = els.expenseJobFilter.value;
    renderExpenses();
  });
  els.expensePaymentFilter.addEventListener("change", () => {
    activeExpensePayment = els.expensePaymentFilter.value;
    renderExpenses();
  });
  els.expenseDateFrom.addEventListener("change", () => {
    expenseDateFromValue = els.expenseDateFrom.value;
    renderExpenses();
  });
  els.expenseDateTo.addEventListener("change", () => {
    expenseDateToValue = els.expenseDateTo.value;
    renderExpenses();
  });
  els.payrollEmployeeForm.addEventListener("submit", handlePayrollEmployeeSubmit);
  els.payrollOpenEmployeeModalButton?.addEventListener("click", () => openQuickEmployeeOverlay("payroll"));
  els.payrollCopyLastWeekButton?.addEventListener("click", handlePayrollCopyLastWeek);
  els.payrollAddOvertimeButton?.addEventListener("click", handlePayrollAddOvertime);
  els.payrollAddAllowanceButton?.addEventListener("click", handlePayrollAddAllowance);
  els.runPayrollButton.addEventListener("click", handleRunPayroll);
  els.exportPayrollButton?.addEventListener("click", exportPayrollCsv);
  els.payrollEmployeeForm.querySelectorAll('input[name="name"], input[name="cycleHours"], input[name="payRate"], select[name="payType"]').forEach((input) => {
    input.addEventListener("input", renderPayrollQuickSummary);
    input.addEventListener("change", renderPayrollQuickSummary);
  });
  els.payrollSearchInput.addEventListener("input", () => {
    payrollSearchQuery = els.payrollSearchInput.value.trim().toLowerCase();
    renderPayroll();
  });
  els.payrollHistoryDateFilter.addEventListener("change", () => {
    payrollHistoryFromValue = els.payrollHistoryDateFilter.value;
    renderPayroll();
  });
  document.querySelectorAll("[data-payroll-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-payroll-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activePayrollFilter = button.dataset.payrollFilter;
      renderPayroll();
    });
  });
  els.reportDateRangeSelect.addEventListener("change", () => {
    reportDateRange = els.reportDateRangeSelect.value;
    renderReports();
  });
  els.reportJobFilter.addEventListener("change", () => {
    reportJobFilterValue = els.reportJobFilter.value;
    renderReports();
  });
  els.reportClientFilter.addEventListener("change", () => {
    reportClientFilterValue = els.reportClientFilter.value;
    renderReports();
  });
  els.reportCategoryFilter.addEventListener("change", () => {
    reportCategoryFilterValue = els.reportCategoryFilter.value;
    renderReports();
  });
  els.reportTeamFilter.addEventListener("change", () => {
    reportTeamFilterValue = els.reportTeamFilter.value;
    renderReports();
  });
  els.exportReportsButton.addEventListener("click", exportReportsSummary);
  els.settingsForm.addEventListener("submit", handleSettingsSubmit);
  els.settingsLogoInput.addEventListener("change", handleSettingsLogoUpload);
  els.quotesList.addEventListener("click", handleQuoteAction);
  els.jobsList.addEventListener("click", handleJobAction);
  els.invoicesList.addEventListener("click", handleInvoiceAction);
  els.payrollHistoryList.addEventListener("click", handlePayrollHistoryAction);
  els.closeQuotePreviewButton.addEventListener("click", () => {
    els.quotePreviewOverlay.classList.add("hidden");
    selectedQuoteId = null;
  });
  els.quotePreviewOverlay.addEventListener("click", (event) => {
    if (event.target === els.quotePreviewOverlay) {
      els.quotePreviewOverlay.classList.add("hidden");
      selectedQuoteId = null;
    }
  });
  els.sendQuotePreviewButton.addEventListener("click", () => {
    if (selectedQuoteId) {
      sendQuoteById(selectedQuoteId);
      els.quotePreviewOverlay.classList.add("hidden");
      selectedQuoteId = null;
    }
  });
  els.closeInvoicePreviewButton.addEventListener("click", () => {
    els.invoicePreviewOverlay.classList.add("hidden");
    selectedInvoiceId = null;
  });
  els.invoicePreviewOverlay.addEventListener("click", (event) => {
    if (event.target === els.invoicePreviewOverlay) {
      els.invoicePreviewOverlay.classList.add("hidden");
      selectedInvoiceId = null;
    }
  });
  els.exportInvoicePdfButton.addEventListener("click", () => {
    if (selectedInvoiceId) exportInvoicePdf(selectedInvoiceId);
  });
  els.sendInvoicePreviewButton.addEventListener("click", () => {
    if (selectedInvoiceId) {
      sendInvoiceById(selectedInvoiceId);
      els.invoicePreviewOverlay.classList.add("hidden");
      selectedInvoiceId = null;
    }
  });

  document.querySelectorAll("[data-workspace-link]").forEach((link) => {
    link.addEventListener("click", () => {
      syncWorkspaceNavState(link.getAttribute("href"));
      closeQuickCreateMenu();
    });
  });

  window.addEventListener("hashchange", () => {
    syncWorkspaceNavState(window.location.hash);
    closeQuickCreateMenu();
  });

  els.quickCreateToggle?.addEventListener("click", () => {
    const isOpen = !els.quickCreateMenu.classList.contains("hidden");
    els.quickCreateMenu.classList.toggle("hidden", isOpen);
    els.quickCreateToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  els.quickCreateQuote?.addEventListener("click", () => openQuickCreateTarget("#workspace-quotes", els.quoteForm));
  els.quickCreateInvoice?.addEventListener("click", () => openQuickCreateTarget("#workspace-invoices", els.invoiceForm));
  els.quickCreateJob?.addEventListener("click", () => openQuickCreateTarget("#workspace-jobs", els.jobForm));
  els.quickCreateExpense?.addEventListener("click", () => openQuickCreateTarget("#workspace-expenses", els.expenseForm));

  document.addEventListener("click", (event) => {
    if (!els.quickCreateWrap?.contains(event.target)) {
      closeQuickCreateMenu();
    }
  });

  document.querySelectorAll("[data-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      pendingSelectedPlan = normalisePlanName(button.dataset.plan, "Starter");
      openAuth("signup", pendingSelectedPlan);
    });
  });

  document.addEventListener("click", (event) => {
    const upgradeButton = event.target.closest("[data-request-upgrade]");
    if (upgradeButton) {
      pendingUpgradeFeature = upgradeButton.dataset.lockedFeature || "";
      openPricingModal(pendingUpgradeFeature);
      return;
    }

    const openUpgradeButton = event.target.closest("[data-open-upgrade]");
    if (openUpgradeButton) {
      const targetPlan = normalisePlanName(openUpgradeButton.dataset.openUpgrade, "Starter");
      openUpgradeModal(targetPlan, pendingUpgradeFeature);
      return;
    }
  });

  if (els.demoForm) {
    els.demoForm.addEventListener("submit", handleDemoSubmit);
  }
}

function initStore() {
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

function normalisePlanName(plan, fallback = "Business") {
  const value = String(plan || "").trim();
  if (PLAN_ORDER.includes(value)) return value;
  return fallback;
}

function getPlanDefinition(plan = normalisePlanName(currentUser?.plan)) {
  return PLAN_DEFINITIONS[normalisePlanName(plan)] || PLAN_DEFINITIONS.Business;
}

function getPlanFeatures(plan = normalisePlanName(currentUser?.plan)) {
  const targetPlan = normalisePlanName(plan);
  const targetRank = getPlanDefinition(targetPlan).rank;
  return PLAN_ORDER.reduce((featureSet, planName) => {
    if (getPlanDefinition(planName).rank <= targetRank) {
      getPlanDefinition(planName).features.forEach((feature) => featureSet.add(feature));
    }
    return featureSet;
  }, new Set());
}

function hasFeature(feature, user = currentUser) {
  if (!feature) return true;
  return getPlanFeatures(normalisePlanName(user?.plan)).has(feature);
}

function getPlanUserLimit(plan = normalisePlanName(currentUser?.plan)) {
  return Number(getPlanDefinition(plan).maxUsers || 1);
}

function enforcePlanDataLimits(user) {
  if (!user) return user;
  const plan = normalisePlanName(user.plan, "Starter");
  const userLimit = getPlanUserLimit(plan);
  const teamUsers = Array.isArray(user.teamUsers) ? user.teamUsers.slice(0, userLimit) : [];
  const payrollEmployees = hasFeature("payrollPage", user)
    ? (Array.isArray(user.payrollEmployees) ? user.payrollEmployees.slice(0, userLimit) : [])
    : [];
  return {
    ...user,
    teamUsers,
    payrollEmployees,
  };
}

function canAddMoreTeamUsers(user = currentUser) {
  return (user?.teamUsers?.length || 0) < getPlanUserLimit(normalisePlanName(user?.plan, "Starter"));
}

function canAddMorePayrollStaff(user = currentUser) {
  return hasFeature("payrollPage", user)
    && (user?.payrollEmployees?.length || 0) < getPlanUserLimit(normalisePlanName(user?.plan, "Starter"));
}

function getUpgradePlan(feature) {
  return FEATURE_UPGRADE_PLAN[feature] || "Business";
}

function getPlanMarketingCopy(plan = normalisePlanName(currentUser?.plan, "Starter")) {
  const copyByPlan = {
    Starter: "Best for solo tradies keeping quotes, invoices, receipts, and GST in one place.",
    Crew: "Best for small crews that need job visibility, profitability, and payroll-ready workflow.",
    Business: "Best for trade businesses that need control across staff, approvals, reporting, and active jobs.",
  };
  return copyByPlan[normalisePlanName(plan, "Starter")] || copyByPlan.Starter;
}

function isFirstUseWorkspace(user = currentUser) {
  if (!user) return false;
  return (
    (user.clients?.length || 0) === 0
    && (user.jobs?.length || 0) === 0
    && (user.archivedJobs?.length || 0) === 0
    && (user.quotes?.length || 0) === 0
    && (user.invoices?.length || 0) === 0
    && (user.expenses?.length || 0) === 0
    && (user.payrollEmployees?.length || 0) === 0
    && (user.payrollRuns?.length || 0) === 0
  );
}

function emptyStateCopy(pageKey) {
  const copy = {
    jobs: ["You have no jobs yet", "Create your first job to track work, notes, and what needs to happen next."],
    clients: ["No clients yet", "Add your first client so their details can flow into jobs, quotes, and invoices."],
    quotes: ["No quotes yet", "Start a quote when you are pricing the first job or sending work for approval."],
    invoices: ["No invoices yet", "Create your first invoice and unpaid money will start showing here automatically."],
    expenses: ["No expenses recorded yet", "Upload a receipt or log a cost so job spend and GST stay visible from day one."],
    payroll: ["No staff on file", "Add your first worker when you are ready to track pay, labour, and payroll runs."],
    reports: ["Reports appear once jobs and invoices exist", "As soon as work is moving through quotes, invoices, and expenses, this view will start showing business totals."],
  };
  return copy[pageKey] || ["Nothing here yet", "Add your first record to get started."];
}

function buildUpgradePromptHtml({ eyebrow = "Upgrade", title, copy, feature, buttonLabel = "" }) {
  const upgradePlan = getUpgradePlan(feature);
  return `
    <div class="plan-lock-copy">
      <span class="status-badge status-draft">${escapeHtml(eyebrow)}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(copy)}</p>
    </div>
    <div class="plan-lock-actions">
      <button class="button button-primary" type="button" data-request-upgrade="${escapeHtml(upgradePlan)}" data-locked-feature="${escapeHtml(feature)}">${escapeHtml(buttonLabel || `Upgrade to ${upgradePlan}`)}</button>
    </div>
  `;
}

function restoreSession() {
  const email = localStorage.getItem(SESSION_KEY);
  const users = getUsers();
  if (email && users[email]) {
    currentUser = normaliseUser(users[email]);
    users[email] = currentUser;
    saveUsers(users);
    openWorkspace();
  }
}

function openPricingModal(featureKey = "") {
  const currentPlan = normalisePlanName(currentUser?.plan, "Starter");
  const recommendedPlan = featureKey ? getUpgradePlan(featureKey) : currentPlan;

  if (els.pricingModalTitle) {
    els.pricingModalTitle.textContent = "Choose the plan that fits how you run the business";
  }
  if (els.pricingModalCopy) {
    els.pricingModalCopy.textContent = featureKey
      ? `Your current plan is ${currentPlan}. ${recommendedPlan} is the next step for this feature.`
      : "See Starter, Crew, and Business side by side without leaving the app.";
  }
  if (els.pricingModalCards) {
    els.pricingModalCards.innerHTML = PLAN_ORDER.map((planName) => {
      const plan = PLAN_MARKETING[planName];
      const isCurrentPlan = planName === currentPlan;
      const isRecommended = planName === recommendedPlan && planName !== currentPlan;
      return `
        <article class="price-card pricing-modal-plan ${isCurrentPlan ? "is-current-plan" : ""} ${isRecommended ? "is-recommended-plan" : ""}">
          <div class="price-card-topline">
            <p class="plan-name">${escapeHtml(planName)}</p>
            ${isCurrentPlan ? '<span class="pricing-popular-badge">Current plan</span>' : isRecommended ? '<span class="pricing-popular-badge">Recommended</span>' : ""}
          </div>
          <h3>${escapeHtml(plan.price.replace("/month", ""))}<span>/month</span></h3>
          <p class="plan-copy">${escapeHtml(plan.audience)}</p>
          <ul>
            ${plan.features.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <button class="button ${isCurrentPlan ? "button-secondary" : "button-primary"}" type="button" data-open-upgrade="${escapeHtml(planName)}" ${isCurrentPlan ? "disabled" : ""}>${isCurrentPlan ? "Current plan" : `Upgrade to ${escapeHtml(planName)}`}</button>
        </article>
      `;
    }).join("");
  }

  els.pricingModalOverlay?.classList.remove("hidden");
}

function closePricingModal() {
  els.pricingModalOverlay?.classList.add("hidden");
}

function openUpgradeModal(planName, featureKey = "") {
  const targetPlan = normalisePlanName(planName, "Starter");
  const feature = featureKey || pendingUpgradeFeature;
  const copy = getLockedFeatureCopy(feature);
  const marketing = PLAN_MARKETING[targetPlan];

  pendingUpgradePlan = targetPlan;
  pendingUpgradeFeature = feature;

  if (els.upgradeModalTitle) {
    els.upgradeModalTitle.textContent = `Upgrade to ${targetPlan}`;
  }
  if (els.upgradeModalCopy) {
    els.upgradeModalCopy.textContent = copy?.copy || marketing.summary;
  }
  if (els.upgradeModalPrice) {
    els.upgradeModalPrice.textContent = marketing.price;
  }
  if (els.upgradeModalFeatureList) {
    els.upgradeModalFeatureList.innerHTML = marketing.features.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }
  if (els.confirmUpgradeButton) {
    els.confirmUpgradeButton.textContent = `Upgrade to ${targetPlan}`;
  }

  closePricingModal();
  els.upgradeModalOverlay?.classList.remove("hidden");
}

function closeUpgradeModal() {
  els.upgradeModalOverlay?.classList.add("hidden");
}

function handleConfirmUpgradePlan() {
  if (!currentUser) {
    pendingSelectedPlan = pendingUpgradePlan;
    closeUpgradeModal();
    openAuth("signup", pendingUpgradePlan);
    return;
  }

  currentUser.plan = normalisePlanName(pendingUpgradePlan, currentUser.plan || "Starter");
  persistCurrentUser();
  closeUpgradeModal();
  renderPlanSummary();
  renderWorkspace();
  syncWorkspaceNavState(window.location.hash || "#workspace-dashboard");
  showToast(`Plan updated to ${currentUser.plan}.`);
}

function openAuth(mode, selectedPlan = pendingSelectedPlan) {
  authMode = mode;
  const isSignup = mode === "signup";
  pendingSelectedPlan = normalisePlanName(selectedPlan, "Starter");

  closeMobileNav();
  els.authModeLabel.textContent = isSignup ? "Create account" : "Sign in";
  els.authTitle.textContent = isSignup ? "Set up your PayDay Tradie login" : "Welcome back to PayDay Tradie";
  els.authCopy.textContent = isSignup
    ? `Create your account on the ${pendingSelectedPlan} plan, then open a clean workspace built for a real first start.`
    : "Sign in with the account you created in this browser to open your workspace.";
  els.authSubmitButton.textContent = isSignup ? "Create account" : "Sign in";
  els.toggleAuthMode.textContent = isSignup ? "Already have an account? Sign in" : "Need an account? Create one";
  els.nameField.classList.toggle("hidden", !isSignup);
  els.nameField.querySelector("input").required = isSignup;
  els.authForm.reset();
  els.authOverlay.classList.remove("hidden");
  window.setTimeout(() => els.authForm.elements.email.focus(), 50);
}

function closeAuth() {
  els.authOverlay.classList.add("hidden");
}

function handleAuthSubmit(event) {
  event.preventDefault();

  const users = getUsers();
  const formData = new FormData(els.authForm);
  const name = String(formData.get("name") || "").trim() || "Tradie";
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (authMode === "signup") {
    if (users[email]) {
      els.authCopy.textContent = "That email already has an account in this browser. Switch to sign in.";
      return;
    }

      users[email] = buildSeedUser(name, email, password, pendingSelectedPlan);
      saveUsers(users);
      currentUser = normaliseUser(users[email]);
      users[email] = currentUser;
      saveUsers(users);
      localStorage.setItem(SESSION_KEY, email);
      closeAuth();
      openWorkspace();
      return;
  }

  if (!users[email] || users[email].password !== password) {
    els.authCopy.textContent = "Sign in failed. Double-check your email and password or create a new account.";
    return;
  }

  currentUser = normaliseUser(users[email]);
  users[email] = currentUser;
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, email);
  closeAuth();
  openWorkspace();
}

function buildSeedUser(name, email, password, plan = "Starter") {
  const clientId = crypto.randomUUID();
  const secondClientId = crypto.randomUUID();
  const strataClientId = crypto.randomUUID();
  const warehouseJobId = crypto.randomUUID();
  const defectsJobId = crypto.randomUUID();
  const courtyardJobId = crypto.randomUUID();
  const strataJobId = crypto.randomUUID();
  const archiveJobId = crypto.randomUUID();
  return {
    name,
    email,
    password,
    plan: normalisePlanName(plan, "Starter"),
    businessName: `${name}'s Trade Co`,
    abn: "12 345 678 901",
    businessEmail: email,
    businessPhone: "0400 111 222",
    businessAddress: "12 Tradie Lane, Brisbane QLD",
    tradeType: "Landscaping",
    businessLogo: "assets/logo-wordmark.png",
    brandTone: "Classic green",
    defaultPaymentTerms: "14 days",
    defaultQuoteExpiryDays: 14,
    invoicePrefix: "PDT-INV",
    quotePrefix: "PDT-Q",
    gstMode: "GST registered",
    taxVaultRate: 0.2,
    notificationSettings: {
      invoiceReminders: true,
      overdueReminders: true,
      payrollReminders: true,
      paymentAlerts: true,
      jobAlerts: true,
    },
    teamUsers: [
      { id: crypto.randomUUID(), name, email, role: "Owner", status: "Active" },
      { id: crypto.randomUUID(), name: "Ops admin", email: "ops@paydaytradie.com.au", role: "Admin", status: "Invited" },
    ],
    bankConnection: "Not connected",
    paymentMethod: "Bank transfer",
    integrationNotes: "ATO STP, Stripe, and bank feeds can be connected in a future release.",
    defaultWorkspaceView: "Dashboard",
    themePreference: "Light",
    twoFactorStatus: "Setup pending",
    sessionNotes: "Signed in on this browser. Device access review is logged here for future team controls.",
    clients: [
      {
        id: clientId,
        name: "Southside Build Co",
        contactPerson: "Sarah Johnson",
        phone: "0400 123 456",
        email: "accounts@southsidebuild.com.au",
        address: "18 Greenway Street, Brookvale NSW",
        suburb: "Brookvale 2100",
        paymentTerms: "14 days",
        tags: ["Commercial", "Repeat client"],
        notes: "Send quotes to accounts, site access from 7am.",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
      },
      {
        id: secondClientId,
        name: "North Shore Renovations",
        contactPerson: "Tom Williams",
        phone: "0411 220 330",
        email: "site@northshorereno.com.au",
        address: "42 Oceanview Road, Manly NSW",
        suburb: "Manly 2095",
        paymentTerms: "7 days",
        tags: ["Residential", "Repeat client"],
        notes: "Monthly maintenance work, confirm parking before arrival.",
        createdAt: new Date(Date.now() - 604800000).toISOString(),
      },
      {
        id: strataClientId,
        name: "Harbour Strata Group",
        contactPerson: "Emma Patel",
        phone: "0422 880 114",
        email: "maintenance@harbourstrata.com.au",
        address: "9 Wharf Avenue, Newcastle NSW",
        suburb: "Newcastle 2300",
        paymentTerms: "14 days",
        tags: ["Commercial", "Strata"],
        notes: "Needs SWMS attached for common-area jobs and prefers Wednesday morning call-backs.",
        createdAt: new Date(Date.now() - 432000000).toISOString(),
      },
    ],
    jobs: [
      {
        id: warehouseJobId,
        clientId,
        clientName: "Southside Build Co",
        clientPhone: "0400 123 456",
        clientEmail: "accounts@southsidebuild.com.au",
        name: "Warehouse fit-off",
        address: "18 Greenway Street, Brookvale NSW",
        suburb: "Brookvale",
        description: "Fit-off, final fixing, material install, and site clean-up.",
        scheduledAt: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
        assignee: "Beau",
        quoteAmount: 8500,
        labourCost: 2400,
        materialCost: 3850,
        recurring: "One-off",
        internalNotes: "Bring fixings, check loading bay access.",
        status: "Upcoming",
        quoteStatus: "Draft",
        invoiceStatus: "Not invoiced",
        invoiceSent: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: defectsJobId,
        clientId,
        clientName: "Southside Build Co",
        clientPhone: "0400 123 456",
        clientEmail: "accounts@southsidebuild.com.au",
        name: "Office defect repairs",
        address: "18 Greenway Street, Brookvale NSW",
        suburb: "Brookvale",
        description: "Repair joinery defects and patch damaged trims.",
        scheduledAt: new Date(Date.now() - 86400000).toISOString().slice(0, 16),
        assignee: "Jake",
        quoteAmount: 1200,
        labourCost: 840,
        materialCost: 520,
        recurring: "One-off",
        internalNotes: "Client waiting on completion photos before payment.",
        status: "Active",
        quoteStatus: "Sent",
        invoiceStatus: "Not invoiced",
        invoiceSent: false,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: courtyardJobId,
        clientId: secondClientId,
        clientName: "North Shore Renovations",
        clientPhone: "0411 220 330",
        clientEmail: "site@northshorereno.com.au",
        name: "Courtyard landscaping",
        address: "42 Oceanview Road, Manly NSW",
        suburb: "Manly",
        description: "Monthly courtyard clean-up, planting refresh, and irrigation check.",
        scheduledAt: new Date(Date.now() + 604800000).toISOString().slice(0, 16),
        assignee: "Crew A",
        quoteAmount: 14600,
        labourCost: 5100,
        materialCost: 6200,
        recurring: "Monthly",
        internalNotes: "Recurring monthly job, order mulch 48 hours ahead.",
        status: "Upcoming",
        quoteStatus: "Approved",
        invoiceStatus: "Invoiced",
        invoiceSent: true,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: strataJobId,
        clientId: strataClientId,
        clientName: "Harbour Strata Group",
        clientPhone: "0422 880 114",
        clientEmail: "maintenance@harbourstrata.com.au",
        name: "Carpark bollard replacement",
        address: "9 Wharf Avenue, Newcastle NSW",
        suburb: "Newcastle",
        description: "Replace damaged bollards, install fresh anchors, and line-mark around the new bays.",
        scheduledAt: new Date(Date.now() + 345600000).toISOString().slice(0, 16),
        assignee: "Jake",
        quoteAmount: 3920,
        labourCost: 1180,
        materialCost: 1560,
        recurring: "One-off",
        internalNotes: "Check concrete cure window and strata sign-off before closing out.",
        status: "Active",
        quoteStatus: "Rejected",
        invoiceStatus: "Not invoiced",
        invoiceSent: false,
        createdAt: new Date(Date.now() - 345600000).toISOString(),
      },
    ],
    archivedJobs: [
      {
        id: archiveJobId,
        clientId,
        clientName: "Southside Build Co",
        clientPhone: "0400 123 456",
        clientEmail: "accounts@southsidebuild.com.au",
        name: "Front entry repair",
        address: "18 Greenway Street, Brookvale NSW",
        suburb: "Brookvale",
        description: "Replace front step trim and repair edge damage.",
        scheduledAt: new Date(Date.now() - 1209600000).toISOString().slice(0, 16),
        assignee: "Beau",
        quoteAmount: 2350,
        labourCost: 900,
        materialCost: 620,
        recurring: "One-off",
        internalNotes: "Completed and invoiced.",
        status: "Completed",
        quoteStatus: "Approved",
        invoiceStatus: "Paid",
        invoiceSent: true,
        createdAt: new Date(Date.now() - 1209600000).toISOString(),
        archivedAt: new Date(Date.now() - 604800000).toISOString(),
      },
    ],
    quotes: [
      {
        id: crypto.randomUUID(),
        quoteNumber: "PDT-Q-1042",
        clientId,
        clientName: "Southside Build Co",
        clientPhone: "0400 123 456",
        clientEmail: "accounts@southsidebuild.com.au",
        jobId: warehouseJobId,
        jobName: "Warehouse fit-off",
        siteAddress: "18 Greenway Street, Brookvale NSW",
        description: "Fit-off, final fixing, material install, and site clean-up across the front bay and office entry.",
        labourItems: "2 tradies x 3 days\\nFinal fix and install\\nHandover clean and defect pass",
        materialItems: "Fixings and trim\\nPanel consumables\\nAdhesives and site protection",
        labourAmount: 2400,
        materialAmount: 3850,
        gst: 625,
        total: 6875,
        notes: "Excludes after-hours access fees. Materials subject to supplier availability.",
        expiryDate: new Date(Date.now() + 1209600000).toISOString().slice(0, 10),
        status: "Draft",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        quoteNumber: "PDT-Q-1039",
        clientId,
        clientName: "Southside Build Co",
        clientPhone: "0400 123 456",
        clientEmail: "accounts@southsidebuild.com.au",
        jobId: defectsJobId,
        jobName: "Office defect repairs",
        siteAddress: "18 Greenway Street, Brookvale NSW",
        description: "Repair joinery defects, patch trims, and prep all affected areas for paint handover.",
        labourItems: "1 carpenter x 1 day\\nDefect pass and close-out report",
        materialItems: "Trim sections\\nFasteners\\nPatch compound",
        labourAmount: 840,
        materialAmount: 520,
        gst: 136,
        total: 1496,
        notes: "Paint touch-ups by others unless added to scope.",
        expiryDate: new Date(Date.now() + 604800000).toISOString().slice(0, 10),
        status: "Sent",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        quoteNumber: "PDT-Q-1035",
        clientId: secondClientId,
        clientName: "North Shore Renovations",
        clientPhone: "0411 220 330",
        clientEmail: "site@northshorereno.com.au",
        jobId: courtyardJobId,
        jobName: "Courtyard landscaping",
        siteAddress: "42 Oceanview Road, Manly NSW",
        description: "Monthly courtyard clean-up, planting refresh, irrigation checks, and waste removal.",
        labourItems: "Crew A monthly visit\\nIrrigation checks\\nPlanting refresh",
        materialItems: "Mulch, fertiliser, and replacement plants\\nWaste bags and consumables",
        labourAmount: 5100,
        materialAmount: 6200,
        gst: 1130,
        total: 12430,
        notes: "Monthly schedule can be shifted around site access and weather.",
        expiryDate: new Date(Date.now() + 2592000000).toISOString().slice(0, 10),
        status: "Accepted",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        quoteNumber: "PDT-Q-1031",
        clientId: strataClientId,
        clientName: "Harbour Strata Group",
        clientPhone: "0422 880 114",
        clientEmail: "maintenance@harbourstrata.com.au",
        jobId: strataJobId,
        jobName: "Carpark bollard replacement",
        siteAddress: "9 Wharf Avenue, Newcastle NSW",
        description: "Remove damaged bollards, core drill new fixings, install replacements, and tidy line-mark edges.",
        labourItems: "Crew install day\\nTraffic control support\\nSite sweep and handover",
        materialItems: "4 bollards\\nConcrete anchors\\nLine-mark paint and masking",
        labourAmount: 1180,
        materialAmount: 1560,
        gst: 274,
        total: 3014,
        notes: "Rejected on budget. Keep on file in case scope is trimmed and requoted.",
        expiryDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
        status: "Rejected",
        createdAt: new Date(Date.now() - 432000000).toISOString(),
      },
    ],
    invoices: [
      {
        id: crypto.randomUUID(),
        invoiceNumber: "PDT-INV-2084",
        clientId,
        client: "Southside Build Co",
        clientEmail: "accounts@southsidebuild.com.au",
        clientPhone: "0400 123 456",
        jobId: warehouseJobId,
        job: "Decking extension",
        materialsAmount: 2550,
        labourAmount: 1250,
        gst: 380,
        amount: 4180,
        status: "Unpaid",
        issueDate: new Date(Date.now() - 172800000).toISOString().slice(0, 10),
        dueDate: new Date(Date.now() + 432000000).toISOString().slice(0, 10),
        paymentMethod: "Bank transfer",
        paymentTerms: "7 days",
        notes: "Please use the invoice number as payment reference.",
        attachmentsNote: "Site photos and signed handover available on request.",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        invoiceNumber: "PDT-INV-2081",
        clientId: secondClientId,
        client: "North Shore Renovations",
        clientEmail: "site@northshorereno.com.au",
        clientPhone: "0411 220 330",
        jobId: courtyardJobId,
        job: "Courtyard landscaping",
        materialsAmount: 6200,
        labourAmount: 7072.73,
        gst: 1327.27,
        amount: 14600,
        status: "Paid",
        issueDate: new Date(Date.now() - 259200000).toISOString().slice(0, 10),
        dueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
        paymentMethod: "Bank transfer",
        paymentTerms: "7 days",
        notes: "Thanks for the quick turnaround.",
        attachmentsNote: "Includes completed maintenance checklist.",
        paidAt: new Date(Date.now() - 86400000).toISOString(),
        createdAt: new Date(Date.now() - 259200000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        invoiceNumber: "PDT-INV-2079",
        clientId,
        client: "Southside Build Co",
        clientEmail: "accounts@southsidebuild.com.au",
        clientPhone: "0400 123 456",
        jobId: archiveJobId,
        job: "Front entry repair",
        materialsAmount: 620,
        labourAmount: 1516.36,
        gst: 213.64,
        amount: 2350,
        status: "Unpaid",
        issueDate: new Date(Date.now() - 1209600000).toISOString().slice(0, 10),
        dueDate: new Date(Date.now() - 432000000).toISOString().slice(0, 10),
        paymentMethod: "Bank transfer",
        paymentTerms: "7 days",
        notes: "Friendly reminder due.",
        attachmentsNote: "Signed completion image on file.",
        createdAt: new Date(Date.now() - 1209600000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        invoiceNumber: "PDT-INV-2078",
        clientId,
        client: "Southside Build Co",
        clientEmail: "accounts@southsidebuild.com.au",
        clientPhone: "0400 123 456",
        jobId: "",
        job: "Small call-out prep",
        materialsAmount: 120,
        labourAmount: 280,
        gst: 40,
        amount: 440,
        status: "Draft",
        issueDate: new Date().toISOString().slice(0, 10),
        dueDate: new Date(Date.now() + 604800000).toISOString().slice(0, 10),
        paymentMethod: "Bank transfer",
        paymentTerms: "7 days",
        notes: "Draft invoice waiting for final call-out notes.",
        attachmentsNote: "No attachments added.",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        invoiceNumber: "PDT-INV-2075",
        clientId: strataClientId,
        client: "Harbour Strata Group",
        clientEmail: "maintenance@harbourstrata.com.au",
        clientPhone: "0422 880 114",
        jobId: strataJobId,
        job: "Carpark bollard replacement",
        materialsAmount: 740,
        labourAmount: 880,
        gst: 162,
        amount: 1782,
        status: "Draft",
        issueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
        dueDate: new Date(Date.now() + 1123200000).toISOString().slice(0, 10),
        paymentMethod: "Bank transfer",
        paymentTerms: "14 days",
        notes: "Hold draft until strata confirms revised scope.",
        attachmentsNote: "SWMS and before/after site photos queued.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
    expenses: [
      {
        id: crypto.randomUUID(),
        supplier: "Bunnings Trade",
        category: "Materials",
        jobId: warehouseJobId,
        job: "Warehouse fit-off",
        expenseDate: new Date().toISOString().slice(0, 10),
        paymentSource: "Business card",
        amount: 286.9,
        gst: 26.08,
        notes: "Fixings, adhesive, and site consumables.",
        receiptData: "assets/receipt-sample.jpg",
        receiptName: "bunnings-receipt.jpg",
        claimStatus: "Claimable",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        supplier: "Kennards Hire",
        category: "Equipment",
        jobId: courtyardJobId,
        job: "Courtyard landscaping",
        expenseDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
        paymentSource: "Bank transfer",
        amount: 418,
        gst: 38,
        notes: "Compactor hire for courtyard works.",
        receiptData: "",
        receiptName: "",
        claimStatus: "Claimable",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        supplier: "BP Fuel",
        category: "Fuel",
        jobId: "",
        job: "No linked job",
        expenseDate: new Date(Date.now() - 172800000).toISOString().slice(0, 10),
        paymentSource: "Fuel card",
        amount: 164.35,
        gst: 14.94,
        notes: "Ute diesel fill-up before site visits.",
        receiptData: "",
        receiptName: "",
        claimStatus: "Claimable",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        supplier: "Unknown docket",
        category: "Other",
        jobId: "",
        job: "No linked job",
        expenseDate: new Date(Date.now() - 259200000).toISOString().slice(0, 10),
        paymentSource: "Cash",
        amount: 89,
        gst: 0,
        notes: "Needs category check before BAS prep.",
        receiptData: "",
        receiptName: "",
        claimStatus: "Check category",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        supplier: "Steel-Line Supplies",
        category: "Materials",
        jobId: strataJobId,
        job: "Carpark bollard replacement",
        expenseDate: new Date(Date.now() - 432000000).toISOString().slice(0, 10),
        paymentSource: "Business card",
        amount: 312.4,
        gst: 28.4,
        notes: "Anchor hardware and replacement sleeves held for strata job.",
        receiptData: "",
        receiptName: "",
        claimStatus: "Claimable",
        createdAt: new Date(Date.now() - 432000000).toISOString(),
      },
    ],
    payrollEmployees: [
      {
        id: crypto.randomUUID(),
        name: "Jake Thompson",
        mobile: "0402 555 110",
        email: "jake@crew.com.au",
        role: "Lead carpenter",
        employmentType: "Employee",
        payType: "Hourly",
        payRate: 52,
        cycleHours: 38,
        superDetails: "Hostplus / 11.5% super",
        taxFile: "TFN on file",
        bankDetails: "BSB 062-000 / Acct ****4421",
        notes: "Runs site crew and checks material deliveries.",
        lastPayDate: new Date(Date.now() - 604800000).toISOString().slice(0, 10),
        status: "Active",
      },
      {
        id: crypto.randomUUID(),
        name: "Mia Nguyen",
        mobile: "0414 220 881",
        email: "mia@crew.com.au",
        role: "2nd year apprentice",
        employmentType: "Apprentice",
        payType: "Hourly",
        payRate: 31.5,
        cycleHours: 36,
        superDetails: "AustralianSuper / standard SG",
        taxFile: "TFN declaration received",
        bankDetails: "BSB 082-010 / Acct ****7742",
        notes: "TAFE Wednesdays. Review overtime before each run.",
        lastPayDate: new Date(Date.now() - 604800000).toISOString().slice(0, 10),
        status: "Active",
      },
      {
        id: crypto.randomUUID(),
        name: "Nate's Electrical",
        mobile: "0409 880 771",
        email: "admin@nateselectrical.com.au",
        role: "Electrical subcontractor",
        employmentType: "Contractor",
        payType: "Hourly",
        payRate: 88,
        cycleHours: 16,
        superDetails: "No super setup / contractor invoice",
        taxFile: "ABN supplied",
        bankDetails: "Contractor bank details on file",
        notes: "Use for fit-off callouts and defect support.",
        lastPayDate: new Date(Date.now() - 1209600000).toISOString().slice(0, 10),
        status: "Active",
      },
      {
        id: crypto.randomUUID(),
        name: "Liam Carter",
        mobile: "0499 118 221",
        email: "liam@crew.com.au",
        role: "Labourer",
        employmentType: "Employee",
        payType: "Hourly",
        payRate: 39,
        cycleHours: 0,
        superDetails: "REST / paused while inactive",
        taxFile: "TFN on file",
        bankDetails: "BSB 032-120 / Acct ****9910",
        notes: "Seasonal crew member. Keep inactive unless booked.",
        lastPayDate: new Date(Date.now() - 2678400000).toISOString().slice(0, 10),
        status: "Inactive",
      },
      {
        id: crypto.randomUUID(),
        name: "Ella Brooks",
        mobile: "0418 762 449",
        email: "ella@crew.com.au",
        role: "Office coordinator",
        employmentType: "Employee",
        payType: "Salary",
        payRate: 78000,
        cycleHours: 38,
        superDetails: "CBUS / 11.5% super",
        taxFile: "TFN on file",
        bankDetails: "BSB 033-001 / Acct ****6204",
        notes: "Handles quote follow-up, supplier accounts, and overdue invoice chases.",
        lastPayDate: new Date(Date.now() - 604800000).toISOString().slice(0, 10),
        status: "Active",
      },
    ],
    payrollRuns: [
      {
        id: crypto.randomUUID(),
        runDate: new Date(Date.now() - 604800000).toISOString().slice(0, 10),
        staffCount: 4,
        grossTotal: 8372,
        superTotal: 702.42,
        status: "Complete",
        payslips: ["Jake Thompson", "Mia Nguyen", "Nate's Electrical", "Ella Brooks"],
        notes: "Weekly run completed and payslips sent.",
      },
      {
        id: crypto.randomUUID(),
        runDate: new Date(Date.now() + 259200000).toISOString().slice(0, 10),
        staffCount: 4,
        grossTotal: 7516,
        superTotal: 701.96,
        status: "Scheduled",
        payslips: ["Jake Thompson", "Mia Nguyen", "Nate's Electrical", "Ella Brooks"],
        notes: "Next pay run due soon. Confirm apprentice hours before processing.",
      },
    ],
  };
}

function isLegacyDemoUser(user = {}) {
  const clientNames = Array.isArray(user.clients) ? user.clients.map((client) => client?.name).filter(Boolean) : [];
  const jobNames = Array.isArray(user.jobs) ? user.jobs.map((job) => job?.name).filter(Boolean) : [];
  return (
    user.businessAddress === "12 Tradie Lane, Brisbane QLD"
    || clientNames.includes("Southside Build Co")
    || clientNames.includes("North Shore Renovations")
    || jobNames.includes("Warehouse fit-off")
    || jobNames.includes("Courtyard landscaping")
  );
}

function buildSeedUser(name, email, password, plan = "Starter") {
  return {
    name,
    email,
    password,
    plan: normalisePlanName(plan, "Starter"),
    businessName: "",
    abn: "",
    businessEmail: email,
    businessPhone: "",
    businessAddress: "",
    tradeType: "",
    businessLogo: "assets/logo-wordmark.png",
    brandTone: "Classic green",
    defaultPaymentTerms: "14 days",
    defaultQuoteExpiryDays: 14,
    invoicePrefix: "PDT-INV",
    quotePrefix: "PDT-Q",
    gstMode: "GST registered",
    taxVaultRate: 0.2,
    notificationSettings: {
      invoiceReminders: true,
      overdueReminders: true,
      payrollReminders: true,
      paymentAlerts: true,
      jobAlerts: true,
    },
    teamUsers: [
      { id: crypto.randomUUID(), name, email, role: "Owner", status: "Active" },
    ],
    bankConnection: "Not connected",
    paymentMethod: "Bank transfer",
    integrationNotes: "",
    defaultWorkspaceView: "Dashboard",
    themePreference: "Light",
    twoFactorStatus: "Setup pending",
    sessionNotes: "",
    clients: [],
    jobs: [],
    archivedJobs: [],
    quotes: [],
    invoices: [],
    expenses: [],
    payrollEmployees: [],
    payrollRuns: [],
  };
}

function normaliseUser(user) {
  const plan = normalisePlanName(user.plan, "Starter");
  const sourceUser = isLegacyDemoUser(user)
    ? {
      ...user,
      businessName: "",
      abn: "",
      businessPhone: "",
      businessAddress: "",
      tradeType: "",
      integrationNotes: "",
      sessionNotes: "",
      clients: [],
      jobs: [],
      archivedJobs: [],
      quotes: [],
      invoices: [],
      expenses: [],
      payrollEmployees: [],
      payrollRuns: [],
    }
    : user;
  const seedUser = buildSeedUser(sourceUser.name || "Tradie", sourceUser.email, sourceUser.password || "", plan);
  const normalisedUser = {
      name: sourceUser.name || "Tradie",
      email: sourceUser.email,
      password: sourceUser.password || "",
      plan,
      businessName: sourceUser.businessName || "",
      abn: sourceUser.abn || "",
      businessEmail: sourceUser.businessEmail || sourceUser.email,
      businessPhone: sourceUser.businessPhone || "",
      businessAddress: sourceUser.businessAddress || "",
      tradeType: sourceUser.tradeType || "",
      businessLogo: sourceUser.businessLogo || "assets/logo-wordmark.png",
      brandTone: sourceUser.brandTone || "Classic green",
      defaultPaymentTerms: sourceUser.defaultPaymentTerms || "14 days",
      defaultQuoteExpiryDays: Number(sourceUser.defaultQuoteExpiryDays || 14),
      invoicePrefix: sourceUser.invoicePrefix || "PDT-INV",
      quotePrefix: sourceUser.quotePrefix || "PDT-Q",
      gstMode: sourceUser.gstMode || "GST registered",
      taxVaultRate: typeof sourceUser.taxVaultRate === "number" ? sourceUser.taxVaultRate : 0.2,
      notificationSettings: {
        invoiceReminders: sourceUser.notificationSettings?.invoiceReminders !== false,
        overdueReminders: sourceUser.notificationSettings?.overdueReminders !== false,
        payrollReminders: sourceUser.notificationSettings?.payrollReminders !== false,
        paymentAlerts: sourceUser.notificationSettings?.paymentAlerts !== false,
        jobAlerts: sourceUser.notificationSettings?.jobAlerts !== false,
      },
      teamUsers: Array.isArray(sourceUser.teamUsers) && sourceUser.teamUsers.length
        ? sourceUser.teamUsers.map((item) => ({
          id: item.id || crypto.randomUUID(),
          name: item.name || "Team user",
          email: item.email || sourceUser.email,
          role: item.role || "Admin",
          status: item.status || "Invited",
        }))
        : seedUser.teamUsers,
      bankConnection: sourceUser.bankConnection || "Not connected",
      paymentMethod: sourceUser.paymentMethod || "Bank transfer",
      integrationNotes: sourceUser.integrationNotes || "",
      defaultWorkspaceView: sourceUser.defaultWorkspaceView || "Dashboard",
      themePreference: sourceUser.themePreference || "Light",
      twoFactorStatus: sourceUser.twoFactorStatus || "Setup pending",
      sessionNotes: sourceUser.sessionNotes || "",
      clients: Array.isArray(sourceUser.clients) && sourceUser.clients.length
        ? sourceUser.clients.map((client, index) => ({
          id: client.id || crypto.randomUUID(),
          name: client.name || "Unnamed client",
          contactPerson: client.contactPerson || "Site contact",
          phone: client.phone || "",
          email: client.email || "",
          address: client.address || "",
          suburb: client.suburb || deriveSuburb(client.address || ""),
          paymentTerms: client.paymentTerms || "14 days",
          tags: Array.isArray(client.tags)
            ? client.tags
            : String(client.tags || "")
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          notes: client.notes || "",
          createdAt: client.createdAt || new Date(Date.now() - index * 86400000).toISOString(),
        }))
        : seedUser.clients,
      jobs: Array.isArray(sourceUser.jobs) ? sourceUser.jobs.map((job) => normaliseJob(job)) : seedUser.jobs,
      archivedJobs: Array.isArray(sourceUser.archivedJobs) ? sourceUser.archivedJobs.map((job) => normaliseJob(job, true)) : seedUser.archivedJobs,
      quotes: Array.isArray(sourceUser.quotes) && sourceUser.quotes.length
        ? sourceUser.quotes.map((quote, index) => normaliseQuote(quote, index, sourceUser.clients || seedUser.clients))
        : deriveQuotesFromJobs(sourceUser.jobs || seedUser.jobs, sourceUser.archivedJobs || seedUser.archivedJobs, sourceUser.clients || seedUser.clients, seedUser.quotes),
      invoices: Array.isArray(sourceUser.invoices)
        ? sourceUser.invoices.map((invoice, index) => normaliseInvoice(invoice, index, sourceUser.clients || seedUser.clients))
        : seedUser.invoices,
      expenses: Array.isArray(sourceUser.expenses)
        ? sourceUser.expenses.map((expense, index) => normaliseExpense(expense, index, [...(sourceUser.jobs || seedUser.jobs), ...(sourceUser.archivedJobs || seedUser.archivedJobs)]))
        : seedUser.expenses,
      payrollEmployees: Array.isArray(sourceUser.payrollEmployees) && sourceUser.payrollEmployees.length
        ? sourceUser.payrollEmployees.map((staff, index) => normalisePayrollEmployee(staff, index))
        : seedUser.payrollEmployees,
        payrollRuns: Array.isArray(sourceUser.payrollRuns) && sourceUser.payrollRuns.length
          ? sourceUser.payrollRuns.map((run, index) => normalisePayrollRun(run, index))
          : seedUser.payrollRuns,
      };
    return enforcePlanDataLimits(normalisedUser);
    }

function normaliseExpenseCategory(category) {
  const value = String(category || "").trim();
  if (["Materials", "Fuel", "Labour", "Equipment", "Other"].includes(value)) return value;
  if (value === "Tools") return "Equipment";
  if (value === "Subcontractor") return "Labour";
  if (value === "Admin" || value === "Uncategorised") return "Other";
  return value || "Materials";
}

function getExpenseClaimStatus(category, existingStatus = "") {
  const status = String(existingStatus || "").trim();
  if (status && status !== "Uncategorised") return status;
  return category === "Other" ? "Check category" : "Claimable";
}

function normaliseExpense(expense, index = 0, jobs = []) {
  const linkedJob = jobs.find((job) => job.id === expense.jobId || job.name === expense.job);
  const category = normaliseExpenseCategory(expense.category);
  return {
    id: expense.id || crypto.randomUUID(),
    supplier: expense.supplier || "Supplier",
    category,
    jobId: expense.jobId || linkedJob?.id || "",
    job: expense.job || linkedJob?.name || "No linked job",
    expenseDate: toDateInputValue(expense.expenseDate || expense.createdAt || new Date().toISOString()),
    paymentSource: expense.paymentSource || "Business card",
    amount: Number(expense.amount || 0),
    gst: Number(expense.gst || 0),
    notes: expense.notes || "Captured from site.",
    receiptData: expense.receiptData || "",
    receiptName: expense.receiptName || "",
    receiptType: expense.receiptType || (String(expense.receiptData || "").startsWith("data:image/") || String(expense.receiptData || "").startsWith("assets/") ? "image" : ""),
    claimStatus: getExpenseClaimStatus(category, expense.claimStatus),
    createdAt: expense.createdAt || new Date(Date.now() - index * 86400000).toISOString(),
  };
}

function normalisePayrollEmployee(staff, index = 0) {
  return {
    id: staff.id || crypto.randomUUID(),
    name: staff.name || "Crew member",
    mobile: staff.mobile || "",
    email: staff.email || "",
    role: staff.role || "Site crew",
    employmentType: staff.employmentType || "Employee",
    payType: staff.payType || "Hourly",
    payRate: Number(staff.payRate || 0),
    cycleHours: Number(staff.cycleHours || 0),
    superDetails: staff.superDetails || "Super details to confirm",
    taxFile: staff.taxFile || "TFN details to confirm",
    bankDetails: staff.bankDetails || "Bank details to confirm",
    notes: staff.notes || "Payroll note.",
    lastPayDate: toDateInputValue(staff.lastPayDate || new Date(Date.now() - index * 604800000).toISOString()),
    status: staff.status || "Active",
  };
}

function normalisePayrollRun(run, index = 0) {
  return {
    id: run.id || crypto.randomUUID(),
    runDate: toDateInputValue(run.runDate || new Date(Date.now() - index * 604800000).toISOString()),
    staffCount: Number(run.staffCount || 0),
    grossTotal: Number(run.grossTotal || 0),
    superTotal: Number(run.superTotal || 0),
    status: run.status || "Scheduled",
    payslips: Array.isArray(run.payslips) ? run.payslips : [],
    notes: run.notes || "Payroll run ready for review.",
  };
}

function normaliseQuote(quote, index = 0, clients = []) {
  const client = clients.find((item) => item.id === quote.clientId || item.name === quote.clientName);
  const labourAmount = Number(quote.labourAmount || quote.labourCost || 0);
  const materialAmount = Number(quote.materialAmount || quote.materialCost || 0);
  const total = Number(quote.total || quote.quoteAmount || (labourAmount + materialAmount) * 1.1 || 0);

  return {
    id: quote.id || crypto.randomUUID(),
    quoteNumber: quote.quoteNumber || `PDT-Q-${String(1040 + index).padStart(4, "0")}`,
    clientId: quote.clientId || client?.id || "",
    clientName: quote.clientName || client?.name || "Client not assigned",
    clientPhone: quote.clientPhone || client?.phone || "",
    clientEmail: quote.clientEmail || client?.email || "",
    jobId: quote.jobId || "",
    jobName: quote.jobName || quote.name || "Job quote",
    siteAddress: quote.siteAddress || quote.address || client?.address || "Sydney NSW",
    description: quote.description || "Scope to be confirmed.",
    labourItems: quote.labourItems || "Labour allowance",
    materialItems: quote.materialItems || "Material allowance",
    labourAmount,
    materialAmount,
    gst: Number(quote.gst || roundCurrency(total / 11)),
    total,
    notes: quote.notes || quote.internalNotes || "Standard exclusions apply unless noted.",
    expiryDate: toDateInputValue(quote.expiryDate || new Date(Date.now() + Number(currentUser?.defaultQuoteExpiryDays || 14) * 86400000).toISOString()),
    status: quote.status === "Approved" ? "Accepted" : quote.status || "Draft",
    createdAt: quote.createdAt || new Date(Date.now() - index * 86400000).toISOString(),
  };
}

function deriveQuotesFromJobs(activeJobs = [], archivedJobs = [], clients = [], fallbackQuotes = []) {
  const sourceJobs = [...activeJobs, ...archivedJobs];
  if (!sourceJobs.length) {
    return fallbackQuotes;
  }

  return sourceJobs.map((job, index) => normaliseQuote({
    id: crypto.randomUUID(),
    quoteNumber: `PDT-Q-${String(1090 - index).padStart(4, "0")}`,
    clientId: job.clientId,
    clientName: job.clientName,
    clientPhone: job.clientPhone,
    clientEmail: job.clientEmail,
    jobId: job.id,
    jobName: job.name,
    siteAddress: job.address,
    description: job.description,
    labourItems: `${job.assignee || "Crew"} labour allowance`,
    materialItems: `Materials allowance for ${job.name}`,
    labourAmount: job.labourCost,
    materialAmount: job.materialCost,
    gst: roundCurrency(Number(job.quoteAmount || 0) / 11),
    total: Number(job.quoteAmount || 0),
    notes: job.internalNotes || "Generated from job details.",
    expiryDate: new Date(Date.now() + (14 - index) * 86400000).toISOString().slice(0, 10),
    status: job.quoteStatus === "Approved" ? "Accepted" : job.quoteStatus || "Draft",
    createdAt: job.createdAt || new Date().toISOString(),
  }, index, clients));
}

function normaliseInvoice(invoice, index = 0, clients = []) {
  const client = clients.find((item) => item.id === invoice.clientId || item.name === invoice.client);
  const amount = Number(invoice.amount || 0);
  const gst = Number(invoice.gst || roundCurrency(amount / 11));
  const issueDate = toDateInputValue(invoice.issueDate || invoice.createdAt || new Date().toISOString());
  const fallbackTerms = client?.paymentTerms || "7 days";

  return {
    id: invoice.id || crypto.randomUUID(),
    invoiceNumber: invoice.invoiceNumber || `PDT-INV-${String(2080 + index).padStart(4, "0")}`,
    clientId: invoice.clientId || client?.id || "",
    client: invoice.client || client?.name || "Client not assigned",
    clientEmail: invoice.clientEmail || client?.email || getClientEmailFromList(clients, invoice.client),
    clientPhone: invoice.clientPhone || client?.phone || "",
    jobId: invoice.jobId || "",
    job: invoice.job || "Job",
    siteAddress: invoice.siteAddress || client?.address || "",
    invoiceType: invoice.invoiceType || "Final invoice",
    lineItems: Array.isArray(invoice.lineItems) ? invoice.lineItems : [],
    materialsAmount: Number(invoice.materialsAmount || Math.max(0, amount - gst)),
    labourAmount: Number(invoice.labourAmount || 0),
    amount,
    gst,
    issueDate,
    dueDate: toDateInputValue(invoice.dueDate || calculateDueDate(issueDate, invoice.paymentTerms || fallbackTerms)),
    status: invoice.status || "Unpaid",
    paymentMethod: invoice.paymentMethod || "Bank transfer",
    paymentTerms: invoice.paymentTerms || fallbackTerms,
    notes: invoice.notes || "Please use the invoice number as payment reference.",
    attachmentsNote: invoice.attachmentsNote || "Supporting photos or receipts can be sent on request.",
    paidAt: invoice.paidAt || (invoice.status === "Paid" ? invoice.createdAt || new Date().toISOString() : null),
    createdAt: invoice.createdAt || new Date(Date.now() - index * 86400000).toISOString(),
  };
}

function normaliseJob(job, archived = false) {
  return {
    id: job.id || crypto.randomUUID(),
    clientId: job.clientId || "",
    clientName: job.clientName || "Client not assigned",
    clientPhone: job.clientPhone || "",
    clientEmail: job.clientEmail || "",
    address: job.address || "Sydney NSW",
    suburb: job.suburb || deriveSuburb(job.address || "Sydney NSW"),
    name: job.name || "Job",
    description: job.description || "Job details to confirm.",
    scheduledAt: toDateTimeLocalValue(job.scheduledAt || new Date().toISOString()),
    assignee: job.assignee || "Beau",
    quoteAmount: Number(job.quoteAmount || job.amount || 0),
    labourCost: Number(job.labourCost || 0),
    materialCost: Number(job.materialCost || 0),
    recurring: job.recurring || "One-off",
    internalNotes: job.internalNotes || job.note || "",
    status: archived ? "Completed" : (job.status || "Active"),
    quoteStatus: job.quoteStatus || (job.invoiceSent ? "Approved" : "Draft"),
    invoiceStatus: job.invoiceStatus || (job.invoiceSent ? "Invoiced" : "Not invoiced"),
    invoiceSent: Boolean(job.invoiceSent),
    createdAt: job.createdAt || new Date().toISOString(),
    archivedAt: job.archivedAt || null,
  };
}

function openWorkspace() {
  els.siteHeader.classList.add("hidden");
  els.landingApp.classList.add("hidden");
  els.siteFooter.classList.add("hidden");
  els.workspaceApp.classList.remove("hidden");
  els.workspaceTitle.textContent = `G'day, ${currentUser.name}`;
  els.workspaceSubtitle.textContent = `${currentUser.email} is signed in on the ${currentUser.plan} plan. Keep the right tools in view without the clutter you do not need yet.`;
  renderPlanSummary();
  renderWorkspace();
  applyPlanAccess();
  syncWorkspaceNavState(window.location.hash || "#workspace-dashboard");
  closeQuickCreateMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPlanSummary() {
  const plan = normalisePlanName(currentUser?.plan, "Starter");
  const userLimit = getPlanUserLimit(plan);

  if (els.workspacePlanBadge) {
    els.workspacePlanBadge.textContent = `${plan} plan`;
    els.workspacePlanBadge.className = `status-badge ${plan === "Business" ? "status-active" : plan === "Crew" ? "status-safe" : "status-draft"}`;
  }

  if (els.workspacePlanCopy) {
    els.workspacePlanCopy.textContent = getPlanMarketingCopy(plan);
  }

  if (els.settingsPlanName) {
    els.settingsPlanName.textContent = plan;
  }

  if (els.settingsPlanCopy) {
    els.settingsPlanCopy.textContent = getPlanMarketingCopy(plan);
  }

  if (els.settingsPlanLimit) {
    els.settingsPlanLimit.textContent = `${userLimit} ${userLimit === 1 ? "user" : "staff"}`;
    els.settingsPlanLimit.className = `status-badge ${plan === "Business" ? "status-active" : plan === "Crew" ? "status-safe" : "status-draft"}`;
  }
}

function highlightPricingPlan(plan = normalisePlanName(currentUser?.plan, "Starter")) {
  document.querySelectorAll("[data-plan-card]").forEach((card) => {
    const isCurrentPlan = card.getAttribute("data-plan-card") === normalisePlanName(plan, "Starter");
    card.classList.toggle("is-current-plan", isCurrentPlan);
  });
}

function applyPlanAccess() {
  els.workspaceApp.dataset.plan = normalisePlanName(currentUser?.plan, "Starter");

  document.querySelectorAll(".workspace-nav a[data-workspace-link]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const pageKey = href.replace("#", "");
    const feature = WORKSPACE_PAGE_FEATURES[pageKey];
    const locked = Boolean(feature) && !hasFeature(feature);
    link.hidden = false;
    link.dataset.locked = locked ? "true" : "false";
  });

  els.quickCreateWrap?.classList.toggle("hidden", !currentUser);
  if (els.quickCreateExpense) {
    els.quickCreateExpense.hidden = !hasFeature("expensesPage");
  }
}

function syncWorkspaceNavState(targetHash) {
  const fallbackHash = "#workspace-dashboard";
  const safeHash = resolveWorkspaceRouteHash(targetHash, fallbackHash);

  const navLinks = document.querySelectorAll(".workspace-nav a[data-workspace-link]");
  const matchingLink = Array.from(navLinks).find((item) => item.getAttribute("href") === safeHash)
    || document.querySelector(`.workspace-nav a[href="${fallbackHash}"]`);

  navLinks.forEach((item) => item.classList.toggle("active", item === matchingLink));
  updateWorkspacePageVisibility(safeHash);
}

function resolveWorkspaceRouteHash(targetHash, fallbackHash = "#workspace-dashboard") {
  const rawHash = targetHash ? String(targetHash) : "";

  if (!rawHash.startsWith("#")) {
    return fallbackHash;
  }

  const targetElement = document.getElementById(rawHash.slice(1));
  const pageOwner = targetElement?.closest("[data-workspace-page]");

  if (pageOwner?.dataset.workspacePage) {
    return `#${pageOwner.dataset.workspacePage}`;
  }

  if (rawHash.startsWith("#workspace-")) {
    return rawHash;
  }

  return fallbackHash;
}

function updateWorkspacePageVisibility(activeHash) {
  const activePage = String(activeHash || "#workspace-dashboard").replace("#", "");
  const workspaceBoard = document.querySelector(".workspace-board");
  const workspaceGrid = document.querySelector(".workspace-grid");
  ensureWorkspacePageSlots();

  if (workspaceBoard && workspaceGrid) {
    Object.values(workspacePageSlots || {}).flat().forEach((section) => {
      section.hidden = true;
    });

    if (workspaceGrid.parentElement !== workspaceBoard) {
      workspaceBoard.replaceChildren(workspaceGrid);
    }

    workspaceGrid.replaceChildren();
    workspaceBoard.dataset.activePage = activePage;
    workspaceGrid.dataset.activePage = activePage;
    const pageSections = workspacePageSlots?.[activePage] || workspacePageSlots?.["workspace-dashboard"] || [];
    pageSections.forEach((section) => {
      section.hidden = false;
      section.style.removeProperty("display");
    });
    workspaceGrid.replaceChildren(...pageSections);
  }

  els.quickCreateWrap?.classList.toggle(
    "is-builder-safe",
    activePage === "workspace-invoices" || activePage === "workspace-quotes"
  );

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setLockedPrompt(element, config, isVisible) {
  if (!element) return;
  element.classList.toggle("hidden", !isVisible);
  if (isVisible) {
    element.innerHTML = buildUpgradePromptHtml(config);
  } else {
    element.innerHTML = "";
  }
}

function getLockedFeatureCopy(featureKey) {
  const config = LOCKED_FEATURE_CONTENT[featureKey];
  if (!config) return null;
  const parts = [config.intro, config.detail].filter(Boolean);
  return {
    eyebrow: config.eyebrow,
    title: config.title,
    copy: parts.join(" "),
    buttonLabel: config.buttonLabel,
  };
}

function renderLockedFeaturePage(featureKey) {
  const config = LOCKED_FEATURE_CONTENT[featureKey];
  if (!config?.pageId) return false;

  const page = document.getElementById(config.pageId);
  if (!page) return false;

  applyPageLockedState(config.pageId, featureKey, true);
  return true;
}

function guardFeatureRender(featureKey) {
  if (hasFeature(featureKey)) {
    const config = LOCKED_FEATURE_CONTENT[featureKey];
    if (config?.pageId) {
      applyPageLockedState(config.pageId, featureKey, false);
    }
    return true;
  }

  renderLockedFeaturePage(featureKey);
  return false;
}

function applyPageLockedState(pageId, featureKey, locked) {
  const page = document.getElementById(pageId);
  const config = LOCKED_FEATURE_CONTENT[featureKey];
  if (!page || !config) return;

  page.classList.toggle("is-plan-locked", locked);

  const prompt = page.querySelector(".plan-locked-card");
  if (prompt) {
    const lockedCopy = getLockedFeatureCopy(featureKey);
    setLockedPrompt(prompt, {
      eyebrow: lockedCopy.eyebrow,
      title: lockedCopy.title,
      copy: lockedCopy.copy,
      feature: featureKey,
      buttonLabel: lockedCopy.buttonLabel,
    }, locked);
  }

  page.querySelectorAll("[data-plan-lock-surface]").forEach((surface) => {
    surface.classList.toggle("plan-lock-surface", locked);
    surface.setAttribute("aria-hidden", locked ? "true" : "false");
  });
}

function applyPlanLockedStates() {
  const isStarter = normalisePlanName(currentUser?.plan, "Starter") === "Starter";
  const canUsePayroll = hasFeature("payrollPage");
  const canUsePayrollExports = hasFeature("payrollExports");
  const canUseReports = hasFeature("businessReporting");
  const canUseStaffPermissions = hasFeature("staffPermissions");
  const canUseInvoiceApprovals = hasFeature("invoiceApprovalControls");
  const canUseTeamBoard = hasFeature("teamJobBoard");

  applyPageLockedState("workspace-payroll", "payrollPage", !canUsePayroll);
  applyPageLockedState("workspace-reports", "businessReporting", !canUseReports);

  if (els.teamJobBoardCard) {
    els.teamJobBoardCard.classList.toggle("is-plan-locked", !canUseTeamBoard);
  }

  setLockedPrompt(els.settingsTeamLockedPrompt, {
    eyebrow: LOCKED_FEATURE_CONTENT.staffPermissions.eyebrow,
    title: LOCKED_FEATURE_CONTENT.staffPermissions.title,
    copy: getLockedFeatureCopy("staffPermissions").copy,
    feature: "staffPermissions",
    buttonLabel: LOCKED_FEATURE_CONTENT.staffPermissions.buttonLabel,
  }, !canUseStaffPermissions);

  setLockedPrompt(els.invoiceApprovalPrompt, {
    eyebrow: LOCKED_FEATURE_CONTENT.invoiceApprovalControls.eyebrow,
    title: LOCKED_FEATURE_CONTENT.invoiceApprovalControls.title,
    copy: getLockedFeatureCopy("invoiceApprovalControls").copy,
    feature: "invoiceApprovalControls",
    buttonLabel: LOCKED_FEATURE_CONTENT.invoiceApprovalControls.buttonLabel,
  }, !canUseInvoiceApprovals);

  setLockedPrompt(els.teamJobBoardLockedPrompt, {
    eyebrow: "Crew feature",
    title: "Team job board is available on Crew plan",
    copy: "See assigned jobs, next calls, and margin pressure across your crew in one place.",
    feature: "teamJobBoard",
    buttonLabel: "Upgrade plan",
  }, !canUseTeamBoard);

  if (els.settingsTeamAccessCard) {
    els.settingsTeamAccessCard.classList.toggle("is-locked", !canUseStaffPermissions);
    els.settingsTeamAccessCard.querySelectorAll("input, select, button, textarea").forEach((field) => {
      if (field.id === "settingsTeamLockedPrompt") return;
      field.disabled = !canUseStaffPermissions;
    });
  }

  if (els.payrollOpenEmployeeModalButton) {
    els.payrollOpenEmployeeModalButton.disabled = !canUsePayroll;
  }
  if (els.exportPayrollButton) {
    els.exportPayrollButton.disabled = !canUsePayrollExports;
  }
  if (els.runPayrollButton) {
    els.runPayrollButton.disabled = !canUsePayroll;
  }
  if (els.exportReportsButton) {
    els.exportReportsButton.disabled = !canUseReports;
  }
  if (els.invoiceApprovalField) {
    els.invoiceApprovalField.classList.toggle("hidden", !canUseInvoiceApprovals);
  }
  if (els.invoiceApprovalRequiredSelect) {
    if (!canUseInvoiceApprovals) {
      els.invoiceApprovalRequiredSelect.value = "no";
    }
    els.invoiceApprovalRequiredSelect.disabled = !canUseInvoiceApprovals;
  }

  if (els.dashboardMarginLabel) {
    els.dashboardMarginLabel.textContent = isStarter ? "Jobs on file" : "Jobs losing profit";
  }
}

function applyPlanDashboardState() {
  if (isFirstUseWorkspace()) {
    return;
  }
  const canSeeProfitability = hasFeature("jobProfitability");
  const canCompareJobs = hasFeature("compareActiveJobs");
  const activeJobs = currentUser?.jobs?.filter((job) => job.status !== "Archived").length || 0;
  const marginRiskJobs = currentUser?.jobs?.filter((job) => Number(job.labourCost || 0) + Number(job.materialCost || 0) > Number(job.quoteAmount || 0)).length || 0;

  if (canCompareJobs) {
    els.dashboardUrgentMargin.textContent = String(activeJobs);
    els.dashboardUrgentMarginCopy.textContent = `${activeJobs} active job${activeJobs === 1 ? "" : "s"} visible across the business.`;
  } else if (canSeeProfitability) {
    els.dashboardUrgentMargin.textContent = String(marginRiskJobs);
    els.dashboardUrgentMarginCopy.textContent = marginRiskJobs
      ? `${marginRiskJobs} job${marginRiskJobs === 1 ? "" : "s"} need margin attention.`
      : "Current job pricing is holding margin.";
  } else {
    els.dashboardUrgentMargin.textContent = String(activeJobs);
    els.dashboardUrgentMarginCopy.textContent = `${activeJobs} job${activeJobs === 1 ? "" : "s"} currently on the go.`;
  }
}

function ensureWorkspacePageSlots() {
  if (workspacePageSlots) return;

  workspacePageSlots = {};

  document.querySelectorAll("[data-workspace-page]").forEach((section) => {
    const pageKey = section.dataset.workspacePage || "workspace-dashboard";
    if (!workspacePageSlots[pageKey]) {
      workspacePageSlots[pageKey] = [];
    }
    workspacePageSlots[pageKey].push(section);
    section.remove();
  });
}

function signOut() {
  currentUser = null;
  localStorage.removeItem(SESSION_KEY);
  els.siteHeader.classList.remove("hidden");
  els.workspaceApp.classList.add("hidden");
  els.landingApp.classList.remove("hidden");
  els.siteFooter.classList.remove("hidden");
  closeQuickCreateMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildClientPayload(data, options = {}) {
  const { existingClientId = "", tags = null } = options;
  return {
    id: existingClientId || crypto.randomUUID(),
    name: String(data.name).trim(),
    contactPerson: String(data.contactPerson).trim(),
    phone: String(data.phone).trim(),
    email: String(data.email).trim(),
    address: String(data.address).trim(),
    suburb: String(data.suburb).trim(),
    paymentTerms: String(data.paymentTerms).trim(),
    tags: Array.isArray(tags)
      ? tags
      : String(data.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    notes: String(data.notes || "").trim(),
    createdAt: existingClientId
      ? (currentUser.clients.find((client) => client.id === existingClientId)?.createdAt || new Date().toISOString())
      : new Date().toISOString(),
  };
}

function saveClientPayload(clientPayload, options = {}) {
  const { existingClientId = editingClientId } = options;
  if (existingClientId) {
    const clientIndex = currentUser.clients.findIndex((client) => client.id === existingClientId);
    const previousClient = currentUser.clients[clientIndex];
    if (clientIndex >= 0) {
      currentUser.clients.splice(clientIndex, 1);
    }
    currentUser.clients.unshift(clientPayload);
    syncClientLinkedRecords(clientPayload, previousClient);
    if (editingClientId === existingClientId) {
      editingClientId = null;
      els.clientForm.querySelector('button[type="submit"]').textContent = "Save client";
    }
  } else {
    currentUser.clients.unshift(clientPayload);
  }
  persistCurrentUser();
  return clientPayload;
}

function buildJobPayload(data) {
  const client = currentUser.clients.find((item) => item.id === data.clientId);
  if (!client) return null;
  const selectedStatus = String(data.status || "").trim();
  return {
    id: crypto.randomUUID(),
    clientId: client.id,
    clientName: client.name,
    clientPhone: String(data.clientPhone || client.phone).trim(),
    clientEmail: String(data.clientEmail || client.email).trim(),
    address: String(data.address || client.address || "").trim(),
    suburb: deriveSuburb(String(data.address || client.address || "")),
    name: String(data.name).trim(),
    description: String(data.description).trim(),
    scheduledAt: String(data.scheduledAt),
    assignee: String(data.assignee).trim(),
    quoteAmount: Number(data.quoteAmount),
    labourCost: Number(data.labourCost),
    materialCost: Number(data.materialCost),
    recurring: String(data.recurring),
    internalNotes: String(data.internalNotes || "").trim(),
    status: selectedStatus || getJobStatusFromSchedule(String(data.scheduledAt)),
    quoteStatus: "Draft",
    invoiceStatus: "Not invoiced",
    invoiceSent: false,
    createdAt: new Date().toISOString(),
  };
}

function saveJobPayload(jobPayload) {
  currentUser.jobs.unshift(jobPayload);
  persistCurrentUser();
  return jobPayload;
}

function quoteDraftFromClient(client) {
  return {
    sourceJobId: "",
    clientId: client.id,
    clientPhone: client.phone,
    clientEmail: client.email,
    jobName: "",
    siteAddress: client.address,
    description: "",
    labourItems: "Labour allowance",
    materialItems: "Material allowance",
    labourAmount: 0,
    materialAmount: 0,
    gst: 0,
    total: 0,
    notes: "",
    expiryDate: toDateInputValue(new Date(Date.now() + Number(currentUser.defaultQuoteExpiryDays || 14) * 86400000).toISOString()),
  };
}

function buildQuotePayload(data) {
  const client = currentUser.clients.find((item) => item.id === data.clientId);
  if (!client) return null;
  const labourAmount = Number(data.labourAmount || 0);
  const materialAmount = Number(data.materialAmount || 0);
  const totalExGst = labourAmount + materialAmount;
  const gst = roundCurrency(totalExGst * 0.1);
  const total = roundCurrency(totalExGst + gst);
  return {
    id: crypto.randomUUID(),
    quoteNumber: nextQuoteNumber(),
    clientId: client.id,
    clientName: client.name,
    clientPhone: String(data.clientPhone || client.phone || "").trim(),
    clientEmail: String(data.clientEmail || client.email || "").trim(),
    jobId: String(data.sourceJobId || ""),
    jobName: String(data.jobName).trim(),
    siteAddress: String(data.siteAddress || client.address || "").trim(),
    description: String(data.description).trim(),
    labourItems: String(data.labourItems).trim(),
    materialItems: String(data.materialItems).trim(),
    labourAmount,
    materialAmount,
    gst,
    total,
    notes: String(data.notes || "").trim(),
    expiryDate: String(data.expiryDate),
    status: "Draft",
    createdAt: new Date().toISOString(),
  };
}

function saveQuotePayload(payload) {
  currentUser.quotes.unshift(payload);
  if (payload.jobId) {
    syncJobFromQuote(payload, "Draft");
  }
  persistCurrentUser();
  return payload;
}

function buildPayrollEmployeePayload(data) {
  return {
    id: crypto.randomUUID(),
    name: String(data.name).trim(),
    mobile: String(data.mobile).trim(),
    email: String(data.email).trim(),
    role: String(data.role).trim(),
    employmentType: String(data.employmentType),
    payType: String(data.payType),
    payRate: Number(data.payRate || 0),
    cycleHours: Number(data.cycleHours || 0),
    superDetails: String(data.superDetails || "Super details to confirm").trim(),
    taxFile: String(data.taxFile || "TFN details to confirm").trim(),
    bankDetails: String(data.bankDetails || "Bank details to confirm").trim(),
    notes: String(data.notes || "Payroll note.").trim(),
    lastPayDate: String(data.lastPayDate),
    status: String(data.status),
  };
}

function savePayrollEmployeePayload(employeePayload) {
  currentUser.payrollEmployees.unshift(employeePayload);
  persistCurrentUser();
  return employeePayload;
}

function handleClientSubmit(event) {
  event.preventDefault();
  flashSaving(els.clientForm, editingClientId ? "Updating client..." : "Saving client...");
  const data = Object.fromEntries(new FormData(els.clientForm));
  const clientPayload = buildClientPayload(data, { existingClientId: editingClientId });

  saveClientPayload(clientPayload, { existingClientId: editingClientId });
  els.clientForm.reset();
  els.clientSortSelect.value = "newest";
  clientSortMode = "newest";

  renderWorkspace();
}

function populateQuickJobClientSelect(selectedClientId = "") {
  if (!els.quickJobClientSelect) return;
  els.quickJobClientSelect.innerHTML = currentUser.clients.map((client) => (
    `<option value="${client.id}">${escapeHtml(client.name)}</option>`
  )).join("");
  if (currentUser.clients.some((client) => client.id === selectedClientId)) {
    els.quickJobClientSelect.value = selectedClientId;
  }
  syncQuickJobClientDetails();
}

function syncQuickJobClientDetails() {
  const client = currentUser.clients.find((item) => item.id === els.quickJobClientSelect?.value);
  if (!client) return;
  if (els.quickJobClientPhone) els.quickJobClientPhone.value = client.phone || "";
  if (els.quickJobClientEmail) els.quickJobClientEmail.value = client.email || "";
  if (els.quickJobAddress && !els.quickJobAddress.value.trim()) els.quickJobAddress.value = client.address || "";
  if (els.quickJobInternalNotes && !els.quickJobInternalNotes.value.trim()) els.quickJobInternalNotes.value = client.notes || "";
}

function openQuickClientOverlay(target = "job") {
  quickCreateContext = { record: "client", target };
  editingClientId = null;
  jobClientModalOpen = true;
  els.jobClientForm?.reset();
  if (els.jobClientOverlayTitle && els.jobClientOverlayCopy && els.jobClientOverlaySubmitButton) {
    if (target === "quote") {
      els.jobClientOverlayTitle.textContent = "Add a client without leaving the quote";
      els.jobClientOverlayCopy.textContent = "Save the client once, then keep quoting with their details filled in.";
      els.jobClientOverlaySubmitButton.textContent = "Save client to quote";
    } else if (target === "invoice") {
      els.jobClientOverlayTitle.textContent = "Add a client without leaving the invoice";
      els.jobClientOverlayCopy.textContent = "Save the client once, then keep invoicing with their details filled in.";
      els.jobClientOverlaySubmitButton.textContent = "Save client to invoice";
    } else {
      els.jobClientOverlayTitle.textContent = "Add a client without leaving the job";
      els.jobClientOverlayCopy.textContent = "Save the client once, then keep building the job with their details filled in.";
      els.jobClientOverlaySubmitButton.textContent = "Save client to job";
    }
  }
  if (els.jobClientForm?.elements.paymentTerms) {
    els.jobClientForm.elements.paymentTerms.value = currentUser.defaultPaymentTerms || "14 days";
  }
  els.jobClientOverlay?.classList.remove("hidden");
  els.jobClientForm?.elements.name?.focus();
}

function openJobClientOverlay() {
  openQuickClientOverlay("job");
}

function closeJobClientOverlay() {
  jobClientModalOpen = false;
  els.jobClientOverlay?.classList.add("hidden");
  els.jobClientForm?.reset();
  quickCreateContext = quickCreateContext?.record === "client" ? null : quickCreateContext;
  els.jobClientSelect?.focus();
}

function openQuickJobOverlay(target = "quote") {
  quickCreateContext = { record: "job", target };
  els.quickJobForm?.reset();
  const preferredClientId = target === "quote"
    ? els.quoteClientSelect.value
    : target === "invoice"
      ? els.invoiceClientSelect.value
      : "";
  populateQuickJobClientSelect(preferredClientId);
  if (els.quickJobScheduledAt) {
    els.quickJobScheduledAt.value = toDateTimeLocalValue(new Date(Date.now() + 86400000).toISOString());
  }
  if (els.quickJobStatusSelect) {
    els.quickJobStatusSelect.value = "Upcoming";
  }
  if (els.quickJobRecurringSelect) {
    els.quickJobRecurringSelect.value = "One-off";
  }
  if (els.quickJobForm?.elements.assignee) {
    els.quickJobForm.elements.assignee.value = currentUser?.name || "Beau";
  }
  if (target === "invoice") {
    if (els.quickJobName && els.invoiceJobNameInput.value.trim()) els.quickJobName.value = els.invoiceJobNameInput.value.trim();
    if (els.quickJobAddress && els.invoiceSiteAddressInput.value.trim()) els.quickJobAddress.value = els.invoiceSiteAddressInput.value.trim();
    if (els.quickJobClientPhone && els.invoiceClientPhone.value.trim()) els.quickJobClientPhone.value = els.invoiceClientPhone.value.trim();
    if (els.quickJobClientEmail && els.invoiceClientEmail.value.trim()) els.quickJobClientEmail.value = els.invoiceClientEmail.value.trim();
  }
  els.quickJobOverlay?.classList.remove("hidden");
  els.quickJobName?.focus();
}

function closeQuickJobOverlay() {
  els.quickJobOverlay?.classList.add("hidden");
  els.quickJobForm?.reset();
  quickCreateContext = quickCreateContext?.record === "job" ? null : quickCreateContext;
}

function syncQuickQuoteClientDetails() {
  const client = currentUser.clients.find((item) => item.id === els.quickQuoteClientSelect?.value);
  if (!client) return;
  if (els.quickQuoteClientPhone) els.quickQuoteClientPhone.value = client.phone || "";
  if (els.quickQuoteClientEmail) els.quickQuoteClientEmail.value = client.email || "";
  if (els.quickQuoteSiteAddress && !els.quickQuoteSiteAddress.value.trim()) els.quickQuoteSiteAddress.value = client.address || "";
}

function syncQuickQuoteSourceJobSelect(selectedJobId = "") {
  if (!els.quickQuoteSourceJobSelect) return;
  els.quickQuoteSourceJobSelect.innerHTML = [
    '<option value="">Start from scratch</option>',
    ...currentUser.jobs.map((job) => `<option value="${job.id}">${escapeHtml(job.name)} / ${escapeHtml(job.clientName)}</option>`),
  ].join("");
  if (currentUser.jobs.some((job) => job.id === selectedJobId)) {
    els.quickQuoteSourceJobSelect.value = selectedJobId;
  }
}

function handleQuickQuoteSourceChange() {
  const job = findJobById(els.quickQuoteSourceJobSelect?.value);
  if (!job) return;
  if (els.quickQuoteClientSelect) {
    els.quickQuoteClientSelect.value = job.clientId;
  }
  syncQuickQuoteClientDetails();
  els.quickQuoteJobName.value = job.name || "";
  els.quickQuoteSiteAddress.value = job.address || "";
  els.quickQuoteDescription.value = job.description || "";
  els.quickQuoteLabourItems.value = `${job.assignee} labour allowance for ${job.name}`;
  els.quickQuoteMaterialItems.value = `Materials allowance for ${job.name}`;
  els.quickQuoteLabourAmount.value = Number(job.labourCost || 0).toFixed(2);
  els.quickQuoteMaterialAmount.value = Number(job.materialCost || 0).toFixed(2);
  els.quickQuoteNotes.value = job.internalNotes || "Prepared from job details.";
}

function openQuickQuoteOverlay(target = "invoice") {
  quickCreateContext = { record: "quote", target };
  els.quickQuoteForm?.reset();
  const preferredClientId = target === "invoice" ? els.invoiceClientSelect.value : els.quoteClientSelect.value;
  if (els.quickQuoteClientSelect) {
    els.quickQuoteClientSelect.innerHTML = currentUser.clients.map((client) => (
      `<option value="${client.id}">${escapeHtml(client.name)}</option>`
    )).join("");
    if (currentUser.clients.some((client) => client.id === preferredClientId)) {
      els.quickQuoteClientSelect.value = preferredClientId;
    }
  }
  syncQuickQuoteSourceJobSelect(target === "invoice" ? els.invoiceJobSelect.value : "");
  syncQuickQuoteClientDetails();
  if (els.quickQuoteExpiryDate) {
    els.quickQuoteExpiryDate.value = toDateInputValue(new Date(Date.now() + Number(currentUser.defaultQuoteExpiryDays || 14) * 86400000).toISOString());
  }
  if (els.quickQuoteLabourItems) els.quickQuoteLabourItems.value = "Labour allowance";
  if (els.quickQuoteMaterialItems) els.quickQuoteMaterialItems.value = "Material allowance";
  if (els.quickQuoteNotes) els.quickQuoteNotes.value = "Standard exclusions apply unless listed here.";
  if (target === "invoice") {
    if (els.quickQuoteJobName && els.invoiceJobNameInput.value.trim()) els.quickQuoteJobName.value = els.invoiceJobNameInput.value.trim();
    if (els.quickQuoteSiteAddress && els.invoiceSiteAddressInput.value.trim()) els.quickQuoteSiteAddress.value = els.invoiceSiteAddressInput.value.trim();
  }
  els.quickQuoteOverlay?.classList.remove("hidden");
  els.quickQuoteClientSelect?.focus();
}

function closeQuickQuoteOverlay() {
  els.quickQuoteOverlay?.classList.add("hidden");
  els.quickQuoteForm?.reset();
  quickCreateContext = quickCreateContext?.record === "quote" ? null : quickCreateContext;
}

function openQuickEmployeeOverlay(target = "payroll") {
  quickCreateContext = { record: "employee", target };
  els.quickEmployeeForm?.reset();
  if (els.quickEmployeeLastPayDate) {
    els.quickEmployeeLastPayDate.value = toDateInputValue(new Date(Date.now() - 604800000).toISOString());
  }
  els.quickEmployeeOverlay?.classList.remove("hidden");
  els.quickEmployeeForm?.elements.name?.focus();
}

function closeQuickEmployeeOverlay() {
  els.quickEmployeeOverlay?.classList.add("hidden");
  els.quickEmployeeForm?.reset();
  quickCreateContext = quickCreateContext?.record === "employee" ? null : quickCreateContext;
}

function handleJobClientSubmit(event) {
  event.preventDefault();
  if (!els.jobClientForm) return;
  flashSaving(els.jobClientForm, "Saving client...");
  const data = Object.fromEntries(new FormData(els.jobClientForm));
  const clientPayload = buildClientPayload(data, { tags: [] });
  saveClientPayload(clientPayload, { existingClientId: "" });
  const modalTarget = quickCreateContext?.target || "job";
  closeJobClientOverlay();
  renderWorkspace();

  if (modalTarget === "job") {
    syncClientSelect({ job: clientPayload.id });
    els.jobClientSelect.value = clientPayload.id;
    syncSelectedClientDetails();
    activeJobBlankClientMode = "existing";
    syncJobStartUi();
    showToast(`${clientPayload.name} added and loaded into this job.`);
  } else if (modalTarget === "quote") {
    activeQuoteStartMode = "client";
    quoteClientSearchQuery = "";
    if (els.quoteClientSearchInput) els.quoteClientSearchInput.value = "";
    fillQuoteForm(quoteDraftFromClient(clientPayload));
    showToast(`${clientPayload.name} added and loaded into this quote.`);
  } else if (modalTarget === "invoice") {
    activeInvoiceStartMode = "client";
    fillInvoiceForm(invoiceDraftFromClient(clientPayload));
    syncInvoiceStartUi();
    renderInvoiceClientWarning(clientPayload);
    showToast(`${clientPayload.name} added and loaded into this invoice.`);
  }
  quickCreateContext = null;
}

function handleJobSubmit(event) {
  event.preventDefault();
  flashSaving(els.jobForm, "Saving job...");
  const data = Object.fromEntries(new FormData(els.jobForm));
  const jobPayload = buildJobPayload(data);
  if (!jobPayload) {
    showToast("Choose a client before saving this job.");
    return;
  }
  saveJobPayload(jobPayload);
  els.jobForm.reset();
  setJobFormDefaults();

  renderWorkspace();
}

function handleQuickJobSubmit(event) {
  event.preventDefault();
  if (!els.quickJobForm) return;
  flashSaving(els.quickJobForm, "Saving job...");
  const data = Object.fromEntries(new FormData(els.quickJobForm));
  const jobPayload = buildJobPayload(data);
  if (!jobPayload) {
    showToast("Choose a client before saving this job.");
    return;
  }
  saveJobPayload(jobPayload);
  const modalTarget = quickCreateContext?.target || "quote";
  closeQuickJobOverlay();
  renderWorkspace();

  if (modalTarget === "quote") {
    fillQuoteForm(quoteDraftFromJob(jobPayload));
    showToast(`${jobPayload.name} added and loaded into this quote.`);
  } else if (modalTarget === "invoice") {
    activeInvoiceStartMode = "job";
    fillInvoiceForm(invoiceDraftFromJob(jobPayload));
    syncInvoiceStartUi();
    showToast(`${jobPayload.name} added and loaded into this invoice.`);
  } else if (modalTarget === "expense") {
    els.expenseJobSelect.value = jobPayload.id;
    showToast(`${jobPayload.name} added and linked to this expense.`);
  }
  quickCreateContext = null;
}

function handleQuoteForJob() {
  if (!els.jobForm.checkValidity()) {
    els.jobForm.reportValidity();
    return;
  }

  const data = Object.fromEntries(new FormData(els.jobForm));
  const client = currentUser.clients.find((item) => item.id === data.clientId);
  if (!client || !String(data.name || "").trim()) {
    showToast("Pick a client and enter a job name first, then we'll prepare the quote draft.");
    return;
  }

  fillQuoteForm({
    sourceJobId: "",
    clientId: client.id,
    clientPhone: String(data.clientPhone || client.phone || "").trim(),
    clientEmail: String(data.clientEmail || client.email || "").trim(),
    jobName: String(data.name).trim(),
    siteAddress: String(data.address || client.address || "").trim(),
    description: String(data.description).trim(),
    labourItems: `${String(data.assignee || currentUser.name || "Crew").trim()} labour allowance`,
    materialItems: `Materials allowance for ${String(data.name).trim()}`,
    labourAmount: Number(data.labourCost || 0),
    materialAmount: Number(data.materialCost || 0),
    gst: roundCurrency(Number(data.quoteAmount || 0) / 11),
    total: Number(data.quoteAmount || 0),
    notes: String(data.internalNotes || "Quote prepared from job details.").trim(),
    expiryDate: toDateInputValue(new Date(Date.now() + Number(currentUser.defaultQuoteExpiryDays || 14) * 86400000).toISOString()),
  });

  window.location.hash = "#workspace-quotes";
  els.quoteForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleQuoteSourceChange() {
  const sourceJob = currentUser.jobs.find((job) => job.id === els.quoteSourceSelect.value);
  if (sourceJob) {
    fillQuoteForm(quoteDraftFromJob(sourceJob));
    return;
  }
  resetQuoteForm({ preserveMode: true });
}

function handleQuoteSubmit(event) {
  event.preventDefault();
  flashSaving(els.quoteForm, "Saving quote...");
  const data = Object.fromEntries(new FormData(els.quoteForm));
  const payload = buildQuotePayload(data);
  if (!payload) {
    showToast("Choose a client before saving this quote.");
    return;
  }
  saveQuotePayload(payload);
  resetQuoteForm();
  renderWorkspace();
}

function handleQuickQuoteSubmit(event) {
  event.preventDefault();
  if (!els.quickQuoteForm) return;
  flashSaving(els.quickQuoteForm, "Saving quote...");
  const data = Object.fromEntries(new FormData(els.quickQuoteForm));
  const payload = buildQuotePayload(data);
  if (!payload) {
    showToast("Choose a client before saving this quote.");
    return;
  }
  saveQuotePayload(payload);
  const modalTarget = quickCreateContext?.target || "invoice";
  closeQuickQuoteOverlay();
  renderWorkspace();

  if (modalTarget === "invoice") {
    activeInvoiceStartMode = "quote";
    fillInvoiceForm(invoiceDraftFromQuote(payload));
    syncInvoiceStartUi();
    showInvoiceQuoteConfirmation(payload);
    showToast(`${payload.quoteNumber} added and loaded into this invoice.`);
  }
  quickCreateContext = null;
}

function handleInvoiceSubmit(event) {
  event.preventDefault();
  const submitMode = event.submitter?.dataset.invoiceSubmit || "draft";
  const saveMessage = submitMode === "send"
    ? "Getting invoice ready to send..."
    : submitMode === "later"
      ? "Saving invoice for later..."
      : "Saving draft...";
  flashSaving(els.invoiceForm, saveMessage);
  const data = Object.fromEntries(new FormData(els.invoiceForm));
  const client = currentUser.clients.find((item) => item.id === data.clientId);
  if (!client) {
    showToast("Choose a client before saving this invoice.");
    return;
  }

  const approvalRequired = hasFeature("invoiceApprovalControls") && data.approvalRequired === "yes";
  const status = submitMode === "send"
    ? (approvalRequired ? "Pending approval" : "Unpaid")
    : "Draft";

  const invoice = {
    id: crypto.randomUUID(),
    invoiceNumber: nextInvoiceNumber(),
    clientId: client.id,
    client: client.name,
    clientEmail: String(data.clientEmail || client.email || "").trim(),
    clientPhone: String(data.clientPhone || client.phone || "").trim(),
    jobId: String(data.sourceJobId || ""),
    job: String(data.job).trim(),
    siteAddress: String(data.siteAddress || "").trim(),
    invoiceType: String(data.invoiceType || "Final invoice"),
    lineItems: getInvoiceLineItems(),
    materialsAmount: Number(data.materialsAmount || 0),
    labourAmount: Number(data.labourAmount || 0),
    amount: Number(data.amount),
    gst: Number(data.gst),
    status,
    approvalRequired,
    approvalRequestedAt: approvalRequired ? new Date().toISOString() : null,
    approvedAt: null,
    approvedBy: "",
    issueDate: String(data.issueDate),
    dueDate: String(data.dueDate),
    paymentMethod: String(data.paymentMethod),
    paymentTerms: String(data.paymentTerms),
    notes: String(data.notes || "").trim(),
    attachmentsNote: String(data.attachmentsNote || "").trim(),
    paidAt: status === "Paid" ? new Date().toISOString() : null,
    createdAt: new Date().toISOString(),
  };
  currentUser.invoices.unshift(invoice);
  persistCurrentUser();
  resetInvoiceForm();
  renderWorkspace();

  if (submitMode === "send") {
    if (approvalRequired) {
      showToast("Invoice saved and sent for approval.");
      return;
    }
    sendInvoiceById(invoice.id);
    return;
  }

  showToast(submitMode === "later" ? "Invoice saved for later." : "Draft saved.");
}

function handleExpenseSubmit(event) {
  event.preventDefault();
  flashSaving(els.expenseForm, "Saving expense...");
  const data = Object.fromEntries(new FormData(els.expenseForm));
  const linkedJob = [...currentUser.jobs, ...currentUser.archivedJobs].find((job) => job.id === data.jobId);
  const payload = {
    id: crypto.randomUUID(),
    supplier: String(data.supplier).trim(),
    category: normaliseExpenseCategory(data.category),
    jobId: String(data.jobId || ""),
    job: linkedJob ? linkedJob.name : "No linked job",
    expenseDate: String(data.expenseDate),
    paymentSource: String(data.paymentSource),
    amount: Number(data.amount),
    gst: Number(data.gst),
    notes: String(data.notes || "").trim(),
    receiptData: pendingExpenseReceipt?.data || "",
    receiptName: pendingExpenseReceipt?.name || "",
    receiptType: pendingExpenseReceipt?.type || "",
    claimStatus: getExpenseClaimStatus(normaliseExpenseCategory(data.category)),
    createdAt: new Date().toISOString(),
  };
  currentUser.expenses.unshift(payload);
  if (payload.jobId) {
    applyExpenseToLinkedJob(payload);
  }
  persistCurrentUser();
  resetExpenseForm();
  renderWorkspace();
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  flashSaving(els.settingsForm, "Saving settings...");
  const data = Object.fromEntries(new FormData(els.settingsForm));
  currentUser.businessName = String(data.businessName).trim();
  currentUser.abn = String(data.abn).trim();
  currentUser.businessEmail = String(data.businessEmail).trim();
  currentUser.businessPhone = String(data.businessPhone).trim();
  currentUser.businessAddress = String(data.businessAddress).trim();
  currentUser.tradeType = String(data.tradeType).trim();
  currentUser.brandTone = String(data.brandTone);
  currentUser.defaultPaymentTerms = String(data.defaultPaymentTerms);
  currentUser.defaultQuoteExpiryDays = Number(data.defaultQuoteExpiryDays || 14);
  currentUser.invoicePrefix = String(data.invoicePrefix || "PDT-INV").trim() || "PDT-INV";
  currentUser.quotePrefix = String(data.quotePrefix || "PDT-Q").trim() || "PDT-Q";
  currentUser.gstMode = String(data.gstMode);
  currentUser.taxVaultRate = Number(data.taxVaultRate) / 100;
  currentUser.notificationSettings = {
    invoiceReminders: Boolean(data.invoiceReminders),
    overdueReminders: Boolean(data.overdueReminders),
    payrollReminders: Boolean(data.payrollReminders),
    paymentAlerts: Boolean(data.paymentAlerts),
    jobAlerts: Boolean(data.jobAlerts),
  };
  currentUser.bankConnection = String(data.bankConnection);
  currentUser.paymentMethod = String(data.paymentMethod);
  currentUser.integrationNotes = String(data.integrationNotes || "").trim();
  currentUser.defaultWorkspaceView = String(data.defaultWorkspaceView);
  currentUser.themePreference = String(data.themePreference);
  currentUser.twoFactorStatus = String(data.twoFactorStatus);
  currentUser.sessionNotes = String(data.sessionNotes || "").trim();

  if (pendingSettingsLogo) {
    currentUser.businessLogo = pendingSettingsLogo;
    pendingSettingsLogo = null;
  }

  const teamUserName = String(data.teamUserName || "").trim();
  const teamUserEmail = String(data.teamUserEmail || "").trim();
  if (teamUserName && teamUserEmail && hasFeature("staffPermissions")) {
    if (!canAddMoreTeamUsers()) {
      showToast(`Your ${currentUser.plan} plan includes up to ${getPlanUserLimit()} staff logins.`);
    } else {
      currentUser.teamUsers.unshift({
        id: crypto.randomUUID(),
        name: teamUserName,
        email: teamUserEmail,
        role: String(data.teamUserRole),
        status: String(data.teamUserStatus),
      });
    }
    els.settingsTeamUserNameInput.value = "";
    els.settingsTeamUserEmailInput.value = "";
  }

  const newPassword = String(data.newPassword || "").trim();
  if (newPassword.length >= 6) {
    currentUser.password = newPassword;
    els.settingsNewPasswordInput.value = "";
  }

  persistCurrentUser();
  els.settingsNote.textContent = "Settings saved";
  renderWorkspace();
  showToast("Settings saved");
}

function handleJobAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const activeJobIndex = currentUser.jobs.findIndex((item) => item.id === button.dataset.jobId);
  const job = activeJobIndex >= 0
    ? currentUser.jobs[activeJobIndex]
    : currentUser.archivedJobs.find((item) => item.id === button.dataset.jobId);
  if (!job) return;
  const isArchivedJob = activeJobIndex === -1;

  if (button.dataset.action === "complete" && !isArchivedJob) {
    job.status = "Completed";
    job.archivedAt = new Date().toISOString();
    const shouldInvoice = window.confirm(`"${job.name}" marked complete. Generate an invoice for ${job.clientName} now?`);
    if (shouldInvoice) {
      const invoice = createInvoiceFromJob(job);
      persistCurrentUser();
      renderWorkspace();
      openInvoicePreview(invoice.id);
    }
    currentUser.jobs.splice(activeJobIndex, 1);
    currentUser.archivedJobs.unshift(job);
  }

  if (button.dataset.action === "quote") {
    fillQuoteForm(quoteDraftFromJob(job));
    window.location.hash = "#workspace-quotes";
    els.quoteForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (button.dataset.action === "invoice") {
    const invoice = createInvoiceFromJob(job);
    persistCurrentUser();
    renderWorkspace();
    openInvoicePreview(invoice.id);
  }

  if (button.dataset.action === "archive" && !isArchivedJob) {
    currentUser.jobs.splice(activeJobIndex, 1);
    currentUser.archivedJobs.unshift({ ...job, status: "Completed", archivedAt: new Date().toISOString() });
  }

  persistCurrentUser();
  renderWorkspace();
}

function handleInvoiceAction(event) {
  const button = event.target.closest("button[data-invoice-action]");
  if (!button) return;

  const invoice = currentUser.invoices.find((item) => item.id === button.dataset.invoiceId);
  if (!invoice) return;

  if (button.dataset.invoiceAction === "preview") {
    openInvoicePreview(invoice.id);
    return;
  }

  if (button.dataset.invoiceAction === "send") {
    sendInvoiceById(invoice.id);
  }

  if (button.dataset.invoiceAction === "export") {
    exportInvoicePdf(invoice.id);
  }

  if (button.dataset.invoiceAction === "paid") {
    invoice.status = "Paid";
    invoice.paidAt = new Date().toISOString();
  }

  if (button.dataset.invoiceAction === "approve") {
    invoice.status = "Approved";
    invoice.approvedAt = new Date().toISOString();
    invoice.approvedBy = currentUser.name;
    showToast(`${invoice.invoiceNumber} approved and ready to send.`);
  }

  if (button.dataset.invoiceAction === "remind") {
    invoice.lastReminderAt = new Date().toISOString();
    invoice.reminderCount = Number(invoice.reminderCount || 0) + 1;
    const subject = encodeURIComponent(`Quick reminder: ${invoice.invoiceNumber} for ${invoice.job}`);
    const body = encodeURIComponent(
      [
        `Hi ${invoice.client},`,
        "",
        `Just following up on ${invoice.invoiceNumber} for ${invoice.job}. The balance owing is ${formatMoney(invoice.amount)} and it was due on ${formatDate(invoice.dueDate)}.`,
        "If payment has already been sent, thanks, otherwise please let me know when to expect it.",
        "",
        "Cheers,",
        currentUser.name,
      ].join("\n")
    );
    const reminderAddress = invoice.clientEmail || getClientEmail(invoice.client);
    if (reminderAddress) {
      window.location.href = `mailto:${reminderAddress}?subject=${subject}&body=${body}`;
    } else {
      showToast("Reminder logged, but this client does not have an email saved yet.");
    }
  }

  persistCurrentUser();
  renderWorkspace();
}

function handleQuoteAction(event) {
  const button = event.target.closest("button[data-quote-action]");
  if (!button) return;

  const quote = currentUser.quotes.find((item) => item.id === button.dataset.quoteId);
  if (!quote) return;

  if (button.dataset.quoteAction === "preview") {
    openQuotePreview(quote.id);
    return;
  }

  if (button.dataset.quoteAction === "send") {
    sendQuoteById(quote.id);
  }

  if (button.dataset.quoteAction === "accept") {
    quote.status = "Accepted";
    syncJobFromQuote(quote, "Approved");
  }

  if (button.dataset.quoteAction === "reject") {
    quote.status = "Rejected";
    syncJobFromQuote(quote, "Rejected");
  }

  if (button.dataset.quoteAction === "job") {
    createOrUpdateJobFromQuote(quote);
  }

  if (button.dataset.quoteAction === "invoice") {
    activeInvoiceStartMode = "quote";
    fillInvoiceForm(invoiceDraftFromQuote(quote));
    syncInvoiceStartUi();
    window.location.hash = "#workspace-invoices";
    els.invoiceForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  persistCurrentUser();
  renderWorkspace();
}

function createInvoiceFromJob(job) {
  const client = currentUser.clients.find((item) => item.id === job.clientId || item.name === job.clientName);
  const issueDate = toDateInputValue(new Date().toISOString());
  const paymentTerms = client?.paymentTerms || currentUser.defaultPaymentTerms || "7 days";
  const gst = roundCurrency(Number(job.quoteAmount || 0) / 11);
  const materialsAmount = Number(job.materialCost || 0);
  const labourAmount = roundCurrency(Math.max(0, Number(job.quoteAmount || 0) - gst - materialsAmount));
  const invoice = {
    id: crypto.randomUUID(),
    invoiceNumber: nextInvoiceNumber(),
    clientId: job.clientId,
    client: job.clientName,
    clientEmail: job.clientEmail,
    clientPhone: job.clientPhone,
    jobId: job.id,
    job: job.name,
    siteAddress: job.address || client?.address || "",
    invoiceType: "Final invoice",
    lineItems: [
      { description: `Materials for ${job.name}`, qty: 1, rate: materialsAmount, total: materialsAmount },
      { description: `Labour for ${job.name}`, qty: 1, rate: labourAmount, total: labourAmount },
    ],
    materialsAmount,
    labourAmount,
    amount: job.quoteAmount,
    gst,
    issueDate,
    dueDate: calculateDueDate(issueDate, paymentTerms),
    status: "Unpaid",
    paymentMethod: currentUser.paymentMethod || "Bank transfer",
    paymentTerms,
    notes: `Invoice generated from ${job.name}. Please use ${currentUser.businessName} as the payee and the invoice number as reference.`,
    attachmentsNote: job.internalNotes || "Signed completion photos and site notes available on request.",
    createdAt: new Date().toISOString(),
  };
  currentUser.invoices.unshift(invoice);
  job.invoiceSent = true;
  job.invoiceStatus = "Invoiced";
  job.quoteStatus = job.quoteStatus === "Draft" ? "Approved" : job.quoteStatus;
  return invoice;
}

function openQuoteEmail(job) {
  const subject = encodeURIComponent(`Quote for ${job.name}`);
  const body = encodeURIComponent(
    [
      `Hi ${job.clientName},`,
      "",
      `Here's the quote for ${job.name}.`,
      `Site address: ${job.address}`,
      `Scheduled for: ${formatSchedule(job.scheduledAt)}`,
      `Scope: ${job.description}`,
      `Materials estimate: ${formatMoney(job.materialCost)}`,
      `Labour estimate: ${formatMoney(job.labourCost)}`,
      `Quoted amount: ${formatMoney(job.quoteAmount)}`,
      `Recurring: ${job.recurring}`,
      "",
      "If you're happy to proceed, reply and we'll book the work in.",
      "",
      "Cheers,",
      currentUser.name,
    ].join("\n")
  );
  window.location.href = `mailto:${job.clientEmail}?subject=${subject}&body=${body}`;
}

function sendQuoteById(quoteId) {
  const quote = currentUser.quotes.find((item) => item.id === quoteId);
  if (!quote) return;

  const subject = encodeURIComponent(`${quote.quoteNumber} - Quote for ${quote.jobName}`);
  const body = encodeURIComponent(
    [
      `Hi ${quote.clientName},`,
      "",
      `Here is ${quote.quoteNumber} for ${quote.jobName}.`,
      `Site address: ${quote.siteAddress}`,
      "",
      `Scope of work:`,
      quote.description,
      "",
      `Labour:`,
      quote.labourItems,
      `Labour total ex GST: ${formatMoney(quote.labourAmount)}`,
      "",
      `Materials:`,
      quote.materialItems,
      `Materials total ex GST: ${formatMoney(quote.materialAmount)}`,
      "",
      `GST: ${formatMoney(quote.gst)}`,
      `Total inc GST: ${formatMoney(quote.total)}`,
      `Valid until: ${formatDate(quote.expiryDate)}`,
      quote.notes ? `Notes: ${quote.notes}` : "",
      "",
      "If you're happy to proceed, reply to approve and we'll lock the job in.",
      "",
      "Cheers,",
      currentUser.name,
    ].filter(Boolean).join("\n")
  );

  if (!["Accepted", "Rejected"].includes(quote.status)) {
    quote.status = "Sent";
    syncJobFromQuote(quote, "Sent");
  }
  persistCurrentUser();
  renderWorkspace();
  window.location.href = `mailto:${quote.clientEmail}?subject=${subject}&body=${body}`;
}

function openInvoiceEmail(job) {
  const subject = encodeURIComponent(`Invoice for ${job.name}`);
  const body = encodeURIComponent(
    [
      `Hi ${job.clientName},`,
      "",
      `The job "${job.name}" is complete and the invoice total is ${formatMoney(job.quoteAmount)} including GST.`,
      "Please reply if you'd like card payment details or a payment plan option.",
      "",
      "Cheers,",
      currentUser.name,
    ].join("\n")
  );
  window.location.href = `mailto:${job.clientEmail}?subject=${subject}&body=${body}`;
}

function renderWorkspace() {
  applyPlanAccess();
  syncClientSelect();
  syncSelectedClientDetails();
  syncJobPreviousSelect();
  syncJobStartUi();
  syncJobSuggestions();
  syncQuoteSourceSelect();
  syncQuoteRepeatSelect();
  syncQuoteStartUi();
  syncQuoteSuggestions();
  syncSelectedQuoteClientDetails();
  syncInvoiceSourceSelect();
  syncInvoiceQuoteSelect();
  syncInvoiceDuplicateSelect();
  syncInvoiceItemSuggestions();
  syncInvoiceStartUi();
  syncSelectedInvoiceClientDetails();
  renderInvoiceClientWarning();
  syncExpenseJobSelect();
  syncExpenseSuggestions();
  syncExpenseStartUi();
  syncReportFilters();
  setJobFormDefaults();
  setQuoteFormDefaults();
  setInvoiceFormDefaults();
  setExpenseFormDefaults();
  setPayrollFormDefaults();
  renderPayrollQuickSummary();

  const unpaidInvoices = currentUser.invoices
    .filter((invoice) => ["Unpaid", "Overdue"].includes(getInvoiceStatus(invoice)))
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoices = currentUser.invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const expenses = currentUser.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const invoiceGst = currentUser.invoices.reduce((sum, invoice) => sum + invoice.gst, 0);
  const expenseGst = currentUser.expenses.reduce((sum, expense) => sum + expense.gst, 0);
  const taxSavedValue = Math.max(0, invoiceGst - expenseGst + paidInvoices * currentUser.taxVaultRate);
  const moneyAvailableValue = Math.max(0, paidInvoices - expenses - paidInvoices * currentUser.taxVaultRate);
  const firstUse = isFirstUseWorkspace();

  if (els.workspaceSubtitle) {
    els.workspaceSubtitle.textContent = firstUse
      ? "This is your first workspace view. Start by adding a client, then create a job, quote, or invoice when you are ready."
      : `${currentUser.email} is signed in on the ${currentUser.plan} plan. Keep the right tools in view without the clutter you do not need yet.`;
  }

  if (firstUse) {
    els.dashboardHeroCard1Label.textContent = "No jobs yet";
    els.moneyAvailable.textContent = "Start here";
    els.dashboardHeroCard1Copy.textContent = "Create your first job to track work from quote through to invoice.";
    els.dashboardHeroCard2Label.textContent = "No clients yet";
    els.invoiceTotal.textContent = "Add one";
    els.dashboardHeroCard2Copy.textContent = "Save a client once and reuse them across the whole app.";
    els.dashboardHeroCard3Label.textContent = "No invoices yet";
    els.dashboardUrgentMargin.textContent = "Send one";
    els.dashboardUrgentMarginCopy.textContent = "Your first invoice will start showing money owed and due dates here.";
    els.dashboardHeroCard4Label.textContent = "Reports unlock as you go";
    els.dashboardUrgentTax.textContent = "Build data";
    els.dashboardUrgentTaxCopy.textContent = "Jobs, invoices, expenses, and payroll will turn this into a live business snapshot.";
    els.taxSaved.textContent = "Set up";
    els.expenseTotal.textContent = "Track it";
    els.taxSafetyLabel.textContent = "New";
    els.taxSafetyLabel.className = "status-badge status-draft";
  } else {
    els.dashboardHeroCard1Label.textContent = "Cash available";
    els.moneyAvailable.textContent = formatMoney(moneyAvailableValue);
    els.dashboardHeroCard1Copy.textContent = "Usable cash after spend and tax vault.";
    els.dashboardHeroCard2Label.textContent = "Money owed";
    els.invoiceTotal.textContent = formatMoney(unpaidInvoices);
    els.dashboardHeroCard2Copy.textContent = "Open and overdue invoices to collect.";
    els.dashboardHeroCard3Label.textContent = "Jobs losing profit";
    els.taxSaved.textContent = formatMoney(taxSavedValue);
    els.expenseTotal.textContent = formatMoney(expenses);
    els.dashboardHeroCard4Label.textContent = "Tax obligations";
    els.taxSafetyLabel.textContent = taxSavedValue >= unpaidInvoices * 0.1 ? "Safe" : "Tight";
    els.taxSafetyLabel.className = taxSavedValue >= unpaidInvoices * 0.1 ? "status-badge status-safe" : "status-badge status-tight";
  }

  applyPlanDashboardState();
  renderClients();
  renderQuotes();
  renderJobs();
  renderTeamJobBoard();
  renderInvoices();
  renderExpenses();
  renderPayroll();
  renderArchive();
  renderReports();
  renderSettings();
  renderAlerts();
  renderDashboardActivity();
  applyPlanLockedStates();
  renderQuoteBuilderSummary();
  renderInvoiceDraftPreview();
}

function closeQuickCreateMenu() {
  if (!els.quickCreateMenu || !els.quickCreateToggle) return;
  els.quickCreateMenu.classList.add("hidden");
  els.quickCreateToggle.setAttribute("aria-expanded", "false");
}

function openQuickCreateTarget(hash, form) {
  window.location.hash = hash;
  closeQuickCreateMenu();
  window.setTimeout(() => {
    form?.scrollIntoView({ behavior: "smooth", block: "start" });
    const firstField = form?.querySelector("input, select, textarea");
    firstField?.focus();
  }, 120);
}

function syncClientSelect(preferredSelections = {}) {
  const jobSelected = preferredSelections.job ?? els.jobClientSelect.value;
  const invoiceSelected = preferredSelections.invoice ?? els.invoiceClientSelect.value;
  const quoteSelected = preferredSelections.quote ?? els.quoteClientSelect.value;
  const clientOptions = currentUser.clients.map((client) => (
    `<option value="${client.id}">${escapeHtml(client.name)}</option>`
  )).join("");
  const visibleQuoteClients = currentUser.clients.filter((client) => {
    if (!quoteClientSearchQuery) return true;
    const haystack = [
      client.name,
      client.contactPerson,
      client.email,
      client.phone,
      client.address,
      client.suburb,
    ].join(" ").toLowerCase();
    return haystack.includes(quoteClientSearchQuery);
  });
  const quoteOptions = visibleQuoteClients.map((client) => (
    `<option value="${client.id}">${escapeHtml(client.name)}</option>`
  )).join("");

  els.jobClientSelect.innerHTML = clientOptions;
  els.invoiceClientSelect.innerHTML = clientOptions;
  els.quoteClientSelect.innerHTML = quoteOptions || clientOptions;

  const validClientIds = new Set(currentUser.clients.map((client) => client.id));
  const validQuoteClientIds = new Set((visibleQuoteClients.length ? visibleQuoteClients : currentUser.clients).map((client) => client.id));
  if (validClientIds.has(jobSelected)) els.jobClientSelect.value = jobSelected;
  if (validClientIds.has(invoiceSelected)) els.invoiceClientSelect.value = invoiceSelected;
  if (validQuoteClientIds.has(quoteSelected)) {
    els.quoteClientSelect.value = quoteSelected;
  }
}

function syncSelectedClientDetails() {
  const client = currentUser.clients.find((item) => item.id === els.jobClientSelect.value);
  els.jobClientPhone.value = client ? client.phone : "";
  els.jobClientEmail.value = client ? client.email : "";
  els.jobAddress.value = client ? client.address : "";
  els.jobInternalNotes.value = client ? client.notes : "";
}

function syncJobPreviousSelect(selectedJobId = els.jobPreviousSelect?.value || "") {
  if (!els.jobPreviousSelect) return;
  const previousJobs = [...currentUser.jobs, ...currentUser.archivedJobs]
    .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0))
    .slice(0, 20);
  els.jobPreviousSelect.innerHTML = [
    '<option value="">Choose a previous job</option>',
    ...previousJobs.map((job) => `<option value="${job.id}">${escapeHtml(job.name)} / ${escapeHtml(job.clientName)}</option>`),
  ].join("");
  els.jobPreviousSelect.value = previousJobs.some((job) => job.id === selectedJobId) ? selectedJobId : "";
}

function syncJobStartUi() {
  els.jobStartOptions.forEach((button) => {
    button.classList.toggle("active", button.dataset.jobStart === activeJobStartMode);
  });
  els.jobPreviousWrap?.classList.toggle("hidden", activeJobStartMode !== "previous");
  els.jobBlankClientActions?.classList.toggle("hidden", activeJobStartMode !== "blank");
  document.querySelectorAll("[data-job-blank-client]").forEach((button) => {
    button.classList.toggle("active", button.dataset.jobBlankClient === activeJobBlankClientMode);
  });
}

function handleJobStartModeChange(mode) {
  activeJobStartMode = mode;
  syncJobStartUi();
  if (mode === "previous") {
    els.jobPreviousSelect?.focus();
    return;
  }
  if (mode === "blank") {
    els.jobForm.reset();
    setJobFormDefaults();
    activeJobBlankClientMode = "existing";
    syncJobStartUi();
    handleJobBlankClientChoice("existing");
    return;
  }
  els.jobClientSelect.focus();
}

function handleJobBlankClientChoice(mode) {
  activeJobBlankClientMode = mode;
  syncJobStartUi();
  if (mode === "new") {
    openJobClientOverlay();
    return;
  }
  els.jobClientSelect.focus();
}

function handlePreviousJobPrefill() {
  const job = findJobById(els.jobPreviousSelect?.value);
  if (!job) return;
  if (job.clientId && currentUser.clients.some((client) => client.id === job.clientId)) {
    els.jobClientSelect.value = job.clientId;
  }
  syncSelectedClientDetails();
  els.jobNameInput.value = job.name || "";
  els.jobDescriptionInput.value = job.description || "";
  els.jobAddress.value = job.address || "";
  els.jobForm.elements.quoteAmount.value = Number(job.quoteAmount || 0).toFixed(2);
  els.jobForm.elements.labourCost.value = Number(job.labourCost || 0).toFixed(2);
  els.jobForm.elements.materialCost.value = Number(job.materialCost || 0).toFixed(2);
  els.jobForm.elements.assignee.value = job.assignee || currentUser.name || "";
  els.jobRecurringSelect.value = job.recurring || "One-off";
  els.jobStatusSelect.value = job.status || "Draft";
  els.jobInternalNotes.value = job.internalNotes || "";
}

function renderSmartFillButtons(targetEl, values, fieldKey) {
  if (!targetEl) return;
  const uniqueValues = Array.from(new Set(values.map((value) => String(value || "").trim()).filter(Boolean))).slice(0, 3);
  targetEl.innerHTML = uniqueValues.length
    ? uniqueValues.map((value) => `
      <button class="mini-action" type="button" data-smart-fill="${escapeHtml(fieldKey)}" data-smart-value="${escapeHtml(value)}">
        ${escapeHtml(value.length > 36 ? `${value.slice(0, 33)}...` : value)}
      </button>
    `).join("")
    : "";
}

function handleSmartFillClick(event) {
  const button = event.target.closest("[data-smart-fill]");
  if (!button) return;
  const fieldKey = button.dataset.smartFill || "";
  const value = button.dataset.smartValue || "";
  const fieldMap = {
    jobDescription: els.jobDescriptionInput,
    quoteDescription: els.quoteDescriptionInput,
    quoteLabour: els.quoteLabourItemsInput,
    quoteMaterial: els.quoteMaterialItemsInput,
  };
  const targetField = fieldMap[fieldKey];
  if (!targetField) return;
  targetField.value = value;
  targetField.dispatchEvent(new Event("input", { bubbles: true }));
  targetField.focus();
}

function syncJobSuggestions() {
  if (els.jobNameSuggestions) {
    els.jobNameSuggestions.innerHTML = Array.from(new Set([...currentUser.jobs, ...currentUser.archivedJobs]
      .map((job) => String(job.name || "").trim())
      .filter(Boolean)))
      .slice(0, 20)
      .map((name) => `<option value="${escapeHtml(name)}"></option>`)
      .join("");
  }
  if (els.jobDescriptionSuggestions) {
    els.jobDescriptionSuggestions.innerHTML = Array.from(new Set([...currentUser.jobs, ...currentUser.archivedJobs]
      .map((job) => String(job.description || "").trim())
      .filter(Boolean)))
      .slice(0, 20)
      .map((description) => `<option value="${escapeHtml(description)}"></option>`)
      .join("");
  }
  renderSmartFillButtons(
    els.jobDescriptionQuickSuggestions,
    [...currentUser.jobs, ...currentUser.archivedJobs].map((job) => job.description),
    "jobDescription",
  );
}

function syncQuoteSourceSelect(selectedJobId = els.quoteSourceSelect.value) {
  els.quoteSourceSelect.innerHTML = [
    '<option value="">Start from scratch</option>',
    ...currentUser.jobs.map((job) => (
      `<option value="${job.id}">${escapeHtml(job.name)} / ${escapeHtml(job.clientName)}</option>`
    )),
  ].join("");
  els.quoteSourceSelect.value = currentUser.jobs.some((job) => job.id === selectedJobId) ? selectedJobId : "";
}

function syncQuoteRepeatSelect(selectedQuoteId = els.quoteRepeatSelect?.value || "") {
  if (!els.quoteRepeatSelect) return;
  els.quoteRepeatSelect.innerHTML = [
    '<option value="">Choose a previous quote</option>',
    ...currentUser.quotes.slice(0, 20).map((quote) => (
      `<option value="${quote.id}">${escapeHtml(quote.quoteNumber)} / ${escapeHtml(quote.clientName)} / ${escapeHtml(quote.jobName)}</option>`
    )),
  ].join("");
  els.quoteRepeatSelect.value = currentUser.quotes.some((quote) => quote.id === selectedQuoteId) ? selectedQuoteId : "";
}

function syncQuoteStartUi() {
  els.quoteStartOptions.forEach((button) => {
    button.classList.toggle("active", button.dataset.quoteStart === activeQuoteStartMode);
  });
  els.quoteClientSearchWrap?.classList.toggle("hidden", activeQuoteStartMode !== "client");
  els.quoteBlankActionsWrap?.classList.toggle("hidden", activeQuoteStartMode !== "blank");
  els.quoteSourceSelect.closest("label")?.classList.toggle("hidden", activeQuoteStartMode !== "job");
  els.quoteRepeatWrap?.classList.toggle("hidden", activeQuoteStartMode !== "repeat");
}

function handleQuoteStartModeChange(mode) {
  activeQuoteStartMode = mode;
  syncQuoteStartUi();
  if (mode === "repeat") {
    els.quoteRepeatSelect?.focus();
    return;
  }
  if (mode === "blank") {
    resetQuoteForm({ preserveMode: true, keepClientSelection: false });
    return;
  }
  if (mode === "job") {
    els.quoteSourceSelect.focus();
    return;
  }
  syncClientSelect({ quote: els.quoteClientSelect.value });
  renderQuoteClientContext();
  els.quoteClientSearchInput?.focus();
}

function handleQuoteBlankAction(action) {
  if (action === "standalone") {
    resetQuoteForm({ preserveMode: true, keepClientSelection: false });
    if (els.quoteClientSelect.options.length) {
      els.quoteClientSelect.selectedIndex = -1;
    }
    els.quoteClientPhone.value = "";
    els.quoteClientEmail.value = "";
    els.quoteSiteAddressInput.value = "";
    renderQuoteClientContext();
    els.quoteJobNameInput.focus();
    return;
  }

  if (action === "client") {
    openQuickClientOverlay("quote");
    return;
  }

  if (action === "job") {
    openQuickJobOverlay("quote");
  }
}

function renderQuoteClientContext() {
  if (!els.quoteClientContext) return;
  const client = currentUser.clients.find((item) => item.id === els.quoteClientSelect.value);
  if (!client || activeQuoteStartMode !== "client") {
    els.quoteClientContext.innerHTML = "";
    return;
  }

  const recentJobs = [...currentUser.jobs, ...currentUser.archivedJobs]
    .filter((job) => job.clientId === client.id || job.clientName === client.name)
    .slice(0, 2);
  const recentQuotes = currentUser.quotes
    .filter((quote) => quote.clientId === client.id || quote.clientName === client.name)
    .slice(0, 2);

  els.quoteClientContext.innerHTML = `
    <article class="quote-client-context-card">
      <div>
        <strong>${escapeHtml(client.name)}</strong>
        <span>${escapeHtml(client.contactPerson || "Main contact")} / ${escapeHtml(client.phone || "No phone")} / ${escapeHtml(client.suburb || deriveSuburb(client.address || ""))}</span>
      </div>
      <div class="quote-context-columns">
        <div>
          <span class="quote-context-label">Recent jobs</span>
          <p>${recentJobs.length ? recentJobs.map((job) => escapeHtml(job.name)).join("<br>") : "No recent jobs yet."}</p>
        </div>
        <div>
          <span class="quote-context-label">Recent quotes</span>
          <p>${recentQuotes.length ? recentQuotes.map((quote) => `${escapeHtml(quote.quoteNumber)} / ${formatMoney(Number(quote.total || 0))}`).join("<br>") : "No recent quotes yet."}</p>
        </div>
      </div>
    </article>
  `;
}

function handleQuoteRepeatChange() {
  const quote = currentUser.quotes.find((item) => item.id === els.quoteRepeatSelect?.value);
  if (quote) {
    fillQuoteForm({
      sourceJobId: quote.jobId || "",
      clientId: quote.clientId || "",
      clientPhone: quote.clientPhone || "",
      clientEmail: quote.clientEmail || "",
      jobName: quote.jobName || "",
      siteAddress: quote.siteAddress || "",
      description: quote.description || "",
      labourItems: quote.labourItems || "",
      materialItems: quote.materialItems || "",
      labourAmount: quote.labourAmount || 0,
      materialAmount: quote.materialAmount || 0,
      gst: quote.gst || 0,
      total: quote.total || 0,
      notes: quote.notes || "",
      expiryDate: toDateInputValue(new Date(Date.now() + Number(currentUser.defaultQuoteExpiryDays || 14) * 86400000).toISOString()),
    });
  }
}

function syncQuoteSuggestions() {
  const descriptionList = document.getElementById("quoteDescriptionSuggestions");
  const labourList = document.getElementById("quoteLabourSuggestions");
  const materialList = document.getElementById("quoteMaterialSuggestions");
  const descriptionValues = currentUser.quotes.map((quote) => String(quote.description || "").trim()).filter(Boolean);
  const labourValues = currentUser.quotes.map((quote) => String(quote.labourItems || "").trim()).filter(Boolean);
  const materialValues = currentUser.quotes.map((quote) => String(quote.materialItems || "").trim()).filter(Boolean);
  if (descriptionList) {
    descriptionList.innerHTML = Array.from(new Set(descriptionValues))
      .slice(0, 20)
      .map((value) => `<option value="${escapeHtml(value)}"></option>`)
      .join("");
  }
  if (labourList) {
    labourList.innerHTML = Array.from(new Set(labourValues))
      .slice(0, 20)
      .map((value) => `<option value="${escapeHtml(value)}"></option>`)
      .join("");
  }
  if (materialList) {
    materialList.innerHTML = Array.from(new Set(materialValues))
      .slice(0, 20)
      .map((value) => `<option value="${escapeHtml(value)}"></option>`)
      .join("");
  }
  renderSmartFillButtons(els.quoteDescriptionQuickSuggestions, descriptionValues, "quoteDescription");
  renderSmartFillButtons(els.quoteLabourQuickSuggestions, labourValues, "quoteLabour");
  renderSmartFillButtons(els.quoteMaterialQuickSuggestions, materialValues, "quoteMaterial");
}

function handleQuoteQuickAdd(type) {
  if (type === "contingency") {
    els.quoteMaterialItemsInput.value = `${els.quoteMaterialItemsInput.value}\nContingency allowance`.trim();
    els.quoteMaterialAmountInput.value = (Number(els.quoteMaterialAmountInput.value || 0) + 150).toFixed(2);
  }
  if (type === "travel") {
    els.quoteLabourItemsInput.value = `${els.quoteLabourItemsInput.value}\nTravel and site call-out`.trim();
    els.quoteLabourAmountInput.value = (Number(els.quoteLabourAmountInput.value || 0) + 95).toFixed(2);
  }
  if (type === "waste") {
    els.quoteMaterialItemsInput.value = `${els.quoteMaterialItemsInput.value}\nWaste allowance`.trim();
    els.quoteMaterialAmountInput.value = (Number(els.quoteMaterialAmountInput.value || 0) + 80).toFixed(2);
  }
  recalculateQuoteTotals();
}

function syncSelectedQuoteClientDetails() {
  const client = currentUser.clients.find((item) => item.id === els.quoteClientSelect.value);
  if (!client) {
    if (activeQuoteStartMode === "client") {
      els.quoteClientPhone.value = "";
      els.quoteClientEmail.value = "";
      if (!els.quoteSourceSelect.value) {
        els.quoteSiteAddressInput.value = "";
      }
    }
    renderQuoteClientContext();
    return;
  }
  els.quoteClientPhone.value = client.phone;
  els.quoteClientEmail.value = client.email;
  els.quoteSiteAddressInput.value = client.address;
  renderQuoteClientContext();
  renderQuoteBuilderSummary();
}

function syncInvoiceSourceSelect(selectedJobId = els.invoiceJobSelect.value) {
  const completedJobs = [...currentUser.archivedJobs, ...currentUser.jobs.filter((job) => job.status === "Completed")];
  els.invoiceJobSelect.innerHTML = [
    '<option value="">Choose a completed job</option>',
    ...completedJobs.map((job) => (
      `<option value="${job.id}">${escapeHtml(job.name)} / ${escapeHtml(job.clientName)}</option>`
    )),
  ].join("");
  els.invoiceJobSelect.value = completedJobs.some((job) => job.id === selectedJobId) ? selectedJobId : "";
}

function syncInvoiceQuoteSelect() {
  renderInvoiceQuotePicker();
}

function syncInvoiceDuplicateSelect(selectedInvoiceId = els.invoiceDuplicateSelect?.value || "") {
  if (!els.invoiceDuplicateSelect) return;
  els.invoiceDuplicateSelect.innerHTML = [
    '<option value="">Choose an invoice to copy</option>',
    ...currentUser.invoices.slice(0, 12).map((invoice) => (
      `<option value="${invoice.id}">${escapeHtml(invoice.invoiceNumber)} / ${escapeHtml(invoice.client)} / ${escapeHtml(invoice.job)}</option>`
    )),
  ].join("");
  els.invoiceDuplicateSelect.value = currentUser.invoices.some((invoice) => invoice.id === selectedInvoiceId) ? selectedInvoiceId : "";
}

function syncInvoiceStartUi() {
  els.invoiceStartOptions.forEach((button) => {
    button.classList.toggle("active", button.dataset.invoiceStart === activeInvoiceStartMode);
  });
  els.invoiceJobSourceWrap?.classList.toggle("hidden", activeInvoiceStartMode !== "job");
  els.invoiceQuoteSourceWrap?.classList.toggle("hidden", activeInvoiceStartMode !== "quote");
  els.invoiceDuplicateWrap?.classList.toggle("hidden", activeInvoiceStartMode !== "repeat");
}

function handleInvoiceStartModeChange(mode) {
  activeInvoiceStartMode = mode;
  clearInvoiceQuoteConfirmation();
  syncInvoiceStartUi();

  if (mode === "repeat") {
    resetInvoiceForm({ preserveMode: true });
    els.invoiceDuplicateSelect?.focus();
    return;
  }

  els.invoiceDuplicateWrap?.classList.add("hidden");

  if (mode === "client") {
    resetInvoiceForm({ preserveMode: true });
    els.invoiceClientSelect.focus();
    return;
  }

  if (mode === "job") {
    els.invoiceJobSelect.focus();
    return;
  }

  if (mode === "quote") {
    els.invoiceQuoteSearchInput?.focus();
    renderInvoiceQuotePicker();
  }
}

function syncSelectedInvoiceClientDetails() {
  clearInvoiceQuoteConfirmation();
  const client = currentUser.clients.find((item) => item.id === els.invoiceClientSelect.value);
  if (!client) {
    renderInvoiceClientWarning(null);
    renderInvoiceQuotePicker();
    return;
  }
  els.invoiceClientPhone.value = client.phone;
  els.invoiceClientEmail.value = client.email;
  if (!els.invoiceSiteAddressInput.value.trim()) {
    els.invoiceSiteAddressInput.value = client.address || "";
  }
  els.invoiceTermsSelect.value = client.paymentTerms || currentUser.defaultPaymentTerms || "14 days";
  syncInvoiceDueDateFromTerms();
  syncInvoiceTermPills();
  renderInvoiceClientWarning(client);
  renderInvoiceQuotePicker();
  renderInvoiceDraftPreview();
}

function renderQuoteBuilderSummary() {
  if (!els.quoteSummaryTotal) return;
  const sourceJob = findJobById(els.quoteSourceSelect.value);
  const marginValue = sourceJob
    ? Number(els.quoteTotalInput.value || 0) - Number(sourceJob.labourCost || 0) - Number(sourceJob.materialCost || 0)
    : Number(els.quoteTotalInput.value || 0) - Number(els.quoteLabourAmountInput.value || 0) - Number(els.quoteMaterialAmountInput.value || 0);
  els.quoteSummaryLabour.textContent = formatMoney(Number(els.quoteLabourAmountInput.value || 0));
  els.quoteSummaryMaterials.textContent = formatMoney(Number(els.quoteMaterialAmountInput.value || 0));
  if (els.quoteSummaryMargin) {
    els.quoteSummaryMargin.textContent = formatMoney(marginValue);
  }
  els.quoteSummaryGst.textContent = formatMoney(Number(els.quoteGstInput.value || 0));
  els.quoteSummaryTotal.textContent = formatMoney(Number(els.quoteTotalInput.value || 0));
}

function renderInvoiceDraftPreview() {
  if (!els.invoiceDraftTotal) return;
  const client = currentUser?.clients.find((item) => item.id === els.invoiceClientSelect.value);
  const jobName = String(els.invoiceJobNameInput.value || "").trim();
  els.invoiceDraftNumber.textContent = `${currentUser?.invoicePrefix || "PDT-INV"}-next`;
  els.invoiceDraftClient.textContent = client
    ? `${client.name}${jobName ? ` / ${jobName}` : ""}`
    : "Choose a client and job to start the preview.";
  els.invoiceDraftIssueDate.textContent = els.invoiceIssueDateInput.value ? formatDate(els.invoiceIssueDateInput.value) : "Today";
  els.invoiceDraftDueDate.textContent = els.invoiceDueDateInput.value ? formatDate(els.invoiceDueDateInput.value) : "-";
  els.invoiceDraftGst.textContent = formatMoney(Number(els.invoiceGstInput.value || 0));
  els.invoiceDraftTotal.textContent = formatMoney(Number(els.invoiceAmountInput.value || 0));
  if (els.invoiceDraftMeta) {
    const gstMode = currentUser?.gstMode === "GST free" ? "GST off" : "GST on";
    els.invoiceDraftMeta.textContent = `${els.invoiceTypeSelect?.value || "Final invoice"} / ${gstMode} / ${els.invoiceSiteAddressInput.value || "site address ready to add"}`;
  }
}

function handleInvoiceSourceChange() {
  const sourceJob = [...currentUser.archivedJobs, ...currentUser.jobs].find((job) => job.id === els.invoiceJobSelect.value);
  if (sourceJob) {
    fillInvoiceForm(invoiceDraftFromJob(sourceJob));
    return;
  }
  resetInvoiceForm({ preserveMode: true });
}

function handleInvoiceQuoteCardClick(event) {
  const button = event.target.closest("button[data-invoice-quote-id]");
  if (!button) return;
  const quote = currentUser.quotes.find((item) => item.id === button.dataset.invoiceQuoteId);
  if (!quote) return;
  fillInvoiceForm(invoiceDraftFromQuote(quote));
  showInvoiceQuoteConfirmation(quote);
}

function handleInvoiceDuplicateSourceChange() {
  const invoice = currentUser.invoices.find((item) => item.id === els.invoiceDuplicateSelect?.value);
  if (invoice) {
    fillInvoiceForm(invoiceDraftFromExistingInvoice(invoice));
  }
}

function isQuoteReadyForInvoice(status) {
  return ["Accepted", "Sent"].includes(status);
}

function getInvoiceQuotePriority(quote) {
  const status = getQuoteStatus(quote);
  if (status === "Accepted") return 3;
  if (status === "Sent") return 2;
  if (status === "Draft") return 1;
  return 0;
}

function getInvoiceQuotePickerItems() {
  const selectedClient = currentUser.clients.find((client) => client.id === els.invoiceClientSelect.value);
  const now = new Date();
  return currentUser.quotes
    .filter((quote) => {
      const status = getQuoteStatus(quote);
      const suburb = deriveSuburb(quote.siteAddress || "");
      const haystack = [
        quote.clientName,
        quote.quoteNumber,
        suburb,
        quote.jobName,
      ].join(" ").toLowerCase();
      const matchesSearch = !invoiceQuoteSearchQuery || haystack.includes(invoiceQuoteSearchQuery);
      const matchesSelectedClient = !selectedClient
        || quote.clientId === selectedClient.id
        || quote.clientName === selectedClient.name;
      const createdAt = new Date(quote.createdAt || Date.now());
      const isThisMonth = createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
      const matchesFilter = activeInvoiceQuoteFilter === "Recent"
        || (activeInvoiceQuoteFilter === "Accepted" && status === "Accepted")
        || (activeInvoiceQuoteFilter === "This month" && isThisMonth)
        || (activeInvoiceQuoteFilter === "Client" && matchesSelectedClient);
      return isQuoteReadyForInvoice(status) && matchesSearch && matchesFilter && matchesSelectedClient;
    })
    .sort((left, right) => {
      const priorityDiff = getInvoiceQuotePriority(right) - getInvoiceQuotePriority(left);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime();
    });
}

function renderInvoiceQuotePicker() {
  if (!els.invoiceQuoteResults || !els.invoiceQuoteRecentList) return;
  const selectedClient = currentUser.clients.find((client) => client.id === els.invoiceClientSelect.value);
  const recentAcceptedQuotes = currentUser.quotes
    .filter((quote) => getQuoteStatus(quote) === "Accepted")
    .filter((quote) => !selectedClient || quote.clientId === selectedClient.id || quote.clientName === selectedClient.name)
    .sort((left, right) => new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime())
    .slice(0, 5);
  const visibleQuotes = getInvoiceQuotePickerItems();

  els.invoiceQuoteRecentList.innerHTML = recentAcceptedQuotes.length
    ? recentAcceptedQuotes.map((quote) => renderInvoiceQuoteCard(quote)).join("")
    : emptyCard("No recent accepted quotes", selectedClient ? "No accepted quotes are linked to this client yet." : "Accepted quotes will show here for quick selection.");

  els.invoiceQuoteResults.innerHTML = visibleQuotes.length
    ? visibleQuotes.map((quote) => renderInvoiceQuoteCard(quote)).join("")
    : emptyCard("No matching quotes", selectedClient ? "Try another filter or clear the selected client to broaden the search." : "Try another search or filter to find the right quote.");
}

function renderInvoiceQuoteCard(quote) {
  const status = getQuoteStatus(quote);
  const suburb = deriveSuburb(quote.siteAddress || "");
  const readyLabel = status === "Accepted" ? "Ready to invoice" : "Active quote";
  return `
    <button class="invoice-quote-card" type="button" data-invoice-quote-id="${quote.id}">
      <div class="invoice-quote-card-top">
        <strong>${escapeHtml(quote.clientName)}</strong>
        <span class="status-badge ${quoteStatusClass(status)}">${escapeHtml(getQuoteBadgeLabel(status))}</span>
      </div>
      <div class="invoice-quote-card-meta">
        <span>${escapeHtml(quote.quoteNumber)}</span>
        <span>${formatMoney(Number(quote.total || 0))}</span>
      </div>
      <p>${escapeHtml(quote.jobName)}</p>
      <div class="invoice-quote-card-meta">
        <span>${escapeHtml(suburb)}</span>
        <span>${formatDate(quote.createdAt)}</span>
      </div>
      <div class="invoice-quote-card-meta">
        <span>${escapeHtml(readyLabel)}</span>
        <span>Select quote</span>
      </div>
    </button>
  `;
}

function showInvoiceQuoteConfirmation(quote) {
  if (!els.invoiceQuoteConfirmation) return;
  els.invoiceQuoteConfirmation.textContent = `${quote.quoteNumber} for ${quote.clientName} loaded. ${quote.jobName} is ready to invoice for ${formatMoney(Number(quote.total || 0))}.`;
  els.invoiceQuoteConfirmation.classList.remove("hidden");
}

function clearInvoiceQuoteConfirmation() {
  if (!els.invoiceQuoteConfirmation) return;
  els.invoiceQuoteConfirmation.textContent = "";
  els.invoiceQuoteConfirmation.classList.add("hidden");
}

function renderInvoiceClientWarning(client = currentUser.clients.find((item) => item.id === els.invoiceClientSelect.value)) {
  if (!els.invoiceClientWarning) return;
  if (!client) {
    els.invoiceClientWarning.classList.add("hidden");
    els.invoiceClientWarning.textContent = "";
    return;
  }

  const unpaidInvoices = currentUser.invoices.filter((invoice) => (
    invoice.clientId === client.id || invoice.client === client.name
  ) && ["Unpaid", "Overdue"].includes(getInvoiceStatus(invoice)));

  if (!unpaidInvoices.length) {
    els.invoiceClientWarning.classList.add("hidden");
    els.invoiceClientWarning.textContent = "";
    return;
  }

  const outstanding = unpaidInvoices.reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  els.invoiceClientWarning.textContent = `${client.name} already has ${unpaidInvoices.length} unpaid invoice${unpaidInvoices.length === 1 ? "" : "s"} totalling ${formatMoney(outstanding)}.`;
  els.invoiceClientWarning.classList.remove("hidden");
}

function syncInvoiceTermPills() {
  els.invoiceTermPills.forEach((button) => {
    button.classList.toggle("active", button.dataset.invoiceTerm === els.invoiceTermsSelect.value);
  });
}

function syncInvoiceItemSuggestions() {
  if (!els.invoiceItemSuggestions) return;
  const suggestions = Array.from(new Set([
    ...currentUser.invoices.flatMap((invoice) => (invoice.lineItems || []).map((item) => item.description)),
    ...currentUser.quotes.flatMap((quote) => [quote.materialItems, quote.labourItems]),
    ...currentUser.expenses.map((expense) => expense.notes),
  ].map((value) => String(value || "").trim()).filter(Boolean))).slice(0, 30);

  els.invoiceItemSuggestions.innerHTML = suggestions
    .map((value) => `<option value="${escapeHtml(value)}"></option>`)
    .join("");
}

function syncExpenseSuggestions() {
  if (!els.expenseSupplierSuggestions) return;
  els.expenseSupplierSuggestions.innerHTML = Array.from(new Set(currentUser.expenses
    .map((expense) => String(expense.supplier || "").trim())
    .filter(Boolean)))
    .slice(0, 20)
    .map((supplier) => `<option value="${escapeHtml(supplier)}"></option>`)
    .join("");
}

function syncExpenseStartUi() {
  els.expenseStartOptions.forEach((button) => {
    button.classList.toggle("active", button.dataset.expenseStart === activeExpenseStartMode);
  });
}

function handleExpenseStartModeChange(mode) {
  activeExpenseStartMode = mode;
  syncExpenseStartUi();
  if (mode === "receipt") {
    els.expenseReceiptInput?.click();
    return;
  }
  els.expenseSupplierInput?.focus();
}

function syncExpenseJobSelect() {
  const jobOptions = [...currentUser.jobs, ...currentUser.archivedJobs]
    .map((job) => `<option value="${job.id}">${escapeHtml(job.name)} / ${escapeHtml(job.clientName)}</option>`)
    .join("");
  els.expenseJobSelect.innerHTML = `<option value="">No linked job</option>${jobOptions}`;
  els.expenseJobFilter.innerHTML = `<option value="All">All jobs</option><option value="">No linked job</option>${jobOptions}`;
  els.expenseJobFilter.value = [...currentUser.jobs, ...currentUser.archivedJobs].some((job) => job.id === activeExpenseJobId)
    ? activeExpenseJobId
    : activeExpenseJobId === "" ? "" : "All";
}

function syncReportFilters() {
  const allJobs = [...currentUser.jobs, ...currentUser.archivedJobs];
  els.reportJobFilter.innerHTML = [
    '<option value="All">All jobs</option>',
    ...allJobs.map((job) => `<option value="${job.id}">${escapeHtml(job.name)} / ${escapeHtml(job.clientName)}</option>`),
  ].join("");
  els.reportClientFilter.innerHTML = [
    '<option value="All">All clients</option>',
    ...currentUser.clients.map((client) => `<option value="${client.id}">${escapeHtml(client.name)}</option>`),
  ].join("");
  els.reportTeamFilter.innerHTML = [
    '<option value="All">All team</option>',
    ...currentUser.payrollEmployees.map((staff) => `<option value="${escapeHtml(staff.name)}">${escapeHtml(staff.name)}</option>`),
  ].join("");

  els.reportDateRangeSelect.value = reportDateRange;
  els.reportJobFilter.value = allJobs.some((job) => job.id === reportJobFilterValue) ? reportJobFilterValue : "All";
  els.reportClientFilter.value = currentUser.clients.some((client) => client.id === reportClientFilterValue) ? reportClientFilterValue : "All";
  els.reportCategoryFilter.value = reportCategoryFilterValue;
  els.reportTeamFilter.value = currentUser.payrollEmployees.some((staff) => staff.name === reportTeamFilterValue) ? reportTeamFilterValue : "All";

  if (els.reportJobFilter.value !== reportJobFilterValue) reportJobFilterValue = "All";
  if (els.reportClientFilter.value !== reportClientFilterValue) reportClientFilterValue = "All";
  if (els.reportTeamFilter.value !== reportTeamFilterValue) reportTeamFilterValue = "All";
}

function getClientEmail(clientName) {
  const client = currentUser.clients.find((item) => item.name.toLowerCase() === String(clientName).toLowerCase());
  return client ? client.email : "";
}

function getClientEmailFromList(clients, clientName) {
  const client = clients.find((item) => item.name?.toLowerCase() === String(clientName || "").toLowerCase());
  return client ? client.email : "";
}

function getVisibleClients() {
  const clients = currentUser.clients.filter((client) => {
    if (!clientSearchQuery) return true;
    const haystack = [
      client.name,
      client.contactPerson,
      client.phone,
      client.email,
      client.address,
      client.suburb,
      client.paymentTerms,
      ...(client.tags || []),
      client.notes,
    ].join(" ").toLowerCase();
    return haystack.includes(clientSearchQuery);
  });

  return clients.sort((left, right) => {
    if (clientSortMode === "name") {
      return left.name.localeCompare(right.name);
    }
    if (clientSortMode === "outstanding") {
      return getClientStats(right).outstanding - getClientStats(left).outstanding;
    }
    if (clientSortMode === "jobs") {
      return getClientStats(right).jobCount - getClientStats(left).jobCount;
    }
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

function getClientStats(client) {
  const clientJobs = [...currentUser.jobs, ...currentUser.archivedJobs].filter((job) => job.clientId === client.id || job.clientName === client.name);
  const clientInvoices = currentUser.invoices.filter((invoice) => invoice.client === client.name || invoice.clientEmail === client.email);
  return {
    jobCount: clientJobs.length,
    totalInvoiced: clientInvoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    outstanding: clientInvoices.filter((invoice) => invoice.status === "Unpaid").reduce((sum, invoice) => sum + invoice.amount, 0),
    totalPaid: clientInvoices.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0),
    jobs: clientJobs,
    invoices: clientInvoices,
    quotes: currentUser.jobs.filter((job) => job.clientId === client.id || job.clientEmail === client.email),
  };
}

function handleClientAction(event) {
  const button = event.target.closest("button[data-client-action]");
  if (!button) return;
  const client = currentUser.clients.find((item) => item.id === button.dataset.clientId);
  if (!client) return;

  if (button.dataset.clientAction === "view") {
    openClientDetail(client);
  }

  if (button.dataset.clientAction === "edit") {
    editingClientId = client.id;
    els.clientForm.elements.name.value = client.name;
    els.clientForm.elements.contactPerson.value = client.contactPerson;
    els.clientForm.elements.phone.value = client.phone;
    els.clientForm.elements.email.value = client.email;
    els.clientForm.elements.address.value = client.address;
    els.clientForm.elements.suburb.value = client.suburb;
    els.clientForm.elements.paymentTerms.value = client.paymentTerms;
    els.clientForm.elements.tags.value = (client.tags || []).join(", ");
    els.clientForm.elements.notes.value = client.notes;
    els.clientForm.querySelector('button[type="submit"]').textContent = "Update client";
    location.hash = "#workspace-clients";
  }

  if (button.dataset.clientAction === "quote") {
    activeQuoteStartMode = "client";
    fillQuoteForm({
      sourceJobId: "",
      clientId: client.id,
      clientPhone: client.phone,
      clientEmail: client.email,
      jobName: "",
      siteAddress: client.address,
      description: "",
      labourItems: "Labour allowance",
      materialItems: "Material allowance",
      labourAmount: 0,
      materialAmount: 0,
      gst: 0,
      total: 0,
      notes: "",
      expiryDate: toDateInputValue(new Date(Date.now() + Number(currentUser.defaultQuoteExpiryDays || 14) * 86400000).toISOString()),
    });
    openQuickCreateTarget("#workspace-quotes", els.quoteForm);
  }

  if (button.dataset.clientAction === "invoice") {
    activeInvoiceStartMode = "client";
    fillInvoiceForm(invoiceDraftFromClient(client));
    syncInvoiceStartUi();
    renderInvoiceClientWarning(client);
    openQuickCreateTarget("#workspace-invoices", els.invoiceForm);
  }

  if (button.dataset.clientAction === "job") {
    activeJobStartMode = "client";
    syncJobStartUi();
    els.jobClientSelect.value = client.id;
    syncSelectedClientDetails();
    els.jobForm.elements.name.value = "";
    els.jobForm.elements.description.value = "";
    openQuickCreateTarget("#workspace-jobs", els.jobForm);
  }
}

function openClientDetail(client) {
  const stats = getClientStats(client);
  els.clientDetailContent.innerHTML = `
    <div class="client-detail-header">
      <div>
        <h2 id="clientDetailTitle" class="card-title">${escapeHtml(client.name)}</h2>
        <p class="card-copy">${escapeHtml(client.contactPerson)} / ${escapeHtml(client.phone)} / ${escapeHtml(client.email)}</p>
        <p class="card-copy">${escapeHtml(client.address)} / ${escapeHtml(client.suburb)} / ${escapeHtml(client.paymentTerms)}</p>
        <div class="client-tag-row">
          ${(client.tags || []).map((tag) => `<span class="client-chip">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <span class="status-badge ${stats.outstanding > 0 ? "status-unpaid" : "status-paid"}">${stats.outstanding > 0 ? "Money owing" : "Paid up"}</span>
    </div>
    <div class="client-summary-grid">
      <article class="client-summary-tile"><span>Total jobs</span><strong>${stats.jobCount}</strong></article>
      <article class="client-summary-tile"><span>Total paid</span><strong>${formatMoney(stats.totalPaid)}</strong></article>
      <article class="client-summary-tile"><span>Still owed</span><strong>${formatMoney(stats.outstanding)}</strong></article>
    </div>
    <div class="report-grid">
      <article class="report-tile">
        <span>Recent jobs</span>
        <p>${stats.jobs.slice(0, 3).map((job) => `${escapeHtml(job.name)} / ${escapeHtml(job.status)} / ${formatMoney(job.quoteAmount)}`).join("<br>") || "No jobs tied to this client."}</p>
      </article>
      <article class="report-tile">
        <span>Recent quotes</span>
        <p>${stats.quotes.slice(0, 3).map((job) => `${escapeHtml(job.name)} / ${escapeHtml(job.quoteStatus)} / ${formatMoney(job.quoteAmount)}`).join("<br>") || "No quotes sent for this client."}</p>
      </article>
      <article class="report-tile">
        <span>Recent invoices</span>
        <p>${stats.invoices.slice(0, 3).map((invoice) => `${escapeHtml(invoice.job)} / ${escapeHtml(invoice.status)} / ${formatMoney(invoice.amount)}`).join("<br>") || "No invoices raised for this client."}</p>
      </article>
    </div>
    <article class="record-row" style="margin-top: 16px;">
      <div>
        <span>Client notes</span>
        <strong>${escapeHtml(client.notes || "No client notes saved.")}</strong>
      </div>
    </article>
  `;
  els.clientDetailOverlay.classList.remove("hidden");
}

function syncClientLinkedRecords(client, previousClient = client) {
  currentUser.jobs = currentUser.jobs.map((job) => (
    job.clientId === client.id
      ? {
        ...job,
        clientName: client.name,
        clientPhone: client.phone,
        clientEmail: client.email,
        address: client.address,
        suburb: client.suburb,
      }
      : job
  ));

  currentUser.archivedJobs = currentUser.archivedJobs.map((job) => (
    job.clientId === client.id
      ? {
        ...job,
        clientName: client.name,
        clientPhone: client.phone,
        clientEmail: client.email,
        address: client.address,
        suburb: client.suburb,
      }
      : job
  ));

  currentUser.invoices = currentUser.invoices.map((invoice) => (
    invoice.clientId === client.id
      || invoice.clientEmail === previousClient.email
      || invoice.client === previousClient.name
      || invoice.clientEmail === client.email
      || invoice.client === client.name
      ? {
        ...invoice,
        clientId: client.id,
        client: client.name,
        clientEmail: client.email,
        clientPhone: client.phone,
      }
      : invoice
  ));

  currentUser.quotes = currentUser.quotes.map((quote) => (
    quote.clientId === client.id
      || quote.clientEmail === previousClient.email
      || quote.clientName === previousClient.name
      || quote.clientEmail === client.email
      || quote.clientName === client.name
      ? {
        ...quote,
        clientId: client.id,
        clientName: client.name,
        clientPhone: client.phone,
        clientEmail: client.email,
        siteAddress: quote.siteAddress || client.address,
      }
      : quote
  ));
}

function getVisibleJobs() {
  const sourceJobs = activeJobFilter === "Completed" || activeJobFilter === "Archived"
    ? currentUser.archivedJobs
    : currentUser.jobs;

  return sourceJobs.filter((job) => {
    if (activeJobFilter === "Active" && job.status !== "Active") return false;
    if (activeJobFilter === "Upcoming" && job.status !== "Upcoming") return false;
    if (activeJobFilter === "Recurring" && job.recurring === "One-off") return false;
    return matchesJobSearch(job, jobSearchQuery);
  });
}

function matchesJobSearch(job, query) {
  if (!query) return true;
  const haystack = [
    job.name,
    job.clientName,
    job.suburb,
    job.address,
    job.status,
    job.quoteStatus,
    job.invoiceStatus,
    job.assignee,
    job.recurring,
    job.description,
    job.internalNotes,
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

function deriveSuburb(address) {
  const parts = String(address || "").split(",").map((part) => part.trim()).filter(Boolean);
  if (!parts.length) return "Sydney";
  const last = parts[parts.length - 1].replace(/\b(NSW|VIC|QLD|SA|WA|TAS|ACT|NT)\b/gi, "").trim();
  return last || parts[parts.length - 1] || "Sydney";
}

function getJobStatusFromSchedule(value) {
  const scheduledTime = new Date(value).getTime();
  if (Number.isNaN(scheduledTime)) return "Active";
  return scheduledTime > Date.now() + 3600000 ? "Upcoming" : "Active";
}

function toDateTimeLocalValue(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 16);
  }
  const localOffsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - localOffsetMs).toISOString().slice(0, 16);
}

function toDateInputValue(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date(Date.now() + Number(currentUser?.defaultQuoteExpiryDays || 14) * 86400000).toISOString().slice(0, 10);
  }
  const localOffsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - localOffsetMs).toISOString().slice(0, 10);
}

function setJobFormDefaults() {
  if (!els.jobForm.elements.scheduledAt.value) {
    els.jobForm.elements.scheduledAt.value = toDateTimeLocalValue(new Date(Date.now() + 86400000).toISOString());
  }
  if (!els.jobForm.elements.assignee.value) {
    els.jobForm.elements.assignee.value = currentUser?.name || "Beau";
  }
  if (els.jobStatusSelect && !els.jobStatusSelect.value) {
    els.jobStatusSelect.value = "Upcoming";
  }
}

function renderClients() {
  const visibleClients = getVisibleClients();
  els.clientCount.textContent = `${visibleClients.length} clients`;
  els.clientsList.innerHTML = visibleClients.length ? visibleClients.map((client) => {
    const stats = getClientStats(client);
    const recentJobs = stats.jobs
      .slice()
      .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0))
      .slice(0, 2)
      .map((job) => job.name)
      .join(" / ");
    const unpaidCount = stats.invoices.filter((invoice) => ["Unpaid", "Overdue"].includes(getInvoiceStatus(invoice))).length;
    return `
      <article class="record-row">
        <div>
          <span>${escapeHtml(client.contactPerson)} / ${escapeHtml(client.suburb)} / ${escapeHtml(client.paymentTerms)}</span>
          <strong>${escapeHtml(client.name)}</strong>
          <span>${escapeHtml(client.phone)} / ${escapeHtml(client.email)} / ${escapeHtml(client.address)}</span>
          <span>${stats.jobCount} jobs / ${unpaidCount} unpaid invoice${unpaidCount === 1 ? "" : "s"} / Total invoiced ${formatMoney(stats.totalInvoiced)}</span>
          <span>${recentJobs ? `Recent jobs: ${escapeHtml(recentJobs)}` : "Recent jobs: none yet"}</span>
          <div class="client-tag-row">
            ${client.tags.map((tag) => `<span class="client-chip">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="record-actions">
            <button class="mini-action" type="button" data-client-action="quote" data-client-id="${client.id}">New quote</button>
            <button class="mini-action" type="button" data-client-action="invoice" data-client-id="${client.id}">New invoice</button>
            <button class="mini-action" type="button" data-client-action="job" data-client-id="${client.id}">New job</button>
            <button class="mini-action" type="button" data-client-action="view" data-client-id="${client.id}">View details</button>
            <button class="mini-action" type="button" data-client-action="edit" data-client-id="${client.id}">Edit client</button>
          </div>
        </div>
        <div class="record-right">
          <p class="record-amount">${formatMoney(stats.outstanding)}</p>
          <span class="status-badge ${stats.outstanding > 0 ? "status-unpaid" : "status-paid"}">
            ${stats.outstanding > 0 ? "Owing" : "Paid up"}
          </span>
        </div>
      </article>
    `;
    }).join("") : (
      currentUser.clients.length
        ? emptyCard("No clients found", "Adjust your search or sort to see saved client records.")
        : emptyCard(...emptyStateCopy("clients"))
    );
}

function getVisibleQuotes() {
  return currentUser.quotes
    .filter((quote) => {
      const quoteStatus = getQuoteStatus(quote);
      const searchable = [
        quote.quoteNumber,
        quote.clientName,
        quote.jobName,
        quote.siteAddress,
        quote.description,
        quote.notes,
        quoteStatus,
      ].join(" ").toLowerCase();
      const matchesFilter = activeQuoteFilter === "All" || quoteStatus === activeQuoteFilter;
      const matchesSearch = !quoteSearchQuery || searchable.includes(quoteSearchQuery);
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getQuoteStatus(quote) {
  if (["Accepted", "Rejected"].includes(quote.status)) {
    return quote.status;
  }
  const expiryTime = new Date(`${quote.expiryDate}T23:59:59`).getTime();
  if (!Number.isNaN(expiryTime) && expiryTime < Date.now()) {
    return "Expired";
  }
  return quote.status || "Draft";
}

function quoteStatusClass(status) {
  if (status === "Accepted") return "status-accepted";
  if (status === "Rejected") return "status-rejected";
  if (status === "Expired") return "status-expired";
  if (status === "Sent") return "status-sent";
  return "status-draft";
}

function refreshExpiredQuotes() {
  currentUser.quotes.forEach((quote) => {
    if (quote.status === "Draft" || quote.status === "Sent") {
      quote.status = getQuoteStatus(quote);
    }
  });
}

function handleQuoteSourcePrefill(sourceJobId) {
  const sourceJob = currentUser.jobs.find((job) => job.id === sourceJobId);
  if (sourceJob) {
    fillQuoteForm(quoteDraftFromJob(sourceJob));
  }
}

function quoteDraftFromJob(job) {
  return {
    sourceJobId: job.id,
    clientId: job.clientId,
    clientPhone: job.clientPhone,
    clientEmail: job.clientEmail,
    jobName: job.name,
    siteAddress: job.address,
    description: job.description,
    labourItems: `${job.assignee} labour allowance for ${job.name}`,
    materialItems: `Materials allowance for ${job.name}`,
    labourAmount: job.labourCost,
    materialAmount: job.materialCost,
    gst: roundCurrency(job.quoteAmount / 11),
    total: job.quoteAmount,
    notes: job.internalNotes || "Prepared from job details.",
    expiryDate: toDateInputValue(new Date(Date.now() + Number(currentUser.defaultQuoteExpiryDays || 14) * 86400000).toISOString()),
  };
}

function fillQuoteForm(data) {
  activeQuoteStartMode = data.sourceJobId ? "job" : "client";
  if (!data.sourceJobId) {
    quoteClientSearchQuery = "";
    if (els.quoteClientSearchInput) {
      els.quoteClientSearchInput.value = "";
    }
  }
  syncQuoteStartUi();
  syncQuoteSourceSelect(data.sourceJobId || "");
  syncQuoteRepeatSelect("");
  if (data.clientId && currentUser.clients.some((client) => client.id === data.clientId)) {
    els.quoteClientSelect.value = data.clientId;
  }
  els.quoteClientPhone.value = data.clientPhone || "";
  els.quoteClientEmail.value = data.clientEmail || "";
  els.quoteJobNameInput.value = data.jobName || "";
  els.quoteSiteAddressInput.value = data.siteAddress || "";
  els.quoteDescriptionInput.value = data.description || "";
  els.quoteLabourItemsInput.value = data.labourItems || "";
  els.quoteMaterialItemsInput.value = data.materialItems || "";
  els.quoteLabourAmountInput.value = Number(data.labourAmount || 0).toFixed(2);
  els.quoteMaterialAmountInput.value = Number(data.materialAmount || 0).toFixed(2);
  els.quoteGstInput.value = Number(data.gst || 0).toFixed(2);
  els.quoteTotalInput.value = Number(data.total || 0).toFixed(2);
  els.quoteNotesInput.value = data.notes || "";
  els.quoteExpiryInput.value = data.expiryDate || toDateInputValue(new Date(Date.now() + Number(currentUser.defaultQuoteExpiryDays || 14) * 86400000).toISOString());
  renderQuoteClientContext();
  renderQuoteBuilderSummary();
}

function resetQuoteForm(options = {}) {
  const { preserveMode = false, keepClientSelection = true } = options;
  els.quoteForm.reset();
  if (!preserveMode) {
    activeQuoteStartMode = "client";
  }
  syncQuoteSourceSelect("");
  syncQuoteRepeatSelect("");
  syncQuoteStartUi();
  if (keepClientSelection && els.quoteClientSelect.options.length) {
    els.quoteClientSelect.selectedIndex = 0;
  } else if (!keepClientSelection) {
    els.quoteClientSelect.selectedIndex = -1;
  }
  syncSelectedQuoteClientDetails();
  els.quoteJobNameInput.value = "";
  els.quoteDescriptionInput.value = "";
  els.quoteLabourItemsInput.value = "Labour allowance";
  els.quoteMaterialItemsInput.value = "Material allowance";
  els.quoteLabourAmountInput.value = "2400.00";
  els.quoteMaterialAmountInput.value = "1800.00";
  els.quoteNotesInput.value = "Standard exclusions apply unless listed here.";
  setQuoteFormDefaults();
  recalculateQuoteTotals();
}

function setQuoteFormDefaults() {
  if (!els.quoteExpiryInput.value) {
    els.quoteExpiryInput.value = toDateInputValue(new Date(Date.now() + Number(currentUser.defaultQuoteExpiryDays || 14) * 86400000).toISOString());
  }
  if (!els.quoteLabourItemsInput.value.trim()) {
    els.quoteLabourItemsInput.value = "Labour allowance";
  }
  if (!els.quoteMaterialItemsInput.value.trim()) {
    els.quoteMaterialItemsInput.value = "Material allowance";
  }
  if (!els.quoteNotesInput.value.trim()) {
    els.quoteNotesInput.value = "Standard exclusions apply unless listed here.";
  }
  recalculateQuoteTotals();
}

function recalculateQuoteTotals() {
  const labourAmount = Number(els.quoteLabourAmountInput.value || 0);
  const materialAmount = Number(els.quoteMaterialAmountInput.value || 0);
  const subtotal = labourAmount + materialAmount;
  const gst = roundCurrency(subtotal * 0.1);
  els.quoteGstInput.value = gst.toFixed(2);
  els.quoteTotalInput.value = roundCurrency(subtotal + gst).toFixed(2);
  renderQuoteBuilderSummary();
}

function nextQuoteNumber() {
  const maxNumber = currentUser.quotes.reduce((max, quote) => {
    const numeric = Number(String(quote.quoteNumber || "").replace(/\D/g, ""));
    return Number.isFinite(numeric) ? Math.max(max, numeric) : max;
  }, 1040);
  return `${currentUser.quotePrefix || "PDT-Q"}-${maxNumber + 1}`;
}

function findJobById(jobId) {
  return currentUser.jobs.find((job) => job.id === jobId)
    || currentUser.archivedJobs.find((job) => job.id === jobId)
    || null;
}

function syncJobFromQuote(quote, jobQuoteStatus) {
  if (!quote.jobId) return;
  const linkedJob = currentUser.jobs.find((job) => job.id === quote.jobId)
    || currentUser.archivedJobs.find((job) => job.id === quote.jobId);
  if (!linkedJob) return;

  linkedJob.clientId = quote.clientId;
  linkedJob.clientName = quote.clientName;
  linkedJob.clientPhone = quote.clientPhone;
  linkedJob.clientEmail = quote.clientEmail;
  linkedJob.name = quote.jobName;
  linkedJob.address = quote.siteAddress;
  linkedJob.suburb = deriveSuburb(quote.siteAddress);
  linkedJob.description = quote.description;
  linkedJob.quoteAmount = Number(quote.total || 0);
  linkedJob.labourCost = Number(quote.labourAmount || 0);
  linkedJob.materialCost = Number(quote.materialAmount || 0);
  linkedJob.internalNotes = quote.notes;
  linkedJob.quoteStatus = jobQuoteStatus;
}

function createOrUpdateJobFromQuote(quote) {
  quote.status = "Accepted";

  if (quote.jobId && findJobById(quote.jobId)) {
    syncJobFromQuote(quote, "Approved");
    return;
  }

  const newJob = normaliseJob({
    id: crypto.randomUUID(),
    clientId: quote.clientId,
    clientName: quote.clientName,
    clientPhone: quote.clientPhone,
    clientEmail: quote.clientEmail,
    name: quote.jobName,
    address: quote.siteAddress,
    description: quote.description,
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    assignee: currentUser.name,
    quoteAmount: quote.total,
    labourCost: quote.labourAmount,
    materialCost: quote.materialAmount,
    recurring: "One-off",
    internalNotes: quote.notes,
    status: "Upcoming",
    quoteStatus: "Approved",
    invoiceStatus: "Not invoiced",
    invoiceSent: false,
    createdAt: new Date().toISOString(),
  });

  quote.jobId = newJob.id;
  currentUser.jobs.unshift(newJob);
}

function openQuotePreview(quoteId) {
  const quote = currentUser.quotes.find((item) => item.id === quoteId);
  if (!quote) return;

  selectedQuoteId = quoteId;
  const status = getQuoteStatus(quote);
  els.quotePreviewContent.innerHTML = `
    <div class="quote-preview-shell">
      <div class="quote-preview-top">
        <div>
          <span class="status-badge ${quoteStatusClass(status)}">${escapeHtml(status)}</span>
          <h3 id="quotePreviewTitle">${escapeHtml(quote.quoteNumber)} / ${escapeHtml(quote.jobName)}</h3>
          <p class="quote-preview-copy">${escapeHtml(quote.description)}</p>
        </div>
        <div class="quote-preview-meta">
          <div><strong>${formatMoney(quote.total)}</strong></div>
          <div>Created ${formatDate(quote.createdAt)}</div>
          <div>Valid until ${formatDate(quote.expiryDate)}</div>
        </div>
      </div>

      <div class="quote-breakdown-grid">
        <div class="quote-total-box">
          <span>Client</span>
          <strong>${escapeHtml(quote.clientName)}</strong>
          <p class="quote-preview-copy">${escapeHtml(quote.clientPhone || "No phone")}<br>${escapeHtml(quote.clientEmail)}<br>${escapeHtml(quote.siteAddress)}</p>
        </div>
        <div class="quote-total-box">
          <span>Total inc GST</span>
          <strong>${formatMoney(quote.total)}</strong>
          <p class="quote-preview-copy">GST ${formatMoney(quote.gst)} / Labour ${formatMoney(quote.labourAmount)} / Materials ${formatMoney(quote.materialAmount)}</p>
        </div>
      </div>

      <div class="quote-line-table">
        <div class="quote-line-row">
          <span>${escapeHtml(quote.labourItems).replaceAll("\n", "<br>")}</span>
          <strong>${formatMoney(quote.labourAmount)}</strong>
        </div>
        <div class="quote-line-row">
          <span>${escapeHtml(quote.materialItems).replaceAll("\n", "<br>")}</span>
          <strong>${formatMoney(quote.materialAmount)}</strong>
        </div>
        <div class="quote-line-row">
          <span>GST</span>
          <strong>${formatMoney(quote.gst)}</strong>
        </div>
      </div>

      <p class="quote-preview-copy"><strong>Notes:</strong> ${escapeHtml(quote.notes || "No exclusions added.")}</p>
    </div>
  `;
  els.quotePreviewOverlay.classList.remove("hidden");
}

function getVisibleInvoices() {
  return currentUser.invoices
    .filter((invoice) => {
      const status = getInvoiceStatus(invoice);
      const searchable = [
        invoice.invoiceNumber,
        invoice.client,
        invoice.job,
        invoice.paymentMethod,
        invoice.notes,
        status,
      ].join(" ").toLowerCase();
      const matchesFilter = activeInvoiceFilter === "All" || status === activeInvoiceFilter;
      const matchesSearch = !invoiceSearchQuery || searchable.includes(invoiceSearchQuery);
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => new Date(b.issueDate || b.createdAt) - new Date(a.issueDate || a.createdAt));
}

function getInvoiceStatus(invoice) {
  if (["Paid", "Draft", "Pending approval", "Approved"].includes(invoice.status)) {
    return invoice.status;
  }
  const dueTime = new Date(`${invoice.dueDate}T23:59:59`).getTime();
  if (!Number.isNaN(dueTime) && dueTime < Date.now()) {
    return "Overdue";
  }
  return "Unpaid";
}

function invoiceStatusClass(status) {
  if (status === "Paid") return "status-paid";
  if (status === "Draft") return "status-draft";
  if (status === "Pending approval") return "status-draft";
  if (status === "Approved") return "status-active";
  if (status === "Overdue") return "status-overdue";
  return "status-unpaid";
}

function refreshOverdueInvoices() {
  currentUser.invoices.forEach((invoice) => {
    if (!["Paid", "Draft", "Pending approval", "Approved"].includes(invoice.status)) {
      invoice.status = getInvoiceStatus(invoice);
    }
  });
}

function invoiceDraftFromJob(job) {
  const client = currentUser.clients.find((item) => item.id === job.clientId || item.name === job.clientName);
  const issueDate = toDateInputValue(new Date().toISOString());
  const paymentTerms = client?.paymentTerms || currentUser.defaultPaymentTerms || "7 days";
  const gst = roundCurrency(Number(job.quoteAmount || 0) / 11);
  const materialsAmount = Number(job.materialCost || 0);
  const labourAmount = roundCurrency(Math.max(0, Number(job.quoteAmount || 0) - gst - materialsAmount));
  return {
    sourceJobId: job.id,
    clientId: job.clientId || client?.id || "",
    clientPhone: job.clientPhone || client?.phone || "",
    clientEmail: job.clientEmail || client?.email || "",
    jobName: job.name,
    siteAddress: job.address || client?.address || "",
    invoiceType: "Final invoice",
    paymentTerms,
    materialsAmount,
    labourAmount,
    gst,
    amount: Number(job.quoteAmount || 0),
    issueDate,
    dueDate: calculateDueDate(issueDate, paymentTerms),
    status: "Unpaid",
    paymentMethod: currentUser.paymentMethod || "Bank transfer",
    notes: `Invoice generated from ${job.name}.`,
    attachmentsNote: job.internalNotes || "Completion photos and signed job sheet can be supplied.",
    lineItems: [
      { description: `Materials for ${job.name}`, qty: 1, rate: materialsAmount },
      { description: `Labour for ${job.name}`, qty: 1, rate: labourAmount },
    ],
  };
}

function invoiceDraftFromQuote(quote) {
  const client = currentUser.clients.find((item) => item.id === quote.clientId || item.name === quote.clientName);
  const issueDate = toDateInputValue(new Date().toISOString());
  const paymentTerms = client?.paymentTerms || currentUser.defaultPaymentTerms || "14 days";
  return {
    sourceJobId: quote.jobId || "",
    clientId: quote.clientId || client?.id || "",
    clientPhone: quote.clientPhone || client?.phone || "",
    clientEmail: quote.clientEmail || client?.email || "",
    jobName: quote.jobName || "",
    siteAddress: quote.siteAddress || client?.address || "",
    invoiceType: "Final invoice",
    paymentTerms,
    materialsAmount: Number(quote.materialAmount || 0),
    labourAmount: Number(quote.labourAmount || 0),
    gst: Number(quote.gst || 0),
    amount: Number(quote.total || 0),
    issueDate,
    dueDate: calculateDueDate(issueDate, paymentTerms),
    status: "Unpaid",
    paymentMethod: currentUser.paymentMethod || "Bank transfer",
    notes: quote.notes || `Invoice converted from ${quote.quoteNumber}.`,
    attachmentsNote: `Converted from quote ${quote.quoteNumber}.`,
    lineItems: [
      { description: quote.materialItems || `Materials for ${quote.jobName}`, qty: 1, rate: Number(quote.materialAmount || 0) },
      { description: quote.labourItems || `Labour for ${quote.jobName}`, qty: 1, rate: Number(quote.labourAmount || 0) },
    ],
  };
}

function invoiceDraftFromClient(client) {
  const issueDate = toDateInputValue(new Date().toISOString());
  const paymentTerms = client?.paymentTerms || currentUser.defaultPaymentTerms || "14 days";
  return {
    sourceJobId: "",
    clientId: client?.id || "",
    clientPhone: client?.phone || "",
    clientEmail: client?.email || "",
    jobName: "",
    siteAddress: client?.address || "",
    invoiceType: "Final invoice",
    paymentTerms,
    materialsAmount: 0,
    labourAmount: 0,
    gst: 0,
    amount: 0,
    issueDate,
    dueDate: calculateDueDate(issueDate, paymentTerms),
    status: "Draft",
    paymentMethod: currentUser.paymentMethod || "Bank transfer",
    notes: client?.notes || "Please include the invoice number as the payment reference.",
    attachmentsNote: "Supporting photos or signed site notes available on request.",
    lineItems: [
      { description: "", qty: 1, rate: 0 },
      { description: "", qty: 1, rate: 0 },
    ],
  };
}

function invoiceDraftFromExistingInvoice(invoice) {
  const issueDate = toDateInputValue(new Date().toISOString());
  return {
    sourceJobId: invoice.jobId || "",
    clientId: invoice.clientId || "",
    clientPhone: invoice.clientPhone || "",
    clientEmail: invoice.clientEmail || "",
    jobName: invoice.job || "",
    siteAddress: invoice.siteAddress || "",
    invoiceType: invoice.invoiceType || "Final invoice",
    paymentTerms: invoice.paymentTerms || currentUser.defaultPaymentTerms || "14 days",
    materialsAmount: Number(invoice.materialsAmount || 0),
    labourAmount: Number(invoice.labourAmount || 0),
    gst: Number(invoice.gst || 0),
    amount: Number(invoice.amount || 0),
    issueDate,
    dueDate: calculateDueDate(issueDate, invoice.paymentTerms || currentUser.defaultPaymentTerms || "14 days"),
    status: "Draft",
    paymentMethod: invoice.paymentMethod || currentUser.paymentMethod || "Bank transfer",
    notes: invoice.notes || "",
    attachmentsNote: invoice.attachmentsNote || "",
    lineItems: Array.isArray(invoice.lineItems) && invoice.lineItems.length
      ? invoice.lineItems
      : [
        { description: "Materials supplied", qty: 1, rate: Number(invoice.materialsAmount || 0) },
        { description: "Labour completed", qty: 1, rate: Number(invoice.labourAmount || 0) },
      ],
  };
}

function fillInvoiceForm(data) {
  syncInvoiceSourceSelect(data.sourceJobId || "");
  syncInvoiceQuoteSelect();
  syncInvoiceDuplicateSelect("");
  if (data.clientId && currentUser.clients.some((client) => client.id === data.clientId)) {
    els.invoiceClientSelect.value = data.clientId;
  }
  els.invoiceClientPhone.value = data.clientPhone || "";
  els.invoiceClientEmail.value = data.clientEmail || "";
  els.invoiceJobNameInput.value = data.jobName || "";
  els.invoiceSiteAddressInput.value = data.siteAddress || "";
  els.invoiceTypeSelect.value = data.invoiceType || "Final invoice";
  els.invoiceTermsSelect.value = data.paymentTerms || "7 days";
  const lineItems = Array.isArray(data.lineItems) && data.lineItems.length
    ? data.lineItems
    : [
      { description: "Materials supplied", qty: 1, rate: Number(data.materialsAmount || 0) },
      { description: "Labour completed", qty: 1, rate: Number(data.labourAmount || 0) },
    ];
  els.invoiceLineDescription1.value = lineItems[0]?.description || "";
  els.invoiceLineQty1.value = Number(lineItems[0]?.qty || 1).toFixed(2).replace(/\.00$/, "");
  els.invoiceLineRate1.value = Number(lineItems[0]?.rate || 0).toFixed(2);
  els.invoiceLineDescription2.value = lineItems[1]?.description || "";
  els.invoiceLineQty2.value = Number(lineItems[1]?.qty || 1).toFixed(2).replace(/\.00$/, "");
  els.invoiceLineRate2.value = Number(lineItems[1]?.rate || 0).toFixed(2);
  els.invoiceIssueDateInput.value = data.issueDate || toDateInputValue(new Date().toISOString());
  els.invoiceDueDateInput.value = data.dueDate || calculateDueDate(els.invoiceIssueDateInput.value, els.invoiceTermsSelect.value);
  els.invoiceStatusSelect.value = data.status || "Draft";
  if (els.invoiceApprovalRequiredSelect) {
    els.invoiceApprovalRequiredSelect.value = data.approvalRequired ? "yes" : "no";
  }
  els.invoicePaymentMethodSelect.value = data.paymentMethod || "Bank transfer";
  els.invoiceNotesInput.value = data.notes || "";
  els.invoiceAttachmentInput.value = data.attachmentsNote || "";
  syncInvoiceTermPills();
  recalculateInvoiceTotals();
  renderInvoiceClientWarning(currentUser.clients.find((client) => client.id === els.invoiceClientSelect.value));
  renderInvoiceDraftPreview();
}

function resetInvoiceForm(options = {}) {
  const { preserveMode = false } = options;
  els.invoiceForm.reset();
  syncInvoiceSourceSelect("");
  invoiceQuoteSearchQuery = "";
  if (els.invoiceQuoteSearchInput) {
    els.invoiceQuoteSearchInput.value = "";
  }
  activeInvoiceQuoteFilter = "Recent";
  document.querySelectorAll("[data-invoice-quote-filter]").forEach((item) => {
    item.classList.toggle("active", item.dataset.invoiceQuoteFilter === "Recent");
  });
  syncInvoiceQuoteSelect();
  syncInvoiceDuplicateSelect("");
  clearInvoiceQuoteConfirmation();
  if (els.invoiceClientSelect.options.length) {
    els.invoiceClientSelect.selectedIndex = 0;
  }
  if (!preserveMode) {
    activeInvoiceStartMode = "quote";
  }
  syncInvoiceStartUi();
  els.invoiceSiteAddressInput.value = "";
  els.invoiceJobNameInput.value = "";
  els.invoiceLineDescription1.value = "Materials supplied";
  els.invoiceLineQty1.value = "1";
  els.invoiceLineRate1.value = "850.00";
  els.invoiceLineDescription2.value = "Labour completed";
  els.invoiceLineQty2.value = "1";
  els.invoiceLineRate2.value = "1150.00";
  els.invoiceTypeSelect.value = "Final invoice";
  els.invoiceStatusSelect.value = "Draft";
  if (els.invoiceApprovalRequiredSelect) {
    els.invoiceApprovalRequiredSelect.value = "no";
  }
  els.invoicePaymentMethodSelect.value = "Bank transfer";
  els.invoiceNotesInput.value = "Please include the invoice number as the payment reference.";
  els.invoiceAttachmentInput.value = "Photos, receipts, and signed site notes available on request.";
  setInvoiceFormDefaults();
  recalculateInvoiceTotals();
  renderInvoiceClientWarning(null);
}

function setInvoiceFormDefaults() {
  if (!els.invoiceIssueDateInput.value) {
    els.invoiceIssueDateInput.value = toDateInputValue(new Date().toISOString());
  }
  if (!els.invoiceTermsSelect.value) {
    els.invoiceTermsSelect.value = currentUser?.defaultPaymentTerms || "14 days";
  }
  if (!els.invoiceNotesInput.value.trim()) {
    els.invoiceNotesInput.value = "Please include the invoice number as the payment reference.";
  }
  if (!els.invoiceAttachmentInput.value.trim()) {
    els.invoiceAttachmentInput.value = "Photos, receipts, and signed site notes available on request.";
  }
  syncInvoiceGstNote();
  syncInvoiceTermPills();
  syncInvoiceDueDateFromTerms();
  recalculateInvoiceTotals();
}

function recalculateInvoiceTotals() {
  const materialsAmount = roundCurrency(Number(els.invoiceLineQty1.value || 0) * Number(els.invoiceLineRate1.value || 0));
  const labourAmount = roundCurrency(Number(els.invoiceLineQty2.value || 0) * Number(els.invoiceLineRate2.value || 0));
  const subtotal = materialsAmount + labourAmount;
  const gstEnabled = currentUser?.gstMode !== "GST free";
  const gst = gstEnabled ? roundCurrency(subtotal * 0.1) : 0;
  els.invoiceLineTotal1.value = formatMoney(materialsAmount);
  els.invoiceLineTotal2.value = formatMoney(labourAmount);
  els.invoiceMaterialsInput.value = materialsAmount.toFixed(2);
  els.invoiceLabourInput.value = labourAmount.toFixed(2);
  els.invoiceGstInput.value = gst.toFixed(2);
  els.invoiceAmountInput.value = roundCurrency(subtotal + gst).toFixed(2);
  if (els.invoiceSubtotalValue) {
    els.invoiceSubtotalValue.textContent = formatMoney(subtotal);
  }
  if (els.invoiceGstDisplay) {
    els.invoiceGstDisplay.textContent = formatMoney(gst);
  }
  if (els.invoiceTotalDisplay) {
    els.invoiceTotalDisplay.textContent = formatMoney(subtotal + gst);
  }
  if (els.invoiceStickySubtotal) {
    els.invoiceStickySubtotal.textContent = formatMoney(subtotal);
  }
  if (els.invoiceStickyGst) {
    els.invoiceStickyGst.textContent = formatMoney(gst);
  }
  if (els.invoiceStickyTotal) {
    els.invoiceStickyTotal.textContent = formatMoney(subtotal + gst);
  }
  syncInvoiceGstNote();
  renderInvoiceDraftPreview();
}

function syncInvoiceDueDateFromTerms() {
  if (!els.invoiceIssueDateInput.value) {
    els.invoiceIssueDateInput.value = toDateInputValue(new Date().toISOString());
  }
  if (els.invoiceTermsSelect.value !== "Custom") {
    els.invoiceDueDateInput.value = calculateDueDate(els.invoiceIssueDateInput.value, els.invoiceTermsSelect.value);
  }
  syncInvoiceTermPills();
  renderInvoiceDraftPreview();
}

function syncInvoiceGstNote() {
  if (!els.invoiceGstNote) return;
  els.invoiceGstNote.textContent = currentUser?.gstMode === "GST free"
    ? "GST is off from your saved settings. Totals are staying GST-free."
    : "GST is on from your saved settings. Totals update automatically.";
}

function getInvoiceLineItems() {
  return [
    {
      description: String(els.invoiceLineDescription1.value || "").trim(),
      qty: Number(els.invoiceLineQty1.value || 0),
      rate: Number(els.invoiceLineRate1.value || 0),
      total: roundCurrency(Number(els.invoiceLineQty1.value || 0) * Number(els.invoiceLineRate1.value || 0)),
    },
    {
      description: String(els.invoiceLineDescription2.value || "").trim(),
      qty: Number(els.invoiceLineQty2.value || 0),
      rate: Number(els.invoiceLineRate2.value || 0),
      total: roundCurrency(Number(els.invoiceLineQty2.value || 0) * Number(els.invoiceLineRate2.value || 0)),
    },
  ].filter((item) => item.description || item.total > 0);
}

function calculateDueDate(issueDate, paymentTerms) {
  if (paymentTerms === "Custom") {
    return toDateInputValue(issueDate || new Date().toISOString());
  }
  const days = paymentTerms === "30 days"
    ? 30
    : paymentTerms === "14 days"
      ? 14
      : paymentTerms === "Due on receipt"
        ? 0
        : 7;
  const baseDate = new Date(`${issueDate}T12:00:00`);
  if (Number.isNaN(baseDate.getTime())) {
    return toDateInputValue(new Date().toISOString());
  }
  baseDate.setDate(baseDate.getDate() + days);
  return toDateInputValue(baseDate.toISOString());
}

function nextInvoiceNumber() {
  const maxNumber = currentUser.invoices.reduce((max, invoice) => {
    const numeric = Number(String(invoice.invoiceNumber || "").replace(/\D/g, ""));
    return Number.isFinite(numeric) ? Math.max(max, numeric) : max;
  }, 2080);
  return `${currentUser.invoicePrefix || "PDT-INV"}-${maxNumber + 1}`;
}

function openInvoicePreview(invoiceId) {
  const invoice = currentUser.invoices.find((item) => item.id === invoiceId);
  if (!invoice) return;

  selectedInvoiceId = invoiceId;
  const status = getInvoiceStatus(invoice);
  const balanceCopy = status === "Paid"
    ? "Paid in full"
    : `Amount owing ${formatMoney(invoice.amount)} due ${formatDate(invoice.dueDate)}`;

  els.invoicePreviewContent.innerHTML = `
    <div class="quote-preview-shell" id="invoicePrintArea">
      <div class="quote-preview-top">
        <div>
          <span class="status-badge ${invoiceStatusClass(status)}">${escapeHtml(status)}</span>
          <h3 id="invoicePreviewTitle">${escapeHtml(invoice.invoiceNumber)} / ${escapeHtml(invoice.job)}</h3>
          <p class="quote-preview-copy">${escapeHtml(invoice.notes)}</p>
        </div>
        <div class="quote-preview-meta">
          <div><strong>${formatMoney(invoice.amount)}</strong></div>
          <div>Issued ${formatDate(invoice.issueDate)}</div>
          <div>Due ${formatDate(invoice.dueDate)}</div>
          <div>${escapeHtml(invoice.paymentMethod)}</div>
        </div>
      </div>

      <div class="quote-breakdown-grid">
        <div class="quote-total-box">
          <span>Bill to</span>
          <strong>${escapeHtml(invoice.client)}</strong>
          <p class="quote-preview-copy">${escapeHtml(invoice.clientPhone || "No phone")}<br>${escapeHtml(invoice.clientEmail)}<br>Terms: ${escapeHtml(invoice.paymentTerms)}</p>
        </div>
        <div class="quote-total-box">
          <span>Money owed</span>
          <strong>${formatMoney(invoice.amount)}</strong>
          <p class="quote-preview-copy">${escapeHtml(balanceCopy)}</p>
        </div>
      </div>

      <div class="quote-line-table">
        <div class="quote-line-row">
          <span>Labour for ${escapeHtml(invoice.job)}</span>
          <strong>${formatMoney(invoice.labourAmount)}</strong>
        </div>
        <div class="quote-line-row">
          <span>Materials for ${escapeHtml(invoice.job)}</span>
          <strong>${formatMoney(invoice.materialsAmount)}</strong>
        </div>
        <div class="quote-line-row">
          <span>GST</span>
          <strong>${formatMoney(invoice.gst)}</strong>
        </div>
      </div>

      <p class="quote-preview-copy"><strong>Attachments:</strong> ${escapeHtml(invoice.attachmentsNote || "None added.")}</p>
    </div>
  `;
  els.invoicePreviewOverlay.classList.remove("hidden");
}

function sendInvoiceById(invoiceId) {
  const invoice = currentUser.invoices.find((item) => item.id === invoiceId);
  if (!invoice) return;

  if (invoice.status === "Pending approval") {
    showToast("Approve this invoice before sending it.");
    return;
  }

  if (invoice.status === "Approved") {
    invoice.status = getInvoiceStatus({ ...invoice, status: "Unpaid" });
  }

  if (invoice.status === "Draft") {
    invoice.status = getInvoiceStatus({ ...invoice, status: "Unpaid" });
  }

  const subject = encodeURIComponent(`${invoice.invoiceNumber} - Invoice for ${invoice.job}`);
  const body = encodeURIComponent(
    [
      `Hi ${invoice.client},`,
      "",
      `Please find ${invoice.invoiceNumber} for ${invoice.job}.`,
      `Labour: ${formatMoney(invoice.labourAmount)}`,
      `Materials: ${formatMoney(invoice.materialsAmount)}`,
      `GST: ${formatMoney(invoice.gst)}`,
      `Total inc GST: ${formatMoney(invoice.amount)}`,
      `Due date: ${formatDate(invoice.dueDate)}`,
      `Payment method: ${invoice.paymentMethod}`,
      `Payment terms: ${invoice.paymentTerms}`,
      "",
      invoice.notes,
      invoice.attachmentsNote ? `Supporting notes: ${invoice.attachmentsNote}` : "",
      "",
      "Cheers,",
      currentUser.name,
    ].filter(Boolean).join("\n")
  );

  persistCurrentUser();
  renderWorkspace();
  window.location.href = `mailto:${invoice.clientEmail}?subject=${subject}&body=${body}`;
}

function exportInvoicePdf(invoiceId) {
  const invoice = currentUser.invoices.find((item) => item.id === invoiceId);
  if (!invoice) return;

  const popup = window.open("", "_blank");
  if (!popup) {
    showToast("Your browser blocked the invoice export window. Please allow pop-ups and try again.");
    return;
  }

  const status = getInvoiceStatus(invoice);
  popup.document.write(`
    <html>
      <head>
        <title>${escapeHtml(invoice.invoiceNumber)}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #0b3d2c; }
          .top { display: flex; justify-content: space-between; gap: 24px; }
          .badge { display: inline-block; padding: 8px 12px; border-radius: 999px; background: #e6f6ec; font-size: 12px; font-weight: 700; text-transform: uppercase; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; }
          td { border: 1px solid #dce8e0; padding: 14px; }
          .total { margin-top: 24px; font-size: 28px; font-weight: 800; }
          .muted { color: #60756b; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="top">
          <div>
            <div class="badge">${escapeHtml(status)}</div>
            <h1>${escapeHtml(invoice.invoiceNumber)}</h1>
            <p class="muted">${escapeHtml(currentUser.businessName)} / ABN ${escapeHtml(currentUser.abn)}</p>
          </div>
          <div>
            <p><strong>Issue:</strong> ${formatDate(invoice.issueDate)}</p>
            <p><strong>Due:</strong> ${formatDate(invoice.dueDate)}</p>
            <p><strong>Payment:</strong> ${escapeHtml(invoice.paymentMethod)}</p>
          </div>
        </div>
        <h2>Bill to ${escapeHtml(invoice.client)}</h2>
        <p class="muted">${escapeHtml(invoice.clientEmail)}<br>${escapeHtml(invoice.clientPhone || "")}</p>
        <table>
          <tr><td>Labour - ${escapeHtml(invoice.job)}</td><td>${formatMoney(invoice.labourAmount)}</td></tr>
          <tr><td>Materials - ${escapeHtml(invoice.job)}</td><td>${formatMoney(invoice.materialsAmount)}</td></tr>
          <tr><td>GST</td><td>${formatMoney(invoice.gst)}</td></tr>
        </table>
        <div class="total">Amount owing ${formatMoney(invoice.amount)}</div>
        <p class="muted">${escapeHtml(invoice.notes)}</p>
        <p class="muted">${escapeHtml(invoice.attachmentsNote || "")}</p>
        <script>window.print();<\/script>
      </body>
    </html>
  `);
  popup.document.close();
}

function isThisMonth(value) {
  const date = new Date(value);
  const now = new Date();
  return !Number.isNaN(date.getTime())
    && date.getMonth() === now.getMonth()
    && date.getFullYear() === now.getFullYear();
}

function getVisibleExpenses() {
  const fromTime = expenseDateFromValue ? new Date(`${expenseDateFromValue}T00:00:00`).getTime() : null;
  const toTime = expenseDateToValue ? new Date(`${expenseDateToValue}T23:59:59`).getTime() : null;

  return currentUser.expenses
    .filter((expense) => {
      const expenseTime = new Date(`${expense.expenseDate}T12:00:00`).getTime();
      const searchable = [
        expense.supplier,
        expense.category,
        expense.job,
        expense.paymentSource,
        expense.notes,
        expense.claimStatus,
      ].join(" ").toLowerCase();
      const matchesSearch = !expenseSearchQuery || searchable.includes(expenseSearchQuery);
      const matchesCategory = activeExpenseCategory === "All" || expense.category === activeExpenseCategory;
      const matchesJob = activeExpenseJobId === "All" || expense.jobId === activeExpenseJobId;
      const matchesPayment = activeExpensePayment === "All" || expense.paymentSource === activeExpensePayment;
      const matchesFrom = fromTime === null || (!Number.isNaN(expenseTime) && expenseTime >= fromTime);
      const matchesTo = toTime === null || (!Number.isNaN(expenseTime) && expenseTime <= toTime);
      return matchesSearch && matchesCategory && matchesJob && matchesPayment && matchesFrom && matchesTo;
    })
    .sort((a, b) => new Date(b.expenseDate || b.createdAt) - new Date(a.expenseDate || a.createdAt));
}

function expenseClaimStatusClass(status) {
  if (status === "Claimable") return "status-paid";
  if (status === "Claimed") return "status-active";
  return "status-overdue";
}

function getExpenseReceiptThumb(expense) {
  if (!expense.receiptData) return "";
  if (String(expense.receiptData).startsWith("assets/")) return expense.receiptData;
  if (String(expense.receiptType || "").startsWith("image/") || String(expense.receiptData).startsWith("data:image/")) {
    return expense.receiptData;
  }
  return "assets/receipt-sample.jpg";
}

function applyExpenseToLinkedJob(expense) {
  const linkedJob = currentUser.jobs.find((job) => job.id === expense.jobId)
    || currentUser.archivedJobs.find((job) => job.id === expense.jobId);
  if (!linkedJob) return;

  linkedJob.materialCost = roundCurrency(Number(linkedJob.materialCost || 0) + Math.max(0, Number(expense.amount || 0) - Number(expense.gst || 0)));
  linkedJob.internalNotes = linkedJob.internalNotes
    ? `${linkedJob.internalNotes} | Expense logged: ${expense.supplier} ${formatMoney(expense.amount)}`
    : `Expense logged: ${expense.supplier} ${formatMoney(expense.amount)}`;
}

function renderPayrollQuickSummary() {
  if (!els.payrollQuickTotal) return;
  const name = String(els.payrollEmployeeForm.elements.name?.value || "").trim();
  const payType = String(els.payrollEmployeeForm.elements.payType?.value || "Hourly");
  const hours = Number(els.payrollEmployeeForm.elements.cycleHours?.value || 0);
  const rate = Number(els.payrollEmployeeForm.elements.payRate?.value || 0);
  const total = payType === "Salary" ? roundCurrency(rate / 26) : roundCurrency(hours * rate);
  els.payrollQuickWorker.textContent = name || "New worker";
  els.payrollQuickHours.textContent = hours ? String(hours) : "0";
  els.payrollQuickRate.textContent = formatMoney(rate);
  els.payrollQuickTotal.textContent = formatMoney(total);
}

function handlePayrollCopyLastWeek() {
  const latestRun = currentUser.payrollRuns[0];
  els.payrollEmployeeForm.elements.cycleHours.value = currentUser.payrollEmployees[0]?.cycleHours || 38;
  showToast(latestRun ? `Last week copied from ${formatDate(latestRun.runDate)}.` : "Using a standard 38 hour week.");
  renderPayrollQuickSummary();
}

function handlePayrollAddOvertime() {
  const currentHours = Number(els.payrollEmployeeForm.elements.cycleHours.value || 0);
  els.payrollEmployeeForm.elements.cycleHours.value = (currentHours + 4).toFixed(1).replace(/\.0$/, "");
  renderPayrollQuickSummary();
}

function handlePayrollAddAllowance() {
  const currentRate = Number(els.payrollEmployeeForm.elements.payRate.value || 0);
  els.payrollEmployeeForm.elements.payRate.value = (currentRate + 25).toFixed(2);
  renderPayrollQuickSummary();
}

function handleExpenseReceiptUpload() {
  const file = els.expenseReceiptInput.files?.[0];
  if (!file) {
    pendingExpenseReceipt = null;
    els.expenseReceiptPreviewWrap.classList.add("hidden");
    els.expenseReceiptPreviewImage.removeAttribute("src");
    els.expenseReceiptName.textContent = "No file selected";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    pendingExpenseReceipt = {
      name: file.name,
      data: String(reader.result || ""),
      type: file.type,
    };
    els.expenseReceiptName.textContent = file.name;
    els.expenseReceiptPreviewWrap.classList.remove("hidden");
    if (file.type.startsWith("image/")) {
      els.expenseReceiptPreviewImage.src = pendingExpenseReceipt.data;
    } else {
      els.expenseReceiptPreviewImage.src = "assets/receipt-sample.jpg";
    }
  };
  reader.readAsDataURL(file);
}

function handleSettingsLogoUpload() {
  const file = els.settingsLogoInput.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    pendingSettingsLogo = String(reader.result || "");
    els.settingsLogoPreview.src = pendingSettingsLogo;
    els.settingsNote.textContent = `Logo ready: ${file.name}. Save all settings to keep it.`;
  };
  reader.readAsDataURL(file);
}

function resetExpenseForm() {
  els.expenseForm.reset();
  pendingExpenseReceipt = null;
  els.expenseReceiptPreviewWrap.classList.add("hidden");
  els.expenseReceiptPreviewImage.removeAttribute("src");
  els.expenseReceiptName.textContent = "No file selected";
  setExpenseFormDefaults();
}

function setExpenseFormDefaults() {
  if (!els.expenseDateInput.value) {
    els.expenseDateInput.value = toDateInputValue(new Date().toISOString());
  }
  if (!els.expenseNotesInput.value.trim()) {
    els.expenseNotesInput.value = "Captured from site.";
  }
  if (!els.expenseCategorySelect.value) {
    els.expenseCategorySelect.value = "Materials";
  }
  recalculateExpenseGst();
}

function recalculateExpenseGst() {
  els.expenseGstInput.value = roundCurrency(Number(els.expenseAmountInput.value || 0) / 11).toFixed(2);
}

function setPayrollFormDefaults() {
  if (!els.payrollLastPayInput.value) {
    els.payrollLastPayInput.value = toDateInputValue(new Date(Date.now() - 604800000).toISOString());
  }
  renderPayrollQuickSummary();
}

function handlePayrollEmployeeSubmit(event) {
  event.preventDefault();
  if (!canAddMorePayrollStaff()) {
    showToast(`Your ${currentUser.plan} plan includes up to ${getPlanUserLimit()} workers.`);
    return;
  }
  flashSaving(els.payrollEmployeeForm, "Saving staff...");
  const data = Object.fromEntries(new FormData(els.payrollEmployeeForm));
  savePayrollEmployeePayload(buildPayrollEmployeePayload(data));
  els.payrollEmployeeForm.reset();
  setPayrollFormDefaults();
  renderWorkspace();
}

function handleQuickEmployeeSubmit(event) {
  event.preventDefault();
  if (!els.quickEmployeeForm) return;
  if (!canAddMorePayrollStaff()) {
    showToast(`Your ${currentUser.plan} plan includes up to ${getPlanUserLimit()} workers.`);
    return;
  }
  flashSaving(els.quickEmployeeForm, "Saving worker...");
  const data = Object.fromEntries(new FormData(els.quickEmployeeForm));
  const employeePayload = savePayrollEmployeePayload(buildPayrollEmployeePayload(data));
  const modalTarget = quickCreateContext?.target || "payroll";
  closeQuickEmployeeOverlay();
  renderWorkspace();
  if (modalTarget === "payroll") {
    els.payrollEmployeeForm.elements.name.value = employeePayload.name;
    els.payrollEmployeeForm.elements.role.value = employeePayload.role;
    els.payrollEmployeeForm.elements.mobile.value = employeePayload.mobile;
    els.payrollEmployeeForm.elements.email.value = employeePayload.email;
    els.payrollEmployeeForm.elements.employmentType.value = employeePayload.employmentType;
    els.payrollEmployeeForm.elements.status.value = employeePayload.status;
    els.payrollEmployeeForm.elements.payType.value = employeePayload.payType;
    els.payrollEmployeeForm.elements.payRate.value = Number(employeePayload.payRate || 0).toFixed(2);
    els.payrollEmployeeForm.elements.cycleHours.value = Number(employeePayload.cycleHours || 0);
    els.payrollEmployeeForm.elements.superDetails.value = employeePayload.superDetails;
    els.payrollEmployeeForm.elements.taxFile.value = employeePayload.taxFile;
    els.payrollEmployeeForm.elements.bankDetails.value = employeePayload.bankDetails;
    els.payrollEmployeeForm.elements.notes.value = employeePayload.notes;
    els.payrollEmployeeForm.elements.lastPayDate.value = employeePayload.lastPayDate;
    renderPayrollQuickSummary();
    showToast(`${employeePayload.name} added and loaded into payroll.`);
  }
  quickCreateContext = null;
}

function getVisiblePayrollEmployees() {
  return currentUser.payrollEmployees
    .filter((staff) => {
      const searchable = [
        staff.name,
        staff.role,
        staff.employmentType,
        staff.payType,
        staff.superDetails,
        staff.taxFile,
        staff.status,
        staff.notes,
      ].join(" ").toLowerCase();
      const matchesSearch = !payrollSearchQuery || searchable.includes(payrollSearchQuery);
      const matchesFilter = activePayrollFilter === "All"
        || staff.employmentType === activePayrollFilter
        || staff.status === activePayrollFilter;
      return matchesSearch && matchesFilter;
    });
}

function getPayrollCycleTotals() {
  return currentUser.payrollEmployees
    .filter((staff) => staff.status === "Active")
    .reduce((summary, staff) => {
      const grossPay = staff.payType === "Salary"
        ? roundCurrency(Number(staff.payRate || 0) / 26)
        : roundCurrency(Number(staff.payRate || 0) * Number(staff.cycleHours || 0));
      const superRate = staff.employmentType === "Contractor" ? 0 : 0.115;
      const superAmount = roundCurrency(grossPay * superRate);
      return {
        grossTotal: roundCurrency(summary.grossTotal + grossPay),
        superTotal: roundCurrency(summary.superTotal + superAmount),
        staffCount: summary.staffCount + 1,
      };
    }, { grossTotal: 0, superTotal: 0, staffCount: 0 });
}

function getNextPayrollRun() {
  const futureRun = [...currentUser.payrollRuns]
    .filter((run) => run.status !== "Complete")
    .sort((a, b) => new Date(a.runDate) - new Date(b.runDate))[0];
  return futureRun || {
    runDate: toDateInputValue(new Date(Date.now() + 604800000).toISOString()),
    status: "Scheduled",
  };
}

function payrollStatusClass(status) {
  if (status === "Complete") return "status-paid";
  if (status === "Due soon") return "status-overdue";
  if (status === "Inactive") return "status-draft";
  if (status === "Active") return "status-active";
  return "status-sent";
}

function getPayrollRunStatus(run) {
  if (run.status === "Complete") return "Complete";
  const runTime = new Date(`${run.runDate}T23:59:59`).getTime();
  if (!Number.isNaN(runTime) && runTime <= Date.now() + 259200000) {
    return "Due soon";
  }
  return run.status || "Scheduled";
}

function handleRunPayroll() {
  const totals = getPayrollCycleTotals();
  const nextRun = getNextPayrollRun();
  const run = {
    id: crypto.randomUUID(),
    runDate: nextRun.runDate,
    staffCount: totals.staffCount,
    grossTotal: totals.grossTotal,
    superTotal: totals.superTotal,
    status: "Scheduled",
    payslips: currentUser.payrollEmployees
      .filter((staff) => staff.status === "Active")
      .map((staff) => staff.name),
    notes: `Payroll prepared for ${formatDate(nextRun.runDate)}. Review hours and mark complete once paid.`,
  };
  currentUser.payrollRuns.unshift(run);

  const completionDate = String(nextRun.runDate);
  currentUser.payrollEmployees = currentUser.payrollEmployees.map((staff) => (
    staff.status === "Active" ? { ...staff, lastPayDate: completionDate } : staff
  ));

  persistCurrentUser();
  renderWorkspace();
  showToast(`Payroll run prepared for ${formatDate(run.runDate)}. Gross ${formatMoney(run.grossTotal)}, super ${formatMoney(run.superTotal)}.`);
}

function exportPayrollCsv() {
  if (!hasFeature("payrollExports")) {
    openPricingModal("payrollExports");
    return;
  }

  const rows = [
    ["Name", "Role", "Employment type", "Status", "Pay type", "Rate", "Cycle hours", "Cycle gross", "Super", "Last pay date"],
    ...currentUser.payrollEmployees.map((staff) => {
      const grossPay = staff.payType === "Salary"
        ? roundCurrency(Number(staff.payRate || 0) / 26)
        : roundCurrency(Number(staff.payRate || 0) * Number(staff.cycleHours || 0));
      const superAmount = staff.employmentType === "Contractor" ? 0 : roundCurrency(grossPay * 0.115);
      return [
        staff.name,
        staff.role,
        staff.employmentType,
        staff.status,
        staff.payType,
        Number(staff.payRate || 0).toFixed(2),
        Number(staff.cycleHours || 0).toFixed(1),
        grossPay.toFixed(2),
        superAmount.toFixed(2),
        staff.lastPayDate,
      ];
    }),
  ];

  downloadCsv(`payday-tradie-payroll-${toDateInputValue(new Date().toISOString())}.csv`, rows);
  showToast("Payroll export downloaded.");
}

function handlePayrollHistoryAction(event) {
  const button = event.target.closest("button[data-payroll-action]");
  if (!button) return;

  const run = currentUser.payrollRuns.find((item) => item.id === button.dataset.payrollRunId);
  if (!run) return;

  if (button.dataset.payrollAction === "complete") {
    run.status = "Complete";
  }

  if (button.dataset.payrollAction === "payslips") {
    showToast(`Payslips ready for: ${run.payslips.join(", ")}.`);
  }

  persistCurrentUser();
  renderWorkspace();
}

function renderPayroll() {
  if (!guardFeatureRender("payrollPage")) return;

  const totals = getPayrollCycleTotals();
  const nextRun = getNextPayrollRun();
  const nextRunStatus = getPayrollRunStatus(nextRun);
  const visibleStaff = getVisiblePayrollEmployees();
  const visibleRuns = currentUser.payrollRuns
    .filter((run) => !payrollHistoryFromValue || new Date(`${run.runDate}T12:00:00`) >= new Date(`${payrollHistoryFromValue}T00:00:00`))
    .sort((a, b) => new Date(b.runDate) - new Date(a.runDate));

  els.payrollNextDate.textContent = `${formatDate(nextRun.runDate)}`;
  els.payrollCycleTotal.textContent = formatMoney(totals.grossTotal);
  els.payrollSuperDue.textContent = formatMoney(totals.superTotal);
  els.payrollStaffCount.textContent = String(currentUser.payrollEmployees.length);

  els.payrollList.innerHTML = visibleStaff.length ? visibleStaff.map((staff) => {
    const grossPay = staff.payType === "Salary"
      ? roundCurrency(Number(staff.payRate || 0) / 26)
      : roundCurrency(Number(staff.payRate || 0) * Number(staff.cycleHours || 0));
    const superAmount = staff.employmentType === "Contractor" ? 0 : roundCurrency(grossPay * 0.115);
    const taxEstimate = staff.employmentType === "Contractor" ? 0 : roundCurrency(grossPay * 0.18);
    const payLabel = staff.payType === "Salary"
      ? `${formatMoney(staff.payRate)} salary`
      : `${formatMoney(staff.payRate)}/hr`;
    return `
      <article class="payroll-person-card">
        <span class="status-badge ${payrollStatusClass(staff.status)}">${escapeHtml(staff.status)}</span>
        <h4>${escapeHtml(staff.name)}</h4>
        <p class="payroll-person-meta">${escapeHtml(staff.role)} / ${escapeHtml(staff.employmentType)} / ${escapeHtml(payLabel)}</p>
        <p class="payroll-person-meta">${escapeHtml(staff.mobile)} / ${escapeHtml(staff.email)}</p>
        <div class="payroll-person-stats">
          <div><span>Worker</span><strong>${escapeHtml(staff.name)}</strong></div>
          <div><span>Hours</span><strong>${Number(staff.cycleHours || 0)}</strong></div>
          <div><span>Rate</span><strong>${payLabel}</strong></div>
          <div><span>Total</span><strong>${formatMoney(grossPay)}</strong></div>
          <div><span>Super due</span><strong>${formatMoney(superAmount)}</strong></div>
          <div><span>Tax est.</span><strong>${formatMoney(taxEstimate)}</strong></div>
          <div><span>Last pay</span><strong>${formatDate(staff.lastPayDate)}</strong></div>
          <div><span>Tax / super</span><strong>${escapeHtml(staff.employmentType === "Contractor" ? "Contractor ABN" : "PAYG + super")}</strong></div>
        </div>
        <p class="payroll-person-note"><strong>Super:</strong> ${escapeHtml(staff.superDetails)}</p>
        <p class="payroll-person-note"><strong>Tax file:</strong> ${escapeHtml(staff.taxFile)}</p>
        <p class="payroll-person-note"><strong>Bank:</strong> ${escapeHtml(staff.bankDetails)}</p>
        <p class="payroll-person-note">${escapeHtml(staff.notes)}</p>
      </article>
    `;
    }).join("") : (
      currentUser.payrollEmployees.length
        ? emptyCard("No staff match", "Adjust your search or filters to find payroll records.")
        : emptyCard(...emptyStateCopy("payroll"))
    );

  els.payrollRunCount.textContent = `${visibleRuns.length} runs`;
  els.payrollHistoryList.innerHTML = visibleRuns.length ? visibleRuns.map((run) => {
    const status = getPayrollRunStatus(run);
    return `
      <article class="record-row">
        <div>
          <span>Pay run ${formatDate(run.runDate)} / ${run.staffCount} staff</span>
          <strong>${formatMoney(run.grossTotal)} gross payroll</strong>
          <span>Super ${formatMoney(run.superTotal)} / ${escapeHtml(run.notes)}</span>
          <div class="record-actions">
            <button class="mini-action" type="button" data-payroll-action="payslips" data-payroll-run-id="${run.id}">View payslips</button>
            <button class="mini-action" type="button" data-payroll-action="complete" data-payroll-run-id="${run.id}">Mark payroll complete</button>
          </div>
        </div>
        <div class="record-right">
          <p class="record-amount">${formatMoney(run.grossTotal)}</p>
          <span class="status-badge ${payrollStatusClass(status)}">${escapeHtml(status)}</span>
        </div>
      </article>
    `;
    }).join("") : emptyCard("No payroll runs yet", "Your payroll history will appear here once you save staff and run payroll.");

  els.runPayrollButton.textContent = nextRunStatus === "Due soon" ? "Run payroll now" : "Run payroll";
}

function renderQuotes() {
  refreshExpiredQuotes();
  const visibleQuotes = getVisibleQuotes();
  els.quoteCount.textContent = `${visibleQuotes.length} quotes`;
  els.quotesList.innerHTML = visibleQuotes.length ? visibleQuotes.map((quote) => {
    const quoteStatus = getQuoteStatus(quote);
    const decisionCopy = getQuoteDecisionCopy(quoteStatus);
    const linkedJobLabel = quote.jobId
      ? (findJobById(quote.jobId)?.status || "Linked job")
      : "Not linked to a job yet";
    const jobButtonLabel = quote.jobId ? "Update job" : "Create job";
    const rowClass = quoteStatus === "Accepted" ? "record-row row-accepted" : quoteStatus === "Sent" ? "record-row row-attention" : "record-row";
    return `
      <article class="${rowClass}">
        <div>
          <span>${escapeHtml(quote.quoteNumber)} / ${escapeHtml(quote.clientName)} / ${formatDate(quote.createdAt)}</span>
          <strong>${escapeHtml(quote.jobName)}</strong>
          <span>${escapeHtml(decisionCopy)} / ${escapeHtml(linkedJobLabel)} / Valid until ${formatDate(quote.expiryDate)}</span>
          <div class="quote-line-table">
            <div class="quote-line-row">
              <span>Labour</span>
              <strong>${formatMoney(quote.labourAmount)}</strong>
            </div>
            <div class="quote-line-row">
              <span>Materials</span>
              <strong>${formatMoney(quote.materialAmount)}</strong>
            </div>
            <div class="quote-line-row">
              <span>GST</span>
              <strong>${formatMoney(quote.gst)}</strong>
            </div>
          </div>
          <span>${escapeHtml(quote.notes || "No exclusions listed.")}</span>
          <div class="record-actions">
            <button class="mini-action" type="button" data-quote-action="preview" data-quote-id="${quote.id}">Preview</button>
            <button class="mini-action" type="button" data-quote-action="send" data-quote-id="${quote.id}">Send quote</button>
            <button class="mini-action" type="button" data-quote-action="accept" data-quote-id="${quote.id}">Mark accepted</button>
            <button class="mini-action" type="button" data-quote-action="reject" data-quote-id="${quote.id}">Mark rejected</button>
            ${quoteStatus === "Accepted" ? `<button class="mini-action" type="button" data-quote-action="job" data-quote-id="${quote.id}">${jobButtonLabel}</button>` : ""}
            ${quoteStatus === "Accepted" ? `<button class="mini-action" type="button" data-quote-action="invoice" data-quote-id="${quote.id}">Convert to invoice</button>` : ""}
          </div>
        </div>
        <div class="record-right">
          <p class="record-amount">${formatMoney(quote.total)}</p>
          <span class="status-badge ${quoteStatusClass(quoteStatus)}">${escapeHtml(getQuoteBadgeLabel(quoteStatus))}</span>
        </div>
      </article>
    `;
    }).join("") : (
      currentUser.quotes.length
        ? emptyCard("No matching quotes", "Save a quote draft or loosen the search and status filters.")
        : emptyCard(...emptyStateCopy("quotes"))
    );
}

function renderJobs() {
  const visibleJobs = getVisibleJobs();
  els.jobCount.textContent = `${visibleJobs.length} jobs`;
  els.jobsList.innerHTML = visibleJobs.length ? visibleJobs.map((job) => {
    const profit = job.quoteAmount - job.labourCost - job.materialCost;
    const marginLabel = profit >= 0 ? `Estimated margin ${formatMoney(profit)}` : `Underquoted by ${formatMoney(Math.abs(profit))}`;
    const statusLabel = job.recurring === "One-off" ? job.status : `${job.status} / ${job.recurring}`;
    const badgeClass = job.status === "Completed" ? "status-paid" : job.status === "Upcoming" ? "status-draft" : "status-active";
    const rowClass = profit < 0 ? "record-row row-margin-risk" : "record-row";
    const marginChipClass = profit < 0 ? "client-chip chip-warning" : "client-chip";

    return `
      <article class="${rowClass}">
        <div>
          <span>${escapeHtml(job.clientName)} / ${escapeHtml(job.suburb)} / ${escapeHtml(job.assignee)}</span>
          <strong>${escapeHtml(job.name)}</strong>
          <span>${formatSchedule(job.scheduledAt)} / ${escapeHtml(statusLabel)}</span>
          <div class="expense-meta-row">
            <span class="${marginChipClass}">${escapeHtml(marginLabel)}</span>
            <span class="client-chip">Materials ${formatMoney(job.materialCost)}</span>
            <span class="client-chip">Labour ${formatMoney(job.labourCost)}</span>
            <span class="client-chip">Quote ${escapeHtml(job.quoteStatus)}</span>
            <span class="client-chip">Invoice ${escapeHtml(job.invoiceStatus)}</span>
          </div>
          <div class="record-actions">
            <button class="mini-action" type="button" data-action="quote" data-job-id="${job.id}">Convert to quote</button>
            <button class="mini-action" type="button" data-action="complete" data-job-id="${job.id}">Mark complete</button>
            <button class="mini-action" type="button" data-action="invoice" data-job-id="${job.id}">Convert to invoice</button>
            <button class="mini-action" type="button" data-action="archive" data-job-id="${job.id}">Archive</button>
          </div>
          <details class="record-details">
            <summary>View job details</summary>
            <div class="detail-grid">
              <div><b>Phone:</b> ${escapeHtml(job.clientPhone)}</div>
              <div><b>Email:</b> ${escapeHtml(job.clientEmail)}</div>
              <div><b>Address:</b> ${escapeHtml(job.address)}</div>
              <div><b>Recurring:</b> ${escapeHtml(job.recurring)}</div>
              <div><b>Materials est:</b> ${formatMoney(job.materialCost)}</div>
              <div><b>Labour est:</b> ${formatMoney(job.labourCost)}</div>
              <div><b>Description:</b> ${escapeHtml(job.description)}</div>
              <div><b>Notes:</b> ${escapeHtml(job.internalNotes || "No crew notes saved.")}</div>
            </div>
          </details>
        </div>
        <div class="record-right">
          <p class="record-amount">${formatMoney(job.quoteAmount)}</p>
          <span class="status-badge ${badgeClass}">${escapeHtml(job.status)}</span>
        </div>
      </article>
    `;
    }).join("") : (
      (currentUser.jobs.length || currentUser.archivedJobs.length)
        ? emptyCard("No jobs in this view", "Change the current filters or search to see scheduled or archived work.")
        : emptyCard(...emptyStateCopy("jobs"))
    );
}

function renderTeamJobBoard() {
  if (!els.teamJobBoard || !els.teamJobBoardCount || !els.teamJobBoardCard) return;

  const canUseTeamBoard = hasFeature("teamJobBoard");
  const liveJobs = currentUser.jobs.filter((job) => ["Upcoming", "Active", "Completed"].includes(job.status));
  const groupedJobs = liveJobs.reduce((map, job) => {
    const assignee = job.assignee || "Unassigned";
    if (!map.has(assignee)) {
      map.set(assignee, []);
    }
    map.get(assignee).push(job);
    return map;
  }, new Map());

  els.teamJobBoardCard.classList.toggle("is-plan-locked", !canUseTeamBoard);
  setLockedPrompt(els.teamJobBoardLockedPrompt, {
    eyebrow: "Crew feature",
    title: "Team job board is available on Crew plan",
    copy: "See assigned jobs, next calls, and margin pressure across your crew in one place.",
    feature: "teamJobBoard",
    buttonLabel: "Upgrade plan",
  }, !canUseTeamBoard);

  if (!canUseTeamBoard) {
    els.teamJobBoardCount.textContent = "Crew feature";
    els.teamJobBoard.innerHTML = emptyCard("Unlock crew visibility", "Upgrade to Crew to see jobs grouped by worker, with next actions and margin risk.");
    return;
  }

  const groups = [...groupedJobs.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([assignee, jobs]) => {
      const sortedJobs = [...jobs].sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));
      const nextJob = sortedJobs[0];
      const marginRisk = jobs.filter((job) => getJobEstimatedProfit(job) < 0).length;
      const overdueInvoices = currentUser.invoices.filter((invoice) => {
        const invoiceJob = invoice.jobId || "";
        return jobs.some((job) => job.id === invoiceJob) && getInvoiceStatus(invoice) === "Overdue";
      }).length;
      return { assignee, jobs, nextJob, marginRisk, overdueInvoices };
    });

  els.teamJobBoardCount.textContent = `${groups.length} worker${groups.length === 1 ? "" : "s"}`;
  els.teamJobBoard.innerHTML = groups.length ? groups.map((group) => `
    <article class="record-row">
      <div>
        <span>${escapeHtml(group.assignee)} / ${group.jobs.length} active job${group.jobs.length === 1 ? "" : "s"}</span>
        <strong>${escapeHtml(group.nextJob?.name || "No upcoming job")}</strong>
        <span>${group.nextJob ? `${formatSchedule(group.nextJob.scheduledAt)} / ${escapeHtml(group.nextJob.clientName)}` : "No scheduled work yet"}</span>
        <div class="expense-meta-row">
          <span class="client-chip">${group.marginRisk ? `${group.marginRisk} margin risk` : "Margin holding"}</span>
          <span class="client-chip">${group.overdueInvoices ? `${group.overdueInvoices} overdue invoice${group.overdueInvoices === 1 ? "" : "s"}` : "No overdue invoices"}</span>
        </div>
      </div>
      <div class="record-right">
        <p class="record-amount">${formatMoney(group.jobs.reduce((sum, job) => sum + Number(job.quoteAmount || 0), 0))}</p>
        <span class="status-badge ${group.marginRisk ? "status-overdue" : "status-active"}">${group.marginRisk ? "Needs watching" : "On track"}</span>
      </div>
    </article>
  `).join("") : emptyCard("No crew work yet", "Assign jobs to workers and the team board will group the load automatically.");
}

function renderInvoices() {
  refreshOverdueInvoices();
  const visibleInvoices = getVisibleInvoices();
  const totalUnpaid = currentUser.invoices
    .filter((invoice) => ["Unpaid", "Overdue"].includes(getInvoiceStatus(invoice)))
    .reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const overdueAmount = currentUser.invoices
    .filter((invoice) => getInvoiceStatus(invoice) === "Overdue")
    .reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const paidThisMonth = currentUser.invoices
    .filter((invoice) => invoice.status === "Paid" && isThisMonth(invoice.paidAt || invoice.issueDate || invoice.createdAt))
    .reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);

  els.invoiceSummaryUnpaid.textContent = formatMoney(totalUnpaid);
  els.invoiceSummaryOverdue.textContent = formatMoney(overdueAmount);
  els.invoiceSummaryPaid.textContent = formatMoney(paidThisMonth);
  els.invoiceCount.textContent = `${visibleInvoices.length} invoices`;
  els.invoicesList.innerHTML = visibleInvoices.length ? visibleInvoices.map((invoice) => {
    const status = getInvoiceStatus(invoice);
    const isOverdue = status === "Overdue";
    const canSendReminder = hasFeature("overdueReminders");
    const approvalState = getInvoiceApprovalState(invoice);
    const overdueDays = isOverdue ? getDaysOverdue(invoice.dueDate) : 0;
    const rowClass = isOverdue ? "record-row row-overdue" : status === "Unpaid" ? "record-row row-attention" : "record-row";
    const paymentCopy = status === "Paid"
      ? `Paid via ${invoice.paymentMethod}`
      : status === "Draft"
        ? "Draft waiting to send"
        : status === "Pending approval"
          ? "Waiting for approval before sending"
          : status === "Approved"
            ? `Approved${invoice.approvedBy ? ` by ${invoice.approvedBy}` : ""}`
            : isOverdue
              ? `${overdueDays} day${overdueDays === 1 ? "" : "s"} overdue`
              : `Due ${formatDate(invoice.dueDate)}`;
    const reminderCopy = invoice.lastReminderAt
      ? `Reminder sent ${formatDate(invoice.lastReminderAt)}${invoice.reminderCount ? ` (${invoice.reminderCount})` : ""}`
      : "";
    const approvalChip = invoice.approvalRequired
      ? `<span class="client-chip">${escapeHtml(approvalState)}</span>`
      : "";
    const sendLabel = status === "Approved" ? "Send approved invoice" : "Send invoice";
    const reminderButton = canSendReminder
      ? `<button class="mini-action" type="button" data-invoice-action="remind" data-invoice-id="${invoice.id}">${isOverdue ? "Send overdue reminder" : "Send reminder"}</button>`
      : "";
    const approveButton = status === "Pending approval" && hasFeature("invoiceApprovalControls")
      ? `<button class="mini-action" type="button" data-invoice-action="approve" data-invoice-id="${invoice.id}">Approve invoice</button>`
      : "";
    return `
      <article class="${rowClass}">
        <div>
          <span>${escapeHtml(invoice.invoiceNumber)} / ${escapeHtml(invoice.client)} / ${escapeHtml(invoice.paymentMethod)}</span>
          <strong>${escapeHtml(invoice.job)}</strong>
          <span>${escapeHtml(paymentCopy)} / Issued ${formatDate(invoice.issueDate)} / GST ${formatMoney(invoice.gst)}</span>
          <div class="expense-meta-row">
            <span class="client-chip chip-materials">Materials ${formatMoney(invoice.materialsAmount)}</span>
            <span class="client-chip chip-fuel">Labour ${formatMoney(invoice.labourAmount)}</span>
            ${approvalChip}
          </div>
          ${isOverdue ? `<span class="invoice-reminder-chip">Chase payment today</span>` : ""}
          ${reminderCopy ? `<span class="invoice-reminder-chip invoice-reminder-chip-muted">${escapeHtml(reminderCopy)}</span>` : ""}
          <div class="record-actions">
            <button class="mini-action" type="button" data-invoice-action="preview" data-invoice-id="${invoice.id}">Preview</button>
            <button class="mini-action" type="button" data-invoice-action="send" data-invoice-id="${invoice.id}">${sendLabel}</button>
            <button class="mini-action" type="button" data-invoice-action="export" data-invoice-id="${invoice.id}">Export PDF</button>
            <button class="mini-action" type="button" data-invoice-action="paid" data-invoice-id="${invoice.id}">Mark paid</button>
            ${approveButton}
            ${reminderButton}
          </div>
        </div>
        <div class="record-right">
          <p class="record-amount">${formatMoney(invoice.amount)}</p>
        <span class="status-badge ${invoiceStatusClass(status)}">${escapeHtml(getInvoiceBadgeLabel(status))}</span>
      </div>
    </article>
    `;
    }).join("") : (
      currentUser.invoices.length
        ? emptyCard("No matching invoices", "Create an invoice, pull one from a completed job, or broaden the filters.")
        : emptyCard(...emptyStateCopy("invoices"))
    );
}

function renderExpenses() {
  const visibleExpenses = getVisibleExpenses();
  const totalThisMonth = currentUser.expenses
    .filter((expense) => isThisMonth(expense.expenseDate || expense.createdAt))
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const materialsSpend = currentUser.expenses
    .filter((expense) => expense.category === "Materials")
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const fuelSpend = currentUser.expenses
    .filter((expense) => expense.category === "Fuel")
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const uncategorisedCount = currentUser.expenses.filter((expense) => expense.category === "Other").length;

  els.expenseSummaryMonth.textContent = formatMoney(totalThisMonth);
  els.expenseSummaryMaterials.textContent = formatMoney(materialsSpend);
  els.expenseSummaryFuel.textContent = formatMoney(fuelSpend);
  els.expenseSummaryUncategorised.textContent = String(uncategorisedCount);
  els.expenseCount.textContent = `${visibleExpenses.length} expenses`;
  els.expensesList.innerHTML = visibleExpenses.length ? visibleExpenses.map((expense) => {
    const isFuelOrMaterials = ["Fuel", "Materials"].includes(expense.category);
    const rowClass = isFuelOrMaterials ? "record-row row-cost-focus" : "record-row";
    const deductibleLabel = ["Materials", "Fuel", "Labour", "Equipment"].includes(expense.category) ? "Tax deductible" : "Check deduction";
    const gstLabel = Number(expense.gst || 0) > 0 ? "GST claimable" : "No GST claim";
    return `
    <article class="${rowClass}">
      <div>
        <span>${formatDate(expense.expenseDate || expense.createdAt)} / ${escapeHtml(expense.category)} / ${escapeHtml(expense.paymentSource)}</span>
        <strong>${escapeHtml(expense.supplier)}</strong>
        <span>${escapeHtml(expense.job)} / GST ${formatMoney(expense.gst)} / Receipt ${expense.receiptData ? "saved" : "missing"}</span>
        <p class="quote-preview-copy">${escapeHtml(expense.notes || "No expense notes saved.")}</p>
        <div class="expense-meta-row">
          <span class="client-chip ${expense.category === "Fuel" ? "chip-fuel" : expense.category === "Materials" ? "chip-materials" : ""}">${escapeHtml(expense.category)}</span>
          <span class="client-chip">${escapeHtml(expense.paymentSource)}</span>
          <span class="client-chip">${expense.jobId ? "Job cost tracked" : "General spend"}</span>
          <span class="client-chip">${deductibleLabel}</span>
          <span class="client-chip">${gstLabel}</span>
        </div>
      </div>
      <div class="record-right">
        ${expense.receiptData ? `<img class="expense-thumb" src="${escapeHtml(getExpenseReceiptThumb(expense))}" alt="Receipt for ${escapeHtml(expense.supplier)}">` : ""}
        <p class="record-amount">${formatMoney(expense.amount)}</p>
        <span class="status-badge ${expenseClaimStatusClass(expense.claimStatus)}">${escapeHtml(expense.claimStatus)}</span>
      </div>
    </article>
  `;
    }).join("") : (
      currentUser.expenses.length
        ? emptyCard("No matching expenses", "Adjust the supplier, category, date, job, and payment filters.")
        : emptyCard(...emptyStateCopy("expenses"))
    );
}

function renderArchive() {
  const archivedJobs = currentUser.archivedJobs.filter((job) => matchesJobSearch(job, archiveSearchQuery));
  els.archiveCount.textContent = `${archivedJobs.length} archived`;
  els.archiveList.innerHTML = archivedJobs.length
    ? archivedJobs.map((job) => `
      <article class="record-row">
        <div>
          <span>${escapeHtml(job.clientName)} / ${escapeHtml(job.suburb)} / ${formatSchedule(job.scheduledAt)}</span>
          <strong>${escapeHtml(job.name)}</strong>
          <span>Quote: ${escapeHtml(job.quoteStatus)} / Invoice: ${escapeHtml(job.invoiceStatus)}</span>
          <details class="record-details">
            <summary>View job history</summary>
            <div class="detail-grid">
              <div><b>Completed:</b> ${formatDate(job.archivedAt || job.createdAt)}</div>
              <div><b>Team:</b> ${escapeHtml(job.assignee)}</div>
              <div><b>Address:</b> ${escapeHtml(job.address)}</div>
              <div><b>Notes:</b> ${escapeHtml(job.internalNotes || "No archive notes saved.")}</div>
              <div><b>Linked quote:</b> ${escapeHtml(job.quoteStatus)}</div>
              <div><b>Linked invoice:</b> ${escapeHtml(job.invoiceStatus)}</div>
            </div>
          </details>
        </div>
        <div class="record-right">
          <p class="record-amount">${formatMoney(job.quoteAmount)}</p>
          <span class="status-badge status-paid">Archived</span>
        </div>
      </article>
    `).join("")
    : emptyCard("No archived jobs", "Completed jobs move here so the live job list stays clean.");
}

function getReportData() {
  const fromTime = reportDateRange === "all" ? null : Date.now() - Number(reportDateRange) * 86400000;
  const jobs = [...currentUser.jobs, ...currentUser.archivedJobs].filter((job) => {
    const jobTime = new Date(job.createdAt || job.scheduledAt).getTime();
    const matchesDate = fromTime === null || (!Number.isNaN(jobTime) && jobTime >= fromTime);
    const matchesJob = reportJobFilterValue === "All" || job.id === reportJobFilterValue;
    const matchesClient = reportClientFilterValue === "All" || job.clientId === reportClientFilterValue;
    const matchesTeam = reportTeamFilterValue === "All" || job.assignee === reportTeamFilterValue;
    return matchesDate && matchesJob && matchesClient && matchesTeam;
  });

  const expenses = currentUser.expenses.filter((expense) => {
    const expenseTime = new Date(`${expense.expenseDate || toDateInputValue(expense.createdAt)}T12:00:00`).getTime();
    const matchesDate = fromTime === null || (!Number.isNaN(expenseTime) && expenseTime >= fromTime);
    const matchesJob = reportJobFilterValue === "All" || expense.jobId === reportJobFilterValue;
    const job = findJobById(expense.jobId);
    const matchesClient = reportClientFilterValue === "All" || job?.clientId === reportClientFilterValue;
    const matchesCategory = reportCategoryFilterValue === "All" || expense.category === reportCategoryFilterValue;
    const matchesTeam = reportTeamFilterValue === "All" || job?.assignee === reportTeamFilterValue;
    return matchesDate && matchesJob && matchesClient && matchesCategory && matchesTeam;
  });

  const invoices = currentUser.invoices.filter((invoice) => {
    const invoiceTime = new Date(`${invoice.issueDate || toDateInputValue(invoice.createdAt)}T12:00:00`).getTime();
    const matchesDate = fromTime === null || (!Number.isNaN(invoiceTime) && invoiceTime >= fromTime);
    const matchesJob = reportJobFilterValue === "All" || invoice.jobId === reportJobFilterValue;
    const matchesClient = reportClientFilterValue === "All" || invoice.clientId === reportClientFilterValue;
    const job = findJobById(invoice.jobId);
    const matchesTeam = reportTeamFilterValue === "All" || job?.assignee === reportTeamFilterValue;
    return matchesDate && matchesJob && matchesClient && matchesTeam;
  });

  const payrollRuns = currentUser.payrollRuns.filter((run) => {
    const runTime = new Date(`${run.runDate}T12:00:00`).getTime();
    const matchesDate = fromTime === null || (!Number.isNaN(runTime) && runTime >= fromTime);
    const matchesCategory = reportCategoryFilterValue === "All" || reportCategoryFilterValue === "Payroll";
    const matchesTeam = reportTeamFilterValue === "All" || run.payslips.includes(reportTeamFilterValue);
    const matchesJobAndClient = reportJobFilterValue === "All" && reportClientFilterValue === "All";
    return matchesDate && matchesCategory && matchesTeam && matchesJobAndClient;
  });

  return { jobs, expenses, invoices, payrollRuns };
}

function buildExpenseBreakdown(expenses, payrollRuns) {
  const breakdown = {
    Materials: 0,
    Fuel: 0,
    Labour: 0,
    Equipment: 0,
    Payroll: payrollRuns.reduce((sum, run) => sum + Number(run.grossTotal || 0) + Number(run.superTotal || 0), 0),
    Other: 0,
  };

  expenses.forEach((expense) => {
    const category = normaliseExpenseCategory(expense.category);
    if (category === "Materials") breakdown.Materials += Number(expense.amount || 0);
    else if (category === "Fuel") breakdown.Fuel += Number(expense.amount || 0);
    else if (category === "Labour") breakdown.Labour += Number(expense.amount || 0);
    else if (category === "Equipment") breakdown.Equipment += Number(expense.amount || 0);
    else breakdown.Other += Number(expense.amount || 0);
  });

  return breakdown;
}

function getAveragePaymentDays(invoices) {
  const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid" && invoice.paidAt);
  if (!paidInvoices.length) return 0;
  const totalDays = paidInvoices.reduce((sum, invoice) => {
    const issueTime = new Date(`${invoice.issueDate}T12:00:00`).getTime();
    const paidTime = new Date(invoice.paidAt).getTime();
    if (Number.isNaN(issueTime) || Number.isNaN(paidTime)) return sum;
    return sum + Math.max(0, Math.round((paidTime - issueTime) / 86400000));
  }, 0);
  return Math.round(totalDays / paidInvoices.length);
}

function renderReportBars(targetEl, rows) {
  const maxValue = Math.max(...rows.map((row) => row.value), 1);
  targetEl.innerHTML = rows.map((row) => {
    const width = Math.max(8, Math.round((row.value / maxValue) * 100));
    return `
      <div class="report-bar-row">
        <div class="report-bar-top">
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(row.displayValue)}</strong>
        </div>
        <div class="report-bar-track">
          <div class="report-bar-fill ${row.tone || ""}" style="width: ${width}%"></div>
        </div>
        <p class="report-panel-copy">${escapeHtml(row.copy)}</p>
      </div>
    `;
  }).join("");
}

function renderReports() {
  if (!guardFeatureRender("businessReporting")) return;

  if (
    currentUser.jobs.length === 0
    && currentUser.archivedJobs.length === 0
    && currentUser.invoices.length === 0
    && currentUser.expenses.length === 0
    && currentUser.payrollRuns.length === 0
  ) {
    if (els.reportMainInsight) {
      els.reportMainInsight.innerHTML = `
        <span>Reports</span>
        <strong>Nothing to report yet</strong>
        <p>Create jobs, send invoices, and log expenses to start building your business view.</p>
      `;
    }
    if (els.reportSecondaryInsight) {
      els.reportSecondaryInsight.innerHTML = `
        <span>When this fills up</span>
        <strong>Jobs, invoices, expenses, payroll</strong>
        <p>This page will start showing profit, unpaid money, and business totals once real data exists.</p>
      `;
    }
    els.reportsGrid.innerHTML = `
      <article class="report-tile">
        <span>Profit estimate</span>
        <strong>Waiting for data</strong>
        <p>Reports appear once jobs and invoices exist.</p>
      </article>
      <article class="report-tile">
        <span>Cash flow</span>
        <strong>Waiting for data</strong>
        <p>As soon as money starts moving, this view will show what is coming in and going out.</p>
      </article>
    `;
    els.reportActiveJobsCompare.innerHTML = emptyCard(...emptyStateCopy("reports"));
    els.reportProfitJobs.innerHTML = emptyCard(...emptyStateCopy("reports"));
    els.reportCashFlowBars.innerHTML = emptyCard(...emptyStateCopy("reports"));
    els.reportExpenseBreakdown.innerHTML = emptyCard(...emptyStateCopy("reports"));
    els.reportInvoicePerformance.innerHTML = emptyCard(...emptyStateCopy("reports"));
    return;
  }

  const reportData = getReportData();
  const totalRevenue = reportData.invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const unpaidAmount = reportData.invoices
    .filter((invoice) => ["Unpaid", "Overdue"].includes(getInvoiceStatus(invoice)))
    .reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const totalExpenseSpend = reportData.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const payrollSpend = reportData.payrollRuns.reduce((sum, run) => sum + Number(run.grossTotal || 0) + Number(run.superTotal || 0), 0);
  const totalExpenses = totalExpenseSpend + payrollSpend;
  const profitEstimate = totalRevenue - totalExpenses;
  const gstCollected = reportData.invoices.reduce((sum, invoice) => sum + Number(invoice.gst || 0), 0);
  const gstPaid = reportData.expenses.reduce((sum, expense) => sum + Number(expense.gst || 0), 0);
  const taxEstimate = Math.max(0, gstCollected - gstPaid + totalRevenue * currentUser.taxVaultRate);
  const avgPaymentDays = getAveragePaymentDays(reportData.invoices);
  const paidOnTime = reportData.invoices.filter((invoice) => invoice.status === "Paid" && new Date(invoice.paidAt || invoice.dueDate) <= new Date(`${invoice.dueDate}T23:59:59`)).length;
  const overdueCount = reportData.invoices.filter((invoice) => getInvoiceStatus(invoice) === "Overdue").length;
  const topJob = [...reportData.jobs].sort((a, b) => (b.quoteAmount - b.materialCost - b.labourCost) - (a.quoteAmount - a.materialCost - a.labourCost))[0];
  const marginWarningJob = [...reportData.jobs].sort((a, b) => (a.quoteAmount - a.materialCost - a.labourCost) - (b.quoteAmount - b.materialCost - b.labourCost))[0];

  if (els.reportMainInsight) {
    els.reportMainInsight.innerHTML = `
        <span>Profit this month</span>
        <strong>${formatMoney(profitEstimate)}</strong>
        <p>${profitEstimate >= 0 ? "You're still ahead after costs in this view." : "This slice is slipping under and needs attention."}</p>
      `;
  }

  if (els.reportSecondaryInsight) {
    els.reportSecondaryInsight.innerHTML = unpaidAmount > 0
      ? `
        <span>Unpaid money</span>
        <strong>${formatMoney(unpaidAmount)}</strong>
        <p>${overdueCount} overdue invoice${overdueCount === 1 ? "" : "s"} still need chasing in this view.</p>
      `
      : `
        <span>Unpaid money</span>
        <strong>Nothing outstanding</strong>
        <p>Paid money is landing cleanly in this slice.</p>
      `;
  }

  els.reportsGrid.innerHTML = `
      <article class="report-tile">
        <span>Total revenue</span>
        <strong>${formatMoney(totalRevenue)}</strong>
      <p>Paid invoices in the selected range and filters.</p>
    </article>
    <article class="report-tile">
      <span>Total expenses</span>
      <strong>${formatMoney(totalExpenses)}</strong>
      <p>Expenses plus payroll runs in the selected period.</p>
    </article>
    <article class="report-tile">
      <span>Profit estimate</span>
      <strong>${formatMoney(profitEstimate)}</strong>
      <p>${profitEstimate >= 0 ? "You are in the green on this slice." : "This slice is running under quoted margin."}</p>
    </article>
    <article class="report-tile">
      <span>GST / tax estimate</span>
      <strong>${formatMoney(taxEstimate)}</strong>
      <p>GST collected less GST on spend, plus tax vault buffer on paid revenue.</p>
    </article>
    <article class="report-tile">
      <span>Unpaid invoices</span>
      <strong>${formatMoney(unpaidAmount)}</strong>
      <p>Money still owed on open or overdue invoices.</p>
    </article>
    <article class="report-tile">
      <span>Best job</span>
      <strong>${escapeHtml(topJob ? topJob.name : "No matching jobs")}</strong>
      <p>${topJob ? `${escapeHtml(topJob.clientName)} margin ${formatMoney(topJob.quoteAmount - topJob.materialCost - topJob.labourCost)}.` : "Adjust filters to see a job result."}</p>
      </article>
    `;

  const activeJobs = reportData.jobs.filter((job) => currentUser.jobs.some((liveJob) => liveJob.id === job.id));
  if (els.reportActiveJobsCompare) {
    els.reportActiveJobsCompare.innerHTML = activeJobs.length
      ? activeJobs
        .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
        .map((job) => {
          const { totalSpend, profit } = getJobSpendSummary(job);
          const linkedInvoices = reportData.invoices.filter((invoice) => invoice.jobId === job.id);
          const unpaidLinked = linkedInvoices.filter((invoice) => ["Unpaid", "Overdue"].includes(getInvoiceStatus(invoice)));
          const approvalPending = linkedInvoices.some((invoice) => getInvoiceStatus(invoice) === "Pending approval");
          return `
            <article class="record-row">
              <div>
                <span>${escapeHtml(job.assignee)} / ${escapeHtml(job.status)} / ${formatSchedule(job.scheduledAt)}</span>
                <strong>${escapeHtml(job.name)}</strong>
                <span>${escapeHtml(job.clientName)} / Quote ${formatMoney(job.quoteAmount)} / Spend ${formatMoney(totalSpend)} / Profit ${formatMoney(profit)}</span>
                <div class="expense-meta-row">
                  <span class="client-chip">${unpaidLinked.length ? `${unpaidLinked.length} unpaid invoice${unpaidLinked.length === 1 ? "" : "s"}` : "Invoices clear"}</span>
                  <span class="client-chip">${approvalPending ? "Approval pending" : "No approval hold"}</span>
                </div>
              </div>
              <div class="record-right">
                <p class="record-amount">${formatMoney(profit)}</p>
                <span class="status-badge ${profit >= 0 ? "status-profit" : "status-loss"}">${profit >= 0 ? "On margin" : "Underquoted"}</span>
              </div>
            </article>
          `;
        }).join("")
      : emptyCard("No active jobs in this view", "Adjust the filters to compare live jobs side by side.");
  }

  els.reportProfitJobs.innerHTML = reportData.jobs.length ? reportData.jobs
    .sort((a, b) => (b.quoteAmount - b.materialCost - b.labourCost) - (a.quoteAmount - a.materialCost - a.labourCost))
    .map((job) => {
      const jobExpenses = reportData.expenses
        .filter((expense) => expense.jobId === job.id)
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
      const totalJobSpend = Number(job.materialCost || 0) + Number(job.labourCost || 0) + jobExpenses;
      const profit = Number(job.quoteAmount || 0) - totalJobSpend;
      const badgeClass = profit >= 0 ? "status-profit" : "status-loss";
      const badgeLabel = profit >= 0 ? "Profitable" : "Underquoted";
      return `
        <article class="record-row">
          <div>
            <span>${escapeHtml(job.clientName)} / ${escapeHtml(job.assignee)} / ${escapeHtml(job.status)}</span>
            <strong>${escapeHtml(job.name)}</strong>
            <span>Revenue ${formatMoney(job.quoteAmount)} / Expenses ${formatMoney(totalJobSpend)} / Profit ${formatMoney(profit)}</span>
          </div>
          <div class="record-right">
            <p class="record-amount">${formatMoney(profit)}</p>
            <span class="status-badge ${badgeClass}">${badgeLabel}</span>
          </div>
        </article>
      `;
    }).join("")
    : emptyCard("No job results", "Adjust the filters to see which jobs made money and which ones ran tight.");

  renderReportBars(els.reportCashFlowBars, [
    {
      label: "Money in",
      value: totalRevenue,
      displayValue: formatMoney(totalRevenue),
      copy: "Paid invoices received in this period.",
      tone: "",
    },
    {
      label: "Money out",
      value: totalExpenses,
      displayValue: formatMoney(totalExpenses),
      copy: "Expenses plus payroll paid or scheduled in this period.",
      tone: totalExpenses > totalRevenue ? "is-warning" : "",
    },
    {
      label: "Unpaid amounts",
      value: unpaidAmount,
      displayValue: formatMoney(unpaidAmount),
      copy: "Cash not in the bank yet.",
      tone: unpaidAmount > 0 ? "is-warning" : "",
    },
    {
      label: "Tax estimate",
      value: taxEstimate,
      displayValue: formatMoney(taxEstimate),
      copy: "Quick BAS/tax buffer estimate based on current data.",
      tone: taxEstimate > totalRevenue * 0.2 ? "is-danger" : "",
    },
  ]);

  const breakdown = buildExpenseBreakdown(reportData.expenses, reportData.payrollRuns);
  const categoryRows = Object.entries(breakdown)
    .filter(([category]) => reportCategoryFilterValue === "All" || category === reportCategoryFilterValue)
    .map(([category, value]) => ({
      label: category,
      value,
      displayValue: formatMoney(value),
      copy: category === "Payroll"
        ? "Wages and super from payroll runs."
        : `Total ${category.toLowerCase()} spend in this slice.`,
      tone: category === "Payroll" ? "is-warning" : "",
    }));
  renderReportBars(els.reportExpenseBreakdown, categoryRows.length ? categoryRows : [{
    label: "No category data",
    value: 1,
    displayValue: "$0",
    copy: "No matching expenses in this filter set.",
    tone: "",
  }]);

  els.reportInvoicePerformance.innerHTML = `
    <article class="record-row">
      <div><span>Invoices paid by due date</span><strong>${paidOnTime} invoice${paidOnTime === 1 ? "" : "s"}</strong></div>
      <div class="record-right"><span class="status-badge status-paid">On time</span></div>
    </article>
    <article class="record-row">
      <div><span>Overdue invoices</span><strong>${overdueCount} invoice${overdueCount === 1 ? "" : "s"}</strong></div>
      <div class="record-right"><span class="status-badge ${overdueCount ? "status-overdue" : "status-paid"}">${overdueCount ? "Chase now" : "Clear"}</span></div>
    </article>
    <article class="record-row">
      <div><span>Outstanding balance</span><strong>${formatMoney(unpaidAmount)}</strong></div>
      <div class="record-right"><span class="status-badge ${unpaidAmount ? "status-unpaid" : "status-paid"}">${unpaidAmount ? "Owing" : "Paid up"}</span></div>
    </article>
    <article class="record-row">
      <div><span>Average payment time</span><strong>${avgPaymentDays} day${avgPaymentDays === 1 ? "" : "s"}</strong></div>
      <div class="record-right"><span class="status-badge ${avgPaymentDays > 14 ? "status-overdue" : "status-active"}">${avgPaymentDays > 14 ? "Slow" : "Healthy"}</span></div>
    </article>
  `;
}

function exportReportsSummary() {
  const reportData = getReportData();
  const grossRevenue = reportData.invoices.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const expenseTotal = reportData.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const payrollTotal = reportData.payrollRuns.reduce((sum, run) => sum + Number(run.grossTotal || 0) + Number(run.superTotal || 0), 0);
  const outstanding = reportData.invoices.filter((invoice) => ["Unpaid", "Overdue"].includes(getInvoiceStatus(invoice))).reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const popup = window.open("", "_blank");
  if (!popup) {
    showToast("Your browser blocked the report export window. Please allow pop-ups and try again.");
    return;
  }

  popup.document.write(`
    <html>
      <head>
        <title>PayDay Tradie report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #0b3d2c; }
          h1, h2 { margin: 0; }
          .muted { color: #60756b; line-height: 1.6; }
          .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 24px; }
          .card { border: 1px solid #dce8e0; border-radius: 22px; padding: 18px; }
          strong { display: block; font-size: 28px; margin-top: 8px; }
        </style>
      </head>
      <body>
        <h1>PayDay Tradie report</h1>
        <p class="muted">${escapeHtml(currentUser.businessName)} / ${escapeHtml(reportDateRange === "all" ? "All time" : `Last ${reportDateRange} days`)}</p>
        <div class="grid">
          <div class="card"><span>Total revenue</span><strong>${formatMoney(grossRevenue)}</strong></div>
          <div class="card"><span>Total expenses</span><strong>${formatMoney(expenseTotal + payrollTotal)}</strong></div>
          <div class="card"><span>Profit estimate</span><strong>${formatMoney(grossRevenue - expenseTotal - payrollTotal)}</strong></div>
          <div class="card"><span>Outstanding invoices</span><strong>${formatMoney(outstanding)}</strong></div>
        </div>
        <script>window.print();<\/script>
      </body>
    </html>
  `);
  popup.document.close();
}

function renderSettings() {
  els.businessNameInput.value = currentUser.businessName;
  els.abnInput.value = currentUser.abn;
  els.settingsBusinessEmailInput.value = currentUser.businessEmail;
  els.settingsBusinessPhoneInput.value = currentUser.businessPhone;
  els.settingsBusinessAddressInput.value = currentUser.businessAddress;
  els.tradeTypeInput.value = currentUser.tradeType;
  els.settingsLogoPreview.src = currentUser.businessLogo || "assets/logo-wordmark.png";
  els.settingsBrandToneSelect.value = currentUser.brandTone;
  els.settingsPaymentTermsSelect.value = currentUser.defaultPaymentTerms;
  els.settingsQuoteExpirySelect.value = String(currentUser.defaultQuoteExpiryDays);
  els.settingsInvoicePrefixInput.value = currentUser.invoicePrefix;
  els.settingsQuotePrefixInput.value = currentUser.quotePrefix;
  els.settingsGstModeSelect.value = currentUser.gstMode;
  els.taxVaultRateInput.value = Math.round(currentUser.taxVaultRate * 100);
  els.settingsInvoiceReminderToggle.checked = currentUser.notificationSettings.invoiceReminders;
  els.settingsOverdueReminderToggle.checked = currentUser.notificationSettings.overdueReminders;
  els.settingsPayrollReminderToggle.checked = currentUser.notificationSettings.payrollReminders;
  els.settingsPaymentAlertToggle.checked = currentUser.notificationSettings.paymentAlerts;
  els.settingsJobAlertToggle.checked = currentUser.notificationSettings.jobAlerts;
  els.settingsBankConnectionSelect.value = currentUser.bankConnection;
  els.settingsPaymentMethodSelect.value = currentUser.paymentMethod;
  els.settingsIntegrationNotesInput.value = currentUser.integrationNotes;
  els.settingsDefaultViewSelect.value = currentUser.defaultWorkspaceView;
  Array.from(els.settingsDefaultViewSelect.options).forEach((option) => {
    const requiresReports = option.value === "Reports";
    option.disabled = requiresReports && !hasFeature("businessReporting");
  });
  if (els.settingsDefaultViewSelect.selectedOptions[0]?.disabled) {
    els.settingsDefaultViewSelect.value = "Dashboard";
  }
  els.settingsThemeSelect.value = currentUser.themePreference;
  els.settingsTwoFactorSelect.value = currentUser.twoFactorStatus;
  els.settingsSessionNotesInput.value = currentUser.sessionNotes;
  els.settingsUserList.innerHTML = currentUser.teamUsers.map((user) => `
    <article class="settings-user-row">
      <div>
        <strong>${escapeHtml(user.name)}</strong>
        <span>${escapeHtml(user.email)} / ${escapeHtml(user.role)}</span>
        <span>${escapeHtml(getTeamRoleAccessCopy(user.role))}</span>
      </div>
      <span class="status-badge ${user.status === "Active" ? "status-active" : "status-draft"}">${escapeHtml(user.status)}</span>
    </article>
  `).join("");
}

function renderAlerts() {
  if (isFirstUseWorkspace()) {
    if (els.dashboardPriorityStrip) {
      els.dashboardPriorityStrip.innerHTML = [
        { icon: "1", title: "Add your first client", copy: "Save one client and reuse them everywhere." },
        { icon: "2", title: "Create your first job", copy: "Track the work before anything slips." },
        { icon: "3", title: "Send your first invoice", copy: "See unpaid money and due dates once work is billed." },
      ].map((item) => `
        <article class="dashboard-priority-pill">
          <span class="dashboard-priority-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
          <div>
            <b>${escapeHtml(item.title)}</b>
            <span>${escapeHtml(item.copy)}</span>
          </div>
        </article>
      `).join("");
    }

    els.alertCount.textContent = "Start here";
    els.taxSaved.textContent = "Ready";
    els.dashboardUrgentUnpaid.textContent = "Next";
    els.expenseTotal.textContent = "Track";
    els.dashboardUrgentUnpaidCopy.textContent = "Once you send an invoice, unpaid money will stay visible here.";
    els.alertsList.innerHTML = [
      ["Clients", "No clients yet", "Add your first client to reuse their details in jobs, quotes, and invoices."],
      ["Jobs", "No jobs yet", "Create a job to track site work, notes, and what needs doing next."],
      ["Invoices", "No invoices yet", "Send the first invoice when work is ready to bill."],
    ].map(([type, title, copy]) => `
      <article class="dashboard-table-row compact-activity-row">
        <div>
          <span>${escapeHtml(type)}</span>
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(copy)}</p>
        </div>
        <div class="record-right">
          <span class="status-badge status-draft">First use</span>
        </div>
      </article>
    `).join("");
    return;
  }

  const alertRows = [];
  const canUsePayroll = hasFeature("payrollPage");
  const canSeeProfitability = hasFeature("jobProfitability");
  const canCompareJobs = hasFeature("compareActiveJobs");
  const openInvoices = currentUser.invoices.filter((invoice) => ["Unpaid", "Overdue"].includes(getInvoiceStatus(invoice)));
  const overdueInvoices = openInvoices.filter((invoice) => getInvoiceStatus(invoice) === "Overdue");
  const unpaidAmount = openInvoices.reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const underquotedJobs = currentUser.jobs
    .map((job) => ({
      job,
      marginGap: Number(job.labourCost || 0) + Number(job.materialCost || 0) - Number(job.quoteAmount || 0),
    }))
    .filter((item) => item.marginGap > 0);
  const totalMarginGap = underquotedJobs.reduce((sum, item) => sum + item.marginGap, 0);
  const paidInvoices = currentUser.invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const invoiceGst = currentUser.invoices.reduce((sum, invoice) => sum + Number(invoice.gst || 0), 0);
  const expenseGst = currentUser.expenses.reduce((sum, expense) => sum + Number(expense.gst || 0), 0);
  const taxBuffer = Math.max(0, invoiceGst - expenseGst + paidInvoices * currentUser.taxVaultRate);
  const nextPayrollRun = getNextPayrollRun();
  const payrollRunStatus = getPayrollRunStatus(nextPayrollRun);

    if (els.dashboardPriorityStrip) {
      const priorityItems = [
        {
          icon: overdueInvoices.length ? "!" : "$",
          title: overdueInvoices.length ? `${overdueInvoices.length} overdue invoice${overdueInvoices.length === 1 ? "" : "s"}` : `${openInvoices.length} invoice${openInvoices.length === 1 ? "" : "s"} to watch`,
          copy: overdueInvoices.length ? "Chase these today." : "Keep an eye on incoming cash.",
        },
        {
          icon: canCompareJobs ? "#" : underquotedJobs.length ? "%" : "+",
          title: canCompareJobs
            ? `${currentUser.jobs.length} active job${currentUser.jobs.length === 1 ? "" : "s"} in view`
            : underquotedJobs.length
              ? `${underquotedJobs.length} job${underquotedJobs.length === 1 ? "" : "s"} underquoted`
              : canSeeProfitability
                ? "Margins holding"
                : `${currentUser.jobs.length} job${currentUser.jobs.length === 1 ? "" : "s"} on file`,
          copy: canCompareJobs
            ? "Compare live jobs, cash, and approvals from one place."
            : underquotedJobs.length
              ? "Review labour and materials before the next stage."
              : canSeeProfitability
                ? "No margin risk showing right now."
                : "Keep the next job moving without extra admin clutter.",
        },
        {
          icon: canUsePayroll ? "P" : "B",
          title: canUsePayroll
            ? payrollRunStatus === "Due soon" ? "Payroll due tomorrow" : `Payroll ${formatDate(nextPayrollRun.runDate)}`
            : taxBuffer >= unpaidAmount * 0.1 ? "BAS buffer in good shape" : "BAS money needs topping up",
          copy: canUsePayroll
            ? payrollRunStatus === "Due soon" ? "Review hours and run the cycle." : "Next team pay run is already lined up."
            : taxBuffer >= unpaidAmount * 0.1 ? "GST money is set aside and visible." : "Hold more aside before the next BAS run.",
        },
      ];

    els.dashboardPriorityStrip.innerHTML = priorityItems.map((item) => `
      <article class="dashboard-priority-pill">
        <span class="dashboard-priority-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
        <div>
          <b>${escapeHtml(item.title)}</b>
          <span>${escapeHtml(item.copy)}</span>
        </div>
      </article>
    `).join("");
  }

  els.dashboardUrgentUnpaid.textContent = formatMoney(unpaidAmount);
  els.dashboardUrgentUnpaidCopy.textContent = overdueInvoices.length
    ? `${overdueInvoices.length} overdue invoice${overdueInvoices.length === 1 ? "" : "s"} need a chase today.`
    : openInvoices.length
      ? `${openInvoices.length} open invoice${openInvoices.length === 1 ? "" : "s"} waiting on payment.`
      : "No invoice chasing needed right now.";
    if (canCompareJobs) {
      els.dashboardUrgentMargin.textContent = String(currentUser.jobs.length);
      els.dashboardUrgentMarginCopy.textContent = `${currentUser.jobs.length} active job${currentUser.jobs.length === 1 ? "" : "s"} visible across the business.`;
    } else if (canSeeProfitability) {
      els.dashboardUrgentMargin.textContent = String(underquotedJobs.length);
      els.dashboardUrgentMarginCopy.textContent = underquotedJobs.length
        ? `${formatMoney(totalMarginGap)} margin gap across live jobs.`
        : "Current job pricing is holding margin.";
    } else {
      els.dashboardUrgentMargin.textContent = String(currentUser.jobs.length);
      els.dashboardUrgentMarginCopy.textContent = `${currentUser.jobs.length} job${currentUser.jobs.length === 1 ? "" : "s"} currently on the go.`;
    }
  els.dashboardUrgentTax.textContent = formatMoney(taxBuffer);
  els.dashboardUrgentTaxCopy.textContent = taxBuffer >= unpaidAmount * 0.1
    ? "Tax vault looks healthy against open invoices."
    : "Top up tax savings before the next BAS run.";

  openInvoices.slice(0, 4).forEach((invoice) => {
    const status = getInvoiceStatus(invoice);
    alertRows.push({
      label: status === "Overdue" ? "Invoice overdue" : "Invoice unpaid",
      title: `${invoice.invoiceNumber} / ${invoice.client}`,
      meta: `${invoice.job} / Due ${formatDate(invoice.dueDate)}`,
      amount: formatMoney(invoice.amount),
      badge: getInvoiceBadgeLabel(status),
      badgeClass: invoiceStatusClass(status),
    });
  });

  underquotedJobs.slice(0, 3).forEach(({ job, marginGap }) => {
    alertRows.push({
      label: "Job underquoted",
      title: job.name,
      meta: `${job.clientName} / ${job.suburb}`,
      amount: formatMoney(marginGap),
      badge: "Check margin",
      badgeClass: "status-loss",
    });
  });

  currentUser.jobs
    .filter((job) => job.status === "Completed" && !job.invoiceSent)
    .slice(0, 3)
    .forEach((job) => {
      alertRows.push({
        label: "Needs invoicing",
        title: job.name,
        meta: `${job.clientName} / Completed job needs billing`,
        amount: formatMoney(job.quoteAmount),
        badge: "Invoice now",
        badgeClass: "status-unpaid",
      });
    });

  els.alertCount.textContent = `${alertRows.length} alerts`;
  els.alertsList.innerHTML = alertRows.length
    ? alertRows.slice(0, 4).map((row) => `
      <article class="dashboard-table-row">
        <div>
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(row.title)}</strong>
          <p>${escapeHtml(row.meta)}</p>
        </div>
        <div class="record-right">
          <p class="record-amount">${escapeHtml(row.amount)}</p>
          <span class="status-badge ${row.badgeClass}">${escapeHtml(row.badge)}</span>
        </div>
      </article>
    `).join("")
    : emptyCard("No urgent admin", "You're up to date right now.");
}

function renderDashboardActivity() {
  if (isFirstUseWorkspace()) {
    els.activityCount.textContent = "Getting started";
    els.dashboardActivityList.innerHTML = [
      ["Client details", "Add your first client", "Save the basics once so jobs and invoices can prefill from it."],
      ["Job tracking", "Create your first job", "Use jobs to keep scope, schedule, and notes in one place."],
      ["Money in", "Create your first invoice", "Invoices will start showing due dates, GST, and unpaid totals."],
    ].map(([type, title, meta]) => `
      <article class="dashboard-table-row compact-activity-row">
        <div>
          <span>${escapeHtml(type)}</span>
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(meta)}</p>
        </div>
        <div class="record-right">
          <span class="status-badge status-draft">New</span>
        </div>
      </article>
    `).join("");
    return;
  }

  const activityRows = [
    ...currentUser.jobs.map((job) => ({
      type: "Job",
      title: job.name,
      meta: `${job.clientName} / ${formatSchedule(job.scheduledAt)}`,
      amount: formatMoney(job.quoteAmount),
      status: job.status,
      statusClass: jobStatusClass(job.status),
      date: job.createdAt || job.scheduledAt,
    })),
    ...currentUser.invoices.map((invoice) => {
      const status = getInvoiceStatus(invoice);
      return {
        type: "Invoice",
        title: `${invoice.invoiceNumber} / ${invoice.client}`,
        meta: `${invoice.job} / Due ${formatDate(invoice.dueDate)}`,
        amount: formatMoney(invoice.amount),
        status,
        statusClass: invoiceStatusClass(status),
        statusLabel: getInvoiceBadgeLabel(status),
        date: invoice.createdAt || invoice.issueDate,
      };
    }),
    ...currentUser.quotes.map((quote) => {
      const status = getQuoteStatus(quote);
      return {
        type: "Quote",
        title: `${quote.quoteNumber} / ${quote.jobName}`,
        meta: `${quote.clientName} / Expires ${formatDate(quote.expiryDate)}`,
        amount: formatMoney(quote.total),
        status,
        statusClass: quoteStatusClass(status),
        statusLabel: getQuoteBadgeLabel(status),
        date: quote.createdAt,
      };
    }),
    ...currentUser.expenses.map((expense) => ({
      type: "Expense",
      title: expense.supplier,
      meta: `${expense.category} / ${expense.job || "No linked job"}`,
      amount: formatMoney(expense.amount),
        status: expense.claimStatus,
        statusClass: expenseClaimStatusClass(expense.claimStatus),
        statusLabel: expense.claimStatus,
        date: expense.createdAt || expense.expenseDate,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  els.activityCount.textContent = `${activityRows.length} items`;
  els.dashboardActivityList.innerHTML = activityRows.length
    ? activityRows.map((row) => `
      <article class="dashboard-table-row compact-activity-row">
        <div>
          <span>${escapeHtml(row.type)}</span>
          <strong>${escapeHtml(row.title)}</strong>
          <p>${escapeHtml(row.meta)}</p>
        </div>
        <div class="record-right">
          <p class="record-amount">${escapeHtml(row.amount)}</p>
          <span class="status-badge ${row.statusClass}">${escapeHtml(row.statusLabel || row.status)}</span>
        </div>
      </article>
    `).join("")
    : emptyCard("No recent activity", "Create a job, quote, invoice, or expense to start the feed.");
}

function persistCurrentUser() {
  const users = getUsers();
  currentUser = enforcePlanDataLimits(currentUser);
  users[currentUser.email] = currentUser;
  saveUsers(users);
}

function closeMobileNav() {
  els.siteNav.classList.remove("open");
  els.navToggle.setAttribute("aria-expanded", "false");
}

function handleLandingNavClick(event) {
  const href = event.currentTarget.getAttribute("href");
  if (!href || href === "#") {
    closeMobileNav();
    return;
  }

  const target = document.querySelector(href);
  if (!target) {
    closeMobileNav();
    return;
  }

  event.preventDefault();
  closeMobileNav();
  scrollToSection(target, href);
}

function scrollToSection(target, hash = "") {
  const headerHeight = els.siteHeader ? els.siteHeader.offsetHeight : 0;
  const offset = 16;
  const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });

  if (hash && window.location.hash !== hash) {
    window.history.replaceState(null, "", hash);
  }
}

function roundCurrency(amount) {
  return Math.round(amount * 100) / 100;
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatSchedule(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No date set";
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getDaysOverdue(dueDate) {
  const dueTime = new Date(`${dueDate}T23:59:59`).getTime();
  if (Number.isNaN(dueTime)) return 0;
  return Math.max(1, Math.ceil((Date.now() - dueTime) / 86400000));
}

function getQuoteDecisionCopy(status) {
  if (status === "Accepted") return "Won - book it in or raise the invoice";
  if (status === "Sent") return "Waiting on client reply";
  if (status === "Rejected") return "Lost - review pricing or scope";
  if (status === "Expired") return "Expired - resend if the job is still live";
  return "Draft - finish and send";
}

function getQuoteBadgeLabel(status) {
  if (status === "Accepted") return "Won";
  if (status === "Sent") return "Waiting";
  return status;
}

function getInvoiceBadgeLabel(status) {
  if (status === "Overdue") return "Chase now";
  if (status === "Unpaid") return "Awaiting payment";
  if (status === "Pending approval") return "Pending approval";
  if (status === "Approved") return "Approved";
  return status;
}

function getInvoiceApprovalState(invoice) {
  if (invoice.status === "Pending approval") return "Pending approval";
  if (invoice.status === "Approved") return "Approved";
  return invoice.approvalRequired ? "Approval required" : "No approval needed";
}

function getJobEstimatedProfit(job) {
  return roundCurrency(Number(job.quoteAmount || 0) - Number(job.materialCost || 0) - Number(job.labourCost || 0));
}

function getJobSpendSummary(job) {
  const expenseSpend = currentUser.expenses
    .filter((expense) => expense.jobId === job.id)
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const plannedSpend = Number(job.materialCost || 0) + Number(job.labourCost || 0);
  const totalSpend = roundCurrency(plannedSpend + expenseSpend);
  const profit = roundCurrency(Number(job.quoteAmount || 0) - totalSpend);
  return { expenseSpend, totalSpend, profit };
}

function downloadCsv(filename, rows) {
  const csv = rows
    .map((row) => row
      .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
      .join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function getTeamRoleAccessCopy(role) {
  if (role === "Owner") return "Full admin access, approvals, reporting, and settings";
  if (role === "Admin") return "Jobs, invoices, payroll, and most day-to-day admin";
  if (role === "Bookkeeper") return "Invoices, expenses, payroll, and reporting";
  if (role === "Crew lead") return "Assigned jobs, notes, and job progress";
  return "View-only access to the shared workspace";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function emptyCard(title, copy) {
  return `
    <article class="record-row empty-state-row" role="status">
      <div class="empty-state-icon" aria-hidden="true">+</div>
      <div>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(copy)}</p>
      </div>
    </article>
  `;
}

function flashSaving(form, label) {
  const button = form.querySelector('button[type="submit"]');
  if (!button) return;
  const originalLabel = button.textContent;
  button.textContent = label;
  button.disabled = true;
  button.classList.add("is-saving");
  form.setAttribute("aria-busy", "true");
  window.setTimeout(() => {
    button.textContent = originalLabel;
    button.disabled = false;
    button.classList.remove("is-saving");
    form.removeAttribute("aria-busy");
  }, 350);
}

function showToast(message) {
  if (!els.toastNotice) return;
  els.toastNotice.textContent = message;
  els.toastNotice.classList.remove("hidden");
  window.clearTimeout(showToast.hideTimer);
  showToast.hideTimer = window.setTimeout(() => {
    els.toastNotice.classList.add("hidden");
  }, 3200);
}

function handleDemoSubmit(event) {
  event.preventDefault();

  const formData = new FormData(els.demoForm);
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

  els.formNote.textContent = "Opening your email app with a pre-filled demo request...";
  window.location.href = `mailto:hello@paydaytradie.com.au?subject=${subject}&body=${body}`;

  window.setTimeout(() => {
    els.formNote.textContent = "If your email app didn't open, email hello@paydaytradie.com.au and we'll tee up a demo.";
  }, 1200);
}
