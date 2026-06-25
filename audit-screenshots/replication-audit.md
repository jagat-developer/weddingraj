# Wedding Times Replication Audit

Captured at 1200 x 1800 from the local dev server on June 25, 2026.

## Screenshots

- `home.png` — current `/`
- `day1.png` — current `/day-1`
- `day2.png` — current `/day-2`
- `rsvp.png` — current `/rsvp`

## Overall Verdict

The current site has the right concept, palette, masthead language, and most of the written content. It is not yet a close visual clone of the provided references. The main gap is layout density and asset fidelity: the reference pages are compact poster/newspaper sheets with real images and illustrated event icons, while the current site is more spacious, editorial, and uses placeholder/vector assets.

## Page Findings

### Front Page

- Matches: masthead, hashtag, Goa location, "Breaking News", Shefali & Raj headline, venue/date data, story copy, family names, invite banner concept.
- Gaps: current layout is vertical and roomy; reference uses a three-column composition with story on the left, real couple photo in the center, destination report card on the right, families across the lower band, and invite banner at the bottom.
- Required: replace `/images/couple.svg` with the real couple photo, restore a destination-report card, tighten vertical spacing, and move story/photo/destination into a single dense newspaper grid.

### Day 1

- Matches: main title, Haldi/Sangeet event data, locations, times, dress codes, expectation text, timeline concept.
- Gaps: reference includes bottom modules for weather forecast, wedding stock exchange, and today's headlines; current page has only ceremony cards and a timeline. Event images are simplified SVG placeholders rather than rich reference-style images.
- Required: add Day 1 lower module row, replace Haldi/Sangeet SVGs with richer images, make cards more compact, and match the red ribbon labels.

### Day 2

- Matches: event list content is accurate: Grah Shanti, Chooda, Baaraat, Wedding Ceremony, After-Party; times/locations/dress copy mostly match.
- Gaps: reference uses five vertical columns with large illustrated ceremony icons and bottom three-card modules visible in the same poster layout. Current page uses a sparse 3+2 grid with Lucide line icons and the lower modules are below the fold.
- Required: turn journey into five equal columns on desktop, add illustrated icons/assets for each event, reduce spacing, and bring photo/highlights/facts/headlines into the same sheet density.

### RSVP

- Matches: title, RSVP section, word search, travel notes, classifieds, closing quote.
- Gaps: reference RSVP card is informational and WhatsApp-style with icon rows and "Coming Soon"; current card is a live form. This is better functionally, but visually diverges from the clone. Page number also differs from the reference screenshot, which labels it Page 3 while current route is Page 04.
- Required: decide whether RSVP should be a faithful static newspaper card, an interactive form styled to look like the static card, or both. Add the circular icon rows and "To: Coming Soon" treatment if matching the reference.

## Implementation Path

1. Copy real reference assets into `public/images`, especially the couple photo and event images.
2. Rework the four route components to use fixed newspaper grids at desktop sizes, with responsive stacking on mobile.
3. Add missing Day 1 modules: weather forecast, wedding stock exchange, and today's headlines.
4. Replace generic Lucide event icons on Day 2 with custom image/SVG assets matching the reference illustrations.
5. Tune global typography and spacing: larger page titles, smaller body text, tighter section gaps, stronger navy/burgundy hierarchy.
6. Re-capture the same four pages and compare side by side against the reference images.
