// The core wraps pages in React.lazy(() => preload(() => Promise.resolve(moduleObject))) because it was once split
// into chunks; everything is inlined now, so the wrapper only adds a Suspense step. Replace each wrapper by its page:
// remove `X = ee.lazy(...)` and the frozen module object, and print a rename map default-component -> X.
const fs=require('fs');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const F='/home/claude/work/fr66/frontend/core/core.js';let src=fs.readFileSync(F,'utf8');
const ast=parse(src,{sourceType:'module'});const edits=[];const map={};
traverse(ast,{Program(p){const B=p.scope.bindings;
 for(const [name,b] of Object.entries(B)){const d=b.path.node;if(d.type!=='VariableDeclarator'||!d.init)continue;
  const c=src.slice(d.init.start,d.init.end);const m=/^ee\.lazy\(\(\)=>st\(\(\)=>Promise\.resolve\(\)\.then\(\(\)=>(\w+)\),void 0,import\.meta\.url\)\)$/.exec(c);if(!m)continue;
  const mod=B[m[1]];if(!mod){console.log('no module',name);continue}
  const mi=mod.path.node.init;const txt=src.slice(mi.start,mi.end);const dm=/^Object\.freeze\(Object\.defineProperty\(\{__proto__:null,default:(\w+)\},Symbol\.toStringTag,\{value:"Module"\}\)\)$/.exec(txt);
  if(!dm){console.log('module has more exports',name,m[1],txt.slice(0,160));continue}
  if(mod.referencePaths.length!==1){console.log('module used elsewhere',m[1]);continue}
  map[dm[1]]=name;edits.push(b.path,mod.path)}
 p.stop()}});
// remove declarators (group by declaration)
const byDecl=new Map();for(const dp of edits){const decl=dp.parentPath.node;if(!byDecl.has(decl))byDecl.set(decl,new Set());byDecl.get(decl).add(dp.node)}
const cuts=[];for(const [decl,set] of byDecl){const rest=decl.declarations.filter(d=>!set.has(d));cuts.push([decl.start,decl.end,rest.length?`${decl.kind} ${rest.map(d=>src.slice(d.start,d.end)).join(',')};`:''])}
cuts.sort((a,b)=>b[0]-a[0]);for(const [s,e,t] of cuts)src=src.slice(0,s)+t+src.slice(e);
fs.writeFileSync(F,src);fs.writeFileSync('map-lazy.json',JSON.stringify(map,null,1));console.log('unwrapped',Object.keys(map).length,map);
