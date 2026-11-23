// Build 82.9: put the Meta Pixel ID into the website (Kunal, 21 Nov 2026: "meta pixel add on each web page").
// The Pixel loader is in every page's <head> (index.html, <script id="fr-pixel">), right after the Google tag. With an
// empty ID it does nothing. This script writes the ID into index.html and into every page of a built website, so the
// ID can be set or changed without building again (remove the .gz/.br copies it touches; it does that for you).
// Usage: node scripts/set-pixel.cjs <PIXEL_ID> [dist ...]      (PIXEL_ID "" switches the Pixel off)
const fs = require('fs'), path = require('path');
const [, , id = '', ...dirs] = process.argv;
if (id && !/^[0-9]{8,20}$/.test(id)) { console.error('set-pixel: the Pixel ID is a number of 8 to 20 digits (Meta Events Manager → Data sources)'); process.exit(1); }
const RE = /(<script id="fr-pixel">\(function\(w,d\)\{var ID=")[0-9]*(")/;
let n = 0;
const fix = (f) => { const h = fs.readFileSync(f, 'utf8'); if (!RE.test(h)) return; const o = h.replace(RE, (m, a, b) => a + id + b); if (o !== h) { fs.writeFileSync(f, o); for (const x of ['.gz', '.br']) fs.rmSync(f + x, { force: true }); n++; } };
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) { if (e.name !== 'assets') walk(f); } else if (e.name.endsWith('.html')) fix(f); } };
fix(path.join(__dirname, '..', 'index.html'));
for (const d of dirs) walk(path.resolve(d));
console.log(`set-pixel: Pixel ${id ? 'ID ' + id : 'off'} in ${n} files` + (dirs.length ? ' (run node scripts/compress.cjs ' + dirs.join(' ') + ' afterwards)' : ''));
