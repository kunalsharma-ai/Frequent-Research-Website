// For the top-level statement declaring NAME: external top-level names it references at evaluation time (outside functions) and inside functions.
const fs=require('fs');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const src=fs.readFileSync('/home/claude/work/fr66/frontend/core/core.js','utf8');const ast=parse(src,{sourceType:'module'});
const name=process.argv[2];
traverse(ast,{Program(p){const b=p.scope.bindings[name];let st=b.path;while(!st.parentPath.isProgram())st=st.parentPath;
const own=new Set(st.node.declarations.map(d=>d.id.name));const now=new Set(),later=new Set();
st.traverse({Identifier(q){if(!q.isReferencedIdentifier())return;const x=q.scope.getBinding(q.node.name);if(!x||!x.scope.path.isProgram()||own.has(q.node.name))return;
 (q.getFunctionParent()?later:now).add(q.node.name)}});
const users=new Set();for(const n of own){for(const r of p.scope.bindings[n].referencePaths){let u=r;while(!u.parentPath.isProgram())u=u.parentPath;if(u!==st)users.add(u.node.type==='FunctionDeclaration'?u.node.id.name:u.node.type==='VariableDeclaration'?u.node.declarations[0].id.name:u.node.type)}}
console.log('decls',own.size,'\nEVAL:',[...now].join(' '),'\nFN:',[...later].join(' '),'\nUSERS:',[...users].join(' '));p.stop()}});
