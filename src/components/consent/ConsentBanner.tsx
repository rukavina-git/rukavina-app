'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { dismissNotice, useNoticeSeen } from '@/lib/consent'

// Cookie notice on the first visit. A quiet bar along the bottom edge in the page's own light
// surface, so it never covers the hero's text or actions. Not a modal; the page stays usable.
// Informational only: the site sets no optional cookies.
export default function ConsentBanner() {
  const t = useTranslations('Consent')
  const seen = useNoticeSeen()

  if (seen !== false) return null

  function close() {
    dismissNotice()
    // The button unmounts; hand keyboard focus to the content instead of dropping it on <body>.
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <section
      aria-label={t('label')}
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-border-strong bg-surface shadow-[0_-8px_24px_rgb(22_22_22/0.06)] motion-safe:animate-[notice-rise_480ms_cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="px-page mx-auto flex max-w-page flex-col gap-3 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="max-w-[72ch] text-small leading-[1.5] text-ink-soft">
          {t.rich('text', {
            privacy: (chunks) => (
              <Link
                href="/privacy"
                className="font-medium whitespace-nowrap text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
        <button
          type="button"
          onClick={close}
          className="inline-flex min-h-11 w-full shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-muted bg-surface px-6 text-ui font-semibold text-ink transition-colors hover:border-ink hover:bg-bg sm:w-auto"
        >
          {t('ok')}
        </button>
      </div>
    </section>
  )
}
