// Rename `typeof OLD` guards (free references) that rename.cjs missed. Usage: node fixtypeof.cjs map.json... [--dry]
const fs=require('fs'),path=require('path');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const F='/home/claude/work/fr66/frontend';const dry=process.argv.includes('--dry');
const map={};for(const a of process.argv.slice(2))if(a.endsWith('.json'))Object.assign(map,JSON.parse(fs.readFileSync(a,'utf8')));
(async()=>{const m=await import(path.join(F,'src/overlay.manifest.js'));
const files=[...(m.EARLY_MODULES||[]),...m.MODULES].map(f=>path.join(F,'src',f));let n=0;
for(const f of files){const src=fs.readFileSync(f,'utf8');const ast=parse(src,{sourceType:'module',plugins:['jsx']});const E=[];
traverse(ast,{UnaryExpression(p){if(p.node.operator!=='typeof')return;const a=p.node.argument;if(a.type!=='Identifier'||!map[a.name])return;
if(p.scope.getBinding(a.name))return;E.push([a.start,a.end,map[a.name]]);}});
if(!E.length)continue;n+=E.length;console.log(path.relative(F,f),E.map(e=>src.slice(e[0],e[1])+'->'+e[2]).join(' '));
E.sort((a,b)=>b[0]-a[0]);let out=src;for(const[s,e,r]of E)out=out.slice(0,s)+r+out.slice(e);if(!dry)fs.writeFileSync(f,out);}
console.log('total',n);})();
