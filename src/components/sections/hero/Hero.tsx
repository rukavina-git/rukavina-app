import { useTranslations } from 'next-intl'
import { heroSlides } from '@/lib/data/heroSlides'
import { projectAnchor } from '@/lib/site'
import PhoneLoop from './PhoneLoop'

export default function Hero() {
  const t = useTranslations('Hero')

  const slides = heroSlides.map((slide) => ({
    ...slide,
    href: `#${projectAnchor(slide.id)}`,
    name: t(`slides.${slide.id}.name`),
    caption: t(`slides.${slide.id}.caption`),
    alt: t(`slides.${slide.id}.alt`),
  }))

  return (
    <section aria-labelledby="hero-title" className="px-page mx-auto max-w-page">
      <div className="grid gap-14 pt-14 pb-16 md:pt-24 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 lg:pt-44 lg:pb-12 xl:mr-7">
        <div>
          <h1
            id="hero-title"
            className="max-w-[860px] text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-ink md:text-[3.5rem] xl:text-display"
          >
            {t('title')}
          </h1>
          <div className="mt-6 max-w-[600px] space-y-4 text-body text-ink-soft md:mt-10 md:text-lead">
            <p>{t('intro1')}</p>
            <p>{t('intro2')}</p>
          </div>
          <a
            href="#work"
            className="group mt-8 inline-flex min-h-11 items-center gap-2 text-base font-medium text-ink hover:underline hover:underline-offset-4 md:mt-9"
          >
            {t('cue')}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" />
            </svg>
          </a>
        </div>

        <PhoneLoop
          slides={slides}
          labels={{
            region: t('carousel'),
            pause: t('pause'),
            play: t('play'),
            show: slides.map((s, i) =>
              t('show', { index: i + 1, total: slides.length, name: s.name }),
            ),
          }}
        />
      </div>
    </section>
  )
}
