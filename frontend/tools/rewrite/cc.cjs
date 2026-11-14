// Opens the country-code picker of the first form that has one and reports whether its list is drawn on top of the
// page (in document.body) or inside the app root. Usage: node cc.cjs http://127.0.0.1:4198
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  for (const r of ['/contact-us', '/lets-talk', '/contact', '/careers', '/services/market-research', '/']) {
    await p.goto(process.argv[2] + '/#' + r, { waitUntil: 'load' });
    await p.waitForTimeout(2000);
    const h = await p.$$('[aria-haspopup="listbox"]');
    console.log(r, h.length);
    if (!h.length) continue;
    await h[0].scrollIntoViewIfNeeded();
    await h[0].click();
    await p.waitForTimeout(700);
    console.log(await p.evaluate(() => {
      const l = document.querySelector('[role="listbox"]');
      if (!l) return 'no listbox';
      return document.getElementById('root').contains(l) ? 'INSIDE #root' : 'on top (body)';
    }));
    break;
  }
  await b.close();
})();
