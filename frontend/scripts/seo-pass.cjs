// Build 82.7: SEO pass over the finished website (Kunal, 14 Nov 2026: "fix all SEO parameters with A+ scoring" in the
// SEOptimer audit of www.frequentresearch.com). Changes only what search engines and audit tools read; what visitors
// see stays exactly the same (checked with screenshots of every first screen before / after).
//
// Usage: node scripts/seo-pass.cjs dist [--origin https://www.frequentresearch.com]
//        (part of `npm run prerender`, after phone-shell.cjs and before site-index.cjs / compress.cjs; safe to run twice)
//
// What it does on every page (index.html files and 404.html):
//  1. <head>: home title of 60 characters, descriptions of at most 160 characters, a share picture (og:image,
//     twitter large card, @frequentrfs), hreflang (en + x-default), Organization + WebSite structured data with
//     address, phone, logo and social profiles, and LocalBusiness (ProfessionalService) on the contact pages.
//     Search-engine robots (Googlebot, Bingbot …) get the full page straight away instead of the first-screen copy.
//  2. The first-screen copies (phone and desktop, scripts/phone-shell.cjs) move from the page markup into the small
//     script that already put them in place. The page source then has ONE <h1> (in the text copy for search engines)
//     and the drawn page has one <h1> too (in the copy). In the copies: inline style="" attributes become classes,
//     every picture gets an alt text and its width and height, the big logo pictures get smaller files of the size
//     they are shown at (at 3x), e-mail addresses are written as HTML character codes, and links keep their
//     ?type=… part in data-fr-href until the visitor first touches the page (then they are exactly as before).
//  3. The text copy of the page (<div class="prerender">, scripts/prerender.cjs) stays readable to search engines
//     and audit tools while the first-screen copy is shown (kept out of sight and out of screen readers with inert),
//     without the header and first screen it would repeat. Its footer gets the social profile links (Facebook, X,
//     Instagram, LinkedIn, YouTube, Pinterest), <b>/<i> become <strong>/<em>, the e-mail is no longer plain text.
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const { pathToFileURL } = require('url');

const dir = path.resolve(process.argv[2] || 'dist');
const oi = process.argv.indexOf('--origin');
const ORIGIN = (oi > 0 ? process.argv[oi + 1] : 'https://www.frequentresearch.com').replace(/\/$/, '');
const MARK = '<!--fr-seo-82.7-->';
const PUBLIC = path.join(__dirname, '..', 'public');

// ---------- facts used in the structured data (same as src/app/data/site.jsx CONTACT) ----------
const SOCIAL = [
  ['Facebook', 'https://www.facebook.com/FrequentResearchFieldwork'],
  ['X', 'https://x.com/frequentrfs'],
  ['Instagram', 'https://www.instagram.com/frequentresearchfield'],
  ['LinkedIn', 'https://www.linkedin.com/company/frequentresearch'],
  ['YouTube', 'https://www.youtube.com/@frequentresearch'],
  ['Pinterest', 'https://pin.it/1ApfR1BQk'],
];
const PHONE = '+91-81782-00573';
const ADDRESS = { '@type': 'PostalAddress', streetAddress: 'Mangolpur Kalan', addressLocality: 'New Delhi', addressRegion: 'Delhi', postalCode: '110085', addressCountry: 'IN' };
// build 83.3: the Google Business Profile (Kunal, 17 Nov 2026), so Google ties the profile to this website.
// The name is the profile's own; address and phone above are the site's contact details and must match the profile.
const GBP_NAME = 'Frequent Research Fieldwork Solutions Pvt. Ltd';
const GBP_URL = 'https://share.google/ppiacRxwOHLz5RZ8R';
const GBP_MAP = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(GBP_NAME + ', Mangolpur Kalan, New Delhi 110085');
const OG_IMAGE = ORIGIN + '/og/frequent-research-og.jpg';
const LOGO = ORIGIN + '/frequent-research-logo.png';
const ORG_ID = ORIGIN + '/#organization';
const ORG_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': ORG_ID, name: 'Frequent Research', legalName: 'Fieldwork Solutions Pvt. Ltd.',
      alternateName: [GBP_NAME, 'Frequent Research Fieldwork Solutions Private Limited'], url: ORIGIN + '/',
      logo: { '@type': 'ImageObject', url: LOGO, width: 600, height: 200 }, image: OG_IMAGE,
      slogan: 'Insights • Analytics • Growth. We serve the quality you expect.',
      description: 'Market research, digital marketing, IT & development and accounts & finance under one roof.',
      telephone: PHONE, address: ADDRESS,
      contactPoint: [{ '@type': 'ContactPoint', telephone: PHONE, contactType: 'customer service', areaServed: 'Worldwide', availableLanguage: ['English', 'Hindi'] }],
      sameAs: [...SOCIAL.map((s) => s[1]), GBP_URL],
    },
    { '@type': 'WebSite', '@id': ORIGIN + '/#website', url: ORIGIN + '/', name: 'Frequent Research', inLanguage: 'en', publisher: { '@id': ORG_ID } },
  ],
};
const LOCAL = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': ORIGIN + '/#localbusiness', name: GBP_NAME,
  alternateName: 'Frequent Research', legalName: 'Fieldwork Solutions Pvt. Ltd.',
  description: 'Market research, digital marketing, IT & development and accounts & finance company in New Delhi, India.',
  url: ORIGIN + '/', image: OG_IMAGE, logo: LOGO, telephone: PHONE, address: ADDRESS, areaServed: 'Worldwide',
  hasMap: GBP_MAP, parentOrganization: { '@id': ORG_ID }, sameAs: [GBP_URL, ...SOCIAL.map((s) => s[1])],
};
const LOCAL_PAGES = new Set(['/', '/about-us', '/lets-talk', '/connect', '/our-reach']);
// search-engine robots get the full page at once (the first-screen copy is for people; vite/boot.js has the same test)
const BOT_RE = 'bot|crawl|spider|slurp|inspectiontool|mediapartners|facebookexternalhit|embedly|bingpreview|duckassist';

// ---------- small helpers ----------
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === 'admin' ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const decode = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '\u00a0').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&amp;/g, '&');
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/g;
const entities = (s) => [...s].map((c) => '&#' + c.codePointAt(0) + ';').join('');
const jsStr = (s) => JSON.stringify(s).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const ldTag = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

// picture size from the file header (png, webp, jpeg, gif; svg with width/height); null when unknown
function imgSize(b) {
  try {
    if (b[0] === 0x89 && b.toString('ascii', 1, 4) === 'PNG') return [b.readUInt32BE(16), b.readUInt32BE(20)];
    if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const t = b.toString('ascii', 12, 16);
      if (t === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
      if (t === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
      if (t === 'VP8L') { const n = b.readUInt32LE(21); return [1 + (n & 0x3fff), 1 + ((n >> 14) & 0x3fff)]; }
    }
    if (b.toString('ascii', 0, 3) === 'GIF') return [b.readUInt16LE(6), b.readUInt16LE(8)];
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const m = b[i + 1], len = b.readUInt16BE(i + 2);
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
        i += 2 + len;
      }
    }
    const s = b.toString('utf8', 0, Math.min(b.length, 2000));
    if (/<svg/i.test(s)) {
      const w = /<svg[^>]*\swidth=["']([\d.]+)(px)?["']/i.exec(s), h = /<svg[^>]*\sheight=["']([\d.]+)(px)?["']/i.exec(s);
      if (w && h) return [Math.round(+w[1]), Math.round(+h[1])];
    }
  } catch (e) { /* unknown format */ }
  return null;
}
const sizeCache = new Map();
function sizeOf(src) {
  if (!src) return null;
  if (sizeCache.has(src)) return sizeCache.get(src);
  let r = null;
  const m = /^data:image\/[a-z+.-]+;base64,(.*)$/i.exec(src);
  const u = /^data:image\/svg\+xml(?:;charset=[^,;]+)?,(.*)$/i.exec(src);
  if (m) r = imgSize(Buffer.from(m[1], 'base64'));
  else if (u) { try { r = imgSize(Buffer.from(decodeURIComponent(u[1]))); } catch (e) { r = null; } }
  else if (src.startsWith('/')) { const f = path.join(dir, decodeURIComponent(src.split(/[?#]/)[0])); if (f.startsWith(dir) && fs.existsSync(f)) r = imgSize(fs.readFileSync(f)); }
  sizeCache.set(src, r);
  return r;
}

// ---------- a tiny HTML tag walker for the (browser-written, well-formed) first-screen markup ----------
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
// calls fn(tag) for every start tag; tag = { name, attrs: [[name, rawValue|null]], stack } and fn may change attrs
function mapTags(html, fn) {
  let out = '', i = 0;
  const stack = [];
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt < 0) { out += html.slice(i); break; }
    out += html.slice(i, lt);
    if (html.startsWith('<!--', lt)) { const e = html.indexOf('-->', lt + 4); const end = e < 0 ? html.length : e + 3; out += html.slice(lt, end); i = end; continue; }
    if (html[lt + 1] === '/') {
      const e = html.indexOf('>', lt); const name = html.slice(lt + 2, e).trim().toLowerCase();
      for (let k = stack.length - 1; k >= 0; k--) if (stack[k].name === name) { stack.length = k; break; }
      out += html.slice(lt, e + 1); i = e + 1; continue;
    }
    if (!/[A-Za-z]/.test(html[lt + 1] || '')) { out += '<'; i = lt + 1; continue; }
    // parse a start tag
    let j = lt + 1;
    while (j < html.length && /[^\s/>]/.test(html[j])) j++;
    const rawName = html.slice(lt + 1, j), name = rawName.toLowerCase();
    const attrs = [];
    let selfClose = false;
    for (;;) {
      while (/\s/.test(html[j])) j++;
      if (html[j] === '>') { j++; break; }
      if (html[j] === '/' && html[j + 1] === '>') { selfClose = true; j += 2; break; }
      if (j >= html.length) break;
      let k = j;
      while (k < html.length && /[^\s=/>]/.test(html[k])) k++;
      const an = html.slice(j, k);
      j = k;
      while (/\s/.test(html[j])) j++;
      if (html[j] === '=') {
        j++;
        while (/\s/.test(html[j])) j++;
        const q = html[j];
        if (q === '"' || q === "'") { const e = html.indexOf(q, j + 1); attrs.push([an, html.slice(j + 1, e)]); j = e + 1; }
        else { let e = j; while (e < html.length && /[^\s>]/.test(html[e])) e++; attrs.push([an, html.slice(j, e)]); j = e; }
      } else if (an) attrs.push([an, null]);
      else j++;
    }
    const tag = { name, attrs, stack };
    fn(tag);
    out += '<' + rawName + tag.attrs.map(([a, v]) => (v === null ? ' ' + a : ' ' + a + '="' + v + '"')).join('') + (selfClose ? '/>' : '>');
    i = j;
    // raw text elements: copy their content as it is
    if (name === 'style' || name === 'script' || name === 'textarea' || name === 'title') {
      const e = html.toLowerCase().indexOf('</' + name, i);
      const end = e < 0 ? html.length : e;
      out += html.slice(i, end); i = end;
    } else if (!VOID.has(name) && !selfClose) stack.push({ name, attrs: tag.attrs });
  }
  return out;
}
const getA = (t, n) => { const a = t.attrs.find((x) => x[0] === n); return a ? a[1] : undefined; };
const setA = (t, n, v) => { const a = t.attrs.find((x) => x[0] === n); if (a) a[1] = v; else t.attrs.push([n, v]); };
const delA = (t, n) => { t.attrs = t.attrs.filter((x) => x[0] !== n); };

// ---------- the first-screen copy: classes for inline styles, alt / width / height, smaller logos, links, e-mail ----------
function fixShell(html, key, shrink, altFromParts) {
  const styles = new Map();
  html = mapTags(html, (t) => {
    const st = getA(t, 'style');
    if (st !== undefined) {
      const css = decode(st || '').trim();
      delA(t, 'style');
      if (css) {
        if (!styles.has(css)) styles.set(css, 'fs' + key + styles.size.toString(36));
        const c = styles.get(css), cl = getA(t, 'class');
        setA(t, 'class', cl ? cl + ' ' + c : c);
      }
    }
    if (t.name === 'img') {
      const lazy = getA(t, 'data-fr-src') !== undefined;
      const src = decode(getA(t, lazy ? 'data-fr-src' : 'src') || '');
      const alt = getA(t, 'alt');
      // label around the picture: closest aria-label / title of its parents
      let near = '';
      for (let k = t.stack.length - 1; k >= 0 && !near; k--) { const p = t.stack[k].attrs.find((x) => x[0] === 'aria-label' || x[0] === 'title'); if (p && p[1]) near = decode(p[1]); }
      const text = !alt || !decode(alt).trim() ? altFromParts(src, near, decode(getA(t, 'class') || '')) : null;
      const sz = sizeOf(src);
      const small = shrink.get(src);
      const hasSet = getA(t, 'srcset') !== undefined || getA(t, 'data-fr-srcset') !== undefined;
      if (lazy && getA(t, 'data-fr-a') !== undefined) {
        // alt / width / height that the app added once the picture had loaded (src/app/altText.js): the copy shows the
        // picture only after the page has loaded, so they wait aside too (an alt text would be drawn in its place)
        const a0 = getA(t, 'alt');
        if (a0 && decode(a0).trim()) setA(t, 'data-fr-alt', a0);
        setA(t, 'alt', '');
        const w0 = getA(t, 'width'), h0 = getA(t, 'height');
        if (w0 !== undefined && h0 !== undefined) { setA(t, 'data-fr-w', w0); setA(t, 'data-fr-h', h0); delA(t, 'width'); delA(t, 'height'); }
      }
      if (lazy) {
        // the picture is put in place after the page has loaded (fr-sh script): it gets its alt, width and height then,
        // so nothing (no alt text, no empty box) is drawn before that
        if (text) setA(t, 'data-fr-alt', escAttr(text));
        if (sz && getA(t, 'width') === undefined && getA(t, 'height') === undefined) { setA(t, 'data-fr-w', String(sz[0])); setA(t, 'data-fr-h', String(sz[1])); }
        if (small && !hasSet) setA(t, 'data-fr-src', escAttr(small));
      } else {
        if (text) { setA(t, 'alt', escAttr(text)); if (alt !== undefined) setA(t, 'aria-hidden', 'true'); }
        if (sz && getA(t, 'width') === undefined && getA(t, 'height') === undefined) { setA(t, 'width', String(sz[0])); setA(t, 'height', String(sz[1])); }
        if (small && !hasSet) setA(t, 'src', escAttr(small));
      }
    }
    if (t.name === 'a') {
      const href = getA(t, 'href');
      if (href && /\?/.test(href) && !/^(mailto|tel):/i.test(href)) { setA(t, 'data-fr-href', href); setA(t, 'href', href.split('?')[0]); }
    }
  });
  // e-mail addresses as character codes (shown the same, not plain text in the page source)
  html = html.replace(EMAIL_RE, (m) => entities(m));
  // the inline styles, as classes; the #root#root#root part keeps them as strong as the style="" they replace
  const css = [...styles].map(([decl, c]) => `#root#root#root .${c}{${decl}}`).join('');
  return { html, css };
}

// ---------- 1. pictures of the first-screen copy shown much smaller than their file: smaller copies ----------
async function makeShrinkMap(files) {
  // pictures in the copy of (almost) every page: the header logo, the chat button … the same size on every page
  const count = new Map();
  for (const f of files) {
    const h = fs.readFileSync(f, 'utf8');
    const s = h.indexOf('<!--fr-shell-->', h.indexOf('<div id="root"'));
    if (s < 0 || h.includes(MARK)) continue;
    const e = h.indexOf('<!--/fr-shell-->', s);
    const seen = new Set([...h.slice(s, e).matchAll(/<img\b[^>]*?\s(?:src|data-fr-src)="(\/assets\/[^"]+\.(?:webp|png|jpe?g))"/g)].map((m) => m[1]));
    for (const u of seen) count.set(u, (count.get(u) || 0) + 1);
  }
  const pages = files.length;
  const common = [...count].filter(([, n]) => n >= pages * 0.9).map(([u]) => u);
  if (!common.length) return new Map();
  let chromium;
  try { ({ chromium } = require('playwright')); } catch (e) { console.warn('seo-pass: playwright not found, logo pictures keep their size'); return new Map(); }
  const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
  const server = http.createServer((q, r) => {
    let u = decodeURIComponent(q.url.split('?')[0]);
    if (u.startsWith('/api/')) { r.writeHead(404); return r.end(); }
    let f = path.join(dir, u);
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!f.startsWith(dir) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(r);
  });
  await new Promise((ok) => server.listen(0, ok));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}), args: ['--disable-dev-shm-usage', '--no-sandbox'] });
  // largest width each picture is drawn at, on a few pages, phone to wide desktop
  const shown = new Map();
  const routes = ['/', '/about-us', '/services', '/lets-talk', '/blog'].filter((r) => fs.existsSync(path.join(dir, r, 'index.html')));
  for (const vp of [{ width: 412, height: 860, isMobile: true }, { width: 1366, height: 900 }, { width: 1920, height: 1080 }, { width: 2560, height: 1440 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.isMobile });
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    for (const r of routes) {
      const p = await ctx.newPage();
      try {
        await p.goto(base + r, { waitUntil: 'load', timeout: 60000 });
        await p.waitForTimeout(800);
        const list = await p.evaluate(() => [...document.images].map((i) => [i.getAttribute('src') || i.getAttribute('data-fr-src'), i.getBoundingClientRect().width, i.getBoundingClientRect().height, i.naturalWidth, i.naturalHeight]));
        for (const [u, w, h, nw, nh] of list) {
          if (!u) continue;
          const k = u.replace(/^https?:\/\/[^/]+/, '');
          // drawn width, or the width that follows from the drawn height
          const need = Math.max(w, nh ? (h * nw) / nh : 0);
          shown.set(k, Math.max(shown.get(k) || 0, need));
        }
      } catch (e) { console.warn('seo-pass: could not measure ' + r + ': ' + e.message.split('\n')[0]); }
      await p.close();
    }
    await ctx.close();
  }
  const map = new Map();
  const page = await browser.newPage();
  await page.goto(base + '/favicon.png');
  for (const u of common) {
    const sz = sizeOf(u), w = shown.get(u);
    if (!sz || !w) continue;
    const target = Math.ceil(w * 3);
    const file = path.join(dir, u);
    if (sz[0] < target * 1.3 || fs.statSync(file).size < 12000) continue;
    const th = Math.round((sz[1] * target) / sz[0]);
    const data = await page.evaluate(async ([url, tw, th2]) => {
      const im = new Image(); im.src = url; await im.decode();
      const c = document.createElement('canvas'); c.width = tw; c.height = th2;
      const g = c.getContext('2d'); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(im, 0, 0, tw, th2);
      return c.toDataURL('image/webp', 0.92);
    }, [u, target, th]);
    const out = u.replace(/\.(webp|png|jpe?g)$/, '.w' + target + '.webp');
    const buf = Buffer.from(data.split(',')[1], 'base64');
    if (buf.length >= fs.statSync(file).size * 0.85) continue;
    fs.writeFileSync(path.join(dir, out), buf);
    map.set(u, out);
    console.log(`seo-pass: ${u} (${sz[0]}x${sz[1]}, ${Math.round(fs.statSync(file).size / 1024)} KB, shown at most ${Math.round(w)} px wide) -> ${out} (${Math.round(buf.length / 1024)} KB)`);
  }
  await browser.close();
  server.close();
  return map;
}

// ---------- 2. one page ----------
function route(file) {
  const rel = path.relative(dir, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return null;
  return '/' + rel.replace(/\/index\.html$/, '');
}

function fixHead(h, r, seo) {
  const head = h.slice(0, h.indexOf('</head>'));
  let nh = head;
  // title (home) and description
  if (r === '/') nh = nh.replace(/<title>[^<]*<\/title>/, () => `<title>${escAttr(seo.HOME_TITLE)}</title>`);
  // build 83.3: every other title at most 60 characters (same rule as the app, seoText.js fitTitle)
  else nh = nh.replace(/<title>([^<]*)<\/title>/, (m, v) => `<title>${escAttr(seo.fitTitle(decode(v)))}</title>`);
  const fitAll = (name, attr) => {
    nh = nh.replace(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`), (m, v) => {
      const d = (name === 'description' && r && seo.DESC_BY_PATH[r]) || seo.fitDesc(decode(v));
      return `<meta ${attr}="${name}" content="${escAttr(d)}"`;
    });
  };
  fitAll('description', 'name'); fitAll('og:description', 'property'); fitAll('twitter:description', 'name');
  // share picture
  if (!/<meta property="og:image"/.test(nh)) {
    nh = nh.replace(/(<meta property="og:url"[^>]*>)/, (m) => `${m}\n<meta property="og:image" content="${OG_IMAGE}" />\n<meta property="og:image:secure_url" content="${OG_IMAGE}" />\n<meta property="og:image:type" content="image/jpeg" />\n<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />\n<meta property="og:image:alt" content="Frequent Research: market research, digital marketing, IT &amp; development, accounts &amp; finance" />\n<meta property="og:locale" content="en_IN" />`);
  }
  nh = nh.replace('<meta name="twitter:card" content="summary" />', '<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:site" content="@frequentrfs" />');
  if (!/<meta name="twitter:image"/.test(nh)) nh = nh.replace(/(<meta name="twitter:description"[^>]*>)/, (m) => `${m}\n<meta name="twitter:image" content="${OG_IMAGE}" />\n<meta name="twitter:image:alt" content="Frequent Research logo" />`);
  // hreflang: the site is in English at one address per page (the language button translates in the page)
  if (!/hreflang=/.test(nh)) nh = nh.replace(/(<link rel="canonical" href="([^"]*)" \/>)/, (m, tag, href) => `${tag}\n<link rel="alternate" hreflang="en" href="${href}" />\n<link rel="alternate" hreflang="x-default" href="${href}" />`);
  // structured data: the short Organization becomes Organization + WebSite with contact details and profiles
  nh = nh.replace(/<script type="application\/ld\+json">\s*(\{"@context":"https:\/\/schema\.org","@type":"Organization"[^<]*?\})\s*<\/script>/, () => ldTag(ORG_GRAPH));
  if (!/"@id":"[^"]*#organization"/.test(nh) && r !== null) nh = nh.replace('</head>', '') + '\n' + ldTag(ORG_GRAPH);
  if (r && LOCAL_PAGES.has(r) && !/ProfessionalService/.test(nh)) nh += '\n' + ldTag(LOCAL);
  // robots get the full page; the text copy stays readable while the first-screen copy is shown
  nh = nh.replace("&&!/[?&](fr-nolite|lang=|intro=1)/.test(location.search);", () => `&&!/[?&](fr-nolite|lang=|intro=1)/.test(location.search)&&!/${BOT_RE}/i.test(navigator.userAgent);`);
  if (!nh.includes('id="fr-seo-css"')) nh = nh.replace(/(<style id="fr-boot-css">[\s\S]*?<\/style>)/, (m) => m + '\n<style id="fr-seo-css">html.fr-ps #root>.prerender{display:block!important;visibility:visible!important;animation:none!important;position:absolute!important;top:0!important;left:0!important;width:1px!important;height:1px!important;margin:-1px!important;padding:0!important;border:0!important;overflow:hidden!important;clip-path:inset(50%)!important;white-space:nowrap!important}</style>');
  return nh + h.slice(head.length);
}

// the script that puts the right first-screen copy in place (replaces the one from phone-shell.cjs)
function shellScript(S) {
  return `<script id="fr-sh">(function(){if(!window.__FR_LITE)return;var S=${'{' + Object.entries(S).map(([k, v]) => k + ':' + jsStr(v)).join(',') + '}'};` +
    'var d=document,r=d.getElementById("root"),dk=d.documentElement.getAttribute("data-theme")==="dark",ph=matchMedia("(max-width: 767px)").matches,' +
    'css=function(id,t){if(!t)return;var s=d.createElement("style");s.id=id;s.textContent=t;d.head.appendChild(s)},' +
    'frag=function(h){var t=d.createElement("template");t.innerHTML=h;return t.content};' +
    'if(ph)r.insertBefore(frag(S.p),r.firstChild);else{css("fr-lite-css-d",S.dc);r.insertBefore(frag(S.d),r.firstChild)}' +
    'if(dk)css(ph?"fr-lite-css-pk":"fr-lite-css-dk",ph?S.pk:S.dk);css("fr-lite-css-s",ph?S.ps:S.ds);' +
    // the text copy for search engines: without what the first-screen copy already shows, out of focus and screen readers
    // (it comes after this script in the page, so this waits until the page has been read)
    'var tc=function(){var pr=r.querySelector(".prerender"),h1=pr&&pr.querySelector("h1");if(!pr)return;pr.inert=true;if(r.querySelector("[data-fr-shell] h1")){var hd=pr.querySelector("header");if(hd)hd.remove();if(h1){var b=h1;while(b.parentNode&&b.parentNode!==pr&&b.parentNode.tagName!=="MAIN")b=b.parentNode;b.remove()}}};if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",tc);else tc();' +
    // links get their ?type=… part back as soon as the visitor touches the page
    'var lk=function(){d.querySelectorAll("[data-fr-href]").forEach(function(a){a.setAttribute("href",a.getAttribute("data-fr-href"));a.removeAttribute("data-fr-href")})};["pointerdown","touchstart","keydown","focusin"].forEach(function(n){addEventListener(n,lk,{capture:true,passive:true})});' +
    'var im=function(){d.querySelectorAll("[data-fr-src]").forEach(function(i){if(i.hasAttribute("data-fr-srcset"))i.srcset=i.getAttribute("data-fr-srcset");var a=i.getAttribute("data-fr-alt"),w=i.getAttribute("data-fr-w");i.addEventListener("load",function(){if(a){i.alt=a;i.setAttribute("aria-hidden","true")}if(w){i.setAttribute("width",w);i.setAttribute("height",i.getAttribute("data-fr-h"))}},{once:true});i.src=i.getAttribute("data-fr-src")})};' +
    'var go=function(){requestAnimationFrame(function(){setTimeout(im,0)})};if(d.readyState==="complete")go();else addEventListener("load",go)})()</script>';
}

function fixBody(h, shrink, altFromParts) {
  const rs = h.indexOf('<div id="root"');
  const a = h.indexOf('<!--fr-shell-->', rs);
  const tD = h.indexOf('<template id="fr-sh-d">', a);
  if (a > 0 && tD > 0) {
    const inner = (id) => { const s = h.indexOf(`<template id="${id}">`, a); const e = h.indexOf('</template>', s); return s < 0 ? '' : h.slice(s + `<template id="${id}">`.length, e); };
    const styleOf = (t) => { const m = /^<style[^>]*>([\s\S]*?)<\/style>/.exec(t); return m ? m[1].replace(/<\\\/(style|template)/gi, '</$1') : ''; };
    const D = inner('fr-sh-d');
    const dc = styleOf(D), dShell = D.replace(/^<style[^>]*>[\s\S]*?<\/style>/, '');
    const pk = styleOf(inner('fr-sh-pk')), dk = styleOf(inner('fr-sh-dk'));
    const P = h.slice(a + '<!--fr-shell-->'.length, tD);
    const end = h.indexOf('<!--/fr-shell-->', tD);
    const p = fixShell(P, 'p', shrink, altFromParts), d = fixShell(dShell, 'd', shrink, altFromParts);
    h = h.slice(0, a) + '<!--fr-shell-->' + shellScript({ p: p.html, d: d.html, dc, pk, dk, ps: p.css, ds: d.css }) + h.slice(end);
    // the phone copy's logo was found early by the browser while it was in the page: keep it that way
    const first = /<img\b[^>]*\ssrc="(\/assets\/[^"]+)"/.exec(p.html);
    if (first) h = h.replace('</head>', () => `<link rel="preload" as="image" href="${first[1]}" media="(max-width: 767px)">\n</head>`);
  }
  // the text copy for search engines
  const ps = h.indexOf('<div class="prerender">');
  if (ps > 0) {
    const pe = h.lastIndexOf('</div>', h.indexOf('</body>'));
    let pr = h.slice(ps, pe);
    if (!/facebook\.com\//.test(pr)) {
      const list = '<ul>' + SOCIAL.map(([n, u]) => `<li><a href="${u}">Frequent Research on ${n}</a></li>`).join('') + '</ul>';
      if (pr.includes('<h3>Follow us</h3>')) pr = pr.replace('<h3>Follow us</h3>', () => '<h3>Follow us</h3>' + list);
      else pr = pr.replace(/<\/footer>/, () => '<h3>Follow us</h3>' + list + '</footer>');
    }
    // WhatsApp link without its ready-made message (a readable address for search engines; people use the real page)
    pr = pr.replace(/href="(https:\/\/wa\.me\/[0-9]+)\?[^"]*"/g, 'href="$1"');
    pr = pr.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>').replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>');
    pr = pr.replace(/<a href="mailto:([^"]+)">\s*([^<]*)<\/a>/g, (m, addr, text) => `<a href="${entities('mailto:' + decode(addr))}">${/@/.test(text) ? 'Email us' : text}</a>`);
    pr = pr.replace(EMAIL_RE, (m) => entities(m));
    h = h.slice(0, ps) + pr + h.slice(pe);
  }
  return h;
}

module.exports = { mapTags, getA, setA, sizeOf, decode };
if (require.main === module) (async () => {
  if (!fs.existsSync(path.join(dir, 'index.html'))) { console.error('seo-pass: no website in ' + dir); process.exit(1); }
  const seo = await import(pathToFileURL(path.join(__dirname, '..', 'src', 'app', 'seoText.js')).href);
  const { altFromParts } = await import(pathToFileURL(path.join(__dirname, '..', 'src', 'app', 'altText.js')).href);
  // share picture, logo for structured data, favicon.ico (vite copies public/ into dist; an older dist gets them here)
  for (const f of ['og/frequent-research-og.jpg', 'frequent-research-logo.png', 'favicon.ico']) {
    const to = path.join(dir, f);
    if (!fs.existsSync(to) && fs.existsSync(path.join(PUBLIC, f))) { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(path.join(PUBLIC, f), to); }
  }
  const files = walk(dir).filter((f) => /(^|[\\/])index\.html$/.test(f) || path.relative(dir, f) === '404.html');
  const shrink = await makeShrinkMap(files);
  let n = 0, skipped = 0;
  for (const f of files) {
    let h = fs.readFileSync(f, 'utf8');
    if (h.includes(MARK)) { skipped++; continue; }
    const r = route(f);
    h = fixHead(h, r, seo);
    h = fixBody(h, shrink, altFromParts);
    h = h.replace('</head>', MARK + '\n</head>');
    fs.writeFileSync(f, h);
    for (const x of ['.gz', '.br']) fs.rmSync(f + x, { force: true });
    if (++n % 100 === 0) console.log('seo-pass: ' + n + ' pages');
  }
  console.log(`seo-pass: ${n} pages done` + (skipped ? `, ${skipped} already done` : '') + `, ${shrink.size} smaller logo pictures`);
})().catch((e) => { console.error(e); process.exit(1); });
