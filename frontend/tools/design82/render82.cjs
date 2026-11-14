/* Build 82.3: renders the 3D stills (tools/design82/art82.js) to src/assets/images/d82/<kind>.webp.
   Needs the Vite dev server: npx vite --port 5182 & node tools/design82/render82.cjs [kind ...] */
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const out = path.join(__dirname, '../../src/assets/images/d82');
fs.mkdirSync(out, { recursive: true });
const KINDS = process.argv.slice(2).length ? process.argv.slice(2) : ['markets', 'services', 'projects', 'clients', 'client', 'vendor'];
(async () => {
  const b = await chromium.launch({ ...(fs.existsSync('/opt/pw-browsers/chromium') ? { executablePath: '/opt/pw-browsers/chromium' } : {}), args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  for (const k of KINDS) {
    const p = await b.newPage({ viewport: { width: 800, height: 800 }, deviceScaleFactor: 1 });
    p.on('pageerror', (e) => console.log('ERR', k, e.message));
    await p.goto(`http://localhost:${process.env.PORT || 5182}/tools/design82/render82.html?k=${k}`);
    await p.waitForFunction(() => window.__ready, null, { timeout: 90000 });
    await p.waitForTimeout(800);
    const png = path.join(out, k + '.png');
    await p.locator('canvas').screenshot({ path: png, omitBackground: true });
    execFileSync('python3', ['-c', `from PIL import Image\nim=Image.open(${JSON.stringify(png)}).convert('RGBA')\nbb=im.getbbox()\nim=im.crop(bb)\nim.thumbnail((560,560))\nim.save(${JSON.stringify(png.replace(/png$/, 'webp'))},'WEBP',quality=88,method=6)\nprint(${JSON.stringify(k)},im.size)`], { stdio: 'inherit' });
    fs.unlinkSync(png);
    await p.close();
  }
  await b.close();
})();
