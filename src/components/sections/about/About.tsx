import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { site } from '@/lib/site'

const facts = ['education', 'location', 'languages'] as const
const paragraphs = ['p1', 'p2'] as const

// Figma 336:1262. Desktop: photo and facts left, text right. Phones: text first.
export default function About() {
  const t = useTranslations('About')

  return (
    <section id="about" aria-labelledby="about-title" className="px-page mx-auto max-w-page">
      <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[360px_minmax(0,760px)] lg:gap-12 lg:pt-28 lg:pb-[120px]">
        <div className="lg:order-2">
          <h2
            id="about-title"
            className="text-[2rem] leading-[1.2] font-semibold tracking-[-0.03em] text-ink md:text-h2"
          >
            {t('title')}
          </h2>
          <div className="mt-5 space-y-5 text-body leading-[1.55] text-ink-soft md:text-[1.1875rem]">
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

        <div className="w-full max-w-[360px] lg:order-1">
          <Image
            src="/profile/ivan-karlo-rukavina.jpg"
            alt={site.name}
            width={720}
            height={960}
            sizes="360px"
            className="aspect-[3/4] w-full rounded-lg object-cover"
          />
          <dl className="mt-6">
            {facts.map((key) => (
              <div key={key} className="flex items-baseline gap-4 border-t border-border-strong py-3">
                <dt className="w-[104px] shrink-0 text-ui font-medium text-muted">
                  {t(`facts.${key}.label`)}
                </dt>
                <dd className="text-base font-semibold text-ink">{t(`facts.${key}.value`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
