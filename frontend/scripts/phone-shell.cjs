// Build 75: the phone first screen of the home page, ready-made in dist/index.html.
// Usage: node scripts/phone-shell.cjs dist      (run after prerender.cjs, before compress.cjs)
//
// On a phone (width up to 767 px, English, address "/") the home page shows this ready-made copy of its first screen
// (menu bar, the still hero, the bottom bar) with only the styles it needs, written into the page itself. The full
// site starts as soon as the visitor touches, taps, types or scrolls with a wheel (vite/fr-site.js, cms loader), and
// then replaces the copy with the real page, which looks the same (the hero is still on phones, Hero63.jsx).
// A button tapped on the copy is tapped again on the real page once it is there (src/main.jsx).
//
// How the copy is made: the built site is opened at phone size in headless Chromium (?fr-nolite), the first screen's
// elements are copied as they are drawn, and every CSS rule that applies to them (light and dark theme) is kept.
const fs = require('fs'), path = require('path'), http = require('http');
const { chromium } = require('playwright');
const outDir = path.resolve(process.argv[2] || 'dist');
// build 80.1 (Kunal, 11 Nov 2026: "every page incl. blogs"): every page gets its own first-screen copy, not only home.
// Left out: the admin, the 404 page and the 7 Sampledge product sites (drawn inside a shadow root, see ProductSite.jsx).
// FR_SHELL_ONLY=/a,/b limits the run to those pages (for testing).
const SKIP = /^\/(admin|404)(\/|$)|^\/products\/(sampcode|sampbidx|samptrek|sampaudience|sampforce|talk2tax|sampcrew)$/;
const MARK = /<!--fr-shell-->[\s\S]*?<!--\/fr-shell-->\n?/g;
const PRE = /<script id="fr-pre">window\.__FR_PRE_TAGS=(\[(?:[^\]"]|"(?:[^"\\]|\\.)*")*\]);[\s\S]*?<\/script>/;
// the page as it was before this script (so it can run twice); restore the asset tags it moved
const clean = (html) => {
  html = html.replace(MARK, '');
  { const m = html.match(PRE); if (m) html = html.replace(PRE, JSON.parse(m[1]).join('\n')); }
  { const m = html.match(/<script id="fr-font">window\.__FR_FONT_TAG=("(?:[^"\\]|\\.)*");[\s\S]*?<\/script>/); if (m) html = html.replace(m[0], () => JSON.parse(m[1])); }
  return html;
};
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'assets' && e.name !== 'data') walk(f); }
    else if (e.name === 'index.html') {
      const route = '/' + path.relative(outDir, path.dirname(f)).split(path.sep).join('/');
      const r = route === '/' ? '/' : route.replace(/\/$/, '');
      if (!SKIP.test(r)) pages.push({ route: r, file: f });
    }
  }
})(outDir);
const ONLY = (process.env.FR_SHELL_ONLY || '').split(',').filter(Boolean);
const todo = ONLY.length ? pages.filter((x) => ONLY.includes(x.route)) : pages;
for (const x of todo) fs.writeFileSync(x.file, clean(fs.readFileSync(x.file, "utf8")));
const file = path.join(outDir, 'index.html');

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.mp4': 'video/mp4' };
const server = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  if (u.startsWith('/api/')) { r.writeHead(200, { 'Content-Type': 'application/json' }); return r.end(u.includes('celebrations') ? '{"ok":false,"events":null}' : '{"ok":false}'); }
  let f = path.join(outDir, u);
  if (!f.startsWith(outDir)) { r.writeHead(403); return r.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) f = file;
  r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
});

(async () => {
  await new Promise((ok) => server.listen(0, ok));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}), args: ['--disable-dev-shm-usage', '--no-sandbox'] }) // build 82.5: Docker's small /dev/shm froze Chromium;
  // build 76: a phone copy (412 px, shown up to 767 px) and a desktop copy (1350 px, shown from 768 px)
  const capture = async (kind, route) => {
  const page = await browser.newPage(kind === 'p' ? { viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, colorScheme: 'light' } : { viewport: { width: 1350, height: 940 }, deviceScaleFactor: 1, colorScheme: 'light' });
  // no celebration on the copy (the real banner comes with the site), no intro
  await page.route('**/data/celebrations*', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"events":[]}' }));
  await page.addInitScript(() => { window.__FR_INTRO = false; try { localStorage.clear(); } catch (e) {} });
  await page.goto(base + route + '?fr-nolite', { waitUntil: 'load' });
  await page.waitForSelector('#root > header', { timeout: 30000 });
  await page.waitForSelector('#root > main > *', { timeout: 30000 });
  await page.waitForTimeout(route === '/' ? 3500 : 1800);
  // a Sampledge product site (drawn inside a shadow root) cannot be copied: such a page starts as before
  if (await page.$('#root .pz-host')) throw new Error('product site, left as it is');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  // 1. mark what the copy keeps and the buttons to tap again later, then copy it
  // build 80.1: the web fonts the headline is drawn in are preloaded, so the headline does not jump when they arrive
  const fonts = await page.evaluate(() => {
    const fam = new Set();
    for (const el of document.querySelectorAll('#root > main h1, #root > main h1 *')) { const f = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim(); if (f) fam.add(f + '|' + getComputedStyle(el).fontStyle); }
    const urls = [];
    for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch (e) { continue; } for (const r of rules) {
      if (r.type !== 5) continue;
      const f = (r.style.getPropertyValue('font-family') || '').replace(/["']/g, '').trim(), st = r.style.getPropertyValue('font-style') || 'normal', ur = r.style.getPropertyValue('unicode-range') || '';
      if (!fam.has(f + '|' + st)) continue;
      if (ur && !/U\+0(000)?-0?0?FF/i.test(ur)) continue;
      const m = /url\(["']?([^"')]+\.woff2)["']?\)/.exec(r.style.getPropertyValue('src') || r.cssText);
      if (m && m[1].includes('/assets/') && !urls.includes(m[1])) urls.push(new URL(m[1], location.href).pathname);
    } }
    return [...new Set(urls)].slice(0, 3);
  });
  const shell = await page.evaluate((KIND) => {
    const root = document.getElementById('root'), vh = innerHeight;
    document.querySelectorAll('.cb22-wrap').forEach((e) => e.remove());
    const kids = [...root.children].filter((e) => {
      if (e.matches('footer, .drawer, .prerender, [aria-hidden="true"]')) return false;
      if (e.tagName === 'MAIN') return true;
      const b = e.getBoundingClientRect(), s = getComputedStyle(e);
      return e.matches('a.skip') || (s.display !== 'none' && s.visibility !== 'hidden' && b.width > 0 && b.height > 0 && b.top < vh);
    });
    const path = (el) => { const p = []; while (el && el !== root) { p.unshift(':nth-child(' + ([...el.parentElement.children].indexOf(el) + 1) + ')'); el = el.parentElement; } return '#root > ' + p.join(' > '); };
    // left out of the copy: anything not drawn (display: none) and the content of the hero's hidden slides when the
    // hero keeps its height without it (the empty slides stay, so the tabs still point at them)
    for (const [sq, hq] of [['.hz-slides', '.hz-slide:not(.is-on)'], ['.d79-hx__slides', '.d79-hx__slide:not(.is-on)'], ['.d79-hx__art', '.d79-hx__pane:not(.is-on)']]) {
      const sl = document.querySelector(sq), hid = [...document.querySelectorAll(hq)];
      if (!sl || !hid.length) continue;
      const h0 = sl.getBoundingClientRect().height;
      hid.forEach((x) => (x.style.display = 'none'));
      const h1 = sl.getBoundingClientRect().height;
      hid.forEach((x) => (x.style.display = ''));
      if (Math.abs(h0 - h1) < 1) hid.forEach((x) => [...x.children].forEach((c) => c.setAttribute('data-frx', '')));
    }
    for (const k of kids) for (const e of k.querySelectorAll('*')) if (!e.closest('[data-frx]') && getComputedStyle(e).display === 'none') e.setAttribute('data-frx', '');
    // phone: the tiny animated product marks in the hero's bottom strip (behind the bottom bar) carry about 70 KB of
    // styles; the copy keeps their place and leaves the marks out
    if (KIND === 'p') document.querySelectorAll('#root section.hz svg[class^="sxl-"]').forEach((e) => { const b = e.getBoundingClientRect(); const s = e.parentElement.style; s.width = b.width + 'px'; s.height = b.height + 'px'; s.display = 'inline-block'; e.setAttribute('data-frx', ''); });
    // the copy is a still picture: running loops are paused where they are; entrance animations that have finished
    // are dropped so the element keeps its final look
    for (const a of document.getAnimations()) {
      const t = a.effect && a.effect.target, tm = a.effect && a.effect.getComputedTiming();
      if (!t || !t.setAttribute || !tm) continue;
      if (tm.iterations === Infinity || a.effect.pseudoElement) continue;
      // keep the final look (finished, or still coming in): the animation's last frame is written on the element
      // (read from its keyframes, so nothing on the page is moved on and no animation events fire)
      const kfs = a.effect.getKeyframes(), cs = getComputedStyle(t);
      const end = {}; for (const k of kfs) if ((k.computedOffset ?? k.offset) === 1) Object.assign(end, k);
      for (const p of Object.keys(end)) {
        if (p === 'offset' || p === 'easing' || p === 'composite' || p === 'computedOffset') continue;
        const n = p.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
        t.style.setProperty(n, a.playState === 'finished' ? cs.getPropertyValue(n) : end[p]);
      }
      t.setAttribute('data-fr-end', '');
    }
    const keep = [];
    const mark = (el) => { if (el.closest('[data-frx]')) return; el.setAttribute('data-frk', ''); keep.push(el); };
    for (const x of [document.documentElement, document.body, root]) mark(x);
    const out = [];
    for (const k of kids) {
      let node;
      if (k.tagName === 'MAIN') {
        const home = k.querySelector(':scope > section.hz, :scope > section.d79-hero');
        const heroes = home ? [home] : [...k.children].filter((c) => { const b = c.getBoundingClientRect(), s = getComputedStyle(c); return s.display !== 'none' && b.height > 0 && b.top < vh; }).slice(0, 4);
        mark(k);
        node = k.cloneNode(false);
        // inner pages: only what is drawn in the first screen goes into the copy (a long article stays out)
        if (!home) for (const hero of heroes) for (const e of hero.querySelectorAll('*')) { if (e.closest('[data-frx]')) continue; const b = e.getBoundingClientRect(); if (b.top > vh + 40 && b.height > 0) e.setAttribute('data-frx', ''); }
        for (const hero of heroes) {
          hero.querySelectorAll('*').forEach(mark); mark(hero);
          hero.querySelectorAll('button, [role="tab"], [role="button"], input, select, textarea, summary').forEach((b) => b.setAttribute('data-fr-q', path(b)));
          node.appendChild(hero.cloneNode(true));
        }
      } else {
        mark(k); k.querySelectorAll('*').forEach(mark);
        [k, ...k.querySelectorAll('*')].filter((b) => b.matches('button, [role="tab"], [role="button"], input, select, textarea, summary')).forEach((b) => b.setAttribute('data-fr-q', path(b)));
        node = k.cloneNode(true);
      }
      node.querySelectorAll('[data-frx], script, canvas, video, iframe, audio, object, embed, .cb22-wrap').forEach((e) => e.remove());
      // pictures other than the logo come in once the page has loaded and been drawn (the first paint does not wait)
      node.querySelectorAll('img').forEach((i) => { i.removeAttribute('loading'); if (i.matches('.fx-static') || !i.getAttribute('src') || i.getAttribute('src').startsWith('data:')) return; i.setAttribute('data-fr-src', i.getAttribute('src')); i.removeAttribute('src'); if (i.hasAttribute('srcset')) { i.setAttribute('data-fr-srcset', i.getAttribute('srcset')); i.removeAttribute('srcset'); } });
      // pictures with their own animation styles (the product marks): the copy is still, so their keyframes go
      node.querySelectorAll('svg style').forEach((st) => {
        let t = st.textContent, o = '', i = 0;
        for (let m; (m = /@(-webkit-)?keyframes[^{]*\{/g.exec(t.slice(i))); ) {
          const a = i + m.index; let j = a + m[0].length, d = 1;
          for (; j < t.length && d; j++) d += t[j] === '{' ? 1 : t[j] === '}' ? -1 : 0;
          o += t.slice(i, a); i = j;
        }
        st.textContent = o + t.slice(i);
      });
      node.setAttribute('data-fr-shell', KIND);
      out.push(node.outerHTML);
    }
    document.querySelectorAll('[data-fr-q]').forEach((e) => e.removeAttribute('data-fr-q'));
    document.querySelectorAll('[data-frx]').forEach((e) => e.removeAttribute('data-frx'));
    document.querySelectorAll('[data-fr-end]').forEach((e) => e.removeAttribute('data-fr-end'));
    return out.join('').replace(/ data-frk=""/g, '');
  }, kind);

  // 2. the CSS rules that apply to the marked elements, light and dark
  const pass = () => page.evaluate(() => {
    const split = (s) => { const r = []; let d = 0, c = ''; for (const ch of s) { if (ch === '(' || ch === '[') d++; else if (ch === ')' || ch === ']') d--; if (ch === ',' && !d) { r.push(c.trim()); c = ''; } else c += ch; } if (c.trim()) r.push(c.trim()); return r; };
    const strip = (s) => s.replace(/::?(before|after|placeholder|selection|marker|first-letter|first-line|backdrop|file-selector-button|-webkit-[\w-]+|-moz-[\w-]+)(\([^)]*\))?/g, '').replace(/:(hover|focus-visible|focus-within|focus|active|visited|target|checked|disabled|enabled|invalid|valid|placeholder-shown|autofill)(?![\w-])/g, '').trim();
    const hit = (sel) => { let s = strip(sel); if (!s || /[>+~]\s*$/.test(s)) s = (s || '') + '*'; try { return !!document.querySelector(':is(' + s + ')[data-frk]') || !!document.querySelector(s + '[data-frk]'); } catch (e) { return true; } };
    const keep = new Set();
    const walk = (rules, id) => { [...rules].forEach((r, i) => {
      const k = id + '.' + i;
      if (r.type === 1) { if (split(r.selectorText).some(hit)) keep.add(k); }
      else if (r.cssRules && (r.type === 4 || r.type === 12 || r.type === 18 || r.type === 13)) walk(r.cssRules, k);
      else keep.add(k);
    }); };
    [...document.styleSheets].forEach((sh) => { let rules; try { rules = sh.cssRules; } catch (e) { return; } if (!sh.href || sh.href.includes('/assets/')) walk(rules, sh.href || 'inline'); });
    return [...keep];
  });
  const light = await pass();
  await page.evaluate(() => new Promise((ok) => {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (document.getElementById('fr-dark-link')) return setTimeout(ok, 500);
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.id = 'fr-dark-link'; l.href = window.__FR_DARK; l.onload = l.onerror = () => setTimeout(ok, 500); document.head.appendChild(l);
  }));
  const dark = await pass();
  const css = await page.evaluate(async ([keys, KIND]) => {
    const keep = new Set(keys), anims = new Set(), out = [];
    const mobile = KIND === 'p'
      ? (m) => !/print/.test(m) && !/min-width:\s*(7[7-9]\d|[89]\d\d|\d{4,})(\.\d+)?px/.test(m) && !/min-width:\s*(4[89]|[5-9]\d|\d{3,})(\.\d+)?em/.test(m)
      : (m) => !/print/.test(m) && !/max-width:\s*(\d{1,2}|[1-6]\d\d|7[0-5]\d|76[0-7])(\.\d+)?px/.test(m);
    // a shorthand written with var() can read back from the CSSOM as empty longhands: such rules are copied from the
    // stylesheet's own text instead (found by selector and checked by parsing them again)
    const SRC = {};
    for (const sh of document.styleSheets) if (sh.href && sh.href.includes('/assets/')) { const t = await (await fetch(sh.href)).text(); const n = []; let ns = ''; for (let i = 0; i < t.length; i++) if (!/\s/.test(t[i])) { ns += t[i]; n.push(i); } SRC[sh.href] = { t, ns, n }; }
    const probe = new CSSStyleSheet();
    const text = (r, href) => {
      const t = r.cssText;
      if (!/:\s*;/.test(t)) return t;
      const S = SRC[href];
      if (S) {
        const key = r.selectorText.replace(/\s+/g, '') + '{';
        for (let i = S.ns.indexOf(key); i >= 0; i = S.ns.indexOf(key, i + 1)) {
          if (i > 0 && !'{};'.includes(S.ns[i - 1])) continue;
          const o = S.n[i]; let j = S.t.indexOf('{', o), d = 0, k = j;
          for (; k < S.t.length; k++) { if (S.t[k] === '{') d++; else if (S.t[k] === '}' && !--d) break; }
          const cand = S.t.slice(o, k + 1);
          try { while (probe.cssRules.length) probe.deleteRule(0); probe.insertRule(cand); if (probe.cssRules[0].cssText === t) return cand; } catch (e) {}
        }
      }
      console.warn('phone shell: rule kept as read back: ' + r.selectorText);
      return t;
    };
    const ser = (rules, id, href) => { let s = ''; [...rules].forEach((r, i) => {
      const k = id + '.' + i;
      if (r.type === 1) { if (keep.has(k)) { s += text(r, href); for (const m of r.cssText.matchAll(/animation(?:-name)?:([^;}]+)/g)) for (const w of m[1].split(/[\s,]+/)) anims.add(w); } }
      else if (r.type === 4) { if (mobile(r.media.mediaText)) { const b = ser(r.cssRules, k, href); if (b) s += '@media ' + r.media.mediaText + '{' + b + '}'; } }
      else if (r.type === 12) { const b = ser(r.cssRules, k, href); if (b) s += '@supports ' + r.conditionText + '{' + b + '}'; }
      else if (r.type === 7) s += '\u0000KF' + r.name + '\u0000' + r.cssText + '\u0000';
      else if (r.type === 5 || r.type === 15 || r.type === 3) { if (r.type !== 3) s += r.cssText; }
      else if (keep.has(k) && r.cssText && r.type !== 1) s += r.cssText;
    }); return s; };
    const outD = [];
    [...document.styleSheets].forEach((sh) => { let rules; try { rules = sh.cssRules; } catch (e) { return; } if (!sh.href || sh.href.includes('/assets/')) (sh.href && sh.href.includes('/assets/dark.') ? outD : out).push(ser(rules, sh.href || 'inline', sh.href)); });
    // keyframes: only the ones in use, and of several with the same name only the last (the one that applies)
    const kf = (txt) => { const last = new Map(); let i = 0; txt.replace(/\u0000KF([^\u0000]*)\u0000([^\u0000]*)\u0000/g, (m, n) => (last.set(n, i++), m)); i = 0; return txt.replace(/\u0000KF([^\u0000]*)\u0000([^\u0000]*)\u0000/g, (m, n, t) => (last.get(n) === i++ && anims.has(n) ? t : '')); };
    return { light: kf(out.join('')), dark: kf(outD.join('')) };
  }, [[...new Set([...light, ...dark])], kind]);
  await page.close();
  if (!shell.includes('data-fr-shell') || css.light.length < 2000) throw new Error('first-screen copy: nothing captured (' + kind + ')');
  return { shell, css, fonts };
  };
  // 3. write it into the page: the styles (phones only), the copy (first in #root), the asset tags started by script
  const write = (file, P, D) => {

  let out = clean(fs.readFileSync(file, 'utf8'));
  const tags = [...out.matchAll(/<link rel="modulepreload" crossorigin href="[^"]+">|<link rel="preload" as="style" crossorigin href="[^"]+" id="fr-css">/g)].map((m) => m[0]);
  if (!tags.length) throw new Error('phone shell: asset tags not found in ' + file);
  // the first tag keeps its place as the script (it comes before the cms loader); the others are removed
  const pre = `<script id="fr-pre">window.__FR_PRE_TAGS=${JSON.stringify(tags)};window.__FR_PRE=function(){if(window.__FR_PRE.d)return;window.__FR_PRE.d=1;var h=document.createElement("div");h.innerHTML=window.__FR_PRE_TAGS.join("");var x=document.getElementById("fr-pre");while(h.firstChild)x.parentNode.insertBefore(h.firstChild,x)};if(!window.__FR_LITE)window.__FR_PRE()</script>`;
  out = out.replace(tags[0], () => pre);
  for (const t of tags.slice(1)) out = out.replace(t + '\n', '').replace(t, '');
  const still = '[data-fr-shell],[data-fr-shell] *,[data-fr-shell] *::before,[data-fr-shell] *::after{animation-play-state:paused!important;transition:none!important}[data-fr-shell] [data-fr-end],[data-fr-shell] [data-fr-end]::before,[data-fr-shell] [data-fr-end]::after{animation:none!important}';
  const esc = (c) => c.replace(/<\/(style|template)/gi, '<\\/$1');
  // the phone copy is in the page as it is (with its styles for phones only); the desktop copy waits in a <template>
  // (not drawn, not styled on a phone) and a small script puts it in place on a wider screen
  // the dark-theme styles of each copy wait in a <template> too and are added only when the page is dark
  const fl = [...new Set([...(P.fonts || []), ...(D.fonts || [])])].slice(0, 4).map((u) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="${u}">`).join('');
  out = out.replace('</head>', () => `<!--fr-shell-->${fl}<style id="fr-lite-css">${still}@media (min-width: 768px){#root>[data-fr-shell=p]{display:none!important}}</style><style id="fr-lite-css-p" media="(max-width: 767px)">${esc(P.css.light)}</style><!--/fr-shell-->\n</head>`);
  const pick = '<script id="fr-sh">(function(){if(!window.__FR_LITE)return;var d=document,r=d.getElementById("root"),dk=d.documentElement.getAttribute("data-theme")==="dark",ph=matchMedia("(max-width: 767px)").matches,add=function(id){var t=d.getElementById(id);if(t)d.head.appendChild(t.content.cloneNode(true))};if(!ph){var t=d.getElementById("fr-sh-d").content.cloneNode(true);d.head.appendChild(t.querySelector("style"));r.insertBefore(t,r.firstChild)}if(dk)add(ph?"fr-sh-pk":"fr-sh-dk");var im=function(){d.querySelectorAll("[data-fr-src]").forEach(function(i){if(i.hasAttribute("data-fr-srcset"))i.srcset=i.getAttribute("data-fr-srcset");i.src=i.getAttribute("data-fr-src")})};var go=function(){requestAnimationFrame(function(){setTimeout(im,0)})};if(d.readyState==="complete")go();else addEventListener("load",go)})()</script>';
  const tpl = `<template id="fr-sh-d"><style id="fr-lite-css-d">${esc(D.css.light)}</style>${D.shell}</template><template id="fr-sh-pk"><style id="fr-lite-css-pk">${esc(P.css.dark)}</style></template><template id="fr-sh-dk"><style id="fr-lite-css-dk">${esc(D.css.dark)}</style></template>`;
  out = out.replace(/(<div id="root"[^>]*>)/, (m) => m + '<!--fr-shell-->' + P.shell + tpl + pick + '<!--/fr-shell-->');
  if (!out.includes('data-fr-shell')) throw new Error('first-screen copy: #root not found in ' + file);
  // the web fonts: on the copy they are fetched once the page has loaded and been drawn (the text shows at once)
  const ft = out.match(/<link rel="preload" as="style" href="(https:\/\/fonts\.googleapis\.com[^"]+)" onload="[^"]*" \/>/);
  if (ft) {
    const href = ft[1].replace(/&amp;/g, '&');
    out = out.replace(ft[0], () => `<script id="fr-font">window.__FR_FONT_TAG=${JSON.stringify(ft[0])};(function(){var h=${JSON.stringify(href)},d=document,l=d.createElement("link");if(window.__FR_LITE){var f=function(){l.rel="stylesheet";l.href=h;d.head.appendChild(l)};var g=function(){requestAnimationFrame(function(){setTimeout(f,0)})};if(d.readyState==="complete")g();else addEventListener("load",g)}else{l.rel="preload";l.as="style";l.href=h;l.onload=function(){l.onload=null;l.rel="stylesheet"};d.head.appendChild(l)}})()</script>`);
  } else console.warn('first-screen copy: web font tag not found in ' + file);
  // the boot script (vite/boot.js) uses the copies only when they are there
  out = out.replace('<script>window.__FR_DARK=', () => '<!--fr-shell--><script>window.__FR_SHELL=1</script><!--/fr-shell-->\n<script>window.__FR_DARK=');
  fs.writeFileSync(file, out);
  for (const x of ['.gz', '.br']) fs.rmSync(file + x, { force: true });
  return [P, D];
  };
  let done = 0, failed = [];
  const queue = todo.slice();
  const t0 = Date.now();
  console.log('first-screen copies: starting ' + todo.length + ' pages (this step takes 60-90 minutes; progress every 10 pages)');
  const worker = async () => {
    for (let x; (x = queue.shift()); ) {
      try {
        // build 82.5: a page that never settles must not stall the build: 150 s per page, then it is skipped
        let tm; const guard = new Promise((_, no) => { tm = setTimeout(() => no(new Error('page timeout (150 s)')), 150000); });
        const [P, D] = await Promise.race([guard, (async () => [await capture('p', x.route), await capture('d', x.route)])()]).finally(() => clearTimeout(tm));
        const [p, d] = write(x.file, P, D);
        if (x.route === '/' || todo.length < 20) for (const [k, y] of [['phone', p], ['desktop', d]]) console.log(x.route + ' ' + k + ' first-screen copy: ' + (y.shell.length / 1024).toFixed(1) + ' KB of markup, ' + (y.css.light.length / 1024).toFixed(1) + ' + ' + (y.css.dark.length / 1024).toFixed(1) + ' KB (dark) of styles');
      } catch (e) { failed.push(x.route); console.warn('first-screen copy skipped for ' + x.route + ': ' + String(e.message || e).split('\n')[0]); }
      if (++done % 10 === 0 || done === todo.length) { const sec = (Date.now() - t0) / 1000; console.log('first-screen copies: ' + done + ' / ' + todo.length + ' (' + Math.round(sec) + ' s, about ' + Math.max(0, Math.round(sec / done * (todo.length - done) / 60)) + ' min left)'); }
    }
  };
  await Promise.all(Array.from({ length: +(process.env.FR_SHELL_WORKERS || 5) }, worker));
  await browser.close(); server.close();
  console.log('first-screen copies: ' + (done - failed.length) + ' of ' + todo.length + ' pages' + (failed.length ? ', skipped: ' + failed.join(' ') : ''));
  if (todo.some((x) => x.route === '/') && failed.includes('/')) process.exit(1);
})().catch((e) => { console.error(e); process.exit(1); });
