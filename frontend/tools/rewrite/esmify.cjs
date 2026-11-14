// Stage 4: turn the shared-scope sources (core/core.js + every file in src/overlay.manifest.js) into normal ES modules.
//  - core/core.js is split: its helpers become src/app/runtime.js, its start-up code becomes src/main.jsx
//  - every file gets `import { … } from './x.jsx'` for the top-level names it uses from other files,
//    package imports for React, ReactDOM, React Router and jsPDF, and `export { … }` for its names other files use
//  - src/main.jsx imports every stylesheet and every module in the old manifest order (so modules that only register
//    something still run), then starts React
//  - checks the ES-module evaluation order: a file that reads another file's value while starting must come after it
// Usage: node esmify.cjs [--dry]
const fs = require('fs'), path = require('path');
const { parse } = require('@babel/parser'); const traverse = require('@babel/traverse').default;
const prettier = require('prettier');
const F = '/home/claude/work/fr66/frontend', S = F + '/src';
const dry = process.argv.includes('--dry');
const PKG = {
  ee: ["* as ee", 'react'], React: ['React', 'react'], l: ['* as l', 'react/jsx-runtime'],
  createRoot: ['{ createRoot }', 'react-dom/client'], ci: ['* as ci', 'react-dom'], dt: ['{ jsPDF as dt }', 'jspdf'],
};
for (const n of ['useLocation', 'useParams', 'Navigate', 'Route', 'Routes', 'HashRouter', 'Link', 'NavLink', 'useSearchParams']) PKG[n] = [`{ ${n} }`, 'react-router-dom'];
// is this reference evaluated while the module starts? Callbacks passed to calls at start-up (arr.map(x => …), IIFEs)
// also run then; other functions run later.
const atStart = (q) => {
  let f = q.getFunctionParent();
  while (f) {
    if (f.isFunctionDeclaration() || f.isClassMethod() || f.isObjectMethod()) return false;
    const par = f.parentPath;
    if (!(par.isCallExpression() || par.isNewExpression())) return false;
    f = par.getFunctionParent();
  }
  return true;
};
const P = (src, jsx = true) => parse(src, { sourceType: 'module', plugins: jsx ? ['jsx'] : [] });

(async () => {
  const m = await import(S + '/overlay.manifest.js?' + Date.now());
  // ---- 1. split the core
  const core = fs.readFileSync(F + '/core/core.js', 'utf8'); const cb = P(core, false).program.body;
  const runtime = [], start = [];
  for (const s of cb) {
    if (s.type === 'ImportDeclaration') continue;
    const txt = core.slice(s.start, s.end);
    if (/createRoot\(|^const SiteRouter/.test(txt)) start.push(txt); else runtime.push(txt);
  }
  const files = {}; // rel (to src) -> source text
  files['app/runtime.js'] = '// Helpers the compiled core used: object property helpers and Vite\'s preload helper for lazy chunks (st).\n' + runtime.join('\n') + '\n';
  const order = ['app/runtime.js', ...m.EARLY_MODULES, ...m.MODULES];
  for (const f of order) if (!files[f]) files[f] = fs.readFileSync(S + '/' + f, 'utf8');

  // ---- 2. names
  const decl = {}, info = {};
  for (const f of order) {
    const ast = P(files[f], !f.endsWith('runtime.js')); const own = []; const free = new Map(); let hasJsx = false;
    traverse(ast, {
      Program(p) { for (const [n, b] of Object.entries(p.scope.bindings)) if (b.kind !== 'module') own.push(n); },
      JSXElement() { hasJsx = true; }, JSXFragment() { hasJsx = true; },
      Identifier(q) {
        if (!q.isReferencedIdentifier()) return; const n = q.node.name; if (q.scope.getBinding(n)) return;
        const g = free.get(n) || { ev: false }; if (atStart(q)) g.ev = true; free.set(n, g);
      },
      JSXIdentifier(q) {
        const n = q.node.name;
        const ok = q.parentPath.isJSXOpeningElement() || q.parentPath.isJSXClosingElement() || (q.parentPath.isJSXMemberExpression() && q.parentPath.node.object === q.node);
        if (!ok || !/^[A-Z_$]/.test(n) && !q.parentPath.isJSXMemberExpression()) return; if (q.scope.getBinding(n)) return;
        const g = free.get(n) || { ev: false }; if (atStart(q)) g.ev = true; free.set(n, g);
      },
    });
    for (const n of own) { if (decl[n]) throw new Error(`${n} declared in ${decl[n]} and ${f}`); decl[n] = f; }
    info[f] = { own, free, hasJsx };
  }
  // ---- 3. imports and exports
  const used = {}; const deps = {}; const evalNeeds = [];
  for (const f of order) {
    deps[f] = new Map();
    for (const [n, g] of info[f].free) {
      const d = decl[n]; if (!d || d === f) continue;
      if (!deps[f].has(d)) deps[f].set(d, new Set()); deps[f].get(d).add(n); (used[d] = used[d] || new Set()).add(n);
      if (g.ev) evalNeeds.push([f, n, d]);
    }
  }
  // ---- 4. evaluation order (ES modules: depth first, a module's imports run before it, cycles break at the back edge)
  const entryOrder = order; const done = new Set(), active = new Set(), evalOrder = [];
  const visit = (f) => { if (done.has(f) || active.has(f)) return; active.add(f); for (const d of [...deps[f].keys()].sort((a, b) => order.indexOf(a) - order.indexOf(b))) visit(d); active.delete(f); done.add(f); evalOrder.push(f); };
  entryOrder.forEach(visit);
  const pos = new Map(evalOrder.map((f, i) => [f, i]));
  const bad = evalNeeds.filter(([f, n, d]) => pos.get(d) > pos.get(f));
  console.log('modules', order.length, 'import edges', Object.values(deps).reduce((a, x) => a + x.size, 0), 'start-time reads', evalNeeds.length, 'order problems', bad.length);
  for (const [f, n, d] of bad) console.log('  ORDER', f, 'reads', n, 'from', d, 'which runs later');
  if (dry) return;
  // ---- 5. write
  const relImp = (from, to) => { let r = path.relative(path.dirname(from), to).split(path.sep).join('/'); if (!r.startsWith('.')) r = './' + r; return r; };
  for (const f of order) {
    const pk = new Map(); // package -> specifiers
    const need = new Set([...info[f].free.keys()].filter((n) => PKG[n] && !decl[n]));
    if (info[f].hasJsx) need.add('ee');
    for (const n of need) { const [spec, from] = PKG[n]; if (!pk.has(from)) pk.set(from, []); pk.get(from).push(spec); }
    const lines = [];
    for (const [from, specs] of [...pk].sort()) {
      const named = specs.filter((s) => s.startsWith('{')).map((s) => s.slice(1, -1).trim()); const other = specs.filter((s) => !s.startsWith('{'));
      for (const o of other) lines.push(`import ${o} from '${from}';`);
      if (named.length) lines.push(`import { ${named.sort().join(', ')} } from '${from}';`);
    }
    for (const [d, names] of [...deps[f]].sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))) lines.push(`import { ${[...names].sort().join(', ')} } from '${relImp(f, d)}';`);
    let out = files[f].replace(/^\/\/ Rewritten from the compiled core[^\n]*\n/m, '').replace(/^(\/\/[^\n]*Shared scope[^\n]*\n)/m, '');
    out = (lines.length ? lines.join('\n') + '\n\n' : '') + out.replace(/^\n+/, '');
    if (used[f] && used[f].size) out = out.replace(/\s*$/, '\n') + `\nexport { ${[...used[f]].sort().join(', ')} };\n`;
    fs.writeFileSync(S + '/' + f, out);
  }
  // ---- 6. entry
  const css = ['../core/core.css', ...m.STYLES.map((s) => './' + s)];
  const main = [
    '// Entry point of the Frequent Research site.',
    '// Stylesheets first, then every module in the order the site was built in (some only register things, such as',
    '// chat answers or scroll effects, so they are imported for their side effects), then React starts.',
    ...css.map((c) => `import '${c}';`),
    ...order.map((f) => `import './${f}';`),
    "import React from 'react';", "import { createRoot } from 'react-dom/client';", "import { HashRouter } from 'react-router-dom';",
    "import * as l from 'react/jsx-runtime';", `import { SiteApp } from './app/SiteApp.jsx';`,
    '', ...start, '',
  ].join('\n');
  fs.writeFileSync(S + '/main.jsx', main);
  fs.writeFileSync('/tmp/claude-0/esm-order.json', JSON.stringify({ order, evalOrder }));
  console.log('written', order.length, 'modules and src/main.jsx');
})().catch((e) => { console.error(e); process.exit(1); });
