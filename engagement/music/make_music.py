"""Synthesises three short (7.5s) Indian-inspired cinematic cues: drone pad, sitar-like plucks,
soft tabla hits, bell and riser. Pure numpy, no samples. Usage: python3 make_music.py <outdir>"""
import sys, wave, numpy as np
SR=48000; DUR=7.5; N=int(SR*DUR)
rng=np.random.default_rng(7)

def env(n,a,r,curve=2.0):
    e=np.ones(n); na=max(1,int(a*SR)); nr=max(1,int(r*SR))
    e[:na]=np.linspace(0,1,na)**curve; e[-nr:]*=np.linspace(1,0,nr)**curve; return e
def place(buf,sig,t0,gain=1.0,pan=0.0):
    i=int(t0*SR); j=min(N,i+len(sig))
    if i>=N: return
    s=sig[:j-i]*gain
    buf[0,i:j]+=s*(1-max(0,pan)); buf[1,i:j]+=s*(1+min(0,pan))
def pluck(f,dur=1.6,decay=.9965,bright=.5):
    n=int(dur*SR); L=int(SR/f); b=rng.uniform(-1,1,L)
    b=np.convolve(b,[.5,.5],'same')*bright+b*(1-bright)
    out=np.empty(n)
    for k in range(n):
        out[k]=b[k%L]; b[k%L]=decay*.5*(b[k%L]+b[(k+1)%L])
    # sitar-like buzz: soft clip + a touch of 2nd harmonic
    out=np.tanh(out*2.2); return out*np.linspace(1,0,n)**.6
def pad(f,dur,detune=(0,.004,-.004)):
    t=np.arange(int(dur*SR))/SR; s=0
    for d in detune:
        ff=f*(1+d)
        for h,a in ((1,1),(2,.45),(3,.25),(4,.12)): s=s+a*np.sin(2*np.pi*ff*h*t+rng.uniform(0,6.28))
    return s/ (len(detune)*1.8)
def dha(): # soft tabla bass hit
    n=int(.55*SR); t=np.arange(n)/SR; f=95+60*np.exp(-t*28)
    s=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*7)
    s+=.25*rng.uniform(-1,1,n)*np.exp(-t*90); return s
def tin(f=520):
    n=int(.28*SR); t=np.arange(n)/SR
    return (np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*f*2.3*t))*np.exp(-t*22)*.6
def bell(f,dur=3.0):
    n=int(dur*SR); t=np.arange(n)/SR; s=0
    for r,a,d in ((1,1,1.4),(2.76,.5,2.2),(5.4,.28,3.2),(8.93,.14,4.5)): s=s+a*np.sin(2*np.pi*f*r*t)*np.exp(-t*d)
    return s*.45
def riser(dur):
    n=int(dur*SR); x=rng.uniform(-1,1,n); x=np.diff(x,prepend=0)  # brighter noise
    return x*(np.linspace(0,1,n)**2.5)*.25

def whoosh(dur=1.0,peak=.5,f0=300,f1=5000):
    n=int(dur*SR); x=rng.uniform(-1,1,n); y=np.empty(n); z=0.0
    for i in range(n):
        p=i/n; f=f0+(f1-f0)*np.sin(np.pi*p)   # cutoff rises then falls
        a=1-np.exp(-2*np.pi*f/SR); z+=a*(x[i]-z); y[i]=z
    e=np.sin(np.pi*np.linspace(0,1,n)**peak*1.0)**2
    return y*e*2.2
def sparkle(dur=1.2,k=14):
    n=int(dur*SR); out=np.zeros(n)
    for _ in range(k):
        t0=int(rng.uniform(0,dur*.85)*SR); f=rng.choice([2093,2637,3136,3951,4699]); m=int(.35*SR); t=np.arange(m)/SR
        ping=np.sin(2*np.pi*f*t)*np.exp(-t*14)*rng.uniform(.25,.7)
        j=min(n,t0+m); out[t0:j]+=ping[:j-t0]
    return out*.5
def sub(): 
    n=int(.7*SR); t=np.arange(n)/SR; return np.sin(2*np.pi*(52+30*np.exp(-t*18))*t)*np.exp(-t*5)
SFX={'A':dict(arch=.15,names=[2.0,3.35],date=4.85,sweep=5.7),
     'B':dict(arch=.1,names=[1.75,2.95],date=4.25,sweep=5.55,extra=[3.65]),
     'C':dict(arch=.15,names=[1.95,2.95],date=4.35,sweep=5.75)}
def add_sfx(buf,key):
    c=SFX[key]
    place(buf,whoosh(1.5,1,250,3500),c['arch'],.55,-.2)
    for i,t in enumerate(c['names']):
        place(buf,whoosh(.9,1,400,6000),t-.1,.5,-.3+.6*i); place(buf,sub(),t+.25,.7)
    for t in c.get('extra',[]): place(buf,whoosh(.8,1,500,7000),t,.4,.2)
    place(buf,whoosh(.7,1,500,5500),c['date']-.1,.4,.3)
    place(buf,whoosh(1.5,1,800,9000),c['sweep']-.3,.45,0)
    place(buf,sparkle(1.6),c['sweep'],.8,.1); place(buf,sparkle(1.2,8),c['date']+.3,.5,-.2)

def reverb(buf,wet=.3,length=2.2):
    n=int(length*SR); ir=rng.normal(size=n)*np.exp(-np.arange(n)/SR*2.6); ir[:int(.012*SR)]*=.2
    out=np.empty_like(buf)
    for c in range(2):
        L=N+n; X=np.fft.rfft(buf[c],L); H=np.fft.rfft(np.roll(ir,c*37),L)
        out[c]=np.fft.irfft(X*H,L)[:N]
    out/= (np.abs(out).max()+1e-9)/(np.abs(buf).max()+1e-9)
    return buf*(1-wet*.5)+out*wet

def render(name,root,scale,phrase,hits,bell_t,bell_f,chord_t,tempo_tins):
    buf=np.zeros((2,N))
    # drone: Sa + Pa swelling in, fading before the end
    for f,g in ((root,.5),(root*1.5,.32),(root*2,.22)):
        p=pad(f,DUR)*env(int(DUR*SR),2.2,1.4,1.6); place(buf,p,0,g)
    place(buf,riser(2.1),0,.55)
    for t in hits: place(buf,dha(),t,.9,-.1)
    for t in tempo_tins: place(buf,tin(),t,.35,.25)
    for (t,deg,oct_,amp) in phrase:
        f=root*2*scale[deg]*2**oct_; place(buf,pluck(f),t,amp,np.sin(t)*.35)
    for t in bell_t: place(buf,bell(bell_f),t,.55,.1)
    # resolving chord (Sa-Ga-Pa-Sa') pad swell + bell
    for k,r in enumerate((1,scale[2],1.5,2)):
        d=pad(root*2*r,DUR-chord_t)*env(int((DUR-chord_t)*SR),.35,1.0,1.4); place(buf,d,chord_t,.16)
    add_sfx(buf,name)
    buf=reverb(buf,.30)
    buf*= env(N,.05,.7,1.0)   # master fade in/out
    buf/= np.abs(buf).max()/.88
    return buf
def save(path,buf):
    d=(np.clip(buf.T,-1,1)*32767).astype('<i2')
    with wave.open(path,'wb') as w: w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(d.tobytes())

if __name__=='__main__':
    out=sys.argv[1]
    bhoop=[1,9/8,5/4,3/2,5/3,2]; yaman=[1,9/8,5/4,45/32,3/2,27/16,15/8]
    # A  "Dusk Arch": D, Bhoop, unhurried sitar phrase
    save(f'{out}/music-A.wav',render('A',146.83,bhoop,
      [(2.05,0,0,.9),(2.35,2,0,.6),(2.65,3,0,.7),(3.0,4,0,.6),(3.4,5,0,.9),(3.8,4,0,.55),(4.15,3,0,.6),(4.5,2,0,.7),(4.9,3,0,.6),(5.35,5,0,.85),(5.9,5,0,.8)],
      [2.05,3.4,5.35],[5.35],587.3,5.7,[2.8,4.1,4.9]))
    # B  "Emerald Medallion": C, Yaman, slower & deeper with long bell
    save(f'{out}/music-B.wav',render('B',130.81,yaman,
      [(1.9,0,0,.9),(2.3,2,0,.6),(2.7,3,0,.6),(3.1,4,0,.7),(3.6,6,0,.8),(4.1,4,0,.55),(4.5,3,0,.6),(4.95,2,0,.6),(5.4,4,0,.7),(5.85,0,1,.8)],
      [1.9,3.6,5.4],[4.9,5.85],523.25,5.6,[2.9,4.3]))
    # C  "Ivory Marigold": F, lighter and more rhythmic (tin pulses), brighter bell
    save(f'{out}/music-C.wav',render('C',174.61,bhoop,
      [(1.6,0,0,.8),(1.9,2,0,.6),(2.2,4,0,.6),(2.5,5,0,.8),(2.9,4,0,.55),(3.2,3,0,.6),(3.6,2,0,.55),(4.0,3,0,.6),(4.4,5,0,.8),(4.8,5,1,.7),(5.3,3,1,.7),(5.9,5,1,.8)],
      [1.6,2.5,3.6,4.8],[2.5,4.8,5.9],784,5.5,[1.9,2.2,2.9,3.2,4.0,4.4,5.3]))
    print('ok')

