"""Browser smoke checks. Run a static server first; requires Python Playwright + Chromium.
INVITE_BASE defaults to http://127.0.0.1:4173. INVITE_PREVIEWS=1 also rebuilds catalog thumbnails.
"""
import hashlib
import json
import os
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright

BASE = os.environ.get('INVITE_BASE', 'http://127.0.0.1:4173')
ROOT = Path(__file__).resolve().parents[1]

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':1280,'height':1000}, reduced_motion='reduce')
    errors, bad_assets, families, signatures = [], [], set(), set()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('response', lambda response: bad_assets.append(response.url) if response.status >= 400 else None)
    for number in range(1, 51):
        design_id = f'design-{number:02}'
        page.goto(f'{BASE}/invitation.html?design={design_id}', wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        assert page.locator('.event-card').count() == 5, design_id
        config = page.evaluate('({id:INVITATION_DESIGN.id,family:INVITATION_DESIGN.family,name:INVITATION_DESIGN.name})')
        assert config['id'] == design_id
        families.add(config['family'])
        assert page.locator('.nav-monogram span').inner_text() == config['name']
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), design_id
        # Every export scene must render to an origin-clean canvas, including SVG artwork.
        image_data = page.evaluate('''async () => {
          await getArtwork(); const canvas=document.createElement('canvas');
          canvas.width=540;canvas.height=960;
          drawFrame(canvas.getContext('2d'),540,960,'intro',0.2);
          return canvas.toDataURL('image/png');
        }''')
        assert len(image_data) > 10000, design_id
        signatures.add(hashlib.sha256(image_data.encode()).hexdigest())
        page.set_viewport_size({'width':390,'height':844})
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), design_id
        assert page.locator('#hero-title').evaluate('(el)=>el.scrollWidth<=el.clientWidth'), design_id
        if os.environ.get('INVITE_PREVIEWS') == '1':
            from PIL import Image
            from io import BytesIO
            page.add_style_tag(content='.reveal-seal{visibility:hidden}.palace-nav{visibility:hidden}.hero-bottom{visibility:hidden}')
            screenshot = page.locator('.palace-hero').screenshot()
            folder = ROOT / 'assets' / 'previews'
            folder.mkdir(exist_ok=True)
            Image.open(BytesIO(screenshot)).convert('RGB').save(folder / f'{design_id}.webp', quality=82)
        page.set_viewport_size({'width':1280,'height':1000})
    assert len(families) == 10
    assert len(signatures) == 50
    # Edit, share, reload and isolate details between designs.
    page.goto(f'{BASE}/invitation.html?design=design-33&nameOne=Kavya&nameTwo=Rohan')
    assert page.locator('#hero-title').inner_text().replace('\n',' ').startswith('Kavya')
    page.locator('#open-editor').click()
    page.locator('#palace-editor input[name=nameOne]').fill('Aditi & Tara')
    page.locator('#palace-editor input[name=venue]').fill('The Test Courtyard')
    page.locator('#editor-events input[name=title]').first.fill('Welcome dinner')
    for _ in range(3): page.locator('#add-event').click()
    assert page.locator('#add-event').is_disabled()
    for field in page.locator('.event-fieldset').all()[5:]:
        for name, value in {'title':'Celebration','date':'2027-02-22','time':'18:30','place':'Garden'}.items():
            field.locator(f'input[name={name}]').fill(value)
    page.locator('#palace-editor button[type=submit]').click()
    assert page.locator('.event-card').count() == 8
    shared = page.evaluate('shareUrl()')
    assert 'design=design-33' in shared
    # Open shared data in a fresh context, so it cannot pass by relying on localStorage.
    guest = browser.new_page(viewport={'width':390,'height':844})
    guest.goto(BASE + '/invitation.html?' + urlsplit(shared).query + '#' + urlsplit(shared).fragment)
    assert guest.locator('[data-name-one]').first.inner_text() == 'Aditi & Tara'
    assert guest.locator('.event-card').count() == 8
    assert guest.locator('[data-venue]').inner_text() == 'The Test Courtyard'
    guest.close()
    page.goto(f'{BASE}/invitation.html?design=design-34')
    assert page.locator('[data-name-one]').first.inner_text() == 'Meera'
    page.goto(f'{BASE}/invitation.html?design=design-33')
    assert page.locator('[data-name-one]').first.inner_text() == 'Aditi & Tara'
    assert page.locator('.event-card').count() == 8
    # Keyboard entrance, opt-in playback and motion controls.
    page.locator('#reveal-seal').focus(); page.keyboard.press('Enter')
    page.wait_for_timeout(100)
    assert page.locator('#reveal-seal').get_attribute('aria-expanded') == 'true'
    page.locator('#play-story').click()
    assert page.locator('#play-story').get_attribute('aria-pressed') == 'true'
    page.keyboard.press('Escape')
    assert page.locator('#play-story').get_attribute('aria-pressed') == 'false'
    assert page.locator('#toggle-depth').get_attribute('aria-pressed') == 'false'
    with page.expect_download() as download:
        page.locator('#download-card').click()
    assert download.value.suggested_filename.endswith('.png')
    with page.expect_download() as download:
        page.locator('#download-calendar').click()
    assert download.value.suggested_filename.endswith('.ics')
    # Catalog routes and personalized quick-look handoff.
    page.goto(BASE)
    while page.locator('#show-more').is_visible(): page.locator('#show-more').click()
    links = page.locator('.template-open').evaluate_all('(nodes)=>nodes.map(n=>n.getAttribute("href"))')
    assert len(set(links)) == 50
    assert all(link.startswith('invitation.html?design=design-') for link in links)
    page.evaluate("localStorage.setItem('invitation-studio-design-01-v1', JSON.stringify({nameOne:'Stored Person'}))")
    page.locator('.quick-look').first.click()
    page.locator('#preview-name-one').fill('Neha')
    preview=page.frame_locator('.live-design-frame')
    preview.locator('[data-name-one]').first.wait_for()
    page.wait_for_function("document.querySelector('.live-design-frame').contentDocument.querySelector('[data-name-one]').textContent === 'Neha'")
    assert page.evaluate("JSON.parse(localStorage.getItem('invitation-studio-design-01-v1')).nameOne") == 'Stored Person'
    page.locator('#dialog-live').click()
    page.wait_for_url('**/invitation.html?*')
    assert page.locator('[data-name-one]').first.inner_text() == 'Neha'
    assert not errors, errors
    assert not bad_assets, bad_assets
    print(json.dumps({'designs':50,'layout_families':len(families),'unique_export_frames':len(signatures),'share_edit_download_playback':'passed','browser_errors':errors}))
    browser.close()
