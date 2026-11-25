import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { site } from '@/lib/site'

const facts = ['education', 'location', 'languages'] as const
const paragraphs = ['p1', 'p2', 'p3'] as const

// About: text and facts left, photo right from lg, the same direction as the Work split
// (taste: one split direction per page; impeccable: facts grouped with the story). Phones: text,
// facts, then the photo. The photo is a trust signal for hiring managers (Karlo, 2026-11-25).
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
        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div>
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
            <dl className="mt-8 grid max-w-[46rem] gap-x-6 sm:grid-cols-3">
              {facts.map((key) => (
                <div key={key} className="border-t border-border py-4">
                  <dt className="text-caption text-muted">{t(`facts.${key}.label`)}</dt>
                  <dd className="mt-1 text-base font-medium text-ink">{t(`facts.${key}.value`)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Image
            src="/profile/ivan-karlo-rukavina.jpg"
            alt={site.name}
            width={720}
            height={960}
            sizes="(min-width: 1024px) 400px, 320px"
            className="aspect-[3/4] w-full max-w-[320px] rounded-xl object-cover lg:max-w-[400px] lg:justify-self-end"
          />
        </div>
      </div>
    </section>
  )
}
