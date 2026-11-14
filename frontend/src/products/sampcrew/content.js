/*
 * All page copy, links and screenshot choices live here so the marketing and
 * web teams can change wording without touching components.
 *
 * Claims about SampCrew are taken from the product's own release notes.
 * Claims about "typical" tools are deliberately general: no competitor is named.
 */
import home from './assets/screens/home.webp';
import homelight from './assets/screens/homelight.webp';
import analytics from './assets/screens/analytics.webp';
import employees from './assets/screens/employees.webp';
import profile from './assets/screens/profile.webp';
import leave from './assets/screens/leave.webp';
import attendance from './assets/screens/attendance.webp';
import roster from './assets/screens/roster.webp';
import recruitment from './assets/screens/recruitment.webp';
import compare from './assets/screens/compare.webp';
import candidate from './assets/screens/candidate.webp';
import ats from './assets/screens/ats.webp';
import bids from './assets/screens/bids.webp';
import bid from './assets/screens/bid.webp';
import payroll from './assets/screens/payroll.webp';
import payrollrun from './assets/screens/payrollrun.webp';
import payslip from './assets/screens/payslip.webp';
import reviews from './assets/screens/reviews.webp';
import learning from './assets/screens/learning.webp';
import recognition from './assets/screens/recognition.webp';
import helpdesk from './assets/screens/helpdesk.webp';
import attrition from './assets/screens/attrition.webp';
import universe from './assets/screens/universe.webp';
import automation from './assets/screens/automation.webp';
import automationrun from './assets/screens/automationrun.webp';
import appearance from './assets/screens/appearance.webp';
import integrationsShot from './assets/screens/integrations.webp';
import security from './assets/screens/security.webp';
import privacy from './assets/screens/privacy.webp';
import themes from './assets/screens/themes.webp';
import iq from './assets/screens/iq.webp';
import globe from './assets/screens/globe.webp';
import skills from './assets/screens/skills.webp';
import scenario from './assets/screens/scenario.webp';
import consoleShot from './assets/screens/console.webp';
import bidslight from './assets/screens/bidslight.webp';
import payrolllight from './assets/screens/payrolllight.webp';
import mHome from './assets/screens/m-home.webp';
import mAttendance from './assets/screens/m-attendance.webp';
import mLeave from './assets/screens/m-leave.webp';
import mAskhr from './assets/screens/m-askhr.webp';
import mApprovals from './assets/screens/m-approvals.webp';
import mPayslip from './assets/screens/m-payslip.webp';
import mMe from './assets/screens/m-me.webp';

export const screens = {
  home, homelight, analytics, employees, profile, leave, attendance, roster, recruitment, compare,
  candidate, ats, bids, bid, payroll, payrollrun, payslip, reviews, learning, recognition, helpdesk,
  attrition, universe, automation, automationrun, appearance, integrations: integrationsShot, security, privacy, themes,
  iq, globe, skills, scenario, console: consoleShot, bidslight, payrolllight, mHome, mAttendance, mLeave, mAskhr, mApprovals, mPayslip, mMe,
};

/* ---------- Links: point these at the real Sampledge pages before going live ---------- */
export const links = {
  demo: '/lets-talk?type=demo&product=SampCrew',
  contact: 'mailto:hello@sampledge.com?subject=SampCrew%20demo',
  sampledge: 'https://sampledge.com',
  signIn: '#',
};

export const nav = [
  { label: 'Platform', href: '#platform' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Mobile', href: '#mobile' },
  { label: 'Why SampCrew', href: '#different' },
  { label: 'Security', href: '#security' },
];

export const hero = {
  eyebrow: 'SampCrew by Sampledge · AI-native workforce platform',
  titleA: 'People,',
  titleB: 'simplified.',
  rotatingPrefix: 'One living system for',
  rotating: ['hiring', 'attendance', 'payroll', 'performance', 'staffing bids', 'your whole crew'],
  sub: 'Hire, pay, schedule, grow and understand your entire workforce in one intelligent platform. Web, iOS and Android, one source of truth.',
  primary: 'Book a live demo',
  secondary: 'Take the tour',
  chips: [
    { k: '₹1.6M', v: 'Payroll finalised, every line explained', tone: 'amber' },
    { k: '100%', v: 'Attendance captured today', tone: 'violet' },
    { k: 'Offer', v: 'Approved in two steps', tone: 'mint' },
    { k: 'IQ', v: '“Show me attrition risk in Sales”', tone: 'pink' },
  ],
};

export const marquee = [
  'Core HR', 'Attendance', 'Biometric devices', 'Shifts & rosters', 'Leave', 'Payroll', 'Expenses',
  'Recruitment', 'ATS board', 'Career site', 'Staffing bids', 'Rate cards', 'Goals & OKRs', 'Reviews & 360',
  'Learning', 'Surveys & eNPS', 'Recognition', 'HR helpdesk', 'Announcements', 'SampCrew IQ',
  'Automation Studio', 'Workforce Universe', 'Attrition insight', 'Mobile app', 'SSO & SCIM', 'Webhooks & API',
];

/* Scattered tools that collapse into one platform in the "convergence" section */
export const scattered = [
  'Spreadsheet of employees', 'Attendance app', 'Payroll workbook', 'Job board inbox', 'Interview notes',
  'Leave by email', 'Bid calculator', 'Survey tool', 'HR inbox', 'Chat-group announcements',
  'Training tracker', 'Separate analytics',
];

export const stats = [
  { n: 25, suffix: '+', label: 'capabilities in one platform' },
  { n: 3, suffix: '', label: 'apps: Web, iOS & Android, Super Admin' },
  { n: 13, suffix: '', label: 'theme presets, light & dark' },
  { n: 12, suffix: '', label: 'system roles plus your own' },
  { n: 1, suffix: '', label: 'tamper-evident audit trail' },
];

/* The interactive "platform orbit": each module with its colour, screenshot and proof points */
export const modules = [
  {
    id: 'core', name: 'Core HR', icon: 'users', color: '#8B5CF6',
    title: 'Every person, every change, on record',
    text: 'Effective-dated employee records with job history, transfers, probation and exits. A seven-step guided hire that checks for duplicates and saves a draft at every step.',
    points: ['Employee 360 strip and activity timeline', 'Saved table views and Excel export', 'Onboarding checklists and documents'],
    img: 'profile',
  },
  {
    id: 'attendance', name: 'Attendance', icon: 'finger', color: '#14B8A6',
    title: 'Punches you can explain, from any door',
    text: 'Raw punches are never edited; an explainable engine turns them into days. Web punching with geofences, rotating QR kiosks and ZKTeco or eSSL biometric devices.',
    points: ['Shifts, rosters and same-day swaps', 'Corrections and overtime through approvals', 'Payroll period locks'],
    img: 'attendance',
  },
  {
    id: 'leave', name: 'Leave', icon: 'sun', color: '#F59E0B',
    title: 'Balances that always add up',
    text: 'Leave types, policies and holiday calendars with ledger-based balances, idempotent accrual, a live preview before you apply and a clean year-end close.',
    points: ['Multi-step approvals engine', 'Apply and approve from the phone', 'Team calendar view'],
    img: 'leave',
  },
  {
    id: 'payroll', name: 'Payroll', icon: 'wallet', color: '#F97316',
    title: 'Payroll with a reason for every rupee',
    text: 'An exact-decimal payroll engine for India that explains every amount. Loss of pay flows in from attendance and leave, a second person approves, and the run is frozen on finalise.',
    points: ['Checks against each person’s earlier months', 'Payslips, register and audited bank file', 'Expense claims reimbursed through payroll'],
    img: 'payrollrun',
  },
  {
    id: 'recruit', name: 'Recruitment', icon: 'search', color: '#EC4899',
    title: 'From requisition to first day, one flow',
    text: 'Approved requisitions, a public career site, a drag-and-drop ATS board, independent scorecards, two-step offer approval and hiring straight into Core HR.',
    points: ['Compare 2 to 4 candidates side by side', 'Bulk move, email or reject', 'Consent, erasure and retention built in'],
    img: 'recruitment',
  },
  {
    id: 'bids', name: 'Staffing bids', icon: 'doc', color: '#2F6BFF',
    title: 'Price, approve and win staffing deals',
    text: 'Quick or Advanced Bids with live, exact cost, margin and contract value. Finance approves, clients get a branded PDF and accept online from a private link.',
    points: ['Client rate cards flag lines below the card', 'Scheduled sending, every version kept', 'Pipeline and win rate'],
    img: 'bid',
  },
  {
    id: 'talent', name: 'Performance', icon: 'target', color: '#22C55E',
    title: 'Growth that people can see',
    text: 'Goals with key results and check-ins, review cycles with self, manager and 360 feedback, calibration with recorded reasons, a learning catalogue and a recognition wall.',
    points: ['Anonymous 360 above a safe threshold', 'Always-anonymous surveys with eNPS', 'Learning paths with expiry'],
    img: 'reviews',
  },
  {
    id: 'helpdesk', name: 'HR helpdesk', icon: 'chat', color: '#06B6D4',
    title: 'Ask HR, and actually hear back',
    text: 'Numbered cases with help-article suggestions, auto-assignment, priority-scaled response targets, ratings and confidential categories that managers never see.',
    points: ['Announcements with read receipts', 'Acknowledgements you can prove', 'Internal notes for HR'],
    img: 'helpdesk',
  },
  {
    id: 'automation', name: 'Automation', icon: 'bolt', color: '#A855F7',
    title: 'Workflows that run themselves',
    text: 'Automation Studio: triggers, conditions, waits, approvals, notifications and course assignment. Draft a workflow with AI, test it, and watch every run step by step.',
    points: ['Immutable, tested versions', 'Durable runs with retries', 'Post to Slack or any webhook'],
    img: 'automationrun',
  },
  {
    id: 'insights', name: 'Insights', icon: 'chart', color: '#FB7185',
    title: 'See risk before it becomes a resignation',
    text: 'HR analytics, a rule-based attrition risk score with named signals for HR only, and live, permission-scoped dashboards for every module.',
    points: ['Workforce trends by department', 'Signals you can read, not a black box', 'Dashboards that respect access rules'],
    img: 'attrition',
  },
];

/* Deep-dive story blocks */
export const universeCopy = {
  kicker: 'Workforce Universe',
  title: 'Your organisation, as a universe you can fly through.',
  text: 'Departments sized by headcount, people orbiting their teams, and reporting lines that cross departments. Scrub the timeline to replay joiners, moves and leavers month by month from real job history. Then switch to the globe, the skills network, the recruitment flow or headcount scenarios.',
  bullets: ['3D map with an accessible 2D table', 'Locations globe with coastlines', 'Skills network that finds people for jobs', 'Scenarios that raise draft requisitions'],
};

export const iqCopy = {
  kicker: 'SampCrew IQ',
  title: 'Ask your workforce anything. Get answers with receipts.',
  text: 'Press Ctrl+J and ask in plain words. IQ answers only from your own records, inside your access, and shows its sources. It follows up on short questions and opens prefilled bids and requisitions for you.',
  conversation: [
    { who: 'you', text: 'Summarise recruitment this quarter' },
    { who: 'iq', text: '3 applied, 0 hired, 0 rejected in Q4. 3 candidates are in process across 1 open job. Most came from the career site.', source: 'Recruitment · from your records' },
    { who: 'you', text: 'What about Sales?' },
    { who: 'iq', text: 'Sales UK has 2 people today, 1 joined this year and nobody left. No open requisitions.', source: 'People · scoped to what you can see' },
  ],
  guard: ['Answers only from your records', 'Personal identifiers removed before any AI call', 'Every AI call logged for auditors', 'Per-workspace switches and monthly credits'],
};

export const payrollLines = [
  { label: 'Basic', amount: 42000, why: 'Salary structure “Plant Staff”, effective 1 Apr' },
  { label: 'House rent allowance', amount: 16800, why: '40% of Basic, as set for this legal entity' },
  { label: 'Overtime', amount: 3150, why: '7 approved overtime hours from attendance' },
  { label: 'Loss of pay', amount: -2800, why: '1 unpaid leave day, Oct 14, from the leave ledger' },
  { label: 'Provident fund', amount: -1800, why: 'Statutory setting reviewed by your payroll team' },
];

export const attendanceModes = [
  { name: 'Biometric devices', note: 'ZKTeco and eSSL push devices, with live status', icon: 'finger' },
  { name: 'Geofenced web punch', note: 'Location-aware, per site', icon: 'pin' },
  { name: 'Rotating QR kiosk', note: 'A code that changes so it cannot be shared', icon: 'qr' },
  { name: 'Offline mobile punch', note: 'Queued offline, keeps the original time', icon: 'phone' },
];

export const mobileCopy = {
  kicker: 'SampCrew mobile',
  title: 'The whole crew, in every pocket.',
  text: 'One app for iOS and Android, for employees and managers. Two-step sign-in, fingerprint or face unlock, and the same theme people choose on the web.',
  features: [
    { t: 'Punch in, even offline', d: 'The queue keeps the original time and flags clock changes.' },
    { t: 'Leave in three taps', d: 'Live balance preview before you apply.' },
    { t: 'Approve on the move', d: 'Managers clear requests from the home screen.' },
    { t: 'Ask HR', d: 'Open a case, see answers and help articles.' },
    { t: 'Payslips', d: 'Every month, every line, in your pocket.' },
    { t: 'Announcements', d: 'Read, acknowledge, done.' },
  ],
};

/* "How we are different": general, defensible comparisons. No competitor named. */
export const differentiators = [
  { icon: 'layers', title: 'One system, not a stack', text: 'HR, attendance, payroll, recruitment, staffing bids, performance and helpdesk share one database and one set of permissions. No sync jobs, no copy-paste between tools.' },
  { icon: 'eye', title: 'Explainable by design', text: 'Attendance days, payroll amounts and attrition risk each show why. Your teams can defend every number to an employee or an auditor.' },
  { icon: 'doc', title: 'Built for staffing firms too', text: 'Staffing bids, client rate cards, Finance approval and online client acceptance live next to recruitment. Many HR suites stop at hiring.' },
  { icon: 'spark', title: 'AI with receipts', text: 'SampCrew IQ answers only from your own records, inside each person’s access, with sources. Personal identifiers are removed before any AI call.' },
  { icon: 'factory', title: 'Made for the shop floor', text: 'Biometric devices, rotating QR kiosks, geofences, rosters and offline mobile punching for shift-based and plant workforces, not only desk teams.' },
  { icon: 'palette', title: 'Yours to style', text: '13 theme presets in light and dark, your own colours, density and motion settings, saved per person and shared between web and mobile.' },
];

export const comparison = {
  cols: ['Typical stitched-together HR stack', 'SampCrew'],
  rows: [
    ['Where employee data lives', 'Copied across several tools', 'One record, effective-dated'],
    ['Payroll questions', 'Exported to a spreadsheet to explain', 'Every amount explained in the run'],
    ['Attendance on the floor', 'Separate device software', 'Devices, QR kiosk, geofence and mobile in one'],
    ['Staffing proposals', 'Spreadsheets and email', 'Priced live, approved, accepted online'],
    ['AI answers', 'Generic chat, unclear sources', 'Your records only, with sources, logged'],
    ['Audit', 'Logs per tool, editable', 'One tamper-evident trail with an integrity check'],
    ['Employees', 'Several apps and passwords', 'One app on web, iOS and Android'],
  ],
};

export const securityLayers = [
  { t: 'Row-Level Security', d: 'Every query is isolated per workspace inside PostgreSQL itself.' },
  { t: 'Two-step sign-in', d: 'TOTP MFA, required for payroll, plus refresh-token rotation.' },
  { t: 'Single sign-on', d: 'SAML 2.0 and OpenID Connect, on web and mobile.' },
  { t: 'SCIM 2.0', d: 'Provision users and map groups to roles automatically.' },
  { t: 'Tamper-evident audit', d: 'A hash-chained trail with an integrity check.' },
  { t: 'Privacy by default', d: 'Data export, erasure and retention schedules built in.' },
  { t: 'Signed webhooks', d: 'HMAC-SHA256 signatures, retries and a delivery log.' },
  { t: 'Support access by consent', d: 'Sampledge staff see a workspace only after the customer approves.' },
];

export const securityNote = 'SOC 2 and ISO 27001 controls are mapped for readiness; SampCrew does not claim certification.';

export const themePresets = [
  { name: 'Midnight', a: '#6366F1', b: '#8B5CF6', bg: '#0B0B1E' },
  { name: 'Aurora', a: '#14B8A6', b: '#8B5CF6', bg: '#071A1E' },
  { name: 'Executive', a: '#2563EB', b: '#7C3AED', bg: '#0A1022' },
  { name: 'Graphite', a: '#64748B', b: '#94A3B8', bg: '#111317' },
  { name: 'Oceanic', a: '#0EA5E9', b: '#2563EB', bg: '#061624' },
  { name: 'Emerald', a: '#10B981', b: '#14B8A6', bg: '#06180F' },
  { name: 'Royal', a: '#7C3AED', b: '#C026D3', bg: '#140A24' },
  { name: 'Sunset', a: '#F97316', b: '#EC4899', bg: '#1E0D10' },
  { name: 'Arctic', a: '#38BDF8', b: '#22D3EE', bg: '#0A1520' },
  { name: 'Copper', a: '#D97706', b: '#B45309', bg: '#1A1208' },
  { name: 'Rose', a: '#F43F5E', b: '#FB7185', bg: '#1E0A12' },
  { name: 'Monochrome', a: '#A3A3A3', b: '#525252', bg: '#0F0F0F' },
  { name: 'Cyber', a: '#F472B6', b: '#22D3EE', bg: '#0A0618' },
];

export const integrations = {
  live: ['REST API keys', 'OpenAPI 3.1', 'Signed webhooks', 'Slack', 'SAML 2.0', 'OpenID Connect', 'SCIM 2.0', 'ZKTeco', 'eSSL', 'Excel export', 'SMTP email', 'Expo push'],
  planned: ['Microsoft Teams', 'Google Workspace', 'Microsoft 365', 'WhatsApp', 'SMS', 'Accounting', 'Job boards'],
};

export const audiences = [
  { id: 'hr', name: 'HR leaders', text: 'One source of truth for people, policies and approvals, with dashboards that answer the board’s questions before they are asked.', img: 'analytics' },
  { id: 'staffing', name: 'Staffing firms', text: 'Recruit, price bids against client rate cards, get Finance sign-off and let clients accept online, then hire straight into HR and payroll.', img: 'bids' },
  { id: 'ops', name: 'Plant & shift ops', text: 'Biometric devices, rosters, swaps and overtime that flow into payroll, with a live view of who is in today.', img: 'roster' },
  { id: 'finance', name: 'Finance & payroll', text: 'Exact-decimal runs, two-person approval, a frozen record after finalise and checks against each person’s history.', img: 'payroll' },
  { id: 'people', name: 'Employees & managers', text: 'Leave, payslips, approvals, Ask HR, goals and recognition, beautifully, on any device.', img: 'home' },
];

export const gallery = [
  { img: 'home', cap: 'Home dashboard' },
  { img: 'analytics', cap: 'HR analytics' },
  { img: 'employees', cap: 'Employee directory' },
  { img: 'universe', cap: 'Workforce Universe' },
  { img: 'globe', cap: 'Locations globe' },
  { img: 'skills', cap: 'Skills network' },
  { img: 'scenario', cap: 'Headcount scenarios' },
  { img: 'ats', cap: 'ATS board' },
  { img: 'compare', cap: 'Candidate comparison' },
  { img: 'bids', cap: 'Staffing bids' },
  { img: 'payslip', cap: 'Payslip' },
  { img: 'learning', cap: 'Learning' },
  { img: 'recognition', cap: 'Recognition wall' },
  { img: 'automation', cap: 'Automation Studio' },
  { img: 'themes', cap: 'Themes & templates' },
  { img: 'integrations', cap: 'Integrations' },
  { img: 'privacy', cap: 'Privacy requests' },
  { img: 'homelight', cap: 'Light mode' },
  { img: 'payrolllight', cap: 'Payroll, light mode' },
  { img: 'bidslight', cap: 'Staffing bids, light mode' },
  { img: 'console', cap: 'Sampledge Super Admin console' },
];

export const finalCta = {
  title: 'Bring your whole crew into one place.',
  text: 'See SampCrew with your own org chart, your own policies and your own payroll rules in a 30-minute walkthrough.',
  primary: 'Book a live demo',
  secondary: 'Talk to Sampledge',
};

export const footnote = 'Screens show a fictional demo workspace. All people, companies and figures are sample data. Integrations marked “planned” are on the roadmap and not yet available.';
