# Reference design and function map

Captured 19 October 2026 through Firecrawl with a fresh fetch (`maxAge: 0`). All four supplied pages returned HTTP 200. Their page text, extracted branding and HTML were readable. Full-page screenshot URLs were returned, but the execution environment returned HTTP 403 when downloading their pixels. Visual layout notes below are therefore supported by page structure and styles, not by direct screenshot inspection. Mobile, hover and animation behavior were not established by these captures.

## Reference pages

| Site | Observed page structure and interactions | Extracted visual system |
| --- | --- | --- |
| [Aamantran Royal](https://www.aamantran.online/templates/royal-64993) | Template detail with desktop and phone previews, live demo, try with your names, explicit feature and input lists, other designs, reviews, price and purchase route. The page describes guided editing, per-ceremony RSVP, guest list export, photos and music. These are claims on the reference page; they were not tested in an account. | Firecrawl branding: cream `#FBF7F0`, burgundy `#712F41`, body gray `#6B625B`; Cormorant Garamond heading and DM Sans body; rounded burgundy primary button. Royal art is described as palace arches, peacocks and elephants. [Preview asset](https://media.aamantran.online/templates/royal-64993/thumbnails/desktop-thumbnail-c3ad254fc0.png). |
| [PaperPlanes India](https://paperplanesindia.com/) | Broad editorial home with invitation, stationery and journal navigation; rotating hero imagery; “New & Noteworthy” product cards; print and digital invitation links; craft and correspondence messaging. This is an atelier and product showcase, not a DIY builder on the captured home page. | Firecrawl branding: white `#FFFFFF`, ink `#1C1C1C`, muted gold `#D8B66D`/`#D4BC8A`; Garamond-style display and Montserrat body; thin outlined square buttons. [Stationery image](https://paperplanesindia.com/cdn/shop/files/wedding-stationery-main-image1.jpg?v=1732007010&width=650). |
| [ShaadiPath templates](https://www.shaadipath.com/templates) | Category filter (All, Luxe, Royal, Festive, Minimal, Custom); many large design previews with sample names, date and live countdown; preview, customize and demo actions; Google Calendar and iCal links. The page states invitation, RSVP, gallery and dashboard are included. | Firecrawl branding: white and warm cream `#FAF3E8`, rust `#8B3C14`, muted gold `#C4985A`; Cormorant Garamond heading and DM Sans body; square low-contrast controls. Its preview markup references separate background, subject, foreground and ornament layers. [Sample palace layer](https://assets.shaadipath.com/templates/template01/assets/layers/Herp%20Palace.webp). |
| [InviteStory DIY](https://diy.invitestory.in/) | Tap-to-open architectural door preview; names-first personalization; editor content with details, design and extras; event itinerary, date reveal, countdown, maps, calendar and WhatsApp RSVP. Its page text also describes wording presets, local drafts, account editing and publishing. The captured HTML exposes these controls, but no payment or account flow was exercised. | Firecrawl branding: near-black `#0A0A0C`, antique gold `#DFC17D`, warm text `#C7BFAF`; Cormorant Garamond and Cinzel display, Montserrat supporting type; gold filled button with approximately 10 px rounding. [Door image](https://diy.invitestory.in/door-media/de7fbae7f67.jpg). |

## Shared product patterns

1. Show the design before asking for details. A phone-scale preview and sample couple make the result tangible.
2. Let visitors try names without paying or signing in. Move those names into the editor.
3. Give each ceremony its own time and location. Keep directions and calendar actions near the event information.
4. Make the opening feel ceremonial, using a door, layered scene, motion or paper treatment.
5. Make the sharing path explicit. Guests should understand whether an RSVP is sent to a host, stored in an account or merely drafted.
6. Explain what an invitation includes and the limits of hosting, editing and physical production without implying features that are not live.

## Invitation Studio implementation

The existing project already has 50 complete website designs, ten layout families, live name previews, saved shortlist, collection and format filters, scene-led landing sections, a door reveal, up to eight editable ceremonies, maps, calendar export, link sharing, PNG and video keepsakes. The local artwork and licensed fonts provide its own identity; external reference images are not bundled.

This pass adds a live countdown to the next ceremony, editable invitation wording with three quick presets, and optional WhatsApp RSVP. Guests choose the ceremonies, party size and a note, then review a prepared message in WhatsApp. The RSVP number is included in the public invitation link. There is no RSVP database or dashboard.

The next implementation step adds a four-part guided creator (`builder.html`) with a live cover and schedule preview. Visitors can filter and search all 50 designs, enter their story, add and reorder up to eight ceremonies, attach an HTTPS directions URL per event, and review a finished invitation link. Drafts save locally per design. Homepage creation links lead into the builder, and the full invitation can transfer its current data back for guided edits. On phones, form controls precede the expanded preview so the first action is visible immediately.

The follow-up visual pass extracts four distinct directions from the supplied pages: Aamantran's royal architectural presentation, PaperPlanes' tactile stationery and film presentation, ShaadiPath's layered wedding website previews, and InviteStory's tap-to-open architectural video. The InviteStory HTML contains a static poster, a `doorVideo` MP4, ambient dust/lantern layers, a tap overlay, and a freeze-frame canvas. PaperPlanes' home page exposes multiple autoplaying product MP4s with poster images. Direct retrieval of the reference video and screenshot URLs returned HTTP 403, and the live interaction session timed out, so exact frame timing and pixel treatment could not be inspected. The implementations below follow observed page structure and source markup, plus original local artwork.

Royal Court (`design-01`) and Palace Edit (`design-41`) now begin with a decorated architectural cover and a guest-controlled door opening. Vellum Layer (`design-33`) starts as a folded translucent letter and opens into the existing layered paper scene. Garden Vow (`design-21`) represents the living-scene direction; Desert Sky (`design-45`) surfaces its wedding date and venue above the fold. The homepage groups these four live examples, and the creator previews closed/opened states where a cover exists. These directions share the same editing, event, sharing and export capabilities.

The homepage Royal Court film now begins with an original rendered door-opening sequence and continues into the existing ceremony chapters. The page itself uses CSS motion for the interactive opening; the MP4 is a sample for browsing and has no imported footage from the reference sites.

| Reference function | Local state |
| --- | --- |
| Try names, large live design preview | Catalog quick look and guided creator live preview |
| Category browsing and material directions | Existing filters, 50 designs and paper studies |
| Door reveal and multi-scene story | Existing homepage and invitation scenes |
| Ceremony itinerary, maps, iCal | Guided ceremony step, full invitation editor and exports |
| Countdown | Added for the next upcoming ceremony |
| Wording suggestions | Added three editable neutral presets |
| Guest response | Added WhatsApp handoff with event selection |
| Photo upload, music, owner account, paid checkout, RSVP dashboard, physical print ordering | Not implemented in this static prototype |

## Design guidance for this codebase

- Keep Instrument Serif and Instrument Sans as the site's own typography. Use the local palette and individual design tokens in `invitation.js`; reference colors above describe competitors, not new global tokens.
- Keep the template grid as a fast index. The large iframe quick look already provides the preview/product-detail moment seen on Aamantran and ShaadiPath.
- Preserve clear focus and reduced-motion behavior for overlays and animations. The guest response uses a real modal dialog and never submits details to this site.
- Treat paper textures as digital art direction. Do not imply that a physical product is available.
- Validate phone layouts in the local browser. The captures did not establish source mobile behavior.

The information above covers the supplied pages and visible markup. It is not an exhaustive audit of authenticated flows or every page on those sites.
