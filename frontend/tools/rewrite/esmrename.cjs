// Rename top-level names of the ES-module site everywhere (declaring file and every file that imports them), editing
// only identifier positions so formatting and comments stay. Run relink.cjs afterwards to rewrite import/export lines.
// Usage: node esmrename.cjs map.json [--dry]      map: { "oldName": "newName", ... }
const fs = require('fs'), path = require('path');
const { parse } = require('@babel/parser'); const traverse = require('@babel/traverse').default;
const S = '/home/claude/work/fr66/frontend/src';
const map = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const dry = process.argv.includes('--dry');
const main = fs.readFileSync(S + '/main.jsx', 'utf8');
const files = [...main.matchAll(/^import '\.\/([^']+\.jsx?)';$/gm)].map((x) => x[1]);
let total = 0; const problems = [];
// every old name must be declared exactly once, and no new name may exist already
const declared = {};
for (const f of files) {
  const ast = parse(fs.readFileSync(S + '/' + f, 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
  traverse(ast, { Program(p) { for (const [n, b] of Object.entries(p.scope.bindings)) if (b.kind !== 'module') declared[n] = f; p.stop(); } });
}
for (const [o, n] of Object.entries(map)) { if (!declared[o]) problems.push(`${o} is not declared`); if (declared[n]) problems.push(`${n} already exists in ${declared[n]}`); }
const results = [];
for (const f of [...files, 'main.jsx']) {
  const src = fs.readFileSync(S + '/' + f, 'utf8'); const ast = parse(src, { sourceType: 'module', plugins: ['jsx'] }); const E = [];
  traverse(ast, {
    Program(p) {
      for (const [o, n] of Object.entries(map)) {
        const b = p.scope.bindings[o]; if (!b) continue;
        if (p.scope.bindings[n]) { problems.push(`${f}: ${n} already bound`); continue; }
        const id = b.kind === 'module' ? b.path.node.local : b.identifier; E.push([id.start, id.end, n]);
        if (b.kind === 'module' && b.path.node.imported && b.path.node.imported.name === o) { const im = b.path.node.imported; if (im !== id) E.push([im.start, im.end, n]); }
        for (const r of b.referencePaths) {
          if (r.scope.getBinding(n) && r.scope.getBinding(n).scope !== p.scope) problems.push(`${f}: ${n} is a local name where ${o} is used (line ${r.node.loc.start.line})`);
          const par = r.parent;
          if (r.parentPath.isObjectProperty() && par.shorthand && par.value === r.node) E.push([r.node.start, r.node.end, `${o}: ${n}`]);
          else if (r.parentPath.isExportSpecifier() && par.local === r.node && par.exported.name === o && par.exported === par.local) E.push([r.node.start, r.node.end, n]);
          else E.push([r.node.start, r.node.end, n]);
        }
        for (const v of b.constantViolations) if (v.node.left && v.node.left.type === 'Identifier' && v.node.left.name === o) E.push([v.node.left.start, v.node.left.end, n]);
      }
      p.stop();
    },
  });
  // dedupe positions (an export specifier `X` shares its node)
  const seen = new Set(); const E2 = E.filter(([a]) => !seen.has(a) && seen.add(a));
  if (E2.length) { E2.sort((a, b) => b[0] - a[0]); let out = src; for (const [a, b, n] of E2) out = out.slice(0, a) + n + out.slice(b); results.push([f, out]); total += E2.length; }
}
console.log('edits', total, 'files', results.length);
if (problems.length) { console.log('PROBLEMS\n' + problems.join('\n')); process.exit(1); }
if (!dry) for (const [f, out] of results) fs.writeFileSync(S + '/' + f, out);
