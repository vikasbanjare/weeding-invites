// Shared folk motifs drawn as SVG strings. Coordinates are local; callers position with transforms.
const M = {};
// Rose-ringed parakeet (sua), perched, facing right. ~200 x 260 box, feet at (120,190).
M.parrot = (o={}) => {
  const g=o.green||'#3f8f3a', d=o.dark||'#24622a', beak=o.beak||'#c8322a', ink=o.ink||'#1b1a17', light=o.light||'#8cc35a';
  return `
  <path d="M112 150 C96 190 80 225 58 262 C66 266 74 266 80 262 C98 228 116 196 130 160 Z" fill="${d}"/>
  <path d="M120 152 C112 196 104 230 96 266 C102 268 108 268 112 264 C120 228 128 196 134 160 Z" fill="${g}"/>
  <path d="M120 58 C98 76 92 118 104 150 C112 170 138 176 150 156 C164 128 162 84 150 64 C142 54 128 52 120 58 Z" fill="${g}"/>
  <path d="M124 82 C110 104 110 136 126 162 C142 140 148 108 140 84 C136 76 128 76 124 82 Z" fill="${d}"/>
  <path d="M128 96 C122 112 122 132 128 148 M134 92 C130 110 130 132 134 150" stroke="${light}" stroke-width="2" fill="none" opacity=".7"/>
  <circle cx="140" cy="48" r="28" fill="${g}"/>
  <path d="M120 66 C130 74 150 74 160 64" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M121 70 C132 78 150 78 161 68" stroke="#e86f8a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M160 34 C180 32 196 46 194 64 C193 74 186 82 178 80 C182 70 180 62 170 58 C166 50 164 42 160 34 Z" fill="${beak}"/>
  <path d="M166 58 C172 62 176 68 174 74 C168 72 164 66 162 60 Z" fill="${ink}" opacity=".8"/>
  <circle cx="150" cy="42" r="7" fill="#fff6e0"/><circle cx="151.5" cy="42" r="3.6" fill="${ink}"/>
  <path d="M112 176 L106 194 M124 178 L124 196 M118 180 L114 196" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`;
};
// almond leaf centred at origin, length L
M.leaf=(L=60,fill='#4c8a3a',vein='#e9dcc0')=>`<path d="M0 0 C${L*.3} ${-L*.22} ${L*.7} ${-L*.22} ${L} 0 C${L*.7} ${L*.22} ${L*.3} ${L*.22} 0 0 Z" fill="${fill}"/><path d="M4 0 L${L-6} 0" stroke="${vein}" stroke-width="1.6" opacity=".8"/>`;
// 8-petal folk flower
M.flower=(r=22,fill='#c8322a',core='#f2b53a')=>{let s='';for(let i=0;i<8;i++)s+=`<ellipse cx="0" cy="${-r*.62}" rx="${r*.26}" ry="${r*.5}" fill="${fill}" transform="rotate(${i*45})"/>`;return s+`<circle r="${r*.3}" fill="${core}"/>`};
// kalash (pot) with mouth at y=0, ~ 150 wide
M.kalash=(fill='#b4502b',band='#f0e2c4')=>`
  <path d="M-46 0 H46 L40 18 C78 34 92 70 82 104 C72 140 34 160 0 160 C-34 160 -72 140 -82 104 C-92 70 -78 34 -40 18 Z" fill="${fill}"/>
  <path d="M-80 76 H80 M-84 96 H84" stroke="${band}" stroke-width="5"/>
  <path d="M-78 86 L-66 76 L-54 86 L-42 76 L-30 86 L-18 76 L-6 86 L6 76 L18 86 L30 76 L42 86 L54 76 L66 86 L78 76" stroke="${band}" stroke-width="3" fill="none"/>
  <rect x="-52" y="-10" width="104" height="12" rx="5" fill="${fill}"/>`;
if (typeof module!=='undefined') module.exports=M;
