'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { onConsentOpen, setConsent, useConsent } from '@/lib/consent'

// Shown on the first visit and from the footer's "Cookie settings". Not a modal: the page stays
// usable. Allow and Decline have equal weight (no nudging).
export default function ConsentBanner() {
  const t = useTranslations('Consent')
  const locale = useLocale()
  const consent = useConsent()
  const [reopened, setReopened] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  // The footer button that reopened the banner; focus goes back to it after a choice.
  const trigger = useRef<HTMLElement | null>(null)

  useEffect(
    () =>
      onConsentOpen(() => {
        trigger.current = document.activeElement as HTMLElement | null
        setReopened(true)
      }),
    [],
  )

  // Reopened: move focus into the banner, which covers the footer it was opened from.
  useEffect(() => {
    if (reopened) heading.current?.focus()
  }, [reopened])

  if (consent === undefined || (consent !== null && !reopened)) return null

  const choose = (value: 'granted' | 'denied') => {
    setConsent(value)
    setReopened(false)
    trigger.current?.focus()
    trigger.current = null
  }

  const button =
    'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-ink px-5 text-base font-semibold text-ink hover:bg-ink hover:text-white'

  return (
    <section
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-border bg-surface shadow-[0_-8px_24px_rgb(0_0_0/0.06)]"
    >
      <div className="px-page mx-auto flex max-w-page flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="max-w-[760px]">
          <h2
            id="consent-title"
            ref={heading}
            tabIndex={-1}
            className="text-base font-semibold text-ink focus:outline-none"
          >
            {t('title')}
          </h2>
          <p className="mt-1 text-ui text-ink-soft">
            {t.rich('text', {
              privacy: (chunks) => (
                <a href={`/${locale}/privacy`} className="text-accent underline underline-offset-4 hover:text-ink">
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-3 md:flex">
          <button type="button" className={button} onClick={() => choose('denied')}>
            {t('decline')}
          </button>
          <button type="button" className={button} onClick={() => choose('granted')}>
            {t('allow')}
          </button>
        </div>
      </div>
    </section>
  )
}
