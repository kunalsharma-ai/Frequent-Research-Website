const fs=require('fs');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const S='/home/claude/work/fr66/frontend/src';const main=fs.readFileSync(S+'/main.jsx','utf8');
const files=[...main.matchAll(/^import '\.\/([^']+\.jsx?)';$/gm)].map(x=>x[1]);
const out=[];
for(const f of files){const src=fs.readFileSync(S+'/'+f,'utf8');const ast=parse(src,{sourceType:'module',plugins:['jsx']});
traverse(ast,{Program(p){for(const [n,b] of Object.entries(p.scope.bindings)){if(b.kind==='module')continue;if(!(/^[A-Za-z_$][A-Za-z0-9_$]?\$?[0-9]?$/.test(n)&&n.length<=3))continue;
let node=b.path.node;let txt=src.slice(node.start,node.end).replace(/\s+/g,' ').slice(0,110);out.push([f,n,b.referencePaths.length,txt].join(' | '));}p.stop();}});}
console.log(out.length);fs.writeFileSync('/tmp/claude-0/short.txt',out.join('\n'));
