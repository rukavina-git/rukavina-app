import { useTranslations } from 'next-intl'
import { heroSlides } from '@/lib/data/heroSlides'
import { projectAnchor } from '@/lib/site'
import PhoneLoop from './PhoneLoop'

// E1 hero (decision 0010, Figma 511:2807): headline left, tilted phone right that rotates
// through the projects. Text and phone rise once on load.
export default function Hero() {
  const t = useTranslations('Hero')

  const slides = heroSlides.map((slide) => ({
    ...slide,
    href: `#${projectAnchor(slide.id)}`,
    name: t(`slides.${slide.id}.name`),
    alt: t(`slides.${slide.id}.alt`),
  }))

  return (
    <section aria-labelledby="hero-title" className="px-page mx-auto max-w-page">
      <div className="grid items-center gap-12 pt-10 pb-16 md:pt-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12 lg:pt-20 lg:pb-20">
        <div className="hero-enter">
          <h1
            id="hero-title"
            className="max-w-[760px] text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance text-ink md:text-[3.25rem] xl:text-[4rem]"
          >
            {t('title')}
          </h1>
          <p className="mt-6 max-w-[34em] text-body text-pretty text-ink-soft md:mt-7 md:text-lg">
            {t('intro')}
          </p>
          <a
            href="#work"
            className="link-draw mt-6 inline-flex min-h-11 items-center gap-2 text-base font-medium text-ink md:mt-8"
          >
            {t('cue')}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <PhoneLoop
          slides={slides}
          screens={{
            'government-platform': {
              title: t('screens.government-platform.title'),
              text: t('screens.government-platform.text'),
              route: t('screens.government-platform.route'),
              action: t('screens.government-platform.action'),
            },
            'payments-app': {
              label: t('screens.payments-app.label'),
              amount: t('screens.payments-app.amount'),
              done: t('screens.payments-app.done'),
            },
          }}
          labels={{
            region: t('carousel'),
            pause: t('pause'),
            play: t('play'),
            browse: t('browse'),
            show: slides.map((s, i) =>
              t('show', { index: i + 1, total: slides.length, name: s.name }),
            ),
          }}
        />
      </div>
    </section>
  )
}
