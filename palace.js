const example = {
  nameOne: 'Meera',
  nameTwo: 'Arjun',
  families: 'The Shah and Mehta families',
  city: 'Samode, Rajasthan',
  venue: 'Samode Palace',
  address: 'Samode Palace, Samode, Rajasthan, India',
  events: [
    { title: 'Mehendi & welcome', date: '2027-02-18', time: '16:00', place: 'The Garden Courtyard', description: 'An afternoon of mehendi, music, and the first happy hellos.', attire: 'Colourful Indian festive wear' },
    { title: 'Haldi', date: '2027-02-19', time: '11:00', place: 'The Inner Courtyard', description: 'A sunlit morning with family, flowers, and a little turmeric.', attire: 'Shades of yellow and ivory' },
    { title: 'Sangeet', date: '2027-02-19', time: '19:30', place: 'The Durbar Hall', description: 'Music, dancing, and stories that may or may not be embellished.', attire: 'Evening festive wear' },
    { title: 'Wedding ceremony', date: '2027-02-20', time: '17:30', place: 'The Palace Terrace', description: 'Join us for the wedding ceremony, followed by dinner under the stars.', attire: 'Traditional Indian formal' },
    { title: 'Reception', date: '2027-02-21', time: '19:00', place: 'The Palace Lawn', description: 'One more evening together before the next chapter begins.', attire: 'Festive formal' },
  ],
};

const activeDesign = window.INVITATION_DESIGN;
const storageKey = activeDesign ? `invitation-studio-${activeDesign.id}-v1` : 'invitation-studio-palace-v1';
const maxEvents = 8;
const dialog = document.getElementById('editor-dialog');
const form = document.getElementById('palace-editor');
const eventFields = document.getElementById('editor-events');
const exportNote = document.getElementById('export-note');
const hero = document.querySelector('.palace-hero');

function clean(value, maxLength, fallback = '') {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, maxLength) || fallback : fallback;
}

function normalize(raw) {
  if (!raw || typeof raw !== 'object') return structuredClone(example);
  const events = Array.isArray(raw.events) ? raw.events.slice(0, maxEvents).map((event) => ({
    title: clean(event?.title, 50),
    date: /^\d{4}-\d{2}-\d{2}$/.test(event?.date) ? event.date : '',
    time: /^\d{2}:\d{2}$/.test(event?.time) ? event.time : '',
    place: clean(event?.place, 75),
    description: clean(event?.description, 180),
    attire: clean(event?.attire, 90),
  })).filter((event) => event.title && event.date && event.time && event.place) : [];
  return {
    nameOne: clean(raw.nameOne, 28, example.nameOne),
    nameTwo: clean(raw.nameTwo, 28, example.nameTwo),
    families: clean(raw.families, 100, example.families),
    city: clean(raw.city, 65, example.city),
    venue: clean(raw.venue, 85, example.venue),
    address: clean(raw.address, 150, example.address),
    events: events.length ? events : structuredClone(example.events),
  };
}

function fromHash() {
  const encoded = location.hash.startsWith('#invite=') ? location.hash.slice(8) : '';
  if (!encoded || encoded.length > 24000) return null;
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
    return normalize(JSON.parse(new TextDecoder().decode(bytes)));
  } catch { return null; }
}

function fromStorage() {
  if (activeDesign?.embedded) return structuredClone(example);
  try { return normalize(JSON.parse(localStorage.getItem(storageKey))); }
  catch { return structuredClone(example); }
}

let invitation = fromHash() || fromStorage();
if (activeDesign && !location.hash.startsWith('#invite=')) {
  const initialParams = new URLSearchParams(location.search);
  for (const key of ['nameOne', 'nameTwo']) {
    if (initialParams.get(key)?.trim()) invitation[key] = clean(initialParams.get(key), 28, invitation[key]);
    initialParams.delete(key);
  }
  history.replaceState(null, '', `${location.pathname}?${initialParams}${location.hash}`);
}

function persist() {
  if (activeDesign?.embedded) return;
  try { localStorage.setItem(storageKey, JSON.stringify(invitation)); }
  catch { /* The invitation still works when browser storage is unavailable. */ }
}

function formatDate(value, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
  const date = new Date(`${value}T12:00:00+05:30`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-IN', { ...options, timeZone: 'Asia/Kolkata' }).format(date);
}

function formatTime(value) {
  const [hour, minute] = value.split(':').map(Number);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return value;
  return new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }).format(new Date(Date.UTC(2027, 0, 1, hour, minute)));
}

function mapsLink(place) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place}, ${invitation.city}`)}`;
}

function create(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
}

function renderEvents() {
  const list = document.getElementById('event-list');
  list.replaceChildren();
  invitation.events.forEach((event, index) => {
    const card = create('article', 'event-card reveal');
    card.append(create('span', 'event-num', String(index + 1).padStart(2, '0')));
    const main = create('div', 'event-main');
    main.append(create('h3', '', event.title), create('p', '', event.description || 'Celebrate this moment with us.'));
    if (event.attire) main.append(create('p', 'event-attire', `DRESS NOTE  ·  ${event.attire}`));
    const details = create('div', 'event-details');
    const time = create('time', '', formatDate(event.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    time.dateTime = `${event.date}T${event.time}:00+05:30`;
    const link = create('a', '', 'DIRECTIONS ↗');
    link.href = mapsLink(`${event.place}, ${invitation.venue}`);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    details.append(time, create('span', 'event-time', `${formatTime(event.time)} IST`), create('span', 'event-place', `${event.place} · ${invitation.venue}`), link);
    card.append(main, details);
    list.append(card);
  });
  revealElements();
}

function render() {
  document.querySelectorAll('[data-name-one]').forEach((node) => { node.textContent = invitation.nameOne; });
  document.querySelectorAll('[data-name-two]').forEach((node) => { node.textContent = invitation.nameTwo; });
  document.querySelector('[data-families]').textContent = invitation.families;
  document.querySelector('[data-venue]').textContent = invitation.venue;
  document.querySelector('[data-address]').textContent = invitation.address;
  document.getElementById('main-map-link').href = mapsLink(invitation.venue);
  const wedding = invitation.events.find((event) => /wedding|phera|shaadi|vivah/i.test(event.title)) || invitation.events[invitation.events.length - 1];
  document.querySelector('[data-wedding-date]').textContent = formatDate(wedding.date).toUpperCase();
  document.title = `${invitation.nameOne} & ${invitation.nameTwo} — ${activeDesign?.name || "The Palace Edit"}`;
  fitHeroTitle();
  renderEvents();
  persist();
}

function fitHeroTitle() {
  const title = document.getElementById('hero-title');
  title.style.removeProperty('font-size');
  let size = Number.parseFloat(getComputedStyle(title).fontSize);
  const mobile = innerWidth < 681;
  const maxHeight = activeDesign?.embedded ? hero.offsetHeight * .45 : activeDesign ? (mobile ? 240 : hero.offsetHeight * .5) : 125;
  while ((title.scrollWidth > title.clientWidth || ((mobile || activeDesign) && title.clientHeight > maxHeight)) && size > (activeDesign ? 18 : mobile ? 28 : 36)) {
    size -= 2;
    title.style.fontSize = `${size}px`;
  }
}
window.addEventListener('resize', fitHeroTitle);
document.fonts.ready.then(fitHeroTitle);

let revealObserver;
function revealElements() {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
    return;
  }
  revealObserver ||= new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((node) => revealObserver.observe(node));
}

function updateDepth(pointerX = 0, pointerY = 0) {
  if (activeDesign ? document.body.dataset.motion === 'off' : matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scroll = Math.min(window.scrollY, hero.offsetHeight);
  hero.style.setProperty('--bg-x', `${pointerX * -12}px`);
  hero.style.setProperty('--bg-y', `${scroll * .18 + pointerY * -8}px`);
  hero.style.setProperty('--couple-x', `${pointerX * 18}px`);
  hero.style.setProperty('--couple-y', `${scroll * .08 + pointerY * 6}px`);
  document.querySelectorAll('.story-window, .venue-art').forEach((frame) => {
    const bounds = frame.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight) return;
    const distance = innerHeight / 2 - (bounds.top + bounds.height / 2);
    frame.style.setProperty('--museum-y', `${Math.max(-28, Math.min(28, distance * .07)).toFixed(1)}px`);
  });
}

let pointerX = 0;
let pointerY = 0;
hero.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'touch') return;
  const box = hero.getBoundingClientRect();
  pointerX = (event.clientX - box.left) / box.width - .5;
  pointerY = (event.clientY - box.top) / box.height - .5;
  updateDepth(pointerX, pointerY);
});
window.addEventListener('scroll', () => updateDepth(pointerX, pointerY), { passive: true });

function addEventFields(event = { title: '', date: '', time: '', place: '', description: '', attire: '' }) {
  if (eventFields.children.length >= maxEvents) return;
  const fieldset = document.getElementById('event-fields-template').content.firstElementChild.cloneNode(true);
  for (const input of fieldset.querySelectorAll('input')) input.value = event[input.name] || '';
  fieldset.querySelector('.remove-event').addEventListener('click', () => { if (eventFields.children.length > 1) { fieldset.remove(); numberEvents(); } });
  eventFields.append(fieldset);
  numberEvents();
}

function numberEvents() {
  [...eventFields.children].forEach((fieldset, index) => {
    fieldset.querySelector('legend').textContent = `Chapter ${String(index + 1).padStart(2, '0')}`;
    fieldset.querySelector('.remove-event').disabled = eventFields.children.length === 1;
  });
  document.getElementById('add-event').disabled = eventFields.children.length >= maxEvents;
}

function fillEditor(data) {
  for (const key of ['nameOne', 'nameTwo', 'families', 'city', 'venue', 'address']) form.querySelector(`[name="${key}"]`).value = data[key];
  eventFields.replaceChildren();
  data.events.forEach(addEventFields);
}

document.getElementById('open-editor').addEventListener('click', () => { fillEditor(invitation); dialog.showModal(); });
document.getElementById('close-editor').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.getElementById('add-event').addEventListener('click', () => addEventFields());
document.getElementById('reset-example').addEventListener('click', () => fillEditor(example));
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = {};
  for (const key of ['nameOne', 'nameTwo', 'families', 'city', 'venue', 'address']) data[key] = form.querySelector(`[name="${key}"]`).value;
  data.events = [...eventFields.children].map((fieldset) => Object.fromEntries([...fieldset.querySelectorAll('input')].map((input) => [input.name, input.value])));
  invitation = normalize(data);
  history.replaceState(null, '', location.pathname + location.search);
  render();
  dialog.close();
  exportNote.textContent = 'Your story is updated. Download a keepsake or copy its invitation link.';
});

function shareUrl() {
  const bytes = new TextEncoder().encode(JSON.stringify(invitation));
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  const local = ['localhost', '127.0.0.1'].includes(location.hostname) || location.protocol === 'file:';
  const base = local ? `https://vikasbanjare.github.io/weeding-invites/${activeDesign ? 'invitation.html?design=' + activeDesign.id : 'palace.html'}` : location.href.split('#')[0];
  return `${base}#invite=${btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}`;
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(value); return; }
  const input = create('textarea');
  input.value = value;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.append(input);
  input.select();
  const copied = document.execCommand('copy');
  input.remove();
  if (!copied) throw new Error('Clipboard unavailable');
}

document.getElementById('copy-link').addEventListener('click', async () => {
  try { await copyText(shareUrl()); exportNote.textContent = 'Invitation link copied. Anyone with this link can read its details.'; }
  catch {
    exportNote.textContent = 'Copy is unavailable. Select and copy your invitation link below.';
    let field = document.getElementById('manual-share-link');
    if (!field) { field = create('textarea'); field.id = 'manual-share-link'; field.setAttribute('aria-label', 'Your invitation link'); field.readOnly = true; field.style.cssText = 'display:block;width:min(100%,650px);margin:15px auto;padding:12px;'; exportNote.after(field); }
    field.value = shareUrl(); field.focus(); field.select();
  }
});

document.getElementById('share-whatsapp').addEventListener('click', () => {
  const message = `${invitation.nameOne} & ${invitation.nameTwo} invite you to celebrate with them. See the invitation and ceremony details: ${shareUrl()}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = create('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function icsEscape(value) { return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;'); }
function icsUtc(date) { return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
document.getElementById('download-calendar').addEventListener('click', () => {
  const stamp = icsUtc(new Date());
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Invitation Studio//Palace Edit//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  invitation.events.forEach((event, index) => {
    const start = new Date(`${event.date}T${event.time}:00+05:30`);
    if (Number.isNaN(start.getTime())) return;
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    lines.push('BEGIN:VEVENT', `UID:palace-${index}-${event.date}@invitation-studio.example`, `DTSTAMP:${stamp}`, `DTSTART:${icsUtc(start)}`, `DTEND:${icsUtc(end)}`, `SUMMARY:${icsEscape(`${event.title} · ${invitation.nameOne} & ${invitation.nameTwo}`)}`, `LOCATION:${icsEscape(`${event.place}, ${invitation.venue}, ${invitation.city}`)}`, `DESCRIPTION:${icsEscape(`${event.description} Dress note: ${event.attire}. Please confirm details with your hosts.`)}`, 'END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  saveBlob(new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' }), `${activeDesign?.id || 'palace'}-celebrations.ics`);
  exportNote.textContent = 'Calendar file downloaded. Each event uses India Standard Time.';
});

const artwork = {};
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}
async function getArtwork() {
  if (!artwork.background) {
    [artwork.background, artwork.couple] = await Promise.all([loadImage(activeDesign?.background || 'assets/palace-courtyard.webp'), !activeDesign || activeDesign.couple ? loadImage('assets/palace-couple.webp') : Promise.resolve(null)]);
  }
  await document.fonts.ready;
  return artwork;
}

function coverImage(ctx, image, width, height, offset = 0) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  ctx.drawImage(image, (width - drawWidth) / 2 + offset, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function fittedText(ctx, text, maxWidth, size, minSize = 30) {
  let current = size;
  ctx.font = `${current}px Georgia, serif`;
  while (ctx.measureText(text).width > maxWidth && current > minSize) { current -= 2; ctx.font = `${current}px Georgia, serif`; }
  return current;
}

function drawNames(ctx, width, height) {
  const names = `${invitation.nameOne} & ${invitation.nameTwo}`;
  const maxWidth = width - 84;
  fittedText(ctx, names, maxWidth, 62, 22);
  ctx.shadowColor = '#101524'; ctx.shadowBlur = 18;
  if (ctx.measureText(names).width <= maxWidth) {
    ctx.fillText(names, width / 2, height * .2, maxWidth);
  } else {
    fittedText(ctx, invitation.nameOne, maxWidth, 49, 18);
    ctx.fillText(invitation.nameOne, width / 2, height * .15, maxWidth);
    ctx.font = 'italic 28px Georgia, serif';
    ctx.fillText('&', width / 2, height * .205);
    fittedText(ctx, invitation.nameTwo, maxWidth, 49, 18);
    ctx.fillText(invitation.nameTwo, width / 2, height * .26, maxWidth);
  }
  ctx.shadowBlur = 0;
}

function drawFrame(ctx, width, height, phase, progress = 0) {
  if (window.drawDesignFrame) return window.drawDesignFrame(ctx, width, height, phase, progress, invitation, artwork, { formatDate, formatTime });
  const { background, couple } = artwork;
  ctx.fillStyle = '#151b29';
  ctx.fillRect(0, 0, width, height);
  coverImage(ctx, background, width, height, Math.sin(progress * Math.PI * 2) * 18);
  const shade = ctx.createLinearGradient(0, 0, 0, height);
  shade.addColorStop(0, '#111725d9'); shade.addColorStop(.4, '#11172565'); shade.addColorStop(1, '#111725e9');
  ctx.fillStyle = shade; ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#e7c796b5'; ctx.lineWidth = 2;
  ctx.strokeRect(26, 26, width - 52, height - 52);
  ctx.textAlign = 'center'; ctx.fillStyle = '#ead0a3';
  ctx.font = 'bold 16px Arial'; ctx.fillText('✦  THE PALACE EDIT  ✦', width / 2, 71);

  if (phase === 'intro' || phase === 'outro') {
    const coupleHeight = height * .57;
    const coupleWidth = couple.width * coupleHeight / couple.height;
    ctx.drawImage(couple, (width - coupleWidth) / 2, height * .3, coupleWidth, coupleHeight);
    ctx.fillStyle = '#fff3df';
    drawNames(ctx, width, height);
    ctx.fillStyle = '#efd2a1'; ctx.font = 'bold 17px Arial';
    ctx.fillText(phase === 'intro' ? 'INVITE YOU TO CELEBRATE' : 'WE CANNOT WAIT TO SEE YOU', width / 2, height * .89);
    ctx.font = '17px Georgia';
    const wedding = invitation.events.find((event) => /wedding|phera|shaadi|vivah/i.test(event.title)) || invitation.events.at(-1);
    ctx.fillText(formatDate(wedding.date).toUpperCase(), width / 2, height * .93);
  } else {
    const event = invitation.events[phase];
    const panel = ctx.createLinearGradient(0, height * .22, 0, height * .8);
    panel.addColorStop(0, '#141b29b0'); panel.addColorStop(.5, '#141b29ec'); panel.addColorStop(1, '#141b29b0');
    ctx.fillStyle = panel; ctx.fillRect(25, height * .22, width - 50, height * .58);
    ctx.fillStyle = '#d6b37a'; ctx.font = 'italic 26px Georgia';
    ctx.fillText(`CHAPTER ${String(phase + 1).padStart(2, '0')}`, width / 2, height * .32);
    ctx.fillStyle = '#fff3df'; fittedText(ctx, event.title, width - 90, 55, 18);
    ctx.fillText(event.title, width / 2, height * .43, width - 90);
    ctx.fillStyle = '#f0d5a6'; ctx.font = '26px Georgia';
    ctx.fillText(formatDate(event.date), width / 2, height * .52);
    ctx.font = 'bold 18px Arial'; ctx.fillText(`${formatTime(event.time).toUpperCase()} IST`, width / 2, height * .58);
    ctx.font = '20px Georgia';
    fittedText(ctx, event.place, width - 90, 20, 16);
    ctx.fillText(event.place, width / 2, height * .66, width - 90);
    ctx.fillText(invitation.venue, width / 2, height * .7, width - 90);
    if (event.attire) { ctx.font = '16px Arial'; fittedText(ctx, event.attire, width - 90, 16, 13); ctx.fillText(event.attire, width / 2, height * .75, width - 90); }
    ctx.fillStyle = '#ead0a3'; ctx.font = '15px Arial'; ctx.fillText(`${invitation.nameOne}  &  ${invitation.nameTwo}`, width / 2, height * .91);
  }
}

document.getElementById('download-card').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  exportNote.textContent = 'Preparing your image card…';
  try {
    await getArtwork();
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 1350;
    drawFrame(canvas.getContext('2d'), canvas.width, canvas.height, 'intro');
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('Image export failed');
    saveBlob(blob, `${invitation.nameOne}-${invitation.nameTwo}-invitation.png`);
    exportNote.textContent = 'Image card downloaded as PNG.';
  } catch { exportNote.textContent = 'Image export is unavailable in this browser. Please try a current browser.'; }
  finally { button.disabled = false; }
});

document.getElementById('download-video').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  try {
    if (!HTMLCanvasElement.prototype.captureStream || !window.MediaRecorder) throw new Error('Video recording unsupported');
    await getArtwork();
    const mime = ['video/mp4;codecs=avc1.42E01E', 'video/mp4', 'video/webm;codecs=vp8', 'video/webm'].find((type) => MediaRecorder.isTypeSupported(type));
    if (!mime) throw new Error('Video format unsupported');
    const canvas = document.createElement('canvas');
    canvas.width = 540; canvas.height = 960;
    const ctx = canvas.getContext('2d', { alpha: false });
    const stream = canvas.captureStream(24);
    const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 1800000 });
    const chunks = [];
    const sceneLength = 2.4;
    const duration = 3 + invitation.events.length * sceneLength + 2.5;
    const result = new Promise((resolve, reject) => {
      recorder.ondataavailable = (part) => { if (part.data.size) chunks.push(part.data); };
      recorder.onerror = () => reject(new Error('Recording failed'));
      recorder.onstop = () => resolve(new Blob(chunks, { type: recorder.mimeType || mime }));
    });
    const start = performance.now();
    drawFrame(ctx, canvas.width, canvas.height, 'intro', 0);
    recorder.start(500);
    await new Promise((resolve) => {
      function frame(now) {
        const seconds = (now - start) / 1000;
        let phase = 'intro';
        if (seconds >= 3 && seconds < duration - 2.5) phase = Math.min(invitation.events.length - 1, Math.floor((seconds - 3) / sceneLength));
        if (seconds >= duration - 2.5) phase = 'outro';
        drawFrame(ctx, canvas.width, canvas.height, phase, seconds / duration);
        exportNote.textContent = `Recording invitation… ${Math.min(100, Math.round(seconds / duration * 100))}%`;
        if (seconds < duration) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    const blob = await result;
    if (blob.size < 10000) throw new Error('Empty recording');
    const extension = blob.type.includes('mp4') ? 'mp4' : 'webm';
    saveBlob(blob, `${invitation.nameOne}-${invitation.nameTwo}-motion-invite.${extension}`);
    exportNote.textContent = extension === 'mp4' ? 'MP4 invitation downloaded.' : 'WebM invitation downloaded. For widest WhatsApp playback, the production export should be MP4.';
  } catch { exportNote.textContent = 'Video recording is unavailable in this browser. The image card and invitation link still work.'; }
  finally { button.disabled = false; }
});

render();

window.updateInvitePreview = (nameOne, nameTwo) => {
  if (!activeDesign?.embedded) return;
  invitation.nameOne = clean(nameOne, 28, 'Meera');
  invitation.nameTwo = clean(nameTwo, 28, 'Arjun');
  render();
};
