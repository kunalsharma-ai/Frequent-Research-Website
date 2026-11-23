// Build 82.7 (SEO): page title and meta description rules shared by the app (SiteApp usePageMeta) and the build
// (scripts/seo-pass.cjs), so the description a search engine reads in the HTML and the one the app sets are the same.

// home page title, 50-60 characters (SEOptimer / Google show up to about 60); Kunal chose this on 14 Nov 2026
export const HOME_TITLE = "Frequent Research | Market Research, Marketing, IT & Finance";
// home page description, 120-160 characters
export const HOME_DESC =
  "Frequent Research brings market research, digital marketing, IT development and accounts & finance under one roof: one partner, measurable outcomes.";

// pages whose description is written by hand (the automatic shortening below would read oddly)
export const DESC_BY_PATH = {
  "/": HOME_DESC,
  "/about-us":
    "Frequent Research is one accountable team for market research, digital marketing, IT & development and accounts & finance, with panels in 55 countries.",
};

// a description longer than 160 characters is shortened to whole sentences, or else to whole list items + "and more."
export function fitDesc(d, max = 160) {
  d = String(d || "").replace(/\s+/g, " ").trim();
  if (d.length <= max) return d;
  // whole sentences
  const sent = d.match(/[^.!?]+[.!?]+(\s|$)/g) || [];
  let out = "";
  for (const s of sent) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  out = out.trim();
  if (out.length >= 110) return out;
  // whole list items: "…: a, b, c, d and e." -> "…: a, b, c and more."
  const tail = " and more.";
  let cut = d.lastIndexOf(", ", max - tail.length);
  while (cut > 0 && d.slice(0, cut).length + tail.length > max) cut = d.lastIndexOf(", ", cut - 1);
  if (cut >= 90) return d.slice(0, cut) + tail;
  // whole words
  const w = d.slice(0, max - 1).replace(/\s+\S*$/, "").replace(/[,;:]$/, "");
  return w + "…";
}

// build 83.3 (SEO): page titles of at most 60 characters (Google shows about 60; SEOptimer asks for 50-60).
// "Main | Section | Frequent Research" keeps, in this order of preference: main + brand, main + section, main.
// A main part that is still too long keeps the part before its ":" subtitle, or else whole words that end before
// a trailing "for / in / of …" phrase. The home title is chosen by hand (HOME_TITLE) and is already 60.
const BRAND = "Frequent Research";
const SMALL = /\s+(and|for|of|to|in|with|at|on|by|from|across|among|into|the|a|an|&)$/i;
const tidy = (s) => {
  let p;
  do { p = s; s = s.replace(/[\s,;:&|·–—-]+$/, "").replace(SMALL, ""); } while (s !== p);
  return s.trim();
};
function cutWords(s, max) {
  let w = s.slice(0, max + 1);
  if (w.length > max) w = w.replace(/\s+\S*$/, "");
  w = tidy(w);
  // end before the last "for / in / of …" phrase that the cut broke off, when enough is left
  const m = w.match(/^(.*\S)\s+(for|in|of|with|at|on|across|among|from)\s+\S.*$/i);
  if (m && m[1].length >= 28) w = tidy(m[1]);
  return w;
}
// build 83.4: hand-written titles (50-60 characters) for top-level pages whose own title is very short
export const TITLE_BY_PATH = {
  "/careers": "Careers at Frequent Research | Research, Marketing & IT",
  "/cookie-policy": "Cookie Policy | How Frequent Research Uses Cookies",
  "/data-protection": "Data Protection | How Frequent Research Handles Data",
  "/downloads": "Downloads | Panel Books & Guides from Frequent Research",
  "/gallery": "Gallery | Life, Events & Celebrations at Frequent Research",
  "/industries-case-studies": "Industries & Case Studies | Frequent Research Projects",
  "/lets-talk": "Let's Talk | Contact Frequent Research in New Delhi",
  "/our-journey": "Our Journey 2015 to Today | The Frequent Research Story",
  "/our-reach": "Our Reach | Research Panels in 55+ Countries | Frequent",
  "/our-team": "Meet our Team | The People Behind Frequent Research",
  "/portals": "Our Research Panels & Portals | Frequent Research Group",
  "/privacy-policy": "Privacy Policy | How Frequent Research Protects Your Data",
  "/products": "Products | Research & Business Software by Frequent Research",
  "/research-ethics": "Research Ethics | Our Standards at Frequent Research",
  "/services": "Services | Research, Marketing, IT & Finance | Frequent",
  "/terms-conditions": "Terms & Conditions | Using the Frequent Research Website",
  "/services/digital-marketing/seo-services": "SEO Services | Search Engine Optimisation in India",
  "/services/market-research/healthcare-panel": "Healthcare Panel | Doctors & Patients | Frequent Research",
  "/government-opinion-research": "Government & Opinion Poll Research | Frequent Research",
  "/privacy-data-protection": "Privacy, Data Protection & Research Ethics | Frequent",
};

// Page titles of 50-60 characters where the title allows it (Google shows about 60; SEOptimer asks for 50-60).
// "Main | Section | Frequent Research" is tried in several shortened forms (main + brand, main + section, main +
// the section's last words such as "Case Study") and the form nearest 50-60 characters wins; a main part that is
// still too long keeps the part before its ":" subtitle, or else whole words. Titles already 50-60 stay as they are.
export function fitTitle(t, max = 60, path) {
  t = String(t || "").replace(/\s+/g, " ").trim();
  const p = path ? String(path).replace(/\/+$/, "") || "/" : "";
  if (p && TITLE_BY_PATH[p] && TITLE_BY_PATH[p].length <= max) return TITLE_BY_PATH[p];
  if (t.length <= max && t.length >= 50) return t;
  const seg = t.split(/\s+[|·]\s+|\s+[–—]\s+(?=Frequent Research$)/).map((x) => x.trim()).filter(Boolean);
  const branded = seg.length > 1 && seg[seg.length - 1] === BRAND;
  if (branded) seg.pop();
  if (!seg.length) return t;
  let main = seg[0];
  const rest = seg.slice(1);
  if (main.length > max) {
    const head = main.split(/\s*:\s+|\s+[–—]\s+/)[0];
    main = head !== main && head.length >= 20 && head.length <= max ? head : cutWords(main, max);
  }
  const shortOf = (x) => { const w = x.split(" "); return w.length > 2 ? w.slice(-2).join(" ") : ""; };
  const cands = [t];
  for (let k = rest.length; k >= 0; k--) {
    const r = rest.slice(0, k);
    cands.push([main, ...r, BRAND].join(" | "), [main, ...r].join(" | "));
  }
  for (const x of rest) if (shortOf(x)) cands.push(main + " | " + shortOf(x) + " | " + BRAND, main + " | " + shortOf(x));
  cands.push(main + " | " + BRAND, main);
  const ok = cands.filter((x) => x.length <= max);
  return ok.find((x) => x.length >= 50) || ok.sort((a, b) => b.length - a.length)[0] || cutWords(main, max);
}

// build 83.4: a description under 120 characters gets one closing sentence for its part of the site, chosen so the
// result is 120-160 characters where possible (SEOptimer asks for 120-160). Running it twice changes nothing.
const DESC_TAILS = [
  [/^\/industries-case-studies\/[^/]+\/./, ["A case study by Frequent Research: the challenge, the approach we took, the fieldwork behind it and the results it delivered.", "See the approach Frequent Research took, the research behind it and the results it delivered for the client.", "See the approach Frequent Research took and the results it delivered.", "See how Frequent Research approached it and what changed.", "A case study by Frequent Research."]],
  [/^\/industries-case-studies/, ["Case studies by Frequent Research across market research, marketing, IT and finance.", "Case studies by Frequent Research."]],
  [/^\/downloads/, ["Download the panel book free from Frequent Research, with full profile tables, panel sizes and the demographics behind them.", "Download it free from Frequent Research, with the full profile tables.", "Download it free from Frequent Research."]],
  [/^\/(cookie-policy|data-protection|privacy|terms|research-ethics)/, ["Read the full policy of Frequent Research (Fieldwork Solutions Pvt. Ltd.), New Delhi, and how to contact us about it.", "Read the full policy of Frequent Research (Fieldwork Solutions Pvt. Ltd.), New Delhi.", "Read the full Frequent Research policy."]],
  [/^/, ["Frequent Research brings market research, digital marketing, IT development and accounts & finance together under one roof.", "Frequent Research: market research, digital marketing, IT and finance under one roof.", "From Frequent Research, New Delhi."]],
];
export function fillDesc(d, path, min = 120, max = 160) {
  d = String(d || "").replace(/\s+/g, " ").trim();
  if (!d || d.length >= min) return d;
  const p = String(path || "/").replace(/\/+$/, "") || "/";
  const tails = (DESC_TAILS.find(([re]) => re.test(p)) || DESC_TAILS[DESC_TAILS.length - 1])[1];
  if (DESC_TAILS.some(([, ts]) => ts.some((x) => d.endsWith(x)))) return d;
  const base = /[.!?]$/.test(d) ? d : d + ".";
  const all = tails.map((x) => base + " " + x).filter((x) => x.length <= max);
  return all.find((x) => x.length >= min) || all[0] || d;
}
