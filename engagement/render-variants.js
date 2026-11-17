// Usage: node render-variants.js <html-file> <name> <poster|video>
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const [,,file,name,mode]=process.argv;
const b=await chromium.launch();const dsf=mode==='poster'?4:2;
const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:dsf});
await p.goto('file://'+path.resolve(__dirname,file));await p.evaluate(()=>document.fonts.ready);
const D=await p.evaluate(()=>window.DUR_V);
if(mode==='poster'){await p.evaluate(d=>setV(d),D);await p.waitForTimeout(400);await p.screenshot({path:`out/${name}-poster.png`});}
else{const dir=`out/frames-${name}`;fs.mkdirSync(dir,{recursive:true});const n=Math.round(D*30);
 for(let i=0;i<=n;i++){await p.evaluate(t=>setV(t),Math.min(D,i/30));await p.screenshot({path:`${dir}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:95});}}
await b.close()})();
