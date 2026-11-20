import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'hr'],
  defaultLocale: 'en',
  // No locale cookie: the site sets no cookies of its own (privacy note). The URL carries the locale.
  localeCookie: false,
})

export type Locale = (typeof routing.locales)[number]
