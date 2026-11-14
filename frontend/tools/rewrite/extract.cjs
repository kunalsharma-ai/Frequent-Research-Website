// Move top-level declarations out of core/core.js into a JSX source file in src/ (shared scope, listed first in
// src/overlay.manifest.js). Usage: node extract.cjs src/app/Header.jsx Name1 Name2 ...
const fs=require('fs'),path=require('path');const {parse}=require('@babel/parser');const {toJsx}=require('./tojsx.cjs');
const prettier=require('prettier');
const F='/home/claude/work/fr66/frontend';
const [rel,...names]=process.argv.slice(2);
(async()=>{
const corePath=F+'/core/core.js';let core=fs.readFileSync(corePath,'utf8');
const ast=parse(core,{sourceType:'module'});
const want=new Set(names);const cut=[];
for(const n of ast.program.body){
  if(n.type==='FunctionDeclaration'&&want.has(n.id.name)){cut.push([n.start,n.end]);want.delete(n.id.name);continue}
  if(n.type==='VariableDeclaration'){const ds=n.declarations;const hit=ds.filter(d=>d.id.type==='Identifier'&&want.has(d.id.name));if(!hit.length)continue;
    if(hit.length===ds.length){cut.push([n.start,n.end,n.kind]);hit.forEach(d=>want.delete(d.id.name));continue}
    // keep the other declarators of the same statement
    const rest=ds.filter(d=>!hit.includes(d));cut.push([n.start,n.end,n.kind,null,hit,`${n.kind} ${rest.map(d=>core.slice(d.start,d.end)).join(',')};`]);hit.forEach(d=>want.delete(d.id.name))}
}
if(want.size)throw new Error('not found: '+[...want].join(','));
let code='';
for(const [s,e,kind,d,hit] of cut.slice().sort((a,b)=>a[0]-b[0])){code+=hit?`${kind} ${hit.map(x=>core.slice(x.start,x.end)).join(',')};\n`:core.slice(s,e)+'\n'}
for(const [s,e,kind,d,hit,keep] of cut.slice().sort((a,b)=>b[0]-a[0]))core=core.slice(0,s)+(keep||'')+core.slice(e);
let jsx=toJsx(code);
jsx=await prettier.format(jsx,{parser:'babel',printWidth:120});
const out=path.join(F,rel);fs.mkdirSync(path.dirname(out),{recursive:true});
const header=fs.existsSync(out)?'':`// Rewritten from the compiled core (stage 2). Shared scope: see src/overlay.manifest.js.\n`;
fs.appendFileSync(out,(header?header+'\n':'\n')+jsx);
fs.writeFileSync(corePath,core);
// list the file first in MODULES
const mp=F+'/src/overlay.manifest.js';let m=fs.readFileSync(mp,'utf8');const r=rel.replace(/^src\//,'');
const list=process.env.EARLY?'export const EARLY_MODULES = [\n':'export const MODULES = [\n';
if(!m.includes(JSON.stringify(r)))m=m.replace(list,list+'  '+JSON.stringify(r)+',\n');
fs.writeFileSync(mp,m);
console.log('moved',cut.length,'declarations to',rel,(jsx.length/1024).toFixed(1)+'KB');
})();
