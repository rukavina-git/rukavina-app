# 02 Layout

## Changes

1. **Work**: remove the AI project row (keep its data/messages for later, unrendered). Rows stay
   hairline rows (no cards). Government and Payments rows first with a larger image column
   (about 480px at lg); Gym Tracker and Adria VA keep their current size.
2. **How I work → About**: drop the separate How I work band; its four points become a short
   list in About's right column under the text (fills the empty area). Remove the band from
   `page.tsx`; header nav unchanged. Check light/warm band alternation still holds.
3. **Hero slideshow** starts on the government slide (server render, no JS and reduced motion too).
4. **Phone hero spacing**: tighter top padding and gap below md so the phone starts on the
   first screen at 390x664 (Safari with URL bar).

## Done when

Screenshots at 360, 390, 1024, 1440 look right; no section heading repeats a layout twice in a
row; typecheck, lint, build pass; reviewer run.
