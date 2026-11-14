// usage: node sweep.js routes.txt width out.json [overlap=0|1]
const {chromium}=require('playwright');const fs=require('fs');
const [rf,w,out,ov]=process.argv.slice(2);const W=+w,H=W<500?844:900;
const routes=fs.readFileSync(rf,'utf8').trim().split('\n');const res={};let i=0;
(async()=>{const b=await chromium.launch();
async function worker(){const ctx=await b.newContext({viewport:{width:W,height:H},isMobile:W<500,hasTouch:W<500});
 await ctx.addInitScript(()=>{try{sessionStorage.setItem('fr-welcome','1');sessionStorage.setItem('fr-intro22','1');localStorage.setItem('fr-lang','en')}catch(e){}});
 const p=await ctx.newPage();let cur;const add=(k,v)=>{const r=(res[cur]=res[cur]||{});(r[k]=r[k]||[]).push(v)};
 p.on('pageerror',e=>add('pageerror',e.message.slice(0,160)));
 p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))add('console',m.text().slice(0,160))});
 p.on('response',r=>{const u=r.url();if(r.status()>=400&&u.startsWith('http://localhost:8800'))add('http',r.status()+' '+u.replace('http://localhost:8800',''))});
 p.on('requestfailed',r=>{const u=r.url();if(u.startsWith('http://localhost:8800')&&!/\.mp4|media/.test(u))add('reqfail',u.replace('http://localhost:8800','')+' '+(r.failure()||{}).errorText)});
 while(i<routes.length){const r=routes[i++];cur=r;const t0=Date.now();
  try{await p.goto('http://localhost:8800'+r,{waitUntil:'load',timeout:45000});await p.waitForTimeout(1200);const H0=await p.evaluate(()=>document.documentElement.scrollHeight);
   await p.evaluate(async()=>{const Hh=document.documentElement.scrollHeight;for(let y=0;y<Hh;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,90))}});const H1=await p.evaluate(()=>document.documentElement.scrollHeight);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(700);
   const o=await p.evaluate((doOv)=>{const Wd=innerWidth;const R={};R.sw=document.documentElement.scrollWidth>Wd+1?document.documentElement.scrollWidth:0;
    R.badimg=[...document.images].filter(im=>im.complete&&im.naturalWidth===0&&im.getBoundingClientRect().width>0&&!/i\.ytimg|drive\.google/.test(im.src)).map(im=>(im.currentSrc||im.src).slice(0,90)).slice(0,5);
    R.h1=document.querySelectorAll('h1').length;R.title=document.title;
    if(R.sw){const bad=[];document.querySelectorAll('body *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width>0&&r.right>Wd+2&&getComputedStyle(e).position!=='fixed'){let a=e.parentElement,clip=false;while(a&&a!==document.body){const s=getComputedStyle(a);if(/hidden|auto|scroll|clip/.test(s.overflowX)){clip=true;break}a=a.parentElement}if(!clip)bad.push(e.tagName+'.'+String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,50)+' r='+Math.round(r.right))}});R.ovfel=bad.slice(0,6)}
    if(doOv){const vis=e=>{for(let a=e;a&&a!==document.body;a=a.parentElement){const s=getComputedStyle(a);if(s.display==='none'||s.visibility==='hidden'||+s.opacity<0.15||s.position==='fixed'||s.position==='sticky'||a.tagName==='HEADER'||a.tagName==='NAV'||s.animationName!=='none')return false;if(a.getAttribute('aria-hidden')==='true')return false}return true};
     const items=[];const root=document.getElementById('root')||document.body;const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
     while(n=tw.nextNode()){if(n.textContent.trim().length<2)continue;const el=n.parentElement;if(!el||/sr-only|visually-hidden|(^|[-_ ])sr($|[-_ ])/.test(String(el.className)))continue;if(el.closest('svg,canvas,.frk-sr,.sr-only,[class*=sr-only],[class*=marquee],[class*=ticker],[class*=__track]'))continue;
      const rg=document.createRange();rg.selectNodeContents(n);const rects=[...rg.getClientRects()].filter(x=>x.width>4&&x.height>4);if(!rects.length||!vis(el))continue;for(const x of rects)items.push({el,t:n.textContent.trim().slice(0,30),x:x.left,y:x.top+scrollY,w:x.width,h:x.height})}
     const out=[];items.sort((a,b)=>a.y-b.y);
     for(let i=0;i<items.length;i++){const A=items[i];for(let j=i+1;j<items.length;j++){const B=items[j];if(B.y>A.y+A.h)break;if(A.el===B.el||A.el.contains(B.el)||B.el.contains(A.el))continue;
      const ix=Math.min(A.x+A.w,B.x+B.w)-Math.max(A.x,B.x),iy=Math.min(A.y+A.h,B.y+B.h)-Math.max(A.y,B.y);if(ix<=3||iy<=0.4*Math.min(A.h,B.h))continue;const ar=ix*iy/Math.min(A.w*A.h,B.w*B.h);if(ar<0.25)continue;
      const d=e=>e.tagName.toLowerCase()+'.'+String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className||'').split(' ')[0];out.push(`${Math.round(A.y)} "${A.t}" (${d(A.el)}) x "${B.t}" (${d(B.el)})`)}}
     R.overlap=[...new Set(out)].slice(0,8)}
    return R},ov==='1');
   const rr=(res[r]=res[r]||{});if(o.sw)rr.overflow=[o.sw,...(o.ovfel||[])];if(o.badimg.length)rr.badimg=o.badimg;if(o.h1!==1)rr.h1=o.h1;if(o.overlap&&o.overlap.length)rr.overlap=o.overlap;
   if(Math.abs(H1-H0)>400)rr.grow=[H0,H1];if(Date.now()-t0>20000)rr.slow=Date.now()-t0;
  }catch(e){add('nav',e.message.slice(0,100))}
 }await ctx.close()}
await Promise.all([worker(),worker(),worker(),worker()]);
for(const k of Object.keys(res))if(!Object.keys(res[k]).length)delete res[k];
fs.writeFileSync(out,JSON.stringify(res,null,1));console.log(Object.keys(res).length,'routes with findings of',routes.length);await b.close()})();
