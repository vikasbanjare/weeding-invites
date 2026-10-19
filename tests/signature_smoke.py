"""Check the visual opening interactions and the four featured directions."""
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4173"

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path="/usr/bin/chromium", headless=True, args=["--no-sandbox"])
    page = browser.new_page(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))

    for design, opening in (("01", "door"), ("21", "floral"), ("33", "paper"), ("41", "door")):
        page.goto(f"{BASE}/invitation.html?design=design-{design}&nameOne=Anika&nameTwo=Kabir")
        assert page.locator("#reveal-seal").get_attribute("aria-expanded") == "false"
        assert page.locator("body").evaluate("el => el.classList.contains('entrance-closed')")
        cover = {"paper": ".paper-cover", "floral": ".floral-door-story"}.get(opening, ".royal-gate-story")
        assert page.locator(cover).is_visible()
        assert "Anika" in page.locator(cover).inner_text()
        page.locator("#reveal-seal").click()
        assert page.locator("#reveal-seal").get_attribute("aria-expanded") == "true"
        assert not page.locator("body").evaluate("el => el.classList.contains('entrance-closed')")
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")

    page.goto(f"{BASE}/invitation.html?design=design-45")
    assert "samode palace" in page.locator("#hero-feature-place").inner_text().lower()
    page.locator("#open-editor").click()
    page.locator('#palace-editor input[name="venue"]').fill("Desert Courtyard")
    page.locator('#palace-editor button[type="submit"]').click()
    assert "desert courtyard" in page.locator("#hero-feature-place").inner_text().lower()

    page.goto(f"{BASE}/builder.html?design=design-01")
    page.wait_for_function("document.querySelector('#invitation-preview').contentDocument?.body?.classList.contains('entrance-closed')")
    assert page.locator('[data-preview="inside"]').is_visible()
    page.locator('[data-preview="inside"]').click()
    page.wait_for_function("!document.querySelector('#invitation-preview').contentDocument.body.classList.contains('entrance-closed')")
    page.locator('[data-preview="cover"]').click()
    page.wait_for_function("document.querySelector('#invitation-preview').contentDocument.body.classList.contains('entrance-closed')")

    page.goto(BASE)
    assert page.locator(".signature-grid article").count() == 4
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
    assert not errors, errors
    browser.close()
    print("Signature invitation covers, preview controls, four featured designs, and mobile layout passed.")
