// ─────────────────────────────────────────────────────────────────────────────
// All words, links and numbers on the page live here.
// Edit this file to change copy; the components only lay it out.
// ─────────────────────────────────────────────────────────────────────────────
import dash from './assets/shots/dash.webp';
import dashLight from './assets/shots/dash-light.webp';
import sa from './assets/shots/sa.webp';
import saPlans from './assets/shots/sa-plans.webp';
import saAuto from './assets/shots/sa-auto.webp';
import rfqs from './assets/shots/rfqs.webp';
import bids from './assets/shots/bids.webp';
import bidLight from './assets/shots/bid-light.webp';
import approvalRules from './assets/shots/approval-rules.webp';
import vendors from './assets/shots/vendors.webp';
import ratecard from './assets/shots/ratecard.webp';
import reports from './assets/shots/reports.webp';
import pm from './assets/shots/pm.webp';
import ai from './assets/shots/ai.webp';
import workflows from './assets/shots/workflows.webp';
import terms from './assets/shots/terms.webp';
import appearance from './assets/shots/appearance.webp';
import outreach from './assets/shots/outreach.webp';
import integrations from './assets/shots/integrations.webp';
import activity from './assets/shots/activity.webp';
import clients from './assets/shots/clients.webp';
import newbid from './assets/shots/newbid.webp';
import projects from './assets/shots/projects.webp';
import globe from './assets/shots/globe.webp';
import mBids from './assets/shots/m-bids.webp';
import mStatus from './assets/shots/m-status.webp';
import mApprove from './assets/shots/m-approve.webp';

export const shots = {
  dash, dashLight, sa, saPlans, saAuto, rfqs, bids, bidLight, approvalRules, vendors, ratecard, reports,
  pm, ai, workflows, terms, appearance, outreach, integrations, activity, clients, newbid, projects, globe,
  mBids, mStatus, mApprove,
};

// Where the "Book a demo" buttons go. On the main Sampledge site, point this at the real contact page.
export const CONFIG = {
  demoUrl: '/lets-talk?type=demo&product=SampBidx',
  signInUrl: '/login',
};

export const NAV = [
  { label: 'How it works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Global', href: '#global' },
  { label: 'Why SampBidx', href: '#compare' },
  { label: 'Mobile', href: '#mobile' },
];

export const HERO = {
  eyebrow: 'The bid desk for market research',
  lines: ['Paste the spec.', 'Win the study.'],
  rotating: ['Price 246 countries.', 'Route the approvals.', 'Split it across vendors.', 'Send the proposal.'],
  sub: 'SampBidx turns a client’s RFQ into a priced, approved, ready-to-send proposal. CPI for every market from your own rate cards, vendor costs and margins, approvals and follow-ups, on web and mobile.',
  primary: 'Book a demo',
  secondary: 'See how a bid moves',
  stats: [
    { value: 246, suffix: '', label: 'countries & territories' },
    { value: 14, suffix: '', label: 'service types, each with its own terms' },
    { value: 6, suffix: '', label: 'stages from RFQ to won project' },
    { value: 3, suffix: '', label: 'platforms: web, iOS, Android' },
  ],
};

export const TICKER = [
  'RFQ inbox', 'Rate cards by LOI × IR', 'CPI per market', 'Feasibility', 'Vendor quotes', 'Vendor split',
  'Purchase orders', 'Approval matrix', 'Per-service terms', 'PDF · Word · Excel', 'Client portal', 'Vendor portal',
  'Follow-up sequences', 'Revised quotes', 'Forecast', 'Workflow builder', 'Activity log + undo', 'Theme Studio',
  'Super Admin', 'SSO + two-step sign-in', 'Biometric mobile', 'Offline drafts',
];

// The "paste specs" live demo in the second section. All figures are examples.
export const SPECS_DEMO = {
  title: ['Paste the brief.', 'Get the bid.'],
  sub: 'Drop a client’s email or RFQ into the inbox. SampBidx finds the markets, sample sizes, LOI, incidence and services, prices each line from your rate cards and drafts the client questions with suggested replies. Nothing goes out until you confirm it.',
  email: `Hi team,
Can you quote a B2B study with IT decision makers?
US n=300, Germany n=200, Japan n=150.
LOI 15 min, IR 30%.
We need questionnaire programming and translation into German and Japanese.
Can you confirm feasibility and turnaround?`,
  markets: [
    { code: 'US', name: 'United States', n: 300, cpi: 6.35 },
    { code: 'DE', name: 'Germany', n: 200, cpi: 7.9 },
    { code: 'JP', name: 'Japan', n: 150, cpi: 11.4 },
  ],
  fields: [
    { k: 'LOI', v: '15 min' },
    { k: 'Incidence', v: '30%' },
    { k: 'Audience', v: 'IT decision makers' },
    { k: 'Services', v: 'Programming · Translation × 2 · Sample' },
  ],
  extras: [
    { name: 'Questionnaire programming', amount: 750 },
    { name: 'Translation · German, Japanese', amount: 640 },
  ],
  questions: [
    { q: 'Can you confirm feasibility in each market?', a: 'Yes. All three markets are feasible at the stated LOI and incidence.' },
    { q: 'What is your turnaround?', a: 'About 4 working days to field, then 1–2 days to data.' },
  ],
  note: 'Example figures. Reads specs with built-in rules today, with AI extraction when you switch it on.',
};

// "How a bid moves": the six stages shown in the product's own lifecycle bar.
export const JOURNEY = [
  { key: 'rfq', title: 'RFQ capture', body: 'Every request lands in one inbox, from a pasted brief, an uploaded file or a forwarded email. Each RFQ gets a number, an owner and a due date.', img: 'rfqs', tags: ['Paste or upload', 'Owner & due date', 'Specs to draft'] },
  { key: 'price', title: 'Planning & pricing', body: 'Pick markets from 246 countries, set N, LOI and incidence, and SampBidx reads the CPI from the right rate card. Add services, vendor costs and fees, and watch margin update live.', img: 'newbid', tags: ['Rate cards', 'Live margin', 'FX by bid'] },
  { key: 'proposal', title: 'Proposal creation', body: 'One click builds a branded proposal as PDF, Word or Excel, with the terms and payment terms for each service on the bid already in place.', img: 'terms', tags: ['PDF · Word · Excel', 'Per-service terms', 'Your branding'] },
  { key: 'review', title: 'Review & approval', body: 'Rules decide who signs off: by bid value, by margin, below the price floor. Approvers get a push on their phone and decide in one tap.', img: 'approvalRules', tags: ['Approval matrix', 'Mobile approve', 'Full history'] },
  { key: 'submit', title: 'Submission & tracking', body: 'Send from your own mailbox, schedule it for the client’s morning, and let follow-ups run until the client replies. Revised quotes keep every version.', img: 'outreach', tags: ['Scheduled send', 'Follow-ups stop on reply', 'Revisions'] },
  { key: 'win', title: 'Win & project', body: 'A won bid becomes a project with milestones, budget and vendor POs. Reports and forecast show win rate, pipeline and margin by client, market and person.', img: 'projects', tags: ['Projects', 'Vendor POs', 'Forecast'] },
];

// Feature bento. size: 'xl' | 'lg' | 'md' (align: 'right' puts an xl card on the right). img is a key from `shots` (optional). icon is a lucide icon name.
export const FEATURES = [
  { size: 'xl', icon: 'Grid3x3', tone: 'amber', title: 'Rate cards for 246 countries', body: 'CPI by LOI band and incidence band for every market, versioned, so an old bid keeps the price it was quoted at.', img: 'ratecard' },
  { size: 'lg', icon: 'ShieldCheck', tone: 'rose', title: 'Approval matrix', body: 'Sign-off rules by value, margin and price floor. Approve or reject from the phone.', img: 'approvalRules' },
  { size: 'md', icon: 'Users', tone: 'violet', title: 'Vendors, split & POs', body: 'Request vendor quotes, split a market across suppliers, use a quote as cost and raise the PO.' },
  { size: 'md', icon: 'Radar', tone: 'cyan', title: 'Feasibility per market', body: 'See which markets can deliver the N at your LOI and incidence before you promise it.' },
  { size: 'lg', icon: 'FileSignature', tone: 'orange', title: 'Terms that follow the service', body: '14 service types, each with its own terms and payment terms, placed on the proposal automatically.', img: 'terms' },
  { size: 'md', icon: 'Layers', tone: 'amber', title: 'Pricing scenarios', body: 'Compare options side by side, with floors and margins checked on every line.' },
  { size: 'md', icon: 'MailCheck', tone: 'rose', title: 'Follow-ups that stop on reply', body: 'Sequences pause on a reply, an opt-out, a bounce or a closed bid.' },
  { size: 'xl', align: 'right', icon: 'LineChart', tone: 'cyan', title: 'Reports & forecast', body: 'Win rate, pipeline, margin and turnaround by client, market and person, with a weighted forecast you can export.', img: 'reports' },
  { size: 'md', icon: 'DoorOpen', tone: 'violet', title: 'Client & vendor portals', body: 'Clients review and accept proposals; vendors send quotes, all through secure links.' },
  { size: 'md', icon: 'Workflow', tone: 'orange', title: 'Workflow builder', body: 'When this happens, do that: assign, notify, remind, without code.' },
  { size: 'md', icon: 'History', tone: 'amber', title: 'Activity log with undo', body: 'Every change is recorded and most can be undone. Archive, never delete.' },
  { size: 'lg', icon: 'Plug', tone: 'cyan', title: 'Connects to your tools', body: 'Gmail, Microsoft 365 or SMTP, Stripe, e-signature, single sign-on, live FX rates and push notifications. Each one stays off until an owner switches it on.' },
  { size: 'lg', icon: 'FileClock', tone: 'rose', title: 'Revised quotes, full history', body: 'Client asked for a new N or one more market? Revise the bid and keep every version, with what changed and who changed it.' },
];

export const GLOBAL = {
  title: ['One price logic.', '246 countries.'],
  sub: 'Every country and territory, grouped by region, searchable by name, ISO code or capital. Paste a list of markets from a client email and SampBidx adds them all. Each bid carries its own currency, FX rate and tax.',
  stats: [
    { value: 246, label: 'countries & territories' },
    { value: 130, label: 'countries with reference VAT rates' },
    { value: 4, label: 'price tiers by market' },
    { value: 1, label: 'pricing engine for web, mobile and PDFs' },
  ],
};

export const COMPARE = {
  title: ['Built for research bids,', 'not bent to fit them.'],
  sub: 'Most research teams bid with spreadsheets and email, or with a general sales tool adapted with custom fields. Here is how that usually compares.',
  cols: ['Spreadsheets + email', 'General CRM / quoting tool', 'SampBidx'],
  // 2 = built in, 1 = partly / with set-up, 0 = not there
  rows: [
    { label: 'Speaks research: N, LOI, incidence, CPI per market', v: [1, 0, 2] },
    { label: 'Panel rate cards by country, versioned', v: [1, 0, 2] },
    { label: 'From a pasted brief to a priced draft', v: [0, 0, 2] },
    { label: 'Feasibility checked per market', v: [0, 0, 2] },
    { label: 'Vendor quotes, split across vendors, POs', v: [1, 1, 2] },
    { label: 'Approval rules by value, margin and floor', v: [0, 1, 2] },
    { label: 'Terms per service placed on the proposal', v: [1, 1, 2] },
    { label: 'Client and vendor portals', v: [0, 1, 2] },
    { label: 'Approve from a phone, even offline', v: [0, 1, 2] },
    { label: 'Every change logged, with undo', v: [0, 1, 2] },
  ],
  footnote: 'Comparison with typical setups, not with any named product. Capabilities vary by tool and by configuration.',
  pillars: [
    { icon: 'FlaskConical', title: 'Made by researchers', body: 'Built by Sampledge around how research agencies and panel companies actually quote: markets, quotas, incidence and length of interview.' },
    { icon: 'Gauge', title: 'Minutes, not afternoons', body: 'The brief becomes a priced draft with client questions already answered. Your team checks and sends.' },
    { icon: 'Scale', title: 'Margin you can defend', body: 'Floors, margins and approvals are checked on every line before a proposal can leave.' },
    { icon: 'Globe2', title: 'Global from day one', body: 'Every market, currency and tax rate, and an app your approvers carry in their pocket.' },
  ],
};

export const SECURITY = {
  title: 'Your prices stay yours.',
  sub: 'Rate cards and margins are the most sensitive numbers a research company has. SampBidx is built to keep them private.',
  items: [
    { icon: 'Database', title: 'Workspace isolation', body: 'Each company’s data is separated inside the database itself, not only in the app.' },
    { icon: 'KeyRound', title: 'Encrypted, write-only keys', body: 'Integration keys are encrypted at rest and can never be read back from the screen.' },
    { icon: 'Fingerprint', title: 'SSO and two-step sign-in', body: 'Single sign-on for your company, authenticator codes, and biometric unlock on mobile.' },
    { icon: 'ScrollText', title: 'Complete audit trail', body: 'Who changed what and when, on every bid, price and setting.' },
    { icon: 'ToggleLeft', title: 'Off until you say so', body: 'Email, payments and AI stay switched off until an owner turns each one on.' },
    { icon: 'UserCog', title: 'Roles you define', body: 'Custom roles decide who sees costs, who prices and who approves.' },
  ],
};

export const MOBILE = {
  title: ['The bid desk', 'in your pocket.'],
  sub: 'Native apps for iOS and Android. Approve a bid from the airport, check where every quote stands, and keep drafting with no signal.',
  points: [
    { icon: 'BellRing', text: 'Push when a bid needs you' },
    { icon: 'Fingerprint', text: 'Face ID and fingerprint unlock' },
    { icon: 'WifiOff', text: 'Offline drafts that sync later' },
    { icon: 'Palette', text: 'Same themes as the web app' },
  ],
};

export const THEMES = {
  title: ['Make it look', 'like your company.'],
  sub: 'Theme Studio ships with ten styles and light, dark or automatic modes. Pick colours, corners and density for each person, or set one brand for the whole workspace. Drag the handle to compare.',
  styles: ['Modern Minimal', 'Premium Glass', 'Soft Neumorphism', 'Futuristic Neon', 'Elegant Corporate', 'Dark Cinematic', '3D Layered', 'Clean Professional', 'Luxury Executive', 'Gradient Intelligence'],
};

export const ADMIN = {
  title: ['One console', 'for every workspace.'],
  sub: 'Super Admin gives Sampledge’s team a control room: switch modules on per workspace and per person, edit plans and country prices, and run automation rules for trials and renewals.',
  tabs: [
    { key: 'sa', label: 'Command center', caption: 'Workspaces, registrations, trials and integrations at a glance.' },
    { key: 'saPlans', label: 'Plans & prices', caption: 'Plans, allowances and modules for web and mobile, with prices by country tier.' },
    { key: 'saAuto', label: 'Automation', caption: 'Eight ready rules for sign-ups, trials, unpaid workspaces and allowances.' },
  ],
};

export const GALLERY = [
  { img: 'dash', label: 'Bidding dashboard' },
  { img: 'bids', label: 'Manage bids' },
  { img: 'bidLight', label: 'Bid with country annex' },
  { img: 'rfqs', label: 'RFQ inbox' },
  { img: 'ratecard', label: 'Rate card editor' },
  { img: 'vendors', label: 'Vendors' },
  { img: 'reports', label: 'Reports & forecast' },
  { img: 'pm', label: 'PM dashboard' },
  { img: 'ai', label: 'AI command center' },
  { img: 'workflows', label: 'Workflows' },
  { img: 'clients', label: 'Clients' },
  { img: 'integrations', label: 'Integrations' },
  { img: 'activity', label: 'Activity log' },
  { img: 'appearance', label: 'Theme Studio' },
  { img: 'globe', label: 'Bid map' },
];

export const CTA = {
  title: ['Bid smart.', 'Win more.'],
  sub: 'See SampBidx with your own markets and rate cards. We’ll set up a workspace and walk your team through a live bid.',
  primary: 'Book a demo',
  secondary: 'Sign in',
};

export const FOOTER = {
  line: 'SampBidx is a product of Sampledge.',
  small: 'Product screens show demo data.',
};
