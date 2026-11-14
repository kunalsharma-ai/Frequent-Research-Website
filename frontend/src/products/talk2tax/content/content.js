/**
 * All page copy lives here so the marketing team can edit words without touching layout code.
 *
 * Accuracy rule for this file: every claim describes something built and tested in the
 * Talk2Tax product (see the docs/ folder of the product repo). Do not add customer counts,
 * testimonials, certifications or claims about named competitors without evidence.
 * Figures quoted in example answers come from the demo organisation (synthetic data).
 */

export const NAV_LINKS = [
  { href: '#ask', label: 'Ask' },
  { href: '#platform', label: 'Platform' },
  { href: '#india', label: 'India tax' },
  { href: '#future', label: 'Future lab' },
  { href: '#different', label: 'Why Talk2Tax' },
  { href: '#gallery', label: 'Screens' },
];

export const HERO = {
  eyebrow: 'AI-native accounting, tax and finance',
  lines: ['Talk to your books.', 'They talk back'],
  rotating: ['in rupees.', 'in GST returns.', 'in forecasts.', 'in board packs.', 'in plain words.'],
  sub: 'Talk2Tax keeps your ledger, prepares India GST, TDS and payroll from it, and lets you ask anything about your business. Every figure it shows can be traced to the record that made it.',
  chips: ['Double-entry ledger', 'GST · TDS · Payroll', 'AI copilot + voice', 'Digital twin'],
  chat: [
    { who: 'you', text: 'Are we safe on cash for the next 90 days?' },
    {
      who: 't2t',
      text: 'Yes. Cash today is ₹14,55,699. The lowest point is ₹13,49,572 in early January, above your ₹12,00,000 minimum.',
      sources: ['Cash-flow forecast', 'Open invoices', 'Open bills'],
    },
  ],
};

export const MARQUEE = [
  ['Journals', 'Chart of accounts', 'Trial balance', 'Profit & loss', 'Balance sheet', 'General ledger', 'Bank reconciliation', 'Invoices', 'Bills', 'Expense claims', 'Approvals', 'Fixed assets', 'Prepaids & accruals', 'Loans & treasury', 'Departments & projects', 'Consolidation', 'Intercompany', 'Invoice designer', 'E-signatures', 'Report exports'],
  ['GSTR-1', 'GSTR-3B', 'ITC set-off', 'Reverse charge', 'TDS / TCS', 'Payroll India', 'E-invoicing', 'E-way bills', 'Compliance calendar', 'AI copilot', 'Voice assistant', 'Collections agent', 'AI reconciliation', 'Month-end close', 'AI control center', 'Virtual CFO', 'Digital twin', 'War room', 'Disaster simulation', 'Forecast lab'],
];

/** The interactive "Ask" section: each question shows a typed answer and the matching product screen. */
export const ASKS = [
  {
    q: 'How did we do last month, and who owes us the most?',
    a: 'Revenue for October was ₹8,37,626.56 with a 71.5% gross margin. Your largest balances are listed by customer with how long each has been outstanding, and two alerts need a look.',
    sources: ['Profit & loss', 'Receivables ageing', 'Alerts'],
    screen: 'copilot',
    tag: 'AI copilot',
  },
  {
    q: 'What should I do next as a finance lead?',
    a: 'Your health score is 60 out of 100. Top of the list: build a recovery plan to close the cash gap, then chase overdue invoices. Each step has a priority and names who approves it.',
    sources: ['Health score', 'Receivables', 'Bills'],
    screen: 'virtual-cfo',
    tag: 'Virtual CFO',
  },
  {
    q: 'What is our GST liability for October?',
    a: 'GSTR-3B for October is built from posted invoices, bills and credit notes, with input tax credit set off in the legal order. Review it, then file on the portal.',
    sources: ['GSTR-3B', 'Tax ledger', 'Input tax credit'],
    screen: 'gstr-3b',
    tag: 'India GST',
  },
  {
    q: 'What if we borrow ₹25 lakh for a new warehouse?',
    a: 'The digital twin projects the loan month by month: EMIs, interest and your cash at each month end. Nothing is posted; it is a scenario you can take to approval.',
    sources: ['Digital twin', 'Last 6 months', 'Loan schedule'],
    screen: 'digital-twin',
    tag: 'Digital twin',
  },
  {
    q: 'Can we survive our biggest customer defaulting?',
    a: 'Seven stress tests run on your own figures, worst first: a customer default, a supplier failure, a one-month shutdown, a demand fall, slow payers, frozen cash and a perfect storm.',
    sources: ['Customers', 'Suppliers', 'Cash'],
    screen: 'disaster-simulation',
    tag: 'Disaster simulation',
  },
];

/** The exploded "platform stack". Order is bottom (foundation) to top. */
export const LAYERS = [
  {
    id: 'ledger',
    name: 'The ledger',
    kicker: 'Foundation',
    color: '#5EEAD4',
    screen: 'dashboard',
    blurb: 'A real double-entry ledger with exact decimal maths, period locks and a hash-chained audit trail.',
    items: ['Journals with live balance check', 'Invoices, bills, receipts, payments', 'Bank import and reconciliation', 'Approvals and expense claims', 'Trial balance, P&L, balance sheet, GL'],
  },
  {
    id: 'india',
    name: 'India compliance',
    kicker: 'Built in, not bolted on',
    color: '#38BDF8',
    screen: 'gstr-3b',
    blurb: 'GST, TDS/TCS, payroll, e-invoicing and e-way bills, all prepared from the same posted books.',
    items: ['CGST, SGST, UTGST, IGST split', 'GSTR-1, GSTR-3B, ITC set-off', 'TDS/TCS and reverse charge', 'PF, ESI, PT and TDS on salary', 'IRP and e-way bill JSON'],
  },
  {
    id: 'planning',
    name: 'Planning and insight',
    kicker: 'Know before it happens',
    color: '#60A5FA',
    screen: 'cash-flow',
    blurb: 'Budgets, a 90 to 365 day cash forecast, KPIs and management reports, with alerts that catch leaks.',
    items: ['Budget versions and budget vs actual', 'Cash-flow forecast with backtests', 'KPIs and monthly reports', 'Duplicate bill and overrun alerts', 'Forecast lab: 8 methods tested'],
  },
  {
    id: 'agents',
    name: 'AI agents',
    kicker: 'They prepare, you approve',
    color: '#818CF8',
    screen: 'month-end-close',
    blurb: 'A copilot you can talk to, plus agents for collections, bank matching and month-end close.',
    items: ['Copilot with voice', 'Collections reminders', 'Reconciliation suggestions', 'Month-end close review', 'AI control center with stop'],
  },
  {
    id: 'advanced',
    name: 'Advanced accounting',
    kicker: 'Grows with the group',
    color: '#A78BFA',
    screen: 'consolidation',
    blurb: 'Fixed assets, prepaids and accruals, loans, departments and projects, and full group consolidation.',
    items: ['Depreciation and disposals', 'Deferrals and accruals', 'Loans and treasury', 'Consolidation, NCI, intercompany', 'Schedule III, UK and IFRS layouts'],
  },
  {
    id: 'future',
    name: 'Future lab',
    kicker: 'Rehearse decisions',
    color: '#C084FC',
    screen: 'war-room',
    blurb: 'A digital twin of the business to test loans, hires, price changes and disasters before they happen.',
    items: ['Digital twin scenarios', 'Scenario war room with approval', 'Disaster simulation', 'Recovery planner', 'Decision memory'],
  },
  {
    id: 'global',
    name: 'Global and platform',
    kicker: 'Ready to scale',
    color: '#F0ABFC',
    screen: 'country-modules',
    blurb: 'Country modules, multi-currency with revaluation, data regions, English and Hindi, and plans with billing.',
    items: ['8 country modules', 'FX rates and revaluation', 'Choose your data region', 'English and हिन्दी', 'Automations, webhooks, email'],
  },
];

export const INDIA = {
  orbit: ['GSTR-1', 'GSTR-3B', 'ITC', 'RCM', 'TDS', 'TCS', 'IRN', 'E-way bill', 'PF', 'ESI', 'PT', 'HSN'],
  /** Typical monthly statutory due dates. Shown as an illustration of the compliance calendar. */
  calendar: [
    { day: 7, label: 'TDS deposit', kind: 'tds' },
    { day: 11, label: 'GSTR-1', kind: 'gst' },
    { day: 15, label: 'PF and ESI', kind: 'pay' },
    { day: 20, label: 'GSTR-3B', kind: 'gst' },
    { day: 30, label: 'Professional tax', kind: 'pay' },
  ],
  cards: [
    { title: 'GST from the ledger', text: 'Place of supply, HSN and GSTIN on every document. CGST, SGST, UTGST or IGST split automatically. GSTR-1 and GSTR-3B built from posted entries, with ITC set off in the legal order.', screen: 'gstr-3b' },
    { title: 'TDS, TCS and reverse charge', text: 'Thresholds, PAN checks, challans and quarterly registers. Reverse charge and import of services flow into GSTR-3B by themselves.', screen: 'tds-register' },
    { title: 'Payroll that posts', text: 'Salary structures, pro-rated pay, PF, ESI, professional tax and TDS on salary under the new regime. A posted run is one journal; dues show their dates.', screen: 'payslip' },
    { title: 'E-invoices and e-way bills', text: 'Talk2Tax tells you which invoices need an IRN or an e-way bill, prepares the portal JSON and records the IRN, acknowledgement and signed QR.', screen: 'e-invoice' },
  ],
  honesty: 'Talk2Tax prepares returns and portal files from your books. Direct submission to government portals needs an approved GSP/ASP connection, which is on the roadmap. Payroll rules are awaiting review by a payroll professional; professional tax covers Maharashtra today.',
};

export const AI_TRUST = {
  levels: [
    { level: 0, name: 'Read-only analysis', who: 'Finance copilot' },
    { level: 1, name: 'Draft recommendations', who: 'Virtual CFO summaries, checked against the figures' },
    { level: 2, name: 'Prepare changes for approval', who: 'Collections, bank reconciliation, month-end close' },
    { level: 3, name: 'Execute approved low-risk workflows', who: 'No agent. By design.' },
    { level: 4, name: 'Execute within strict limits', who: 'No agent. By design.' },
  ],
  pillars: [
    { title: 'Figures by rules, words by AI', text: 'Health scores, forecasts and tax are worked out by tested rules in code. The model explains them; it never invents a number.' },
    { title: 'Every answer shows its sources', text: 'Answers list the reports and records they read, the period, the method, assumptions and confidence.' },
    { title: 'Checks catch the AI', text: 'A reminder with the wrong amount, or a closing entry that breaks the books, is refused before a person ever sees it as ready.' },
    { title: 'A person always confirms', text: 'No agent posts, pays or sends anything on its own. Speech can never confirm an action; it must be confirmed on screen.' },
    { title: 'One switch stops everything', text: 'The AI control center shows every agent, its monthly budget and usage, and an emergency stop with a reason.' },
    { title: 'A log of every AI step', text: 'Every model call, proposal, acceptance and rejection lands in the AI activity log and the audit trail.' },
  ],
};

export const DIFFERENTIATORS = [
  { icon: 'MessagesSquare', title: 'You talk, it answers', text: 'Ask by typing or speaking. Answers come with the reports they read, not a black box.' },
  { icon: 'ShieldCheck', title: 'Ledger integrity you can prove', text: 'Append-only, hash-chained audit trail with a verify button. Period locks, immutable posted entries, database-enforced rules.' },
  { icon: 'IndianRupee', title: 'Every rupee exact', text: 'Money is stored as decimals and calculated to 40 significant digits. Amounts that need rounding are refused, not silently rounded.' },
  { icon: 'Layers', title: 'One product, not seven', text: 'Books, GST, TDS, payroll, planning, AI agents and scenario planning share one ledger. No exports between tools.' },
  { icon: 'FlaskConical', title: 'A lab for the future', text: 'Digital twin, war room, disaster simulation and decision memory, all running on your own posted figures.' },
  { icon: 'Lock', title: 'Isolation in the database', text: 'Row-level security on every tenant table, rotating sessions with reuse detection, and a choice of data region.' },
];

/** "What you would normally stitch together" vs Talk2Tax. Describes the usual setup, not any named vendor. */
export const STACK = {
  scattered: ['Accounting software', 'GST filing tool', 'Payroll software', 'Spreadsheet forecasts', 'BI dashboards', 'Consultant scenarios', 'Reminder emails by hand', 'Audit log exports'],
  rows: [
    { need: 'Ask a question about the business', usual: 'Build a report or wait for the accountant', t2t: 'Ask in words or by voice; answer cites its sources' },
    { need: 'GST and TDS', usual: 'Export data to a separate tax tool', t2t: 'Prepared from the posted ledger, same database' },
    { need: 'Payroll', usual: 'Separate software, journal keyed in by hand', t2t: 'Pay run posts one balanced journal' },
    { need: 'Cash forecast', usual: 'A spreadsheet that goes stale', t2t: 'Live from open invoices and bills, with backtests' },
    { need: '"What if" decisions', usual: 'Consultant model, weeks later', t2t: 'Digital twin and stress tests in minutes' },
    { need: 'AI help', usual: 'Generic chatbot, figures unchecked', t2t: 'Agents with checks, budgets, approvals and a stop switch' },
    { need: 'Proving the books were not changed', usual: 'Trust the vendor', t2t: 'Hash-chained audit trail you can verify' },
  ],
};

/** Every number here is a property of the product, not a marketing estimate. */
export const STATS = [
  { value: 7, suffix: '', label: 'stress tests run on your own figures' },
  { value: 8, suffix: '', label: 'forecast methods backtested on your books' },
  { value: 8, suffix: '', label: 'country modules, India in full' },
  { value: 40, suffix: '', label: 'significant digits in every money calculation' },
  { value: 9, suffix: '', label: 'CFO questions answered with sources' },
  { value: 0, suffix: '', label: 'figures invented by the AI' },
];

export const GLOBAL = {
  countries: [
    { name: 'India', level: 'Full tax module', code: 'IN' },
    { name: 'United Arab Emirates', level: 'Starter', code: 'AE' },
    { name: 'United Kingdom', level: 'Starter', code: 'GB' },
    { name: 'Singapore', level: 'Starter', code: 'SG' },
    { name: 'Australia', level: 'Starter', code: 'AU' },
    { name: 'Germany', level: 'Starter', code: 'DE' },
    { name: 'Canada', level: 'Starter', code: 'CA' },
    { name: 'United States', level: 'Accounting only', code: 'US' },
  ],
  security: [
    'Row-level security on every tenant table',
    'Rotating refresh tokens with reuse detection',
    'Per-email lockout and rate limits',
    'Session list with sign-out everywhere',
    'Integration keys encrypted per organisation',
    'Time-limited, consented support access',
    'Choose the region your data lives in',
    'Hash-chained, append-only audit trail',
  ],
};

export const PLANS = ['Starter', 'Growth', 'Professional', 'Enterprise'];
