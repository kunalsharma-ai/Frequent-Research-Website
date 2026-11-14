// Build 78.1: every page's content, section by section, for the super admin ("Pages & sections").
// Usage: node scripts/site-index.cjs dist [--concurrency 6]      (part of `npm run prerender`, after prerender.cjs)
//
// Opens every route of the build in headless Chromium (like prerender.cjs) and writes, per page, the sections the
// admin knows (the same list as sectionsOf() in src/app/cms78.jsx) with every text, number, picture and link inside:
//   dist/data/site-index.json            { pages: [{ path, title, file, sections, texts }], shared: "…" }
//   dist/data/site-index/<file>.json     { path, title, sections: [{ sig, title, texts, images, links }] }
//   dist/data/site-index/_shared.json    the header and the footer (the same on every page)
// The website never loads these files; only the admin does. Nothing on the pages changes.
const fs = require('fs'), path = require('path'), http = require('http');
const { chromium } = require('playwright');
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const outDir = path.resolve(argv[0] && !argv[0].startsWith('--') ? argv[0] : 'dist');
const CONC = +opt('--concurrency', 6);
const shell = path.join(outDir, fs.existsSync(path.join(outDir, '.shell.html')) ? '.shell.html' : 'index.html');
const idxDir = path.join(outDir, 'data', 'site-index');

// every route = every folder with a prerendered index.html (and the home page)
const routes = ['/'];
const ONLY = opt('--only', '');   // testing: a comma list of routes
(function walk(d, rel) {
  for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    if (!n.isDirectory() || /^(assets|data|media|i18n|\.nginx|admin)$/.test(n.name) && !rel) continue;
    const p = path.join(d, n.name), r = rel + '/' + n.name;
    if (fs.existsSync(path.join(p, 'index.html'))) routes.push(r);
    walk(p, r);
  }
})(outDir, '');

const TYPES = { '.json': 'application/json', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };
const server = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  if (u.startsWith('/api/')) { r.writeHead(404); return r.end(); }
  let f = path.join(outDir, u);
  if (!f.startsWith(outDir)) { r.writeHead(403); return r.end(); }
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = shell; // the plain app, never a ready-made first screen
  r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
});

// runs in the page: the sections (as cms78 sectionsOf) and what is inside each
const EXTRACT = () => {
  const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();
  const slug = (s) => norm(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const SKIP = 'script,style,noscript,template,svg,iframe,canvas,video,audio,[data-cms-blocks],.pp-sr,.sr-only,.rv-ov,.rv-dlg,.chat,.cc-pop,.fc,.fg-ov,.rv-fab,.fq-bar,.hi-pop,.cb22,.sp22';
  const grab = (root) => {
    const texts = [], seenT = new Set(), images = [], seenI = new Set(), links = [], seenL = new Set();
    const addT = (s) => { const n = norm(s); if (n && /[\p{L}\p{N}]/u.test(n) && !seenT.has(n) && n.length <= 2000) { seenT.add(n); texts.push(n); } };
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) { const p = n.parentElement; if (p && !p.closest(SKIP)) addT(n.nodeValue); }
    for (const el of root.querySelectorAll('[placeholder],input[type=submit][value],[aria-label]')) {
      if (el.closest(SKIP)) continue;
      if (el.getAttribute('placeholder')) addT(el.getAttribute('placeholder'));
    }
    for (const im of root.querySelectorAll('img')) {
      if (im.closest(SKIP)) continue;
      const s = im.getAttribute('src') || ''; if (!s || s.startsWith('data:') || seenI.has(s)) continue;
      seenI.add(s); images.push({ src: s, alt: norm(im.getAttribute('alt')) });
    }
    for (const a of root.querySelectorAll('a[href]')) {
      if (a.closest(SKIP)) continue;
      const h = a.getAttribute('href'); const t = norm(a.textContent) || norm(a.getAttribute('aria-label'));
      const k = h + '\u0001' + t; if (!h || h === '#' || seenL.has(k)) continue;
      seenL.add(k); links.push({ href: h, text: t.slice(0, 120) });
    }
    return { texts, images, links };
  };
  // the same walk as sectionsOf() in src/app/cms78.jsx
  let el = document.getElementById('main');
  const out = { title: document.title, sections: [], shared: [] };
  if (el) {
    const kidsOf = (x) => [...x.children].filter((k) => !k.hasAttribute('data-cms-blocks') && !/^(SCRIPT|STYLE|LINK|TEMPLATE|NOSCRIPT)$/.test(k.tagName));
    for (let i = 0; i < 6; i++) { const kids = kidsOf(el); if (kids.length === 1 && !kids[0].matches('section') && kids[0].children.length) { el = kids[0]; continue; } break; }
    out.sections = kidsOf(el).map((k, i) => {
      const h = k.querySelector('h1,h2,h3');
      const t = (h && norm(h.textContent)) || k.getAttribute('aria-label') || '';
      return { sig: i + '|' + slug(t), title: t, ...grab(k) };
    }).filter((s) => s.texts.length || s.images.length || s.links.length);
  }
  const hd = document.querySelector('header'), ft = document.querySelector('footer');
  if (hd && !(el && el.contains(hd))) out.shared.push({ sig: 'header', title: 'Header (every page)', ...grab(hd) });
  if (ft && !(el && el.contains(ft))) out.shared.push({ sig: 'footer', title: 'Footer (every page)', ...grab(ft) });
  return out;
};

const fileOf = (r) => (r === '/' ? 'home' : r.slice(1).replace(/[^a-z0-9-]+/gi, '__')) + '.json';

(async () => {
  await new Promise((ok) => server.listen(0, ok));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}), args: ['--disable-dev-shm-usage', '--no-sandbox'] }) // build 82.5: Docker's small /dev/shm froze Chromium;
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('fr_review_seen', '1'); } catch (e) {} });
  await ctx.addInitScript(() => {
    window.IntersectionObserver = class {
      constructor(cb) { this.cb = cb; }
      observe(el) { setTimeout(() => this.cb([{ isIntersecting: true, intersectionRatio: 1, target: el, boundingClientRect: el.getBoundingClientRect(), intersectionRect: el.getBoundingClientRect(), rootBounds: null, time: 0 }], this), 0); }
      unobserve() {} disconnect() {} takeRecords() { return []; }
    };
  });
  await ctx.route('**/api/**', (r) => r.abort());
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const OUT = ONLY ? path.join(outDir, '..', 'site-index-test') : idxDir;
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const queue = ONLY ? ONLY.split(',') : [...routes], pages = [], failed = [];
  let count = 0; const total = queue.length, t0 = Date.now();
  console.log('site index: starting ' + total + ' pages (about 10-20 minutes; progress every 25 pages)');
  const shared = {}; // header and footer: the first page that shows each (the home page builds its footer late)
  const worker = async () => {
    let pg = await ctx.newPage();
    while (queue.length) {
      const route = queue.shift();
      let tm; const cur = pg;
      try {
        await Promise.race([new Promise((_, no) => { tm = setTimeout(() => no(new Error('page timeout (120 s)')), 120000); }), (async () => {
        await cur.goto('about:blank');
        await cur.goto(base + route, { waitUntil: 'load', timeout: 60000 });
        await cur.waitForFunction(() => { const h = document.querySelector('#root h1'); return h && h.textContent.trim().length > 0; }, null, { timeout: 15000 }).catch(() => {});
        await cur.waitForTimeout(600);
        const ht = await cur.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < ht; y += 1000) { await cur.evaluate((yy) => window.scrollTo(0, yy), y); await cur.waitForTimeout(40); }
        await cur.waitForTimeout(400);
        const r = await cur.evaluate(EXTRACT);
        if (!r.sections.length) { failed.push(route); return; }
        for (const x of r.shared) if (!shared[x.sig] && (x.texts.length || x.links.length)) shared[x.sig] = x;
        const file = fileOf(route);
        fs.writeFileSync(path.join(OUT, file), JSON.stringify({ path: route, title: r.title, sections: r.sections }));
        pages.push({ path: route, title: r.title, file, sections: r.sections.length, texts: r.sections.reduce((a, s) => a + s.texts.length, 0) });
        })()]);
      } catch (e) { failed.push(route + ' (' + String(e.message).slice(0, 60) + ')'); if (/page timeout/.test(String(e))) { try { await pg.close(); } catch (x) {} pg = await ctx.newPage(); } }
      finally { clearTimeout(tm); }
      if (++count % 25 === 0 || count === total) console.log('site index: ' + count + ' / ' + total + ' pages (' + Math.round((Date.now() - t0) / 1000) + ' s)');
    }
    await pg.close();
  };
  await Promise.all(Array.from({ length: CONC }, worker));
  await browser.close(); server.close();
  const sh = ['header', 'footer'].map((k) => shared[k]).filter(Boolean);
  if (sh.length) fs.writeFileSync(path.join(OUT, '_shared.json'), JSON.stringify({ path: '*', title: 'Header and footer', sections: sh }));
  pages.sort((a, b) => a.path.localeCompare(b.path));
  fs.writeFileSync(ONLY ? path.join(OUT, 'list.json') : path.join(outDir, 'data', 'site-index.json'), JSON.stringify({ built: new Date().toISOString(), shared: sh.length ? '_shared.json' : '', pages }));
  const texts = pages.reduce((a, p) => a + p.texts, 0);
  console.log(`site index: ${pages.length} pages, ${pages.reduce((a, p) => a + p.sections, 0)} sections, ${texts} texts` + (failed.length ? `; no sections found on ${failed.length}: ${failed.slice(0, 8).join(', ')}` : ''));
})().catch((e) => { console.error(e); process.exit(1); });
