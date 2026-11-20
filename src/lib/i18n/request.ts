import { getRequestConfig } from 'next-intl/server'
import type { AbstractIntlMessages } from 'next-intl'
import { routing, type Locale } from './routing'

// Explicit loaders so webpack bundles both files correctly
const messageLoaders: Record<Locale, () => Promise<{ default: AbstractIntlMessages }>> = {
  en: () => import('../../../messages/en.json') as Promise<{ default: AbstractIntlMessages }>,
  hr: () => import('../../../messages/hr.json') as Promise<{ default: AbstractIntlMessages }>,
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as Locale
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await messageLoaders[locale]()).default,
  }
})
