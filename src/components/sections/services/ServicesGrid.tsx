'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import ServiceCard from './ServiceCard'

interface ServicesGridProps {
  teaser?: boolean
}

export default function ServicesGrid({ teaser = false }: ServicesGridProps) {
  const t = useTranslations('ServicesSection')
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const cards = [
    { number: '01', name: t('01.name'), desc: t('01.desc') },
    { number: '02', name: t('02.name'), desc: t('02.desc') },
    { number: '03', name: t('03.name'), desc: t('03.desc') },
    { number: '04', name: t('04.name'), desc: t('04.desc') },
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
          stagger: 0.1,
          clearProps: 'all',
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
        })
      }
    })
  }, [])

  return (
    <section className="py-24 px-[5%] bg-bg-alt">
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
        className="grid grid-cols-1 sm:grid-cols-2 border-2 border-border rounded-xl overflow-hidden gap-px bg-border"
      >
        {cards.map((card) => (
          <ServiceCard key={card.number} {...card} />
        ))}
      </div>

      {teaser && (
        <div className="mt-10">
          <Link
            href="/services"
            className="text-[14px] font-semibold text-accent no-underline transition-colors duration-300 hover:text-dark"
          >
            {t('cta')} →
          </Link>
        </div>
      )}
    </section>
  )
}
