# Progress: homepage v2

- [ ] 1. Foundation
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

None.

## Gotchas

- Figma: lock "Rukavina Site" with `figma_navigate` (lock: true) before screenshots; GymBuddy is
  often open too.
- develop and origin/main have diverged (main has PRs #1–#4, including the coming-soon page).
  Step 1 merges origin/main first; the coming-soon `src/app/page.tsx` must not survive the merge.
- Profile photo source: `design/profile-original.jpg` (local only); copy a web-sized version
  into `public/` in step 5.
