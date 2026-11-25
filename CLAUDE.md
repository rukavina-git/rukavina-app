# rukavina.app

Personal services and portfolio site for Ivan Karlo Rukavina (always the full name), a senior
software engineer offering freelance work, team augmentation and consulting. Public repo.

Read `PRODUCT.md` (who it's for, positioning, evidence, principles) before any content or UI work.
Accepted decisions are in `docs/decisions/`. They outrank everything else except Karlo.

## Stack
- Next.js 15 App Router, TypeScript strict, React 19
- Tailwind CSS v4: tokens live in `src/app/globals.css` (`@theme`); there is no tailwind.config
- GSAP + ScrollTrigger for scroll motion, CSS keyframes for ambient motion
- next-intl 3: `/en` (default) and `/hr`, messages in `messages/{en,hr}.json`,
  config in `src/lib/i18n/`, routing in `middleware.ts`
- Resend for the contact form (`src/app/api/contact/route.ts`)
- Vercel. `main` deploys to production.
- three / @react-three and lottie-react are installed but unused. Don't add usage without asking.

## Commands
- `npm run dev`: local dev server (port 3000)
- `npm run typecheck`: tsc --noEmit
- `npm run lint`: ESLint (next/core-web-vitals + TypeScript)
- `npm run build`: production build. Must pass before every commit.

## Structure
- `src/app/[locale]/`: pages (home, services, work, work/[slug], about, contact)
- `src/components/{layout,ui,sections/*}`: components; sections are grouped by page area
- `src/lib/data/`: services and projects as typed data. Copy goes in messages, not here.
- `design/`: local-only review screenshots and mocks (gitignored). Images the site uses go in `public/`.
- `docs/archive/2026-06-spec.md`: old spec (copy drafts only)

## Content rules
- Never add a claim, metric, client or testimonial that Karlo hasn't confirmed. Ask instead.
  Confirmed facts are listed in PRODUCT.md under "Evidence on Hand".
- NDA work: problem, scale and tech only. No client names, no employer name, no screenshots,
  no identifying details. This includes code, data files, slugs, alt text and commit messages.
- Services: Mobile development, AI integration, Architecture and code review, plus a separate page
  for businesses. Never "Android" as a service name.
- No CV, no prices, no blog. Testimonials only once three real ones exist.
- Tone: a senior professional a company would bring in. Plain and specific: no hype, no urgency.
- Every user-facing string goes through next-intl, in `en` and `hr` in the same change. Claude
  writes the Croatian; Karlo (native) proofreads it. Mark new Croatian as unreviewed in
  `messages/README.md` until he has checked it.

## Design
- Every design (Figma option, demo, mock, UI change) is shaped and checked with the `impeccable` and
  `design-taste-frontend` skills before Karlo sees it. Never design alone; say which skill shaped or
  checked what.
- Base direction: E1 (decision 0010) on top of Q (scroll stage, decision 0007). Figma is the source for layout.
- Font: Hanken Grotesk only (`font-sans`, loaded in the locale layout). No other families.
- Tokens come from `globals.css`. `BRAND.md` (June) still holds colors, spacing and motion rules;
  where it conflicts with decisions 0006/0007, the decisions win.
- Avoid the rejected look: dark navy with violet, particles, a pulsing "available" pill, a centered hero
  with a stats row, fade-up on everything.
- Every animation respects `prefers-reduced-motion`. GSAP scroll tweens use `clearProps`, and clean up
  with `gsap.context()` / `useGSAP` on unmount.
- No emoji as icons. Use `next/image` for images. WCAG 2.1 AA. Responsive from 360px.

## Workflow
- Plans live in `docs/plans/<name>/` (`docs/plans/ACTIVE` names the current one). `/step` runs the next step.
- Decisions that change how the site sells go through `/council` and are recorded in `docs/decisions/`.
  A record isn't decided until Karlo's line is filled in.
- Run the `reviewer` agent once per finished change, before committing.

## Rules
- Keep summaries short. I often read on my phone.
- Never commit to main. Work on `develop` or `feature/*` off develop; main only via PR once the build is green.
  Pushing develop or a feature branch is fine. Never push main or deploy from the CLI. Merging a PR into
  main deploys production: the guard hook asks Karlo to approve each `gh pr merge`.
- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`), small and focused.
- Commits end with a Co-Authored-By line for Claude. No Claude-Session line, and no "Generated with
  Claude Code" footer in PRs.
- Never read or print `.env*`. New env vars go into `.env.example` with an empty value.
- Only commercial-friendly licences for code, fonts, images and icons (MIT, Apache 2.0, BSD, OFL, CC0,
  CC BY with credit). Record the source of every third-party asset.
