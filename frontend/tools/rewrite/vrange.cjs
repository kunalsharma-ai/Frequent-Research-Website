// Bindings declared in statements [from..to] (minus keep list) that the rest of the core uses. Usage: node vrange.cjs from to keep1,keep2
const fs=require('fs');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const src=fs.readFileSync(process.env.CORE||'/home/claude/work/fr66/frontend/core/core.js','utf8');const ast=parse(src,{sourceType:'module'});
const [from,to]=[+process.argv[2],+process.argv[3]];const keep=new Set((process.argv[4]||'').split(',').filter(Boolean).map(Number));
const inR=i=>i>=from&&i<=to&&!keep.has(i);
traverse(ast,{Program(p){const body=p.get('body');const idx=new Map(body.map((b,i)=>[b.node,i]));
const topIdx=r=>{let n=r;while(!n.parentPath.isProgram())n=n.parentPath;return idx.get(n.node)};
const out={};for(const [n,b] of Object.entries(p.scope.bindings)){if(b.kind==='module')continue;const j=topIdx(b.path);if(!inR(j))continue;
 for(const r of [...b.referencePaths,...b.constantViolations]){const i=topIdx(r);if(!inR(i)){const nd=body[i].node;(out[n]=out[n]||new Set()).add(i+':'+(nd.type==='FunctionDeclaration'?nd.id.name:nd.type==='VariableDeclaration'?nd.declarations[0].id.name:nd.type))}}}
for(const [k,v] of Object.entries(out))console.log(k,'<-',[...v].join(' '));
// also: does kept code inside the range reference the range
p.stop()}});
