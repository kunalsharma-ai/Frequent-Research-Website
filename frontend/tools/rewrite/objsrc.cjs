// Find elements whose src/href/style became "[object Object]" (an object used where an image URL belongs).
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.addInitScript(() => {
    const d = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    Object.defineProperty(HTMLImageElement.prototype, 'src', { ...d, set(v) { if (typeof v === 'object' && v) console.log('OBJSRC', JSON.stringify(Object.keys(v)).slice(0, 200), new Error().stack.split('\n').slice(1, 6).join(' | ')); d.set.call(this, v); } });
  });
  p.on('console', (m) => { if (m.text().startsWith('OBJSRC')) console.log(m.text().slice(0, 900)); });
  await p.goto(process.argv[2] + '/#/', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  console.log(await p.evaluate(() => [...document.querySelectorAll('[src="[object Object]"], [href="[object Object]"]')].map((e) => e.outerHTML.slice(0, 300))));
  await b.close();
})();
