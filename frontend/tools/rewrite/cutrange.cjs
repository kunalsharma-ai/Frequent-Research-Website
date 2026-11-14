// Delete core statements [from..to] except the kept indices; add an import line after the react-router import.
// Usage: node cutrange.cjs from to keep1,keep2 "import ... ;"
const fs=require('fs');const {parse}=require('@babel/parser');const P='/home/claude/work/fr66/frontend/core/core.js';
let src=fs.readFileSync(P,'utf8');const body=parse(src,{sourceType:'module'}).program.body;
const [from,to]=[+process.argv[2],+process.argv[3]];const keep=new Set(process.argv[4].split(',').filter(Boolean).map(Number));
const cuts=[];for(let i=from;i<=to;i++){if(keep.has(i))continue;const s=body[i].start,e=i<to?body[i+1].start:body[i].end;const l=cuts[cuts.length-1];if(l&&l[1]===s)l[1]=e;else cuts.push([s,e])}
// comments between statements (licence banners) go with their statement range
let n=0;for(const [s,e] of cuts.reverse()){n+=e-s;src=src.slice(0,s)+src.slice(e)}
const imp=process.argv[5];if(imp){const at=src.indexOf("from 'react-router-dom';");const eol=src.indexOf('\n',at);src=src.slice(0,eol+1)+imp+'\n'+src.slice(eol+1)}
fs.writeFileSync(P,src);console.log('removed',Math.round(n/1024),'KB in',cuts.length,'cuts');
