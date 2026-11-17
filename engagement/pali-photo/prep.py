"""Split the photoreal plate into animatable light layers.
A = ambient (lamps off), D = diya light, T = temple uplight, order = when each lamp lights, phase = flicker phase."""
import numpy as np, base64, io, json
from PIL import Image, ImageFilter
im=np.asarray(Image.open('plates/v1-1080.png').convert('RGB')).astype(np.float32)/255
H,W,_=im.shape
R,G,B=im[...,0],im[...,1],im[...,2]
lum=.299*R+.587*G+.114*B; warm=R-B
ss=lambda x,a,b: np.clip((x-a)/(b-a),0,1)**2*(3-2*np.clip((x-a)/(b-a),0,1))
toimg=lambda a: Image.fromarray((np.clip(a,0,1)*255).astype(np.uint8))
# lamp glow: warm + bright, grown to cover halos
g=ss(lum,.22,.6)*ss(warm,.04,.22)
gm=np.asarray(toimg(g).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(2.5))).astype(np.float32)/255
gm=np.maximum(gm,g)
# temple: actual silhouette (warm stone vs blue sky) inside a generous box, plus its reflection
yy,xx=np.mgrid[0:H,0:W]
def box(x0,x1,y0,y1,f): return ss(xx,x0-f,x0+f)*ss(-xx,-x1-f,-x1+f)*ss(yy,y0-f,y0+f)*ss(-yy,-y1-f,-y1+f)
stoneSel=ss(R-B,-.03,.05)
tm=box(500,900,380,1090,20)*stoneSel
tm=np.asarray(toimg(tm).filter(ImageFilter.GaussianBlur(2))).astype(np.float32)/255
tref=box(500,900,1120,1640,40)*ss(R-B,-.02,.06)*(1-gm)
tm=np.maximum(tm,tref*(1-gm))
# lamps off; temple uplight pulled down
lampless=im*(1-.93*gm[...,None])
amb=lampless*(1-tm[...,None])+(im*.28)*tm[...,None]
# halo: the lamps' broad light on the steps/water, follows the same wave as the lamps
halo=np.asarray(toimg(gm).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(14))).astype(np.float32)/255
halo=np.clip(np.maximum(halo*1.6,gm),0,1)*(1-tm)
# blue-hour cooling below the horizon only (the sky stays untouched)
ground=ss(yy,640,760)
cool=1+ground[...,None]*(np.array([.78,.87,1.10])-1)
ambC=amb*cool
diff=im-ambC
D=np.clip(diff*halo[...,None],0,1)
T=np.clip(diff*tm[...,None],0,1)
Wpos=np.clip(diff*(1-halo-tm)[...,None],0,1)          # leftover warmth, faded globally
amb=ambC
# order: lamps light left->right along the ghat (and the reflections with them), hand-lit irregularity
rng=np.random.default_rng(4)
yy,xx=np.mgrid[0:H,0:W]
nz=np.asarray(toimg(rng.random((H,W))).filter(ImageFilter.GaussianBlur(7))).astype(np.float32)/255
nz=(nz-nz.mean())/(nz.std()+1e-6)
order=np.clip(xx/W*.86+.04+nz*.035+(yy<1000)*((1000-yy)/600)*.04,0,1)
phase=np.asarray(toimg(rng.random((H,W))).filter(ImageFilter.GaussianBlur(4))).astype(np.float32)/255
phase=(phase-phase.min())/(phase.max()-phase.min()+1e-6)
out={}
for k,a in (('A',amb),('D',D),('T',T),('W',Wpos),('order',order),('phase',phase)):
    img=toimg(a); buf=io.BytesIO(); img.save(buf,'PNG'); out[k]='data:image/png;base64,'+base64.b64encode(buf.getvalue()).decode()
    img.save(f'plates/layer-{k}.png')
open('layers.js','w').write('window.LAYERS='+json.dumps(out)+';')
print('ok',H,W, 'glow px %.1f%%'%(100*(gm>.3).mean()))
