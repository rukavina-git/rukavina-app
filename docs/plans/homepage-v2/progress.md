# Progress: homepage v2

- [x] 1. Foundation (merge 416d6f2, then the `feat: homepage v2 foundation` commit)
- [x] 2. Hero (HASH)
- [ ] 3. Work
- [ ] 4. How I work + What I take on
- [ ] 5. About
- [ ] 6. Contact
- [ ] 7. Croatian
- [ ] 8. Launch basics
- [ ] 9. (me) Proofread and device check
- [ ] 10. Release PR

## Deviations

- 01: package version is main's 1.9.0 (step file said 2.0.0).
- 01: no Figma variables or text styles exist; tokens were taken from frame fills and text nodes.
- 01: no mobile footer frame; the footer stacks its two lines below md.
- 01: `src/lib/data/projects.ts` and `services.ts` kept (unused) for step 3 to rewrite or remove.
- 02: NDA slides are neutral placeholder screens (Karlo: Gym Tracker image only for now).
- 02: slides last 5 s (step said about 4 s). The loop starts on Gym Tracker (server render, no JS,
  reduced motion), then Government → Payments → Gym Tracker.
- 02: NDA captions are Claude's suggestions, not confirmed; "Android" for the Government
  platform isn't in Evidence on Hand (Kotlin is, via the Figma stack line).

## Gotchas

- Figma: lock "Rukavina Site" with `figma_navigate` (lock: true) before screenshots; GymBuddy is
  often open too.
- develop and origin/main have diverged (main has PRs #1–#4, including the coming-soon page).
  Step 1 merges origin/main first; the coming-soon `src/app/page.tsx` must not survive the merge.
- Reviewer SHOULDs left open: header touch targets under 44px; global `:focus-visible`
  border-radius overrides `rounded-lg` (unlayered); `/hr` metadata still English (step 8).
- Language switch and name link are plain `<a>` (full reload) so the hash carries over.
- Shared facts and section ids live in `src/lib/site.ts`; `px-page` utility = 20px / 64px from md.
- Profile photo source: `design/profile-original.jpg` (local only); copy a web-sized version
  into `public/` in step 5.
- Hero captions link to `#work-<id>` via `projectAnchor()` in `src/lib/site.ts`; step 3 rows
  must use it (ids: government-platform, payments-app, gym-tracker).
- NDA illustrations go in `heroSlides.ts` (`image`) once step 3 exports them; also swap the
  "illustration to come" alt texts.
- `npm run build` while `npm run dev` runs breaks the dev server (500): stop dev first, or
  `rm -rf .next` and restart.
- Reviewer SHOULDs left open (02): caption link is 24px tall (under 44px); cue arrow hover nudge
  not gated by reduced motion (global rule shortens it to ~0).
