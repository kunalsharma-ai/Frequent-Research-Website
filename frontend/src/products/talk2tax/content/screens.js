/**
 * Real Talk2Tax product screenshots (demo organisation with synthetic data).
 *
 * To add a screen: drop a 1600x1000 .webp into src/assets/screens/ and add an entry below.
 * The file name (without .webp) is the key. Screens are bundled by Vite, so the
 * single-file preview build inlines them automatically.
 */
const files = import.meta.glob('../assets/screens/*.webp', { eager: true, import: 'default' });

const src = (key) => {
  const url = files[`../assets/screens/${key}.webp`];
  if (!url && import.meta.env.DEV) console.warn(`Missing screenshot: ${key}.webp`);
  return url;
};

export const SCREENS = {
  dashboard: { title: 'Dashboard', caption: 'Cash, receivables, payables and profit at a glance', group: 'Accounting' },
  'audit-trail': { title: 'Audit trail', caption: 'Every change, append-only and hash-chained', group: 'Accounting' },
  'bank-reconciliation': { title: 'Bank reconciliation', caption: 'Imported statement lines matched to the books', group: 'Accounting' },
  'fixed-assets': { title: 'Fixed asset register', caption: 'Monthly depreciation posted to the ledger', group: 'Accounting' },
  consolidation: { title: 'Group consolidation', caption: 'Worksheet with eliminations across companies', group: 'Accounting' },
  'statutory-statements': { title: 'Schedule III balance sheet', caption: 'Statutory layouts for India, UK and IFRS', group: 'Accounting' },
  'invoice-template': { title: 'Invoice designer', caption: 'Themes, palettes and e-signatures on real invoices', group: 'Accounting' },
  'relationship-explorer': { title: 'Relationship explorer', caption: 'Trace any figure to the record that created it', group: 'Accounting' },

  'gstr-3b': { title: 'GSTR-3B', caption: 'Built from posted invoices, bills and notes', group: 'India tax' },
  'e-invoice': { title: 'E-invoice with IRN', caption: 'IRP-ready JSON, IRN and signed QR recorded', group: 'India tax' },
  'e-way-bill': { title: 'E-way bill', caption: 'Which invoices need one, and the portal JSON', group: 'India tax' },
  'tds-register': { title: 'TDS register', caption: 'Deductions, challans and deposits by quarter', group: 'India tax' },
  payslip: { title: 'Payslip', caption: 'PF, ESI, professional tax and TDS on salary', group: 'India tax' },
  'compliance-calendar': { title: 'Compliance calendar', caption: 'Every due date for the next 60 days', group: 'India tax' },

  copilot: { title: 'AI copilot', caption: 'Answers in plain words, with the reports it read', group: 'AI' },
  'voice-assistant': { title: 'Voice assistant', caption: 'Ask out loud, hear the answer read back', group: 'AI' },
  collections: { title: 'Collections agent', caption: 'Drafted reminders, checked, then approved by a person', group: 'AI' },
  'ai-reconciliation': { title: 'AI reconciliation', caption: 'Match suggestions with every check shown', group: 'AI' },
  'month-end-close': { title: 'Month-end close', caption: 'AI review proposes entries, checks refuse bad ones', group: 'AI' },
  'ai-control-center': { title: 'AI control center', caption: 'Every agent, its budget and one emergency stop', group: 'AI' },
  'ai-dashboards': { title: 'Dashboards from words', caption: 'Describe a board view, get it on approved metrics', group: 'AI' },

  'cash-flow': { title: 'Cash-flow forecast', caption: '90 days ahead from open invoices and bills', group: 'Planning' },
  kpis: { title: 'KPIs', caption: 'Growth, profitability, liquidity and leverage', group: 'Planning' },
  'budget-vs-actual': { title: 'Budget vs actual', caption: 'Approved versions against the ledger', group: 'Planning' },
  alerts: { title: 'Alerts and leakage checks', caption: 'Duplicate bills, overdue customers, overruns', group: 'Planning' },
  'forecast-lab': { title: 'Forecast lab', caption: 'Eight methods backtested on your own books', group: 'Planning' },
  benchmarking: { title: 'Benchmarking', caption: 'Consent-based peer comparison in quartiles', group: 'Planning' },

  'virtual-cfo': { title: 'Virtual CFO', caption: 'Health score, what to do next, board packs', group: 'Future lab' },
  'digital-twin': { title: 'Digital twin', caption: 'A scenario such as a warehouse loan, month by month', group: 'Future lab' },
  'war-room': { title: 'Scenario war room', caption: 'Impacts, suggestions, notes and approval', group: 'Future lab' },
  'disaster-simulation': { title: 'Disaster simulation', caption: 'Seven stress tests on your own figures', group: 'Future lab' },
  'business-impact': { title: 'Business impact engine', caption: 'How each change flows through the business', group: 'Future lab' },
  'recovery-planner': { title: 'Recovery planner', caption: 'A plan back to a safe cash position', group: 'Future lab' },
  'decision-memory': { title: 'Decision memory', caption: 'What was decided, and whether it worked', group: 'Future lab' },
  'policy-studio': { title: 'Policy studio', caption: 'Finance policies tested, approved and run', group: 'Future lab' },

  'country-modules': { title: 'Country modules', caption: 'India in full, six starter countries, more to come', group: 'Global' },
  'multi-currency': { title: 'Multi-currency', caption: 'Exchange rates, exposure and revaluation', group: 'Global' },
  'regional-deployment': { title: 'Data region', caption: 'Choose where your data is kept', group: 'Global' },
  integrations: { title: 'Integrations', caption: 'Keys set up in the app, stored encrypted', group: 'Global' },
  sessions: { title: 'Sessions and security', caption: 'See and sign out every session', group: 'Global' },

  'mobile-dashboard': { title: 'Mobile dashboard', caption: 'The whole product works on a phone', group: 'Mobile', mobile: true },
  'mobile-payslip': { title: 'Mobile payslip', caption: 'Payslips readable anywhere', group: 'Mobile', mobile: true },
  'mobile-alerts': { title: 'Mobile alerts', caption: 'Act on alerts on the go', group: 'Mobile', mobile: true },
};

for (const [key, s] of Object.entries(SCREENS)) {
  s.key = key;
  s.src = src(key);
}

export const screen = (key) => SCREENS[key];
export const SCREEN_GROUPS = ['All', ...new Set(Object.values(SCREENS).map((s) => s.group))];
