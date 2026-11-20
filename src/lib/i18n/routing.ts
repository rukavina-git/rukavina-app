import { defineRouting } from 'next-intl/routing'

// Every locale the site has code and messages for.
export const allLocales = ['en', 'hr'] as const

// Croatian is switched off for v1 (Karlo, 2026-11-20): the copy isn't ready. Its code and
// messages/hr.json stay; add 'hr' back to `locales` to switch it on. /hr redirects to /en meanwhile
// (next.config.ts), and the language switch hides itself while only one locale is on.
export const routing = defineRouting({
  locales: ['en'] as (typeof allLocales)[number][],
  defaultLocale: 'en',
  // No locale cookie: the site sets no cookies of its own (privacy note). The URL carries the locale.
  localeCookie: false,
})

export type Locale = (typeof routing.locales)[number]
