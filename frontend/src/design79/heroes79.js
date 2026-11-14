/*
 * Build 79 (Kunal, 9 Nov): what each new service hero says and how it looks (design79/SvcHero79.jsx).
 *   TAG    the second line of the headline, under the service name
 *   SCENE  the animated picture: radar · bars · globe · orbit · wave · bubbles · funnel · cards · terminal · shield ·
 *          ledger · coins
 *   PAL    colour families per platform; every service gets its own mix of family colours, light/deep/duo grading
 *          and picture side, so no two heroes look alike.
 */
export const TAG = {
  /* market research */
  "business-panel": "Decision-makers, verified and ready to answer.",
  cati: "Real voices. Every call quality-checked.",
  "consumer-panel": "Millions of real people. One precise sample.",
  "data-processing-and-analytics": "From raw data to the story that matters.",
  "healthcare-panel": "Physicians and patients who truly qualify.",
  "offline-data-collection": "Face to face, wherever your audience lives.",
  "online-data-collection": "Fast fieldwork. Clean data. 55+ markets.",
  "qualitative-research": "Hear the why behind every choice.",
  "quantitative-research": "Numbers you can defend in any boardroom.",
  "reporting-and-insights": "Insights that tell you what to do next.",
  "research-consultancy": "Ask the right question first.",
  "research-design-cycle": "Seven steps from brief to decision.",
  /* digital marketing */
  "b2b-digital-marketing": "Reach the buyers who sign the deals.",
  "content-marketing": "Stories that rank, engage and convert.",
  "digital-analytics-and-reporting": "See what works. Spend where it pays.",
  "digital-marketing-audit": "Find the leaks. Fix the funnel.",
  "digital-marketing-consulting": "A growth plan built on evidence.",
  "e-commerce-marketing": "More carts. Fewer abandons.",
  "email-marketing": "Inbox moments people actually open.",
  "google-ads-ppc": "Every click working for your margin.",
  "influencer-marketing": "Voices your audience already trusts.",
  "landing-page-and-cro": "Turn visitors into customers.",
  "lead-generation": "A steady pipeline of qualified leads.",
  "marketing-automation": "The right message, at the right moment, automatically.",
  "online-reputation-management": "Be the brand people recommend.",
  "performance-marketing": "Pay for results, not promises.",
  "seo-services": "Be found first, by the right people.",
  "social-media-advertising": "Thumb-stopping ads that sell.",
  "social-media-marketing": "Communities that grow and stay.",
  "video-marketing": "Stories in motion that people finish.",
  "whatsapp-marketing": "Conversations that close, one chat at a time.",
  /* IT & development */
  "ai-and-automation-solutions": "Let the busywork run itself.",
  "api-development-and-integration": "Make every system speak the same language.",
  "application-maintenance-and-support": "Always on. Always improving.",
  "cloud-and-devops-services": "Ship faster on infrastructure that scales.",
  "crm-development": "Every customer, every touchpoint, one view.",
  "custom-business-applications": "Software shaped around how you work.",
  "custom-software-development": "Built for your business, not for everyone.",
  "cybersecurity-services": "Find the risk before it finds you.",
  "data-analytics-and-dashboard-development": "Live dashboards for faster decisions.",
  "e-commerce-development": "Stores that load fast and sell more.",
  "erp-development": "One system for the whole operation.",
  "it-consulting": "Technology decisions, made with clarity.",
  "mobile-app-development": "Apps people keep on their home screen.",
  "saas-development": "From idea to subscription-ready product.",
  "software-testing-and-qa": "Catch the bug before your users do.",
  "ui-ux-design": "Complex products that feel simple.",
  "web-application-development": "Powerful web apps, delightfully fast.",
  "website-development": "Websites that work as hard as you do.",
  "website-maintenance-and-support": "Online, secure and performing, every day.",
  /* accounts & finance */
  "accounting-and-bookkeeping-services": "Books in order. Mind at ease.",
  "accounting-and-finance-consulting": "Stronger finance. Smarter growth.",
  "audit-and-compliance-support": "Audit-ready, every single day.",
  "budgeting-and-financial-forecasting": "Plan for every possible future.",
  "business-finance-services": "Finance that fuels your next step.",
  "corporate-finance-advisory": "Capital decisions, made with confidence.",
  "due-diligence-and-financial-analysis": "Know exactly what you are buying.",
  "financial-planning-and-advisory": "See beyond the numbers.",
  "gst-services": "GST filed right, on time, every time.",
  "income-tax-and-itr-filing": "Your return, without the guesswork.",
  "investment-planning": "Put every rupee to work.",
  "mis-and-financial-reporting": "Reports that show the signal.",
  "payroll-services": "Everyone paid right, on time.",
  "startup-and-sme-accounting": "Better books. Room to grow.",
  "tax-planning-and-advisory": "Plan beyond the tax bill.",
  "tds-services": "Every deduction, accounted for.",
  "virtual-cfo-services": "CFO thinking, without the full-time cost.",
};

/* the animated picture of each service, picked from what the service is about (30 kinds; SvcHero79.jsx Scene) */
export const SCENE = {
  /* market research */
  "business-panel": "people", cati: "wave", "consumer-panel": "sample", "data-processing-and-analytics": "matrix",
  "healthcare-panel": "pulse", "offline-data-collection": "map", "online-data-collection": "globe", "qualitative-research": "quotes",
  "quantitative-research": "bars", "reporting-and-insights": "slides", "research-consultancy": "radar", "research-design-cycle": "orbit",
  /* digital marketing */
  "b2b-digital-marketing": "nodes", "content-marketing": "cards", "digital-analytics-and-reporting": "gauge", "digital-marketing-audit": "scan",
  "digital-marketing-consulting": "chess", "e-commerce-marketing": "cart", "email-marketing": "mail", "google-ads-ppc": "funnel",
  "influencer-marketing": "creator", "landing-page-and-cro": "browser", "lead-generation": "magnet", "marketing-automation": "flow",
  "online-reputation-management": "stars", "performance-marketing": "rocket", "seo-services": "search", "social-media-advertising": "phone",
  "social-media-marketing": "bubbles", "video-marketing": "reel", "whatsapp-marketing": "chat",
  /* IT & development */
  "ai-and-automation-solutions": "brain", "api-development-and-integration": "sockets", "application-maintenance-and-support": "status",
  "cloud-and-devops-services": "cloud", "crm-development": "contacts", "custom-business-applications": "blocks",
  "custom-software-development": "terminal", "cybersecurity-services": "lock", "data-analytics-and-dashboard-development": "dash",
  "e-commerce-development": "store", "erp-development": "gears", "it-consulting": "roadmap", "mobile-app-development": "devices",
  "saas-development": "stack", "software-testing-and-qa": "bugs", "ui-ux-design": "wire", "web-application-development": "windows",
  "website-development": "build", "website-maintenance-and-support": "wrench",
  /* accounts & finance */
  "accounting-and-bookkeeping-services": "ledger", "accounting-and-finance-consulting": "compass", "audit-and-compliance-support": "shield",
  "budgeting-and-financial-forecasting": "forecast", "business-finance-services": "bank", "corporate-finance-advisory": "scale",
  "due-diligence-and-financial-analysis": "docs", "financial-planning-and-advisory": "path", "gst-services": "calendar",
  "income-tax-and-itr-filing": "form", "investment-planning": "coins", "mis-and-financial-reporting": "donut", "payroll-services": "payslip",
  "startup-and-sme-accounting": "sprout", "tax-planning-and-advisory": "piggy", "tds-services": "receipt", "virtual-cfo-services": "cockpit",
};
export const SCENE_DEFAULT = { "market-research": "radar", "digital-marketing": "bubbles", "it-development": "terminal", "accounts-finance": "ledger" };

/* flags: market research pages show the countries we field in; Indian tax pages carry the Indian flag */
export const FLAGS_MR = ["IN", "US", "GB", "DE", "FR", "JP", "AU", "CA", "AE", "SG", "BR", "ZA", "IT", "ES", "MX", "NL", "SA", "KR", "ID"];
export const FLAG_IN = ["gst-services", "tds-services", "income-tax-and-itr-filing", "payroll-services", "startup-and-sme-accounting"];

/* Kunal (9 Nov, 18:26): no two service heroes may look alike. Every service gets its own colours (spread round the colour
   wheel), and its own mix of layout (6), background (6), headline style (5) and grading (5), on top of its own picture. */
const hex = (h, s, l) => {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)))).toString(16).padStart(2, "0");
  return "#" + f(0) + f(8) + f(4);
};
export const LAYOUTS = ["split", "flip", "wide", "poster", "panel", "iso"];
export const BACKS = ["blobs", "aurora", "beams", "rings", "stripes", "mesh"];
export const HEADS = ["serif", "outline", "mark", "glow", "pill"];
export const GRADES = ["deep", "bright", "duo", "noir", "paper"];
/* how the picture is framed: a glass panel, a laptop screen, or free-floating with no panel */
export const FRAMES = ["glass", "laptop", "bare"];
/* yellows and greens look much lighter at the same lightness: darken them so white text on them stays readable */
const dim = (h, l) => (h > 40 && h < 195 ? l - 14 : l);
export function lookOf(g) {
  const h = (g * 137.508 + 200) % 360;
  const off = [52, 96, 140, -60, -110][g % 5];
  return {
    pal: [hex(h, 78, dim(h, 42)), hex((h + off + 360) % 360, 82, dim((h + off + 360) % 360, 48)), hex((h + 180 + (g % 3) * 25) % 360, 92, 60)],
    layout: LAYOUTS[g % 6],
    back: BACKS[(g + Math.floor(g / 6)) % 6],
    head: HEADS[(g * 2 + Math.floor(g / 36)) % 5],
    grade: GRADES[(g * 3 + Math.floor(g / 5)) % 5],
    frame: FRAMES[(g + Math.floor(g / 6) * 2) % 3],
  };
}

/* three colours each: main, second, spark. One family per platform, so a platform's pages belong together. */
export const PAL = {
  "market-research": [["#0f9c8f", "#22d3ee", "#6366f1"], ["#0891b2", "#2dd4bf", "#a78bfa"], ["#0e7490", "#38bdf8", "#f59e0b"], ["#047857", "#34d399", "#3b82f6"], ["#1d4ed8", "#06b6d4", "#10b981"], ["#0f766e", "#5eead4", "#f472b6"]],
  "digital-marketing": [["#e11d74", "#ff7a1a", "#ffd23f"], ["#c026d3", "#f43f5e", "#fb923c"], ["#db2777", "#8b5cf6", "#22d3ee"], ["#e11d48", "#f59e0b", "#84cc16"], ["#9333ea", "#ec4899", "#fde047"], ["#ea580c", "#e11d48", "#a855f7"]],
  "it-development": [["#4d7c0f", "#7c5cff", "#22d3ee"], ["#4f46e5", "#22d3ee", "#a3e635"], ["#7c3aed", "#06b6d4", "#f472b6"], ["#0284c7", "#8b5cf6", "#34d399"], ["#15803d", "#3b82f6", "#facc15"], ["#2563eb", "#a855f7", "#f97316"]],
  "accounts-finance": [["#b8862b", "#1e3a8a", "#e2b65c"], ["#a16207", "#065f46", "#fbbf24"], ["#92400e", "#1e40af", "#f59e0b"], ["#15803d", "#b45309", "#fde68a"], ["#1e3a8a", "#ca8a04", "#60a5fa"], ["#7c2d12", "#0f766e", "#fcd34d"]],
};
export const FACTS = {
  "market-research": ["55+ markets", "Verified panels", "Quality-checked data"],
  "digital-marketing": ["Research-led strategy", "Full-funnel growth", "Clear monthly reports"],
  "it-development": ["Secure by design", "Agile sprints", "Built to scale"],
  "accounts-finance": ["Qualified experts", "On-time compliance", "Clear monthly MIS"],
};
export const CTA = {
  "market-research": "Request feasibility",
  "digital-marketing": "Book a free growth call",
  "it-development": "Scope my project",
  "accounts-finance": "Get a free consultation",
};
