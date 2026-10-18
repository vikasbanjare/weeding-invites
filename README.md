# Invitation Studio

An Indian wedding invitation concept site with a cinematic, scene-led homepage, 50 complete editable invitation websites, ten art-direction families, three original free style scenes and the original Palace Edit. The homepage includes a personalized, tap-to-open palace-door reveal with three atmospheres; names and style carry into the full invitation editor. Selectable cotton, vellum and foil studies and an interactive three-chapter ceremony preview make the creative direction tangible. The homepage uses pointer-responsive depth and a scroll-driven sequence through the Royal, Moonlit and Garden worlds; reduced-motion settings are respected.

Visit the [live homepage](https://vikasbanjare.github.io/weeding-invites/). The design index is organized into Heritage, Modern, Botanical, Paper and Destination collections. Visitors can search, filter by format, open every design as a complete website, try their names in a quick look, save a shortlist in their browser, and download that shortlist as a text brief. Each catalog thumbnail is captured from its actual invitation page. Paper, vellum, foil, linen and letterpress treatments are visual directions rather than physical printed products. Scene artwork includes the Royal Court, Moonlit Mehfil, Garden Vow, marigold paper study, modern geometric arches and Chettinad-inspired courtyard. Bundled Instrument Sans and Instrument Serif fonts are licensed under the SIL Open Font License; license texts are in `assets/fonts/`.

The [free style studio](https://vikasbanjare.github.io/weeding-invites/studio.html) contains Royal Court, Moonlit Mehfil and Garden Vow. Names, occasion, date and location update live. The [Palace Edit](https://vikasbanjare.github.io/weeding-invites/palace.html) adds a scrollable palace setting, fictional couple portrait, editable ceremony programme, travel directions, a shareable invitation link and downloadable keepsakes. It supports up to eight events, each with its own date, time, place, description and dress note, and respects reduced-motion preferences.

The Palace Edit's **Copy invitation link** and **Share on WhatsApp** actions encode invitation details in a public URL fragment. Anyone with that URL can read them; social preview cards remain generic. **Download motion invite** records a personalized 540 × 960 video in the browser, using MP4 where supported and WebM otherwise. A PNG card and `.ics` calendar are also available. Chromium successfully rendered an H.264 MP4 with five events on 18 October 2026.

All 50 catalog entries open `invitation.html?design=design-NN`. Ten layout families (royal, courtyard, editorial, sculpture, botanical, paper, ribbon, nocturne, landscape and museum) combine distinct palettes, scenes, typography and seven ceremony arrangements. Every page supports editing up to eight events, separate local drafts per design, URL-based sharing, a PNG card, calendar and browser-recorded video. The opt-in “Play the story” control moves through the full website; scrolling, touch, Escape or opening the editor pauses it. Motion can be turned off and reduced-motion preferences are respected. These are layered CSS/parallax scenes, not real-time 3D models. Checkout, physical printing, print-ready files, a guest RSVP backend, private invitation hosting, bespoke character animation and production ordering are still in development. The names, dates, venues and illustrated people in the previews are fictional.

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

Video verification: representative portrait, vellum and vector landscape designs produced playable 540 × 960 H.264 MP4 files with five ceremony chapters in Chromium on 18 October 2026. Video is a separately rendered animated keepsake; browser export support varies.
