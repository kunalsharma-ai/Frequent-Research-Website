// Rename top-level names of the compiled core (core/core.js) everywhere: in the core and in every shared-scope
// source file listed in src/overlay.manifest.js. Text edits at exact identifier positions, so formatting and comments
// of the source files are kept. Usage: node rename.cjs map.json [--dry]
const fs = require('fs'), path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const F = '/home/claude/work/fr66/frontend';
const map = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const dry = process.argv.includes('--dry');
const olds = new Set(Object.keys(map));

function edits(src, isCore, plugins) {
  const ast = parse(src, { sourceType: 'module', plugins, errorRecovery: false });
  const E = [];
  const problems = [], pending = [], aliases = new Set();
  traverse(ast, {
    Program(p) {
      const bindings = p.scope.bindings;
      if (isCore) {
        for (const [o, n] of Object.entries(map)) {
          if (bindings[n]) problems.push(`core already has ${n}`);
          const b = bindings[o];
          if (!b) { problems.push(`core has no ${o}`); continue; }
          // the declaration
          const id = b.identifier; E.push([id.start, id.end, n]);
        }
      }
    },
    'Identifier|JSXIdentifier'(p) {
      const name = p.node.name;
      if (!olds.has(name)) return;
      if (p.isJSXIdentifier() && !(p.parentPath.isJSXOpeningElement() || p.parentPath.isJSXClosingElement() || (p.parentPath.isJSXMemberExpression() && p.parentPath.node.object === p.node))) return;
      if (p.isIdentifier() && !p.isReferencedIdentifier() && !p.isBindingIdentifier()) return; // property keys etc.
      const b = p.scope.getBinding(name);
      const top = isCore ? b && b.scope.path.isProgram() : !b;
      if (!top) return;
      if (isCore && b && b.identifier === p.node) return; // declaration handled above
      if (!isCore && p.isBindingIdentifier()) return;
      // `const Link = ge` (a local alias with the new name): drop the alias, its uses then reach the renamed name
      if (p.parentPath.isVariableDeclarator() && p.parent.init === p.node && p.parent.id.type === 'Identifier' && p.parent.id.name === map[name]) {
        const decl = p.parentPath.parentPath.node, ds = decl.declarations, k = ds.indexOf(p.parent);
        if (ds.length === 1) E.push([decl.start, decl.end, decl.end < src.length && src[decl.end - 1] !== ';' ? '' : ';']);
        else if (k < ds.length - 1) E.push([ds[k].start, ds[k + 1].start, '']);
        else E.push([ds[k - 1].end, ds[k].end, '']);
        aliases.add(p.parent.id);
        return;
      }
      // a local name equal to the new name would capture the reference
      const nb = p.scope.getBinding(map[name]);
      if (nb && !nb.scope.path.isProgram()) pending.push([nb.identifier, `${name}->${map[name]} shadowed at ${p.node.start}`]);
      const parent = p.parent;
      if (p.parentPath.isObjectProperty() && parent.shorthand && parent.value === p.node) E.push([p.node.start, p.node.end, `${name}: ${map[name]}`]);
      else E.push([p.node.start, p.node.end, map[name]]);
    },
  });
  for (const [id, msg] of pending) if (!aliases.has(id)) problems.push(msg);
  return { E, problems };
}
function apply(src, E) {
  E.sort((a, b) => b[0] - a[0]);
  let out = src; let last = Infinity;
  for (const [s, e, n] of E) { if (e > last) throw new Error('overlapping edit at ' + s); out = out.slice(0, s) + n + out.slice(e); last = s; }
  return out;
}
(async () => {
  const m = await import(path.join(F, 'src/overlay.manifest.js'));
  const files = [[path.join(F, 'core/core.js'), true], ...m.MODULES.map((f) => [path.join(F, 'src', f), false])];
  let total = 0, bad = [];
  const results = [];
  for (const [f, isCore] of files) {
    const src = fs.readFileSync(f, 'utf8');
    const { E, problems } = edits(src, isCore, isCore ? [] : ['jsx']);
    bad.push(...problems.map((x) => path.basename(f) + ': ' + x));
    total += E.length;
    if (E.length) results.push([f, apply(src, E), E.length]);
  }
  console.log('edits', total, 'files', results.length);
  if (bad.length) { console.log('PROBLEMS\n' + bad.slice(0, 30).join('\n')); process.exit(1); }
  if (!dry) for (const [f, out] of results) fs.writeFileSync(f, out);
})();
