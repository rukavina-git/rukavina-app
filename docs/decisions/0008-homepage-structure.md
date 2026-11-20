# 0008: Homepage structure below the hero

- Status: accepted
- Date: 2026-11-19

## Question

Which structure should the homepage body take below the locked header and hero (C2), so the site
comes across as a senior engineer a hiring manager wants to employ, or a team wants to bring in as
a contractor or consultant?

## Options

1. A · The first weeks: the page as the visitor's future (first week, month, quarter, after that),
   each step backed by a project; ends with "Two ways to start".
2. B · Two ways in: a two-column split, "Join your team" vs "Bring me in for a project", with the
   proof split the same way (team work vs own products) and a button per column.
3. C · Work index: all projects in one scannable index (what it is, my part, stack), one row open as
   a short case (problem, what I decided, where it is now); then "What I take on" and contact.
4. D · Keep the current v3 body: zig-zag image rows, "What I do", "Working together" timeline, contact.

Sketches: Figma "Rukavina Site" → Ideas → "Round 8 · Page structures". Structures A, B and C were
dealt by impeccable's concept roll (seed:142d63d1f975c3ba) from seven candidates; D is the incumbent.

## Constraints

- Karlo (2026-11-19): the audience is a future employer hiring a senior engineer, or someone adding
  a freelancer/consultant to their team. He likes the current header and hero; the rest is open.
- Content: 3–4 own projects (GymBuddy, Adria VA, an AI project in progress, a fourth not yet public)
  and 2 NDA projects. Claims only from PRODUCT.md "Evidence on Hand". Hanken Grotesk only.
- Previously rejected patterns in 0006/0007 (Swiss grid, README, bento, dark big work rows, etc.).
- All sketch copy is draft.

## Council

Five seats for this round (the skill's four, with "Client" split into the two audiences Karlo named).

| Seat | Ranking | Reasons | Main risk | Veto | Confidence |
| --- | --- | --- | --- | --- | --- |
| Design director (impeccable) | C > A > B > D | Passes the squint test; "What I decided" shows judgment; only option without placeholder NDA photos; best pacing (dense index, one open case, quiet band, form) | Table needs a real phone layout; open case must not be a card inside a card | D (zig-zag is the category template; leads with a stock photo) | Medium |
| Hiring manager (permanent role) | C > A > B > D | "My part" shows what he personally did in one scan; the open case is the only place judgment is visible | C reads contract-first; nothing says he is open to a permanent role | D (padding, client sign-up funnel) | Medium |
| Agency CTO (contractor) | A > C > D > B | A answers his questions in order: works inside the process, takes the hard part, writes decisions down | "First week/month/quarter" reads like a 30-60-90 job plan | B (forces a choice between hire and project; files security work under full-time) | Medium |
| Positioning | C > A > D > B | Hero already names both ways in; C puts "See shipped work" straight onto proof; "My part" serves both audiences | NDA rows are one line beside a full GymBuddy case, so he may read as "the gym-app developer" | B (splits the evidence; a contractor in a team fits neither column) | Medium |
| Skeptic (attacked C) | C > D > B > A | C survives: no motion needed, no promises, NDA work as plain text | Mobile table, only one row really opens, GymBuddy shown twice | A (promises about a future job; a timeline that never happened) | Medium |

## Recommendation

C, the work index, picked first by four of five seats and vetoed by none. A is the clear second and
gives C its missing piece. B and D are each vetoed twice.

Build C with these changes, each asked for by two or more seats unless noted:

1. Add A's "Two ways to start" band above contact, with an explicit permanent-role line and a dated
   contract availability line (CTO). Without it the hiring manager "would probably move on".
2. Give the NDA rows a text-only open state with PRODUCT.md's exact facts (50,000+ users, live
   location and maps; keys in the Android Secure Element), marked "Described, not shown".
3. Open the government platform row by default instead of GymBuddy (chair's call, answering the
   positioning and skeptic risk): it leads with the strongest evidence and stops GymBuddy appearing
   twice in a row after the hero.
4. The open case sits flush between the hairlines, not as a card (design director). On mobile every
   row starts closed and the columns fold to name, my part, and stack (skeptic).
5. Remove the dashed "fourth project" slot. Show Document assistant only once it exists.
6. Put B's facts line in the contact section: CET, English and Croatian, reply within 24 hours.
7. The hero caption links to its project's row and opens it (design director).
8. Optional (skeptic): group the rows as "In larger teams" and "Built on my own".

Strongest argument against: the agency CTO, the seat closest to Karlo's contractor audience, ranked
A first because A shows how he behaves inside a team. The "Two ways to start" band and the NDA
cases carry part of that into C, but not the step-by-step story.

## Facts to confirm before copy is written

Not in "Evidence on Hand" but used in the sketches or v3: GymBuddy on Google Play; GymBuddy's
architecture decision records (the repo has docs/adr); Java Card and gRPC on the payments app; the
government-platform role (Android client, tests, static analysis, code review); "remote or hybrid";
the Document assistant's status. PRODUCT.md also says GymBuddy has an iOS client, but the GymBuddy
repo lists iOS as not started. PRODUCT.md's Users list does not yet include a permanent-role hiring
manager.

## Decision

Karlo (2026-11-19): C, refine from there. Facts answered the same day and recorded in PRODUCT.md:
GymBuddy treated as live on Google Play; no iOS mention; Java Card, gRPC and blockchain are fine to
name; the government role is described as owning the process and responsibility from the product owner's
ticket to production, with the whole team (Karlo joined after it started; no "Android client", no tests,
no login/biometrics as highlights); never mention remote or hybrid; no AI project yet, a "work in
progress" slot is fine; services say "web and mobile"; GymBuddy's reason is privacy, no ads, no bloat;
Adria VA's strength is discovery with the client, not the tech. The
public name is "Gym Tracker", never "GymBuddy". Karlo also asked for real pictures in the index
instead of a spreadsheet-like table (refined C v2).

Refined by Karlo the same day (C refined v3 in Figma): picture left, text right for every project; no
column headings, no group labels, no expanding rows; team or solo work shows through the "My part"
wording, not labels. "Two ways to start" dropped for one contact ask. New About section with a profile
photo, holding the team-work strengths. Order: hero, Work, About, What I take on, Let's talk.
