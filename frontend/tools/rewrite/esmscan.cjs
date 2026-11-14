// Stage 4 planning: top-level names per file (core + shared-scope files), cross-file references, and the ones read
// while modules start (outside functions), which decide whether ES-module evaluation order is safe.
const fs=require('fs'),path=require('path');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const F='/home/claude/work/fr66/frontend';
(async()=>{const m=await import(F+'/src/overlay.manifest.js');
const files=[...m.EARLY_MODULES.map(f=>'src/'+f),'core/core.js',...m.MODULES.map(f=>'src/'+f)];
const decl={},info={};
for(const f of files){const src=fs.readFileSync(F+'/'+f,'utf8');const ast=parse(src,{sourceType:'module',plugins:['jsx']});const own=[],free=new Map();
 traverse(ast,{Program(p){for(const n of Object.keys(p.scope.bindings)){if(p.scope.bindings[n].kind!=='module')own.push(n)}},
  Identifier(q){if(!q.isReferencedIdentifier())return;const n=q.node.name;if(q.scope.getBinding(n))return;const ev=!q.getFunctionParent();const g=free.get(n)||{ev:false,typeofOnly:true};if(ev)g.ev=true;if(!(q.parentPath.isUnaryExpression({operator:'typeof'})))g.typeofOnly=false;free.set(n,g)},
  JSXIdentifier(q){const n=q.node.name;if(!/^[A-Z_$]/.test(n[0])&&!q.parentPath.isJSXMemberExpression())return;if(!(q.parentPath.isJSXOpeningElement()||q.parentPath.isJSXClosingElement()||(q.parentPath.isJSXMemberExpression()&&q.parentPath.node.object===q.node)))return;if(q.scope.getBinding(n))return;const g=free.get(n)||{ev:false,typeofOnly:false};g.typeofOnly=false;free.set(n,g)}});
 for(const n of own){if(decl[n])console.log('DUP',n,decl[n],f);decl[n]=f}info[f]={own,free}}
const edges={};let evalX=0;const evalList=[];const unresolved=new Map();
for(const f of files){edges[f]=new Set();for(const [n,g] of info[f].free){const d=decl[n];if(!d){unresolved.set(n,(unresolved.get(n)||0)+1);continue}if(d===f)continue;edges[f].add(d);if(g.ev){evalX++;evalList.push(f+' reads '+n+' from '+d)}}}
console.log('files',files.length,'names',Object.keys(decl).length,'cross-file import edges',Object.values(edges).reduce((a,s)=>a+s.size,0),'eval-time cross refs',evalX);
console.log(evalList.slice(0,40).join('\n'));
const glob=new Set(Object.getOwnPropertyNames(globalThis).concat(['window','document','navigator','location','localStorage','sessionStorage','fetch','IntersectionObserver','ResizeObserver','requestAnimationFrame','cancelAnimationFrame','getComputedStyle','matchMedia','Image','HTMLElement','CustomEvent','MutationObserver','performance','alert','scrollTo','innerWidth','innerHeight','history','Path2D','devicePixelRatio','XMLSerializer','FileReader','Blob','DOMParser','screen','open','print','crypto','caches','Audio','AudioContext','webkitAudioContext','speechSynthesis','SpeechSynthesisUtterance','ClipboardItem','PerformanceObserver','requestIdleCallback','frames','top','self','scrollY','scrollX','pageYOffset','visualViewport','HTMLCanvasElement','OffscreenCanvas','ImageData','structuredClone','queueMicrotask','console','setTimeout','clearTimeout','setInterval','clearInterval','process','import','undefined','gtag','dataLayer']));
console.log('unresolved (not globals):',[...unresolved].filter(([n])=>!glob.has(n)).map(([n,c])=>n+'×'+c).slice(0,80).join(' '));
fs.writeFileSync('/tmp/claude-0/esmscan.json',JSON.stringify({files,decl,edges:Object.fromEntries(Object.entries(edges).map(([k,v])=>[k,[...v]]))}));
})();
