// ─────────────────────────────────────────────────────────────────────────────
//  SampTrek showcase: ALL page text, links and screenshots live in this file.
//  Marketing/dev teams: edit words here; the layout code does not need to change.
//  Every capability listed below exists in the SampTrek product today.
// ─────────────────────────────────────────────────────────────────────────────

import commandCenter from './assets/screens/command-center.webp'
import commandCenterDark from './assets/screens/command-center-dark.webp'
import insightPanels from './assets/screens/insight-panels.webp'
import marketsFinance from './assets/screens/markets-finance.webp'
import projectBoard from './assets/screens/project-board.webp'
import project from './assets/screens/project.webp'
import projectDark from './assets/screens/project-dark.webp'
import monitor from './assets/screens/fieldwork-monitor.webp'
import reports from './assets/screens/reports.webp'
import invoices from './assets/screens/invoices.webp'
import integrations from './assets/screens/integrations.webp'
import themeStudio from './assets/screens/theme-studio.webp'
import analytics from './assets/screens/analytics.webp'
import crosstabs from './assets/screens/crosstabs.webp'
import dataProcessing from './assets/screens/data-processing.webp'
import vendorPortal from './assets/screens/vendor-portal.webp'
import uniqueLinks from './assets/screens/unique-links.webp'
import phoneCommand from './assets/screens/phone-command-center.webp'
import phoneProject from './assets/screens/phone-project.webp'

export const screens = {
  commandCenter, commandCenterDark, insightPanels, marketsFinance, projectBoard, project,
  projectDark, monitor, reports, invoices, integrations, themeStudio, analytics, crosstabs,
  dataProcessing, vendorPortal, uniqueLinks, phoneCommand, phoneProject,
}

// Links used by buttons. CONFIRM these before going live.
export const links = {
  demo: '/lets-talk?type=demo&product=SampTrek',   // "Book a demo" buttons
  signIn: 'https://platform.sampledge.com',     // "Sign in" in the top bar
  sampledge: 'https://www.sampledge.com',       // "by Sampledge" + footer
}

export const nav = [
  { label: 'Journey', href: '#journey' },
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Why SampTrek', href: '#why' },
  { label: 'Mobile', href: '#mobile' },
]

export const hero = {
  eyebrow: 'Research project management + fieldwork platform',
  titleStart: 'Keep every',
  rotating: ['project', 'quota', 'market', 'vendor', 'invoice', 'deadline'],
  titleEnd: 'on track.',
  sub: 'SampTrek runs the whole life of a research project in one place: from the bid you won, through gate security, quotas and live fieldwork, to reconciliation, invoices and your accounting books.',
  primary: 'Book a demo',
  secondary: 'Take the tour',
  // Product facts only (no invented customer numbers).
  facts: [
    { value: 8, suffix: '', label: 'respondent statuses routed per link' },
    { value: 50, suffix: 'k', label: 'single-use links per batch' },
    { value: 4, suffix: '', label: 'accounting systems synced' },
    { value: 2, suffix: '', label: 'mobile apps: Android + iOS' },
  ],
  chips: [
    { tone: 'green', title: 'Germany · 25–34', text: 'Quota cell full, entries now overquota-safe' },
    { tone: 'pink', title: 'Autopilot', text: 'Vendor link paused: pace 40% behind' },
    { tone: 'yellow', title: 'Invoice INV-0042', text: 'Synced to Zoho Books' },
    { tone: 'cyan', title: 'AI copilot', text: '“Which live projects are behind pace?”' },
  ],
}

export const marquee = [
  'Hybrid redirects', 'Enforced quotas', 'Unique single-use links', 'Gate survey + free captcha',
  'Fieldwork autopilot', 'Reconciliation', 'Client invoices', 'Vendor payables', 'Multi-currency',
  'Zoho Books · Xero · QuickBooks · Tally', 'AI copilot + voice', 'Client & vendor portals',
  'Vendor scoring', 'Crosstabs & insights', 'Public API + webhooks', 'SSO + MFA', 'White-label',
  'Android + iOS app',
]

// The "trek": lifecycle checkpoints. icon = lucide-react icon name (see components/Icon.jsx)
export const journey = {
  kicker: 'The trek',
  title: 'From won bid to paid invoice,',
  accent: 'one continuous trail.',
  sub: 'Most teams stitch a project together from a link router, a spreadsheet of quotas, inbox threads and an accounting system. SampTrek is the trail itself: every checkpoint hands its data to the next one.',
  stops: [
    { icon: 'Trophy', color: '#FEE440', title: 'Won bid lands', text: 'Bids won in SampBidx arrive automatically through a signed webhook and prefill a new project.' },
    { icon: 'LayoutTemplate', color: '#FFB86B', title: 'Set up in minutes', text: 'Multi-country projects from templates or a brief, with shared defaults and per-market overrides.' },
    { icon: 'ShieldCheck', color: '#F15BB5', title: 'Guard the gate', text: 'Human check with free captcha, gate survey, prescreener, browser and duplicate checks, consent per market.' },
    { icon: 'Route', color: '#C77DFF', title: 'Route every click', text: 'Hybrid redirect engine with 8 statuses, precedence rules, versioning, scheduled changes and a QA studio.' },
    { icon: 'Gauge', color: '#9B5DE5', title: 'Field on autopilot', text: 'Enforced quota cells, pace alerts and autopilot that pauses or closes links before you overspend.' },
    { icon: 'Scale', color: '#7B4DFF', title: 'Reconcile', text: 'Upload the client ID list, approve or reject completes, and let vendors dispute in their portal.' },
    { icon: 'ReceiptText', color: '#2F6BFF', title: 'Invoice and pay', text: 'Client invoices, vendor bills, tax and FX, with PDF and direct sync to your books.' },
    { icon: 'Sparkles', color: '#0BC5FF', title: 'Learn and repeat', text: 'Analytics, vendor scores and saved views feed the next bid. Save the project as a template.' },
  ],
}

export const showcase = {
  kicker: 'Inside SampTrek',
  title: 'Real screens.',
  accent: 'Nothing mocked up.',
  sub: 'Every image on this page is taken from the working product.',
  tabs: [
    { id: 'cc', label: 'Command center', icon: 'LayoutDashboard', img: 'commandCenter', alt: 'SampTrek command center with lifecycle ring, AI copilot, KPIs, Gantt and Kanban',
      title: 'Your whole business on one screen', points: ['Lifecycle ring from won bid to closure', 'Revenue, cost, profit, clicks and completes for any date range', 'Gantt, Kanban, health radar, markets map and heatmaps', 'Drag, resize and hide widgets per person'] },
    { id: 'project', label: 'Project', icon: 'FolderKanban', img: 'project', alt: 'A multi-country project in SampTrek',
      title: 'One project, every market', points: ['Germany, UK and US under one project', 'Live completes vs target per market', 'Vendors, quotas, monitor, gate, redirects, answers in tabs', 'Full settings history with one-click restore'] },
    { id: 'monitor', label: 'Fieldwork monitor', icon: 'Activity', img: 'monitor', alt: 'Fieldwork monitor with pace alerts and reallocation suggestions',
      title: 'Spot trouble before the client does', points: ['Pace per project, market and vendor', 'Alerts when a project, market or vendor falls behind', 'Quota reallocation suggestions, applied in one click', 'Signed alert webhooks to your own tools'] },
    { id: 'analytics', label: 'Analytics', icon: 'ChartPie', img: 'analytics', alt: 'Reporting and analytics dashboard',
      title: 'Insights while you are still in field', points: ['Crosstabs of gate and prescreen answers', 'Outcome by market, vendor and device', 'Plain-language, rule-based insights', 'Clean-data CSV for deliverables'] },
    { id: 'dp', label: 'Data processing', icon: 'Workflow', img: 'dataProcessing', alt: 'Data processing pipeline',
      title: 'A visible data pipeline', points: ['Intake, validation, quality and review stages', 'Quota balance and billing readiness', 'Vendor quality side by side', 'Export clean data as CSV'] },
    { id: 'reports', label: 'Reports', icon: 'ChartColumn', img: 'reports', alt: 'Reports with filters and charts',
      title: 'Reports that send themselves', points: ['Overall, conversion, client, vendor and click reports', 'Saved private or shared views', 'PDF and CSV in your reporting currency', 'Scheduled emails to anyone'] },
    { id: 'invoices', label: 'Finance', icon: 'Wallet', img: 'invoices', alt: 'Client invoices list',
      title: 'Money that matches the fieldwork', points: ['Invoices straight from reconciled completes', 'Vendor payables and bills with tax', 'Manual FX rates and reporting-currency totals', 'Sync with Zoho Books, Xero, QuickBooks Online and Tally'] },
    { id: 'portal', label: 'Vendor portal', icon: 'Users', img: 'vendorPortal', alt: 'Vendor portal showing links and payouts',
      title: 'Portals your partners will actually use', points: ['Vendors see links, respondents, payouts and statements', 'Clients see their projects, spend and invoices', 'Requests, disputes and shared files in one thread', 'Never shows client prices to vendors'] },
    { id: 'board', label: 'Project board', icon: 'Columns3', img: 'projectBoard', alt: 'Project board Kanban',
      title: 'See every project move', points: ['Kanban by stage from setup to invoiced', 'Health radar per project', 'Timeline view for the whole team', 'Search anything with Ctrl K'] },
    { id: 'integrations', label: 'Integrations', icon: 'Plug', img: 'integrations', alt: 'Integrations settings',
      title: 'Connected from the screen, not the server', points: ['Email, SSO, AI, accounting and push set up in Settings', 'Secrets stored encrypted', 'No developer needed to switch providers'] },
  ],
}

// Bento feature grid. `demo` picks a live mini-animation in sections/Features.jsx
export const features = {
  kicker: 'Capabilities',
  title: 'Everything fieldwork needs.',
  accent: 'Built in, not bolted on.',
  items: [
    { demo: 'redirect', size: 'wide', grade: 'violet', icon: 'Route', title: 'Hybrid redirect engine', text: '8 statuses with UID, vendor ID and country code. Rules by vendor + country, vendor, country, project, client template or org default. Versioning, rollback, scheduled activation, API destinations, redirect health and a visual diagram.' },
    { demo: 'quota', size: 'tall', grade: 'sunset', icon: 'ChartBarStacked', title: 'Quotas enforced at the door', text: 'Cells by market, device and gate or prescreen answers, interlocking. A full cell stops entries before the survey, so you do not pay for overquota completes.' },
    { demo: 'links', size: 'normal', grade: 'pink', icon: 'Link2', title: 'Unique single-use links', text: 'Up to 50,000 random-key links per vendor and market. One open, one respondent. Reuse lands on the duplicate page.' },
    { demo: 'shield', size: 'normal', grade: 'cyan', icon: 'ShieldCheck', title: 'Gate security, free captcha', text: 'Built-in checks, Cloudflare Turnstile or hCaptcha. No paid captcha, no per-check fees. Gate survey, prescreener, browser and duplicate checks.' },
    { demo: 'autopilot', size: 'wide', grade: 'lime', icon: 'Gauge', title: 'Fieldwork autopilot', text: 'Pace tracking per market and vendor, alerts, and autopilot rules that pause or close links. One-click quota reallocation suggestions.' },
    { demo: 'copilot', size: 'normal', grade: 'violet', icon: 'Bot', title: 'AI copilot with voice', text: 'Ask about pace, completes or unpaid invoices by text or voice. Every action asks before it runs and is written to the audit log.' },
    { demo: 'ledger', size: 'normal', grade: 'sunset', icon: 'Landmark', title: 'Finance + accounting sync', text: 'Reconciliation, invoices, vendor bills, tax, FX. Direct sync to Zoho Books, Xero, QuickBooks Online and Tally Prime.' },
    { demo: 'score', size: 'normal', grade: 'pink', icon: 'Award', title: 'Vendor scoring', text: '0 to 100 and A to D grades from real delivery history, capacity per market, and ranked suggestions with reasons.' },
    { demo: 'portals', size: 'normal', grade: 'cyan', icon: 'MessagesSquare', title: 'Client + vendor portals', text: 'Requests and tickets, rejected-complete disputes, shared files, compliance documents with expiry, quotes per market.' },
    { demo: 'api', size: 'wide', grade: 'ink', icon: 'Braces', title: 'Public API + signed webhooks', text: 'Scoped, hashed API keys, an OpenAPI description and signed event webhooks with retries. Your data is yours to move.' },
    { demo: 'theme', size: 'normal', grade: 'rainbow', icon: 'Palette', title: 'White-label + Theme Studio', text: 'Your name, logos, colours and custom domain. Light, dark and designer themes for every user.' },
    { demo: 'privacy', size: 'normal', grade: 'lime', icon: 'Fingerprint', title: 'Security + privacy', text: 'SSO with Google, Microsoft and Zoho, authenticator MFA, roles, audit log, retention rules and erasure by panel UID.' },
  ],
}

export const globe = {
  kicker: 'Multi-country by design',
  title: 'One project.',
  accent: 'Every market.',
  sub: 'Run Germany, the UK and the US as one project with shared defaults and per-market overrides. Money is kept in each market currency and converted to your reporting currency in every report.',
  points: [
    { icon: 'Globe2', title: 'Per-market overrides', text: 'Targets, CPI, links, quotas and consent text per market.' },
    { icon: 'Coins', title: 'Every currency', text: 'Market currencies with manual FX rates and reporting totals.' },
    { icon: 'Map', title: 'Markets world map', text: 'Completes, revenue and conversion on a live map.' },
    { icon: 'Warehouse', title: 'Vendor capacity', text: 'What each vendor can still deliver, per market.' },
  ],
}

export const why = {
  kicker: 'Why SampTrek',
  title: 'Built by fieldwork people,',
  accent: 'for fieldwork people.',
  sub: 'Flip the switch to see the difference between the usual patchwork of tools and one platform built around the research project.',
  before: [
    { t: 'Link router', d: 'Redirects live in one tool, quotas in a spreadsheet.' },
    { t: 'Overquota surprises', d: 'Cells are checked after the complete is paid for.' },
    { t: 'Manual checks', d: 'Someone watches pace and pauses vendors by hand.' },
    { t: 'Re-keying money', d: 'Completes are retyped into invoices and the books.' },
    { t: 'Email threads', d: 'Vendor disputes and client files scattered in inboxes.' },
    { t: 'Paid captcha', d: 'Per-check fees grow with every respondent.' },
  ],
  after: [
    { t: 'One trail', d: 'Bid, setup, gate, redirects, quotas, finance in one project.' },
    { t: 'Quotas at the door', d: 'Full cells stop entries before the survey starts.' },
    { t: 'Autopilot', d: 'Pace alerts pause or close links on your rules.' },
    { t: 'Books in sync', d: 'Reconciled completes become invoices and sync to your books.' },
    { t: 'Portals', d: 'Requests, disputes and files live with the project.' },
    { t: 'Free captcha only', d: 'Built-in checks, Turnstile or hCaptcha: no per-check fee.' },
  ],
  pillars: [
    { n: '01', title: 'Fieldwork-first data model', text: 'Markets, vendors, quotas, statuses and money are first-class, not custom fields in a generic PM tool.' },
    { n: '02', title: 'Enforced, not reported', text: 'Quotas, security and pace are enforced at the moment a respondent clicks, not found in tomorrow\'s report.' },
    { n: '03', title: 'Money closes the loop', text: 'The same completes drive reconciliation, invoices, vendor bills and your accounting sync.' },
    { n: '04', title: 'AI that asks first', text: 'The copilot proposes, you confirm, the audit log remembers. Admins set limits.' },
    { n: '05', title: 'Yours to brand and extend', text: 'White-label with your own domain, a public API and signed webhooks.' },
    { n: '06', title: 'Set up in the UI', text: 'Email, SSO, AI, accounting and push are connected from Settings, not server files.' },
  ],
}

export const mobile = {
  kicker: 'In your pocket',
  title: 'Fieldwork does not',
  accent: 'wait for a laptop.',
  sub: 'The SampTrek app for Android and iOS brings the command center, projects, fieldwork alerts and the AI copilot with voice to your phone. Sign in with Google, Microsoft or Zoho and get push alerts the moment a quota fills.',
  toasts: [
    { tone: 'green', text: 'Quota full · UK · Mobile' },
    { tone: 'pink', text: 'Autopilot paused Vendor B' },
    { tone: 'yellow', text: 'Invoice INV-0042 paid' },
    { tone: 'cyan', text: '“Show today\'s completes”' },
  ],
  bullets: ['Android + iOS', 'Single sign-on', 'Push alerts', 'Voice copilot'],
}

export const trust = [
  { icon: 'KeyRound', title: 'Single sign-on', text: 'Google, Microsoft and Zoho' },
  { icon: 'Smartphone', title: 'Authenticator MFA', text: 'With recovery codes, enforceable by admin' },
  { icon: 'ScrollText', title: 'Audit log', text: 'Every change and AI action recorded' },
  { icon: 'Lock', title: 'Encrypted secrets', text: 'Integration keys never stored in plain text' },
  { icon: 'EyeOff', title: 'Privacy controls', text: 'Retention, consent per market, erasure' },
  { icon: 'UserCog', title: 'Roles + teams', text: 'Invite, deactivate, sign out everywhere' },
]

export const cta = {
  title: 'Put your next project',
  accent: 'on track.',
  sub: 'See SampTrek with your own projects, markets and vendors.',
  primary: 'Book a demo',
  secondary: 'Sign in',
}
