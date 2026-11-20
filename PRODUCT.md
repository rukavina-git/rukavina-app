# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 App Router (TypeScript, strict) on Vercel, Tailwind CSS v4, GSAP. Mostly static pages plus
one API route for the contact form (Resend). next-intl with `/en` and `/hr`. Content in `messages/*.json`
and `src/lib/data/`; no CMS.

## Users

Visitors deciding whether to bring Ivan Karlo Rukavina in, in priority order:

1. Hiring managers filling a permanent senior role: checking seniority, judgment, how he works inside
   a team, and evidence of shipped work, usually after a referral, a LinkedIn profile or a GitHub repo.
2. Engineering managers, tech leads and agencies adding a contractor or consultant to their team.
3. Startup founders and CTOs who need a product built or a technical decision made well.
4. Non-technical business owners who need an app or a website and want to know, in plain language, what
   they would get.

The first three share one voice. The fourth has its own page, written without jargon.
(Karlo, 2026-11-19: the site should make him read as someone a company wants as a future senior
employee, or wants to add to its team as a freelancer or consultant.)

## Product Purpose

A personal services and portfolio site. A qualified visitor understands who Karlo is and what he offers
within five seconds, trusts the quality of the work, and gets in touch. Success is a relevant enquiry
from a hiring manager, engineering manager, agency or founder.

## Positioning

A senior engineer who has shipped security-heavy mobile systems for government and banking clients (an
emergency platform for 50,000+ users with live location and maps; NFC smart-card payments with keys in
the Android Secure Element), and who can own a product end to end, from architecture to mobile, web and
AI, or join an existing team and work inside its process. His strongest trait is working in complex
teams: alongside product owners, UI/UX, QA, backend and DevOps teams, in an agile process, explaining
trade-offs clearly to whoever has to decide.

## Operating Context

- Visitors typically arrive from a referral, LinkedIn or GitHub, skim for fit, and decide in under a
  minute whether to make contact.
- Contact is email first, with a short form beside it. Replies within 24 hours; first consultation free.
- Karlo edits all content himself in the repo.

## Capabilities and Constraints

- Services: Web and mobile development, AI integration, Architecture and code review, and a separate
  page for businesses (websites and apps). "Android" is never a service name; say "web and mobile",
  not only "mobile".
- No prices for now; undecided whether they will be shown later.
- No CV on the site, ever.
- No blog at launch. A testimonials section appears once three real testimonials exist.
- The current employer is not named on the site (fine on GitHub).
- Describe team work as "agile teams, working closely with the product owner, designers, QA and other
  teams". Never "the backend team": it reads as if Karlo does not do backend (Karlo does; see Gym Tracker).
- Never mention remote, hybrid, on-site or relocation anywhere on the site. Location is "based in
  Split, Croatia" only; working arrangements come up in conversation.
- Never highlight basics (unit tests, "backend calls", login, registration, biometrics, using React or
  Next.js). Lead with ownership, judgment and responsibility. Never call something "hard" or
  "challenging" unless Karlo has said it was.

## Brand Commitments

- Name: always the full name, "Ivan Karlo Rukavina".
- Domain: rukavina.app. Subdomains are used for project sites (e.g. adriava.rukavina.app).
- Voice: a senior professional a company would bring in and talk to. Plain, specific, calm. Not a sales
  site: no urgency, no hard selling, no superlatives.
- Explicitly rejected: the previous site's look (dark navy with violet accents, particle background,
  pulsing "available" pill, centered hero with a stats row, fade-up motion on everything).

## Evidence on Hand

Confirmed by Karlo on 2026-11-19 unless noted.

- Gym Tracker (public; repo and Android package are still named GymBuddy, [repo](https://github.com/rukavina-git/GymBuddy)).
  Always "Gym Tracker" on the site, never "GymBuddy". A private workout tracker with no
  ads and no bloat; he built it because no app did only what he wanted, simply. Offline-first. Android
  app (Kotlin, Compose, Room) and a Kotlin/Spring Boot backend, built from one hand-authored OpenAPI
  contract that CI enforces; architecture decisions recorded as ADRs in the repo. On Google Play by the
  time the site launches: treat as live. iOS is planned, not built: never mention it.
- Adria VA (public, [adriava.rukavina.app](https://adriava.rukavina.app)): website for a virtual
  assistance and bookkeeping business. The site itself is simple; the strength to show is discovery:
  refining a vague brief and getting out of the client what they actually needed. Do not sell the tech.
- Government platform (NDA): a well-defined project Karlo joined after it had started (not owned by Karlo
  from the first idea). Once on it, Karlo owned the process and the responsibility for his work from the
  product owner's defined ticket to production: refinement, estimates, proposed changes and architecture,
  implementation, store releases, and work on the CI/CD pipeline. Live location (geotracking) and maps.
  Worked with the product owner, UI/UX, QA, backend and DevOps teams in an agile process. "Tens of
  thousands of users" (Karlo: close to 100,000 across his apps; the site keeps "tens of thousands").
  People confirm their identity with official documents (photo scan of eID/passports), so privacy and
  data security came first. Say only "official identity documents" and "personal data kept private and
  secure"; never name the document types, the scanning or the vendor.
  Login, registration and biometrics are basic: do not highlight them. Show skills, never what the app
  does or for whom.
- Payments app (NDA): a digital currency paid by tapping the phone (NOT credit-card payments; never say
  "digital euro", it points to the client). Money/keys on custom Java Cards and the Android Secure
  Element, gRPC; transactions recorded on a blockchain all parties can see (instead of a database).
  Payments also worked phone to phone and by QR code scan.
  Small team. Never state team sizes as numbers: use small, medium or large team. Karlo built the Android side of the card communication: sending APDU commands over
  NFC, with retries, failure handling, testing and debugging. He did NOT write the card applets/APDU
  programming and did NOT work on the blockchain part: never claim either. Never mention the tender,
  the client or that it was a demo. Problem, scale and tech only.
- Confirmed facts: Master's in Computer Science (show it plainly, e.g. in the About facts beside the
  photo), based in Split, Croatia, languages Croatian (native) and English (fluent, spoken and written). Never state a project count ("10+
  projects" says nothing); the projects speak for themselves.
- Contact links (confirmed 2026-11-20): email ivankarlo@rukavina.app,
  [LinkedIn](https://www.linkedin.com/in/rukavina/), [GitHub](https://github.com/rukavina-git).
  Kept in `src/lib/site.ts`.
- Launch set (decided 2026-11-20): five projects: Gym Tracker, Adria VA, Government platform (NDA),
  Payments app (NDA), AI project (work in progress). Adria VA will be redesigned; Gym Tracker gets new
  screenshots after release (December). NDA projects never get photos, only illustrations.
- AI project: not started. Until one exists the site may show a clearly marked "work in progress" slot,
  with no invented details.
- Absent, never to be fabricated: testimonials, client logos, prices, metrics beyond those listed.

## Product Principles

1. Evidence over claims. Every statement points to work, a decision or a constraint that was handled.
2. Discretion is a feature. NDA work is described with care, which itself signals trust for security work.
3. Senior and collaborative. Show judgment and the ability to work inside a team, not a lone-wolf pitch.
4. Respect the visitor's time. Fit is clear in seconds; depth is there for those who want it.

## Accessibility & Inclusion

WCAG 2.1 AA. Bilingual (English, Croatian), with equivalent content in both.
