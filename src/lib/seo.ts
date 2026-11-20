import { routing } from '@/lib/i18n/routing'

export const siteUrl = 'https://rukavina.app'

// hreflang alternates for a path after the locale ("" for the homepage, "/privacy").
export function languageAlternates(path = '') {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
    'x-default': `${siteUrl}/${routing.defaultLocale}${path}`,
  }
}
