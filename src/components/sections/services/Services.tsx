import { useTranslations } from 'next-intl'

const items = ['development', 'ai', 'review'] as const

// "What I take on" (E1, Figma 511:2807): title and text rows under the heading. Plain rows,
// not links, until the services have pages of their own.
export default function Services() {
  const t = useTranslations('Services')
  return (
    <section id="services" aria-labelledby="services-title" className="px-page mx-auto max-w-page">
      <div className="py-16 md:py-24 lg:py-28">
        <h2
          id="services-title"
          className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.02em] text-ink md:text-[2.75rem]"
        >
          {t('title')}
        </h2>
        <ul className="mt-8 border-t border-border md:mt-10">
          {items.map((key) => (
            <li
              key={key}
              className="grid gap-2 border-b border-border py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-8 md:py-10"
            >
              <h3 className="text-[1.375rem] leading-[1.2] font-semibold tracking-[-0.02em] text-ink md:text-[1.75rem]">
                {t(`items.${key}.title`)}
              </h3>
              <p className="max-w-[60ch] text-body text-pretty text-ink-soft">{t(`items.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
