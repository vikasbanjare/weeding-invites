"""Score for the Pali Temple invitation (8.0 s), cue-locked to the animation timeline.
Tanpura drone + bansuri-style flute (raga Yaman) + temple bells + river ambience + transition FX."""
import sys, numpy as np, make_music as mm
SR=mm.SR; DUR=8.0; N=int(SR*DUR); mm.N=N; mm.DUR=DUR
rng=np.random.default_rng(11)
def flute(f,dur,amp=1.0,vib=.006):
    n=int(dur*SR); t=np.arange(n)/SR
    v=1+vib*np.sin(2*np.pi*5.2*t)*np.clip(t/0.35,0,1)          # vibrato blooms in
    ph=2*np.pi*np.cumsum(f*v)/SR
    s=np.sin(ph)+.32*np.sin(2*ph)+.10*np.sin(3*ph)
    br=rng.normal(size=n); br=np.convolve(br,np.ones(24)/24,'same')*.18   # breath
    e=mm.env(n,.09,min(.35,dur*.4),1.4)
    return (s+br)*e*amp*.5
def tanpura(f,dur):
    n=int(dur*SR); t=np.arange(n)/SR; s=0
    for h,a in ((1,1),(2,.6),(3,.42),(4,.3),(5,.22),(6,.14),(7,.1)):   # jawari buzz = rich upper partials
        s=s+a*np.sin(2*np.pi*f*h*t*(1+.0008*np.sin(t*.7*h)))
    return s/3
def water(dur):
    n=int(dur*SR); x=rng.normal(size=n); y=np.empty(n); z=0.
    for i in range(n): z+=.02*(x[i]-z); y[i]=z
    return y*(1+.5*np.sin(2*np.pi*.4*np.arange(n)/SR))*6
buf=np.zeros((2,N))
Sa=146.83  # D
yaman=[1,9/8,5/4,45/32,3/2,27/16,15/8,2]
# drone swells in with the dusk
for f,g,pan in ((Sa/2,.30,-.3),(Sa*3/4,.22,.3),(Sa,.18,-.1)):
    mm.place(buf,tanpura(f,DUR)*mm.env(N,1.6,1.2,1.5),0,g,pan)
mm.place(buf,water(DUR)*mm.env(N,2.5,1,1),0,.10)
# linework drawing: rising shimmer + soft plucked ascent (0.2 - 2.4)
mm.place(buf,mm.riser(2.3)*1.0,0.1,.35)
for k,(tt,deg) in enumerate([(0.35,0),(0.65,2),(0.95,3),(1.25,4),(1.55,6),(1.85,7)]):
    mm.place(buf,mm.pluck(Sa*2*yaman[deg],1.4,.9975,.6)*.6,tt,.32,-.4+k*.16)
mm.place(buf,mm.sparkle(2.0,18),0.4,.35,.2)
# stone fills + dusk glow: low swell
mm.place(buf,mm.whoosh(1.8,1,180,2200),1.4,.35,0)
# sanctum lamp ignites: temple bell + sub
mm.place(buf,mm.bell(Sa*4,3.4),3.0,.65,.15); mm.place(buf,mm.sub(),3.02,.55)
# diyas float out: tiny chimes
for i in range(11): mm.place(buf,mm.tin(1400+180*(i%5))*.5,3.35+i*.13,.22,np.sin(i)*.6)
# names: whoosh + flute phrase (Yaman: Ni Re Ga Ma# Pa ... Sa)
mm.place(buf,mm.whoosh(1.0,1,400,6500),3.95,.4,-.3); mm.place(buf,mm.whoosh(1.0,1,400,6500),4.6,.4,.3)
phrase=[(4.05,6,-1,.45),(4.35,1,0,.35),(4.6,2,0,.5),(4.95,3,0,.45),(5.3,4,0,.7),(6.0,2,0,.4),(6.35,1,0,.35),(6.7,7,0,1.25)]
for tt,deg,octv,d in phrase: mm.place(buf,flute(Sa*2*yaman[deg]*2**octv,d+.25),tt,.55,.05)
mm.place(buf,mm.bell(Sa*8,2.6),4.1,.35,-.2); mm.place(buf,mm.bell(Sa*6,2.6),4.75,.35,.2)
# details reveal + gold shimmer, resolve on Sa
mm.place(buf,mm.dha(),5.85,.6); mm.place(buf,mm.sparkle(1.8,16),6.0,.5,0)
for r,g in ((1,.16),(5/4,.10),(3/2,.12),(2,.10)):
    mm.place(buf,mm.pad(Sa*2*r,DUR-6.2)*mm.env(int((DUR-6.2)*SR),.4,.8,1.4),6.2,g)
mm.place(buf,mm.bell(Sa*4,2.0),6.7,.4)
buf=mm.reverb(buf,.34,2.6)
buf*=mm.env(N,.04,.6,1.0); buf/=np.abs(buf).max()/.9
mm.save(sys.argv[1],buf); print('ok')
