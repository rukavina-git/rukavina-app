// Projects shown in the hero phone, in loop order. Copy lives in messages under `Hero.slides.<id>`.
// NDA projects get illustrations only, never screenshots. `image: null` renders a neutral
// placeholder screen until the illustration exists.
export type HeroSlide = {
  id: 'government-platform' | 'payments-app' | 'gym-tracker'
  image: string | null
}

export const heroSlides: readonly HeroSlide[] = [
  { id: 'government-platform', image: null },
  { id: 'payments-app', image: null },
  { id: 'gym-tracker', image: '/hero/gym-tracker.png' },
]

// Shown first (server render, no JS) and as the only slide with reduced motion.
export const heroStaticSlide = 2
