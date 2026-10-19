const catalog = window.invitationCatalog;
const $ = (selector) => document.querySelector(selector);
const params = new URLSearchParams(location.search);
const selectedFromUrl = catalog.find((item) => item.id === params.get('design'));
let design = selectedFromUrl?.id || 'design-01';
const initialData = {
  nameOne: '', nameTwo: '', families: '', city: '', venue: '', address: '', message: '',
  rsvpPhone: '',
  events: [{ title: 'Wedding ceremony', date: '', time: '', place: '', description: '', attire: '', mapUrl: '' }],
};
const draftKey = (id) => `invitation-studio-builder-${id}-v1`;
function loadDraft(id) {
  try {
    const saved = JSON.parse(localStorage.getItem(draftKey(id)) || 'null');
    if (!saved || typeof saved !== 'object' || !Array.isArray(saved.events)) return null;
    return {
      ...structuredClone(initialData),
      ...Object.fromEntries(Object.keys(initialData).filter((key) => key !== 'events' && typeof saved[key] === 'string').map((key) => [key, saved[key]])),
      events: saved.events.slice(0, 8).filter((event) => event && typeof event === 'object').map((event) =>
        Object.fromEntries(Object.keys(initialData.events[0]).map((key) => [key, typeof event[key] === 'string' ? event[key] : '']))),
    };
  } catch { return null; }
}
let data = loadDraft(design) || structuredClone(initialData);
try {
  const transfer = JSON.parse(sessionStorage.getItem('invitation-studio-builder-transfer') || 'null');
  if (transfer?.design === design && transfer.invitation && typeof transfer.invitation === 'object') {
    data = { ...structuredClone(initialData), ...transfer.invitation, events: Array.isArray(transfer.invitation.events) ? transfer.invitation.events.slice(0, 8) : structuredClone(initialData.events) };
    localStorage.setItem(draftKey(design), JSON.stringify(data));
    sessionStorage.removeItem('invitation-studio-builder-transfer');
  }
} catch { /* Continue with the on-device draft. */ }
if (!data.events.length) data.events = structuredClone(initialData.events);
for (const [key, parameter] of [['nameOne', 'nameOne'], ['nameTwo', 'nameTwo']]) {
  if (params.get(parameter)?.trim()) data[key] = params.get(parameter).trim().slice(0, 28);
}
let step = 0;
let collection = 'All';
let search = '';
let previewView = 'cover';
let saveTimer;
const frame = $('#invitation-preview');
const previewDesign = () => catalog.find((item) => item.id === design);
const wording = {
  warm: 'With our families beside us, we would love to celebrate every joyful moment with you.',
  royal: 'Across the courtyards and beneath the lights, we invite you to share a celebration to remember.',
  modern: 'We are getting married. Join us for good company, happy moments, and the start of our next chapter.',
};
const presets = ['Haldi', 'Mehendi', 'Sangeet', 'Wedding ceremony', 'Reception', 'Nikah', 'Walima', 'Cocktails'];

function toast(message) {
  const node = $('#builder-toast');
  node.textContent = message;
  node.classList.add('is-visible');
  clearTimeout(node._timer);
  node._timer = setTimeout(() => node.classList.remove('is-visible'), 2700);
}
function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(draftKey(design), JSON.stringify(data));
      $('#draft-note').textContent = 'Draft saved on this device.';
    } catch { $('#draft-note').textContent = 'Draft saving is unavailable in this browser.'; }
  }, 280);
}
function previewPayload() {
  return {
    ...data,
    nameOne: data.nameOne.trim() || 'Meera',
    nameTwo: data.nameTwo.trim() || 'Arjun',
    families: data.families.trim() || 'Your families',
    city: data.city.trim() || 'Your city',
    venue: data.venue.trim() || 'Your venue',
    address: data.address.trim() || 'Your celebration address',
    message: data.message.trim() || 'Every moment will be better with you there.',
    events: data.events.map((event) => ({
      ...event,
      title: event.title.trim() || 'Your celebration',
      date: event.date || '2027-12-12',
      time: event.time || '17:00',
      place: event.place.trim() || 'Your place',
    })),
  };
}
function sendPreview() {
  if (frame.contentWindow) frame.contentWindow.postMessage({ type: 'invitation-preview-data', invitation: previewPayload() }, location.origin);
}
function refreshPreview() {
  sendPreview();
  renderSchedule();
  renderReview();
}
function loadPreview() {
  const item = previewDesign();
  $('#preview-design-name').textContent = item.name;
  $('#preview-full-link').href = `invitation.html?design=${design}`;
  frame.src = `invitation.html?design=${design}&embed=1&v=20261019`;
  refreshPreview();
}
frame.addEventListener('load', sendPreview);

function renderFilters() {
  const host = $('#design-filters');
  host.replaceChildren();
  for (const name of ['All', 'Heritage', 'Modern', 'Botanical', 'Paper', 'Destination']) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = name === 'Paper' ? 'Material' : name;
    button.setAttribute('aria-pressed', String(collection === name));
    button.addEventListener('click', () => { collection = name; renderFilters(); renderDesigns(); });
    host.append(button);
  }
}
function renderDesigns() {
  const matches = catalog.filter((item) =>
    (collection === 'All' || item.collection === collection) &&
    (!search || `${item.name} ${item.collection} ${item.description} ${item.finish}`.toLowerCase().includes(search)))
    .sort((a, b) => Number(b.id === design) - Number(a.id === design));
  const host = $('#design-grid');
  host.replaceChildren();
  for (const item of matches) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'design-choice';
    button.dataset.design = item.id;
    button.setAttribute('aria-pressed', String(item.id === design));
    button.setAttribute('aria-label', `Choose ${item.name}, ${item.collection} design`);
    const image = document.createElement('img');
    image.src = `assets/previews/${item.id}.webp`;
    image.alt = '';
    image.loading = 'lazy';
    image.decoding = 'async';
    const title = document.createElement('b');
    title.textContent = item.name;
    const category = document.createElement('small');
    category.textContent = `${item.collection} / ${item.finish}`;
    button.append(image, title, category);
    button.addEventListener('click', () => selectDesign(item.id));
    host.append(button);
  }
  $('#design-count').textContent = matches.length ? `${matches.length} directions to explore` : 'No designs match that search.';
}
function selectDesign(id) {
  if (design === id) return;
  design = id;
  history.replaceState(null, '', `${location.pathname}?design=${id}`);
  document.querySelectorAll('.design-choice').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.design === id)));
  loadPreview();
  persist();
}
$('#design-search').addEventListener('input', (event) => { search = event.target.value.trim().toLowerCase(); renderDesigns(); });

const fields = {
  'name-one': 'nameOne', 'name-two': 'nameTwo', families: 'families',
  city: 'city', venue: 'venue', address: 'address', message: 'message', 'rsvp-phone': 'rsvpPhone',
};
for (const [id, key] of Object.entries(fields)) {
  const input = document.getElementById(id);
  input.value = data[key];
  input.addEventListener('input', () => {
    data[key] = input.value;
    refreshPreview();
    persist();
  });
}
document.querySelectorAll('[data-wording]').forEach((button) => button.addEventListener('click', () => {
  data.message = wording[button.dataset.wording];
  $('#message').value = data.message;
  refreshPreview();
  persist();
  toast('Wording added. Make it your own.');
}));

function newEvent(title = '') {
  return { title, date: '', time: '', place: '', description: '', attire: '', mapUrl: '' };
}
function addEvent(title = '') {
  if (data.events.length >= 8) { toast('Eight ceremonies is the current limit.'); return; }
  data.events.push(newEvent(title));
  renderEvents();
  refreshPreview();
  persist();
  document.getElementById(`event-title-${data.events.length - 1}`)?.focus();
}
const presetHost = $('#event-presets');
for (const title of presets) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `+ ${title}`;
  button.addEventListener('click', () => addEvent(title));
  presetHost.append(button);
}
$('#add-custom-event').addEventListener('click', () => addEvent());

function renderEvents() {
  const host = $('#builder-events');
  host.replaceChildren();
  data.events.forEach((event, index) => {
    const card = document.createElement('article');
    card.className = 'builder-event';
    card.innerHTML = `<div class="event-heading"><span>Chapter ${String(index + 1).padStart(2, '0')}</span><div><button type="button" data-action="up" aria-label="Move chapter up">↑ Move</button> <button type="button" data-action="down" aria-label="Move chapter down">↓ Move</button> <button type="button" data-action="remove" aria-label="Remove chapter">Remove</button></div></div><div class="event-fields"><label class="field-wide">Ceremony <input data-key="title" id="event-title-${index}" maxlength="50" required /></label><label>Date <input data-key="date" type="date" required /></label><label>Start time (IST) <input data-key="time" type="time" required /></label><label class="field-wide">Place or room <input data-key="place" maxlength="75" required /></label><label class="field-wide">Directions link (optional) <input data-key="mapUrl" type="url" pattern="https://.*" title="Enter a secure https:// link" maxlength="400" placeholder="https://maps.app.goo.gl/…" /></label><label class="field-wide">What guests should know <input data-key="description" maxlength="180" placeholder="A short description" /></label><label class="field-wide">Dress note <input data-key="attire" maxlength="90" placeholder="Optional" /></label></div>`;
    for (const input of card.querySelectorAll('[data-key]')) {
      input.value = event[input.dataset.key] || '';
      input.addEventListener('input', () => {
        data.events[index][input.dataset.key] = input.value;
        refreshPreview();
        persist();
      });
    }
    for (const button of card.querySelectorAll('[data-action]')) button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'remove') {
        if (data.events.length === 1) { toast('Keep at least one celebration.'); return; }
        data.events.splice(index, 1);
      } else {
        const next = index + (action === 'up' ? -1 : 1);
        if (next < 0 || next >= data.events.length) return;
        [data.events[index], data.events[next]] = [data.events[next], data.events[index]];
      }
      renderEvents();
      refreshPreview();
      persist();
    });
    card.querySelector('[data-action="up"]').disabled = index === 0;
    card.querySelector('[data-action="down"]').disabled = index === data.events.length - 1;
    card.querySelector('[data-action="remove"]').disabled = data.events.length === 1;
    host.append(card);
  });
  $('#add-custom-event').disabled = data.events.length >= 8;
  presetHost.querySelectorAll('button').forEach((button) => { button.disabled = data.events.length >= 8; });
}
function formatDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Date to be added';
  const date = new Date(`${value}T12:00:00+05:30`);
  return Number.isNaN(date.getTime()) ? 'Date to be added' : new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(date);
}
function renderSchedule() {
  const host = $('#schedule-preview');
  host.replaceChildren();
  const kicker = document.createElement('span');
  kicker.className = 'schedule-kicker';
  kicker.textContent = 'THE CELEBRATION';
  const heading = document.createElement('h3');
  heading.textContent = `${data.nameOne.trim() || 'Your name'} & ${data.nameTwo.trim() || 'their name'}`;
  host.append(kicker, heading);
  data.events.forEach((event, index) => {
    const card = document.createElement('article');
    const number = document.createElement('span');
    number.textContent = `CHAPTER ${String(index + 1).padStart(2, '0')}`;
    const title = document.createElement('b');
    title.textContent = event.title.trim() || 'Your celebration';
    const detail = document.createElement('p');
    detail.textContent = `${formatDate(event.date)} · ${event.time || 'Time to be added'} · ${event.place.trim() || 'Place to be added'}`;
    card.append(number, title, detail);
    host.append(card);
  });
}
function renderReview() {
  const host = $('#review-card');
  host.replaceChildren();
  const overline = document.createElement('span');
  overline.className = 'review-overline';
  overline.textContent = previewDesign().name.toUpperCase();
  const title = document.createElement('h3');
  title.textContent = `${data.nameOne.trim() || 'Your name'} & ${data.nameTwo.trim() || 'their name'}`;
  const place = document.createElement('p');
  place.textContent = `${data.venue.trim() || 'Your venue'} · ${data.city.trim() || 'Your city'}`;
  const list = document.createElement('ul');
  data.events.forEach((event, index) => {
    const item = document.createElement('li');
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    item.append(number, `${event.title || 'Ceremony'} · ${formatDate(event.date)}`);
    list.append(item);
  });
  host.append(overline, title, place, list);
}
document.querySelectorAll('[data-preview]').forEach((button) => button.addEventListener('click', () => {
  previewView = button.dataset.preview;
  document.querySelectorAll('[data-preview]').forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
  frame.hidden = previewView !== 'cover';
  $('#schedule-preview').hidden = previewView !== 'schedule';
}));

const headings = [
  ['01 / CHOOSE DESIGN', 'Which world feels like yours?'],
  ['02 / YOUR STORY', 'Start with your story.'],
  ['03 / CELEBRATIONS', 'Every moment has its place.'],
  ['04 / REVIEW & SHARE', 'Ready to open the doors?'],
];
function setStep(next, scroll = true) {
  step = next;
  $('.builder-workspace').setAttribute('aria-labelledby', ['step-title', 'story-title', 'events-title', 'review-title'][step]);
  document.querySelectorAll('.step-panel').forEach((panel) => { panel.hidden = Number(panel.dataset.panel) !== step; });
  document.querySelectorAll('.step-link').forEach((button) => {
    const index = Number(button.dataset.step);
    button.classList.toggle('is-active', index === step);
    button.classList.toggle('is-complete', index < step);
    if (index === step) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  $('#step-overline').textContent = headings[step][0];
  $('#step-counter').textContent = `STEP ${step + 1} OF 4`;
  $('#step-back').hidden = step === 0;
  $('#step-next').hidden = step === 3;
  $('#step-hint').textContent = ['Select a design to continue', 'Tell us who and where', 'Make every event clear', 'Your invitation is ready to review'][step];
  if (step === 3) renderReview();
  if (scroll) $('.builder-workspace').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}
function validateStep(index) {
  if (index !== 1 && index !== 2) return true;
  const panel = document.querySelector(`[data-panel="${index}"]`);
  for (const input of panel.querySelectorAll('input[required], input[type="url"]')) {
    if (!input.checkValidity()) {
      setStep(index);
      input.reportValidity();
      input.focus();
      return false;
    }
  }
  return true;
}
function validateAll() {
  if (!validateStep(1) || !validateStep(2)) return false;
  if (!$('#rsvp-phone').checkValidity()) { setStep(3); $('#rsvp-phone').reportValidity(); return false; }
  return true;
}
$('#step-next').addEventListener('click', () => {
  if (step < 3 && validateStep(step)) setStep(step + 1);
});
$('#step-back').addEventListener('click', () => setStep(Math.max(0, step - 1)));
document.querySelectorAll('.step-link').forEach((button) => button.addEventListener('click', () => {
  const target = Number(button.dataset.step);
  if (target > step) {
    for (let index = 1; index < target; index += 1) if (!validateStep(index)) return;
  }
  setStep(target);
}));
function encodedInvitation() {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function invitationUrl(forSharing = false) {
  const local = ['localhost', '127.0.0.1'].includes(location.hostname) || location.protocol === 'file:';
  const url = new URL(forSharing && local ? 'https://vikasbanjare.github.io/weeding-invites/invitation.html' : 'invitation.html', location.href);
  url.search = new URLSearchParams({ design }).toString();
  url.hash = `invite=${encodedInvitation()}`;
  return url.href;
}
$('#open-full-invitation').addEventListener('click', () => {
  if (validateAll()) location.href = invitationUrl();
});
$('#copy-builder-link').addEventListener('click', async () => {
  if (!validateAll()) return;
  const url = invitationUrl(true);
  try {
    await navigator.clipboard.writeText(url);
    $('#share-note').textContent = 'Invitation link copied. Anyone with the link can read its details, including your RSVP number.';
    toast('Invitation link copied');
  } catch {
    $('#share-note').textContent = 'Copy is unavailable. Open the complete invitation and use its Copy link action.';
  }
});

renderFilters();
renderDesigns();
renderEvents();
renderSchedule();
renderReview();
loadPreview();
setStep(0, false);
