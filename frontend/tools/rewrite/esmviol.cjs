// Cross-file names that a file assigns to (not allowed on ES-module imports) and lookups of `ci`.
const fs=require('fs');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const F='/home/claude/work/fr66/frontend';const S=JSON.parse(fs.readFileSync('/tmp/claude-0/esmscan.json','utf8'));
for(const f of S.files){const src=fs.readFileSync(F+'/'+f,'utf8');const ast=parse(src,{sourceType:'module',plugins:['jsx']});
traverse(ast,{'AssignmentExpression|UpdateExpression'(q){const t=q.node.left||q.node.argument;if(!t||t.type!=='Identifier')return;const n=t.name;if(q.scope.getBinding(n))return;if(S.decl[n]&&S.decl[n]!==f)console.log('ASSIGN',f,n,'declared in',S.decl[n])},
 Identifier(q){if(q.node.name==='ci'&&q.isReferencedIdentifier()&&!q.scope.getBinding('ci'))console.log('ci in',f,src.slice(q.node.start-40,q.node.end+30).replace(/\n/g,' '))}})}
