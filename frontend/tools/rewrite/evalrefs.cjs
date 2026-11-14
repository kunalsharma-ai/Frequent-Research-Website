// Which core statements read names matching REGEX while the module starts (outside function bodies), and are they before the overlay slot?
const fs=require('fs');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const src=fs.readFileSync(process.argv[3],'utf8');const ast=parse(src,{sourceType:'module'});const re=new RegExp(process.argv[2]);
const slot=src.indexOf('/*@@FR_OVERLAY@@*/');
traverse(ast,{Program(p){for(const st of p.get('body')){const own=new Set();if(st.isVariableDeclaration())st.node.declarations.forEach(d=>own.add(d.id.name));if(st.isFunctionDeclaration())continue;
 const hits=new Set();st.traverse({Identifier(q){if(!q.isReferencedIdentifier()||!re.test(q.node.name)||own.has(q.node.name))return;if(q.getFunctionParent())return;const b=q.scope.getBinding(q.node.name);if(!b||b.scope.path.isProgram())hits.add(q.node.name)}});
 if(hits.size)console.log(st.node.start<slot?'BEFORE slot':'after slot ',src.slice(st.node.start,st.node.start+60).replace(/\n/g,' '),'->',[...hits].join(' '))}p.stop()}});
