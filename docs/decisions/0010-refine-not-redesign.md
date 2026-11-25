# 0010: Redesign v1, or refine it?

- Status: accepted, direction E1 (2026-11-25)
- Date: 2026-11-25

## Question

Five days after launch, should the homepage get a big redesign while changes are still cheap?

## Options

1. Big redesign (new hero look, card-based Work, glass, new section layouts).
2. Targeted changes: copy, repetition, the hero and form-success moments, a11y and mobile fixes.
3. Leave it.

## Constraints

- Karlo (2026-11-25): open to a big redesign because it is cheap now; likes the structure (hero,
  work, about, contact); likes Liquid Glass but it is not a must.
- Doing it before the Croatian proofread avoids proofreading twice.
- Rejected look and "show, don't label" still apply (PRODUCT.md, decision 0008).

## Council

Six independent reviews of the live site and of Figma drafts (Ideas page, section 510:2), in place
of the four seats: impeccable critique, design critique, accessibility (live, 320–1440), mobile,
interaction/motion (emil-design-eng), positioning and copy.

| Review | Pick | Reasons | Main risk |
| --- | --- | --- | --- |
| impeccable | 2 | System is sound; problems are copy, repetition, AI placeholder | Restyling a sound world |
| Design critique | 2 | Hero carries no positioning; Services and How I work look identical | Card grid = generic template |
| Accessibility | 2 | No critical failures; two contrast fixes | Glass over teal fails 1.4.3 |
| Mobile | 2 | No work on the first phone screen; missing basics | backdrop-filter cost on Android |
| Motion | 2 | No press feedback; success state jumps; hero static | Glass as a gimmick |
| Copy | 2 | Hero fails the five-second test; copy problem bigger than visual | Unconfirmed claims in drafts |

All six rejected Hero B (teal stage with glass cards), white cards in Work, and two filled
"Get in touch" buttons on one screen.

## Recommendation

Option 2, as three small PRs: copy, layout, polish. Strongest argument against: a refined v1 may
still look like many clean portfolios; revisit once real Gym Tracker screenshots and the AI
project exist.

## Decision

Reopened 2026-11-25: Karlo had said he is open to a medium to large redesign; the record below
wrongly turned the review verdict into his choice. Headline direction and header glass still stand.
Redesign directions are being drawn in Figma before this is decided.

Karlo (2026-11-25): direction E1. D1's scroll stage plus depth: type hero with a tilted phone that
rotates through Government, Payments and Gym Tracker (all three get NDA-safe screens) and straightens
on scroll; a still section index under the hero; Work as a pinned picture that swaps per project, with
vertical ticks; Services, About and Contact scroll normally; no pinning on phones. Rejected: B2, B3,
D4 (hard no), B1 (panel too wide), D3 (one project as hero). Figma: Ideas, "E1 · Design v1". To be
refined there before code.

Karlo (2026-11-25, later): no "ticket" in the hero headline; the "ticket to production" headline
direction is withdrawn and the headline is being rewritten. On team projects he did estimates and
breakdowns, chose the technical approach, reviewed code, fixed what QA found, and handled releases and
production bugs (not on every ticket). The site is for hiring managers first, full freelance projects
second.
Karlo (2026-11-25): headline "Senior software engineer for your team." Sub-line (draft): "I join your
team and carry my work from estimate to release, and the fixes after. Apps I've worked on are used by
tens of thousands of people." No "my own app" in the hero; Gym Tracker details stay in Work.
Karlo (2026-11-25): hero keeps the bars under the phone (not the small-phone shelf, Figma 531:5041).


Karlo (2026-11-25): option 2. Hero headline direction "Senior software engineer who owns the work
from ticket to production." Liquid Glass on the sticky header only, once scrolled.
