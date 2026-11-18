'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'

export default function HowItWorks() {
  const t = useTranslations('HowItWorks')
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const steps = [
    { number: '01', name: t('01.name'), desc: t('01.desc') },
    { number: '02', name: t('02.name'), desc: t('02.desc') },
    { number: '03', name: t('03.name'), desc: t('03.desc') },
  ]

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'all',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
        })
      }

      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll(':scope > div'), {
          opacity: 0,
          y: 44,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.13,
          clearProps: 'all',
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
        })
      }
    })
  }, [])

  return (
    <section className="py-24 px-[5%] bg-bg">
      <div ref={headerRef}>
        <SectionLabel>{t('label')}</SectionLabel>
        <h2
          className="font-bold tracking-[-0.03em] leading-[1.1] mb-4"
          style={{ fontSize: 'clamp(30px, 3.5vw, 46px)' }}
        >
          {t('title')}
        </h2>
        <p className="text-[16px] text-muted max-w-[460px] font-light leading-[1.75] mb-14">
          {t('sub')}
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-xl overflow-hidden"
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`bg-card p-11 transition-colors duration-300 hover:bg-bg group ${
              i < steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''
            }`}
          >
            <span className="block text-[64px] font-bold tracking-[-0.06em] text-border leading-none mb-5 transition-colors duration-[400ms] group-hover:text-warm">
              {step.number}
            </span>
            <div className="text-[20px] font-bold tracking-[-0.02em] text-text mb-3">
              {step.name}
            </div>
            <p className="text-[14px] text-muted leading-[1.75] font-light">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
