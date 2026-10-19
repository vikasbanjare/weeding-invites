"""Run against a local static server on port 4173; requires Playwright and Chromium."""
from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1440,'height':1000});errors=[];bad=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('response',lambda r:bad.append([r.status,r.url]) if r.status>=400 else None)
 page.goto('http://127.0.0.1:4173',wait_until='networkidle')
 page.wait_for_function('document.querySelector("#showroom-video").currentTime>0.2')
 page.screenshot(path='/tmp/showroom-desktop.png')
 assert page.evaluate('document.querySelector(".hero").nextElementSibling.id')=='catalog'
 page.locator('#showroom-play').click()
 assert page.locator('#showroom-video').evaluate('(v)=>v.paused')
 for key,design in [('paper','design-33'),('desert','design-45'),('royal','design-01')]:
  page.locator(f'[data-film={key}]').click()
  assert design in page.locator('#showroom-open').get_attribute('href')
  page.locator('#showroom-play').click()
  page.wait_for_function('document.querySelector("#showroom-video").currentTime>0.1')
  page.locator('#showroom-play').click()
 for width in [320,390,650,768,1024,1440]:
  page.set_viewport_size({'width':width,'height':900})
  assert page.evaluate('document.documentElement.scrollWidth===innerWidth'),width
  if width==390:page.screenshot(path='/tmp/showroom-mobile.png')
 # Controls are real navigation links, independent of card hover or dialogs.
 page.locator('.open-invitation-link').first.click();page.wait_for_url('**/invitation.html?*')
 assert page.locator('.event-card').count()==5
 page.emulate_media(reduced_motion='reduce');page.reload(wait_until='networkidle')
 assert page.locator('#toggle-depth').get_attribute('aria-pressed')=='false'
 assert page.locator('.hero-backdrop').evaluate('(el)=>getComputedStyle(el).animationName')=='none'
 page.locator('#toggle-depth').click()
 assert page.locator('.hero-backdrop').evaluate('(el)=>getComputedStyle(el).animationName')=='scene-breathe'
 page.locator('#play-story').click();page.wait_for_timeout(1000)
 assert page.evaluate('scrollY>0')
 page.locator('#play-story').click()
 # Reduced-motion default also pauses the homepage film until the user opts in.
 page.goto('http://127.0.0.1:4173',wait_until='networkidle')
 assert page.locator('#showroom-video').evaluate('(v)=>v.paused')
 page.locator('#showroom-play').click();page.wait_for_function('document.querySelector("#showroom-video").currentTime>0.1')
 assert not errors,errors
 assert not bad,bad
 print(json.dumps({'homepage_films':3,'widths':6,'navigation':'passed','reduced_motion_opt_in':'passed','errors':errors}))
 nojs=b.new_page(java_script_enabled=False)
 nojs.goto('http://127.0.0.1:4173')
 assert nojs.locator('.open-invitation-link').count()==12
 print('Static catalog links remain visible without JavaScript.')
 b.close()
