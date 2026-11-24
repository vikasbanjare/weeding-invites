"""Cut illustrated elements out of their flat backgrounds.
Background = pixels close to the corner colour AND connected to the image border (flood fill),
so same-colour areas inside a figure (e.g. a pink angrakha) are kept. Colours are un-mixed at the edges."""
import numpy as np, sys
from PIL import Image, ImageDraw, ImageFilter
def cut(src,dst,thr=34,crop=None,mode='connected'):
    im=Image.open(src).convert('RGB')
    if crop: im=im.crop(crop)
    a=np.asarray(im).astype(np.float32)
    H,W,_=a.shape
    corners=np.concatenate([a[:8,:8].reshape(-1,3),a[:8,-8:].reshape(-1,3),a[-8:,:8].reshape(-1,3),a[-8:,-8:].reshape(-1,3)])
    bg=np.median(corners,0)
    d=np.sqrt(((a-bg)**2).sum(-1))
    d=np.asarray(Image.fromarray(np.clip(d,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6))).astype(np.float32)
    cand=Image.fromarray(((d<thr)*255).astype(np.uint8)).copy()
    for x in range(0,W,max(1,W//40)):
        for y in (0,H-1):
            if cand.getpixel((x,y))==255: ImageDraw.floodfill(cand,(x,y),128)
    for y in range(0,H,max(1,H//40)):
        for x in (0,W-1):
            if cand.getpixel((x,y))==255: ImageDraw.floodfill(cand,(x,y),128)
    bgm=(np.asarray(cand)==128)
    if mode=='global': bgm=bgm|(np.asarray(cand)==255)
    # soft alpha: distance-based ramp near the background, hard inside the figure
    soft=np.clip((d-thr*.45)/(thr*1.1),0,1)
    alpha=np.where(bgm,0.0,1.0)
    edge=np.asarray(Image.fromarray((bgm*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))).astype(bool)
    alpha=np.where(edge&~bgm,np.maximum(soft,.0),alpha)
    alpha=np.where(bgm,soft*(soft>.6),alpha)
    alpha=np.asarray(Image.fromarray((alpha*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.6))).astype(np.float32)/255
    # un-mix the background colour from semi-transparent edge pixels
    al=np.clip(alpha,1e-3,1)[...,None]
    col=np.clip((a-bg*(1-al))/al,0,255)
    out=np.dstack([col,alpha*255]).astype(np.uint8)
    img=Image.fromarray(out,'RGBA'); bb=Image.fromarray(((out[...,3]>140)*255).astype(np.uint8)).getbbox(); img=img.crop(bb); img.save(dst)
    print(dst,img.size,'bg',bg.round())
cut('assets/palace1.png','cut/palace.png',40)
cut('assets/palace2.png','cut/palace2.png',30)
cut('assets/tree.png','cut/tree.png',30,mode='global')
cut('assets/herald.png','cut/herald.png',26)
cut('assets/peacock.png','cut/peacock.png',30)
cut('assets/crane.png','cut/crane.png',30)
cut('assets/banana.png','cut/banana.png',30)
cut('assets/lotus.png','cut/lotus.png',30)
