// Print the lines of visible text that differ between A (4191) and B (env B or 4190) for one route.
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const out = [];
for (const base of ['http://127.0.0.1:4191/#', process.env.B || 'http://127.0.0.1:4190/#']) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('fr-welcome', '1'); sessionStorage.setItem('fr-intro22', '1'); localStorage.setItem('fr-lang', 'en'); sessionStorage.setItem('fr_review_seen', '1'); } catch (e) {} });
  await ctx.addInitScript(() => { window.IntersectionObserver = class { constructor(cb) { this.cb = cb; } observe(el) { setTimeout(() => this.cb([{ isIntersecting: true, intersectionRatio: 1, target: el, boundingClientRect: el.getBoundingClientRect(), intersectionRect: el.getBoundingClientRect(), rootBounds: null, time: 0 }], this), 0); } unobserve() {} disconnect() {} takeRecords() { return []; } }; });
  await ctx.route('**/api/**', r => r.abort());
  const p = await ctx.newPage(); await p.goto(base + process.argv[2], { waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } });
  await p.waitForTimeout(800);
  out.push((await p.evaluate(() => document.querySelector('#main').innerText + '\n' + document.querySelector('footer').innerText)).split('\n'));
  await ctx.close(); }
const [A, B] = out; for (let i = 0; i < Math.max(A.length, B.length); i++) if (A[i] !== B[i]) { console.log("first order difference at line", i, JSON.stringify(A.slice(i, i + 4)), "vs", JSON.stringify(B.slice(i, i + 4))); break; }
const sa = new Set(A), sb = new Set(B);
console.log('only A:', A.filter(x => !sb.has(x)).slice(0, 15)); console.log('only B:', B.filter(x => !sa.has(x)).slice(0, 15)); await b.close(); })();
