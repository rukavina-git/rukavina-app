import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { site } from '@/lib/site'
import { languageAlternates, siteUrl } from '@/lib/seo'

const sections = ['form', 'recaptcha', 'nothingElse', 'rights'] as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Privacy' })
  const url = `${siteUrl}/${locale}/privacy`
  return {
    title: t('metaTitle'),
    alternates: { canonical: url, languages: languageAlternates('/privacy') },
    openGraph: { url, title: t('metaTitle') },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <Privacy />
}

function Privacy() {
  const t = useTranslations('Privacy')
  const email = () => (
    <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4 hover:text-ink">
      {site.email}
    </a>
  )
  const google = (chunks: React.ReactNode) => (
    <a
      href="https://policies.google.com/privacy"
      className="text-accent underline underline-offset-4 hover:text-ink"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  )

  return (
    <article className="px-page mx-auto max-w-page py-16 md:py-24">
      <h1 className="text-[2.5rem] leading-[1.1] font-semibold tracking-[-0.035em] text-ink md:text-[3.5rem]">
        {t('title')}
      </h1>
      <p className="mt-5 max-w-[680px] text-body text-ink-soft md:text-lead">{t('intro', { name: site.name })}</p>
      <div className="mt-10 max-w-[680px] space-y-8">
        {sections.map((key) => (
          <section key={key}>
            <h2 className="text-h4 font-semibold text-ink">{t(`${key}.title`)}</h2>
            <p className="mt-2 text-body leading-[1.55] text-ink-soft">
              {t.rich(`${key}.text`, { email, google })}
            </p>
          </section>
        ))}
      </div>
    </article>
  )
}
