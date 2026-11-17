/*
 * Build 83: importing client testimonials from Excel / CSV (Kunal, 16 Nov: "I have added 100 rates and reviews for
 * market research but when I upload excel file for other services then there is an issue which add some variable in
 * client name everytime").
 *
 * What went wrong (build 78.4, admin/Content.jsx ListEditor import):
 *  1. Testimonials are identified by the client's name. When a row's name was already in the list (the same client in
 *     the market-research file and in another service's file, or a file uploaded twice), the import added a random
 *     suffix to the NAME to keep it unique, e.g. "Rahul Mehta-k3f". That is the "variable" in the client name.
 *  2. The service column was taken as written ("Digital Marketing", "IT", "Finance"…). The website only knows the four
 *     service keys (market-research, digital-marketing, it-development, accounts-finance), so every other spelling
 *     was dropped and the review was shown under market research. That is why only market research worked.
 *  3. Excel line breaks inside a cell arrive as "_x000D_" and some sheets carry hidden phonetic text; both ended up
 *     in names and quotes.
 *
 * The fix: names are kept exactly as typed (only cleaned of spaces and hidden characters); a row that is already in
 * the list (same client, same review) is skipped instead of renamed; the same client with a different review is
 * added as its own testimonial under the same name; services are matched from any common spelling; ratings like
 * "4.5/5" or "★★★★★" become numbers. tm83Import(rows, current) returns { add, skipped, fixed, notes }.
 */

/* Excel's escapes (_x000D_ = line break, _x0020_ = space …) and hidden characters */
const tm83Clean = (v) => String(v == null ? "" : v)
  .replace(/_x([0-9a-f]{4})_/gi, (m, h) => { const c = parseInt(h, 16); return c === 13 ? "" : c === 10 ? "\n" : c < 32 ? " " : String.fromCharCode(c); })
  .replace(/[​-‍⁠﻿­]/g, "")
  .replace(/ /g, " ")
  .replace(/\r\n?/g, "\n")
  .replace(/[ \t]+/g, " ")
  .replace(/ *\n */g, "\n")
  .trim();
const oneLine = (v) => tm83Clean(v).replace(/\s*\n\s*/g, " ");
/* a name: one line, no surrounding quotes, no "-abc" suffix left by the old import */
const tm83Name = (v) => oneLine(v).replace(/^["'“”‘’]+|["'“”‘’]+$/g, "").replace(/-[a-z0-9]{3}$/i, (m, i, s) => (/[a-z]-[a-z0-9]{3}$/i.test(s) && /\d/.test(m) ? "" : m)).trim();

/* any spelling of a service -> the website's key */
const SVC = [
  ["market-research", /market\s*research|^mr$|research|survey|panel|fieldwork|insight/i],
  ["digital-marketing", /digital|marketing|^dm$|seo|social|ads|ppc|content/i],
  ["it-development", /\bit\b|^it\s|information\s*tech|software|develop|web|app|tech/i],
  ["accounts-finance", /account|financ|^af$|tax|gst|book\s*keep|bookkeep|payroll|audit|cfo/i],
];
function tm83Service(v) {
  const s = oneLine(v).toLowerCase();
  if (!s) return "";
  if (["market-research", "digital-marketing", "it-development", "accounts-finance"].includes(s)) return s;
  for (const [k, re] of SVC) if (re.test(s)) return k;
  return "";
}
const tm83Services = (v) => [...new Set(String(v == null ? "" : Array.isArray(v) ? v.join(",") : v).split(/[,;|/\n&]+(?![^()]*\))/).map(tm83Service).filter(Boolean))];

/* "5", "4.5/5", "4,5", "★★★★☆", "5 stars" -> 1..5 */
function tm83Rating(v, fallback = 5) {
  const s = oneLine(v);
  if (!s) return fallback;
  const stars = (s.match(/★/g) || []).length;
  if (stars) return Math.max(1, Math.min(5, stars));
  const m = s.replace(",", ".").match(/(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+))?/);
  if (!m) return fallback;
  let n = +m[1];
  if (m[2] && +m[2] > 0) n = (n / +m[2]) * 5;
  else if (n > 5 && n <= 10) n = n / 2;
  else if (n > 10) n = n / 20;
  return Math.max(1, Math.min(5, Math.round(n)));
}

/* the testimonial's fields, and the column names people use for them */
const TM83_FIELDS = { name: "", company: "", designation: "", role: "", country: "", quote: "", rating: 5, vertical: "", services: [], date: "" };
const TM83_ALIAS = {
  name: ["clientname", "customername", "reviewer", "reviewername", "fullname", "client", "customer", "person", "author", "givenby", "name"],
  company: ["company", "companyname", "organisation", "organization", "firm", "business", "brand"],
  designation: ["designation", "jobtitle", "title", "position", "post"],
  role: ["role", "rolecompany", "byline"],
  country: ["country", "countrycode", "location", "nation"],
  quote: ["quote", "review", "testimonial", "feedback", "comment", "comments", "message", "text", "reviewtext", "description"],
  rating: ["rating", "rate", "stars", "star", "score", "ratings"],
  vertical: ["vertical", "service", "services", "servicename", "category", "department", "businessunit", "practice", "division", "segment"],
  date: ["date", "reviewdate", "datetime", "submitted", "createdat"],
};
const key = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
/* the best column for a field (exact alias first, then a column that contains it) */
function tm83Column(field, cols) {
  const c = cols.map(key), al = TM83_ALIAS[field] || [field];
  for (const a of al) { const i = c.indexOf(a); if (i >= 0) return cols[i]; }
  if (field === "name") { const i = c.findIndex((x) => /(client|customer|reviewer|full)name/.test(x) || (x.endsWith("name") && !/company|service|business|brand|org/.test(x))); return i >= 0 ? cols[i] : ""; }
  for (const a of al) { const i = c.findIndex((x) => a.length > 3 && x.includes(a)); if (i >= 0) return cols[i]; }
  return "";
}
const COUNTRY = { india: "IN", "united states": "US", usa: "US", us: "US", "united kingdom": "GB", uk: "GB", england: "GB", canada: "CA", australia: "AU", germany: "DE", france: "FR", singapore: "SG", "united arab emirates": "AE", uae: "AE", dubai: "AE", japan: "JP", china: "CN", netherlands: "NL", spain: "ES", italy: "IT", brazil: "BR", mexico: "MX", "saudi arabia": "SA", "south africa": "ZA", nigeria: "NG", kenya: "KE", ireland: "IE", sweden: "SE", switzerland: "CH", "new zealand": "NZ", malaysia: "MY", indonesia: "ID", philippines: "PH", qatar: "QA", "hong kong": "HK" };
const tm83Country = (v) => { const s = oneLine(v); if (/^[a-z]{2}$/i.test(s)) return s.toUpperCase(); return COUNTRY[s.toLowerCase()] || ""; };
const sig = (t) => key(t.name) + "|" + key(String(t.quote || "").slice(0, 80));

/* rows: the import's items (already matched to fields) or raw sheet rows; current: the testimonials in the list now */
function tm83Import(rows, current, opts = {}) {
  const seen = new Set((current || []).filter((x) => x && typeof x === "object").map(sig));
  const add = [], notes = [];
  let skipped = 0, fixed = 0;
  const fallbackSvc = tm83Service(opts.service || "");
  (rows || []).forEach((r, i) => {
    if (!r || typeof r !== "object") return;
    const cols = Object.keys(r);
    const get = (f) => (f in r && !(Array.isArray(r[f]) && !r[f].length) && r[f] !== "" ? r[f] : r[tm83Column(f, cols)]);
    const rawName = get("name");
    const t = { ...TM83_FIELDS };
    t.name = tm83Name(rawName);
    if (rawName != null && oneLine(rawName) !== t.name) fixed++;
    t.company = oneLine(get("company"));
    t.designation = oneLine(get("designation"));
    t.role = oneLine(get("role")) || [t.designation, t.company].filter(Boolean).join(", ");
    t.country = tm83Country(get("country"));
    t.quote = tm83Clean(get("quote")).replace(/^["“]+|["”]+$/g, "");
    t.rating = tm83Rating(get("rating"));
    const svcs = tm83Services([get("vertical"), get("services")].filter(Boolean).join(","));
    t.services = svcs.length ? svcs : fallbackSvc ? [fallbackSvc] : ["market-research"];
    t.vertical = t.services[0];
    const d = oneLine(get("date"));
    t.date = /^\d{4}-\d{2}-\d{2}/.test(d) ? d.slice(0, 10) : /^\d{5}$/.test(d) ? new Date(Date.UTC(1899, 11, 30) + +d * 864e5).toISOString().slice(0, 10) : "";
    if (!t.name || t.quote.length < 3) { notes.push("Row " + (i + 2) + ": no client name or review, left out."); return; }
    const s = sig(t);
    if (seen.has(s)) { skipped++; return; }
    seen.add(s);
    for (const k of Object.keys(t)) if (t[k] === "" && k !== "name" && k !== "quote") delete t[k];
    add.push(t);
  });
  return { add, skipped, fixed, notes };
}

export { TM83_ALIAS, TM83_FIELDS, tm83Clean, tm83Column, tm83Import, tm83Name, tm83Rating, tm83Service, tm83Services };
