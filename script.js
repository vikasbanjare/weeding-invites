const defaults = {
  theme: 'royal',
  nameOne: 'Ananya',
  nameTwo: 'Aarav',
  celebration: 'wedding',
  date: '2026-12-12',
  venue: 'The Leela Palace',
  city: 'Jaipur, India',
};

const celebrationLabels = {
  wedding: 'THE WEDDING CELEBRATION',
  sangeet: 'THE SANGEET NIGHT',
  engagement: 'THE ENGAGEMENT CEREMONY',
  reception: 'THE WEDDING RECEPTION',
};

const fields = {
  nameOne: document.getElementById('name-one'),
  nameTwo: document.getElementById('name-two'),
  celebration: document.getElementById('celebration'),
  date: document.getElementById('date'),
  venue: document.getElementById('venue'),
  city: document.getElementById('city'),
};

const card = document.getElementById('preview-card');
const motionButton = document.getElementById('motion-toggle');
const toast = document.getElementById('toast');
let toastTimer;
let state = { ...defaults };

function safeStorageGet() {
  try { return JSON.parse(localStorage.getItem('invitation-studio-demo') || 'null'); }
  catch { return null; }
}

function saveState() {
  try { localStorage.setItem('invitation-studio-demo', JSON.stringify(state)); }
  catch { /* The preview still works when local storage is unavailable. */ }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2500);
}

function displayDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'DATE TO BE ANNOUNCED';
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'DATE TO BE ANNOUNCED';
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }).format(date).toUpperCase();
}

function render() {
  document.body.dataset.theme = state.theme;
  document.getElementById('name-one-preview').textContent = state.nameOne.trim() || 'Your name';
  document.getElementById('name-two-preview').textContent = state.nameTwo.trim() || 'Their name';
  const longestName = Math.max(state.nameOne.trim().length, state.nameTwo.trim().length);
  card.classList.toggle('is-compact', longestName > 12 || state.venue.trim().length > 26);
  card.style.setProperty('--name-size', longestName > 17 ? 'clamp(22px,2.4vw,34px)' : longestName > 12 ? 'clamp(26px,2.8vw,38px)' : 'clamp(32px,4vw,52px)');
  document.getElementById('ornament-glyph').textContent = state.theme === 'garden' ? '✿' : state.theme === 'moonlit' ? '✧' : '✦';
  document.getElementById('card-ceremony').textContent = celebrationLabels[state.celebration] || celebrationLabels.wedding;
  document.getElementById('date-preview').textContent = displayDate(state.date);
  document.getElementById('venue-preview').textContent = state.venue.trim().toUpperCase() || 'YOUR VENUE';
  document.getElementById('city-preview').textContent = state.city.trim().toUpperCase() || 'YOUR CITY';
  document.querySelectorAll('.style-option').forEach(button => {
    const selected = button.dataset.style === state.theme;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('.scene-image').forEach(image => image.classList.toggle('is-active', image.dataset.scene === state.theme));
  document.querySelector('.intro-index').textContent = `${String(['royal', 'moonlit', 'garden'].indexOf(state.theme) + 1).padStart(2, '0')} / 03`;
  saveState();
}

const stored = safeStorageGet();
if (stored && typeof stored === 'object') {
  for (const key of Object.keys(defaults)) {
    if (typeof stored[key] === 'string') state[key] = stored[key];
  }
}
if (!['royal', 'moonlit', 'garden'].includes(state.theme)) state.theme = defaults.theme;
const requestedDetails = new URLSearchParams(location.search);
const requestedStyle = requestedDetails.get('style');
for (const key of ['nameOne', 'nameTwo']) {
  const value = requestedDetails.get(key);
  if (value && value.trim()) state[key] = value.trim().slice(0, 22);
}
if (['royal', 'moonlit', 'garden'].includes(requestedStyle)) state.theme = requestedStyle;
if (!Object.hasOwn(celebrationLabels, state.celebration)) state.celebration = defaults.celebration;
for (const [key, input] of Object.entries(fields)) input.value = state[key];
render();

document.querySelectorAll('.style-option').forEach(button => button.addEventListener('click', () => {
  state.theme = button.dataset.style;
  render();
}));

for (const [key, input] of Object.entries(fields)) {
  input.addEventListener(key === 'celebration' || key === 'date' ? 'change' : 'input', () => {
    state[key] = input.value;
    render();
  });
}

document.getElementById('editor-form').addEventListener('submit', event => event.preventDefault());
document.getElementById('reset-button').addEventListener('click', () => {
  state = { ...defaults };
  for (const [key, input] of Object.entries(fields)) input.value = state[key];
  render();
  showToast('Example details restored');
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionOn = !reducedMotion.matches;
function renderMotion() {
  document.body.dataset.motion = motionOn ? 'on' : 'off';
  motionButton.setAttribute('aria-pressed', String(motionOn));
  motionButton.innerHTML = `<span class="button-icon" aria-hidden="true">◌</span> Motion ${motionOn ? 'on' : 'off'}`;
  if (!motionOn) {
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
    card.style.removeProperty('--layer-x');
    card.style.removeProperty('--layer-y');
    card.style.removeProperty('--particle-x');
    card.style.removeProperty('--particle-y');
  }
}
renderMotion();
motionButton.addEventListener('click', () => { motionOn = !motionOn; renderMotion(); });
reducedMotion.addEventListener('change', event => { motionOn = !event.matches; renderMotion(); });

card.addEventListener('pointermove', event => {
  if (!motionOn || event.pointerType === 'touch') return;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  card.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
  card.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
  card.style.setProperty('--layer-x', `${(-x * 12).toFixed(2)}px`);
  card.style.setProperty('--layer-y', `${(-y * 12).toFixed(2)}px`);
  card.style.setProperty('--particle-x', `${(x * 18).toFixed(2)}px`);
  card.style.setProperty('--particle-y', `${(y * 18).toFixed(2)}px`);
});
card.addEventListener('pointerleave', () => {
  card.style.removeProperty('--rx');
  card.style.removeProperty('--ry');
  card.style.removeProperty('--layer-x');
  card.style.removeProperty('--layer-y');
  card.style.removeProperty('--particle-x');
  card.style.removeProperty('--particle-y');
});

const particles = document.getElementById('particles');
for (let i = 0; i < 22; i += 1) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  particle.style.setProperty('--left', `${(i * 47 + 13) % 97}%`);
  particle.style.setProperty('--top', `${(i * 31 + 7) % 90}%`);
  particle.style.setProperty('--duration', `${4 + (i % 5) * 1.7}s`);
  particle.style.setProperty('--delay', `${-i * .7}s`);
  particles.appendChild(particle);
}

document.getElementById('fullscreen-button').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await card.requestFullscreen();
  } catch { showToast('Full screen is unavailable in this browser'); }
});
