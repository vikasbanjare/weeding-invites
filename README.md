# Invitation Studio

An Indian wedding invitation concept site with a cinematic, scene-led homepage, 50 complete editable invitation websites, ten art-direction families, three original free style scenes and the original Palace Edit. The homepage opens with a cream-and-burgundy film showcase: three real muted sample videos, contrasting invitation cards and the full collection immediately below. Playback respects reduced-motion preferences until explicitly started. Every card has a direct open link, and the initial twelve links are also rendered in HTML so browsing does not depend on JavaScript. The homepage also includes a personalized, tap-to-open palace-door reveal with three atmospheres; names and style carry into the full invitation editor. Selectable cotton, vellum and foil studies and an interactive three-chapter ceremony preview make the creative direction tangible. The homepage uses pointer-responsive depth and a scroll-driven sequence through the Royal, Moonlit and Garden worlds; reduced-motion settings are respected.

Visit the [live homepage](https://vikasbanjare.github.io/weeding-invites/). The design index is organized into Heritage, Modern, Botanical, Paper and Destination collections. Visitors can search, filter by format, open every design as a complete website, try their names in a quick look, save a shortlist in their browser, and download that shortlist as a text brief. Each catalog thumbnail is captured from its actual invitation page. Paper, vellum, foil, linen and letterpress treatments are visual directions rather than physical printed products. Scene artwork includes the Royal Court, Moonlit Mehfil, Garden Vow, marigold paper study, modern geometric arches and Chettinad-inspired courtyard. Bundled Instrument Sans and Instrument Serif fonts are licensed under the SIL Open Font License; license texts are in `assets/fonts/`.

The [free style studio](https://vikasbanjare.github.io/weeding-invites/studio.html) contains Royal Court, Moonlit Mehfil and Garden Vow. Names, occasion, date and location update live. The [Palace Edit](https://vikasbanjare.github.io/weeding-invites/palace.html) adds a scrollable palace setting, fictional couple portrait, editable ceremony programme, travel directions, a shareable invitation link and downloadable keepsakes. It supports up to eight events, each with its own date, time, place, description and dress note, and respects reduced-motion preferences.

The Palace Edit's **Copy invitation link** and **Share on WhatsApp** actions encode invitation details in a public URL fragment. Anyone with that URL can read them; social preview cards remain generic. **Download motion invite** records a personalized 540 × 960 video in the browser, using MP4 where supported and WebM otherwise. A PNG card and `.ics` calendar are also available. Chromium successfully rendered an H.264 MP4 with five events on 18 October 2026.

All 50 catalog entries open `invitation.html?design=design-NN`. Ten layout families (royal, courtyard, editorial, sculpture, botanical, paper, ribbon, nocturne, landscape and museum) combine distinct palettes, scenes, typography and seven ceremony arrangements. Every page supports editing up to eight events, separate local drafts per design, URL-based sharing, a PNG card, calendar and browser-recorded video. The opt-in “Play the story” control moves through the full website; scrolling, touch, Escape or opening the editor pauses it. Motion can be turned off and reduced-motion preferences are respected. These are layered CSS/parallax scenes, not real-time 3D models. Checkout, physical printing, print-ready files, a guest RSVP backend, private invitation hosting, bespoke character animation and production ordering are still in development. The names, dates, venues and illustrated people in the previews are fictional.

The 19 October reference pass is recorded in [DESIGN.md](DESIGN.md). The full invitations now show a countdown to the next ceremony. Hosts can edit their invitation message, start from three wording suggestions and optionally add a WhatsApp RSVP number. If a number is set, guests can select ceremonies and party size, add a note and open a prepared WhatsApp message to review and send. Responses stay in WhatsApp; there is no RSVP database. The phone number is part of the public invitation link and visible to recipients.

The [guided creator](https://vikasbanjare.github.io/weeding-invites/builder.html) now connects browsing to a finished invitation in four steps: choose from the 50 designs, write the couple's story, arrange up to eight ceremonies, and review/share. It has a live cover and schedule preview, collection filters, quick ceremony additions, per-event HTTPS directions links, wording starters, local draft saving, and an optional WhatsApp RSVP number. The homepage's primary create actions and every catalog card enter this flow; the full invitation still has a quick editor and can hand its current details back to the guided creator. Drafts are stored in the current browser, and the public link carries invitation details in its URL fragment. There is no account or private storage.

Six featured directions link to complete examples on the homepage: Royal Court's ornate entrance, Vellum Layer's unfolding stationery, three different door scenes (Garden Vow, Jasmine Courtyard and Moonlit Mehfil), and Desert Sky's destination website. Each door scene has a distinct closed cover and a door-free ceremony scene behind it. The guided creator switches these previews between closed and opened states and starts at the cover when a new design is selected. The artwork and CSS animation are original to this project, while the reference sites informed the interaction and presentation. These are browser animations, not copies of the reference videos.

The Royal Court sample film on the homepage now begins with the same original door opening before moving into the ceremony chapters. It is a 540 × 960 H.264 MP4 with no audio and remains muted and user-controllable on the homepage.

Run locally with no install step:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/` from a browser on the same machine. GitHub Pages deploys the static site from `.github/workflows/pages.yml` after pushes to `main`.


Development notes:

- `designs.js` is the shared catalog; `invitation.js` defines art direction, playback and design-specific export rendering.
- `palace.js` provides the shared editing, storage, sharing and export logic and also supports the original `palace.html` page.
- Six original vector scenes in `assets/scenes/` supplement the existing palace, courtyard and botanical imagery.
- Catalog thumbnails are optimized WebP files in `assets/previews/` (about 1.3 MB for all fifty).
- Social preview metadata is generic; personalized invitation details live in the shared URL fragment.

With the local server running, use `python3 tests/invitations_smoke.py` to test all fifty routes, desktop/mobile layouts, origin-clean export canvases, editor persistence, eight-event programmes, live preview draft isolation, fresh-context sharing, playback, downloads and catalog navigation. This check requires the Python Playwright package and Chromium at `/usr/bin/chromium`; there is no runtime dependency for the website. Set `INVITE_PREVIEWS=1` to regenerate catalog thumbnails (also requires Pillow).

Use `python3 tests/builder_smoke.py` to test the guided path from design selection through public-link opening, including mobile layout and draft recovery.

Use `python3 tests/signature_smoke.py` to check the tap-to-open covers, builder preview states, featured designs and mobile layout.

Video verification: representative portrait, vellum and vector landscape designs produced playable 540 × 960 H.264 MP4 files with five ceremony chapters in Chromium on 18 October 2026. Video is a separately rendered animated keepsake; browser export support varies.

The 19 October homepage refresh uses `showroom.css` and three compressed MP4 samples in `assets/films/` (about 1.1 MB total). Versioned stylesheet and script URLs keep the new page assets together. Invitation motion starts according to the system preference; an explicit Motion on choice now enables parallax and cinematic scrolling even when the system prefers reduced motion.

Run `python3 tests/showroom_smoke.py` with the local server running to verify film switching, autoplay/pause, six responsive widths, direct invitation links, explicit reduced-motion override and static catalog fallback.
