// Convert compiled React (l.jsx / l.jsxs / ee.createElement calls) back to JSX source.
const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;const generate=require('@babel/generator').default;const t=require('@babel/types');
const isJsxCall=(c)=>t.isMemberExpression(c.callee)&&t.isIdentifier(c.callee.object,{name:'l'})&&(t.isIdentifier(c.callee.property,{name:'jsx'})||t.isIdentifier(c.callee.property,{name:'jsxs'}));
const isCE=(c)=>t.isMemberExpression(c.callee)&&t.isIdentifier(c.callee.object)&&['ee','Vx','React'].includes(c.callee.object.name)&&t.isIdentifier(c.callee.property,{name:'createElement'});
const isFrag=(n)=>t.isMemberExpression(n)&&t.isIdentifier(n.property,{name:'Fragment'})&&t.isIdentifier(n.object)&&['l','ee','Vx'].includes(n.object.name);
function nameOf(n){
  if(t.isStringLiteral(n))return /^[a-z][a-z0-9-]*$/.test(n.value)?t.jsxIdentifier(n.value):null;
  if(t.isIdentifier(n))return /^[A-Z_$]/.test(n.name)?t.jsxIdentifier(n.name):null; // lowercase identifiers are not valid JSX component names
  if(t.isMemberExpression(n)&&!n.computed){const o=nameOf(n.object)||(t.isIdentifier(n.object)?t.jsxIdentifier(n.object.name):null);if(!o)return null;return t.jsxMemberExpression(t.isJSXIdentifier(o)||t.isJSXMemberExpression(o)?o:null,t.jsxIdentifier(n.property.name))}
  return null;
}
function child(n){
  if(t.isStringLiteral(n)){ if(/^[^{}<>]*$/.test(n.value)&&n.value.trim()===n.value&&n.value!=='')return t.jsxText(n.value); return t.jsxExpressionContainer(n)}
  if(t.isJSXElement(n)||t.isJSXFragment(n))return n;
  return t.jsxExpressionContainer(n);
}
function attrVal(v){
  if(t.isStringLiteral(v)&&!/["\\\n]/.test(v.value))return t.stringLiteral(v.value);
  return t.jsxExpressionContainer(v);
}
function build(type,props,key,extraChildren){
  const frag=isFrag(type);let name=frag?null:nameOf(type);
  if(!frag&&!name)return null;
  const attrs=[],children=[];
  if(props&&!t.isObjectExpression(props)){ if(t.isNullLiteral(props)||t.isIdentifier(props,{name:'undefined'}))props=null; else attrs.push(t.jsxSpreadAttribute(props)),props=null }
  if(props)for(const p of props.properties){
    if(t.isSpreadElement(p)){attrs.push(t.jsxSpreadAttribute(p.argument));continue}
    if(!t.isObjectProperty(p)||p.computed)return null;
    const k=t.isIdentifier(p.key)?p.key.name:t.isStringLiteral(p.key)?p.key.value:null; if(k==null)return null;
    if(k==='children'&&extraChildren==null){ if(t.isArrayExpression(p.value)&&p._jsxs)children.push(...p.value.elements.map(child)); else children.push(child(p.value)); continue}
    if(!/^[A-Za-z_$][\w$-]*(:[\w-]+)?$/.test(k))return null;
    attrs.push(t.jsxAttribute(t.jsxIdentifier(k),t.isBooleanLiteral(p.value,{value:true})?null:attrVal(p.value)));
  }
  if(key)attrs.push(t.jsxAttribute(t.jsxIdentifier('key'),attrVal(key)));
  if(extraChildren)children.push(...extraChildren.map(child));
  if(frag){ if(attrs.length)return build(t.memberExpression(t.identifier('ee'),t.identifier('Fragment')).__f=null,props,key,extraChildren); return t.jsxFragment(t.jsxOpeningFragment(),t.jsxClosingFragment(),children)}
  const sc=!children.length;
  return t.jsxElement(t.jsxOpeningElement(name,attrs,sc),sc?null:t.jsxClosingElement(name),children,sc);
}
// undo common minifier output: !0/!1, void 0, comma sequences, `a && b()` statements, code after return
function cleanup(ast){
  const toStmts=(e)=>t.isSequenceExpression(e)?e.expressions.flatMap(toStmts):[exprStmt(e)];
  const exprStmt=(e)=>{
    if(t.isLogicalExpression(e)&&(e.operator==='&&'||e.operator==='||'))return t.ifStatement(e.operator==='&&'?e.left:negate(e.left),block(e.right));
    if(t.isConditionalExpression(e))return t.ifStatement(e.test,block(e.consequent),block(e.alternate));
    return t.expressionStatement(e)};
  const block=(e)=>{const s=toStmts(e);return s.length===1&&!t.isIfStatement(s[0])?s[0]:t.blockStatement(s)};
  const negate=(e)=>t.isUnaryExpression(e,{operator:'!'})?e.argument:t.unaryExpression('!',e);
  traverse(ast,{
    UnaryExpression(p){const n=p.node;if(n.operator==='!'&&t.isNumericLiteral(n.argument)){p.replaceWith(t.booleanLiteral(!n.argument.value))}else if(n.operator==='void'&&t.isNumericLiteral(n.argument,{value:0}))p.replaceWith(t.identifier('undefined'))},
    ExpressionStatement:{exit(p){const e=p.node.expression;if(t.isSequenceExpression(e)||((t.isLogicalExpression(e)&&(e.operator==='&&'||e.operator==='||'))&&!p.parentPath.isProgram())||(t.isConditionalExpression(e)&&!p.parentPath.isProgram())){const st=toStmts(e);if(p.parentPath.isBlockStatement()||p.parentPath.isProgram())p.replaceWithMultiple(st);else p.replaceWith(t.blockStatement(st))}}},
    ReturnStatement:{exit(p){const a=p.node.argument;if(t.isSequenceExpression(a)&&(p.parentPath.isBlockStatement())){const ex=a.expressions;p.replaceWithMultiple([...ex.slice(0,-1).flatMap(toStmts),t.returnStatement(ex[ex.length-1])])}}},
    BlockStatement:{exit(p){const b=p.node.body;const k=b.findIndex(s=>t.isReturnStatement(s));if(k>=0&&k<b.length-1)p.node.body=b.slice(0,k+1).concat(b.slice(k+1).filter(s=>t.isFunctionDeclaration(s)))}},
  });
}
function toJsx(code){
  const ast=parse(code,{sourceType:'module',plugins:['jsx']});
  traverse(ast,{CallExpression:{exit(p){const c=p.node;let r=null;
    if(isJsxCall(c)){const [ty,pr,k]=c.arguments; if(pr&&t.isObjectExpression(pr)&&c.callee.property.name==='jsxs')for(const q of pr.properties)if(t.isObjectProperty(q)&&(q.key.name==='children'))q._jsxs=true; r=build(ty,pr,k,null)}
    else if(isCE(c)){const [ty,pr,...ch]=c.arguments; r=build(ty,pr&&!t.isNullLiteral(pr)?pr:null,null,ch.length?ch:null)}
    if(r)p.replaceWith(r)}}});
  cleanup(ast);
  return generate(ast,{retainLines:false,comments:true,jsescOption:{minimal:true}}).code;
}
module.exports={toJsx};
if(require.main===module){const fs=require('fs');console.log(toJsx(fs.readFileSync(process.argv[2],'utf8')))}
