# 05 About

Photo with a facts table on the left, heading and text on the right, LinkedIn link.

Figma: About `336:1262` (desktop, 1440). Lock the file with `figma_navigate` first. No mobile
frame: heading and text first, then photo and facts.

## Changes

1. **Photo**: web-sized copy of `design/profile-original.jpg` (720x960, JPEG) in
   `public/profile/`, shown 360x480 with 8px radius via `next/image`. Alt is the full name.
2. **Facts** (`<dl>`): Education: Master's in Computer Science; Based in: Split, Croatia;
   Languages: Croatian (native), English (fluent). Rule above each row, label column 104px.
3. **Text** (`src/components/sections/about/About.tsx`), `#about`: h2 "About" 44px, the Figma
   paragraphs (19px), "LinkedIn" link from `site.linkedin`.
4. Grid on desktop: 360px left, 48px gap, 760px text; padding 112/120.
5. **Strings**: `About.*` in en and hr; hr marked unreviewed.

## Done when

- Matches `336:1262` at desktop; 360px stacks cleanly, no overflow.
- Only confirmed facts (PRODUCT.md "Evidence on Hand").
- typecheck, lint, build green.

## Open questions

1. The Figma hobbies paragraph (olive and orange trees, Dungeons & Dragons, tennis) is not in
   "Evidence on Hand". Left out until Karlo confirms it.
