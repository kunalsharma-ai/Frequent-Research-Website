// Re-check the ES-module start-up order of the converted site (src/main.jsx and everything it imports).
const fs = require('fs'), path = require('path'); const { parse } = require('@babel/parser'); const traverse = require('@babel/traverse').default;
const S = '/home/claude/work/fr66/frontend/src';
const atStart = (q) => { let f = q.getFunctionParent(); while (f) { if (f.isFunctionDeclaration() || f.isClassMethod() || f.isObjectMethod()) return false; const par = f.parentPath; if (!(par.isCallExpression() || par.isNewExpression())) return false; f = par.getFunctionParent(); } return true; };
const mods = new Map(); const order = [];
function load(file) {
  if (mods.has(file)) return mods.get(file);
  const src = fs.readFileSync(file, 'utf8'); const ast = parse(src, { sourceType: 'module', plugins: ['jsx'] });
  const m = { file, imports: [], local: new Map(), reads: [] }; mods.set(file, m);
  for (const s of ast.program.body) if (s.type === 'ImportDeclaration' && s.source.value.startsWith('.') && /\.(jsx?|mjs)$/.test(s.source.value)) {
    const t = path.resolve(path.dirname(file), s.source.value); m.imports.push(t); for (const sp of s.specifiers) if (sp.imported) m.local.set(sp.local.name, t);
  }
  traverse(ast, { Identifier(q) { if (!q.isReferencedIdentifier()) return; const t = m.local.get(q.node.name); if (!t) return; const b = q.scope.getBinding(q.node.name); if (!b || b.kind !== 'module') return; if (atStart(q)) m.reads.push([q.node.name, t, q.node.loc.start.line]); },
    JSXIdentifier(q) { const t = m.local.get(q.node.name); if (t && atStart(q)) m.reads.push([q.node.name, t, q.node.loc.start.line]); } });
  return m;
}
const done = new Set(), active = new Set();
function visit(f) { if (done.has(f) || active.has(f)) return; active.add(f); const m = load(f); for (const d of m.imports) visit(d); active.delete(f); done.add(f); order.push(f); }
visit(path.join(S, 'main.jsx'));
const pos = new Map(order.map((f, i) => [f, i])); let bad = 0;
for (const f of order) for (const [n, t, line] of mods.get(f).reads) if (pos.get(t) > pos.get(f)) { bad++; console.log('ORDER', path.relative(S, f) + ':' + line, 'reads', n, 'from', path.relative(S, t), 'which runs later'); }
console.log('modules', order.length, 'order problems', bad);
