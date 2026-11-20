# 02 Hero

Build the hero: headline, two paragraphs, scroll cue, and a phone that loops through three
projects with a caption and position indicator.

Figma: https://www.figma.com/design/3nSFWQh2uzQKENfz5ZZpuh/Rukavina%20Site?node-id=331-662
(desktop hero `331:662`, 1440x900). Lock the file with `figma_navigate` first. There is no
mobile hero frame; `331:859` starts at Work.

## Changes

1. **Hero section** (`src/components/sections/hero/Hero.tsx`), first in `<main>`, before
   `#work`. H1 "Senior software engineer. Software built properly." (`text-display`), the two
   approved paragraphs (`text-lead`, max 600px), "See shipped work" with a drawn down arrow,
   linking to `#work`. Text left, phone right on desktop; below md, text first, phone under it.
2. **Phone** (`Phone.tsx`): 256x496 frame, rounded, dark bezel as in `331:672`. Slides in order
   Government platform → Payments app → Gym Tracker. Each slide is an image inside the screen.
   - Gym Tracker: export `331:673` from Figma to `public/hero/gym-tracker.png` (2x, `next/image`).
   - Government platform and Payments app (NDA): illustrations only, no screenshots, no
     identifying details. **Not in Figma yet**; see Open questions.
3. **Caption and indicator**: caption per slide ("Gym Tracker · Android · Kotlin, Compose" and
   one per NDA slide), three bars, the active one dark. Caption links to its project's row in
   `#work` (decision 0008, point 7; v3 has no expanding rows, so it only scrolls). Captions go
   in messages, not data.
4. **Motion**: CSS or a small client component cycles slides (about 4 s each), pauses on hover
   and focus, with a visible pause control (WCAG 2.2.2, content moving over 5 s). With
   `prefers-reduced-motion`, no cycling: Gym Tracker shows statically with its caption.
   No GSAP needed here.
5. **Strings**: `hero.*` in `en.json` and `hr.json` (title, two paragraphs, cue, captions,
   pause/play labels, slide alt texts). Mark new Croatian unreviewed in `messages/README.md`.

## Done when

- `/en` and `/hr` hero matches `331:662` at desktop; 360px stacks cleanly with no overflow.
- Slides cycle, pause works by button, hover and keyboard focus; reduced motion shows one
  static slide.
- Caption click scrolls to the matching Work row anchor (ids agreed for step 3).
- No NDA screenshot or identifying detail in images, alt text, file names or captions.
- typecheck, lint, build green.

## Answers (Karlo, 2026-11-20)

1. Build with the Gym Tracker image only; the loop logic and animation matter now. NDA slides
   show neutral placeholder screens until the illustrations exist (`image: null` in
   `src/lib/data/heroSlides.ts`).
2. No answer on the mobile hero: stacked (text, then a 216px phone).
3. No answer on NDA captions: the suggested ones are used, easy to change in messages.
