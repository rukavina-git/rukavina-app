import type { Metadata } from 'next'
import { useLocale, useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

// Own title instead of the homepage's (Next adds noindex to 404s itself).
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NotFound')
  return { title: t('title') }
}

export default function NotFound() {
  const t = useTranslations('NotFound')
  const locale = useLocale()

  return (
    <section className="px-page mx-auto max-w-page py-24 md:py-40">
      <h1 className="text-[2.5rem] leading-[1.1] font-semibold tracking-[-0.035em] text-ink md:text-[3.5rem]">
        {t('title')}
      </h1>
      <p className="mt-5 max-w-[600px] text-body text-ink-soft md:text-lead">{t('text')}</p>
      <a
        href={`/${locale}`}
        className="mt-6 inline-flex min-h-11 items-center text-base font-medium text-accent underline underline-offset-4 hover:text-ink"
      >
        {t('home')}
      </a>
    </section>
  )
}
