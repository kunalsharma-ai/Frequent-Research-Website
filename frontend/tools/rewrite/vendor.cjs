// Find the vendor-library statements of the core reachable from seed names: grows the set with statements whose every
// user is in the set, and with expression statements that only touch the set. Prints index ranges and outside users.
// Usage: node vendor.cjs seed1 seed2 ... [--out file.json]
const fs=require('fs');const {parse}=require('@babel/parser');const traverse=require('@babel/traverse').default;
const src=fs.readFileSync('/home/claude/work/fr66/frontend/core/core.js','utf8');const ast=parse(src,{sourceType:'module'});
const args=process.argv.slice(2);const oi=args.indexOf('--out');const outFile=oi>=0?args[oi+1]:null;const seeds=args.filter((a,i)=>a!=='--out'&&(oi<0||i!==oi+1));
traverse(ast,{Program(p){
 const body=p.get('body');const idx=new Map(body.map((b,i)=>[b.node,i]));
 const topIdx=(r)=>{let n=r;while(!n.parentPath.isProgram())n=n.parentPath;return idx.get(n.node)};
 const declIdx=new Map();for(const [n,b] of Object.entries(p.scope.bindings)){if(b.kind==='module')continue;declIdx.set(n,topIdx(b.path))}
 // refs[i] = set of statement indices statement i references; users[j] = statements referencing j
 const refs=body.map(()=>new Set()),users=body.map(()=>new Set());
 for(const [n,b] of Object.entries(p.scope.bindings)){if(b.kind==='module')continue;const j=declIdx.get(n);for(const r of b.referencePaths){const i=topIdx(r);if(i!==j){refs[i].add(j);users[j].add(i)}}
  for(const r of b.constantViolations){const i=topIdx(r);if(i!==j){refs[i].add(j);users[j].add(i)}}}
 const set=new Set(seeds.map(s=>declIdx.get(s)));if(process.env.DBG)for(const s of seeds){const i=declIdx.get(s);console.log(s,i,body[i].node.type,body[i].node.end-body[i].node.start)}if([...set].some(x=>x===undefined))throw Error('seed?');
 let ch=true;while(ch){ch=false;
  for(let i=0;i<body.length;i++){if(set.has(i))continue;const t=body[i].node.type;
   const isStmt=!(t==='FunctionDeclaration'||t==='VariableDeclaration'||t==='ClassDeclaration');
   if(isStmt){if(refs[i].size&&[...refs[i]].every(j=>set.has(j))){set.add(i);ch=true}continue}
   if(users[i].size&&[...users[i]].every(u=>set.has(u))&&[...refs[i]].some(j=>set.has(j))){set.add(i);ch=true}}}
 const sorted=[...set].sort((a,b)=>a-b);let bytes=0;const ranges=[];for(const i of sorted){bytes+=body[i].node.end-body[i].node.start;const l=ranges[ranges.length-1];if(l&&l[1]===i-1)l[1]=i;else ranges.push([i,i])}
 const outside=new Map();for(const i of sorted)for(const u of users[i])if(!set.has(u)){const nd=body[u].node;const nm=nd.type==='FunctionDeclaration'?nd.id.name:nd.type==='VariableDeclaration'?nd.declarations[0].id.name:nd.type+'@'+u;
   const names=Object.keys(p.scope.bindings).filter(n=>declIdx.get(n)===i&&p.scope.bindings[n].referencePaths.some(r=>topIdx(r)===u));outside.set(nm,[...(outside.get(nm)||[]),...names])}
 console.log('statements',sorted.length,'of',body.length,'KB',Math.round(bytes/1024),'ranges',JSON.stringify(ranges));
 for(const [k,v] of outside)console.log('  outside user',k,'->',[...new Set(v)].join(' '));
 const refsOut=new Set();for(const i of sorted)for(const j of refs[i])if(!set.has(j)){const nd=body[j].node;refsOut.add(nd.type==='FunctionDeclaration'?nd.id.name:nd.type==='VariableDeclaration'?nd.declarations.map(d=>d.id.name).slice(0,3).join(','):nd.type)}
 console.log('  set references outside:',[...refsOut].join(' | '));
 if(outFile)fs.writeFileSync(outFile,JSON.stringify(sorted.map(i=>[body[i].node.start,body[i].node.end])));
 p.stop()}});
