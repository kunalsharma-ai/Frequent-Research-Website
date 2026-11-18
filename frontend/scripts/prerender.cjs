// Static per-page output for search engines, run after `vite build`.
// Usage: node scripts/prerender.cjs dist [--origin https://www.frequentresearch.com] [--concurrency 4]
//
// 1. Crawls every in-app route (all site links "/…", starting from the home page) of the Vite build in headless Chromium
// 2. Writes one real file per route: dist/services/it-development/it-consulting/index.html …
//    each with that page's own <title>, meta description, canonical, Open Graph/Twitter tags, JSON-LD and a readable,
//    crawlable copy of its content (real-path links), followed by the normal app (the same /assets files Vite wrote).
// 3. Writes sitemap.xml, robots.txt, 404.html and server rules (.htaccess for Apache, .nginx/redirects.conf, nginx.conf.example).
//
// The app uses normal addresses (React Router BrowserRouter). A tiny boot script in index.html turns old /#/some/path
// links into /some/path before the app starts.
// Build-time dependency only: playwright (Chromium). Set CHROME_PATH to use an installed Chromium.
const fs = require('fs'), path = require('path'), http = require('http'), zlib = require('zlib');
const { chromium } = require('playwright');
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const outDir = path.resolve(argv[0] && !argv[0].startsWith('--') ? argv[0] : 'dist');
const ORIGIN = opt('--origin', 'https://www.frequentresearch.com').replace(/\/$/, '');
const CONC = +opt('--concurrency', 4);
const TODAY = new Date().toISOString().slice(0, 10);
const REDIRECTS = require('../src/config/redirects.json');

// ---------- the Vite page: head pieces every page keeps, and the built asset tags ----------
const shellFile = path.join(outDir, 'index.html');
const src = fs.existsSync(path.join(outDir, '.shell.html')) ? fs.readFileSync(path.join(outDir, '.shell.html'), 'utf8') : fs.readFileSync(shellFile, 'utf8');
fs.writeFileSync(path.join(outDir, '.shell.html'), src); // the untouched Vite page, so prerender can run twice
const headTop = src.slice(0, src.indexOf('</head>'));
const keep = [];
// the Google tag (GTM-TDDKS62) stays first in <head> on every page
{ const m = headTop.match(/<!-- Google tag \(GTM-[\s\S]*?<script async src="https:\/\/www\.googletagmanager\.com\/gtm\.js\?id=GTM-[A-Z0-9]+"><\/script>\s*<script>[\s\S]*?<\/script>/); if (m) keep.push(m[0]); else throw new Error('Google tag not found in dist/index.html'); }
for (const re of [/<meta charset[^>]*>/, /<meta name="viewport"[^>]*>/]) { const m = headTop.match(re); if (m) keep.push(m[0]); }
{ const m = headTop.match(/<script>window\.__FR_DARK=[^<]*<\/script>\s*<script id="fr-boot">[\s\S]*?<\/script>\s*<style id="fr-boot-css">[\s\S]*?<\/style>/); if (m) keep.push(m[0]); else throw new Error('boot script not found in dist/index.html'); }
for (const re of [/<meta name="theme-color"[^>]*>/, /<link rel="icon"[^>]*>/]) { const m = headTop.match(re); if (m) keep.push(m[0]); }
for (const m of headTop.matchAll(/<link rel="preconnect"[^>]*>|<link rel="preload" as="style" href="https:\/\/fonts\.googleapis\.com[^>]*>|<noscript><link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*><\/noscript>/g)) keep.push(m[0]);
// (build 67: the app script is started by the cms loader, <script id="fr-cms">, see vite/fr-site.js)
const ASSETS = [...headTop.matchAll(/<script type="module" crossorigin src="[^"]+"><\/script>|<script id="fr-cms">[\s\S]*?<\/script>|<link rel="modulepreload"[^>]*>|<link rel="stylesheet" crossorigin href="[^"]+"\s*\/?>|<link rel="preload" as="style" crossorigin href="[^"]+" id="fr-css"><noscript><link rel="stylesheet" crossorigin href="[^"]+"><\/noscript>/g)].map((m) => m[0]);
if (!ASSETS.length) throw new Error('built assets not found in dist/index.html (run vite build first)');
const attr = (re) => { const m = headTop.match(re); return m ? m[1].replace(/&amp;/g, '&') : ''; };
const SITE = { title: attr(/<title>([^<]*)<\/title>/), desc: attr(/<meta name="description" content="([^"]*)"/), ogTitle: attr(/<meta property="og:title" content="([^"]*)"/), ogDesc: attr(/<meta property="og:description" content="([^"]*)"/) };
const BOOT = (headTop.match(/<script>\/\* old #\/ addresses[\s\S]*?<\/script>/) || [''])[0];
if (!BOOT) throw new Error('old-link boot script not found in dist/index.html');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function pageHtml(m, body) {
  const ld = (m.ld || []).map((t) => `<script type="application/ld+json">${t.replace(/<\/script/gi, '<\\/script')}</script>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
${keep.join('\n')}
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.desc)}" />
${m.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${esc(m.url)}" />\n<meta name="robots" content="index,follow" />`}
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Frequent Research" />
<meta property="og:title" content="${esc(m.ogTitle || m.title)}" />
<meta property="og:description" content="${esc(m.ogDesc || m.desc)}" />
<meta property="og:url" content="${esc(m.url)}" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${esc(m.ogTitle || m.title)}" />
<meta name="twitter:description" content="${esc(m.ogDesc || m.desc)}" />
${ld}
${BOOT}
${ASSETS.join('\n')}
<style>.prerender{max-width:1100px;margin:0 auto;padding:24px 16px;font:16px/1.6 Inter,system-ui,sans-serif;color:#0B1437}.prerender a{color:#0B22A8}.prerender nav,.prerender footer{font-size:14px}</style>
</head>
<body>
<div id="root">${body}</div>
</body>
</html>
`;
}
// ---------- 2. local server (SPA fallback to the shell) ----------
const TYPES = {'.json': 'application/json',  '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png' };
const server = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  if (u.startsWith('/api/')) { r.writeHead(404); return r.end(); }
  let f = path.join(outDir, u);
  if (!f.startsWith(outDir)) { r.writeHead(403); return r.end(); }
  // crawl failures surface as a missing <h1>; the run then reports them as skipped
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(outDir, 'index.html');
  r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
});

// ---------- 3. crawl + extract ----------
const EXTRACT = (origin) => {
  const SKIP = new Set(['SCRIPT', 'STYLE', 'SVG', 'svg', 'NOSCRIPT', 'TEMPLATE', 'IFRAME', 'CANVAS', 'VIDEO', 'AUDIO', 'FORM', 'INPUT', 'SELECT', 'TEXTAREA', 'DIALOG']);
  const KEEP = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'UL', 'OL', 'LI', 'A', 'STRONG', 'EM', 'B', 'I', 'SECTION', 'ARTICLE', 'NAV', 'HEADER', 'FOOTER', 'MAIN', 'ASIDE', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'DL', 'DT', 'DD', 'BLOCKQUOTE', 'FIGURE', 'FIGCAPTION', 'BR', 'IMG']);
  const BLOCK = new Set(['DIV', 'BUTTON', 'LABEL', 'SUMMARY', 'DETAILS', 'SPAN', 'SMALL']);
  const e = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const ea = (s) => e(s).replace(/"/g, '&quot;');
  const walk = (n) => {
    if (n.nodeType === 3) return e(n.nodeValue.replace(/\s+/g, ' '));
    if (n.nodeType !== 1) return '';
    const t = n.tagName;
    if (SKIP.has(t) || n.hidden || (n.getAttribute('aria-hidden') === 'true' && !n.hasAttribute('data-pr-keep')) || n.classList.contains('pp-sr') || n.classList.contains('sr-only')) return '';
    if (n.closest && n.closest('.rv-ov,.rv-dlg,.chat,.cc-pop,.fc,.fg-ov,.rv-fab,.fq-bar,.hi-pop,.cb22,.sp22')) return '';
    // build 79: a page's old hero, hidden under the new one (design79/s79.css), stays out, so the page keeps one H1
    if (n.matches('.h79-swap + * > :first-child:is(section, header)')) return '';
    const inner = () => [...n.childNodes].map(walk).join('');
    if (t === 'IMG') { const s = n.getAttribute('src') || ''; return /^https?:/.test(s) && n.alt ? `<img src="${ea(s)}" alt="${ea(n.alt)}" loading="lazy">` : ''; }
    if (t === 'BR') return '<br>';
    if (t === 'A') {
      let href = n.getAttribute('href') || '';
      if (href.startsWith('#/')) href = href.slice(1).split('?')[0] || '/';
      else if (/^\/(?!\/)/.test(href)) href = href.split('?')[0].split('#')[0] || '/';
      else if (!/^(https?:|mailto:|tel:)/.test(href)) return inner();
      const c = inner() || (n.getAttribute('aria-label') ? e(n.getAttribute('aria-label')) : ''); return c.trim() ? `<a href="${ea(href)}">${c}</a>` : ''; // build 82.7: icon links (social profiles) keep their label
    }
    // build 83.4: a heading drawn letter by letter (aria-hidden letters, e.g. the panel-book country name) keeps its aria-label
    if (KEEP.has(t)) { let c = inner(); if (!c.trim() && /^H[1-6]$/.test(t) && n.getAttribute('aria-label')) c = e(n.getAttribute('aria-label')); if (!c.trim() && t !== 'TD' && t !== 'TH') return ''; const tg = t.toLowerCase(); return `<${tg}>${c}</${tg}>`; }
    const c = inner();
    return BLOCK.has(t) && t !== 'SPAN' && t !== 'SMALL' && c.trim() ? ' ' + c + ' ' : c;
  };
  const root = document.getElementById('root');
  let body = walk(root).replace(/\s{2,}/g, ' ').replace(/<(p|li|h\d)>\s+/g, '<$1>');
  const m = (sel, attr = 'content') => { const x = document.head.querySelector(sel); return x ? x.getAttribute(attr) : ''; };
  const ld = [...new Set([...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent.trim()).filter(Boolean))];
  const links = [...document.querySelectorAll('a[href^="/"], a[href^="#/"]')].map((a) => a.getAttribute('href')).filter((h) => !/^\/\/|^\/(api|assets|data|media|i18n)\/|\.[a-z0-9]{2,4}([?#]|$)/i.test(h));
  return { title: document.title, desc: m('meta[name="description"]'), canonical: m('link[rel="canonical"]', 'href'), ogTitle: m('meta[property="og:title"]'), ogDesc: m('meta[property="og:description"]'), ld, body, links, h1: (document.querySelector('h1') || {}).innerText || '' };
};

(async () => {
  await new Promise((ok) => server.listen(0, ok));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}), args: ['--disable-dev-shm-usage', '--no-sandbox'] }) // build 82.5: Docker's small /dev/shm froze Chromium;
  // reduced motion: count-ups, typing effects and reveals render their final state immediately (no half-finished numbers)
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('fr_review_seen', '1'); } catch (e) {} });
  // every "reveal when scrolled into view" section counts as visible at once, so the copy never depends on scroll timing
  await ctx.addInitScript(() => {
    window.IntersectionObserver = class {
      constructor(cb) { this.cb = cb; }
      observe(el) { setTimeout(() => this.cb([{ isIntersecting: true, intersectionRatio: 1, target: el, boundingClientRect: el.getBoundingClientRect(), intersectionRect: el.getBoundingClientRect(), rootBounds: null, time: 0 }], this), 0); }
      unobserve() {} disconnect() {} takeRecords() { return []; }
    };
  });
  await ctx.route('**/api/**', (r) => r.abort());
  // third-party requests are not needed to render content (and may be unreachable on build machines)
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const norm = (h) => { let p = h.replace(/^#/, '').split('?')[0].split('#')[0]; if (!p.startsWith('/')) p = '/' + p; return p.length > 1 ? p.replace(/\/+$/, '') : '/'; };
  const queue = ['/'], seen = new Set(queue), done = [], skipped = [], retried = new Set();
  let active = 0;
  const worker = async () => {
    let pg = await ctx.newPage();
    const errs = []; pg.on('pageerror', (e) => errs.push(String(e).slice(0, 160)));
    while (queue.length || active) {
      if (!queue.length) { await new Promise((ok) => setTimeout(ok, 100)); continue; }
      const route = queue.shift(); active++;
      // build 51: a page that never settles must not stall the whole crawl — give each route 90 s, then move on
      let timer;
      const guard = new Promise((_, no) => { timer = setTimeout(() => no(new Error('route timeout')), 90000); });
      try {
      await Promise.race([guard, (async () => {
      errs.length = 0;
      // full page load per route (a hash-only change would keep app state from the previous page)
      await pg.goto('about:blank');
      await pg.goto(base + route, { waitUntil: 'load' });
      await pg.waitForFunction(() => { const h = document.querySelector('#root h1'); return h && h.textContent.trim().length > 0; }, null, { timeout: 10000 }).catch(() => {});
      await pg.waitForTimeout(500);
      const ht = await pg.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < ht; y += 1200) { await pg.evaluate((yy) => window.scrollTo(0, yy), y); await pg.waitForTimeout(25); }
      await pg.waitForTimeout(250);
      const r = await pg.evaluate(EXTRACT, ORIGIN);
      const fixOrigin = (t) => t.split(encodeURIComponent(base + '/#')).join(encodeURIComponent(ORIGIN)).split(encodeURIComponent(base)).join(encodeURIComponent(ORIGIN)).split(base + '/#/').join(ORIGIN + '/').split(base).join(ORIGIN);
      r.ld = r.ld.map(fixOrigin); r.body = fixOrigin(r.body); r.canonical = fixOrigin(r.canonical || '');
      if (!r.desc) r.desc = SITE.desc;
      if (r.ogTitle === SITE.ogTitle && route !== '/') r.ogTitle = r.title;
      if (r.ogDesc === SITE.ogDesc && route !== '/') r.ogDesc = r.desc;
      for (const l of r.links) { const p = norm(l); if (!seen.has(p)) { seen.add(p); queue.push(p); } }
      if (/not found/i.test(r.title) || /not found/i.test(r.h1) || errs.length) { skipped.push([route, r.title, errs[0] || '']); return; }
      const url = ORIGIN + (route === '/' ? '/' : route);
      const file = path.join(outDir, route === '/' ? 'index.html' : route.slice(1) + '/index.html');
      fs.mkdirSync(path.dirname(file), { recursive: true });
      done.push({ route, url, file, html: pageHtml({ ...r, url }, `<div class="prerender">${r.body}</div>`), title: r.title, desc: r.desc });
      if (done.length % 25 === 0) console.log('search-engine pages: rendered', done.length, 'queued', queue.length);
      })()]);
      } catch (e) {
        if (/route timeout/.test(String(e)) && !retried.has(route)) { retried.add(route); queue.push(route); console.log('retry later', route); try { await pg.close(); } catch (x) {} pg = await ctx.newPage(); pg.on('pageerror', (er) => errs.push(String(er).slice(0, 160))); continue; }
        skipped.push([route, '', String(e.message || e).slice(0, 160)]);
        console.log('skipped', route, String(e.message || e).slice(0, 80));
        if (/route timeout/.test(String(e))) { try { await pg.close(); } catch (x) {} pg = await ctx.newPage(); pg.on('pageerror', (er) => errs.push(String(er).slice(0, 160))); }
      } finally { clearTimeout(timer); active--; }
    }
    await pg.close();
  };
  const ws = []; for (let i = 0; i < CONC; i++) ws.push(worker());
  await Promise.all(ws);
  await browser.close(); server.close();
  for (const d of done) fs.writeFileSync(d.file, d.html);

  // ---------- 4. sitemap, robots, server rules ----------
  done.sort((a, b) => a.route.localeCompare(b.route));
  // 404 page: the app shell (it shows its own "not found" view), served with HTTP 404 and noindex
  fs.writeFileSync(path.join(outDir, '404.html'), pageHtml({ title: 'Page not found | Frequent Research', desc: SITE.desc, url: ORIGIN + '/', noindex: true, ld: [] }, '<div class="prerender"><h1>Page not found</h1><p><a href="/">Go to the Frequent Research home page</a></p></div>'));
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` + done.map((d) => `  <url><loc>${esc(d.url)}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n') + `\n</urlset>\n`);
  fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
  // permanent redirects for removed pages (src/config/redirects.json): Apache here, nginx in .nginx/redirects.conf
  const RW_APACHE = REDIRECTS.map(([a, b]) => `RewriteRule ^${a.slice(1).replace(/[.]/g, '\\.')}/?$ ${b} [L,R=301]`).join('\n');
  const RW_NGINX = REDIRECTS.map(([a, b]) => `location ~ ^${a}/?$ { return 301 ${b}; }`).join('\n');
  fs.writeFileSync(path.join(outDir, '.htaccess'), `# Apache (Hostinger, cPanel …): serve /path from /path/index.html without adding a trailing slash
DirectoryIndex index.html
DirectorySlash Off
RewriteEngine On
# build 62: services that were removed or merged (301, permanent)
${RW_APACHE}
# canonical host (uncomment once HTTPS and the www host are confirmed)
# RewriteCond %{HTTP_HOST} ^frequentresearch\\.com$ [NC]
# RewriteRule ^ https://www.frequentresearch.com%{REQUEST_URI} [L,R=301]
# /path/ -> /path (the canonical form), except the site root
RewriteCond %{REQUEST_URI} ^(.+)/$
RewriteCond %{DOCUMENT_ROOT}%1/index.html -f
RewriteRule ^(.+)/$ /$1 [L,R=301]
# /path -> /path/index.html when it exists
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.+)$ /$1/index.html [L]
# anything else -> real 404 status with the app's "not found" view
ErrorDocument 404 /404.html
# build 74: browsers keep the site's files for a year (their names change whenever their content changes), other
# pictures, fonts and media for 30 days, and always re-check the pages themselves (Lighthouse "efficient cache lifetimes")
<IfModule mod_headers.c>
  <FilesMatch "(-[A-Za-z0-9_-]{8}\\.(js|css|map|webp|png|jpg|jpeg|svg|avif|gif|woff2?|mp3|mp4)|\\.[0-9a-f]{8,12}\\.(css|js|webp|png|jpg|jpeg|svg|json|woff2?))$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(webp|png|jpg|jpeg|svg|avif|gif|ico|woff2?|ttf|mp3|mp4|webm|pdf)$">
    Header setifempty Cache-Control "public, max-age=2592000"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 30 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType image/svg+xml "access plus 30 days"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
# build 74: send the ready-made Brotli / gzip copies (file.js.br, file.js.gz) to browsers that accept them
<IfModule mod_rewrite.c>
  RewriteCond %{HTTP:Accept-Encoding} br
  RewriteCond %{REQUEST_FILENAME}.br -f
  RewriteRule ^(.+\\.(js|css|json|svg|map))$ /$1.br [L]
  RewriteCond %{HTTP:Accept-Encoding} gzip
  RewriteCond %{REQUEST_FILENAME}.gz -f
  RewriteRule ^(.+\\.(js|css|json|svg|map))$ /$1.gz [L]
</IfModule>
<FilesMatch "\\.js\\.(br|gz)$">
  ForceType text/javascript
</FilesMatch>
<FilesMatch "\\.css\\.(br|gz)$">
  ForceType text/css
</FilesMatch>
<FilesMatch "\\.(json|map)\\.(br|gz)$">
  ForceType application/json
</FilesMatch>
<FilesMatch "\\.svg\\.(br|gz)$">
  ForceType image/svg+xml
</FilesMatch>
<IfModule mod_headers.c>
  <FilesMatch "\\.(js|css|json|svg|map)\\.br$">
    Header set Content-Encoding br
    Header append Vary Accept-Encoding
  </FilesMatch>
  <FilesMatch "\\.(js|css|json|svg|map)\\.gz$">
    Header set Content-Encoding gzip
    Header append Vary Accept-Encoding
  </FilesMatch>
</IfModule>
<IfModule mod_mime.c>
  AddEncoding br .br
  AddEncoding gzip .gz
</IfModule>
# build 56: compress text files (the app bundle shrinks to about a third)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript text/javascript application/json image/svg+xml text/plain application/xml
</IfModule>
`);
  // the frontend container's nginx includes this file (frontend/nginx/default.conf.template)
  fs.mkdirSync(path.join(outDir, '.nginx'), { recursive: true });
  fs.writeFileSync(path.join(outDir, '.nginx', 'redirects.conf'), RW_NGINX + '\n');
  fs.writeFileSync(path.join(outDir, 'prerender-report.json'), JSON.stringify({ origin: ORIGIN, generated: new Date().toISOString(), assets: ASSETS, pages: done.map((d) => ({ route: d.route, title: d.title, titleLen: d.title.length, descLen: (d.desc || '').length })), skipped }, null, 1));
  console.log('pages', done.length, 'skipped', skipped.length, 'assets', ASSETS.length);
  if (skipped.length) console.log('skipped:', skipped.slice(0, 10));
})().catch((e) => { console.error(e); process.exit(1); });
