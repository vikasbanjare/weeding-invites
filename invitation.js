/* Art direction is independent of invitation data: every design uses the same reliable editor. */
const designParams = new URLSearchParams(location.search);
const selectedDesign = window.invitationCatalog.find(item => item.id === designParams.get('design')) || window.invitationCatalog[0];
const designNumber = Number(selectedDesign.id.slice(-2));
const designDirections = [
 ['royal','royal','palace','A love written in the stars.','arches'],
 ['courtyard','royal','pavilion','Under a sky of sandstone and gold.','columns'],
 ['museum','chettinad','royal','A window into our next chapter.','gallery'],
 ['courtyard','chettinad','garden','Morning light. Familiar faces. A new beginning.','columns'],
 ['ribbon','pavilion','royal','Woven together, for a lifetime.','cards'],
 ['nocturne','palace','moonlit','An evening touched by gold.','timeline'],
 ['sculpture','geometry','modern','Rooted in earth. Open to forever.','columns'],
 ['paper','pavilion','chettinad','With our families, with all our hearts.','letters'],
 ['museum','royal','palace','A timeless beginning, in ivory.','gallery'],
 ['royal','pavilion','moonlit','A celebration in jewel tones.','arches'],
 ['sculpture','modern','geometry','A beautiful shape of things to come.','columns'],
 ['editorial','chettinad','modern','The next issue of our lives.','editorial'],
 ['editorial','pavilion','geometry','Two lives. One extraordinary line.','columns'],
 ['nocturne','moonlit','modern','For the love of a great night.','editorial'],
 ['sculpture','geometry','modern','Every little piece belongs together.','cards'],
 ['sculpture','modern','geometry','A new rhythm. Ours.','timeline'],
 ['editorial','chettinad','royal','A simple note. An infinite promise.','letters'],
 ['paper','geometry','royal','Nothing more. Everything we need.','editorial'],
 ['sculpture','geometry','modern','Made of joy, colour and possibility.','cards'],
 ['nocturne','moonlit','palace','Stay for the afterglow.','timeline'],
 ['botanical','garden','botanical','Where our forever takes root.','arches'],
 ['paper','marigold','garden','A little poetry. A thousand marigolds.','letters'],
 ['botanical','botanical','garden','The sweetest beginnings bloom quietly.','cards'],
 ['botanical','garden','botanical','Wildly, joyfully, together.','gallery'],
 ['ribbon','botanical','marigold','Some moments are worth pressing between pages.','letters'],
 ['botanical','marigold','garden','A celebration in full colour.','columns'],
 ['botanical','garden','chettinad','Meet us in the morning light.','arches'],
 ['editorial','botanical','desert','Grounded in love. Growing together.','editorial'],
 ['ribbon','marigold','garden','Softly, surely, forever.','cards'],
 ['botanical','botanical','garden','A love that grows a little wilder.','timeline'],
 ['paper','chettinad','royal','A keepsake for the beginning of everything.','letters'],
 ['paper','marigold','garden','Beautiful things have imperfect edges.','cards'],
 ['ribbon','modern','garden','One story, seen through another.','gallery'],
 ['paper','chettinad','palace','An impression that lasts.','letters'],
 ['nocturne','pavilion','royal','A small glimmer. A grand occasion.','arches'],
 ['paper','desert','chettinad','Warm hands. Open hearts.','editorial'],
 ['ribbon','marigold','modern','Tied together, from this day forward.','cards'],
 ['royal','pavilion','palace','Our initials. Our beginning.','columns'],
 ['paper','marigold','botanical','Let the colours tell our story.','gallery'],
 ['sculpture','geometry','royal','An opening into something wonderful.','arches'],
 ['royal','palace','royal','In the heart of Rajasthan, a new story begins.','timeline'],
 ['nocturne','moonlit','palace','Meet us beneath a thousand lights.','arches'],
 ['courtyard','chettinad','royal','A courtyard full of people we love.','columns'],
 ['botanical','garden','botanical','Let it rain. Let love bloom.','timeline'],
 ['landscape','desert','royal','As endless as the desert sky.','gallery'],
 ['landscape','coast','garden','A new day. An open horizon.','editorial'],
 ['nocturne','modern','moonlit','The city glows a little brighter tonight.','cards'],
 ['landscape','mountain','botanical','Some love stories move mountains.','columns'],
 ['museum','royal','chettinad','A collection of moments. A lifetime together.','gallery'],
 ['nocturne','moonlit','pavilion','In the blue between day and forever.','timeline']
];
const sceneFiles = {royal:'royal-palace.webp',palace:'palace-courtyard.webp',moonlit:'moonlit-mehfil.webp',garden:'botanical-mandap.webp',chettinad:'chettinad-courtyard.webp',modern:'modern-arches.webp',marigold:'paper-marigold.webp',pavilion:'scenes/pavilion.svg',botanical:'scenes/botanical.svg',geometry:'scenes/geometry.svg',desert:'scenes/desert.svg',coast:'scenes/coast.svg',mountain:'scenes/mountain.svg'};
const palettes = {plum:['#321f2b','#ead0a6','#eee2d9','#432938'],ochre:['#4c3825','#edc082','#f0e3c9','#79552d'],ivory:['#32382f','#d4c298','#f3eee2','#5b654c'],sand:['#453b2e','#ddbb8b','#eee2d1','#736248'],night:['#101e2d','#d5c3a0','#e9e4db','#233a50'],clay:['#492e28','#e7b491','#f0d9c7','#a05842'],blue:['#152d47','#bcd9de','#e6eded','#32546d'],rose:['#4c3039','#e8c6b2','#f1dfe0','#9c6270'],sage:['#253f36','#d3dbb7','#e6e9d9','#697e59'],forest:['#142f2b','#c1cea3','#e3e7d9','#42655a']};
const [family,scene,detailScene,tagline,eventLayout]=designDirections[designNumber-1];
const colors=palettes[selectedDesign.tone];
const design = window.INVITATION_DESIGN = {...selectedDesign,number:designNumber,family,scene,background:`assets/${sceneFiles[scene]}`,detail:`assets/${sceneFiles[detailScene]}`,colors,tagline,eventLayout,embedded:designParams.get('embed')==='1',couple:[1,6,10,41].includes(designNumber)};
document.body.dataset.family=family;
document.body.dataset.embed=String(design.embedded);
document.body.dataset.layout=selectedDesign.layout;
document.body.dataset.finish=selectedDesign.finish;
document.body.dataset.events=eventLayout;
document.body.dataset.design=selectedDesign.id;
document.body.dataset.motion=matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on';
for(const [key,value] of Object.entries({'--night':colors[0],'--gold':colors[1],'--gold-light':colors[1],'--cream':colors[2],'--cream-deep':colors[2],'--ink':colors[0],'--design-accent':colors[3],'--scene-image':`url("${design.background}")`,'--detail-image':`url("${design.detail}")`,'--design-angle':`${(designNumber%5-2)*3}deg`})) document.documentElement.style.setProperty(key,value);
document.querySelector('.nav-monogram span').textContent=selectedDesign.name;
document.querySelector('.nav-monogram').setAttribute('aria-label',`${selectedDesign.name}, back to top`);
document.querySelector('.hero-heading p').textContent=tagline;
document.querySelector('.scene-index').textContent=String(designNumber).padStart(2,'0');
document.querySelector('.hero-couple').hidden=!design.couple;
if(design.couple)document.querySelector('.hero-couple').src='assets/palace-couple.webp';
document.querySelector('.palace-footer>span').textContent=`${selectedDesign.name.toUpperCase()} · INVITATION STUDIO`;
document.querySelector('.palace-footer>a').textContent='EXPLORE ALL 50 DESIGNS →';
document.querySelector('.story-section .chapter-label span:last-child').textContent=selectedDesign.collection.toUpperCase()+' / '+selectedDesign.name.toUpperCase();
document.querySelector('.venue-art span').textContent='THE PLACE WE COME TOGETHER';
const storyHeadings={royal:'A celebration worthy of <em>our forever.</em>',courtyard:'Come home to <em>our happiness.</em>',museum:'The most beautiful exhibit: <em>a life together.</em>',ribbon:'Two stories. <em>Beautifully intertwined.</em>',paper:'A little note, <em>with all our love.</em>',sculpture:'Together, we make <em>something new.</em>',editorial:'A new chapter. <em>Written together.</em>',botanical:'With love, <em>we bloom.</em>',nocturne:'The night is young. <em>Our story is forever.</em>',landscape:'Wherever life takes us, <em>together.</em>'};
document.getElementById('story-title').innerHTML=storyHeadings[family];
document.querySelector('.story-lead').innerHTML='<span data-families></span> joyfully invite you to celebrate the wedding of <span data-name-one></span> and <span data-name-two></span>. Join us for the people, places and little moments that make a lifetime.';
document.querySelector('.story-window-caption').textContent=selectedDesign.name.toUpperCase();
document.getElementById('next-invitation').href=`invitation.html?design=design-${String(designNumber%50+1).padStart(2,'0')}&v=20261019`;
const particles=document.querySelector('.scene-particles');
for(let i=0;i<14;i++){const dot=document.createElement('i');dot.style.cssText=`--x:${(i*31+7)%100}%;--y:${(i*47+13)%100}%;--delay:${-i*.9}s;--duration:${9+i%5}s`;particles.append(dot);}

// A deliberately opt-in film-like tour; manual scrolling always takes control.
const tourSections=['beginning','story','celebrations','visit','keepsake'];
let playing=false,playFrame=0,tourStarted=0,tourStartProgress=0;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const playButton=document.getElementById('play-story');
const depthButton=document.getElementById('toggle-depth');
function setPlaying(active){
 playing=active;document.body.classList.toggle('is-playing',active);
 playButton.setAttribute('aria-pressed',String(active));playButton.innerHTML=active?'Pause story':'▷ Play the story';
 document.getElementById('playback-status').textContent=active?'Playing the invitation. Scroll or press Escape to pause.':'Story paused. You can explore at your own pace.';
 if(!active)cancelAnimationFrame(playFrame);
}
function scrollProgress(){return Math.min(1,Math.max(0,scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)));}
function playTour(now){
 if(!playing)return;
 const progress=Math.min(1,tourStartProgress+(now-tourStarted)/(document.body.dataset.motion==='on'?65000:20000));
 const total=document.documentElement.scrollHeight-innerHeight;
 if(document.body.dataset.motion==='on') window.scrollTo({top:progress*total,behavior:'instant'});
 else {const section=tourSections[Math.min(4,Math.floor(progress*5))];document.getElementById(section).scrollIntoView({behavior:'instant'});}
 document.getElementById('cinema-progress').style.width=`${progress*100}%`;
 if(progress>=1){setPlaying(false);document.getElementById('playback-status').textContent='The story is complete. Download a keepsake or replay.';}else playFrame=requestAnimationFrame(playTour);
}
playButton.addEventListener('click',()=>{if(playing){setPlaying(false);return;}tourStartProgress=scrollProgress()>.97?0:scrollProgress();tourStarted=performance.now();setPlaying(true);playFrame=requestAnimationFrame(playTour);});
for(const name of ['wheel','touchstart'])window.addEventListener(name,event=>{
 if(name==='touchstart' && event.target.closest?.('button,a,input,select,textarea'))return;
 if(playing)setPlaying(false);
},{passive:true});
window.addEventListener('keydown',event=>{
 if(event.key!=='Escape' && event.target.closest?.('button,a,input,select,textarea'))return;
 if(['Escape','ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)&&playing)setPlaying(false);
});
document.addEventListener('click',event=>{if(playing && event.target.closest?.('a'))setPlaying(false);});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)setPlaying(false);});
document.getElementById('open-editor').addEventListener('click',()=>setPlaying(false));
document.getElementById('jump-chapter').addEventListener('change',event=>{setPlaying(false);document.getElementById(event.target.value).scrollIntoView({behavior:document.body.dataset.motion==='on'?'smooth':'instant'});});
function updateMotionButton(){depthButton.setAttribute('aria-pressed',String(document.body.dataset.motion==='on'));depthButton.textContent=document.body.dataset.motion==='on'?'Motion on':'Motion off';}
depthButton.addEventListener('click',()=>{document.body.dataset.motion=document.body.dataset.motion==='on'?'off':'on';updateMotionButton();});
reducedMotion.addEventListener('change',event=>{document.body.dataset.motion=event.matches?'off':'on';updateMotionButton();});updateMotionButton();
let depthQueued=false;
function updateScene(){
 depthQueued=false;
 if(!playing)document.getElementById('cinema-progress').style.width=`${scrollProgress()*100}%`;
 let current='beginning';for(const id of tourSections)if(document.getElementById(id).getBoundingClientRect().top<innerHeight*.45)current=id;
 if(document.activeElement!==document.getElementById('jump-chapter'))document.getElementById('jump-chapter').value=current;
 if(document.body.dataset.motion==='off')return;
 document.documentElement.style.setProperty('--scene-scroll',`${Math.min(scrollY*.12,180)}px`);
 document.querySelectorAll('.event-card').forEach((card,index)=>{const rect=card.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const amount=Math.max(-1,Math.min(1,(rect.top-innerHeight*.4)/innerHeight));card.style.setProperty('--card-turn',`${amount*(index%2?-3:3)}deg`);});
}
window.addEventListener('scroll',()=>{if(!depthQueued){depthQueued=true;requestAnimationFrame(updateScene);}},{passive:true});
let entranceTimer;
document.getElementById('reveal-seal').addEventListener('click',()=>{
 setPlaying(false);clearTimeout(entranceTimer);
 const button=document.getElementById('reveal-seal');
 document.body.classList.add('entrance-closed');button.setAttribute('aria-expanded','false');button.textContent='Opening your invitation…';
 entranceTimer=setTimeout(()=>{document.body.classList.remove('entrance-closed');button.setAttribute('aria-expanded','true');button.textContent='Replay entrance ↻';},document.body.dataset.motion==='off'?50:700);
});
updateScene();

// Canvas keepsakes use the selected scene and palette, including the paper/graphic compositions.
window.drawDesignFrame = function(ctx,width,height,phase,progress,data,artwork,formatters){
 const {formatDate,formatTime}=formatters;
 const [night,gold,cream,accent]=design.colors;
 const scale=width/540, w=540, h=height/scale;
 ctx.save();ctx.scale(scale,scale);
 ctx.fillStyle=night;ctx.fillRect(0,0,w,h);
 function imageCover(img,x,y,iw,ih,drift=0){
  ctx.save();ctx.beginPath();ctx.rect(x,y,iw,ih);ctx.clip();
  const z=Math.max(iw/img.width,ih/img.height)*(1.05+Math.sin(progress*Math.PI)*.035);
  ctx.drawImage(img,x+(iw-img.width*z)/2+drift,y+(ih-img.height*z)/2,img.width*z,img.height*z);ctx.restore();
 }
 function text(value,x,y,size,color=cream,max=440,font='Instrument Serif'){
  let fit=size;ctx.font=`${fit}px "${font}", Georgia, serif`;
  while(ctx.measureText(value).width>max&&fit>12){fit--;ctx.font=`${fit}px "${font}", Georgia, serif`;}
  ctx.fillStyle=color;ctx.fillText(value,x,y,max);
 }
 function lines(value,x,y,size,color,max=410){
  const words=value.split(/\s+/);let line='',row=0;
  ctx.font=`${size}px "Instrument Sans", Arial`;
  for(const word of words){if(ctx.measureText(line+' '+word).width>max&&line){text(line,x,y+row*size*1.5,size,color,max,'Instrument Sans');row++;line=word;}else line+=(line?' ':'')+word;}
  if(line)text(line,x,y+row*size*1.5,size,color,max,'Instrument Sans');
 }
 const paper=['paper','ribbon','editorial','museum','sculpture','courtyard'].includes(design.family);
 if(paper){
  ctx.fillStyle=cream;ctx.fillRect(0,0,w,h);
  ctx.save();ctx.translate(w*.5,h*.49);ctx.rotate((design.number%5-2)*.022);
  imageCover(artwork.background,-w*.42,-h*.35,w*.84,h*.7,Math.sin(progress*6)*7);ctx.restore();
  ctx.fillStyle=design.family==='ribbon'?'#fffdf2dd':cream;
  ctx.shadowColor='#00000033';ctx.shadowBlur=30;ctx.fillRect(55,h*.18,430,h*.64);ctx.shadowBlur=0;
  ctx.strokeStyle=accent;ctx.globalAlpha=.5;ctx.strokeRect(72,h*.18+17,396,h*.64-34);ctx.globalAlpha=1;
 }else{
  imageCover(artwork.background,0,0,w,h,Math.sin(progress*Math.PI*2)*10);
  const shade=ctx.createLinearGradient(0,0,0,h);shade.addColorStop(0,night+'c9');shade.addColorStop(.5,night+'55');shade.addColorStop(1,night+'ed');ctx.fillStyle=shade;ctx.fillRect(0,0,w,h);
  ctx.strokeStyle=gold+'99';ctx.lineWidth=1;ctx.strokeRect(25,25,w-50,h-50);
  if(design.family==='nocturne'){ctx.beginPath();ctx.arc(w*.78,h*.24,62+Math.sin(progress*6)*3,0,Math.PI*2);ctx.strokeStyle=gold+'77';ctx.stroke();}
 }
 ctx.textAlign='center';
 const ink=paper?night:cream;
 text(design.name.toUpperCase(),w/2,58,12,paper?night:gold,440,'Instrument Sans');
 if(phase==='intro'||phase==='outro'){
  const withCouple=design.couple&&artwork.couple;
  const top=withCouple?h*.17:h*.34;
  text(data.nameOne,w/2,top,64,ink,390,design.family==='editorial'?'Instrument Sans':'Instrument Serif');
  text('&',w/2,top+43,32,paper?accent:gold);
  text(data.nameTwo,w/2,top+105,64,ink,390,design.family==='editorial'?'Instrument Sans':'Instrument Serif');
  if(withCouple){const ch=h*.47,cw=artwork.couple.width/artwork.couple.height*ch;ctx.drawImage(artwork.couple,(w-cw)/2+Math.sin(progress*6)*4,h*.37,cw,ch);}
  const footer=withCouple?h*.88:h*.66;
  text(phase==='intro'?'TOGETHER WITH OUR FAMILIES':'WITH LOVE, ALWAYS',w/2,footer,11,paper?accent:gold,400,'Instrument Sans');
  const wedding=data.events.find(e=>/wedding|phera|shaadi|vivah/i.test(e.title))||data.events.at(-1);
  text(formatDate(wedding.date),w/2,footer+30,21,ink);
  text(data.venue,w/2,footer+58,16,ink,390);
 }else{
  const event=data.events[phase];
  if(!paper){ctx.fillStyle=night+'d9';ctx.fillRect(40,h*.23,460,h*.57);}
  text(`CHAPTER ${String(phase+1).padStart(2,'0')}`,w/2,h*.29,11,paper?accent:gold,400,'Instrument Sans');
  text(event.title,w/2,h*.38,49,ink,390);
  text(formatDate(event.date),w/2,h*.46,25,ink,390);
  text(`${formatTime(event.time)} IST`,w/2,h*.51,14,paper?accent:gold,390,'Instrument Sans');
  text(event.place,w/2,h*.57,23,ink,390);
  text(data.venue,w/2,h*.61,17,ink,390);
  if(event.attire)lines(event.attire,w/2,h*.68,13,ink,370);
  text(`${data.nameOne} & ${data.nameTwo}`,w/2,h*.9,22,paper?night:gold,430);
 }
 // Distinct foreground glints move independently from the scene during the recording.
 if(!paper){ctx.fillStyle=gold;for(let i=0;i<12;i++){ctx.globalAlpha=.18+.18*Math.sin(progress*9+i);const x=(i*79+design.number*13)%w,y=((i*113-progress*100)%h+h)%h;ctx.beginPath();ctx.arc(x,y,i%3===0?2:1,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;}
 ctx.restore();
};

const invitationHero=document.querySelector('.palace-hero');
function resetLight(){for(const key of ['--paper-rx','--paper-ry','--paper-x','--light-x'])invitationHero.style.removeProperty(key);}
invitationHero.addEventListener('pointermove',event=>{
 if(event.pointerType!=='mouse'||document.body.dataset.motion==='off')return;
 const rect=invitationHero.getBoundingClientRect();
 const x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;
 invitationHero.style.setProperty('--paper-rx',`${-y*5}deg`);
 invitationHero.style.setProperty('--paper-ry',`${x*7}deg`);
 invitationHero.style.setProperty('--paper-x',`${x*12}px`);
 invitationHero.style.setProperty('--light-x',`${50+x*35}%`);
});
invitationHero.addEventListener('pointerleave',resetLight);
depthButton.addEventListener('click',()=>{if(document.body.dataset.motion==='off')resetLight();});
// The opening never blocks navigation or editing, and is skipped for reduced motion.
if(!reducedMotion.matches){
 document.body.classList.add('entrance-closed');
 document.fonts.ready.then(()=>requestAnimationFrame(()=>document.body.classList.remove('entrance-closed')));
}

window.addEventListener('message',event=>{
 if(!design.embedded || event.source!==window.parent || event.origin!==location.origin)return;
 if(event.data?.type==='invitation-preview' && typeof event.data.nameOne==='string' && typeof event.data.nameTwo==='string')window.updateInvitePreview?.(event.data.nameOne,event.data.nameTwo);
 if(event.data?.type==='invitation-preview-data')window.updateInvitePreviewData?.(event.data.invitation);
});
