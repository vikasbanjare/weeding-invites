"""Exercise the guided creator against the local server on port 4173."""
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4173"

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path="/usr/bin/chromium", headless=True, args=["--no-sandbox"])
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(f"{BASE}/builder.html?design=design-33", wait_until="networkidle")
    assert page.locator(".design-choice").count() == 50
    assert page.locator('.design-choice[aria-pressed="true"]').get_attribute("data-design") == "design-33"
    page.locator("#step-next").click()
    page.locator("#name-one").fill("Anika")
    page.locator("#name-two").fill("Kabir")
    page.locator("#families").fill("The Rao and Shah families")
    page.locator("#city").fill("Jaipur")
    page.locator("#venue").fill("City Palace")
    page.locator("#address").fill("Old City, Jaipur")
    page.locator('[data-wording="royal"]').click()
    assert "courtyards" in page.locator("#message").input_value()
    page.locator("#step-next").click()
    event = page.locator(".builder-event").first
    event.locator('[data-key="date"]').fill("2027-01-15")
    event.locator('[data-key="time"]').fill("17:00")
    event.locator('[data-key="place"]').fill("Durbar Hall")
    event.locator('[data-key="mapUrl"]').fill("https://maps.example.org/venue")
    page.locator("#event-presets button", has_text="Haldi").click()
    assert page.locator(".builder-event").count() == 2
    event = page.locator(".builder-event").nth(1)
    event.locator('[data-key="date"]').fill("2027-01-14")
    event.locator('[data-key="time"]').fill("12:00")
    event.locator('[data-key="place"]').fill("Garden")
    page.locator('[data-preview="schedule"]').click()
    assert page.locator("#schedule-preview article").count() == 2
    page.locator("#step-next").click()
    page.locator("#rsvp-phone").fill("+91 98765 43210")
    page.locator("#open-full-invitation").click()
    page.wait_for_url("**/invitation.html?*#invite=*")
    assert page.locator(".event-card").count() == 2
    assert page.locator(".event-card").first.locator('a[href="https://maps.example.org/venue"]').count() == 1
    assert page.locator("#open-rsvp").is_visible()
    assert not errors, errors

    # Changes in the complete invitation can return to the guided form.
    page.locator("#open-editor").click()
    page.locator("#editor-dialog [data-guided-builder]").click()
    page.wait_for_url("**/builder.html?design=design-33")
    page.locator('[data-step="1"]').click()
    assert page.locator("#name-one").input_value() == "Anika"
    assert page.locator("#venue").input_value() == "City Palace"
    page.reload(wait_until="networkidle")
    page.locator('[data-step="1"]').click()
    assert page.locator("#name-one").input_value() == "Anika"

    for width in (360, 390, 768, 1280):
        page.set_viewport_size({"width": width, "height": 900})
        assert page.evaluate("document.documentElement.scrollWidth === innerWidth"), width
    page.set_viewport_size({"width": 390, "height": 900})
    assert page.locator(".builder-workspace").evaluate("el => el.getBoundingClientRect().top") < page.locator(".builder-preview").evaluate("el => el.getBoundingClientRect().top")
    browser.close()
    print("Guided creator: 50 designs, event and map editing, public invite, return, draft, and responsive layout passed.")
