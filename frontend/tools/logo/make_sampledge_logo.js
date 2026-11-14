// Build 65: exports the animated Sampledge logo (the site's FRK_SamLogo) as shareable files.
// Usage: node tools/logo/make_sampledge_logo.js <outDir>
// Writes: sampledge-logo-animated-{light,dark}.svg (self-contained, CSS-animated), sampledge-mark-animated.svg,
//         sampledge-logo-{on-dark,on-light}.{mp4,gif}, sampledge-logo-transparent.webm (alpha), sampledge-logo-{on-dark,on-light}.png
// Needs Playwright (Chromium; set CHROME_PATH to use a specific browser binary) and ffmpeg. Build tooling only; nothing here ships to the browser.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..', '..');
const out = path.resolve(process.argv[2] || 'dist/sampledge-logo');
fs.mkdirSync(out, { recursive: true });

// wordmark: the right part of the supplied logo artwork (same crop the site uses: width = height * 3.98)
async function wordPng(page, name) {
  const b64 = fs.readFileSync(path.join(root, 'src/assets/images/sampledge', name + '.webp')).toString('base64');
  return page.evaluate(async (src) => {
    const im = new Image();
    im.src = src;
    await im.decode();
    const h = im.naturalHeight, w = Math.round(h * 3.98), x = im.naturalWidth - w;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    c.getContext('2d').drawImage(im, x, 0, w, h, 0, 0, w, h);
    return { data: c.toDataURL('image/png'), w, h };
  }, 'data:image/webp;base64,' + b64);
}

const CSS = `
.tile{transform-origin:32px 32px;animation:t 6s ease-in-out infinite}
.core{transform-origin:29px 36px;animation:c 3.2s ease-in-out infinite}
.dot{transform-origin:29px 36px;animation:d 3.2s ease-in-out infinite}
.orbit{transform-origin:29px 36px;animation:o 7s cubic-bezier(.6,.05,.3,.95) infinite}
.orbit circle{animation:b 2.4s ease-in-out infinite}
.orbit circle:nth-child(2){animation-delay:.3s}.orbit circle:nth-child(3){animation-delay:.6s}
.sweep{animation:s 5s ease-in-out infinite}
@keyframes t{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(-4deg) scale(1.03)}}
@keyframes c{0%,100%{transform:scale(1)}50%{transform:scale(.92)}}
@keyframes d{0%,100%{transform:scale(1)}50%{transform:scale(1.35)}}
@keyframes o{0%{transform:rotate(0)}18%{transform:rotate(-22deg)}36%,100%{transform:rotate(0)}}
@keyframes b{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6px)}}
@keyframes s{0%,55%{transform:translateX(-200px)}85%,100%{transform:translateX(330px)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}`;

const MARK = `
<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0BC5FF"/><stop offset=".55" stop-color="#2F6BFF"/><stop offset="1" stop-color="#7B4DFF"/></linearGradient>
  <radialGradient id="sh" cx=".3" cy=".2" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>
<rect class="tile" x="2" y="2" width="60" height="60" rx="16" fill="url(#g)"/>
<rect x="2" y="2" width="60" height="60" rx="16" fill="url(#sh)"/>
<g class="core"><circle cx="29" cy="36" r="14" fill="none" stroke="#fff" stroke-width="6.5"/><circle class="dot" cx="29" cy="36" r="5.6" fill="#fff"/></g>
<g class="orbit"><circle cx="39.5" cy="17" r="4" fill="#fff"/><circle cx="47" cy="23.5" r="5.4" fill="#fff"/><circle cx="48.5" cy="33.5" r="3.4" fill="#fff"/></g>`;

// full lockup in a 64-unit-high box: mark 64 wide, gap 18, word 64*3.98 = 255 wide
function lockupSvg(word) {
  const W = 64 + 18 + 255;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-4 -4 ${W + 8} 72" width="${(W + 8) * 4}" height="${72 * 4}" role="img" aria-label="Sampledge">
<title>Sampledge</title>
<style>${CSS}</style>
${MARK}
<defs>
  <linearGradient id="sw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#96D7FF" stop-opacity="0"/><stop offset=".5" stop-color="#96D7FF" stop-opacity=".95"/><stop offset="1" stop-color="#96D7FF" stop-opacity="0"/></linearGradient>
  <mask id="wm" maskUnits="userSpaceOnUse" x="82" y="0" width="255" height="64" style="mask-type:alpha"><image href="${word.data}" x="82" y="0" width="255" height="64"/></mask>
</defs>
<image href="${word.data}" x="82" y="0" width="255" height="64"/>
<g mask="url(#wm)"><rect class="sweep" x="82" y="0" width="90" height="64" fill="url(#sw)"/></g>
</svg>`;
}
const markSvg = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 68 68" width="512" height="512" role="img" aria-label="Sampledge"><title>Sampledge</title><style>${CSS}</style>${MARK}</svg>`;

(async () => {
  const b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const page = await b.newPage();
  const light = await wordPng(page, 'logo-light'); // white word: for dark backgrounds
  const dark = await wordPng(page, 'logo-dark'); // navy word: for light backgrounds
  fs.writeFileSync(path.join(out, 'sampledge-logo-animated-light.svg'), lockupSvg(light));
  fs.writeFileSync(path.join(out, 'sampledge-logo-animated-dark.svg'), lockupSvg(dark));
  fs.writeFileSync(path.join(out, 'sampledge-mark-animated.svg'), markSvg());

  // frame capture: drive every CSS animation to a fixed time so the 35 s cycle (7 s orbit x 5 s sweep) loops cleanly;
  // 7 s keeps files small and still shows every motion (orbit, pulse, bob, sweep).
  const DUR = 7000, FPS = 25;
  const render = async (svgFile, bg, tag) => {
    const dir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'sam-'));
    const svg = fs.readFileSync(path.join(out, svgFile), 'utf8');
    await page.setViewportSize({ width: 1400, height: 320 });
    await page.setContent(`<html><body style="margin:0;background:${bg};display:grid;place-items:center;height:320px">${svg.replace(/width="\d+" height="\d+"/, 'width="1300" height="272"')}</body></html>`);
    await page.waitForTimeout(300);
    const n = Math.round((DUR / 1000) * FPS);
    for (let i = 0; i < n; i++) {
      await page.evaluate((t) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; }), (i * 1000) / FPS);
      await page.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.png`), omitBackground: bg === 'transparent' });
    }
    return dir;
  };
  const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args]);
  for (const [svg, bg, tag] of [['sampledge-logo-animated-light.svg', '#0B1437', 'on-dark'], ['sampledge-logo-animated-dark.svg', '#FFFFFF', 'on-light']]) {
    const dir = await render(svg, bg, tag);
    const inp = ['-framerate', String(FPS), '-i', path.join(dir, 'f%04d.png')];
    ff([...inp, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-movflags', '+faststart', path.join(out, `sampledge-logo-${tag}.mp4`)]);
    ff([...inp, '-vf', 'fps=20,scale=700:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=sierra2_4a', '-loop', '0', path.join(out, `sampledge-logo-${tag}.gif`)]);
    fs.copyFileSync(path.join(dir, 'f0000.png'), path.join(out, `sampledge-logo-${tag}.png`));
  }
  const tdir = await render('sampledge-logo-animated-light.svg', 'transparent', 'alpha');
  ff(['-framerate', String(FPS), '-i', path.join(tdir, 'f%04d.png'), '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '32', '-auto-alt-ref', '0', path.join(out, 'sampledge-logo-transparent.webm')]);
  await b.close();
  console.log('written to', out, fs.readdirSync(out).join(', '));
})();
