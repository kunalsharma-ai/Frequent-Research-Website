// Build 62 — dark theme stylesheet generator.
// The site has ~2 MB of hand-written CSS (base bundle + overlay) with thousands of literal light colours, so a dark theme
// cannot be done by switching a few variables. Instead, at build time every colour-bearing declaration is copied into
// a rule scoped to html[data-theme="dark"], with its colours re-mapped by role:
//   backgrounds  light surfaces (L ≥ 0.80) → deep navy surfaces of the same hue; accents and dark colours unchanged;
//                faint dark tints (alpha < 0.5) → faint light tints. Gradients are re-mapped only when every stop is
//                light, so gold buttons, brand bands and photos keep their colours.
//   text / icons dark colours (L < 0.55) → light colours of the same hue; light text unchanged. When the same rule
//                also sets an opaque accent background that is kept, its text colour is kept too (buttons, badges).
//   borders      light lines → dark lines; faint dark lines → faint light lines.
// Every colour declaration is copied (changed or not), so the cascade between rules is exactly the cascade of the light
// theme (each copy gets the same extra specificity). var(--x) is resolved only for variables defined once, on :root.
// Output is loaded only by visitors who choose the dark theme (see Theme.jsx, prerender.js).
'use strict';

/* ---------- colour helpers ---------- */
const NAMED = { white: [255, 255, 255, 1], black: [0, 0, 0, 1], silver: [192, 192, 192, 1], gray: [128, 128, 128, 1], grey: [128, 128, 128, 1], whitesmoke: [245, 245, 245, 1], ghostwhite: [248, 248, 255, 1], aliceblue: [240, 248, 255, 1], snow: [255, 250, 250, 1], ivory: [255, 255, 240, 1], navy: [0, 0, 128, 1] };
function parseColor(t) {
  t = t.trim().toLowerCase();
  if (NAMED[t]) return NAMED[t].slice();
  let m = /^#([0-9a-f]{3,8})$/.exec(t);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
  }
  m = /^(rgba?|hsla?)\(([^)]*)\)$/.exec(t);
  if (!m) return null;
  const parts = m[2].replace(/\s*\/\s*/, ',').split(/[\s,]+/).filter(Boolean);
  if (parts.length < 3 || parts.some((p) => /var\(|calc\(/.test(p))) return null;
  const num = (p, scale) => (p.endsWith('%') ? (parseFloat(p) / 100) * scale : parseFloat(p));
  let a = parts[3] !== undefined ? num(parts[3], 1) : 1;
  if (m[1].startsWith('rgb')) return [num(parts[0], 255), num(parts[1], 255), num(parts[2], 255), a];
  const h = parseFloat(parts[0]), s = parseFloat(parts[1]) / 100, l = parseFloat(parts[2]) / 100;
  const [r, g, b] = hsl2rgb(((h % 360) + 360) % 360 / 360, s, l);
  return [r, g, b, a];
}
function rgb2hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
}
function hsl2rgb(h, s, l) {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}
const hex2 = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
function fmt([r, g, b, a]) {
  if (a >= 0.999) return '#' + hex2(r) + hex2(g) + hex2(b);
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${+a.toFixed(3)})`;
}
const NEUTRAL_H = 230 / 360;
function mapBg(c) {
  const [r, g, b, a] = c;
  let [h, s, l] = rgb2hsl(r, g, b);
  if (a < 0.5) {
    if (l < 0.4) { const [h2, s2] = s < 0.08 ? [NEUTRAL_H, 0.5] : [h, Math.min(s, 0.7)]; return [...hsl2rgb(h2, s2, 0.82), Math.min(1, a * 1.25)]; }
    return c;
  }
  if (l < 0.8) return c;
  const neutral = s < 0.08;
  const nl = 0.085 + (1 - l) * 0.9;
  const ns = neutral ? 0.42 : Math.min(0.5, s * (1 - l) * 6 + 0.12); // pastels have little colour: keep the dark tint subtle
  return [...hsl2rgb(neutral ? NEUTRAL_H : h, ns, nl), a];
}
function mapFg(c) {
  const [r, g, b, a] = c;
  let [h, s, l] = rgb2hsl(r, g, b);
  if (l >= 0.55) return c;
  const neutral = s < 0.08;
  const nl = Math.min(0.94, 0.93 - l * 0.55);
  const ns = neutral ? 0.25 : Math.min(0.75, s * 0.85);
  return [...hsl2rgb(neutral ? NEUTRAL_H : h, ns, nl), a];
}
function mapBorder(c) {
  const [r, g, b, a] = c;
  let [h, s, l] = rgb2hsl(r, g, b);
  if (a < 0.5 && l < 0.4) return [...hsl2rgb(s < 0.08 ? NEUTRAL_H : h, 0.45, 0.8), Math.min(1, a * 1.4)];
  if (l < 0.8 || l > 0.985 || a < 0.9) return c; // white rings and translucent white lines sit on dark/photo areas
  return [...hsl2rgb(s < 0.08 ? NEUTRAL_H : h, s < 0.08 ? 0.35 : Math.min(0.5, s * 0.6), 0.2 + (1 - l) * 0.4), a];
}
const isLight = (c) => c && (c[3] < 0.3 || rgb2hsl(c[0], c[1], c[2])[2] >= 0.8); // faint tints go with either
const isOpaqueAccent = (c) => c && c[3] >= 0.6 && rgb2hsl(c[0], c[1], c[2])[2] < 0.8;

/* colour tokens inside a value (skipping url(...)) */
const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\([^()]*\)|\b(?:white|black|silver|gr[ae]y|whitesmoke|ghostwhite|aliceblue|snow|ivory|navy)\b/g;
function eachColor(v, fn) {
  let out = '', i = 0;
  const urls = [];
  v = v.replace(/url\((?:[^()"']|"[^"]*"|'[^']*')*\)/gi, (m) => { urls.push(m); return `\u0001${urls.length - 1}\u0001`; });
  out = v.replace(COLOR_RE, (m) => { const c = parseColor(m); return c ? fn(c, m) : m; });
  return out.replace(/\u0001(\d+)\u0001/g, (_, k) => urls[+k]);
}
function colorsIn(v) {
  const cs = [];
  eachColor(v, (c, m) => { cs.push(c); return m; });
  return cs;
}

/* ---------- CSS parsing ---------- */
function stripComments(css) { return css.replace(/\/\*[\s\S]*?\*\//g, ''); }
// returns [{type:'rule', sel, body} | {type:'at', name, prelude, children} | {type:'skip'}]
function parse(css) {
  let i = 0;
  const n = css.length;
  function block() {
    const items = [];
    while (i < n) {
      while (i < n && /\s|;/.test(css[i])) i++;
      if (i >= n) break;
      if (css[i] === '}') { i++; break; }
      let start = i;
      let depthP = 0, q = null;
      while (i < n) {
        const ch = css[i];
        if (q) { if (ch === '\\') { i += 2; continue; } if (ch === q) q = null; i++; continue; }
        if (ch === '"' || ch === "'") { q = ch; i++; continue; }
        if (ch === '(') depthP++;
        else if (ch === ')') depthP--;
        else if ((ch === '{' || ch === ';' || ch === '}') && depthP <= 0) break;
        i++;
      }
      const head = css.slice(start, i).trim();
      if (css[i] === ';') { i++; continue; } // @import / @charset / stray
      if (css[i] === '}') continue;
      i++; // '{'
      if (head.startsWith('@')) {
        const name = head.slice(1).split(/[\s(]/)[0].toLowerCase();
        if (['media', 'supports', 'layer', 'container', 'document', '-moz-document', 'scope'].includes(name)) {
          items.push({ type: 'at', name, prelude: head, children: block() });
        } else { skipBlock(); items.push({ type: 'skip' }); }
      } else {
        const bs = i;
        skipBlock();
        items.push({ type: 'rule', sel: head, body: css.slice(bs, i - 1) });
      }
    }
    return items;
  }
  function skipBlock() {
    let d = 1, q = null;
    while (i < n && d > 0) {
      const ch = css[i];
      if (q) { if (ch === '\\') { i += 2; continue; } if (ch === q) q = null; i++; continue; }
      if (ch === '"' || ch === "'") q = ch;
      else if (ch === '{') d++;
      else if (ch === '}') d--;
      i++;
    }
  }
  return block();
}
function decls(body) {
  const out = [];
  let i = 0, start = 0, depth = 0, q = null;
  for (; i <= body.length; i++) {
    const ch = body[i];
    if (q) { if (ch === '\\') { i++; continue; } if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; continue; }
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if ((ch === ';' || i === body.length) && depth <= 0) {
      const d = body.slice(start, i).trim();
      start = i + 1;
      const k = d.indexOf(':');
      if (k > 0) {
        let prop = d.slice(0, k).trim().toLowerCase(), val = d.slice(k + 1).trim(), imp = false;
        if (/!\s*important\s*$/i.test(val)) { imp = true; val = val.replace(/!\s*important\s*$/i, '').trim(); }
        out.push({ prop, val, imp });
      }
    }
  }
  return out;
}
function splitSel(sel) {
  const out = [];
  let d = 0, s = 0, q = null;
  for (let i = 0; i < sel.length; i++) {
    const ch = sel[i];
    if (q) { if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") q = ch;
    else if (ch === '(' || ch === '[') d++;
    else if (ch === ')' || ch === ']') d--;
    else if (ch === ',' && d === 0) { out.push(sel.slice(s, i).trim()); s = i + 1; }
  }
  out.push(sel.slice(s).trim());
  return out.filter(Boolean);
}
const D = 'html[data-theme="dark"]';
function scope(sel) {
  return splitSel(sel).map((s) => {
    // build 65: the redesigned pages and the build-65 kit carry their own light and dark tokens
    if (/\.(k5|ab5|oj5|cr5|gl5|dl5|in5|cx5|pr5|cq5|x5|af5|pc5|pc5x|pc5h|qp5|fx5|ab6|sq7|sv7|dl7|sx8|hz8|gv8|pc8|dl8|ab9|abx|pb10|frl|fx|blogo|vlogo|heartmark|frk-logo13|hd14|ab15|ab17|ab18|in6|cx6|rc19|ab19|dl19|sx19|ft19|hz19|hz20|vd21|cb22|sp22|frs-hbtn|gx25|ab21|frl-lock)(?![\w])|\.(k5|ab5|oj5|cr5|gl5|dl5|in5|cx5|pr5|cq5|x5|af5|pc5|pc5x|pc5h|qp5|fx5|ab6|sq7|sv7|dl7|sx8|hz8|gv8|pc8|dl8|ab9|abx|pb10|frl|fx|blogo|vlogo|heartmark|frk-logo13|hd14|ab15|cb22|sp22|gx25|frl-lock)-/.test(s)) return null;
    if (/^:root\b/.test(s)) return D + s.slice(5);
    if (/^html\b/.test(s)) return D + s.slice(4);
    if (s.includes('[data-theme')) return null; // already theme-specific
    // build 64: the A&F motion pages (.x4) and QR & Connect (.cq4/.cqf) ship hand-written dark tokens instead
    if (/\.(x4|cq4|cqf)(?![\w])|\.(x4|cq4|cqf)-/.test(s)) return null;
    return D + ' ' + s;
  }).filter(Boolean).join(',');
}

/* ---------- roles ---------- */
const ROLE = (p) => {
  if (p === 'background' || p === 'background-color' || p === 'background-image') return 'bg';
  if (p === 'color' || p === 'fill' || p === 'stroke' || p === '-webkit-text-fill-color' || p === 'caret-color' || p === 'text-decoration-color' || p === 'text-emphasis-color' || p === 'accent-color') return 'fg';
  if (/^border(-(top|right|bottom|left|block|inline)(-(start|end))?)?(-color)?$/.test(p) || p === 'outline' || p === 'outline-color' || p === 'column-rule' || p === 'column-rule-color') return 'bd';
  return null;
};

function build(css, opts = {}) {
  css = stripComments(css);
  const tree = parse(css);
  // custom properties: where they are defined, and in which roles (bg / fg / bd) they are used
  const defs = {}, uses = {};
  (function walk(items) {
    for (const it of items) {
      if (it.type === 'at') walk(it.children);
      else if (it.type === 'rule') for (const d of decls(it.body)) {
        if (d.prop.startsWith('--')) {
          const e = defs[d.prop] || (defs[d.prop] = { n: 0, root: null, vals: new Set() });
          e.n++; e.vals.add(d.val.trim().toLowerCase());
          if (/^:root$/.test(it.sel.trim())) e.root = d.val;
        } else {
          const role = ROLE(d.prop);
          for (const m of d.val.matchAll(/var\(\s*(--[\w-]+)/g)) (uses[m[1]] || (uses[m[1]] = new Set())).add(role || 'other');
        }
      }
    }
  })(tree);
  // a variable used in exactly one colour role is re-mapped where it is defined; a variable used in several roles is
  // substituted by its :root value at each use, so the use decides the role
  const varRole = {}, vars = {};
  for (const [k, e] of Object.entries(defs)) {
    const u = uses[k];
    if (!u) continue;
    const roles = [...u].filter((r) => r !== 'other');
    if (roles.length === 1 && !u.has('other')) varRole[k] = roles[0];
    else if (e.root && parseColor(e.root)) vars[k] = e.root;
    else if (e.vals.size === 1 && parseColor([...e.vals][0])) vars[k] = [...e.vals][0];
  }
  const resolve = (v) => v.replace(/var\(\s*(--[\w-]+)\s*(?:,[^()]*)?\)/g, (m, k) => vars[k] || m);

  let changed = 0, copied = 0;
  function rule(it) {
    const ds = decls(it.body);
    const col = [];
    let keepFg = false;
    let bgShort = false;
    const clipText = ds.some((d) => /^(-webkit-)?background-clip$/.test(d.prop) && /text/.test(d.val));
    for (const d of ds) {
      if (d.prop.startsWith('--')) {
        const r = varRole[d.prop];
        if (r && colorsIn(d.val).length && !/var\(/.test(d.val)) col.push({ d, role: r, v: d.val, isVar: true });
        continue;
      }
      if (/^(-webkit-)?background-(clip|size|position|repeat|origin|attachment)/.test(d.prop)) { col.push({ d, role: 'keep', v: d.val }); continue; }
      const role = ROLE(d.prop);
      if (!role) continue;
      const v = resolve(d.val);
      if (!/#|rgb|hsl|\b(white|black|silver|gr[ae]y|whitesmoke|ghostwhite|aliceblue|snow|ivory|navy)\b/i.test(v)) continue;
      if (/var\(/.test(v) && !colorsIn(v).length) continue;
      col.push({ d, role, v });
      if (d.prop === 'background') bgShort = true;
      if (role === 'bg') { const cs = colorsIn(v); if (cs.length === 1 && isOpaqueAccent(cs[0]) && !/gradient/.test(v)) keepFg = true; if (/gradient/.test(v) && cs.some(isOpaqueAccent)) keepFg = true; }
    }
    if (!col.some((c) => c.role !== 'keep')) return '';
    // longhands only matter when the shorthand is re-declared (it resets them, e.g. background-clip:text)
    if (!bgShort) for (let i = col.length - 1; i >= 0; i--) if (col[i].role === 'keep') col.splice(i, 1);
    const sel = scope(it.sel);
    if (!sel) return '';
    // components made to sit on dark sections (BEM "light" / "on-dark" modifiers) keep their colours
    const onDark = /(?:btn|button|logo|pill|chip|badge|tag|cta)[\w-]*(?:--|-)(?:light|white|on-dark|inverse)\b/.test(it.sel);
    const out = [];
    for (const { d, role, v } of col) {
      let nv = v;
      if (role === 'keep') { out.push(`${d.prop}:${v}${d.imp ? '!important' : ''}`); continue; }
      if (onDark) { copied++; out.push(`${d.prop}:${v}${d.imp ? '!important' : ''}`); continue; }
      if (role === 'bg') {
        const cs = colorsIn(v);
        const grad = /gradient\(/.test(v);
        if (clipText) nv = eachColor(v, (c) => fmt(mapFg(c))); // gradient text: the colours are text colours
        else if (!grad || cs.every(isLight)) nv = eachColor(v, (c) => fmt(mapBg(c)));
      } else if (role === 'fg') {
        if (!keepFg) nv = eachColor(v, (c) => fmt(mapFg(c)));
      } else nv = eachColor(v, (c) => fmt(mapBorder(c)));
      if (nv !== d.val) changed++;
      copied++;
      out.push(`${d.prop}:${nv}${d.imp ? '!important' : ''}`);
    }
    return `${sel}{${out.join(';')}}`;
  }
  function walk(items) {
    let s = '';
    for (const it of items) {
      if (it.type === 'rule') s += rule(it);
      else if (it.type === 'at') { const inner = walk(it.children); if (inner) s += `${it.prelude}{${inner}}`; }
    }
    return s;
  }
  const body = walk(tree);
  const head = `${D}{color-scheme:dark}${D},${D} body{background:#090D26;color:#DCE2F5}`;
  if (opts.stats) console.log(`dark css: ${copied} colour declarations copied, ${changed} re-mapped, ${Object.keys(varRole).length} variables re-mapped, ${Object.keys(vars).length} substituted`);
  return head + body + (opts.extra || '');
}
module.exports = { buildDarkCss: build, _t: { parseColor, mapBg, mapFg, mapBorder, fmt, scope } };
