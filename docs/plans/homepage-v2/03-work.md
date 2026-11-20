# 03 Work

Build the Work section: the "Work" heading and five project rows, picture left, text right.

Figma: https://www.figma.com/design/3nSFWQh2uzQKENfz5ZZpuh/Rukavina%20Site?node-id=336-1216
(desktop: intro `331:685`, index `336:1216`; mobile: rows `335:1047` to `335:1119` in
`331:863`). Lock the file with `figma_navigate` first.

## Changes

1. **Data** (`src/lib/data/projects.ts`): rewrite for the five launch projects, in order
   Government platform → Payments app → Gym Tracker → Adria VA → AI project. Typed data only:
   id (`government-platform`, `payments-app`, `gym-tracker`, `adria-va`, `ai-project`), tag
   (`nda` | `wip` | none), picture (path or null), links (GitHub, Google Play, site). Copy
   goes in messages. Delete the old June entries and `services.ts` if nothing uses it.
2. **Section** (`src/components/sections/work/Work.tsx`), rendered as `#work` in the home
   page: "Work" heading as in `331:685`, then the rows separated by rules, end rule after the
   last. Each row has `id={projectAnchor(id)}` so the hero captions land on it.
3. **Row**: 360x225 picture left, 700px text column right (title as h3, NDA / Work in progress
   tag, description, "My part" paragraph with the label bold, stack line in small muted text,
   links underlined). Below md, picture above text, full width. AI project row is muted with a
   dashed "Image when it ships" slot.
4. **Pictures** (`public/projects/`):
   - Government and Payments: export `399:2509` and `399:2394` from Figma as SVG. Check the
     SVG for names or text before committing (NDA). Also set them as the hero NDA slides in
     `heroSlides.ts` if they fit the phone screen; otherwise keep placeholders and note it.
   - Gym Tracker: export `336:1202` at 2x PNG. Adria VA: export `336:1207` at 2x PNG.
   - All via `next/image`, alt texts in messages (no client or document details).
5. **Strings**: `work.*` in `en.json` and `hr.json` (heading, per project title, description,
   my part, stack, link labels, tags, alt texts). Copy exactly as in Figma. Mark new Croatian
   unreviewed in `messages/README.md`.

No scroll animation in this step.

## Done when

- `/en` and `/hr` Work matches `336:1216` at desktop and the mobile rows at 360px, no overflow.
- Hero caption links scroll to the matching row.
- No NDA name, document type, vendor or screenshot in images, SVG text, alt, file names or copy.
- typecheck, lint, build green.

## Open questions

1. Google Play link for Gym Tracker: what is the URL? Until then: hide that link, or link
   the Play search for the package?

## Answers (Karlo, 2026-11-20)

1. Package `com.rukavina.gymbuddy`. Link:
   `https://play.google.com/store/apps/details?id=com.rukavina.gymbuddy` (404 for the public
   while the app is in closed testing; Karlo confirmed it works for testers; live by launch). Only the package keeps the old name; the site still says "Gym Tracker".
