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

function filtered() {
  return catalog.filter(item =>
    (collection === 'All' || (collection === 'Saved' ? saved.has(item.id) : item.collection === collection)) &&
    (format === 'All' || item.format === format) &&
    (!search || `${item.name} ${item.collection} ${item.format} ${item.finish} ${item.description}`.toLowerCase().includes(search))
  );
}

function makeStage(item, preview = false) {
  const stage = document.createElement('div');
  stage.className = 'template-stage';
  for (const key of ['tone','art','finish','layout']) stage.dataset[key] = item[key] || 'none';
  stage.innerHTML = '<div class="template-sheet"><div class="sheet-border"></div><div class="sheet-content"><span class="sheet-mark"></span><span class="sheet-eyebrow">TOGETHER WITH THEIR FAMILIES</span><span class="sheet-names"><span class="preview-first"></span><i> &amp; </i><span class="preview-second"></span></span><span class="sheet-date">YOU ARE INVITED TO CELEBRATE</span><span class="sheet-venue">A day to remember · 2027</span><span class="sheet-flourish">✦ &nbsp; ✦ &nbsp; ✦</span></div></div>';
  stage.querySelector('.sheet-mark').textContent = item.motif;
  stage.querySelector('.preview-first').textContent = preview ? ($('#preview-name-one').value.trim() || 'Meera') : 'Meera';
  stage.querySelector('.preview-second').textContent = preview ? ($('#preview-name-two').value.trim() || 'Arjun') : 'Arjun';
  if (!preview) {
    if (item.live) { const badge=document.createElement('span'); badge.className='template-live'; badge.textContent='LIVE PREVIEW'; stage.append(badge); }
    const badge=document.createElement('span'); badge.className='template-format'; badge.textContent=item.format.toUpperCase(); stage.append(badge);
  }
  return stage;
}

function makeCard(item) {
  const card = document.createElement('article'); card.className='template-card'; card.dataset.id=item.id;
  const open = document.createElement('button'); open.className='template-open'; open.type='button';
  open.setAttribute('aria-label',`Preview ${item.name}, ${item.format} invitation`);
  open.append(makeStage(item)); open.addEventListener('click',()=>openDesign(item.id));
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
  const save=$('#dialog-save'); save.innerHTML=saved.has(item.id)?'Saved to shortlist <span aria-hidden="true">♥</span>':'Save this design <span aria-hidden="true">♡</span>';
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
render();
