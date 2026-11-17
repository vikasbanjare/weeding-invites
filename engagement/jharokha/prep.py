"""Split the lake-palace plate into light layers:
A ambient (lamps off), D window/lantern light (+reflections), T facade uplight (+reflection), W leftover warmth,
order = when each window lights (outward from the central pavilion, mirrored for reflections), phase = flicker."""
import numpy as np, base64, io, json
from PIL import Image, ImageFilter
im=np.asarray(Image.open('plates/r2-1080.png').convert('RGB')).astype(np.float32)/255
H,W,_=im.shape; R,G,B=im[...,0],im[...,1],im[...,2]
lum=.299*R+.587*G+.114*B; warm=R-B
def ss(x,a,b): k=np.clip((x-a)/(b-a),0,1); return k*k*(3-2*k)
toimg=lambda a: Image.fromarray((np.clip(a,0,1)*255).astype(np.uint8))
blur=lambda a,r: np.asarray(toimg(a).filter(ImageFilter.GaussianBlur(r))).astype(np.float32)/255
yy,xx=np.mgrid[0:H,0:W]
WL=1162                                   # waterline (1080x1920 coords)
# windows / lanterns: warm and bright
g=np.maximum(ss(lum,.30,.62)*ss(warm,.06,.26), ss(lum,.55,.8)*ss(yy,560,600))
gm=np.maximum(g,blur(np.asarray(toimg(g).filter(ImageFilter.MaxFilter(5))).astype(np.float32)/255,2.2))
# reflections spread light: widen the mask below the waterline
gw=np.asarray(toimg(np.maximum(g,ss(lum,.16,.4)*ss(warm,.03,.15))).filter(ImageFilter.MaxFilter(15))).astype(np.float32)/255
gw=np.clip(blur(gw,7)*1.3,0,1)
gm=np.where(yy>WL+6,np.maximum(gm,gw),gm)
water=ss(yy,WL,WL+14)
# facade: warm stone in the palace band and its reflection
pal=ss(yy,560,600)*ss(-yy,-1700,-1600)
fac=pal*ss(warm,-.01,.07)*(1-gm)
fac=blur(fac,1.5)
lampless=im*(1-.94*gm[...,None])
amb=lampless*(1-fac[...,None])+(im*.30)*fac[...,None]
amb=amb*(1-water[...,None])+(im*.24)*water[...,None]          # unlit reflection: uniformly dim, no holes
halo=np.clip(np.maximum(blur(np.asarray(toimg(gm).filter(ImageFilter.MaxFilter(9))).astype(np.float32)/255,10)*1.5,gm),0,1)*(1-fac)
ground=ss(yy,560,640)
amb=amb*(1+ground[...,None]*(np.array([.80,.88,1.10])-1))
diff=im-amb
D=np.clip(diff*halo[...,None],0,1); T=np.clip(diff*fac[...,None],0,1); Wl=np.clip(diff*(1-halo-fac)[...,None],0,1)
# order: outward from the central pavilion; reflections mirror about the waterline
ym=np.where(yy>WL,2*WL-yy,yy)
d=np.sqrt(((xx-540)/1.0)**2+((ym-760)*1.35)**2)
rng=np.random.default_rng(9)
nz=blur(rng.random((H,W)),6); nz=(nz-nz.mean())/(nz.std()+1e-6)
order=np.clip(d/700*.92+.03+nz*.03,0,1)
phase=blur(rng.random((H,W)),4); phase=(phase-phase.min())/(phase.max()-phase.min()+1e-6)
out={}
for k,a in (('A',amb),('D',D),('T',T),('W',Wl),('order',order),('phase',phase)):
    img=toimg(a); b=io.BytesIO(); img.save(b,'PNG'); out[k]='data:image/png;base64,'+base64.b64encode(b.getvalue()).decode(); img.save(f'plates/layer-{k}.png')
open('layers.js','w').write('window.LAYERS='+json.dumps(out)+';')
rec=amb+D+T+Wl; print('recon mean err %.4f'%np.abs(rec-im).mean())
