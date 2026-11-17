/*
 * Build 83: every page of the website in the page-video list, each with its own generated design ("Studio 83").
 *
 * The build-70 list (data/PageVideos69.jsx: home, about, journey, panels, services …) is kept as it is, with its links
 * and texts; its pages now use the Studio 83 design too (template "x83"; the old design is remembered in `classic` and
 * can be chosen again in the super admin). Every other page of the site (data/sitePages83.js: panel countries,
 * products, industries, blog posts, legal pages …) gets an entry of its own. All of it is one list in the super admin
 * ("Page videos"), saved as before under the content key "page-videos" ({ edit, add, hide }) plus "studio" (imported
 * template files and global switches).
 *
 * New fields of an entry (all optional):
 *   url       YouTube link, Vimeo link, a direct .mp4/.webm address or an uploaded video (/api/v1/files/…)
 *   source    "auto" (own video, else the closest parent page's video, else the animated video), "own" (own video,
 *             else the animated video) or "motion" (always the animated video)
 *   cover     "design" (the designed cover, default), "thumb" (the YouTube picture) or "image" (coverUrl)
 *   coverUrl  an uploaded picture used as the cover
 *   look      design choices on top of the generated recipe (data/pv83Looks.js), or { pack: "<template id>" }
 *   sound     false = the animated video starts muted
 */
import { CMS_DEFAULTS, CMS_RAW, cmsList } from '../app/cms.jsx';
import { PV_LIST } from './PageVideos69.jsx';
import { sp83Find, sp83Norm, sp83Pages } from './sitePages83.js';
import { pv83Hash } from './pv83Looks.js';

void PV_LIST; // the build-70 list must be defined first (its built-in entries are reused below)
const OLD = (CMS_DEFAULTS["page-videos"] || []).slice();
const norm = sp83Norm;

function build() {
  const pages = sp83Pages();
  const pos = new Map(pages.map((p, i) => [p.path, i]));
  const groupN = new Map(), numOf = new Map();
  for (const p of pages) { const k = (groupN.get(p.group) || 0) + 1; groupN.set(p.group, k); numOf.set(p.path, k); }
  const covered = new Set(OLD.filter((e) => !e.section).map((e) => norm(e.path)));
  const out = OLD.map((e) => {
    const p = sp83Find(e.path);
    return { ...e, template: "x83", classic: e.template || "spotlight", n: pos.has(norm(e.path)) ? pos.get(norm(e.path)) : pv83Hash(e.id) % 997, num: numOf.get(norm(e.path)) || 1, group: p ? p.group : "Main pages", kind: p ? p.kind : "main", fam: (p && p.fam) || e.family || "fr", country: (p && p.country) || "", panel: (p && p.panel) || "", source: "auto", cover: "design", coverUrl: "", look: {}, sound: true };
  });
  pages.forEach((p, i) => {
    if (covered.has(p.path)) return;
    const cta = p.kind === "panel" || p.fam === "mr" ? ["Request a quote", "/lets-talk?type=quote"] : p.fam === "dm" ? ["Plan it with us", "/lets-talk?type=digital"] : p.fam === "it" ? ["Start a project", "/lets-talk?type=it"] : p.fam === "af" ? ["Talk to our finance team", "/lets-talk?type=finance"] : p.kind === "blog" ? ["Talk to our team", "/lets-talk"] : ["Talk to our team", "/lets-talk"];
    const words = String(p.name).split(/\s+/);
    const cut = p.kind === "panel" ? words.length - 2 : Math.max(1, Math.ceil(words.length / 2));
    out.push({
      id: "p83" + p.path.replace(/[^a-z0-9]+/gi, "-").replace(/-$/, ""), page: p.name, path: p.path, match: "exact", section: "", url: "", template: "x83", classic: "spotlight",
      eyebrow: p.kind === "panel" ? p.group.replace(/ countries$/, "") : p.group, title: words.slice(0, cut).join(" "), em: words.slice(cut).join(" "), lede: String(p.summary || "").slice(0, 220),
      points: (p.points || []).filter(Boolean).slice(0, 4), cta: { label: cta[0], to: cta[1] },
      n: i, num: numOf.get(p.path) || 1, group: p.group, kind: p.kind, fam: p.fam, country: p.country || "", panel: p.panel || "", source: "auto", cover: "design", coverUrl: "", look: {}, sound: true,
    });
  });
  return out;
}
const PV83_ALL = build();
const PV83_LIST = cmsList("page-videos", PV83_ALL, "id");
const pv83Studio = () => { const s = CMS_RAW["page-videos"]; return s && typeof s === "object" && s.studio && typeof s.studio === "object" ? s.studio : {}; };

/* what kind of video a link is */
function pv83Video(u) {
  u = String(u || "").trim();
  if (!u) return null;
  let m;
  if (/^[\w-]{11}$/.test(u)) return { kind: "yt", id: u, start: 0, tall: false };
  try {
    if (/^\/api\/v1\/files\//.test(u)) return { kind: "file", src: u };
    const x = new URL(u);
    if (x.protocol !== "https:" && !(x.protocol === "http:" && /^(localhost|127\.)/.test(x.hostname))) return null;
    const h = x.hostname.replace(/^(www|m|music|player)\./, "");
    if (h === "youtu.be" || /^youtube(-nocookie)?\.com$/.test(h)) {
      let id = h === "youtu.be" ? x.pathname.slice(1).split("/")[0] : x.searchParams.get("v") || ((m = x.pathname.match(/\/(embed|shorts|live|v)\/([\w-]{11})/)) ? m[2] : "");
      if (!/^[\w-]{11}$/.test(id)) return null;
      const t = String(x.searchParams.get("t") || x.searchParams.get("start") || ""), tm = t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/);
      return { kind: "yt", id, start: tm ? (+tm[1] || 0) * 3600 + (+tm[2] || 0) * 60 + (+tm[3] || 0) : 0, tall: /\/shorts\//.test(x.pathname) };
    }
    if (h === "vimeo.com" && (m = x.pathname.match(/\/(?:video\/)?(\d{5,})/))) return { kind: "vimeo", id: m[1] };
    if (/\.(mp4|webm|m4v)$/i.test(x.pathname)) return { kind: "file", src: x.href };
  } catch (e) {}
  return null;
}

const hit = (e, p) => { const ep = norm(e.path); return ep === p || (e.match === "prefix" && ep !== "/" && p.startsWith(ep + "/")); };
const inView = (sel) => {
  let el = null;
  try { el = sel ? document.querySelector(sel) : null; } catch (e) {}
  if (!el) return false;
  const s = el.closest("section") || el, r = s.getBoundingClientRect();
  return r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.35;
};
/* a design for a page that is not in the list (a case study, a page made in the admin …): from its address and heading */
function synth(p) {
  const h1 = (typeof document !== "undefined" && document.querySelector("main h1, h1")) || null;
  const name = (h1 && h1.textContent.trim().slice(0, 80)) || (typeof document !== "undefined" ? String(document.title).split(/\s+[|·–—]\s+/)[0] : "") || "Frequent Research";
  const parts = p.split("/").filter(Boolean);
  const fam = /market-research/.test(p) ? "mr" : /digital-marketing/.test(p) ? "dm" : /it-development/.test(p) ? "it" : /accounts-finance/.test(p) ? "af" : "fr";
  const words = name.split(/\s+/), cut = Math.max(1, Math.ceil(words.length / 2));
  const kind = parts[0] === "industries-case-studies" ? "industry" : parts[0] === "blog" ? "blog" : "main";
  return { id: "p83-auto" + p.replace(/[^a-z0-9]+/gi, "-"), page: name, path: p, match: "exact", section: "", url: "", template: "x83", eyebrow: kind === "industry" ? "Case study" : parts[0] ? parts[0].replace(/-/g, " ") : "Frequent Research", title: words.slice(0, cut).join(" "), em: words.slice(cut).join(" "), lede: ((typeof document !== "undefined" && document.querySelector('meta[name="description"]')) || {}).content || "", points: [], cta: { label: "Talk to our team", to: "/lets-talk" }, n: pv83Hash(p) % 997, num: parts.length || 1, group: "", kind, fam, country: "", panel: "", source: "auto", cover: "design", look: {}, sound: true, auto: true };
}

/* the entries for a page: [the one to show, …the others on the same page]; each with `video` (what to play, or null
   for the animated video) and `videoFrom` (the page the video belongs to) */
function pv83ForPath(path) {
  const list = PV83_LIST.filter((e) => e && e.path && e.show !== false);
  const p = norm(path);
  let here = list.filter((e) => norm(e.path) === p);
  if (!here.length) { const pr = list.filter((e) => hit(e, p) && e.match === "prefix"); here = [{ ...synth(p), ...(pr[0] ? { classic: pr[0].classic } : {}) }]; }
  const sec = here.find((e) => e.section && inView(e.section));
  const main = sec || here.find((e) => !e.section) || here[0];
  const withVideo = (e) => {
    let v = pv83Video(e.url), from = e.path;
    if (!v && e.source !== "own" && e.source !== "motion") {
      for (let q = p; q !== "/"; ) {
        q = q.slice(0, q.lastIndexOf("/")) || "/";
        if (q === "/") break;
        const up = list.find((x) => !x.section && pv83Video(x.url) && (norm(x.path) === q || hit(x, q)));
        if (up) { v = pv83Video(up.url); from = up.path; break; }
      }
    }
    if (e.source === "motion") v = null;
    const studio = pv83Studio();
    const tpl = studio.classic === true && e.classic && v && v.kind === "yt" ? e.classic : e.template;
    return { ...e, template: v && v.kind !== "yt" ? "x83" : tpl || "x83", video: v, videoFrom: from, url: v && v.kind === "yt" ? "https://youtu.be/" + v.id : e.url };
  };
  return [main, ...here.filter((e) => e !== main)].map(withVideo);
}

export { PV83_ALL, PV83_LIST, pv83ForPath, pv83Studio, pv83Video };
