// top-level dependencies of given core names (what they reference), and who references them
const fs=require('fs');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const src=fs.readFileSync('/home/claude/work/fr66/frontend/core/core.js','utf8');
const ast=parse(src,{sourceType:'module'});
const want=process.argv.slice(2);
traverse(ast,{Program(p){const B=p.scope.bindings;
 const declOf=(b)=>{let n=b.path;while(n.parentPath&&!n.parentPath.isProgram())n=n.parentPath;return n.node};
 for(const w of want){const b=B[w];if(!b){console.log(w,'?');continue}const d=b.path.node;const deps=new Set();
  b.path.traverse({Identifier(q){if(!q.isReferencedIdentifier())return;const x=q.scope.getBinding(q.node.name);if(x&&x.scope.path.isProgram()&&q.node.name!==w)deps.add(q.node.name)},JSXIdentifier(q){}});
  const users=[...new Set(b.referencePaths.map(r=>{let n=r;while(n.parentPath&&!n.parentPath.isProgram())n=n.parentPath;const nd=n.node;return nd.type==='FunctionDeclaration'?nd.id.name:nd.type==='VariableDeclaration'?nd.declarations.map(x=>x.id.name).slice(0,2).join('+'):nd.type}))];
  console.log(w,(d.end-d.start)+'b','deps:',[...deps].join(' '),'| used by:',users.slice(0,12).join(' '))}
 p.stop()}});
