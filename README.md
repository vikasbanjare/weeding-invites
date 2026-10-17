# Invitation Studio concept

![Invitation Studio template gallery](assets/demo-preview.webp)

An interactive concept gallery for three premium Indian wedding invitation styles:

- **The Royal Court:** palace architecture, burgundy, and warm gold.
- **Moonlit Mehfil:** celestial blue courtyard and lantern light.
- **The Garden Vow:** botanical mandap, ivory, and blush florals.

The scenes use original generated artwork, animated lighting and particles, and perspective-based depth. The names, occasion, date, venue, and city update live. The preview supports full-screen mode, a motion toggle, reduced-motion preferences, responsive layouts, and local browser saving.

**A GitHub repository displays these files; it does not run the website by itself.** This repository includes a GitHub Pages workflow for the interactive preview. After Pages is enabled in **Settings → Pages → Build and deployment → Source: GitHub Actions**, the site can be viewed at `https://vikasbanjare.github.io/weeding-invites/`. If the first workflow run fails before Pages is enabled, rerun **Deploy invitation preview** from the Actions tab after changing the setting.

Run it locally with no install step:

```sh
cd /workspace/weeding-invites
python3 -m http.server 4173
```

Open `http://localhost:4173` in a browser on the same machine where the server is running. This is a visual prototype: it does not yet publish invitations, collect RSVPs, take payments, or export video. The rendered scene artwork lives in `assets/`; original generated PNGs remain in `/workspace/generated_images`.
