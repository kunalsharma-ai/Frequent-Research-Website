// Build 82.8: data for the "Watch this page in one video" section at the bottom of every page (src/design82/Watch828.jsx).
//
// One small file per page, public/data/pv/<key>.json (key: "home" for /, else the path with "/" written as "--"):
//   { page, template, w }
//   template = the page's own video design, the same one the super admin's Page video component made
//              (backend/src/data/page-video-templates.json, made by backend/tools/make-page-video-templates.js)
//   w        = the design of the section around the player: backdrop, headline animation, font, action deck,
//              3D object and wording. No two pages get the same combination.
// The live site first asks the API (so the admin's changes and videos win); these files are the fallback and what
// the offline preview uses. Run again after the page list or the templates change:
//   node scripts/make-watch-data.cjs [../backend/src/data/page-video-templates.json] [public/data/pv]
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const src = path.resolve(process.argv[2] || path.join(root, '../backend/src/data/page-video-templates.json'));
const out = path.resolve(process.argv[3] || path.join(root, 'public/data/pv'));
const T = JSON.parse(fs.readFileSync(src, 'utf8')).templates;

// keep these counts in step with Watch828.jsx (SIZES)
const SIZES = { b: 12, h: 8, f: 5, d: 6, x: 8, c: 10 };
const key = (p) => (p === '/' ? 'home' : p.replace(/^\/+|\/+$/g, '').replace(/\//g, '--'));
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return h >>> 0; } // FNV-1a + mixer
const total = Object.values(SIZES).reduce((a, b) => a * b, 1);
function combo(n) { const o = {}; for (const [k, s] of Object.entries(SIZES)) { o[k] = n % s; n = Math.floor(n / s); } return o; }

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const used = new Set();
const pages = Object.keys(T).sort();
// each choice on its own shuffled order of the pages: every backdrop, headline, font… is used about equally, independently
const ranks = Object.fromEntries(Object.keys(SIZES).map((k) => [k, new Map([...pages].sort((a, b) => hash(a + '#' + k) - hash(b + '#' + k)).map((p, i) => [p, i]))]));
const start = (p) => { let n = 0, m = 1; for (const [k, s] of Object.entries(SIZES)) { n += (ranks[k].get(p) % s) * m; m *= s; } return n; };
// neighbours in the site (same section) should not even share the backdrop or the 3D object: walk the pages in order
// and step on until both differ from the previous page of the same section
const last = new Map();
let bytes = 0;
for (const p of pages) {
  const sec = p.split('/').slice(0, 3).join('/');
  const prev = last.get(sec);
  let n = start(p), guard = 0;
  for (;;) {
    const c = combo(n);
    const id = Object.values(c).join('.');
    if (!used.has(id) && (!prev || guard > total || (c.b !== prev.b && c.x !== prev.x && c.h !== prev.h))) { used.add(id); break; }
    n = (n + 7919) % total; guard++;
  }
  const w = combo(n);
  last.set(sec, w);
  const body = JSON.stringify({ page: p, template: T[p], w });
  bytes += body.length;
  fs.writeFileSync(path.join(out, key(p) + '.json'), body);
}
console.log('watch section data:', pages.length, 'pages,', used.size, 'unique section designs,', (bytes / 1024).toFixed(0) + ' KB in', path.relative(root, out));
