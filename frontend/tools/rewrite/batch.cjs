// Compare A (4191 reference) and B (env B, default 4190) on many routes: visible text (main, footer, pop-ups; sorted lines),
// title, element count, script errors, and broken images / failed file requests (404s for files, not /api).
// Usage: node batch.cjs routes.txt [width] [concurrency] > out
const { chromium } = require('playwright'); const fs = require('fs');
const routes = fs.readFileSync(process.argv[2], 'utf8').split('\n').filter(Boolean);
const w = +(process.argv[3] || 1280), C = +(process.argv[4] || 4);
let B0 = null, launching = null;
async function browser() { // one shared browser, launched again if it crashes
  if (B0 && B0.isConnected()) return B0;
  if (!launching) launching = chromium.launch().then((x) => { B0 = x; launching = null; return x; });
  return launching;
}
async function grab(_b, base, route) {
  // watchdog: a page that hangs (browser stuck) counts as an error instead of stopping the sweep
  const h = {}; let tm;
  try { return await Promise.race([grab1(base, route, h), new Promise((_, no) => { tm = setTimeout(() => { if (h.ctx) h.ctx.close().catch(() => {}); no(new Error('timeout')); }, 120000); })]); } catch (e) { return { t: 'ERR ' + e.message, n: 0, errs: [] }; } finally { clearTimeout(tm); }
}
async function grab1(base, route, h = {}) {
  const ctx = h.ctx = await (await browser()).newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('fr-welcome', '1'); sessionStorage.setItem('fr-intro22', '1'); localStorage.setItem('fr-lang', 'en'); sessionStorage.setItem('fr_review_seen', '1'); } catch (e) {} });
  await ctx.addInitScript(() => { window.IntersectionObserver = class { constructor(cb) { this.cb = cb; } observe(el) { setTimeout(() => this.cb([{ isIntersecting: true, intersectionRatio: 1, target: el, boundingClientRect: el.getBoundingClientRect(), intersectionRect: el.getBoundingClientRect(), rootBounds: null, time: 0 }], this), 0); } unobserve() {} disconnect() {} takeRecords() { return []; } }; });
  await ctx.route('**/api/**', r => r.abort());
  const errs = []; const bad = new Set(); const p = await ctx.newPage(); p.on('pageerror', e => errs.push(String(e.message).slice(0, 120)));
  p.on('response', (x) => { if (x.status() >= 400 && !x.url().includes('/api/')) bad.add(new URL(x.url()).pathname.replace(/[-.][A-Za-z0-9_-]{8,10}(?=\.\w+$)/, '')); });
  try {
    await p.goto(base + route, { waitUntil: 'load', timeout: 30000 }); await p.waitForTimeout(1500);
    await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } });
    await p.waitForTimeout(800);
    const r = await p.evaluate(() => ({ t: [...((document.querySelector('#main')?.innerText || '') + '\n' + (document.querySelector('footer')?.innerText || '') + '\n' + [...document.body.children].filter((e) => e.id !== 'root' && e.tagName !== 'SCRIPT').map((e) => e.innerText).join('\n')).split('\n')].sort().join('\n'), /* sorted lines: pop-ups may sit in or outside the root */ n: document.querySelectorAll('body *:not(script)').length, title: document.title, img: [...document.images].filter((i) => i.complete && i.getAttribute('src') && !i.naturalWidth).length + [...document.querySelectorAll('*')].filter((e) => [...e.attributes].some((a) => a.value.includes('[object '))).length }));
    r.t = r.t.split('\n').map(x => /^\d{1,3}$/.test(x.trim()) ? '#' : /\b\d{1,2}[hms]\b/.test(x) ? x.replace(/\d+/g, '#') : x).sort().join('\n'); // live clocks and counters
    return { ...r, errs, bad: [...bad].sort().join(' ') };
  } catch (e) { return { t: 'ERR ' + e.message, n: 0, errs }; } finally { await ctx.close().catch(() => {}); }
}
(async () => {
  const b = null; let i = 0, bad = 0;
  async function worker() { while (i < routes.length) { const r = routes[i++];
    const BB = process.env.B || 'http://127.0.0.1:4190/#';
    let [A, B] = await Promise.all([grab(b, 'http://127.0.0.1:4191/#', r), grab(b, BB, r)]);
    const same = () => A.t === B.t && A.title === B.title && Math.abs(A.n - B.n) <= 2 && !B.errs.length && B.img <= A.img && B.bad === A.bad;
    if (!same()) { A = await grab(b, 'http://127.0.0.1:4191/#', r); B = await grab(b, BB, r); } // retry once, one at a time (load on a shared machine)
    const ok = same();
    if (!ok) { bad++; console.log('DIFF', r, 'text', A.t === B.t, 'title', A.title === B.title, 'nodes', A.n, B.n, 'errs', B.errs.join(';'), 'img', A.img, B.img, 'files', A.bad === B.bad ? 'same' : 'A[' + A.bad + '] B[' + B.bad + ']'); }
    if (process.env.PROG) fs.appendFileSync(process.env.PROG, r + '\n');
  } }
  await Promise.all(Array.from({ length: C }, worker));
  console.log('done', routes.length, 'diff', bad); if (B0) await B0.close();
})();
