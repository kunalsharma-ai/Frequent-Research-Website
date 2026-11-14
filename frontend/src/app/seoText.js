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
