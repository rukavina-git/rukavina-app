'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { routing } from '@/lib/i18n/routing'

const labels = { en: 'English', hr: 'Hrvatski' } as const

// Plain links so the current page and section hash carry over to the other locale.
export default function LanguageSwitch() {
  const t = useTranslations('Header')
  const current = useLocale()
  const [hash, setHash] = useState('')
  // Path after the locale, e.g. "/privacy"; empty on the homepage.
  const rest = (usePathname() ?? '').replace(/^\/(en|hr)(?=\/|$)/, '')

  useEffect(() => {
    const update = () => setHash(window.location.hash)
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  // Only one locale switched on (v1 ships English only): nothing to switch to.
  if (routing.locales.length < 2) return null

  return (
    <ul aria-label={t('language')} className="flex items-center gap-1.5 text-small md:text-ui">
      {routing.locales.map((locale, i) => {
        const active = locale === current
        return (
          <li key={locale} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="font-medium text-faint">
                /
              </span>
            )}
            <a
              href={`/${locale}${rest}${hash}`}
              hrefLang={locale}
              lang={locale}
              aria-label={labels[locale]}
              aria-current={active ? 'true' : undefined}
              className={
                active
                  ? 'font-semibold text-ink underline underline-offset-4'
                  : 'font-medium text-muted hover:text-ink'
              }
            >
              {locale.toUpperCase()}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
