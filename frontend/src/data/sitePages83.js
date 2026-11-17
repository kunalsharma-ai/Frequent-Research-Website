/*
 * Build 83: every page of the website in one list (Kunal, 16 Nov: "add all web pages … each and every single web page").
 * Used by the page-video studio (data/PageVideos83.js, admin/PageVideos83.jsx) and by the super admin's
 * "All website pages" directory (admin/AllPages83.jsx) and "Pages & sections" (admin/Builder.jsx).
 *
 * sp83Pages() -> [{ path, name, group, kind, fam, sub, country, panel, summary, points }]
 *   kind: main | services | vertical | service | gov | product | portal | downloads | quality | panel | industry | blog
 *         | legal | custom
 *   fam:  mr | dm | it | af | fr (brand)   the service family, for the design's colours
 * Pages that are made from data (services, products, panel countries, industries, blog posts, legal pages) come from
 * that data, so a new service, product, country or post appears here by itself.
 */
import { PORTALS, VERTICALS } from '../app/data/site.jsx';
import { PR5_LIST } from './Sampledge65.jsx';
import { INDUSTRIES } from '../app/data/industries.jsx';
import { BLOG_POSTS } from '../app/data/blogPosts.jsx';
import { LEGAL_PAGES } from '../app/pages/PrivacyPage.jsx';
import { PV83_COUNTRIES, PV83_PANELS, PV83_PANEL_HAS } from './pv83Countries.js';

const FAM = { "market-research": "mr", "digital-marketing": "dm", "it-development": "it", "accounts-finance": "af" };
const P = (path, name, group, kind, o) => ({ path, name, group, kind, fam: "fr", sub: "", summary: "", points: [], ...o });

const MAIN = [
  P("/", "Home", "Main pages", "main", { summary: "One team for market research, digital marketing, IT development and accounts & finance, working with clients in 55 countries since 2015.", points: ["Market Research", "Digital Marketing", "IT & Development", "Accounts & Finance"] }),
  P("/about-us", "About us", "Main pages", "main", { summary: "The people, the places and the way we work: one accountable team for research, marketing, technology and finance.", points: ["Started in 2015", "Clients in 55 countries", "58 industries served"] }),
  P("/our-team", "Our team", "Main pages", "main", { summary: "Meet the team that runs your projects.", points: ["Research", "Marketing", "Technology", "Finance"] }),
  P("/our-journey", "Our journey", "Main pages", "main", { summary: "How a market research and digital marketing team grew into panels, healthcare research, IT, Sampledge and finance.", points: ["2015 · Research & marketing", "2017 · Our panels", "2020 · Sampledge & IT", "2022 · Finance & accounts"] }),
  P("/our-reach", "Our reach", "Main pages", "main", { summary: "Where we work and who we reach.", points: ["5 regions", "55 countries", "58 industries"] }),
  P("/connect", "QR & Connect", "Main pages", "main", { summary: "Follow us, join our panels and reach Sampledge: every code opens the right place on your phone.", points: ["Our social channels", "Our three panels", "Sampledge products"] }),
  P("/rates-reviews", "Rates & reviews", "Main pages", "main", { summary: "Real reviews from real clients.", points: ["Rate us", "Read reviews", "Share your experience"] }),
  P("/gallery", "Gallery", "Main pages", "main", { summary: "Festivals, awards and the moments in between.", points: ["Festivals", "Awards", "Birthdays"] }),
  P("/careers", "Careers", "Main pages", "main", { summary: "Learn fast, own real work and grow across four disciplines.", points: ["Real work from week one", "Four disciplines", "Clients around the world"] }),
  P("/lets-talk", "Let's talk", "Main pages", "main", { summary: "One message reaches the right team.", points: ["Market research", "Digital marketing", "IT", "Accounts & finance"] }),
  P("/esomar-37", "ESOMAR 37 questions", "Main pages", "main", { fam: "mr", summary: "How we recruit, profile and protect respondents, and how we check data quality.", points: ["Panel recruitment", "Data quality", "Privacy"] }),
  P("/services", "All services", "Main pages", "services", { summary: "Market research, digital marketing, IT development and accounts & finance.", points: ["Market Research", "Digital Marketing", "IT & Development", "Accounts & Finance"] }),
  P("/products", "All products (Sampledge)", "Products", "product", { summary: "Software for research operations and for running a business.", points: ["Research tools", "Business tools", "One ecosystem"] }),
  P("/portals", "All panel portals", "Panel portals", "portal", { summary: "Turn2Opinion, MyFrequentRewards and MyHealthOpinions.", points: ["Turn2Opinion", "MyFrequentRewards", "MyHealthOpinions"] }),
  P("/government-opinion-research", "Government & opinion research", "Government research", "gov", { fam: "mr", summary: "Surveys for departments, agencies and public bodies that need reliable evidence.", points: ["Citizen surveys", "Policy impact", "Programme evaluation", "Rural fieldwork"] }),
  P("/government-opinion-research/case-study", "Government case study", "Government research", "gov", { fam: "mr", summary: "How a public-sector study was designed, fielded and reported.", points: ["The brief", "Fieldwork", "Results"] }),
  P("/downloads", "Downloads", "Downloads", "downloads", { summary: "Panel books, brochures and quality documents in one place.", points: ["Panel books", "Brochures", "Quality documents"] }),
  P("/downloads/consumer-panel-books", "Consumer panel books", "Downloads", "downloads", { fam: "mr", sub: "b2c", summary: "Profiled consumers in 55 countries, chapter by chapter.", points: ["Demographics", "Lifestyle", "Category users"] }),
  P("/downloads/business-panel-books", "Business panel books", "Downloads", "downloads", { fam: "mr", sub: "b2b", summary: "Decision makers by company size, sector, department and job title.", points: ["Company size", "Sectors", "Job titles"] }),
  P("/downloads/healthcare-panel-books", "Healthcare panel books", "Downloads", "downloads", { fam: "mr", sub: "hc", summary: "Separate books for healthcare professionals, caregivers and patients.", points: ["HCPs", "Caregivers", "Patients"] }),
  P("/downloads/quality-process", "Quality process", "Downloads", "quality", { summary: "Quality is not a step. It is every step.", points: ["Plan", "Check", "Deliver"] }),
  P("/downloads/quality-process/market-research", "Quality: market research", "Downloads", "quality", { fam: "mr", summary: "How we protect data quality from design to delivery.", points: ["Respondent checks", "In-field QA", "Final review"] }),
  P("/downloads/quality-process/digital-marketing", "Quality: digital marketing", "Downloads", "quality", { fam: "dm", summary: "How every campaign is checked before and after launch.", points: ["Brief", "Launch checks", "Reporting"] }),
  P("/downloads/quality-process/it-development", "Quality: IT development", "Downloads", "quality", { fam: "it", summary: "Reviews, tests and release checks on every build.", points: ["Code review", "Testing", "Release"] }),
  P("/downloads/quality-process/accounts-finance", "Quality: accounts & finance", "Downloads", "quality", { fam: "af", summary: "Maker-checker controls on every number we deliver.", points: ["Maker", "Checker", "Sign-off"] }),
  P("/downloads/service-brochures", "All services brochures", "Downloads", "downloads", { summary: "Everything we do, in one place.", points: ["Research", "Marketing", "Technology", "Finance"] }),
  P("/downloads/industries-case-studies", "Industry case study packs", "Downloads", "downloads", { summary: "Proof, industry by industry.", points: ["Case studies", "Results", "Sector packs"] }),
  P("/industries-case-studies", "Industries & case studies", "Industries & case studies", "industry", { summary: "How we have helped clients across 58 industries.", points: ["Case studies", "Sector expertise", "Results"] }),
  P("/blog", "Blog & insights", "Blog", "blog", { summary: "What we learn from the work we do.", points: ["Research", "Marketing", "Technology", "Finance"] }),
  P("/privacy-data-protection", "Privacy & data protection", "Legal", "legal", { summary: "How we collect, store and protect personal data.", points: ["Consent", "Security", "Your rights"] }),
];

let CACHE = null;
function sp83Pages() {
  if (CACHE) return CACHE;
  const out = [...MAIN];
  for (const V of VERTICALS || []) {
    const fam = FAM[V.slug] || "fr";
    out.push(P("/services/" + V.slug, V.name, V.name, "vertical", { fam, summary: V.card || V.headline || "", points: (V.services || []).slice(0, 4).map((s) => s.name) }));
    (V.services || []).forEach((S) => out.push(P("/services/" + V.slug + "/" + S.slug, S.name, V.name, "service", { fam, sub: V.slug, summary: S.summary || "", points: (S.includes || []).slice(0, 4) })));
  }
  for (const p of PR5_LIST || []) out.push(P("/products/" + p.id, p.name, "Products", "product", { fam: /research/i.test(p.group || "") ? "mr" : "it", sub: p.id, summary: p.head || p.cat || "", points: (p.feats || []).slice(0, 4).map((f) => (Array.isArray(f) ? f[0] : String(f))), tag: p.tag || "", colors: [p.c1, p.c2, p.c3].filter(Boolean) }));
  for (const p of PORTALS || []) out.push(P("/portals/" + p.slug, p.name, "Panel portals", "portal", { sub: p.slug, summary: p.tagline || p.summary || p.description || "" }));
  for (const kind of ["b2c", "b2b", "hc"]) {
    const K = PV83_PANELS[kind], has = new Set(PV83_PANEL_HAS[kind]);
    for (const c of PV83_COUNTRIES) {
      if (!has.has(c.iso)) continue;
      out.push(P("/downloads/" + K.sec + "/" + c.slug, c.name + " " + K.label.toLowerCase(), K.label + " countries", "panel", { fam: "mr", sub: kind, country: c.iso, panel: kind, summary: "Profiled " + K.who + " in " + c.name + ", chapter by chapter, with the panel book to download.", points: kind === "hc" ? ["Healthcare professionals", "Caregivers", "Patients", "Panel book PDF"] : kind === "b2b" ? ["Company size & revenue", "Sectors & departments", "Job titles", "Panel book PDF"] : ["Demographic profiling", "Lifestyle & habits", "Category users & buyers", "Panel book PDF"] }));
    }
  }
  for (const x of INDUSTRIES || []) out.push(P("/industries-case-studies/" + x.slug, x.name, "Industries & case studies", "industry", { sub: x.group || "", summary: x.blurb || "", points: (x.topics || []).slice(0, 4), icon: x.icon }));
  for (const b of BLOG_POSTS || []) out.push(P("/blog/" + b.slug, b.title, "Blog", "blog", { fam: FAM[b.vertical] || "fr", sub: b.vertical || "", summary: b.description || "", points: (b.takeaways || []).slice(0, 4).map((t) => String(t).split(/[.:;]/)[0].slice(0, 70)) }));
  for (const l of LEGAL_PAGES || []) out.push(P("/" + l.slug, l.title, "Legal", "legal", { summary: l.summary || "" }));
  // one entry per address (a data list could repeat a page)
  const seen = new Set();
  CACHE = out.filter((p) => !seen.has(p.path) && seen.add(p.path));
  return CACHE;
}
/* the groups, in menu order: [[group, [pages]]] */
function sp83Groups(extra) {
  const g = new Map();
  for (const p of [...sp83Pages(), ...(extra || [])]) { if (!g.has(p.group)) g.set(p.group, []); g.get(p.group).push(p); }
  return [...g.entries()];
}
const sp83Norm = (p) => (String(p || "/").split(/[?#]/)[0].replace(/\/+$/, "") || "/").toLowerCase();
const sp83Find = (path) => { const n = sp83Norm(path); return sp83Pages().find((p) => p.path === n) || null; };

export { sp83Find, sp83Groups, sp83Norm, sp83Pages };
