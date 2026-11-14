// screenshot the same views on the build 66 stage-1 site (A) and the working copy (B) and compare pixels
const { chromium } = require('playwright'); const fs = require('fs');
const A = 'http://localhost:8800/#', B = 'http://127.0.0.1:4190/#';
const views = JSON.parse(process.argv[2] || '[]');
(async () => {
  const b = await chromium.launch();
  for (const [name, route, w, action] of views) {
    const shots = [];
    for (const base of [A, B]) {
      const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 844 : 900 }, reducedMotion: 'reduce', isMobile: w < 500, hasTouch: w < 500 });
      await ctx.addInitScript(() => { try { sessionStorage.setItem('fr-welcome', '1'); sessionStorage.setItem('fr-intro22', '1'); localStorage.setItem('fr-lang', 'en'); sessionStorage.setItem('fr_review_seen', '1'); } catch (e) {} });
      await ctx.route('**/api/**', r => r.abort());
      const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 150)));
      await p.goto(base + route, { waitUntil: 'load' }); await p.waitForTimeout(2500);
      if (action === 'hover-services') { await p.hover('.nav__item:nth-child(3) .nav__link'); await p.waitForTimeout(800); }
      if (action === 'hover-about') { await p.hover('.nav__item:nth-child(2) .nav__link'); await p.waitForTimeout(2500); }
      if (action === 'burger') { await p.click('.burger'); await p.waitForTimeout(2500); }
      if (action === 'scroll') { await p.evaluate(() => scrollTo(0, 1200)); await p.waitForTimeout(900); }
      const f = `/tmp/claude-0/cmp-${name}-${base === A ? 'a' : 'b'}.png`;
      await p.screenshot({ path: f, clip: { x: 0, y: 0, width: w, height: w < 500 ? 844 : 640 } }); shots.push(f);
      if (errs.length) console.log(name, base === A ? 'A' : 'B', errs);
      await ctx.close();
    }
    const [x, y] = shots.map(f => fs.readFileSync(f));
    console.log(name, x.equals(y) ? 'IDENTICAL' : 'DIFFERENT', x.length, y.length);
  }
  await b.close();
})();
