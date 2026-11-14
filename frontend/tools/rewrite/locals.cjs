// Readable local names in a rewritten file: node locals.cjs file.jsx '{"FuncName":{"t":"open",...}}'
// Regenerates the file through the JSX cleanup and prettier.
const fs=require('fs');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;const generate=require('@babel/generator').default;const prettier=require('prettier');
const {toJsx}=require('./tojsx.cjs');
(async()=>{
const [file,json]=process.argv.slice(2);const M=JSON.parse(json);
let src=toJsx(fs.readFileSync(file,'utf8'));
const ast=parse(src,{sourceType:'module',plugins:['jsx']});
traverse(ast,{'FunctionDeclaration|VariableDeclarator'(p){const name=p.node.id&&p.node.id.name;const m=M[name];if(!m)return;
  const scopes=[];p.traverse({Scope(q){scopes.push(q.scope)}});if(p.isFunctionDeclaration())scopes.unshift(p.scope);
  for(const sc of scopes)for(const [o,n] of Object.entries(m))if(sc.hasOwnBinding(o))sc.rename(o,n)}});
traverse(ast,{ObjectProperty(p){const n=p.node;if(!n.computed&&n.key.type==='Identifier'&&(n.value.type==='Identifier'||(n.value.type==='AssignmentPattern'&&n.value.left.type==='Identifier'&&n.value.left.name===n.key.name))&&(n.value.name||n.value.left.name)===n.key.name)n.shorthand=true}});
let out=generate(ast,{jsescOption:{minimal:true}}).code;
out=await prettier.format(out,{parser:'babel',printWidth:120});
fs.writeFileSync(file,out);console.log('ok',file);
})();
