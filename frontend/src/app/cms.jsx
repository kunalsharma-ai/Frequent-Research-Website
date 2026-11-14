/*
 * Super admin content on the live site (build 67).
 *
 * The page loader in index.html (vite/fr-site.js, "cms loader") asks the API for GET /api/v1/site before the site's
 * code runs and puts the answer in window.__FR_CMS ({ content: { settings, texts, images, links, team, … } }), with
 * the last answer kept in localStorage ("fr-cms") for when the API is slow or down. So everything below is known
 * while the data modules are being defined:
 *
 *   cmsData(key, builtIn)   a data set the admin can edit (team, testimonials, blog posts, downloads …). Returns the
 *                           admin's copy when there is one, else the built-in one. Objects are merged field by field,
 *                           lists are replaced. Built-in values are remembered in CMS_DEFAULTS for the admin panel.
 *   texts / images / links  "change this on the page": any visible text, picture or link, matched exactly, swapped
 *                           in place on every page (also in dialogs and the chat) by cmsApplyStart().
 *
 * Nothing here runs in the offline preview (no API), nor for the super admin's own panel pages.
 */

const CMS_RAW = (typeof window !== "undefined" && window.__FR_CMS && window.__FR_CMS.content) || {};
const CMS_DEFAULTS = {};
const isObj = (x) => x && typeof x === "object" && !Array.isArray(x);
const merge = (a, b) => {
  if (!isObj(a) || !isObj(b)) return b;
  const o = { ...a };
  for (const k of Object.keys(b)) o[k] = isObj(a[k]) && isObj(b[k]) ? merge(a[k], b[k]) : b[k];
  return o;
};

function cmsData(key, builtIn) {
  CMS_DEFAULTS[key] = builtIn;
  const o = CMS_RAW[key];
  if (o === undefined || o === null) return builtIn;
  if (Array.isArray(builtIn)) return Array.isArray(o) ? o : builtIn;
  if (isObj(builtIn)) return isObj(o) ? merge(builtIn, o) : builtIn;
  return typeof o === typeof builtIn ? o : builtIn;
}
// a list the admin can edit item by item: { edit: { id: {changed fields} }, add: [new items], hide: [ids], order: [ids] }
// (built-in items stay in the code, so the panel always shows every detail, and new built-in items still appear)
function cmsList(key, builtIn, idKey) {
  CMS_DEFAULTS[key] = builtIn;
  CMS_IDS[key] = idKey;
  return cmsListApply(CMS_RAW[key], builtIn, idKey);
}
// build 78: the same rules for a list kept inside another key (case studies per industry: cases[industry])
const blankOf = (x) => (Array.isArray(x) ? [] : isObj(x) ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, blankOf(v)])) : typeof x === "number" ? 0 : typeof x === "boolean" ? false : typeof x === "string" ? "" : x);
const fillIn = (shape, x) => { const o = { ...shape }; for (const [k, v] of Object.entries(x)) o[k] = isObj(shape[k]) && isObj(v) ? fillIn(shape[k], v) : v == null && shape[k] != null ? shape[k] : v; return o; };
function cmsListApply(o, builtIn, idKey) {
  if (!isObj(o)) return builtIn;
  const id = (x) => (x && x[idKey] != null ? String(x[idKey]) : "");
  const hide = new Set(Array.isArray(o.hide) ? o.hide.map(String) : []), edit = isObj(o.edit) ? o.edit : {};
  let out = builtIn.filter((x) => !hide.has(id(x))).map((x) => (isObj(edit[id(x)]) ? merge(x, edit[id(x)]) : x));
  // build 78: an added item gets every field the built-in items have (empty where the admin left it out), so a page
  // never breaks on a missing list or text
  const shape = builtIn.length && isObj(builtIn[0]) ? blankOf(builtIn[0]) : null;
  if (Array.isArray(o.add)) out = out.concat(o.add.filter((x) => isObj(x) && !hide.has(id(x))).map((x) => (shape ? fillIn(shape, x) : x)));
  if (Array.isArray(o.order) && o.order.length) {
    const pos = new Map(o.order.map((k, i) => [String(k), i]));
    out = out.map((x, i) => [x, pos.has(id(x)) ? pos.get(id(x)) : 1e6 + i]).sort((a, b) => a[1] - b[1]).map((x) => x[0]);
  }
  return out;
}
const CMS_IDS = {};
// an object filled by several modules (e.g. the Accounts & Finance services, AGS): the admin's changes are merged into
// it in place, entry by entry, once it is complete. A copy of the built-in content is kept for the admin panel.
function cmsPatch(key, obj) {
  try { CMS_DEFAULTS[key] = typeof structuredClone === "function" ? structuredClone(obj) : JSON.parse(JSON.stringify(obj)); } catch (e) { CMS_DEFAULTS[key] = obj; }
  const o = CMS_RAW[key];
  if (!isObj(o) || !isObj(obj)) return obj;
  for (const k of Object.keys(o)) obj[k] = isObj(obj[k]) && isObj(o[k]) ? merge(obj[k], o[k]) : o[k];
  return obj;
}
const cmsGet = (key, d) => (CMS_RAW[key] === undefined ? d : CMS_RAW[key]);
const cmsSetting = (path, d) => {
  let v = CMS_RAW.settings;
  for (const k of path.split(".")) v = v && typeof v === "object" ? v[k] : undefined;
  return v === undefined || v === "" ? d : v;
};

/* ---- PDF downloads the admin replaced with an uploaded file: { "File name.pdf": "/api/v1/files/…" } ------------ */
// every PDF on the site is made in the browser with jsPDF and saved with doc.save(name); a replaced one is opened instead
/* build 72: jsPDF builds each document's own save() inside its constructor (and copies jsPDF.API over it), so the
   earlier patch of jsPDF.API.save replaced the real save and every download failed with "reading 'call'". The rule
   now wraps each new document's own save(). Returns the class to use with `new`. */
function cmsPdfPatch(jsPDF) {
  if (typeof window === "undefined" || !jsPDF) return jsPDF;
  function FrPdf(...args) {
    const doc = new jsPDF(...args);
    const save0 = doc.save;
    doc.save = function (name, opts) {
      const map = cmsGet("pdfs", {}) || {}, n = String(name || "");
      const to = map[n] || map[n.replace(/\.pdf$/i, "")] || map[n.replace(/^Frequent Research - /, "")];
      if (typeof to === "string" && to) {
        const a = document.createElement("a");
        a.href = to; a.download = n || "document.pdf"; a.rel = "noopener";
        document.body.appendChild(a); a.click(); a.remove();
        return this;
      }
      return save0.call(this, name, opts);
    };
    return doc;
  }
  FrPdf.API = jsPDF.API;
  FrPdf.version = jsPDF.version;
  return FrPdf;
}

/* ---- data files the admin replaced (panel books, calendars …): /data/<file> is answered from the API ------------ */
const CMS_FILES = (typeof window !== "undefined" && window.__FR_CMS && window.__FR_CMS.dataFiles) || {};
if (typeof window !== "undefined" && window.fetch && Object.keys(CMS_FILES).length && !window.__frCmsFetch) {
  window.__frCmsFetch = true;
  const f0 = window.fetch;
  window.fetch = function (u, o) {
    const s = typeof u === "string" ? u : (u && u.url) || "";
    const m = /^(?:https?:\/\/[^/]+)?\/data\/([^?#]+\.json)/.exec(s);
    if (m && CMS_FILES[m[1]] && !/^\/admin/.test(location.pathname))
      return f0("/api/v1/content/" + encodeURIComponent("data:" + m[1]) + "?v=" + CMS_FILES[m[1]])
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then((j) => new Response(JSON.stringify(j.data), { status: 200, headers: { "Content-Type": "application/json" } }))
        .catch(() => f0.apply(this, arguments));
    return f0.apply(this, arguments);
  };
}

/* ---- text, picture and link changes, applied to the page as it renders ----------------------------------------- */
const norm = (s) => s.replace(/\s+/g, " ").trim();
let T = null, I = null, L = null;
function maps() {
  if (T) return;
  T = new Map(); I = new Map(); L = new Map();
  const t = cmsGet("texts", {}), im = cmsGet("images", {}), ln = cmsGet("links", {});
  // texts: { "old text": "new text" } or { "/page/path": { "old": "new" } } for one page only
  for (const [k, v] of Object.entries(isObj(t) ? t : {})) {
    if (typeof v === "string") T.set(norm(k), { to: v, page: "" });
    else if (isObj(v) && k.startsWith("/")) for (const [a, b] of Object.entries(v)) if (typeof b === "string") T.set(k + "\u0001" + norm(a), { to: b, page: k });
  }
  for (const [k, v] of Object.entries(isObj(im) ? im : {})) if (typeof v === "string" && v) I.set(k, v);
  for (const [k, v] of Object.entries(isObj(ln) ? ln : {})) if (typeof v === "string" && v) L.set(k, v);
}
const ATTRS = ["placeholder", "aria-label", "title", "alt"];
const here = () => location.pathname.replace(/\/$/, "") || "/";
const lookup = (s) => {
  const n = norm(s);
  if (!n) return null;
  return T.get(here() + "\u0001" + n) || T.get(n) || null;
};
const skip = (el) => !el || el.closest("[data-cms-skip], .adm, script, style, textarea, [contenteditable='true']");

function fixText(node) {
  const el = node.parentElement;
  if (skip(el)) return;
  // the value we set last time, or a new one from React (then that is the original)
  const orig = node.__cmsWant != null && node.nodeValue === node.__cmsWant ? node.__cmsOrig : node.nodeValue;
  const hit = lookup(orig);
  if (!hit) return;
  node.__cmsOrig = orig;
  // keep the spaces around the text as they were, so inline layout does not change
  const lead = orig.match(/^\s*/)[0], tail = orig.match(/\s*$/)[0];
  const want = lead + hit.to + tail;
  node.__cmsWant = want;
  if (node.nodeValue !== want) node.nodeValue = want;
}
function fixEl(el) {
  if (skip(el)) return;
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (v) { const hit = lookup(v); if (hit && v !== hit.to) el.setAttribute(a, hit.to); }
  }
  if (I.size && el.tagName === "IMG") {
    const s = el.getAttribute("src"), to = s && (I.get(s) || I.get(s.split("?")[0]));
    if (to && s !== to) { el.setAttribute("src", to); el.removeAttribute("srcset"); }
  }
  if (I.size && el.tagName === "SOURCE" && el.parentElement && el.parentElement.tagName === "PICTURE") {
    const img = el.parentElement.querySelector("img"), s = img && img.getAttribute("src");
    if (s && [...I.values()].includes(s)) el.remove();
  }
  if (L.size && el.tagName === "A") {
    const h = el.getAttribute("href"), to = h && L.get(h);
    if (to && h !== to) el.setAttribute("href", to);
  }
}
function walk(root) {
  if (root.nodeType === 3) return fixText(root);
  if (root.nodeType !== 1) return;
  fixEl(root);
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) n.nodeType === 3 ? fixText(n) : fixEl(n);
}

// page changes: React Router calls history.pushState, which fires no event of its own
function onNav(fn) {
  if (!window.__frNavHook) {
    window.__frNavHook = true;
    const h = window.history, push = h.pushState;
    h.pushState = function () { const r = push.apply(this, arguments); window.dispatchEvent(new Event("fr-nav")); return r; };
  }
  window.addEventListener("fr-nav", fn);
  window.addEventListener("popstate", fn);
}

// page views for the admin dashboard: path and referring site only, no cookies (backend: routes/track.js)
function cmsTrack() {
  if (window.__frTrack || !/^https?:$/.test(location.protocol) || !navigator.sendBeacon || /^\/admin/.test(location.pathname) || window.top !== window) return;
  window.__frTrack = true;
  let last = "";
  const send = () => {
    const p = location.pathname;
    if (p === last || /^\/admin/.test(p)) return;
    const ref = last ? "" : document.referrer;
    last = p;
    try { navigator.sendBeacon("/api/v1/track", JSON.stringify({ path: p, ref, lang: document.documentElement.lang || "" })); } catch (e) {}
  };
  setTimeout(send, 0);
  onNav(() => setTimeout(send, 50));
}

// on / off switches from Site settings: classes on <html> (styles: src/styles/cms.css)
function cmsSwitches() {
  const off = (k) => cmsSetting(k, true) === false;
  const c = document.documentElement.classList;
  c.toggle("cms-no-wa", off("whatsapp.show"));
  c.toggle("cms-no-chat", off("chat.show"));
  c.toggle("cms-no-rv", off("reviewsButton.show"));
  c.toggle("cms-no-vd", off("videosButton.show"));
  c.toggle("cms-no-cel", off("celebrations.show"));
}

function cmsApplyStart() {
  if (typeof window === "undefined" || window.__frCmsOn || /^\/admin/.test(location.pathname)) return;
  cmsTrack();
  cmsSwitches();
  maps();
  if (!T.size && !I.size && !L.size) return;
  window.__frCmsOn = true;
  const run = () => walk(document.body);
  const mo = new MutationObserver((list) => {
    for (const m of list) {
      if (m.type === "characterData") fixText(m.target);
      else if (m.type === "attributes") fixEl(m.target);
      else m.addedNodes.forEach(walk);
    }
  });
  mo.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["src", "href", ...ATTRS] });
  run();
  // a route change keeps most nodes; page-only changes need a fresh pass
  onNav(() => setTimeout(run, 0));
  // build 78: product sites render in shadow roots (src/products/_shell); they get the same changes
  window.__frCmsShadow = (root) => {
    if (!root || root.__cmsOn) return;
    root.__cmsOn = true;
    walk(root);
    const m2 = new MutationObserver((list) => { for (const m of list) { if (m.type === "characterData") fixText(m.target); else if (m.type === "attributes") fixEl(m.target); else m.addedNodes.forEach(walk); } });
    m2.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["src", "href", ...ATTRS] });
  };
}

export { CMS_DEFAULTS, CMS_FILES, CMS_IDS, CMS_RAW, cmsApplyStart, cmsData, cmsGet, cmsList, cmsListApply, cmsPatch, cmsPdfPatch, cmsSetting };
