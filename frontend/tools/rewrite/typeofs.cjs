// The shared-scope site guarded uses of other files' names with `typeof X !== "undefined"` (a file might not be
// loaded). With ES modules every such name is imported, so the guard is always true: replace it and fold the code
// around it (`true && A` -> A, `true ? A : B` -> A, `if (true) …`). Only for names that are never reassigned and
// hold a function, class or non-undefined value. Edits by position, innermost first, until nothing changes.
// Usage: node typeofs.cjs [--dry]
const fs = require('fs'); const { parse } = require('@babel/parser'); const traverse = require('@babel/traverse').default;
const S = '/home/claude/work/fr66/frontend/src'; const dry = process.argv.includes('--dry');
const main = fs.readFileSync(S + '/main.jsx', 'utf8');
const files = [...main.matchAll(/^import '\.\/([^']+\.jsx?)';$/gm)].map((x) => x[1]);
const P = (s) => parse(s, { sourceType: 'module', plugins: ['jsx'] });
// what each top-level name holds: 'function' | 'value' (defined, not a function) | null (unknown)
const kind = {};
for (const f of files) traverse(P(fs.readFileSync(S + '/' + f, 'utf8')), { Program(p) {
  for (const [n, b] of Object.entries(p.scope.bindings)) {
    if (b.kind === 'module') continue;
    if (b.constantViolations.length) { kind[n] = null; continue; }
    if (b.path.isFunctionDeclaration() || b.path.isClassDeclaration()) { kind[n] = b.path.isClassDeclaration() ? 'class' : 'function'; continue; }
    if (!b.path.isVariableDeclarator() || !b.path.get('id').isIdentifier()) { kind[n] = null; continue; }
    const i = b.path.node.init; if (!i || (i.type === 'Identifier' && i.name === 'undefined')) { kind[n] = null; continue; }
    kind[n] = /^(ArrowFunctionExpression|FunctionExpression)$/.test(i.type) ? 'function' : /^(ObjectExpression|ArrayExpression|StringLiteral|NumericLiteral|BooleanLiteral|TemplateLiteral|NewExpression|RegExpLiteral)$/.test(i.type) ? 'value' : 'any';
  }
  p.stop();
} });
const lit = (n) => n && n.type === 'BooleanLiteral';
let total = 0;
for (const f of files) {
  let src = fs.readFileSync(S + '/' + f, 'utf8'); const orig = src; let n = 0;
  for (let round = 0; round < 20; round++) {
    const ast = P(src); const E = [];
    const add = (a, b, s) => { if (!E.some(([x, y]) => a < y && x < b)) E.push([a, b, s]); };
    const atomic = (n) => /^(Identifier|MemberExpression|CallExpression|StringLiteral|NumericLiteral|BooleanLiteral|NullLiteral|TemplateLiteral|ArrayExpression|ThisExpression|JSXElement|JSXFragment)$/.test(n.type);
    const low = (n) => /^(ArrowFunctionExpression|AssignmentExpression|SequenceExpression|YieldExpression|FunctionExpression|ObjectExpression|ClassExpression)$/.test(n.type);
    const closeParen = (end) => { let i = end; while (/\s/.test(src[i])) i++; return src[i] === ')' ? i + 1 : -1; };
    // replace the expression at p with node n, with as few parentheses as the context allows
    const repl = (p, n) => {
      const own = n.extra && n.extra.parenthesized ? [n.extra.parenStart, closeParen(n.end)] : null;
      const bare = src.slice(n.start, n.end), withOwn = own ? src.slice(own[0], own[1]) : bare;
      const cont = p.parentPath;
      if (cont.isJSXExpressionContainer() && (cont.parentPath.isJSXElement() || cont.parentPath.isJSXFragment()) && /^JSX(Element|Fragment)$/.test(n.type)) { add(cont.node.start, cont.node.end, bare); return; }
      if (low(n)) { add(p.node.start, p.node.end, own ? withOwn : '(' + bare + ')'); return; }
      const outer = p.node.extra && p.node.extra.parenthesized ? [p.node.extra.parenStart, closeParen(p.node.end)] : null;
      const newCallee = cont.isNewExpression() && cont.node.callee === p.node;
      if (outer && outer[1] > 0 && atomic(n) && !newCallee && !/^JSX/.test(n.type)) { add(outer[0], outer[1], bare); return; }
      add(p.node.start, p.node.end, atomic(n) && !newCallee && !/^JSX/.test(n.type) ? bare : withOwn);
    };
    traverse(ast, {
      BinaryExpression(p) {
        const { left, right, operator } = p.node; if (!/^[!=]==?$/.test(operator)) return;
        const [u, s] = left.type === 'UnaryExpression' ? [left, right] : [right, left];
        if (u.type !== 'UnaryExpression' || u.operator !== 'typeof' || u.argument.type !== 'Identifier' || s.type !== 'StringLiteral') return;
        const x = u.argument.name; const b = p.scope.getBinding(x); if (!b || b.scope.block.type !== 'Program') return;
        const k = kind[x]; if (!k || k === 'any') return;
        let v; if (s.value === 'undefined') v = false; else if (s.value === 'function' && (k === 'function' || k === 'class')) v = true; else if (s.value === 'function' && k === 'value') v = false; else return;
        const neg = operator.startsWith('!'); add(p.node.start, p.node.end, String(neg ? !v : v));
      },
      LogicalExpression(p) {
        const { left, right, operator } = p.node; if (!lit(left) || !(operator === '&&' || operator === '||')) return;
        if ((operator === '&&' && left.value) || (operator === '||' && !left.value)) repl(p, right); else add(p.node.start, p.node.end, String(left.value));
      },
      ConditionalExpression(p) { const { test, consequent, alternate } = p.node; if (lit(test)) repl(p, test.value ? consequent : alternate); },
      IfStatement(p) {
        const { test, consequent, alternate } = p.node; if (!lit(test)) return;
        const c = test.value ? consequent : alternate; const lineStart = src.lastIndexOf('\n', p.node.start) + 1; const ind = src.slice(lineStart, p.node.start);
        const inBlock = (p.parentPath.isBlockStatement() || p.parentPath.isProgram()) && /^[ \t]*$/.test(ind);
        if (!c) { if (!inBlock) return; let e = p.node.end; if (src[e] === '\n') e++; add(lineStart, e, ''); return; }
        const dedent = (txt, by) => txt.split('\n').map((l, i) => (i && l.startsWith(by) ? l.slice(by.length) : l)).join('\n');
        if (c.type === 'BlockStatement') {
          if (!inBlock || c.body.some((x) => x.type === 'VariableDeclaration' && x.kind !== 'var' || /^(Class|Function)Declaration$/.test(x.type)) || !c.body.length) { add(p.node.start, p.node.end, src.slice(c.start, c.end)); return; }
          const first = c.body[0], last = c.body[c.body.length - 1]; const fl = src.lastIndexOf('\n', first.start) + 1; const by = src.slice(fl, first.start).slice(ind.length);
          add(p.node.start, p.node.end, dedent(src.slice(first.start, last.end), by)); return;
        }
        const cl = src.lastIndexOf('\n', c.start) + 1; const by = cl > p.node.start ? src.slice(cl, c.start).slice(ind.length) : '';
        add(p.node.start, p.node.end, dedent(src.slice(c.start, c.end), by));
      },
      UnaryExpression(p) { if (p.node.operator === '!' && lit(p.node.argument)) add(p.node.start, p.node.end, String(!p.node.argument.value)); },
    });
    if (!E.length) break;
    // keep only edits that do not contain another edit (innermost first)
    const inner = E.filter(([a, b]) => !E.some(([x, y]) => (x !== a || y !== b) && a <= x && y <= b));
    inner.sort((a, b) => b[0] - a[0]); for (const [a, b, s] of inner) src = src.slice(0, a) + s + src.slice(b); n += inner.length;
  }
  if (src === orig) continue;
  // a parenthesised branch that ended up alone, like `return (x);`, is fine; check it still parses
  P(src); total += n; console.log(f, n); if (!dry) fs.writeFileSync(S + '/' + f, src);
}
console.log('edits', total);
