# Invitation Studio

An Indian wedding invitation concept site with a full editorial homepage, 50 browsable design directions, three free interactive card styles, and one scrollable signature invitation.

Visit the [live homepage](https://vikasbanjare.github.io/weeding-invites/). The catalog is organized into Heritage, Modern, Botanical, Paper and Destination collections. Visitors can search, filter by format, try their names on every design, save a shortlist in their browser, and download that shortlist as a text brief. Each paper, vellum, foil, linen and letterpress treatment is a visual direction rather than a physical printed product. Original artwork includes a marigold paper study, modern geometric arches, and a Chettinad-inspired courtyard.

The [free style studio](https://vikasbanjare.github.io/weeding-invites/studio.html) contains Royal Court, Moonlit Mehfil and Garden Vow. Names, occasion, date and location update live. The [Palace Edit](https://vikasbanjare.github.io/weeding-invites/palace.html) adds a scrollable palace setting, fictional couple portrait, editable ceremony programme, travel directions, a shareable invitation link and downloadable keepsakes. It supports up to eight events, each with its own date, time, place, description and dress note, and respects reduced-motion preferences.

The Palace Edit's **Copy invitation link** and **Share on WhatsApp** actions encode invitation details in a public URL fragment. Anyone with that URL can read them; social preview cards remain generic. **Download motion invite** records a personalized 540 × 960 video in the browser, using MP4 where supported and WebM otherwise. A PNG card and `.ics` calendar are also available. Chromium successfully rendered an H.264 MP4 with five events on 18 October 2026.

The 50 catalog entries are selectable design concepts, with four live experiences among them. Checkout, physical printing, print-ready files, a guest RSVP backend, private invitation hosting, bespoke character animation and production ordering are still in development. The names, dates, venues and illustrated people in the previews are fictional.

Run locally with no install step:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/` from a browser on the same machine. GitHub Pages deploys the static site from `.github/workflows/pages.yml` after pushes to `main`.
