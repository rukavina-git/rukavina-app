# Progress: homepage v2

- [x] 1. Foundation (merge 416d6f2, then the `feat: homepage v2 foundation` commit)
- [ ] 2. Hero
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

## Gotchas

- Figma: lock "Rukavina Site" with `figma_navigate` (lock: true) before screenshots; GymBuddy is
  often open too.
- develop and origin/main have diverged (main has PRs #1–#4, including the coming-soon page).
  Step 1 merges origin/main first; the coming-soon `src/app/page.tsx` must not survive the merge.
- Confirm with Karlo: LinkedIn URL (`site.ts`, reused from the June footer) and
  `ivankarlo@rukavina.app` (from Figma) are not in PRODUCT.md "Evidence on Hand".
- Reviewer SHOULDs left open: header touch targets under 44px; global `:focus-visible`
  border-radius overrides `rounded-lg` (unlayered); `/hr` metadata still English (step 8).
- Language switch and name link are plain `<a>` (full reload) so the hash carries over.
- Shared facts and section ids live in `src/lib/site.ts`; `px-page` utility = 20px / 64px from md.
- `.playwright-mcp/` is not gitignored; don't stage it.
- Profile photo source: `design/profile-original.jpg` (local only); copy a web-sized version
  into `public/` in step 5.
