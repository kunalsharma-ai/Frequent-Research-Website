// Every name a module uses must be declared by itself, by another site module (relink.cjs imports it), by a package
// import, or be a browser/JS global. Prints the rest: they would throw ReferenceError when that code runs.
// (`typeof X` guards are listed separately: they are safe, but usually mean leftover code.)
const fs = require('fs'); const { parse } = require('@babel/parser'); const traverse = require('@babel/traverse').default;
const S = '/home/claude/work/fr66/frontend/src';
const main = fs.readFileSync(S + '/main.jsx', 'utf8');
const files = ['main.jsx', ...[...main.matchAll(/^import '\.\/([^']+\.jsx?)';$/gm)].map((x) => x[1])];
const G = new Set(Object.getOwnPropertyNames(globalThis).concat(('window document navigator location history localStorage sessionStorage fetch performance ' +
  'requestAnimationFrame cancelAnimationFrame IntersectionObserver ResizeObserver MutationObserver matchMedia getComputedStyle Image HTMLElement Element Node ' +
  'CustomEvent PopStateEvent HashChangeEvent Event KeyboardEvent MouseEvent FileReader Blob File FormData XMLHttpRequest DOMParser screen alert confirm open scrollTo scrollY scrollX innerWidth ' +
  'innerHeight devicePixelRatio requestIdleCallback cancelIdleCallback self global HTMLCanvasElement CanvasRenderingContext2D Path2D OffscreenCanvas Audio AudioContext ' +
  'webkitAudioContext PointerEvent TouchEvent WheelEvent SVGElement HTMLImageElement HTMLVideoElement HTMLInputElement HTMLFormElement NodeFilter Range Selection ' +
  'getSelection visualViewport caches indexedDB crypto origin top parent frames name status close print focus blur postMessage BroadcastChannel Worker ' +
  'Notification ClipboardItem DOMRect DOMMatrix ImageData createImageBitmap URLSearchParams Intl console import process').split(' ')));
const decl = new Set(); const asts = {};
for (const f of files) { const ast = parse(fs.readFileSync(S + '/' + f, 'utf8'), { sourceType: 'module', plugins: ['jsx'] }); asts[f] = ast;
  traverse(ast, { Program(p) { for (const n of Object.keys(p.scope.bindings)) decl.add(n); p.stop(); } }); }
let bad = 0, guarded = 0;
for (const f of files) traverse(asts[f], {
  Identifier(q) { if (!q.isReferencedIdentifier()) return; const n = q.node.name; if (q.scope.getBinding(n) || G.has(n) || decl.has(n)) return;
    const g = q.parentPath.isUnaryExpression({ operator: 'typeof' }); if (g) { guarded++; if (process.argv.includes('-v')) console.log('  typeof', f, n); return; }
    bad++; console.log('UNDECLARED', f + ':' + q.node.loc.start.line, n); },
  JSXIdentifier(q) { const n = q.node.name; if (!/^[A-Z]/.test(n) || !(q.parentPath.isJSXOpeningElement() || (q.parentPath.isJSXMemberExpression() && q.parent.object === q.node))) return;
    if (q.scope.getBinding(n) || decl.has(n)) return; bad++; console.log('UNDECLARED JSX', f + ':' + q.node.loc.start.line, n); },
});
console.log('undeclared', bad, 'typeof-guarded', guarded);
