// Vite plugin for the Frequent Research site. The site itself is plain React source (src/main.jsx and the modules it
// imports); this plugin only adds what Vite cannot do on its own:
//   - turns "__IMG:dir/name__", "__QR:name__" and "__GBP_QR__" placeholders into Vite asset imports (hashed files,
//     small ones inlined), and fills the build-time data placeholders (__FRI_MANIFEST__, __HY_COUNTRIES__, __HY_GLOBE__)
//   - writes the language dictionaries to public/i18n/<code>.<hash>.json and their manifest
//   - builds the dark theme stylesheet (assets/dark.<hash>.css, only downloaded by visitors who choose dark)
//   - fills <!--fr:boot--> in index.html with the boot script
//   - writes .nginx/redirects.conf, 404.html and .gz/.br copies of the built text files
//   - QA builds only (FR_QA_HOOK=1): window.__frQA(expression) evaluates an expression with every top-level name of
//     the site in scope, so test scripts can call the site's own functions (for example to make every PDF)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
import { bootHtml } from './boot.js';

const require = createRequire(import.meta.url);
const { buildDarkCss } = require('./darkcss.cjs');
const hash = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 10);
const QA = !!process.env.FR_QA_HOOK;

export default function frSite() {
  let root, src, pub, cfg, isBuild, darkName = '', darkCss = '', man = {};
  const rd = (p) => fs.readFileSync(p, 'utf8');
  const isSrc = (id) => id.startsWith(src + path.sep) && /\.(jsx?|mjs)$/.test(id) && !id.includes('node_modules');

  // 58 language dictionaries: src/i18n/dict/<code>.json -> public/i18n/<code>.<hash>.json + manifest.json
  function i18n() {
    const dir = path.join(src, 'i18n/dict'), out = path.join(pub, 'i18n');
    const m = {}, keep = new Set(['manifest.json']);
    fs.mkdirSync(out, { recursive: true });
    if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir).filter((f) => /^[A-Za-z-]+\.json$/.test(f)).sort()) {
      const code = f.replace(/\.json$/, '');
      let d; try { d = JSON.parse(rd(path.join(dir, f))); } catch (e) { throw new Error('invalid JSON in src/i18n/dict/' + f + ': ' + e.message); }
      const clean = {};
      for (const [k, v] of Object.entries(d)) if (typeof v === 'string' && v.trim() && k.trim() && !k.startsWith('//')) clean[k.replace(/\s+/g, ' ').trim()] = v;
      const body = JSON.stringify(clean), h = hash(body), name = code + '.' + h + '.json';
      keep.add(name);
      const target = path.join(out, name);
      if (!fs.existsSync(target)) fs.writeFileSync(target, body);
      m[code] = { h, n: Object.keys(clean).length };
    }
    for (const f of fs.readdirSync(out)) if (!keep.has(f)) fs.rmSync(path.join(out, f));
    fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(m));
    return m;
  }

  // the stylesheets of the site, in the order src/main.jsx imports them
  function styles() {
    const main = rd(path.join(src, 'main.jsx'));
    // hand-made sheets that already handle both themes (veils, CMS switches, admin) stay out of the generated dark sheet
    return [...main.matchAll(/^import '(\.\/[^']+\.css)';$/gm)].map((x) => x[1]).filter((f) => !/\/(contrast67|cms|cards78|admin|pagevideo69|h79|ph79|s79|sc79|c80|k80|k80b|k80c|k80d|hx81|x82)\.css$/.test(f)).map((f) => path.join(src, f));
  }

  function dark() {
    const all = styles().map(rd).join('\n');
    const extra = path.join(src, 'styles/theme-dark.css');
    // url(...) values in the source stylesheets are relative to their own files; the dark sheet never needs them
    darkCss = buildDarkCss(all, { extra: fs.existsSync(extra) ? rd(extra) : '' }).replace(/[^;{}]*url\((?!["']?(?:\/|data:))[^)]*\)[^;{}]*;?/g, '');
    darkName = 'assets/dark.' + hash(darkCss) + '.css';
  }

  // build-time data for the hero globe: [[iso, name, region], …] and [[iso, lat, lon], …]
  function heroData() {
    const ix = JSON.parse(rd(path.join(pub, 'data/panel-books/index.json'))), seen = new Set(), countries = [];
    for (const k of ['b2c', 'b2b']) for (const c of ix[k] || []) if (!seen.has(c.iso)) { seen.add(c.iso); countries.push([c.iso, c.name, c.region]); }
    return { countries: JSON.stringify(countries), globe: rd(path.join(pub, 'data/country-points.json')).trim() };
  }

  return {
    name: 'fr-site',
    configResolved(c) { cfg = c; root = c.root; src = path.join(root, 'src'); pub = c.publicDir; isBuild = c.command === 'build'; },
    buildStart() {
      man = i18n();
      dark();
      for (const f of styles()) this.addWatchFile(f);
    },
    transform: {
      order: 'pre',
      handler(code, id) {
        if (!isSrc(id) || !/__(IMG:|QR:|GBP_QR__|FRI_MANIFEST__|HY_COUNTRIES__|HY_GLOBE__)/.test(code)) return null;
        const img = path.join(src, 'assets/images'), imports = [], ids = new Map();
        const asset = (file) => {
          if (!fs.existsSync(file)) throw new Error('image not found: ' + path.relative(root, file) + ' (in ' + path.relative(root, id) + ')');
          if (!ids.has(file)) { ids.set(file, '__fr_img' + ids.size); imports.push(`import ${ids.get(file)} from ${JSON.stringify(file)};`); }
          return ids.get(file);
        };
        const file = (k) => k === 'GBP_QR' ? path.join(img, 'google-business-profile-qr.webp') : k.startsWith('QR:') ? path.join(img, 'qr', k.slice(3) + '.png') : path.join(img, k.slice(4) + '.webp');
        // in a JSX attribute (src="__IMG:…__") the value becomes {name}; anywhere else the string becomes the name
        // (a JSX attribute is `name="…"` with no space before "="; `x = "__IMG:…__"` in plain code is a string)
        code = code.replace(/(\s[A-Za-z][\w:-]*)="__(IMG:[a-z0-9-]+\/[a-z0-9-]+|QR:[a-z0-9-]+|GBP_QR)__"/g, (_, a, k) => `${a}={${asset(file(k))}}`);
        code = code.replace(/"__(IMG:[a-z0-9-]+\/[a-z0-9-]+|QR:[a-z0-9-]+|GBP_QR)__"/g, (_, k) => asset(file(k)));
        if (/"__(IMG|QR):[a-z0-9/-]+__"/.test(code)) throw new Error('unreplaced image placeholder in ' + path.relative(root, id));
        if (code.includes('"__FRI_MANIFEST__"')) code = code.replace('"__FRI_MANIFEST__"', () => JSON.stringify(man));
        if (code.includes('"__HY_COUNTRIES__"') || code.includes('"__HY_GLOBE__"')) {
          const h = heroData();
          code = code.replace('"__HY_COUNTRIES__"', () => h.countries).replace('"__HY_GLOBE__"', () => h.globe);
        }
        return { code: imports.join('\n') + (imports.length ? '\n' : '') + code, map: null };
      },
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const darkHref = isBuild ? '/' + darkName : '/@fr/dark.css';
        return html.replace('<!--fr:boot-->', () => `<script>window.__FR_DARK=${JSON.stringify(darkHref)}</script>\n` + bootHtml(man));
      },
    },
    configureServer(server) {
      server.middlewares.use('/@fr/dark.css', (req, res) => { res.setHeader('Content-Type', 'text/css; charset=utf-8'); res.end(darkCss); });
    },
    generateBundle() {
      if (darkCss) this.emitFile({ type: 'asset', fileName: darkName, source: darkCss });
    },
    closeBundle(error) {
      if (!isBuild || error) return;
      const out = path.resolve(root, cfg.build.outDir);
      if (!fs.existsSync(path.join(out, 'index.html'))) return;
      // permanent redirects for removed pages, included by the frontend container's nginx
      const redirects = JSON.parse(rd(path.join(src, 'config/redirects.json')));
      fs.mkdirSync(path.join(out, '.nginx'), { recursive: true });
      fs.writeFileSync(path.join(out, '.nginx/redirects.conf'), redirects.map(([a, b]) => `location ~ ^${a}/?$ { return 301 ${b}; }`).join('\n') + '\n');
      // until scripts/prerender.cjs writes a real one, the app itself is the 404 page (it shows its own not-found view)
      if (!fs.existsSync(path.join(out, '404.html'))) fs.copyFileSync(path.join(out, 'index.html'), path.join(out, '404.html'));
      compressDir(out);
    },
  };
}

// cms loader (build 67): the site's code starts only after GET /api/v1/site answered (or 1.5 s passed), so the super
// admin's content (src/app/cms.jsx) is known while the data modules are defined. The bundle downloads meanwhile
// (modulepreload). The last answer is kept in localStorage "fr-cms" for when the API is slow or down.
const cmsLoader = (src) => `<link rel="modulepreload" crossorigin href="${src}">\n<script id="fr-cms">/* cms loader */(function(){var S=${JSON.stringify(src)};var LT=window.__FR_LITE;function go(){if(go.d)return;if(LT&&!go.u){go.w=1;return}go.d=1;var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src=S;document.head.appendChild(s)}var C=null;try{C=JSON.parse(localStorage.getItem("fr-cms")||"null")}catch(e){}window.__FR_CMS=C;if(LT){var E=["touchstart","pointerdown","keydown","wheel","mousemove"],U=function(e){if(go.u||(e&&e.type==="mousemove"&&!e.movementX&&!e.movementY))return;go.u=1;E.forEach(function(n){removeEventListener(n,U,true)});document.documentElement.classList.add("fr-ps-go");window.__FR_PRE&&window.__FR_PRE();if(go.w)go()};E.forEach(function(n){addEventListener(n,U,{capture:true,passive:true})});document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-fr-shell] [data-fr-q]");if(b){e.preventDefault();window.__FR_TAP=b.getAttribute("data-fr-q")}},true)}if(!/^https?:$/.test(location.protocol)||!window.fetch||location.pathname.indexOf("/admin")===0){go();return}var t=setTimeout(go,1500);fetch("/api/v1/site",{headers:{Accept:"application/json"}}).then(function(r){return r.ok?r.json():null}).then(function(j){if(j&&j.ok){window.__FR_CMS=j;try{localStorage.setItem("fr-cms",JSON.stringify(j))}catch(e){}}}).catch(function(){}).then(function(){clearTimeout(t);go()})})();</script>`;
export function frCmsLoader() {
  return {
    name: 'fr-cms-loader',
    transformIndexHtml: {
      order: 'post',
      handler: (html) =>
        html
          .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, (m, src) => cmsLoader(src))
          // build 74: the site's stylesheet no longer holds up the first paint (the start-up screen is styled inline);
          // it downloads at once and src/main.jsx turns it on just before the site appears (no unstyled flash)
          .replace(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/, (m, href) => `<link rel="preload" as="style" crossorigin href="${href}" id="fr-css"><noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`),
    },
  };
}

// QA builds only: a second plugin that runs after JSX is compiled and registers each module's top-level names
export function frQaHook() {
  let src;
  return {
    name: 'fr-qa-hook',
    configResolved(c) { src = path.join(c.root, 'src'); },
    transform(code, id) {
      if (!QA || !id.startsWith(src + path.sep) || !/\.(jsx?)$/.test(id)) return null;
      let ast; try { ast = this.parse(code); } catch { return null; }
      const names = [];
      for (const s of ast.body) {
        if (s.type === 'FunctionDeclaration' || s.type === 'ClassDeclaration') { if (s.id) names.push(s.id.name); }
        else if (s.type === 'VariableDeclaration') for (const d of s.declarations) if (d.id.type === 'Identifier') names.push(d.id.name);
      }
      const reg = !names.length ? '' : `\nif (typeof window !== "undefined") Object.defineProperties(window.__frQAM || (window.__frQAM = {}), {${names.map((n) => `${n}: { get: () => ${n}, configurable: true }`).join(', ')}});\n`;
      const boot = id.endsWith(path.join('src', 'main.jsx')) ? '\nwindow.__frQA = (s) => new Function("M", "with (M) { return (" + s + "); }")(window.__frQAM);\n' : '';
      if (!reg && !boot) return null;
      return { code: code + reg + boot, map: null };
    },
  };
}

// .gz and .br copies of text files, served by nginx (gzip_static) without compressing per request
export function compressDir(dir, re = /\.(js|css|json|html|svg|xml|txt)$/) {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  for (const f of walk(dir)) {
    if (!re.test(f)) continue;
    const b = fs.readFileSync(f);
    if (b.length < 1024) continue;
    fs.writeFileSync(f + '.gz', zlib.gzipSync(b, { level: 9 }));
    fs.writeFileSync(f + '.br', zlib.brotliCompressSync(b, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }));
  }
}
