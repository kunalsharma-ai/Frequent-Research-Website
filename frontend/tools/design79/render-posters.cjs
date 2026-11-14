/* Build 79: still pictures of the 3D scenes (src/assets/images/d79/<kind>-<theme>.webp), used on phones, with reduced
   motion and before three.js has loaded. Needs the Vite dev server: npx vite --port 5179 & node tools/design79/render-posters.cjs */
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const out = path.join(__dirname, '../../src/assets/images/d79');
fs.mkdirSync(out, { recursive: true });
const KINDS = { globe: 6.5, mr: 4.2, dm: 3.3, it: 3.6, af: 6.2 };
(async () => {
  const b = await chromium.launch({ ...(fs.existsSync('/opt/pw-browsers/chromium') ? { executablePath: '/opt/pw-browsers/chromium' } : {}), args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  for (const [k, time] of Object.entries(KINDS)) for (const t of ['light', 'dark']) {
    const p = await b.newPage({ viewport: { width: 800, height: 700 }, deviceScaleFactor: 2 });
    p.on('pageerror', (e) => console.log('ERR', k, e.message));
    await p.goto(`http://localhost:${process.env.PORT || 5179}/tools/design79/render.html?k=${k}&t=${t}&still&time=${time}`);
    await p.waitForFunction(() => window.__ready, null, { timeout: 60000 });
    await p.waitForTimeout(1500);
    const png = path.join(out, `${k}-${t}.png`);
    await p.screenshot({ path: png, omitBackground: true });
    await p.close();
    execFileSync('python3', ['-c', `from PIL import Image; im=Image.open(${JSON.stringify(png)}); im.save(${JSON.stringify(png.replace(/\.png$/, '.webp'))}, 'WEBP', quality=80, method=6)`]);
    fs.rmSync(png);
    console.log(k, t);
  }
  await b.close();
})();
