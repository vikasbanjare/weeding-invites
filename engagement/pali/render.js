// node render.js frames <worker> <workers>   -> 90fps sub-frames (for motion blur), 2160x3840
// node render.js poster                      -> 4320x7680 final still
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const [,,mode,wk='0',nw='1',st='0']=process.argv;
 const b=await chromium.launch();const dsf=mode==='poster'?4:2;
 const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:dsf});
 await p.goto('file://'+path.resolve(__dirname,'pali.html'));await p.evaluate(()=>document.fonts.ready);
 const D=await p.evaluate(()=>window.DUR_V);
 if(mode==='poster'){await p.evaluate(d=>setV(d),D);await p.waitForTimeout(500);fs.mkdirSync('out',{recursive:true});await p.screenshot({path:'out/pali-poster-4320x7680.png'});}
 else{const dir='out/sub';fs.mkdirSync(dir,{recursive:true});const fps=90,n=Math.round(D*fps);
  for(let i=+st+ +wk;i<=n;i+=+nw){await p.evaluate(t=>setV(t),Math.min(D,i/fps));
   await p.screenshot({path:`${dir}/s${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:94});}}
 await b.close()})();
