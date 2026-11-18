'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'

export default function FAQAccordion() {
  const t = useTranslations('FAQ')
  const [open, setOpen] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const items = ['01', '02', '03', '04', '05', '06'] as const

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (listRef.current) {
        gsap.from(listRef.current.querySelectorAll(':scope > div'), {
          opacity: 0,
          y: 22,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.07,
          clearProps: 'all',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        })
      }
    })
  }, [])

  return (
    <section className="py-24 px-[5%] bg-bg-alt">
      <SectionLabel>{t('label')}</SectionLabel>
      <h2
        className="font-bold tracking-[-0.03em] leading-[1.1] mb-14"
        style={{ fontSize: 'clamp(30px, 3.5vw, 46px)' }}
      >
        {t('title')}
      </h2>

      <div ref={listRef} className="max-w-[720px] border border-border rounded-xl overflow-hidden">
        {items.map((key, i) => (
          <div
            key={key}
            className={i < items.length - 1 ? 'border-b border-border' : ''}
          >
            <button
              type="button"
              onClick={() => setOpen(open === key ? null : key)}
              className={`w-full bg-card border-none px-6 py-5 text-[15px] font-medium text-text text-left flex justify-between items-center gap-4 transition-colors duration-300 cursor-pointer ${
                open === key ? 'bg-bg' : 'hover:bg-bg'
              }`}
            >
              <span>{t(`${key}.q`)}</span>
              <span
                className={`text-[22px] text-muted leading-none font-light transition-all duration-350 shrink-0 ${
                  open === key ? 'rotate-45 text-warm' : ''
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-[450ms] bg-bg ${
                open === key ? 'max-h-[200px] px-6 pt-1 pb-5' : 'max-h-0 px-6 py-0'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <p className="text-[14px] text-muted leading-[1.8] font-light">{t(`${key}.a`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
