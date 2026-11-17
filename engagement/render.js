// Usage: node render.js poster | node render.js video
const {chromium}=require('playwright');
const path=require('path');
(async()=>{
 const mode=process.argv[2];
 const b=await chromium.launch();
 const dsf = mode==='poster'?4:2;
 const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:dsf});
 await p.goto('file://'+path.resolve(__dirname,'invite.html'));
 await p.evaluate(()=>document.fonts.ready);
 if(mode==='poster'){
   await p.evaluate(()=>setT(DUR)); await p.waitForTimeout(500);
   await p.screenshot({path:'out/avinash-divya-engagement-invite.png'});
 } else {
   const fps=30, n=12*fps;
   for(let i=0;i<=n;i++){
     await p.evaluate(t=>setT(t),i/fps);
     await p.screenshot({path:`out/frames/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:96});
   }
 }
 await b.close();
})();
