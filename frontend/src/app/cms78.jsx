/*
 * Build 78: what the full-control super admin adds on the live site. Nothing here changes a page until the admin has
 * saved something for it; with no admin content every page renders exactly as before.
 *
 *   custom-pages   new pages at any address, built from sections (blocks)          -> SiteApp renders <CmsPage>
 *   page-blocks    new sections inside existing pages: { "/path": [block] }       -> mounted next to the chosen section
 *   page-sections  { "/path": { hide: [sig], style: { sig: {...} }, css } , "*": { css } }  hide / restyle sections
 *   menus          extra links per menu ("services:<vertical>", …)                  -> header and footer
 *   forms          { forms: { key: { add: [field], hide: [label], labels: { old: new } } } } -> extra fields in any form
 *   logos          { header, footer, favicon, "portal:<slug>", "product:<id>", … }  -> uploaded logos replace the animated ones
 *   card-templates { blog: "magazine", cases: "glass", posts: { slug: tpl } }       -> design of blog / case study cards
 *   seo (78.3)     { "/path": { title, description, keywords, canonical, ogTitle, ogDescription, ogImage, schema, noindex },
 *                    _redirects: [{ from, to }] }                                  -> page head, sharing cards, redirects
 *   image-alts     { "picture address": "alt text" } (and alt text from the media library)  -> alt of every matching picture
 * Sections are found the same way here and in the admin's section editor (sectionsOf): the page's top-level blocks
 * inside <main>; a section is named by its position and its first heading ("3|our-journey").
 */
import { CMS_RAW } from './cms.jsx';
import { navPath } from './nav.jsx';

const isObj = (x) => x && typeof x === "object" && !Array.isArray(x);
const C = (k, d) => (CMS_RAW[k] === undefined || CMS_RAW[k] === null ? d : CMS_RAW[k]);
const normPath = (p) => (String(p || "/").replace(/[?#].*$/, "").replace(/\/+$/, "") || "/").toLowerCase();
const here = () => normPath(navPath());

/* ---- new pages -------------------------------------------------------------------------------------------------- */
function cmsCustomPage(path) {
  const list = C("custom-pages", []);
  if (!Array.isArray(list) || !list.length) return null;
  const p = normPath(path);
  return list.find((x) => isObj(x) && x.show !== false && normPath(x.path) === p) || null;
}
// extra menu links the admin added: menus["services:market-research"] = [{ name, to, desc }]
function cmsMenuExtra(name) {
  const m = C("menus", {});
  const l = isObj(m) && Array.isArray(m[name]) ? m[name] : [];
  return l.filter((x) => isObj(x) && x.show !== false && (x.name || x.t || x.label) && (x.to || x.href));
}

/* ---- sections of a page ---------------------------------------------------------------------------------------- */
const slug = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 40);
function sectionsOf(doc = document) {
  let el = doc.getElementById("main");
  if (!el) return [];
  // walk through wrappers that hold a single block (page shells, Suspense wrappers)
  const kidsOf = (x) => [...x.children].filter((k) => !k.hasAttribute("data-cms-blocks") && !/^(SCRIPT|STYLE|LINK|TEMPLATE|NOSCRIPT)$/.test(k.tagName));
  for (let i = 0; i < 6; i++) {
    const kids = kidsOf(el);
    if (kids.length === 1 && !kids[0].matches("section") && kids[0].children.length) { el = kids[0]; continue; }
    break;
  }
  return [...el.children].filter((k) => !k.hasAttribute("data-cms-blocks") && !/^(SCRIPT|STYLE|LINK|TEMPLATE|NOSCRIPT)$/.test(k.tagName)).map((k, i) => {
    const h = k.querySelector("h1,h2,h3");
    const t = (h && h.textContent.replace(/\s+/g, " ").trim()) || k.getAttribute("aria-label") || "";
    return { el: k, i, title: t, sig: i + "|" + slug(t) };
  });
}
// find a saved section again: same heading first (the page may have gained sections), else the same position
function findSection(secs, sig) {
  const [i, h] = String(sig).split("|");
  return (h && secs.find((s) => s.sig.split("|")[1] === h)) || secs[+i] || null;
}

/* ---- hide / restyle sections, custom CSS --------------------------------------------------------------------------- */
const STYLE_KEYS = { bg: "background", color: "color", align: "text-align", padTop: "padding-top", padBottom: "padding-bottom", radius: "border-radius", maxWidth: "max-width" };
const cssSafe = (v) => String(v == null ? "" : v).replace(/[<>{};]|\/\*|\*\//g, "").slice(0, 300);
function sectionCss(path) {
  const all = C("page-sections", {});
  if (!isObj(all)) return "";
  let css = "";
  const g = all["*"];
  if (isObj(g) && g.css) css += String(g.css).replace(/<\/?style/gi, "") + "\n";
  const p = all[path];
  if (isObj(p)) {
    if (isObj(p.style)) for (const [sig, st] of Object.entries(p.style)) if (isObj(st)) {
      const rules = Object.entries(STYLE_KEYS).filter(([k]) => st[k] != null && st[k] !== "").map(([k, prop]) => `${prop}:${cssSafe(st[k])}!important`);
      if (rules.length) css += `[data-cms-sec="${cssSafe(sig).replace(/"/g, "")}"]{${rules.join(";")}}\n`;
    }
    if (p.css) css += String(p.css).replace(/<\/?style/gi, "") + "\n";
  }
  return css;
}

/* ---- logos ------------------------------------------------------------------------------------------------------- */
// where each logo is on the page (the admin's Logos section lists the same names)
// (header, footer, portal and product logos are swapped where they are drawn: cmsLogo() in Logos13 / PR5Logo / Footer)
const LOGO_SPOTS = {
  sampledge: ".sx9-orb__core",
};
// an uploaded logo for a spot ("header", "footer", "favicon", "portal:<slug>", "product:<id>", "sampledge"), or ""
function cmsLogo(k) {
  const L = C("logos", {});
  const u = isObj(L) ? L[k] : "";
  return typeof u === "string" && /^(https:\/\/|\/)/.test(u) ? u : "";
}
function logoSwap(root) {
  const L = C("logos", {});
  if (!isObj(L)) return;
  for (const [k, sel] of Object.entries(LOGO_SPOTS)) {
    const url = L[k];
    if (typeof url !== "string" || !url) continue;
    root.querySelectorAll(sel).forEach((el) => {
      if (el.getAttribute("data-cms-logo") === url) return;
      el.setAttribute("data-cms-logo", url);
      el.innerHTML = "";
      const img = document.createElement("img");
      img.src = url; img.alt = k === "header" || k === "footer" ? "Frequent Research" : ""; img.className = "cms-logo cms-logo--" + k.replace(/:.*/, "");
      el.appendChild(img);
    });
  }
  if (L.favicon && typeof L.favicon === "string") document.querySelectorAll("link[rel~=icon]").forEach((l) => l.href !== L.favicon && (l.href = L.favicon));
}

/* ---- card templates (blog and case study lists) -------------------------------------------------------------- */
let cardsCss = null;
function cardTemplates() {
  const t = C("card-templates", {});
  if (!isObj(t) || !Object.keys(t).length) return;
  // the card designs' styles load only when a design is picked (styles/cards78.css)
  if (!cardsCss) cardsCss = import("../styles/cards78.css?inline").then((m) => { const st = document.createElement("style"); st.id = "cms78-card-designs"; st.textContent = m.default; document.head.appendChild(st); }).catch(() => {});
  const h = document.documentElement;
  for (const k of ["blog", "cases"]) if (t[k] && t[k] !== "default") h.setAttribute("data-cms-" + k, String(t[k]).replace(/[^a-z0-9-]/g, ""));
  // the super admin's own card design: CSS written in Blog > Card design (no HTML, no imports, no scripts)
  const own = typeof t.css === "string" ? t.css.replace(/<[^>]*>?/g, "").replace(/@import[^;]*;?/gi, "").replace(/expression\s*\(|javascript:|behavior\s*:/gi, "").slice(0, 20000) : "";
  let st = document.getElementById("cms78-cards");
  if (own && !st) { st = document.createElement("style"); st.id = "cms78-cards"; document.head.appendChild(st); }
  if (st && st.textContent !== own) st.textContent = own;
  if (isObj(t.posts)) {
    document.querySelectorAll('a[href^="/blog/"]').forEach((a) => {
      const s = a.getAttribute("href").slice(6).replace(/[/?#].*$/, ""), tpl = t.posts[s];
      if (!tpl) return;
      const card = a.closest("article, li, .card, [class*=card]") || a;
      card.setAttribute("data-cms-card", String(tpl).replace(/[^a-z0-9-]/g, ""));
    });
  }
}

/* ---- forms: extra fields, hidden fields, new labels ---------------------------------------------------------- */
// which form is this? (the same keys are listed in Admin › Forms)
function formKey(form) {
  const p = here();
  if (form.closest(".fc, .fc-panel, [class*=fr-chat], [class*=fc-]")) return "chat";
  if (form.closest("[class*=rv-], .rv")) return "review";
  if (form.hasAttribute("data-cms-form")) return form.getAttribute("data-cms-form");
  const inDialog = !!form.closest("[role=dialog], dialog, .frg, [class*=gate]");
  if (/^\/industries-case-studies/.test(p)) return "case-study";
  if (/^\/downloads\/[^/]+-panel-books\//.test(p)) return "panel-download";
  if (inDialog || /^\/downloads/.test(p)) return "download";
  if (/^\/lets-talk/.test(p)) return "lets-talk";
  if (/^\/careers/.test(p)) return "careers";
  if (/^\/government-opinion-research/.test(p)) return "gov-brief";
  const m = /^\/services\/(market-research|digital-marketing|it-development|accounts-finance)/.exec(p);
  if (m) return { "market-research": "mr-enquiry", "digital-marketing": "dm-enquiry", "it-development": "it-enquiry", "accounts-finance": "af-enquiry" }[m[1]];
  return "other:" + p;
}
const FORMS = () => { const f = C("forms", {}); return isObj(f) && isObj(f.forms) ? f.forms : {}; };
const labelText = (w) => { const l = w.querySelector("label, legend, .fm-f__l, span"); return l ? l.textContent.replace(/\*/g, "").replace(/\s+/g, " ").trim() : ""; };
// the wrapper of one field: go up from the control while the parent holds no other control
function fieldWrap(ctl, form) {
  let w = ctl;
  while (w.parentElement && w.parentElement !== form && w.parentElement.querySelectorAll("input,select,textarea").length === 1) w = w.parentElement;
  return w;
}
function makeField(form, f, n) {
  // a field of the form to copy the look of: a real, visible one (not the hidden spam trap), inside its own wrapper
  const ok = (c) => !c.matches(".hp, [tabindex='-1'], [aria-hidden=true], [hidden]") && c.closest("[data-cms-field]") == null && fieldWrap(c, form) !== c;
  const cands = [...form.querySelectorAll('input[type=text], input[type=email], input[type=tel], input:not([type]), textarea')].filter(ok);
  const sample = cands.find((c) => c.tagName === "INPUT") || cands[0] || null;
  const name = "x_" + (String(f.name || f.label || "field" + n).toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 40));
  let w;
  const kind = f.type || "text";
  if (sample) {
    const base = fieldWrap(sample, form);
    w = base.cloneNode(true);
    w.querySelectorAll("[id]").forEach((x) => x.removeAttribute("id"));
    w.querySelectorAll("em, small, .fm-st, [role=alert]").forEach((x) => x.remove());
    w.className = String(w.className).replace(/\b(is-bad|is-ok|has-v)\b/g, "").trim();
    w.querySelectorAll(".fm-meter, .fm-count, .fm-hint").forEach((x) => x.remove());
    const inp = w.querySelector("input, textarea");
    let ctl;
    if (kind === "select" || kind === "textarea" || inp.tagName !== "INPUT") {
      const tag = kind === "select" || kind === "textarea" ? kind : "input";
      ctl = document.createElement(tag);
      ctl.className = inp.className;
      if (kind === "select") ctl.innerHTML = `<option value="">${f.placeholder || "Choose…"}</option>` + (f.options || []).map((o) => `<option>${String(o).replace(/</g, "&lt;")}</option>`).join("");
      else if (tag === "textarea") ctl.rows = 3;
      else ctl.type = ["email", "tel", "number", "date", "url", "checkbox"].includes(kind) ? kind : "text";
      // copied from a text box: give the new control the same inner spacing
      if (inp.tagName === "TEXTAREA" && tag !== "textarea") { const cs = getComputedStyle(inp); ctl.style.cssText = `width:100%;border:0;background:transparent;color:inherit;font:inherit;padding:${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`; }
      inp.replaceWith(ctl);
    } else {
      ctl = inp;
      ctl.type = ["email", "tel", "number", "date", "url", "checkbox"].includes(kind) ? kind : "text";
      ctl.value = "";
    }
    ctl.name = name;
    ctl.id = "cmsf-" + name + "-" + Math.random().toString(36).slice(2, 7);
    ctl.placeholder = kind === "select" ? "" : " ";
    ctl.required = !!f.required;
    ["aria-invalid", "aria-describedby", "autocomplete", "maxlength"].forEach((a) => ctl.removeAttribute(a));
    const lab = w.querySelector("label");
    if (lab) { lab.htmlFor = ctl.id; lab.textContent = (f.label || "Field") + (f.required ? " *" : ""); }
    ctl.addEventListener("input", () => w.classList.toggle("has-v", !!ctl.value));
    if (kind === "select") w.classList.add("has-v");
  } else {
    w = document.createElement("label");
    w.className = "cmsf-f";
    w.innerHTML = `<span>${String(f.label || "Field").replace(/</g, "&lt;")}${f.required ? " *" : ""}</span>`;
    const ctl = document.createElement(kind === "textarea" ? "textarea" : kind === "select" ? "select" : "input");
    if (kind === "select") ctl.innerHTML = `<option value=""></option>` + (f.options || []).map((o) => `<option>${String(o).replace(/</g, "&lt;")}</option>`).join("");
    else if (kind !== "textarea") ctl.type = kind;
    ctl.name = name; ctl.required = !!f.required;
    w.appendChild(ctl);
  }
  w.setAttribute("data-cms-field", name);
  w.setAttribute("data-cms-label", f.label || name);
  if (f.help) { const s = document.createElement("small"); s.className = "cmsf-help"; s.textContent = f.help; w.appendChild(s); }
  return w;
}
function patchForm(form) {
  const key = formKey(form), cfg = FORMS()[key];
  form.setAttribute("data-cms-key", key);
  if (!isObj(cfg)) return;
  // new labels / button texts in this form
  if (isObj(cfg.labels)) form.querySelectorAll("label, legend, button, span, p, h2, h3, strong, b").forEach((el) => {
    if (el.children.length > 1) return;
    const t = el.textContent.replace(/\s+/g, " ").trim(), to = cfg.labels[t] || cfg.labels[t.replace(/\s*\*$/, "")];
    if (to && el.childNodes.length) { for (const n of el.childNodes) if (n.nodeType === 3 && n.nodeValue.trim()) { n.nodeValue = n.nodeValue.replace(n.nodeValue.trim(), to); break; } }
  });
  // hidden built-in fields (never the email, and never one the form requires)
  if (Array.isArray(cfg.hide)) form.querySelectorAll("input,select,textarea").forEach((ctl) => {
    if (ctl.closest("[data-cms-field]") || ctl.type === "email" || ctl.required || ctl.type === "hidden") return;
    const w = fieldWrap(ctl, form);
    if (cfg.hide.includes(labelText(w))) w.setAttribute("data-cms-hide", "1");
  });
  // extra fields, shown on the step that has the send button
  const add = Array.isArray(cfg.add) ? cfg.add.filter((f) => isObj(f) && f.label) : [];
  if (!add.length) return;
  const send = form.querySelector('button[type=submit], input[type=submit]');
  let box = form.querySelector(":scope [data-cms-extras]");
  if (!send) { if (box) box.hidden = true; return; }
  if (!box) {
    box = document.createElement("div");
    box.setAttribute("data-cms-extras", key);
    box.className = "cmsf";
    add.forEach((f, i) => box.appendChild(makeField(form, f, i)));
    const consent = [...form.querySelectorAll("input[type=checkbox]")].pop();
    const anchor = consent ? fieldWrap(consent, form) : send.closest("div, p") && send.closest("div, p") !== form ? send.closest("div, p") : send;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(box, anchor);
    else form.appendChild(box);
  }
  box.hidden = false;
}
function extraValues(form) {
  const o = {}, missing = [];
  form.querySelectorAll("[data-cms-extras]:not([hidden]) [data-cms-field]").forEach((w) => {
    const c = w.querySelector("input,select,textarea");
    if (!c) return;
    const v = c.type === "checkbox" ? (c.checked ? "yes" : "") : c.value.trim();
    if (c.required && !v) missing.push(c);
    if (v) o[w.getAttribute("data-cms-label")] = v;
  });
  return { o, missing };
}
let lastSubmit = null;
function formsStart() {
  // check the extra fields before the form's own code runs, and remember them for the request it sends
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    const { o, missing } = extraValues(form);
    if (missing.length) { e.preventDefault(); e.stopImmediatePropagation(); missing[0].focus(); missing[0].reportValidity && missing[0].reportValidity(); return; }
    lastSubmit = { key: form.getAttribute("data-cms-key") || formKey(form), extra: o, at: Date.now() };
  }, true);
  const f0 = window.fetch;
  window.fetch = function (u, opts) {
    try {
      const s = typeof u === "string" ? u : (u && u.url) || "";
      if (lastSubmit && Date.now() - lastSubmit.at < 8000 && opts && opts.body && /\/api\/v1\/(enquiry|resource-download|case-study-download|download|careers|chat\/start|reviews|newsletter)\b/.test(s)) {
        const ls = lastSubmit;
        if (typeof opts.body === "string" && opts.body.trim().startsWith("{")) {
          const b = JSON.parse(opts.body);
          b.formKey = b.formKey || ls.key;
          if (Object.keys(ls.extra).length) b.extra = { ...(isObj(b.extra) ? b.extra : {}), ...ls.extra };
          opts = { ...opts, body: JSON.stringify(b) };
        } else if (typeof FormData !== "undefined" && opts.body instanceof FormData) {
          if (!opts.body.has("formKey")) opts.body.append("formKey", ls.key);
          if (Object.keys(ls.extra).length) opts.body.append("extra", JSON.stringify(ls.extra));
        }
      }
    } catch (e) {}
    return f0.call(this, u, opts);
  };
}

/* ---- new sections inside existing pages --------------------------------------------------------------------- */
let blocksMod = null;
const loadBlocks = () => (blocksMod ||= import("./cmsBlocks.jsx"));
function pageBlocks(path) {
  const all = C("page-blocks", {});
  const l = isObj(all) ? all[path] : null;
  return Array.isArray(l) ? l.filter((b) => isObj(b) && b.show !== false) : [];
}
function placeBlocks(path, secs) {
  const list = pageBlocks(path);
  if (!list.length) return;
  const main = document.getElementById("main");
  if (!main || !secs.length) return;
  // group by position
  const groups = new Map();
  for (const b of list) { const at = b.at || "end"; if (!groups.has(at)) groups.set(at, []); groups.get(at).push(b); }
  for (const [at, blocks] of groups) {
    const id = path + "@" + at;
    if (main.querySelector(`[data-cms-blocks="${CSS.escape(id)}"]`)) continue;
    let ref = null, where = "after";
    if (at === "start") { ref = secs[0].el; where = "before"; }
    else if (at === "end") { ref = secs[secs.length - 1].el; }
    else { const m = /^(after|before):(.+)$/.exec(at); if (m) { where = m[1]; const s = findSection(secs, m[2]); ref = s && s.el; } }
    if (!ref) continue;
    const box = document.createElement("div");
    box.setAttribute("data-cms-blocks", id);
    box.className = "cmsb-host";
    ref.parentElement.insertBefore(box, where === "before" ? ref : ref.nextSibling);
    loadBlocks().then((m) => m.cmsMountBlocks(box, blocks)).catch(() => {});
  }
}


/* ---- build 78.3: SEO per page and picture alt text --------------------------------------------------------------- */
function metaTag(attr, name, content) {
  let m = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (content === undefined || content === null || content === "") return;
  if (!m) { m = document.createElement("meta"); m.setAttribute(attr, name); m.setAttribute("data-cms-seo", "1"); document.head.appendChild(m); }
  if (m.getAttribute("content") !== String(content)) m.setAttribute("content", String(content));
}
function applySeo(path) {
  const all = C("seo", {});
  if (!isObj(all)) return;
  // remove what an earlier page added
  document.head.querySelectorAll("[data-cms-seo-page]").forEach((x) => { if (x.getAttribute("data-cms-seo-page") !== path) x.remove(); });
  const s = all[path];
  if (!isObj(s)) return;
  if (s.title) { const t = String(s.title); if (document.title !== t) document.title = t; }
  metaTag("name", "description", s.description);
  metaTag("name", "keywords", s.keywords);
  metaTag("property", "og:title", s.ogTitle || s.title);
  metaTag("property", "og:description", s.ogDescription || s.description);
  metaTag("property", "og:image", s.ogImage);
  metaTag("name", "twitter:title", s.ogTitle || s.title);
  metaTag("name", "twitter:description", s.ogDescription || s.description);
  metaTag("name", "twitter:image", s.ogImage);
  if (s.noindex) {
    let r = document.head.querySelector('meta[name="robots"]');
    if (!r) { r = document.createElement("meta"); r.setAttribute("name", "robots"); r.setAttribute("data-cms-seo-page", path); document.head.appendChild(r); }
    r.setAttribute("content", "noindex, nofollow");
  }
  if (s.canonical) {
    let l = document.head.querySelector('link[rel="canonical"]');
    if (!l) { l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); }
    const href = /^https?:\/\//.test(s.canonical) ? s.canonical : location.origin + (String(s.canonical).startsWith("/") ? s.canonical : "/" + s.canonical);
    if (l.href !== href) l.href = href;
  }
  if (s.schema && !document.head.querySelector(`script[data-cms-seo-page="${CSS.escape(path)}"]`)) {
    let data = s.schema;
    if (typeof data === "string") { try { data = JSON.parse(data); } catch (e) { data = null; } }
    if (data && typeof data === "object") {
      const sc = document.createElement("script");
      sc.type = "application/ld+json";
      sc.setAttribute("data-cms-seo-page", path);
      sc.textContent = JSON.stringify(data).replace(/</g, "\\u003c");
      document.head.appendChild(sc);
    }
  }
}
// old addresses that should open another page
function seoRedirect(path) {
  const all = C("seo", {});
  const list = isObj(all) && Array.isArray(all._redirects) ? all._redirects : [];
  const r = list.find((x) => isObj(x) && x.from && x.to && normPath(x.from) === path && normPath(x.to) !== path);
  if (!r) return false;
  const to = String(r.to);
  if (/^https?:\/\//.test(to)) location.replace(to);
  else { history.replaceState(null, "", to); window.dispatchEvent(new PopStateEvent("popstate")); }
  return true;
}
const picKey = (src) => { try { const u = new URL(src, location.href); return u.origin === location.origin ? u.pathname.replace(/^(\/api\/v1\/files\/[a-f0-9]{24})\/.*$/, "$1") : u.href; } catch (e) { return String(src || ""); } };
function applyAlts(root) {
  const alts = C("image-alts", {});
  if (!isObj(alts) || !Object.keys(alts).length) return;
  const map = new Map(Object.entries(alts).map(([k, v]) => [picKey(k), String(v)]));
  root.querySelectorAll("img[src]").forEach((img) => {
    const a = map.get(picKey(img.getAttribute("src")));
    if (a !== undefined && img.getAttribute("alt") !== a) img.setAttribute("alt", a);
  });
}

/* ---- run on every page ---------------------------------------------------------------------------------------- */
function applyPage() {
  const path = here();
  if (seoRedirect(path)) return;
  applySeo(path);
  applyAlts(document);
  // styles for this page
  let st = document.getElementById("cms78-css");
  const css = sectionCss(path) + "[data-cms-hide]{display:none!important}";
  if (!st) { st = document.createElement("style"); st.id = "cms78-css"; document.head.appendChild(st); }
  if (st.textContent !== css) st.textContent = css;
  const conf = C("page-sections", {})[path];
  const secs = sectionsOf();
  if (isObj(conf)) {
    const hide = new Set(Array.isArray(conf.hide) ? conf.hide : []), styled = isObj(conf.style) ? Object.keys(conf.style) : [];
    for (const sig of hide) { const s = findSection(secs, sig); if (s) s.el.setAttribute("data-cms-hide", "1"); }
    for (const sig of styled) { const s = findSection(secs, sig); if (s) s.el.setAttribute("data-cms-sec", sig); }
  }
  placeBlocks(path, secs);
  document.querySelectorAll("form").forEach(patchForm);
  logoSwap(document);
  cardTemplates();
}

let on = false;
function cms78Start() {
  if (on || typeof window === "undefined" || /^\/admin/.test(here())) return;
  on = true;
  const any = ["page-blocks", "page-sections", "forms", "logos", "card-templates", "seo", "image-alts"].some((k) => CMS_RAW[k] != null);
  if (isObj(FORMS()) && Object.keys(FORMS()).length) formsStart();
  if (!any) return;
  let t = 0, last = "";
  let lastRun = 0;
  const run = () => { t = 0; lastRun = Date.now(); try { applyPage(); } catch (e) { console.warn("[cms]", e); } };
  const soon = () => { if (!t) t = setTimeout(run, Math.max(150, 500 - (Date.now() - lastRun))); };
  // only new elements matter (a section mounting, a form or a dialog opening), not counters or tickers changing text
  new MutationObserver((list) => {
    for (const m of list) for (const n of m.addedNodes) if (n.nodeType === 1 && n.children.length && !n.closest("[data-cms-blocks]")) return soon();
  }).observe(document.body, { childList: true, subtree: true });
  window.addEventListener("popstate", soon);
  window.addEventListener("fr-nav", () => {
    // a new page: drop the previous page's new sections
    if (here() !== last) document.querySelectorAll("[data-cms-blocks]").forEach((b) => { if (!b.getAttribute("data-cms-blocks").startsWith(here() + "@")) b.remove(); });
    last = here(); soon();
  });
  last = here();
  soon();
}

// product sites live in shadow roots (src/products/_shell): text, picture and link changes and logos reach them too
function cmsShadow(root) {
  try { if (window.__frCmsShadow) window.__frCmsShadow(root); logoSwap(root); applyAlts(root); } catch (e) {}
}

export { cms78Start, cmsCustomPage, cmsLogo, cmsMenuExtra, cmsShadow, findSection, formKey as cmsFormKey, loadBlocks as cmsLoadBlocks, sectionsOf };

// the admin's page scanner (admin/Builder.jsx) opens a page in a frame and asks it for its sections and forms
if (typeof window !== "undefined" && window.parent !== window) {
  window.__frCms78 = {
    sections: () => sectionsOf().map(({ el, ...s }) => ({ ...s, tag: el.tagName.toLowerCase(), cls: String(el.className || "").slice(0, 80), hidden: el.hasAttribute("data-cms-hide") })),
    forms: () => [...document.querySelectorAll("form")].filter((f) => !f.closest("[data-cms-blocks]")).map((f) => ({
      key: f.getAttribute("data-cms-key") || formKey(f),
      fields: [...f.querySelectorAll("input,select,textarea")].filter((c) => c.type !== "hidden" && c.type !== "submit" && !c.closest("[data-cms-field]") && c.name !== "website").map((c) => labelText(fieldWrap(c, f)) || c.name || c.placeholder).filter(Boolean),
    })),
    show: (sig) => { const s = findSection(sectionsOf(), sig); if (s) { s.el.scrollIntoView({ behavior: "smooth", block: "start" }); s.el.style.outline = "3px solid #2F6BFF"; setTimeout(() => (s.el.style.outline = ""), 1600); } },
  };
}
