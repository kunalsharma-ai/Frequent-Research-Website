// Readable local names for code that came from the compiled core: a destructured property renamed by the minifier
// ({ value: t, label: e }) gets its property name back ({ value, label }) when that name is free in the whole function.
// Also `const t = props.x`-style is left alone. Edits the file in place by position (only files under src/app).
// Usage: node destruct.cjs [--dry] file...
const fs = require('fs'); const { parse } = require('@babel/parser'); const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default; const t = require('@babel/types');
const dry = process.argv.includes('--dry'); const files = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const RESERVED = new Set(['default', 'class', 'function', 'new', 'delete', 'in', 'for', 'if', 'do', 'var', 'let', 'const', 'return', 'switch', 'case', 'this', 'null', 'true', 'false', 'typeof', 'void', 'with', 'yield', 'await', 'enum', 'export', 'import', 'super', 'try', 'catch', 'finally', 'throw', 'while', 'break', 'continue', 'debugger', 'extends', 'instanceof', 'static', 'arguments', 'eval', 'package', 'private', 'protected', 'public', 'interface', 'implements', 'undefined', 'NaN', 'Infinity']);
(async () => {
  let total = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const ast = parse(src, { sourceType: 'module', plugins: ['jsx'] }); let n = 0;
    traverse(ast, {
      ObjectPattern(p) {
        for (const prop of p.get('properties')) {
          if (!prop.isObjectProperty() || prop.node.computed) continue;
          const key = prop.node.key; if (!t.isIdentifier(key)) continue; const k = key.name;
          let val = prop.get('value'); if (val.isAssignmentPattern()) val = val.get('left');
          if (!val.isIdentifier()) continue; const v = val.node.name;
          if (v === k || v.length > 2 || RESERVED.has(k) || !/^[a-zA-Z_$][\w$]*$/.test(k)) continue;
          const b = p.scope.getBinding(v); if (!b || b.identifier !== val.node) continue;
          // the new name must not be visible or used anywhere the old binding's scope reaches
          const sc = b.scope; let clash = !!sc.getBinding(k) || !!sc.hasGlobal(k);
          // property keys (obj.k, { k: … }, class members) and JSX attribute names are not variables, so they never clash
          const notVar = (q) => {
            const par = q.parent;
            if ((t.isMemberExpression(par) || t.isOptionalMemberExpression(par)) && par.property === q.node && !par.computed) return true;
            if ((t.isObjectProperty(par) || t.isObjectMethod(par) || t.isClassMethod(par) || t.isClassProperty(par)) && par.key === q.node && !par.computed && !(t.isObjectProperty(par) && par.shorthand)) return true;
            return false;
          };
          if (!clash) sc.path.traverse({
            Identifier(q) { if (q.node.name === k && !notVar(q)) clash = true; },
            JSXIdentifier(q) { if (q.node.name !== k) return; if (q.parentPath.isJSXAttribute() || (q.parentPath.isJSXMemberExpression() && q.parent.property === q.node)) return; clash = true; },
          });
          if (clash) continue;
          if (!/^[A-Z]/.test(k) && b.referencePaths.some((r) => r.isJSXIdentifier() || r.parentPath.isJSXMemberExpression())) continue; // <I /> must stay a component
          sc.rename(v, k); n++;
        }
      },
    });
    if (!n) continue;
    total += n;
    // edit the original text by position so formatting and comments stay: every identifier whose name changed
    const E = [];
    traverse(ast, {
      ObjectProperty(p) {
        const { key, value } = p.node; if (p.node.computed || !t.isIdentifier(key)) return;
        const left = t.isAssignmentPattern(value) ? value.left : value; if (!t.isIdentifier(left) || left.start == null) return;
        if (src.slice(left.start, left.end) === left.name) return;
        if (left.name === key.name && !p.node.shorthand && src.slice(key.start, key.end) === key.name) { E.push([key.start, left.end, key.name]); left._done = true; }
        else if (p.node.shorthand || src.slice(key.start, key.end) !== key.name) { E.push([left.start, left.end, src.slice(left.start, left.end) + ': ' + left.name]); left._done = true; }
      },
      Identifier(p) { const q = p.node; if (q._done || q.start == null) return; if (src.slice(q.start, q.end) !== q.name) E.push([q.start, q.end, q.name]); },
      JSXIdentifier(p) { const q = p.node; if (q.start == null) return; if (src.slice(q.start, q.end) !== q.name) E.push([q.start, q.end, q.name]); },
    });
    const seen = new Set(); const E2 = E.filter(([x]) => !seen.has(x) && seen.add(x)).sort((x, y) => y[0] - x[0]);
    let out = src; for (const [x, y, nm] of E2) out = out.slice(0, x) + nm + out.slice(y);
    parse(out, { sourceType: 'module', plugins: ['jsx'] });
    if (!dry) fs.writeFileSync(f, out);
    console.log(f.replace(/.*\/src\//, ''), n);
  }
  console.log('renamed', total);
})();
