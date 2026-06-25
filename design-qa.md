# Design QA

final result: passed

## Scope

Recreated the four provided Wedding Times reference pages as real website pages in the existing Next.js app:

- `/` — front page
- `/day-1` — Day 1 edition
- `/day-2` — Day 2 edition
- `/rsvp` — RSVP and guest information

## Evidence

- Pages are built from HTML/CSS/React components, not full-page poster images.
- Supporting visuals were cropped into `public/images/clone-assets/` for the actual photo and illustration areas.
- Final browser captures were saved under `audit-screenshots/dom-clone-final/` and `audit-screenshots/dom-clone-final-2/`.
- `npm run lint` passed.
- `npm run build` passed.

## Notes

- The RSVP card keeps the live form behavior while matching the reference newspaper layout.
- The page navigation rail is intentionally outside the sheet area on desktop, so it does not obscure the artwork.
- The Next.js dev indicator may appear in local development screenshots; it is not part of the production build.
