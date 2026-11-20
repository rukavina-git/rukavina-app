'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { routing } from '@/lib/i18n/routing'

const labels = { en: 'English', hr: 'Hrvatski' } as const

// Plain links so the current section hash carries over to the other locale.
export default function LanguageSwitch() {
  const t = useTranslations('Header')
  const current = useLocale()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const update = () => setHash(window.location.hash)
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

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
              href={`/${locale}${hash}`}
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
