// Free names used by the shared-scope src files that are declared in core statements [from..to] minus keep.
const fs=require('fs'),path=require('path');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const F='/home/claude/work/fr66/frontend';const src=fs.readFileSync(F+'/core/core.js','utf8');const ast=parse(src,{sourceType:'module'});
const [from,to]=[+process.argv[2],+process.argv[3]];const keep=new Set((process.argv[4]||'').split(',').filter(Boolean).map(Number));
const names=new Set();traverse(ast,{Program(p){const body=p.get('body');const idx=new Map(body.map((b,i)=>[b.node,i]));
for(const [n,b] of Object.entries(p.scope.bindings)){let x=b.path;while(!x.parentPath.isProgram())x=x.parentPath;const i=idx.get(x.node);if(i>=from&&i<=to&&!keep.has(i))names.add(n)}p.stop()}});
(async()=>{const m=await import(F+'/src/overlay.manifest.js');const out={};
for(const f of [...(m.EARLY_MODULES||[]),...m.MODULES]){const s=fs.readFileSync(F+'/src/'+f,'utf8');const a=parse(s,{sourceType:'module',plugins:['jsx']});
traverse(a,{Identifier(q){const n=q.node.name;if(!names.has(n))return;if(q.isIdentifier()&&!q.isReferencedIdentifier())return;if(q.scope.getBinding(n))return;(out[n]=out[n]||new Set()).add(f)}});}
for(const [k,v] of Object.entries(out))console.log(k,'<-',[...v].join(' '));console.log('names in range',names.size)})();
