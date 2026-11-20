# 06 Contact

"Let's talk" with contact details on the left and the form on the right, plus the API route,
per decision 0009.

Figma: Contact `331:828` (desktop, 1440). Lock the file with `figma_navigate` first. No mobile
frame: text first, form below.

## Changes

1. **Section** (`src/components/sections/contact/Contact.tsx`), `#contact`: h2 "Let's talk"
   (72px desktop), intro with "I reply within 24 hours", email · LinkedIn · GitHub links, and
   "Based in Split, Croatia · CET · English and Croatian". Left 520px, form 620px.
2. **Form** (`ContactForm.tsx`, client): Name, Email (placeholder "you@company.com"), "What are
   you working on?" (min 20 chars, placeholder from 0009). Labels above fields, inline errors
   (`aria-invalid`, `aria-describedby`), sending, error (with the email address) and success
   states. Hidden honeypot field. Time from first interaction sent with the form.
3. **reCAPTCHA v3**: script loaded on the first focus inside the form, token fetched on submit.
   Google's notice under the button; the floating badge hidden (allowed with the notice).
   Env: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` (same names as Adria VA).
4. **API** (`src/app/api/contact/route.ts`): shared validation (`src/lib/contact.ts`), honeypot
   and under-3-s submits get a silent fake success, rate limit 5 per IP per hour (in memory),
   reCAPTCHA verify (score ≥ 0.5, action `contact`; skipped only outside production when no
   secret is set), HTML escaped, plain-text part, reply-to the sender, Resend errors → 502.
5. **Strings**: `Contact.*` in en and hr; hr marked unreviewed.

## Done when

- Matches `331:828` at desktop; 360px stacks cleanly.
- Empty / invalid submit shows inline errors; keyboard and screen reader usable.
- Network: no reCAPTCHA request before the form is focused.
- typecheck, lint, build green.
