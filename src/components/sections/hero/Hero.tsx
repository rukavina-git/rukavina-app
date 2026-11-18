'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import HeroGradient from './HeroGradient'

export default function Hero() {
  const t = useTranslations('Hero')
  const subRef = useRef<HTMLParagraphElement>(null)
  const actsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let gsap: typeof import('gsap').gsap | undefined

    import('gsap').then(({ gsap: g }) => {
      gsap = g

      g.from('.hl-line > span', {
        yPercent: 110,
        duration: 1.05,
        ease: 'power4.out',
        stagger: 0.14,
        clearProps: 'transform',
      })

      if (subRef.current) {
        g.from(subRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          delay: 0.45,
          ease: 'power3.out',
          clearProps: 'all',
        })
      }

      if (actsRef.current) {
        g.from(actsRef.current.children, {
          opacity: 0,
          y: 18,
          duration: 0.8,
          delay: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'all',
        })
      }
    })

    return () => {
      gsap?.killTweensOf('.hl-line > span')
      if (subRef.current) gsap?.killTweensOf(subRef.current)
      if (actsRef.current) gsap?.killTweensOf(actsRef.current.children)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroGradient />

      <div className="relative z-[2] mx-auto max-w-[720px] px-[5%] py-24 flex flex-col items-center text-center">

        <h1
          className="font-extrabold leading-[1.06] tracking-[-0.03em] mb-7"
          style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: '#1A1915', fontWeight: 800 }}
        >
          <span className="hl-line"><span>{t('line1')}</span></span>
          <span className="hl-line"><span>{t('line2')}</span></span>
        </h1>

        <p
          ref={subRef}
          className="text-[18px] mb-12 leading-[1.75] font-light"
          style={{ color: '#7A736B' }}
        >
          {t('sub')}
        </p>

        <div ref={actsRef} className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/contact"
            className="inline-flex items-center bg-accent text-white text-[15px] font-medium px-[30px] py-[13px] rounded-lg transition-all duration-300 hover:bg-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,58,75,0.25)] no-underline"
          >
            {t('ctaPrimary')}
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center text-[15px] font-medium px-[30px] py-[13px] rounded-lg transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-0.5 no-underline"
            style={{ border: '1.5px solid #D8D3C8', color: '#1A1915' }}
          >
            {t('ctaSecondary')}
          </Link>
        </div>

      </div>
    </section>
  )
}
