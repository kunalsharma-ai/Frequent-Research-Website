/*
 * About Us (build 65 redesign) — /about-us. Prefix AB5_. Styles: src/styles/about65.css (ab5-).
 * Replaces the base About page. Written for all four teams — Market Research, Digital Marketing, IT & Development and
 * Accounts & Finance — plus Sampledge and the research communities. Service names and counts are read from the live
 * service data (base `aa`), so the page never disagrees with the menus.
 *
 *  AB5_Hero      four-faced 3D prism (one face per team) that turns, orbiting service chips, particle field
 *  AB5_Story     who we are + the "growth loop" (insight → visibility → technology → financial clarity)
 *  AB5_Mission   mission and vision, each with one pillar per team (flip cards / horizon beams)
 *  AB5_Teams     the four teams as a switchable stage, each with its own colour world and live mini-scene
 *  AB5_Together  one business, four teams: a worked example rail
 *  AB5_Values    the eleven core values, each shown in the four services
 *  AB5_Family    Sampledge products and the three research communities (logos link to their websites)
 *  AB5_Quality   certifications and how quality looks in each team
 *  AB5_Numbers   counters + the years-completed clock
 */
import { VERTICALS } from '../app/data/site.jsx';
import { FRK_LOGO_MFR, FRK_LOGO_MHO, FRK_LOGO_T2O } from '../components/site/FrKit.jsx';

const AB5_T = [
  { k: "market-research", key: "mr", name: "Market Research", verb: "Research it.", ic: "mr", c1: "#2563EB", c2: "#06B6D4", tag: "Hear every voice that matters.", line: "Consumer, B2B and healthcare research across 55+ markets — designed, fielded, quality-checked and turned into decisions.", promise: "Evidence before every big decision." },
  { k: "digital-marketing", key: "dm", name: "Digital Marketing", verb: "Market it.", ic: "dm", c1: "#DB2777", c2: "#F97316", tag: "Get found. Get chosen. Get results.", line: "SEO, paid media, social, content, automation and analytics that turn attention into measurable growth.", promise: "Visibility that pays for itself." },
  { k: "it-development", key: "it", name: "IT & Development", verb: "Build it.", ic: "it", c1: "#7C3AED", c2: "#10B981", tag: "Ideas in. Software out.", line: "Websites, apps, SaaS, CRM/ERP, AI automation, cloud and security — built around how your business really runs.", promise: "Technology that removes friction." },
  { k: "accounts-finance", key: "af", name: "Accounts & Finance", verb: "Balance it.", ic: "af", c1: "#059669", c2: "#F59E0B", tag: "Clarity in every number.", line: "Bookkeeping, GST, TDS, payroll, MIS, budgeting and virtual-CFO support that keeps the business compliant and in control.", promise: "Numbers you can decide on." },
];
const ab5Svc = (k) => {
  const v = VERTICALS.find((x) => x.slug === k);
  return v ? v.services.map((s) => ({ name: s.name.replace(/ — .*/, ""), slug: s.slug })) : [];
};

const AB5_ORBIT = [
  ["Surveys", "#2563EB"], ["SEO", "#DB2777"], ["SaaS", "#7C3AED"], ["GST", "#059669"],
  ["Panels", "#06B6D4"], ["Google Ads", "#F97316"], ["Mobile apps", "#10B981"], ["Payroll", "#F59E0B"],
  ["CATI", "#2563EB"], ["Social media", "#DB2777"], ["AI & automation", "#7C3AED"], ["Virtual CFO", "#059669"],
].map(([s, c]) => ({ s, c }));
/* ── hero ───────────────────────────────────────────────────────────────────────────── */

/* ── story + growth loop ───────────────────────────────────────────────────────────── */

/* ── mission & vision ─────────────────────────────────────────────────────────────── */

/* ── the four teams ───────────────────────────────────────────────────────────────── */

/* ── one business, four teams ─────────────────────────────────────────────────────── */

/* ── core values ──────────────────────────────────────────────────────────────────── */

/* ── products & communities ───────────────────────────────────────────────────────── */
const AB5_PANELS = [
  { n: "Turn2Opinion", u: "https://www.turn2opinion.com/", img: () => FRK_LOGO_T2O, d: "Consumers & business professionals", y: "2017" },
  { n: "MyFrequentRewards", u: "https://www.myfrequentrewards.com/", img: () => FRK_LOGO_MFR, d: "Consumers & business professionals", y: "2017" },
  { n: "MyHealthOpinions", u: "https://www.myhealthopinions.com/", img: () => FRK_LOGO_MHO, d: "Healthcare professionals, patients & caregivers", y: "2018" },
];

/* ── quality ─────────────────────────────────────────────────────────────────────── */

export { AB5_PANELS, AB5_T, ab5Svc };
