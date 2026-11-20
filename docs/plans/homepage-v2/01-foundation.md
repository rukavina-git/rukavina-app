# 01 Foundation

Get develop onto main's history, set the Figma tokens, and build the shell every later step sits
in: layout, header, footer. Remove the June pages and components.

Figma: https://www.figma.com/design/3nSFWQh2uzQKENfz5ZZpuh/Rukavina%20Site?node-id=331-655
(desktop `331:656`, mobile `331:859`; header and footer only). Lock the file with
`figma_navigate` first.

## Changes

1. **Merge.** `git merge origin/main` into develop (merge base `65a6212`). Resolve:
   - Keep develop's `.claude/`, `CLAUDE.md`, docs, `.gitignore`, i18n setup, `middleware.ts`.
   - `package.json` / lock: develop's dependencies, main's version field (2.0.0, PR #2).
     Regenerate the lock with `npm install`.
   - Drop main's `src/app/Countdown.tsx` and coming-soon `src/app/page.tsx`. The root page stays
     the locale redirect. Keep main's `src/app/icon.svg`.
   - Commit the merge on its own (`chore: merge origin/main into develop`), before the rest.
2. **Tokens.** Read colors, type scale, spacing and radii from the Figma variables / frames and
   write them into `@theme` in `src/app/globals.css`. Remove June tokens nothing uses anymore.
   Hanken Grotesk stays the only family.
3. **Layout.** `src/app/[locale]/layout.tsx`: font, `<html lang>`, skip link to `#main`,
   header, `<main id="main">`, footer. Home page renders empty section anchors in order:
   `#work`, `#how-i-work`, `#about`, `#services`, `#contact` (ids to match the Figma names).
4. **Header** (`src/components/layout/Header.tsx`, replaces `Nav.tsx`): name, Work / Services /
   About links to the anchors, EN/HR switch (keeps the current hash), Get in touch to
   `#contact`. Mobile layout per frame `331:859`. Keyboard and focus states visible.
5. **Footer** (`src/components/layout/Footer.tsx`): per Figma. No new claims.
6. **Remove** the June pages (`services`, `work`, `work/[slug]`, `about`, `contact`) and the
   components only they use (`sections/*`, `ui/*` unless the header/footer reuse one,
   `HeroBlobs`, `HeroGradient`, `public/images/hero-bg.jpg`). Keep `src/app/api/contact/route.ts`
   for step 6. Remove now-unused message keys from both `en.json` and `hr.json`.
7. **Redirects** in `next.config.ts` (permanent, both locales): `/services` → `/#services`,
   `/work` and `/work/:slug` → `/#work`, `/about` → `/#about`, `/contact` → `/#contact`.
   Hash goes in the destination; check next-intl's middleware doesn't swallow them first.

New strings (nav labels, footer) go in `en` and `hr`; mark new Croatian unreviewed in
`messages/README.md`.

## Done when

- develop contains origin/main's history; `git log origin/main..develop` shows no coming-soon page.
- `/en` and `/hr` show header, empty sections and footer matching Figma at 360px and desktop.
- Nav links scroll to their anchors; EN/HR switch works; old URLs redirect.
- No June component or page left; `rg Nav\b|HeroBlobs|WorkGrid src` is empty.
- typecheck, lint, build green.
