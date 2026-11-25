import { useTranslations } from 'next-intl'
import { site } from '@/lib/site'

const facts = ['education', 'location', 'languages'] as const
const paragraphs = ['p1', 'p2'] as const

// About (E1, Figma 511:2807): facts left, text right from lg; text first on phones. No photo.
export default function About() {
  const t = useTranslations('About')

  return (
    <section id="about" aria-labelledby="about-title" className="px-page mx-auto max-w-page">
      <div className="pt-8 pb-16 md:pb-24 lg:pb-28">
        <h2
          id="about-title"
          className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.02em] text-ink md:text-[2.75rem]"
        >
          {t('title')}
        </h2>
        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-8">
          <div className="lg:order-2">
            <div className="max-w-[36em] space-y-5 text-body text-pretty text-ink-soft md:text-lg">
              {paragraphs.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </div>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-base font-medium text-accent underline underline-offset-4 hover:text-ink"
            >
              LinkedIn
            </a>
          </div>

          <dl className="max-w-[360px] border-t border-border lg:order-1">
            {facts.map((key) => (
              <div key={key} className="border-b border-border py-4">
                <dt className="text-caption text-muted">{t(`facts.${key}.label`)}</dt>
                <dd className="mt-1 text-base font-medium text-ink">{t(`facts.${key}.value`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
