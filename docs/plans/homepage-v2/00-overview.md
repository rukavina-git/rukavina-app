# Plan: homepage v2 (Figma "Round 8 · C refined")

Build the approved homepage in code, one section per step. Launch target: 24 Nov 2026, 10:00 CET
(the coming-soon countdown on main).

- Figma: https://www.figma.com/design/3nSFWQh2uzQKENfz5ZZpuh/Rukavina%20Site?node-id=331-655
  (desktop frame `331:656`, mobile frame `331:859`). Lock the file with `figma_navigate` first.
- Decisions: 0007 (direction), 0008 (homepage structure), 0009 (contact form).
- Content truth: PRODUCT.md "Evidence on Hand". Copy comes from the Figma page as approved.

## Shape

- One page per locale (`/en`, `/hr`). Header links (Work, Services, About) scroll to sections.
- The June pages (`services`, `work`, `work/[slug]`, `about`, `contact`) are removed; their URLs
  redirect to the matching homepage section. No project detail pages for launch.
- Section order: header, hero, Work, How I work, About, What I take on, Let's talk, footer.

## Steps

1. Foundation: merge origin/main into develop, tokens from Figma in `globals.css`, base layout,
   header (nav, EN/HR switch, Get in touch) and footer. Remove June components and pages, add
   redirects.
2. Hero: headline, two paragraphs, phone with 3 slides (Government → Payments → Gym Tracker)
   and caption, scroll cue. Reduced motion shows one static slide.
3. Work: `projects.ts` rewritten for the 5 launch projects; rows with picture left, text right.
   NDA illustrations exported from Figma as SVG, Gym Tracker and Adria VA images, AI placeholder.
4. How I work + What I take on.
5. About: photo (`public/`), text, facts table, LinkedIn link.
6. Contact: form and API route per decision 0009 (validation, escaping, honeypot, min fill
   time, rate limit, reCAPTCHA v3 loaded on first focus, Google notice, error and success states).
7. Croatian: full `hr.json` written by Claude, listed as unreviewed in `messages/README.md`.
8. Launch basics: metadata and Open Graph image per locale, sitemap, robots, 404 page, short
   privacy note (contact form + reCAPTCHA).
9. (me) Karlo proofreads Croatian and checks the site on phone and desktop.
10. Release: PR develop → main (replaces the coming-soon page). Karlo merges.

## Out of scope for launch

Project detail pages, blog, testimonials, prices, three.js/lottie, the AI project's real content.
