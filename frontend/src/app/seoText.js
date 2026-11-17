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
export function fitTitle(t, max = 60) {
  t = String(t || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const seg = t.split(/\s+[|·]\s+|\s+[–—]\s+(?=Frequent Research$)/).map((x) => x.trim()).filter(Boolean);
  const branded = seg.length > 1 && seg[seg.length - 1] === BRAND;
  if (branded) seg.pop();
  const main = seg[0], rest = seg.slice(1);
  const tries = [];
  if (branded) tries.push(main + " | " + BRAND);
  for (let k = rest.length; k > 0; k--) tries.push([main, ...rest.slice(0, k)].join(" | "));
  tries.push(main);
  for (const x of tries) if (x.length <= max) return x;
  const head = main.split(/\s*:\s+|\s+[–—]\s+/)[0];
  if (head !== main && head.length >= 20 && head.length <= max) return branded && (head + " | " + BRAND).length <= max ? head + " | " + BRAND : head;
  return cutWords(main, max);
}
