const catalog = [
  // Heritage: architecture, textiles and ceremonial details.
  ['Royal Court','Heritage','Digital','plum','royal','foil','crest','✦','A regal palace invitation in burgundy and gold.','studio.html?style=royal'],
  ['Amber Darbar','Heritage','Paper','ochre','','linen','arch','◇','Warm sandstone arches and courtly lettering.'],
  ['Jharokha Letter','Heritage','Paper','ivory','chettinad','cotton','border','✧','A carved-window frame inspired by old havelis.'],
  ['Chettinad Morning','Heritage','Website','sand','chettinad','matte','split','☀','South Indian courtyard warmth, drawn in wood and light.'],
  ['Zari Heirloom','Heritage','Paper','plum','','foil','border','✦','A textile-like border with a restrained metallic gleam.'],
  ['Haveli Gold','Heritage','Digital','night','palace','foil','band','✺','A lantern-lit palace scene with an heirloom finish.'],
  ['Terracotta Arch','Heritage','Paper','clay','','deckle','arch','⌒','Architectural curves in earthy terracotta.'],
  ['Heritage Seal','Heritage','Paper','sand','','letterpress','crest','✺','A formal monogram and generous old-world spacing.'],
  ['Ivory Darbar','Heritage','Digital','ivory','royal','silk','vignette','✧','Palace detail softened to an elegant ivory story.'],
  ['Peacock Pavilion','Heritage','Paper','blue','','foil','corner','✦','A jewel-blue palette with pavilion-like framing.'],

  // Modern: graphic structure, expressive type and editorial contrast.
  ['Modern Arches','Modern','Digital','rose','modern','matte','split','○','Sculptural arches with warm editorial colour.'],
  ['The Edit','Modern','Paper','ivory','','matte','editorial','01','An invitation that reads like a beautifully set journal.'],
  ['Cobalt Lines','Modern','Digital','blue','','matte','offset','／','Electric blue, fine rules and generous white space.'],
  ['Noir Type','Modern','Paper','night','','foil','type','M+A','Big type and a precise gold accent after dark.'],
  ['Blush Grid','Modern','Paper','rose','','matte','corner','+','A soft pink grid with graphic restraint.'],
  ['Copper Rhythm','Modern','Motion','clay','modern','foil','band','◒','Overlapping forms made for a moving save-the-date.'],
  ['Mono Letter','Modern','Paper','ivory','','letterpress','type','M','A typographic note with a quiet pressed finish.'],
  ['Gilded Minimal','Modern','Digital','sand','','foil','offset','·','Just a few words and one line of gold.'],
  ['New Geometry','Modern','Paper','ochre','modern','matte','arch','△','Playful geometry with an Indian colour memory.'],
  ['Afterglow','Modern','Website','plum','','silk','vignette','✧','A moody late-evening canvas for a digital story.'],

  // Botanical: floral illustration, natural colour and garden settings.
  ['Garden Vow','Botanical','Digital','sage','garden','cotton','arch','❀','An airy botanical mandap wrapped in soft florals.','studio.html?style=garden'],
  ['Marigold Poem','Botanical','Paper','ivory','marigold','deckle','border','✿','Hand-painted marigolds on a soft handmade-paper ground.'],
  ['Jasmine Letter','Botanical','Paper','ivory','','cotton','corner','✿','A delicate jasmine-inspired note in cream and green.'],
  ['Wild Garden','Botanical','Digital','sage','garden','matte','split','❀','An abundant garden with room for a joyful announcement.'],
  ['Pressed Petals','Botanical','Paper','rose','','vellum','offset','✿','Translucent layers and the feel of saved flowers.'],
  ['Gulmohar','Botanical','Paper','clay','marigold','linen','band','✾','Sunlit red-orange blooms and natural fibre character.'],
  ['Mogra Morning','Botanical','Digital','sand','','silk','arch','❁','Quiet white blossoms for a morning ceremony.'],
  ['Olive & Ochre','Botanical','Paper','ochre','','kraft','editorial','✤','Earthy foliage, warm paper and bold composition.'],
  ['Rosewater','Botanical','Paper','rose','','deckle','border','❀','Soft rose tones and a gently torn silhouette.'],
  ['Fern Study','Botanical','Website','forest','garden','matte','vignette','✺','A darker garden palette with fine botanical texture.'],

  // Paper: the finish itself leads the concept.
  ['Cotton Rag','Paper','Paper','ivory','','cotton','type','M+A','Soft cotton stock with an open, gallery-like layout.'],
  ['Deckled Edge','Paper','Paper','sand','marigold','deckle','corner','✧','An irregular handmade edge and watercolor warmth.'],
  ['Vellum Layer','Paper','Paper','rose','','vellum','split','◇','A translucent overlay with a second story beneath.'],
  ['Letterpress No. 1','Paper','Paper','ivory','','letterpress','border','I','A classic impression, simple and timeless.'],
  ['Gold Foil','Paper','Paper','night','','foil','crest','✦','A small ceremonial mark shining against dark stock.'],
  ['Handmade Kraft','Paper','Paper','sand','','kraft','offset','✤','Uncoated warmth with a relaxed handwritten spirit.'],
  ['Satin Ribbon','Paper','Paper','rose','','silk','band','∞','A refined suite inspired by tied keepsakes.'],
  ['Embossed Crest','Paper','Paper','blue','','letterpress','crest','M','A raised monogram framed by a pale-blue field.'],
  ['Watercolor Wash','Paper','Paper','sage','marigold','cotton','editorial','✿','A gentle wash of colour on textured paper.'],
  ['Arch Envelope','Paper','Paper','clay','','matte','arch','⌒','An architectural die-cut direction in clay and cream.'],

  // Destination: a sense of place, from Indian palaces to coast and mountains.
  ['Palace Edit','Destination','Website','night','palace','foil','vignette','✦','A scrollable palace story with editable ceremonies and motion keepsake.','palace.html'],
  ['Moonlit Mehfil','Destination','Digital','night','moonlit','foil','band','☾','A lantern-lit night under the stars.','studio.html?style=moonlit'],
  ['Courtyard Story','Destination','Website','sand','chettinad','cotton','split','✺','A Chettinad-inspired courtyard and a family gathering.'],
  ['Monsoon Garden','Destination','Website','forest','garden','matte','vignette','❀','Rain-washed greenery with a dreamy arrival.'],
  ['Desert Sky','Destination','Motion','ochre','','linen','offset','☼','Dunes, glowing light and a cinematic opening.'],
  ['Coastal Dawn','Destination','Digital','blue','','cotton','editorial','≈','Sea air and quiet morning light in a spare layout.'],
  ['City Lights','Destination','Website','plum','modern','matte','band','✧','A contemporary celebration after the skyline lights up.'],
  ['Mountain Overture','Destination','Paper','sage','','deckle','border','△','A layered landscape for a high-altitude celebration.'],
  ['The Museum','Destination','Website','ivory','royal','matte','editorial','Ⅰ','A curated walk through architecture and memory.'],
  ['Blue Hour','Destination','Motion','blue','moonlit','silk','vignette','☾','A twilight reveal with luminous type and atmosphere.']
].map(([name,collection,format,tone,art,finish,layout,motif,description,live],index)=>({
  id:`design-${String(index+1).padStart(2,'0')}`,name,collection,format,tone,art,finish,layout,motif,description,live
}));

const $ = (selector) => document.querySelector(selector);
const grid = $('#template-grid');
const dialog = $('#design-dialog');
const savedKey = 'invitation-studio-shortlist-v1';
let saved = new Set();
try { saved = new Set(JSON.parse(localStorage.getItem(savedKey) || '[]').filter(id=>catalog.some(item=>item.id===id))); } catch { /* Storage can be unavailable. */ }
let collection = 'All';
let format = 'All';
let search = '';
let visibleCount = 12;
let currentId = null;
let returnFocus = null;
const featuredNames = ['Royal Court','Moonlit Mehfil','Garden Vow','Palace Edit','Modern Arches','Chettinad Morning','The Edit','Noir Type','Cotton Rag','Desert Sky','Monsoon Garden','Coastal Dawn'];
const featured = [...catalog].sort((a,b)=>{
  const first=featuredNames.indexOf(a.name), second=featuredNames.indexOf(b.name);
  return (first<0?100+Number(a.id.slice(-2)):first) - (second<0?100+Number(b.id.slice(-2)):second);
});

function filtered() {
  return (collection === 'All' ? featured : catalog).filter(item =>
    (collection === 'All' || (collection === 'Saved' ? saved.has(item.id) : item.collection === collection)) &&
    (format === 'All' || item.format === format) &&
    (!search || `${item.name} ${item.collection} ${item.format} ${item.finish} ${item.description}`.toLowerCase().includes(search))
  );
}

function makeStage(item, preview = false) {
  const stage = document.createElement('div');
  stage.className = 'template-stage';
  for (const key of ['tone','art','finish','layout','collection']) stage.dataset[key] = item[key] || 'none';
  stage.style.setProperty('--stage-position',`${35+Number(item.id.slice(-2))*13%43}% center`);
  stage.innerHTML = '<div class="stage-image"></div><div class="stage-shade"></div><div class="stage-sculpture"></div><div class="stage-grid"></div><div class="stage-content"><span class="stage-top"></span><span class="stage-mark"></span><span class="stage-names"><span class="stage-name-one"></span><i> &amp; </i><span class="stage-name-two"></span></span><span class="stage-caption"></span><span class="stage-index"></span></div>';
  stage.querySelector('.stage-top').textContent = `${item.collection} / ${item.format}`;
  stage.querySelector('.stage-mark').textContent = item.motif;
  stage.querySelector('.stage-name-one').textContent = preview ? ($('#preview-name-one').value.trim() || 'Meera') : 'Meera';
  stage.querySelector('.stage-name-two').textContent = preview ? ($('#preview-name-two').value.trim() || 'Arjun') : 'Arjun';
  stage.querySelector('.stage-caption').textContent = item.name;
  stage.querySelector('.stage-index').textContent = preview ? item.id.slice(-2) : '';
  if (item.live && !preview) stage.querySelector('.stage-top').textContent = '';
  if (!preview) {
    if (item.live) { const badge=document.createElement('span'); badge.className='template-live'; badge.textContent='LIVE EXPERIENCE'; stage.append(badge); }
    const badge=document.createElement('span'); badge.className='template-format'; badge.textContent=item.format.toUpperCase(); stage.append(badge);
  }
  return stage;
}

function makeCard(item) {
  const card = document.createElement('article'); card.className='template-card'; card.dataset.id=item.id;
  const open = document.createElement('button'); open.className='template-open'; open.type='button';
  open.setAttribute('aria-label',`Preview ${item.name}, ${item.format} invitation`);
  open.append(makeStage(item)); open.addEventListener('click',()=>openDesign(item.id));
  open.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect=open.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5, y=(event.clientY-rect.top)/rect.height-.5;
    open.firstElementChild.style.setProperty('--tilt-x',`${(x*5).toFixed(2)}deg`);
    open.firstElementChild.style.setProperty('--tilt-y',`${(-y*5).toFixed(2)}deg`);
  });
  open.addEventListener('pointerleave',()=>{
    open.firstElementChild.style.removeProperty('--tilt-x');
    open.firstElementChild.style.removeProperty('--tilt-y');
  });
  const meta = document.createElement('div'); meta.className='template-meta';
  const labels = document.createElement('div');
  const title = document.createElement('h3'); title.textContent=item.name;
  const subtitle = document.createElement('p'); subtitle.textContent=`${item.collection} / ${item.finish} finish`;
  labels.append(title,subtitle);
  const save = document.createElement('button'); save.className='save-design'; save.type='button';
  save.setAttribute('aria-label',`${saved.has(item.id) ? 'Remove' : 'Save'} ${item.name} ${saved.has(item.id) ? 'from' : 'to'} shortlist`);
  save.setAttribute('aria-pressed',String(saved.has(item.id)));
  save.textContent=saved.has(item.id)?'♥':'♡';
  save.addEventListener('click',()=>toggleSaved(item.id));
  meta.append(labels,save); card.append(open,meta);
  return card;
}

function render() {
  const matches = filtered();
  const showing = matches.slice(0,visibleCount);
  grid.replaceChildren(...showing.map(makeCard));
  $('#result-count').textContent = matches.length ? `Showing ${showing.length} of ${matches.length} designs` : 'No designs found';
  $('#saved-count').textContent = String(saved.size);
  $('#download-shortlist').disabled = !saved.size;
  $('#show-more').hidden = showing.length >= matches.length;
  $('#catalog-progress').textContent = matches.length ? `${showing.length} / ${matches.length} designs` : '';
  $('#catalog-empty').hidden = Boolean(matches.length);
  document.querySelectorAll('[data-filter]').forEach(button=>{
    const active=button.dataset.filter===collection;
    button.classList.toggle('is-active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}

function toggleSaved(id) {
  const restoreCardFocus=document.activeElement?.classList.contains('save-design');
  if (saved.has(id)) saved.delete(id); else saved.add(id);
  try { localStorage.setItem(savedKey,JSON.stringify([...saved])); } catch { /* The current page still works. */ }
  render();
  if (restoreCardFocus) (Array.from(grid.querySelectorAll('.template-card')).find(card=>card.dataset.id===id)?.querySelector('.save-design') || document.querySelector('[data-filter="Saved"]')).focus();
  if (dialog.open && currentId===id) updateDialog();
}

function updateDialog() {
  const item=catalog.find(design=>design.id===currentId);
  if (!item) return;
  $('#dialog-art').replaceChildren(makeStage(item,true));
  $('#dialog-collection').textContent=`${item.collection.toUpperCase()} COLLECTION / ${item.format.toUpperCase()}`;
  $('#dialog-design-title').textContent=item.name;
  $('#dialog-description').textContent=item.description;
  const tags=$('#dialog-tags'); tags.replaceChildren();
  for (const value of [item.format,`${item.finish} effect`,item.live?'Live experience':'Design concept']) {
    const tag=document.createElement('span'); tag.textContent=value; tags.append(tag);
  }
  const save=$('#dialog-save'); save.innerHTML=saved.has(item.id)?'Saved to shortlist <span aria-hidden="true">♥</span>':'Save this direction <span aria-hidden="true">♡</span>';
  save.setAttribute('aria-pressed',String(saved.has(item.id)));
  const live=$('#dialog-live'); live.hidden=!item.live;
  if (item.live) live.href=item.live;
  const list=filtered(); const position=list.findIndex(design=>design.id===item.id);
  $('#dialog-position').textContent=`${String(position+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}`;
  $('#previous-design').disabled=position<=0;
  $('#next-design').disabled=position<0 || position>=list.length-1;
}

function openDesign(id) {
  currentId=id; returnFocus=document.activeElement;
  updateDialog();
  if (typeof dialog.showModal==='function') dialog.showModal(); else dialog.setAttribute('open','');
}

function stepDialog(amount) {
  const list=filtered(); const index=list.findIndex(item=>item.id===currentId);
  const next=list[index+amount]; if (next) { currentId=next.id; updateDialog(); }
}

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  collection=button.dataset.filter; visibleCount=12; render();
}));
document.querySelectorAll('[data-collection-link]').forEach(link=>link.addEventListener('click',()=>{
  collection=link.dataset.collectionLink; format='All'; $('#format-filter').value='All';
  search=''; $('#catalog-search').value=''; visibleCount=12; render();
}));
$('#catalog-search').addEventListener('input',event=>{search=event.target.value.trim().toLowerCase();visibleCount=12;render();});
$('#format-filter').addEventListener('change',event=>{format=event.target.value;visibleCount=12;render();});
$('#show-more').addEventListener('click',()=>{visibleCount+=12;render();});
$('#clear-filters').addEventListener('click',()=>{
  collection='All';format='All';search='';visibleCount=12;
  $('#catalog-search').value='';$('#format-filter').value='All';render();
});
$('#download-shortlist').addEventListener('click',()=>{
  const selections=catalog.filter(item=>saved.has(item.id));
  const lines=['Invitation Studio — saved design brief','','These are design concepts. Ordering and printing are not available yet.','',...selections.flatMap((item,index)=>[
    `${index+1}. ${item.name} — ${item.collection} / ${item.format}`,
    `   ${item.description}`,
    `   Finish direction: ${item.finish}${item.live ? ` · Live preview: ${new URL(item.live,location.href).href}` : ''}`,''
  ]),'Browse the collection: '+location.href.split('#')[0]];
  const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));
  const anchor=document.createElement('a'); anchor.href=url;anchor.download='invitation-studio-shortlist.txt';anchor.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
});
$('#close-design').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus();});
$('#dialog-save').addEventListener('click',()=>toggleSaved(currentId));
$('#previous-design').addEventListener('click',()=>stepDialog(-1));
$('#next-design').addEventListener('click',()=>stepDialog(1));
for(const input of [$('#preview-name-one'),$('#preview-name-two')]) input.addEventListener('input',()=>{if(currentId)updateDialog();});
$('#menu-toggle').addEventListener('click',()=>{
  const expanded=$('#menu-toggle').getAttribute('aria-expanded')==='true';
  $('#menu-toggle').setAttribute('aria-expanded',String(!expanded));
  $('#main-nav').classList.toggle('is-open',!expanded);
});
document.querySelectorAll('#main-nav a').forEach(link=>link.addEventListener('click',()=>{
  $('#menu-toggle').setAttribute('aria-expanded','false');$('#main-nav').classList.remove('is-open');
}));

const hero=$('.hero');
const heroLabels={royal:'01 / ROYAL COURT',moonlit:'02 / MOONLIT MEHFIL',garden:'03 / GARDEN VOW'};
document.querySelectorAll('.hero-choice').forEach(button=>button.addEventListener('click',()=>{
  const scene=button.dataset.scene;
  document.querySelectorAll('.hero-choice').forEach(choice=>{
    const active=choice===button;
    choice.classList.toggle('is-active',active);
    choice.setAttribute('aria-pressed',String(active));
  });
  document.querySelectorAll('.hero-image').forEach(image=>image.classList.toggle('is-active',image.dataset.heroImage===scene));
  $('#hero-image-caption').textContent=heroLabels[scene];
}));
hero.addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect=hero.getBoundingClientRect();
  hero.style.setProperty('--pointer-x',`${((event.clientX/rect.width-.5)*-11).toFixed(1)}px`);
  hero.style.setProperty('--pointer-y',`${((event.clientY/rect.height-.5)*-11).toFixed(1)}px`);
  hero.style.setProperty('--pointer-rotate',`${((event.clientX/rect.width-.5)*1.8).toFixed(2)}deg`);
});
hero.addEventListener('pointerleave',()=>{
  hero.style.removeProperty('--pointer-x');hero.style.removeProperty('--pointer-y');hero.style.removeProperty('--pointer-rotate');
});

const worldStory=$('#world-story');
const worldSlides=[...document.querySelectorAll('.world-slide')];
const worldMarkers=[...document.querySelectorAll('.world-progress span')];
let scrollQueued=false;
function updateWorld() {
  scrollQueued=false;
  if(window.matchMedia('(max-width: 650px)').matches) {
    worldSlides.forEach(slide=>slide.removeAttribute('aria-hidden'));
    return;
  }
  const travel=Math.max(1,worldStory.offsetHeight-window.innerHeight);
  const progress=Math.max(0,Math.min(1,-worldStory.getBoundingClientRect().top/travel));
  const index=Math.min(worldSlides.length-1,Math.floor(progress*worldSlides.length));
  worldSlides.forEach((slide,position)=>{
    const active=position===index;
    slide.classList.toggle('is-active',active);
    slide.setAttribute('aria-hidden',String(!active));
    if(active) {
      const local=progress*worldSlides.length-index;
      slide.style.setProperty('--scene-scale',String(1.14-.1*local));
      slide.style.setProperty('--scene-shift',`${((.5-local)*42).toFixed(1)}px`);
    }
  });
  worldMarkers.forEach((marker,position)=>marker.classList.toggle('is-active',position===index));
}
window.addEventListener('scroll',()=>{
  if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateWorld);}
},{passive:true});
window.addEventListener('resize',updateWorld);
const header=$('.site-header');
function updateHeader(){header.classList.toggle('is-scrolled',window.scrollY>hero.offsetHeight-100);}
window.addEventListener('scroll',updateHeader,{passive:true});
updateHeader();
updateWorld();
render();

// Keep the initial moment personal, then carry those exact details into the editor.
const arrivalInputs=[$('#arrival-one'),$('#arrival-two')];
function arrivalDetails(){return arrivalInputs.map((input,index)=>input.value.trim() || (index===0?'Your name':'Their name'));}
function renderArrival(){
  const names=arrivalDetails();
  $('#arrival-name-one').textContent=names[0];
  $('#arrival-name-two').textContent=names[1];
  $('#portal-monogram').textContent=names.map(name=>Array.from(name)[0]).join(' / ');
  $('.portal-inscription p').classList.toggle('is-long',names.some(name=>name.length>12));
}
arrivalInputs.forEach(input=>input.addEventListener('input',renderArrival));
function toggleArrival(){
  const open=$('#portal-toggle').getAttribute('aria-expanded')!=='true';
  $('#invitation-portal').classList.toggle('is-open',open);
  $('#portal-toggle').setAttribute('aria-expanded',String(open));
  $('#portal-inside').setAttribute('aria-hidden',String(!open));
  $('#portal-toggle-label').textContent=open?'Close & replay the reveal':'Open your invitation';
  $('#portal-surface-button').setAttribute('aria-expanded',String(open));
  $('#portal-surface-button').setAttribute('aria-label',open?'Close your invitation':'Open your invitation');
}
$('#portal-toggle').addEventListener('click',toggleArrival);
$('#portal-surface-button').addEventListener('click',toggleArrival);
document.querySelectorAll('[name="arrival-scene"]').forEach(input=>input.addEventListener('change',()=>{
  $('#invitation-portal').dataset.scene=input.value;
}));
$('#arrival-form').addEventListener('submit',event=>{
  event.preventDefault();
  const [nameOne,nameTwo]=arrivalDetails();
  const params=new URLSearchParams({style:document.querySelector('[name="arrival-scene"]:checked').value,nameOne,nameTwo});
  location.href=`studio.html?${params}`;
});
const finishDescriptions={
  cotton:'Soft grain. Blind impressions. An understated invitation with room to breathe.',
  vellum:'A translucent first layer. Let the names appear before the full story unfolds.',
  foil:'A restrained glint of light. One metallic detail becomes the signature of the suite.'
};
document.querySelectorAll('[data-material]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-material]').forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));
  $('.material-display').dataset.activeMaterial=button.dataset.material;
  $('#material-detail').textContent=finishDescriptions[button.dataset.material];
}));
const ceremonyChapters={
  haldi:{image:'botanical-mandap',alt:'Sunlit garden setting for a Haldi celebration',number:'01',title:'The Haldi',kicker:'YELLOW PETALS. GOLDEN MEMORIES.',description:'A little turmeric, a lot of laughter. Come ready to be part of the colour.',time:'10 December · 11:00 AM',place:'The Garden Courtyard, Jaipur',dress:'Sunshine shades & easy silhouettes'},
  sangeet:{image:'moonlit-mehfil',alt:'Indigo courtyard glowing with lanterns for a Sangeet night',number:'02',title:'The Sangeet',kicker:'YOUR FAVOURITE PEOPLE. ONE DANCE FLOOR.',description:'Old songs, new memories and a night that belongs to everyone we love.',time:'11 December · 7:00 PM',place:'The Moonlit Terrace, Jaipur',dress:'Jewel tones & your dancing shoes'},
  wedding:{image:'royal-palace',alt:'A warm palace courtyard for a wedding ceremony',number:'03',title:'The Wedding',kicker:'ALL ROADS LED US HERE.',description:'With our families beside us and you around us, our forever begins.',time:'12 December · 4:30 PM',place:'The Palace Courtyard, Jaipur',dress:'Indian festive · a touch of gold'}
};
document.querySelectorAll('[data-chapter].chapter-choice').forEach(button=>button.addEventListener('click',()=>{
  const chapter=ceremonyChapters[button.dataset.chapter];
  document.querySelectorAll('.chapter-choice').forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));
  $('#chapter-preview').dataset.chapter=button.dataset.chapter;
  const picture=$('#chapter-image');
  picture.src=`assets/${chapter.image}.webp`;picture.alt=chapter.alt;
  picture.style.animation='none';
  requestAnimationFrame(()=>{picture.style.animation='';});
  $('#chapter-number').textContent=`CHAPTER ${chapter.number}`;
  for(const key of ['title','kicker','description','time','place','dress']) $(`#chapter-${key}`).textContent=chapter[key];
}));
renderArrival();
