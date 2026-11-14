// Remove top-level declarations no module uses (no reference anywhere, not exported), when removing them has no side
// effects (functions, literals, arrays/objects of those). Repeats until nothing changes; run relink.cjs between rounds.
// Usage: node deadcode.cjs [--dry] [--force=a,b]
const fs = require('fs'); const { parse } = require('@babel/parser'); const traverse = require('@babel/traverse').default;
const S = '/home/claude/work/fr66/frontend/src'; const dry = process.argv.includes('--dry');
const KEEP = new Set(['SiteApp']);
// --force=a,b: names whose start-up code is known to have no side effects (calls such as Object.freeze or .map)
const FORCE = new Set((process.argv.find((a) => a.startsWith('--force=')) || '--force=').slice(8).split(',').filter(Boolean));
const main = fs.readFileSync(S + '/main.jsx', 'utf8');
const files = [...main.matchAll(/^import '\.\/([^']+\.jsx?)';$/gm)].map((x) => x[1]);
let total = 0;
for (const f of files) {
  const src = fs.readFileSync(S + '/' + f, 'utf8'); const ast = parse(src, { sourceType: 'module', plugins: ['jsx'] }); const cut = [];
  traverse(ast, { Program(p) {
    for (const [n, b] of Object.entries(p.scope.bindings)) {
      if (b.kind === 'module' || KEEP.has(n) || b.referenced || b.constantViolations.length) continue;
      const bp = b.path;
      if (bp.isFunctionDeclaration() || bp.isClassDeclaration()) { if (bp.parentPath.isProgram()) cut.push([bp.node, null, n]); continue; }
      if (!bp.isVariableDeclarator() || !bp.get('id').isIdentifier()) continue;
      const init = bp.get('init'); if (init.node && !FORCE.has(n) && !p.scope.isPure(init.node, true)) continue;
      cut.push([bp.node, bp.parentPath.node, n]);
    }
    p.stop();
  } });
  if (!cut.length) continue;
  // ranges: a whole statement, or one declarator of a multi-declarator statement (with its comma)
  const R = [];
  const byDecl = new Map();
  for (const [node, decl, n] of cut) { if (!decl) R.push([node.start, node.end, 1]); else { if (!byDecl.has(decl)) byDecl.set(decl, []); byDecl.get(decl).push(node); } }
  for (const [decl, nodes] of byDecl) {
    if (nodes.length === decl.declarations.length) { R.push([decl.start, decl.end, 1]); continue; }
    for (const d of nodes) { const i = decl.declarations.indexOf(d); const next = decl.declarations[i + 1], prev = decl.declarations[i - 1];
      if (next && !nodes.includes(next)) R.push([d.start, next.start]); else if (prev) R.push([prev.end, d.end]); else R.push([d.start, next.start]); }
  }
  R.sort((a, b) => b[0] - a[0]);
  // leading comments directly above a removed statement go too
  let out = src;
  for (let [a, b, whole] of R) {
    if (!whole) { out = out.slice(0, a) + out.slice(b); continue; }
    const m = out.slice(0, a).match(/(?:^|\n)((?:[ \t]*\/\/[^\n]*\n)+)[ \t]*$/); if (m) a -= m[1].length + (out.slice(0, a).length - out.slice(0, a).lastIndexOf('\n') - 1);
    out = out.slice(0, a) + out.slice(b).replace(/^;?[ \t]*\n/, '');
  }
  parse(out, { sourceType: 'module', plugins: ['jsx'] });
  console.log(f, cut.map((c) => c[2]).join(' ')); total += cut.length;
  if (!dry) fs.writeFileSync(S + '/' + f, out);
}
console.log('removed', total);
