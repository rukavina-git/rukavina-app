# Fonts

Hanken Grotesk, SIL Open Font License 1.1 (`OFL.txt`).
Upstream: https://github.com/marcologous/hanken-grotesk

- `hanken-grotesk-{latin,latin-ext}-{400,600}-normal.woff`: from the npm package
  `@fontsource/hanken-grotesk` 5.1.0 (cdn.jsdelivr.net), added 2026-11-20. Used only by the
  Open Graph image (`src/app/[locale]/opengraph-image.tsx`), which can't use `next/font`.
- The site itself loads the same font through `next/font/google` in `src/app/[locale]/layout.tsx`.
