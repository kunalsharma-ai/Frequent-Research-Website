// Move core statements (any kind, by index as printed by the listing) into a shared-scope source file, in their
// original order, converted to JSX and formatted. Usage: node movestmts.cjs src/app/X.jsx 14-16,20 [--early]
// The file is listed first in MODULES (or EARLY_MODULES with --early); statements are appended if the file exists.
const fs=require('fs'),path=require('path');const {parse}=require('@babel/parser');const {toJsx}=require('./tojsx.cjs');const prettier=require('prettier');
const F='/home/claude/work/fr66/frontend';const [rel,spec]=process.argv.slice(2);const early=process.argv.includes('--early');
(async()=>{const P=F+'/core/core.js';let core=fs.readFileSync(P,'utf8');const body=parse(core,{sourceType:'module'}).program.body;
const idx=[];for(const part of spec.split(',')){const [a,b]=part.split('-').map(Number);for(let i=a;i<=(b??a);i++)idx.push(i)}
idx.sort((a,b)=>a-b);const code=idx.map(i=>core.slice(body[i].start,body[i].end)).join('\n');
for(const i of idx.slice().reverse())core=core.slice(0,body[i].start)+core.slice(body[i].end);
let jsx=await prettier.format(toJsx(code),{parser:'babel',printWidth:120});
const out=path.join(F,rel);fs.mkdirSync(path.dirname(out),{recursive:true});
const header=fs.existsSync(out)?'':'// Rewritten from the compiled core. Shared scope: see src/overlay.manifest.js.\n\n';
fs.appendFileSync(out,(header||'\n')+jsx);fs.writeFileSync(P,core);
if(process.argv.includes('--nolist')){console.log('moved',idx.length,'statements to',rel,(jsx.length/1024).toFixed(1)+'KB (not listed)');return}
const mp=F+'/src/overlay.manifest.js';let m=fs.readFileSync(mp,'utf8');const r=rel.replace(/^src\//,'');
const list=early?'export const EARLY_MODULES = [\n':'export const MODULES = [\n';
if(!m.includes(JSON.stringify(r)))m=m.replace(list,list+'  '+JSON.stringify(r)+',\n');fs.writeFileSync(mp,m);
console.log('moved',idx.length,'statements to',rel,(jsx.length/1024).toFixed(1)+'KB');})();
