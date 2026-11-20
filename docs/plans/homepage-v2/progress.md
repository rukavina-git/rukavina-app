# Progress: homepage v2

- [x] 1. Foundation (merge 416d6f2, then the `feat: homepage v2 foundation` commit)
- [x] 2. Hero (e5cb0a8)
- [x] 3. Work (2b2e554)
- [x] 4. How I work + What I take on (1d3db15)
- [x] 5. About (600d4ce)
- [x] 6. Contact (e16cc0e)
- [x] 7. Croatian (a7b5adc)
- [x] 8. Launch basics (HASH8)
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
- 03: images live in `public/projects/`, not `public/work/`: the old-page redirect `/work/:slug`
  caught `/work/*.png`.
- 03: rows go side by side from lg (1024px), stacked below; 360 + 48 + 700 doesn't fit at md.
- 03: phones show the short "my part" from the Figma mobile rows (`partShort`); the stack line is
  the desktop one on all sizes; links stay on mobile (Figma mobile has none).
- 03: hero NDA slides stay placeholders: the illustrations are landscape (360x225), the phone
  screen is portrait.
- 03: AI project muted text uses `text-muted`, not Figma's faint (#a9a59c fails AA).
- 04: no mobile Figma frames; phones stack heading, title and text (32px heading).
- 04: page.tsx no longer maps `sections`; it lists the sections in order with empty shells for
  about and contact.
- 05: Figma hobbies paragraph (olive and orange trees, D&D, tennis) left out: not in Evidence
  on Hand. Add as `About.p3` once Karlo confirms.
- 05: photo is `public/profile/` (not `public/about/`, redirect clash); resized from
  `design/profile-original.jpg`, no GPS or camera EXIF.
- 06: button says "Send" (decision 0009), not Figma's "Send message".
- 06: minimum fill time uses the client-sent time since first focus (not a signed server
  timestamp); reCAPTCHA covers forged values. The form waits out the 3 s itself, so a fast
  human isn't dropped.
- 06: rate limit is in memory, per server instance (Vercel may run several).
- 06: four reviewer SHOULDs fixed (they lost messages or hung): failed reCAPTCHA load hung on
  "Sending…"; fast humans silently dropped; `null` JSON body gave 500; success state focus.
- 06: `.env.example` not updated: reading `.env*` is denied. Karlo adds
  `NEXT_PUBLIC_RECAPTCHA_SITE_KEY=` and `RECAPTCHA_SECRET_KEY=` (also in Vercel, with
  rukavina.app on the reCAPTCHA key's domain list).
- 07: hr was written in steps 1–6; this step was the read-through and wording fixes. Degree in hr
  is the neutral "Magisterij iz računarstva" (exact diploma title not confirmed).
- 08: privacy is its own page (`/[locale]/privacy`), linked from the footer.
- 08: next-intl locale cookie turned off (`localeCookie: false`) so the site sets no cookies
  of its own; `/` now picks the locale from Accept-Language only.
- 08: language switch keeps the current page path (`/en/privacy` ↔ `/hr/privacy`).
- 08: OG image fonts read from `src/assets/fonts/` via `process.cwd()` and shipped with
  `outputFileTracingIncludes`; `new URL(…, import.meta.url)` failed under webpack.
- 08: reviewer SHOULDs fixed: privacy note now names Vercel logs, IP for rate limit and
  reCAPTCHA, Google's cookies; privacy page OG url/title; font source README.

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
- 03 reviewer NITs left open: external links open a new tab with no screen-reader hint; the old
  June `projects.ts` (deleted) had vendor names in git history (public repo; Karlo's call).
- New public folders must not start with an old-page path (`work`, `services`, `about`,
  `contact`): the redirects in `next.config.ts` catch them.
- 04 reviewer, open for Karlo: "Android apps and web apps…" and "AI features added to existing
  products…" are exact Figma copy but may read as Android-first / past AI work. hr wording NITs
  (procjene iza kojih stojim; Zapisana arhitektura; "AI" vs "umjetna inteligencija").
- 04 code NITs open: `sections`/`SectionId` in `site.ts` unused; TitledList keys on title text.
- Shared `Band` (warm band, heading left) and `TitledList` live in `src/components/ui/`.
- 05 reviewer, open for Karlo: "Most of my career has been spent in agile teams" (Figma copy) is
  broader than Evidence on Hand. hr: "bez oglasa i suvišnog", "Magistar računarstva" vs
  "magistar inženjer računarstva", "Lokacija" vs "Živim u".
- External links (Work, About, Footer) open a new tab with no screen-reader hint; fix site-wide
  if wanted.
- 06 NITs open: Resend `send` not in try/catch (throw → 500 not 502); global `:focus-visible`
  border-radius squares the 10px input corners; contact links under 44px tall.
- Danger colour token `--color-danger` (#b3261e) added for form errors.
- 07 hr NITs open: "produkt" vs "proizvod" in HowIWork.communication; gym-tracker partShort is a
  full sentence while the others are fragments; "aplikaciju" twice in gym-tracker.part;
  "AI projekt" kept as a short label.
- 08 open for Karlo (step 9): privacy facts (retention "as long as our conversation needs",
  no analytics) and whether to add the GDPR legal basis and the right to complain to AZOP.
- 08 NITs open: 404 inherits the home title/canonical (404 status keeps it out of search);
  footer privacy link under 44px; hr "Ovu stranicu vodi…" wording.
