# 0009: Contact form fields and spam protection

- Status: accepted
- Date: 2026-11-20

## Question

Should the contact form ask only for name, email and message, or also have an optional dropdown
(what it's about, or which service)? How should spam be handled?

## Council (4 seats)

- Hiring manager / eng lead: a dropdown makes me classify myself before writing; "a role" vs
  "a project" is the "Two ways to start" split Karlo rejected. The email domain shows the company.
- Non-technical owner: service names aren't my words; an open message box feels safer.
- UX copy: a categorising dropdown is the most costly field. Labels always visible above fields.
  reCAPTCHA adds a Google script, a GDPR cookie question and accessibility problems.
- Karlo's inbox: at this volume every message gets read; a real message beats a category.

## Recommendation

No dropdown, no company field.

- Name (required), Email (required, placeholder "you@company.com")
- "What are you working on?" (required, min 20 chars), placeholder "Where you need help, and
  anything useful about the team or timeline."
- Button "Send". Error: "That didn't send. Please try again, or email me directly at [address]."
- Spam: hidden honeypot field, reject submits under 3 s after page load (server-checked
  timestamp), rate limit 5 per IP per hour. No reCAPTCHA; Turnstile only if spam gets through.
- Server: validate fields, escape all HTML in the email, handle Resend errors.

Response time: "I reply within 24 hours" confirmed by Karlo.

## Karlo's decision

2026-11-20: no dropdown; name, email, message. Keep Google reCAPTCHA v3 (already set up, same as
Adria VA), but load it only when the visitor first focuses the form, plus the honeypot, minimum
fill time and rate limit. Google's notice sits under the Send button. Email stays visible and
clickable next to the form and in the footer, with LinkedIn and GitHub.
