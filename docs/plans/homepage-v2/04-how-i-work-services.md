# 04 How I work + What I take on

Two quiet bands on the warm background: "How I work" (after Work) and "What I take on" (after
About). Same layout: heading left, a list of titled lines right, separated by rules.

Figma: How I work `345:1302`, What I take on `331:798` (desktop, 1440). Lock the file with
`figma_navigate` first. No mobile frames: stack heading over list, title over text.

## Changes

1. **Shared list** (`src/components/ui/TitledList.tsx`): rows with a 300px title column and
   text beside it from md, top rule per row; stacked below md.
2. **How I work** (`src/components/sections/how-i-work/HowIWork.tsx`), `#how-i-work`,
   `bg-bg-alt`, padding 112/120 desktop. Heading 44px; four rows (title 18 semibold, text 17):
   Refinement and estimates, Architecture written down, Through to release, Clear communication.
3. **What I take on** (`src/components/sections/services/Services.tsx`), `#services`,
   `bg-bg-alt`, padding 112. Heading 40px; three rows (title 21 semibold, text 18): Web and
   mobile development, AI integration, Architecture and code review.
4. Grid on desktop: 360px heading column, 48px gap, list up to 904px.
5. **Strings**: `HowIWork.*` and `Services.*`, copy exactly as in Figma, en and hr; mark hr
   unreviewed in `messages/README.md`.

No motion.

## Done when

- Both bands match the Figma frames at desktop; 360px stacks cleanly, no overflow.
- Header links "Services" lands on `#services`.
- typecheck, lint, build green.
