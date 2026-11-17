// node render.js frames <worker> <workers> [startFrame]  -> 90fps sub-frames for motion blur (1080x1920)
// node render.js still <t> <out.png> [dsf]
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const [,,mode,a='0',b='1',c='0']=process.argv;
 const dsf=mode==='still'?(+c||1):1;
 const br=await chromium.launch();const p=await br.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:dsf});
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+path.resolve(__dirname,'index.html'));await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>window.ready);
 if(mode==='still'){const t0=Date.now();await p.evaluate(t=>setV(t),+a);await p.waitForTimeout(150);await p.screenshot({path:b});console.log('ms',Date.now()-t0);}
 else{const dir='out/sub';fs.mkdirSync(dir,{recursive:true});const D=await p.evaluate(()=>window.DUR_V),fps=90,n=Math.round(D*fps);
  for(let i=+c+ +a;i<=n;i+=+b){await p.evaluate(t=>setV(t),Math.min(D,i/fps));await p.screenshot({path:`${dir}/s${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:95});}}
 await br.close()})();
