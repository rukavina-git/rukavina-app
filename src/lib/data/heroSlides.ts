// Projects shown in the hero phone, in loop order. Copy lives in messages under `Hero.slides.<id>`
// and `Hero.screens.<id>`. NDA projects get drawn screens only (HeroScreens.tsx), never screenshots:
// `image: null` means the screen is drawn.
export type HeroSlide = {
  id: 'government-platform' | 'payments-app' | 'gym-tracker'
  image: string | null
}

export const heroSlides: readonly HeroSlide[] = [
  { id: 'government-platform', image: null },
  { id: 'payments-app', image: null },
  { id: 'gym-tracker', image: '/hero/gym-tracker.png' },
]

// Shown first (server render, no JS) and first with reduced motion.
export const heroStaticSlide = 0
