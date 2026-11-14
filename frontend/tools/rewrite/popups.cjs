const { chromium } = require('playwright');
const B = process.argv[2];
(async () => {
  const b = await chromium.launch(); const out = [];
  const pg = async (url) => { const c = await b.newContext({ viewport: { width: 1280, height: 800 } }); const p = await c.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message)); await p.goto(B + url, { waitUntil: 'load' }); await p.waitForTimeout(2500); return [p, errs, c]; };
  const where = (p, sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? (e.parentElement === document.body ? 'on top (body)' : 'INSIDE ' + (e.parentElement.id || e.parentElement.className)) : 'not shown'; }, sel);
  let [p, errs, c] = await pg('/#/?intro=1'); out.push(['intro splash', await where(p, '.sp22'), errs.length]); await c.close();
  [p, errs, c] = await pg('/#/'); await p.click('.vd21-fab').catch(() => {}); await p.waitForTimeout(800); out.push(['video player', await where(p, '.vd21-ov'), errs.length]); await c.close();
  [p, errs, c] = await pg('/#/products/' + (process.argv[3] || 'zapx')); for (let i = 0; i < 12; i++) { await p.mouse.wheel(0, 500); await p.waitForTimeout(250); } await p.waitForTimeout(1200); out.push(['product nudge', await where(p, '.sx19'), errs.length]); await c.close();
  [p, errs, c] = await pg('/#/contact-us'); const btn = await p.$('[aria-haspopup="listbox"]'); if (btn) { await btn.click(); await p.waitForTimeout(600); }
  out.push(['country picker', await p.evaluate(() => { const l = document.querySelector('[role="listbox"]'); if (!l) return 'not shown'; let e = l; while (e.parentElement && e.parentElement !== document.body) e = e.parentElement; return e.parentElement === document.body && !document.getElementById('root').contains(l) ? 'on top (body)' : 'INSIDE #root'; }), errs.length]); await c.close();
  for (const r of out) console.log(r.join(' | ')); await b.close();
})();
