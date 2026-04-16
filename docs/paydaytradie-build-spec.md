# PayDay Tradie Build Spec

## Product Requirements Extracted from Checklist

### Positioning
- Australian tradie accounting and job admin software.
- Easier than Xero, less bloated than MYOB, more tradie-specific than generic accounting tools, and simpler than spreadsheets.
- Built for tradies working on site, not accountants sitting at a desk.
- Main emotional promise: help tradies feel in control, confident with their numbers, and less stressed about BAS and late payments.

### Landing Website Requirements
- Modern responsive landing page with a clean navbar and footer.
- Green/white professional brand direction with a subtle trade feel, but not childish.
- Australian tradie tone and practical plain-English copy.
- Sections required: hero, features, how it works, pricing, testimonials, FAQ, and contact/demo CTA.
- Strongly communicate:
  - easier than Xero,
  - faster invoicing,
  - expense and receipt tracking,
  - GST/BAS support,
  - job costing and underquote awareness,
  - lower admin/accountant clean-up effort where records are already organised.

### Product App Requirements
- Protected/sign-in experience after the marketing page.
- App shell should feel like a real product workspace after sign-in, with a dark green/teal left sidebar and soft rounded white content cards.
- Sidebar tabs should cover Dashboard, Jobs, Clients, Quotes, Invoices, Expenses, Reports, and Settings, and each tab should open a purpose-built screen rather than a generic list.
- Dashboard should show:
  - active jobs,
  - upcoming jobs,
  - unpaid invoices / clients who have not paid,
  - notifications for outstanding invoices, uninvoiced completed work, and underquoted jobs,
  - plain-English cash visibility rather than accountant-style reporting.
- Jobs:
  - selecting a client should auto-fill known client details from the Clients area,
  - "Quote for job" should carry the current job's known data into a quote flow,
  - quotes should be sendable directly to clients,
  - jobs should support recurring schedules,
  - completed/removed jobs should go into an archive instead of cluttering the active list.
- Clients:
  - newly added clients should appear at the top of the client list.
- Invoices:
  - when a job is marked complete, the user should get an immediate option to invoice the client.
  - support late-payment follow-up and clear unpaid invoice visibility.
- Expenses:
  - capture supplier purchases and receipt photos,
  - track materials vs labour where possible,
  - link expenses to jobs.
- Payroll:
  - included in higher tiers, with super/STP direction noted for future versions.
- Reports:
  - BAS/GST summaries,
  - simple cash flow and profit-per-job visibility,
  - avoid overwhelming graph-heavy accountant dashboards.
- Settings:
  - business basics such as ABN, trade type, bank connection, and account details.

### High-Value Differentiators to Prioritise
- "Money Available" dashboard:
  - tax set aside,
  - unpaid invoices,
  - usable cash.
- Automatic job profit tracking with clear green/red margin indicators.
- BAS / Tax Safety Meter with safe/tight/short status.
- Built-in late payment reminders with escalating tone and late-fee logic.
- 5-minute onboarding:
  - connect bank,
  - enter ABN,
  - choose trade type,
  - avoid chart-of-accounts jargon.
- Replace accounting language with plain language:
  - "Match this payment to this job" instead of "reconcile",
  - "Categories" instead of "chart of accounts".

### Pricing Requirements
- Rename plan direction from old placeholders to:
  - Starter,
  - Pro,
  - Enterprise.
- Checklist pricing direction:
  - Solo Tradie / Starter: $29 per month,
  - Growing Tradie / Pro: $59 per month,
  - Trade Business / Enterprise: $99 per month.
- Payroll should be positioned in Pro and Enterprise, not Starter.
- Value message should emphasise being cheaper and clearer than stacking multiple tools.

### Competitor Insights to Reflect in UX/Copy
- Tradies use Xero, QuickBooks, MYOB, Reckon, FreshBooks, Zoho Books, Tradify, and NextMinute mainly to invoice quickly, track receipts, run payroll, manage BAS, and understand job profitability.
- Pain points to solve:
  - software feels too complicated,
  - job costing is clunky,
  - too much manual reconciliation/setup,
  - poor integration between quoting/jobs/accounting/payroll tools,
  - subscription fatigue,
  - cash flow and BAS risk not shown in plain English,
  - awkward payment chasing,
  - overwhelming setup,
  - low trust in numbers.

## Clean Build Spec

### Build Goal
Create a polished marketing website plus a browser-local demo app that proves the PayDay Tradie workflow: sign up/sign in, review dashboard totals, add jobs/clients/invoices/expenses, see BAS and profit indicators, and keep completed jobs archived.

### Recommended Simple Stack
- Static front end using HTML, CSS, and vanilla JavaScript.
- No build tool required.
- Local data persistence through browser `localStorage` for the demo account/workspace.
- Run locally with `python -m http.server 8000`.

### Information Architecture: Website
1. Navbar
   - Logo, Features, How it works, Pricing, FAQ, Sign in, Create account.
2. Hero
   - Core pitch, plain-English value props, CTA to create account/demo.
3. Feature grid
   - Invoicing, expenses, receipt capture, GST/BAS, job costing, payment chasing, archive/history, recurring jobs.
4. How it works
   - Set up business, quote/job/invoice, track money/GST/profit.
5. Product preview
   - Money Available, Tax Safety Meter, unpaid invoices, job margin indicators.
6. Pricing
   - Starter / Pro / Enterprise with payroll gated to Pro+.
7. Testimonials
   - Authentic Australian trade business quotes.
8. FAQ
   - Xero comparison, accountant relationship, BAS support, mobile/site use, data storage.
9. Demo/contact CTA
   - Lead form or mailto fallback.
10. Footer
   - Brand line, key links, contact email.

### Information Architecture: App
1. Authentication
   - Create account, sign in, sign out.
2. Dashboard
   - Money Available,
   - Tax Saved,
   - Unpaid Invoices,
   - Active Jobs,
   - Alerts for overdue invoices / underquoted jobs / completed jobs not invoiced.
3. Jobs
   - Active jobs list,
   - create job,
   - recurring flag/frequency,
   - quote-for-job shortcut,
   - mark complete,
   - archive completed jobs,
   - job margin indicator.
4. Clients
   - Client list ordered newest first,
   - add client,
   - client details available to prefill job creation.
5. Quotes
   - Generate quote from selected job and client,
   - prefilled details,
   - "send quote" action.
6. Invoices
   - Create invoice,
   - mark paid,
   - overdue reminders and late-fee messaging.
7. Expenses
   - Record supplier, amount, GST, category, job link.
8. Reports
   - BAS summary,
   - profit per job,
   - plain-English cash insights.
9. Settings
   - Business name, ABN, trade type, tax vault percentage.

## Implementation Decisions for This Rebuild
- Treat checklist notes like "Finish filling all these out" and incomplete section headings as draft placeholders, not production copy.
- Keep copy plain, confident, and Australian without overdoing slang.
- Prioritise a premium green/white UI with subtle site/job visual cues and clear status chips instead of cartoon tradie styling.
- Reuse recovered design language from old Codex chats where it fits the updated brand: soft rounded hero blocks, stronger headline treatment, dark teal app rail, compact pill actions, and page-specific module sections for jobs, clients, quotes, reports, and settings.
- Use the existing brand assets in `assets/`.
- Keep the implementation browser-local and simple so it runs immediately without a framework install.
