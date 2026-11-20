# Messages

`en.json` and `hr.json` must have the same keys. Claude writes the Croatian; Karlo proofreads it.
JSON has no comments, so unreviewed Croatian is listed here until Karlo has checked it.

Croatian is switched off for v1 (2026-11-20, `src/lib/i18n/routing.ts`): nothing here is live. Keep
adding hr strings so it can be switched back on.

## Unreviewed (hr)

- `Header.*` (skip, nav, work, services, about, contact, language)
- `Footer.location`
- `Hero.*` (title, intro1, intro2, cue, carousel, pause, play, show, slides.*)
- `Work.*` (title, myPart, slot, tags.*, links.*, projects.*)
- `HowIWork.*`, `Services.*`
- `About.*`
- `Contact.*`
- `Meta.*`, `NotFound.*`, `Privacy.*`, `Footer.privacy`
- `Consent.*`
