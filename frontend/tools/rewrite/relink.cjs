// Recompute the imports and exports of every site module after code moved between files (or names changed).
// The module list is the side-effect import list of src/main.jsx. For each module: generated imports (relative
// .js/.jsx imports and the React / ReactDOM / React Router / jsPDF imports) and the trailing `export { … };` are
// rebuilt from what the file declares and uses. Asset imports and anything else are kept.
// Usage: node relink.cjs [--check]   (--check only reports, writes nothing)
const fs = require('fs'), path = require('path');
const { parse } = require('@babel/parser'); const traverse = require('@babel/traverse').default;
const S = '/home/claude/work/fr66/frontend/src';
const check = process.argv.includes('--check');
const PKG = {
  ee: ['* as ee', 'react'], React: ['React', 'react'], l: ['* as l', 'react/jsx-runtime'],
  createRoot: ['{ createRoot }', 'react-dom/client'], ci: ['* as ci', 'react-dom'], dt: ['{ jsPDF as dt }', 'jspdf'],
};
for (const n of ['useLocation', 'useParams', 'Navigate', 'Route', 'Routes', 'HashRouter', 'Link', 'NavLink', 'useSearchParams']) PKG[n] = [`{ ${n} }`, 'react-router-dom'];
const PKGS = new Set(Object.values(PKG).map((x) => x[1]));
const isGenImport = (s) => s.type === 'ImportDeclaration' && s.specifiers.length && ((s.source.value.startsWith('.') && /\.(jsx?|mjs)$/.test(s.source.value)) || PKGS.has(s.source.value));
const isGenExport = (s) => s.type === 'ExportNamedDeclaration' && !s.declaration && !s.source;

const mainSrc = fs.readFileSync(S + '/main.jsx', 'utf8');
const order = [...mainSrc.matchAll(/^import '\.\/([^']+\.jsx?)';$/gm)].map((x) => x[1]);
const text = {}, decl = {}, info = {};
for (const f of order) {
  let src = fs.readFileSync(S + '/' + f, 'utf8');
  const ast = parse(src, { sourceType: 'module', plugins: ['jsx'], errorRecovery: true });
  // strip generated imports/exports
  const cut = ast.program.body.filter((s) => isGenImport(s) || isGenExport(s)).map((s) => [s.start, s.end]);
  for (const [a, b] of cut.reverse()) src = src.slice(0, a) + src.slice(b).replace(/^[ \t]*\n/, '');
  src = src.replace(/^\n+/, '').replace(/\s*$/, '\n');
  text[f] = src;
  const ast2 = parse(src, { sourceType: 'module', plugins: ['jsx'] });
  const own = [], free = new Set(); let hasJsx = false;
  traverse(ast2, {
    Program(p) { for (const [n, b] of Object.entries(p.scope.bindings)) if (b.kind !== 'module') own.push(n); },
    JSXElement() { hasJsx = true; }, JSXFragment() { hasJsx = true; },
    Identifier(q) { if (q.isReferencedIdentifier() && !q.scope.getBinding(q.node.name)) free.add(q.node.name); },
    JSXIdentifier(q) {
      const n = q.node.name;
      const ok = q.parentPath.isJSXOpeningElement() || q.parentPath.isJSXClosingElement() || (q.parentPath.isJSXMemberExpression() && q.parentPath.node.object === q.node);
      if (ok && (/^[A-Z_$]/.test(n) || q.parentPath.isJSXMemberExpression()) && !q.scope.getBinding(n)) free.add(n);
    },
  });
  for (const n of own) { if (decl[n]) throw new Error(`${n} declared in ${decl[n]} and ${f}`); decl[n] = f; }
  info[f] = { free, hasJsx };
}
const used = {}, deps = {};
for (const f of order) {
  deps[f] = new Map();
  for (const n of info[f].free) { const d = decl[n]; if (!d || d === f) continue; if (!deps[f].has(d)) deps[f].set(d, new Set()); deps[f].get(d).add(n); (used[d] = used[d] || new Set()).add(n); }
}
// main.jsx itself uses SiteApp
const mainUses = [...mainSrc.matchAll(/^import \{([^}]+)\} from '\.\/app\/[^']+';$/gm)].flatMap((m) => m[1].split(',').map((x) => x.trim())); for (const n of mainUses) (used[decl[n]] = used[decl[n]] || new Set()).add(n);
const relImp = (from, to) => { let r = path.relative(path.dirname(from), to).split(path.sep).join('/'); if (!r.startsWith('.')) r = './' + r; return r; };
let changed = 0;
for (const f of order) {
  const pk = new Map(); const need = new Set([...info[f].free].filter((n) => PKG[n] && !decl[n])); if (info[f].hasJsx) need.add('ee');
  for (const n of need) { const [spec, from] = PKG[n]; if (!pk.has(from)) pk.set(from, []); pk.get(from).push(spec); }
  const lines = [];
  for (const [from, specs] of [...pk].sort()) {
    const named = specs.filter((s) => s.startsWith('{')).map((s) => s.slice(1, -1).trim()), other = specs.filter((s) => !s.startsWith('{'));
    for (const o of other) lines.push(`import ${o} from '${from}';`);
    if (named.length) lines.push(`import { ${named.sort().join(', ')} } from '${from}';`);
  }
  for (const [d, names] of [...deps[f]].sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))) lines.push(`import { ${[...names].sort().join(', ')} } from '${relImp(f, d)}';`);
  // keep a leading comment block above the imports
  let src = text[f]; let head = '';
  const mm = src.match(/^(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\n)+/); if (mm) { head = mm[0]; src = src.slice(head.length).replace(/^\n+/, ''); }
  let out = head + (lines.length ? lines.join('\n') + '\n\n' : '') + src;
  if (used[f] && used[f].size) out = out.replace(/\s*$/, '\n') + `\nexport { ${[...used[f]].sort().join(', ')} };\n`;
  const prev = fs.readFileSync(S + '/' + f, 'utf8');
  if (out !== prev) { changed++; if (!check) fs.writeFileSync(S + '/' + f, out); }
}
console.log('modules', order.length, check ? 'would change' : 'changed', changed);
