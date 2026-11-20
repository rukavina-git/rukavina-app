# BRAND.md — rukavina.app

Single source of truth for all design decisions.
Reference this file for every UI, style, or animation decision.

---

## Brand

**Name:** rukavina.app
**Logo rendering:** `rukavina` in text color + `.app` in Warm (#C4523C)
**Tagline:** Web and mobile software, built to deliver.
**Tone:** Professional, direct, no fluff. Senior engineer — not a freelance marketplace profile.

---

## Colors

| Token       | Hex       | Tailwind key  | Use                                              |
|-------------|-----------|---------------|--------------------------------------------------|
| Background  | #F5F2EB   | `bg`          | Page background, default section bg             |
| Background Alt | #EDEAE2 | `bg-alt`     | Alternating sections, subtle surfaces            |
| Card        | #FFFFFF   | `card`        | Card backgrounds, form fields, modals            |
| Dark        | #1B2B35   | `dark`        | Footer, about card, any intentional dark section |
| Text        | #1A1915   | `text`        | All body copy, headings                          |
| Muted       | #7A736B   | `muted`       | Subtitles, descriptions, meta text               |
| Accent      | #1B3A4B   | `accent`      | Buttons, nav CTA, links, primary interactive UI  |
| Warm        | #C4523C   | `warm`        | Section labels, logo dot, highlights, tags       |
| Border      | #D8D3C8   | `border`      | Card borders, dividers, input borders            |

### Rules
- Never use pure black (#000000) or pure white (#FFFFFF) for text
- Warm (#C4523C) is an accent only — never use it as a background
- On Dark (#1B2B35) backgrounds: use white for primary text, rgba(255,255,255,0.5) for muted
- Section backgrounds must alternate: bg → bg-alt → bg → bg-alt

### Tailwind config
```ts
colors: {
  bg:        '#F5F2EB',
  'bg-alt':  '#EDEAE2',
  card:      '#FFFFFF',
  dark:      '#1B2B35',
  text:      '#1A1915',
  muted:     '#7A736B',
  accent:    '#1B3A4B',
  warm:      '#C4523C',
  border:    '#D8D3C8',
}
```

---

## Typography

**Font family:** Hanken Grotesk (Google Fonts, OFL). Chosen 2026-11-18 over Plus Jakarta Sans and
Syne + DM Sans (comparison: Figma "Rukavina Site" → Ideas → "Font comparison").
**One font, multiple weights. No second family.**

Loaded once in `src/app/[locale]/layout.tsx` via `next/font/google` (`Hanken_Grotesk`, variable font,
`latin` + `latin-ext` for Croatian), exposed as `--font-hanken`, mapped to Tailwind `font-sans` in
`globals.css`. The body uses it by default; components need no font class.

Weights as in the decided Figma hero: headings SemiBold 600, UI and nav Medium 500, body Regular 400.

### Type scale

| Use                  | Size              | Weight | Letter spacing |
|----------------------|-------------------|--------|----------------|
| Hero headline        | clamp(44px,6.5vw,84px) | 800 | -0.03em   |
| Page title (h1)      | clamp(36px,4vw,56px)   | 700 | -0.03em   |
| Section title (h2)   | clamp(28px,3vw,44px)   | 700 | -0.02em   |
| Card title (h3)      | 20–24px           | 700    | -0.02em        |
| Body                 | 16px              | 400    | normal         |
| Body large           | 17–18px           | 300    | normal         |
| Small / meta         | 13–14px           | 500    | normal         |
| Label / eyebrow      | 12px              | 600    | 0.12em (uppercase) |

### Rules
- Eyebrow labels (WHAT I DO, THE PROCESS etc.) are always: 12px, weight 600, uppercase, letter-spacing 0.12em, color Warm (#C4523C)
- Hero headline line-height: 1.05–1.08
- Body line-height: 1.75
- Never use font-weight below 300

---

## Spacing

| Token         | Value     | Tailwind       | Use                        |
|---------------|-----------|----------------|----------------------------|
| Section Y     | 96px      | `py-24`        | All section top/bottom padding |
| Section X     | 5%        | `px-[5%]`      | All section left/right padding |
| Card padding  | 40–44px   | `p-10` / `p-11`| Card internal padding      |
| Card gap      | 20–24px   | `gap-5` / `gap-6` | Grid gap between cards  |
| Card radius   | 12px      | `rounded-xl`   | All cards and containers   |
| Button radius | 8px       | `rounded-lg`   | All buttons                |
| Tag radius    | 4px       | `rounded`      | Tech tags, badges          |

---

## Animated Icons (animatedicons.co — Minimalistic pack)

**Primary color:** #1B3A4B (Accent)
**Secondary color:** #C4523C (Warm)

On dark backgrounds (#1B2B35):
- Primary: #FFFFFF
- Secondary: #C4523C

### Usage map
| Icon use          | Section           |
|-------------------|-------------------|
| Mobile/Android    | Services          |
| Globe/Web         | Services          |
| Architecture/Blueprint | Services     |
| AI/Sparkle        | Services          |
| Additional icons  | How It Works steps (optional) |

**Size:** 48–64px in service cards, 32–40px in smaller contexts.
Never scale above 80px — they lose crispness.

---

## Animation

**Library:** GSAP 3 + ScrollTrigger
**Ambient/continuous:** Pure CSS keyframes (hero blobs, availability dot pulse)

### Scroll reveal — standard
```ts
gsap.from(el, {
  opacity: 0,
  y: 44,
  duration: 0.85,
  ease: 'power3.out',
  clearProps: 'all',   // always — prevents hover conflicts
  scrollTrigger: { trigger: el, start: 'top 78%' }
})
```

### Grid stagger
```ts
gsap.from('.card', {
  opacity: 0, y: 44, duration: 0.85,
  ease: 'power3.out', stagger: 0.1,
  clearProps: 'all',
  scrollTrigger: { trigger: '.grid', start: 'top 78%' }
})
```

### Hero headline — line reveal
```ts
gsap.from('.hl-line > span', {
  yPercent: 110, duration: 1.05,
  ease: 'power4.out', stagger: 0.14,
  clearProps: 'transform'
})
```

### Hero mesh blobs (CSS only)
4–5 absolutely positioned divs, `filter: blur(90px)`, radial-gradient.
Colors: Accent (#1B3A4B) at 8–16% opacity, Warm (#C4523C) at 6–12% opacity.
Animated with CSS @keyframes — slow drift and scale, 10–18s duration, infinite.

### Rules
- `clearProps: 'all'` on every GSAP scroll animation — non-negotiable
- Wrap all GSAP init in `prefers-reduced-motion` check
- Register ScrollTrigger once globally in a client component
- No animation duration above 1.1s
- No more than 3 simultaneous animated elements on screen

---

## Buttons

### Primary
```
bg: Accent (#1B3A4B)
text: white
hover: Dark (#1B2B35) + translateY(-2px) + box-shadow
padding: 13px 30px
border-radius: 8px
font-weight: 500, font-size: 15px
```

### Secondary
```
bg: transparent
text: Text (#1A1915)
border: 1.5px solid Border (#D8D3C8)
hover: border-color Accent + text Accent + translateY(-2px)
padding: 13px 30px
```

---

## Navigation

**Fixed, frosted glass on scroll.**
Logo left: `rukavina.app` — "rukavina" in Text color, ".app" in Warm.
Links right: Services · Work · About · Contact
Far right: EN | HR toggle + "Let's talk" CTA button

Scroll behaviour:
- Default: transparent bg, no border
- On scroll (>24px): `rgba(245,242,235, 0.9)` bg + `backdrop-filter: blur(14px)` + border-bottom in Border color

Active link: underline sweep from left (CSS `::after` width 0→100%).

---

## Lottie Animations

**Format:** Lottie JSON (free tier)
**Package:** `lottie-react`
**Location:** `/src/animations/*.json`

```tsx
import Lottie from 'lottie-react'
import codingAnim from '@/animations/coding.json'

<Lottie animationData={codingAnim} loop={true} />
```

Hero Lottie: right side of hero, ~400×400px, abstract coding/dev themed.
Service Lotties: use animatedicons.co minimalistic pack, 48–64px.

---

## Page section background alternation

```
/                Home
  Hero           → bg (#F5F2EB)
  Services       → bg-alt (#EDEAE2)
  How It Works   → bg (#F5F2EB)
  Work teaser    → bg-alt (#EDEAE2)
  About teaser   → bg (#F5F2EB)
  CTA            → bg-alt (#EDEAE2)

/services        → bg (#F5F2EB) hero, then alternate per service
/work            → bg (#F5F2EB)
/about           → bg (#F5F2EB) content, dark card sticky right
/contact         → bg (#F5F2EB) form, bg-alt (#EDEAE2) FAQ
```

---

## Do Not

- No emoji anywhere in UI
- No pure black or white for text
- No Warm (#C4523C) as a background color
- No font-weight 600 or 700 for body text
- No border-radius above 12px except pill shapes (tags)
- No gradients on UI elements (mesh blobs are background-only)
- No mixing icon styles — animatedicons.co minimalistic pack only
- No hardcoded content in components — all strings via next-intl
- No `any` in TypeScript
