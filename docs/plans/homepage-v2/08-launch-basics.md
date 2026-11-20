# 08 Launch basics

Metadata, sharing image, crawl files, a 404 and a short privacy note.

## Changes

1. **Metadata** per locale (`generateMetadata` in `src/app/[locale]/layout.tsx`): title,
   description from `Meta.*` messages, `metadataBase` https://rukavina.app, canonical and
   `alternates.languages` (en, hr, x-default), Open Graph (locale, site name, type website).
2. **Open Graph image** (`src/app/[locale]/opengraph-image.tsx`, 1200x630): warm background,
   name, the hero title, rukavina.app. Hanken Grotesk woff files in `src/assets/fonts/`
   (OFL, from @fontsource/hanken-grotesk 5.1.0; licence copied as `OFL.txt`).
3. **sitemap.ts** and **robots.ts**: both locales and privacy pages with hreflang alternates;
   robots allows all except `/api/`.
4. **404**: `src/app/[locale]/not-found.tsx` plus a `[...rest]` catch-all that calls
   `notFound()`, so unknown paths render the localized 404 in the site layout.
5. **Privacy** (`/[locale]/privacy`): what the contact form collects, where it goes (email via
   Resend), reCAPTCHA (loaded only when the form is used), no analytics or own cookies,
   how to ask for deletion. Linked from the footer. Strings in `Privacy.*`, `NotFound.*`,
   `Meta.*`, `Footer.privacy`; hr marked unreviewed.

## Done when

- `/en` and `/hr` have localized title, description, canonical, hreflang and OG image.
- `/sitemap.xml`, `/robots.txt`, `/en/nope` (404), `/hr/privacy` work.
- typecheck, lint, build green.

## Open questions

1. Privacy text states facts about data handling (no analytics, emails kept only as long as
   needed, deletion on request). Karlo confirms them in step 9.
