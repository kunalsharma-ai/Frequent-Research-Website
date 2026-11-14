/*
 * Readable text in both themes (build 67, Kunal 6 Nov 2026: "every single text colour contrast should match").
 *
 * After each page is drawn (and again when the theme changes or new content appears) this looks at every element
 * with its own text and a solid background behind it. When the text colour is below WCAG AA against that background
 * (4.5:1, or 3:1 for large text) it gets a darker shade (on light backgrounds) or a lighter shade (on dark ones) of
 * the SAME colour: hue and design stay, only the shade moves as far as needed. Text on gradients and pictures is
 * handled in styles/contrast67.css instead. Decorative numbers (very large or nearly transparent) are left alone.
 * Works in small slices during idle time so scrolling and typing never wait for it.
 */
const SKIP = "svg, script, style, noscript, [data-cms-skip], .cur-ring, .cur-dot, .sr-only, .adm, [aria-hidden='true'], .fc-panel";
let bgCache = new WeakMap();
/* build 74: parts that change their classes many times a second while they move (the industry sphere, the hero slides,
   tickers, the celebration banner); their colours are checked when they first appear, not on every move */
const BUSY = ".hm-sphere, .hz-slides, .hz-tabs, .cb22, [class*='ticker'], [class*='marquee'], .ldr-dots";

const parse = (c) => {
  const m = /rgba?\(([^)]+)\)/.exec(c || "");
  if (!m) return null;
  const v = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 };
};
const lin = (x) => ((x /= 255) <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const blend = (t, b) => ({ r: t.r * t.a + b.r * (1 - t.a), g: t.g * t.a + b.g * (1 - t.a), b: t.b * t.a + b.b * (1 - t.a), a: 1 });

// colours behind an element: one for a plain background, several for a gradient (every stop is checked);
// null when a picture is behind it (white labels on colour fills are left to styles/contrast67.css)
const root = () => parse(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
const bgOf = (el) => under(el);
function under(el) {
  if (bgCache.has(el)) return bgCache.get(el);
  let res;
  const cs = getComputedStyle(el);
  const up = () => (el.parentElement && el.parentElement !== document.documentElement ? under(el.parentElement) : [{ ...root(), a: 1 }]);
  const img = cs.backgroundImage && cs.backgroundImage !== "none" ? cs.backgroundImage : "";
  const c = parse(cs.backgroundColor);
  if (img && /url\(/.test(img)) res = null;
  else if (img) {
    // a section's gradient: each stop over what is under it
    const base = c && c.a >= 0.95 ? [{ ...c, a: 1 }] : up();
    if (!base) res = null;
    else {
      const stops = [...img.matchAll(/rgba?\([^)]+\)/g)].map((m) => parse(m[0])).filter(Boolean);
      res = [];
      for (const u of base) for (const s of stops.length ? stops : [{ r: 0, g: 0, b: 0, a: 0 }]) res.push(blend(s, c && c.a > 0 && c.a < 0.95 ? blend(c, u) : u));
      if (res.length > 12) res = res.filter((_, i) => i % Math.ceil(res.length / 12) === 0);
    }
  } else if (c && c.a >= 0.95) res = [{ ...c, a: 1 }];
  else { const u = up(); res = u && c && c.a > 0 ? u.map((x) => blend(c, x)) : u; }
  bgCache.set(el, res);
  return res;
}
const worst = (col, bgs) => Math.min(...bgs.map((b) => ratio(col, b)));

// move the colour toward black or white (keeps the hue) until it reaches `need` against bg
function fix(col, bgs, need) {
  const toDark = bgs.reduce((a, b) => a + lum(b), 0) / bgs.length > 0.3;
  const end = toDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };
  let lo = 0, hi = 1, best = null;
  for (let i = 0; i < 12; i++) {
    const t = (lo + hi) / 2;
    const c = { r: col.r + (end.r - col.r) * t, g: col.g + (end.g - col.g) * t, b: col.b + (end.b - col.b) * t };
    if (worst(c, bgs) >= need) { best = c; hi = t; } else lo = t;
  }
  return best && `rgb(${Math.round(best.r)}, ${Math.round(best.g)}, ${Math.round(best.b)})`;
}

const ownText = (el) => { for (let n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && n.nodeValue.trim().length > 1) return true; return false; };

function check(el) {
  if (el.__cgDone || !ownText(el) || el.closest(SKIP)) return;
  const cs = getComputedStyle(el);
  if (cs.visibility === "hidden" || cs.display === "none") return;
  const size = parseFloat(cs.fontSize) || 16;
  if (size >= 40) return; // decorative numbers
  if (cs.webkitTextFillColor && /rgba\(0, 0, 0, 0\)/.test(cs.webkitTextFillColor)) return; // gradient text
  let col = parse(cs.color);
  if (!col || col.a < 0.5) return;
  const bgs = bgOf(el);
  if (!bgs || !bgs.length) return;
  if (col.a < 1) col = blend(col, bgs[0]);
  // white or near-white labels on colour fills are handled in CSS (darkening them would change the design)
  if (lum(col) > 0.8 && bgs.some((b) => lum(b) > 0.25)) return;
  const need = size >= 24 || (size >= 18.6 && +cs.fontWeight >= 600) ? 3.1 : 4.6;
  if (worst(col, bgs) >= need - 0.1) return;
  const c = fix(col, bgs, need);
  if (!c) return;
  el.__cgDone = true;
  el.style.setProperty("color", c);
  el.setAttribute("data-cg", "");
}

let queue = [], busy = false;
const idle = window.requestIdleCallback || ((f) => setTimeout(() => f({ timeRemaining: () => 8 }), 60));
function pump() {
  busy = true;
  idle((d) => {
    const t0 = performance.now();
    while (queue.length && (d.timeRemaining() > 2 || performance.now() - t0 < 6)) {
      const el = queue.pop();
      if (el.isConnected) try { check(el); } catch (e) {}
    }
    if (queue.length) pump(); else busy = false;
  });
}
function scan(root) {
  if (!root || root.nodeType !== 1) return;
  queue.push(root, ...root.getElementsByTagName("*"));
  if (!busy) pump();
}
function reset() {
  for (const el of document.querySelectorAll("[data-cg]")) { el.style.removeProperty("color"); el.removeAttribute("data-cg"); el.__cgDone = false; }
  bgCache = new WeakMap();
}

function contrastGuardStart() {
  if (typeof window === "undefined" || window.__frCG || /^\/admin/.test(location.pathname)) return;
  window.__frCG = true;
  const full = () => { queue = []; bgCache = new WeakMap(); scan(document.body); };
  /* build 74: the first check waits until the page has loaded and settled, so it never competes with the first screen */
  const first = () => setTimeout(full, 2500);
  if (document.readyState === "complete") first();
  else window.addEventListener("load", first, { once: true });
  let tm = 0;
  const later = (ms) => { clearTimeout(tm); tm = setTimeout(full, ms); };
  window.addEventListener("fr-nav", () => later(900));
  window.addEventListener("popstate", () => later(900));
  // theme switch: undo every change, then check again with the new colours
  new MutationObserver(() => { reset(); later(450); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  // new content (tabs, accordions, dialogs, lazy sections) and state changes (a tab turning "is-on" changes its colours:
  // the earlier change is taken off and the element checked again)
  let pend = new Set(), pt = 0;
  const unfix = (root) => {
    const list = root.hasAttribute && root.hasAttribute("data-cg") ? [root] : [];
    for (const el of root.querySelectorAll ? root.querySelectorAll("[data-cg]") : []) list.push(el);
    for (const el of list) { el.style.removeProperty("color"); el.removeAttribute("data-cg"); el.__cgDone = false; }
  };
  new MutationObserver((list) => {
    for (const m of list) {
      if (m.type === "attributes") { if (m.target.nodeType === 1 && !m.target.closest(SKIP) && !m.target.closest(BUSY)) { unfix(m.target); pend.add(m.target); } }
      else m.addedNodes.forEach((n) => n.nodeType === 1 && pend.add(n));
    }
    if (pend.size && !pt) pt = setTimeout(() => { pt = 0; const p = [...pend]; pend = new Set(); bgCache = new WeakMap(); p.forEach(scan); }, 900);
  }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
}

export { contrastGuardStart };
