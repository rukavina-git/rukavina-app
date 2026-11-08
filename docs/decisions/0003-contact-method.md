# 0003: Contact method

- Status: proposed
- Date: 2026-11-08

## Question

How do visitors make contact?

## Options

1. Contact form only
2. Email link only
3. Short form with the email address visible beside it
4. Any of the above plus a booking link (e.g. Cal.com)

## Constraints

- Confirmed: reply within 24 hours, free first consultation.
- Form runs through one on-demand route and Resend.

## Council

| Seat | Pick | Reasons | Main risk | Confidence |
| --- | --- | --- | --- | --- |
| Client (audience: engineering managers) | 3, no booking link | Managers email from their own client and CC the team; the form helps owners who don't know what to write; a cold booking link asks for commitment before trust | Spam on the visible address | High |
| Designer | 3, plus a quiet booking link | A large visible email address is a trust signal and a typographic moment; the promises work best at the form | Three contact routes clutter the block | High |
| Sales and marketing | 3, no booking link | Offering both costs nothing; the 24-hour reply and free consultation work best at the button | Form spam or a silent Resend failure | High |
| Skeptic | 3, email shown first, no booking link | A silent Resend failure loses leads unseen; free consultation plus booking invites low-value calls | Form spam | High |

## Recommendation

Option 3, unanimous; three of four say no booking link at launch.

- The email address is shown prominently, with a short form beside it: name, email, company (optional), message, and an optional budget/timeline.
- "Reply within 24 hours. First consultation free." sits next to the button.
- A call is offered in the reply, not as a booking link.
- Engineering requirements: honeypot plus rate limiting instead of reCAPTCHA, a confirmation email to the sender, and alerting when sending fails.

## Decision

Karlo: _pending_
