// Chat assistant knowledge base (build 51).
// Reads the static per-page build (dist, written by scripts/prerender.cjs) and collects, for every page:
//   - each FAQ question + answer published in the page's FAQPage JSON-LD (the same text visitors read), and
//   - the page itself (title, description, H1, URL) so the assistant can point to a source page.
// Output: <out>/chat-kb.json, fetched by the chat the first time it opens (src/components/site/Chat.jsx).
// Usage: node scripts/build-chat-kb.cjs dist public/data dist/data
// Nothing is written by hand here: rerun after every content change (npm run release does it).
const fs = require('fs');
const path = require('path');
const [, , wwwDir = 'dist', ...outs] = process.argv;
const outDirs = outs.length ? outs : ['public/data'];
const ORIGIN = /^https?:\/\/[^/]+/;
const pages = [];
const faqs = [];
const seenQ = new Set();
const ent = (s) => String(s || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, ' ');
const txt = (s) => ent(String(s || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { if (f !== 'assets' && f !== 'data') walk(p); }
    else if (f === 'index.html') read(p);
  }
}
const kindOf = (u) => (u === '/' ? 'home' : /^\/services\/[^/]+\/[^/]+/.test(u) ? 'service' : /^\/services\/[^/]+$/.test(u) ? 'vertical' : /^\/blog\//.test(u) ? 'blog' : /^\/industries-case-studies\/[^/]+\/[^/]+/.test(u) ? 'case' : /^\/industries-case-studies\//.test(u) ? 'industry' : /^\/portals\//.test(u) ? 'portal' : /^\/products\//.test(u) ? 'product' : 'page');
const vertOf = (u) => { const m = /^\/services\/([a-z-]+)/.exec(u); return m ? m[1] : ''; };
function read(file) {
  const h = fs.readFileSync(file, 'utf8');
  const canon = (h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (!canon) return;
  const u = canon.replace(ORIGIN, '') || '/';
  const title = txt((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1]).replace(/\s*\|\s*Frequent Research.*$/i, '');
  const desc = txt((h.match(/<meta name="description" content="([^"]*)"/) || [])[1]);
  const h1 = txt((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]);
  const kind = kindOf(u);
  pages.push({ u, t: h1 || title, d: desc.slice(0, 220), k: kind });
  for (const m of h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let d; try { d = JSON.parse(m[1]); } catch (e) { continue; }
    const items = Array.isArray(d) ? d : d['@graph'] || [d];
    for (const it of items) {
      if (it['@type'] !== 'FAQPage') continue;
      for (const q of it.mainEntity || []) {
        const Q = txt(q.name), A = txt(q.acceptedAnswer && q.acceptedAnswer.text);
        if (!Q || !A) continue;
        const key = Q.toLowerCase() + '|' + u;
        if (seenQ.has(key)) continue;
        seenQ.add(key);
        faqs.push({ q: Q, a: A.slice(0, 1600), u, t: h1 || title, k: kind, v: vertOf(u) });
      }
    }
  }
}
if (!fs.existsSync(wwwDir)) { console.error('no static build at', wwwDir, '— run npm run prerender first'); process.exit(1); }
walk(wwwDir);
pages.sort((a, b) => a.u.localeCompare(b.u));
const kb = { v: 1, built: new Date().toISOString().slice(0, 10), faqs, pages };
const json = JSON.stringify(kb);
for (const o of outDirs) { fs.mkdirSync(o, { recursive: true }); fs.writeFileSync(path.join(o, 'chat-kb.json'), json); }
const by = {}; faqs.forEach((f) => (by[f.k] = (by[f.k] || 0) + 1));
console.log('chat-kb:', faqs.length, 'FAQs from', new Set(faqs.map((f) => f.u)).size, 'pages;', pages.length, 'pages indexed;', (json.length / 1024).toFixed(0) + 'KB', JSON.stringify(by));
