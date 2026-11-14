// blogPosts.jsx: the compiled core gave every post its own copy of `(t) => \`/services/<vertical>/${t}\``. Keep one
// helper per vertical (mrLink, dmLink, itLink, afLink) and point every use at it. Edits by position.
const fs = require('fs'); const { parse } = require('@babel/parser'); const traverse = require('@babel/traverse').default;
const F = '/home/claude/work/fr66/frontend/src/app/data/blogPosts.jsx';
const NAME = { 'market-research': 'mrLink', 'digital-marketing': 'dmLink', 'it-development': 'itLink', 'accounts-finance': 'afLink' };
const src = fs.readFileSync(F, 'utf8'); const ast = parse(src, { sourceType: 'module', plugins: ['jsx'] }); const E = []; const first = {};
traverse(ast, { Program(p) {
  const bs = Object.values(p.scope.bindings).filter((b) => b.path.isVariableDeclarator() && b.path.node.init).sort((a, b) => a.path.node.start - b.path.node.start);
  for (const b of bs) {
    const init = b.path.node.init; const m = src.slice(init.start, init.end).match(/^\(t\) => `\/services\/([a-z-]+)\/\$\{t\}`$/); if (!m) continue;
    const nm = NAME[m[1]]; if (!nm) throw new Error('vertical ' + m[1]);
    if (p.scope.bindings[nm]) throw new Error(nm + ' exists');
    if (!first[nm]) { first[nm] = b; E.push([b.identifier.start, b.identifier.end, nm]); }
    else {
      const decl = b.path.parentPath.node, i = decl.declarations.indexOf(b.path.node), next = decl.declarations[i + 1], prev = decl.declarations[i - 1];
      if (decl.declarations.length === 1) throw new Error('single declarator');
      if (next) E.push([b.path.node.start, next.start, '']); else E.push([prev.end, b.path.node.end, '']);
    }
    for (const r of b.referencePaths) { if (r.parentPath.isExportSpecifier()) throw new Error('exported ' + b.identifier.name); E.push([r.node.start, r.node.end, nm]); }
  }
  p.stop();
} });
E.sort((a, b) => b[0] - a[0]); let out = src; for (const [a, b, n] of E) out = out.slice(0, a) + n + out.slice(b);
parse(out, { sourceType: 'module', plugins: ['jsx'] }); fs.writeFileSync(F, out); console.log('edits', E.length, Object.keys(first));
