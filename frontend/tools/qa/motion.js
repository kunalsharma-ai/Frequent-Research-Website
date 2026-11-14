// usage: node motion.js out.json width throttle route...   (prod server :8800)
// For each page: paint-heavy running animations (not transform/opacity), fps while scrolling, long tasks, max long task.
const {chromium}=require('playwright');const fs=require('fs');
const [out,w,thr,...routes]=process.argv.slice(2);const W=+w;
(async()=>{const b=await chromium.launch();const res={};
for(const r of routes){const ctx=await b.newContext({viewport:{width:W,height:W<500?844:900},isMobile:W<500,hasTouch:W<500});
 await ctx.addInitScript(()=>{try{sessionStorage.setItem('fr-welcome','1');sessionStorage.setItem('fr-intro22','1')}catch(e){}
  window.__lt=[];try{new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__lt.push(e.duration))).observe({type:'longtask',buffered:true})}catch(e){}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
 const c=await ctx.newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:+thr});
 const t0=Date.now();await p.goto('http://localhost:8800'+r,{waitUntil:'load',timeout:90000});const load=Date.now()-t0;await p.waitForTimeout(2500);
 const paint=await p.evaluate(()=>{const o={};document.getAnimations().filter(a=>a.playState==='running').forEach(a=>{const e=a.effect&&a.effect.target;if(!e||!a.effect.getKeyframes)return;const r=e.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||r.width===0)return;
  const props=[...new Set(a.effect.getKeyframes().flatMap(k=>Object.keys(k).filter(x=>!['offset','easing','composite','computedOffset'].includes(x))))].filter(x=>!/^(transform|opacity|translate|rotate|scale)$/.test(x));
  if(props.length){const k=(a.animationName||a.constructor.name)+' '+props.join('/')+' @'+String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).split(' ')[0];o[k]=(o[k]||0)+1}});return o});
 await p.evaluate(()=>{window.__lt=[]});
 const fps=await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;let f=0,worst=0,last=performance.now();const t0=last;let run=true;
  const tick=t=>{f++;worst=Math.max(worst,t-last);last=t;if(run)requestAnimationFrame(tick)};requestAnimationFrame(tick);
  for(let y=0;y<Math.min(H,16000);y+=120){scrollTo(0,y);await new Promise(r=>setTimeout(r,16))}
  await new Promise(r=>setTimeout(r,400));run=false;const dt=performance.now()-t0;return {fps:Math.round(f*1000/dt),worstFrame:Math.round(worst)}});
 const lt=await p.evaluate(()=>window.__lt);
 res[r]={load,...fps,longTasks:lt.length,maxTask:Math.round(Math.max(0,...lt)),paintAnims:paint,errors:errs};
 console.log(r,JSON.stringify(res[r]));await ctx.close()}
fs.writeFileSync(out,JSON.stringify(res,null,1));await b.close()})();
