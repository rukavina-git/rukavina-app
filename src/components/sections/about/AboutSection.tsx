'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import ProfileCard from './ProfileCard'

const skills = [
  'Kotlin', 'Android', 'Java', 'JavaScript', 'TypeScript',
  'React', 'Node.js', 'Hilt / DI', 'MVVM', 'Clean Architecture',
  'REST / GraphQL', 'SQL', 'Git / CI',
]

interface AboutSectionProps {
  teaser?: boolean
}

export default function AboutSection({ teaser = false }: AboutSectionProps) {
  const t = useTranslations('AboutSection')
  const contentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const trigger = contentRef.current?.parentElement ?? contentRef.current
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          x: -36,
          duration: 0.95,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger, start: 'top 78%' },
        })
      }
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          x: 36,
          duration: 0.95,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger, start: 'top 78%' },
        })
      }
      if (skillsRef.current) {
        gsap.from(skillsRef.current.children, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.04,
          clearProps: 'all',
          scrollTrigger: { trigger: skillsRef.current, start: 'top 85%' },
        })
      }
    })
  }, [])

  if (teaser) {
    return (
      <section className="py-24 px-[5%] bg-bg">
        <SectionLabel>{t('label')}</SectionLabel>
        <blockquote className="text-[clamp(22px,3vw,36px)] font-bold tracking-[-0.03em] leading-[1.2] max-w-[640px] text-text mb-8">
          &ldquo;{t('teaserQuote')}&rdquo;
        </blockquote>
        <Link
          href="/about"
          className="text-[14px] font-semibold text-accent no-underline transition-colors duration-300 hover:text-dark"
        >
          {t('moreCta')} →
        </Link>
      </section>
    )
  }

  return (
    <section className="py-24 px-[5%] bg-bg">
      <SectionLabel>{t('label')}</SectionLabel>
      <h2
        className="font-bold tracking-[-0.03em] leading-[1.1] mb-14"
        style={{ fontSize: 'clamp(30px, 3.5vw, 46px)' }}
      >
        {t('title')}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-20 items-start">
        <div ref={contentRef}>
          {(
            [
              { text: t('p1'), strong: t('p1Strong') },
              { text: t('p2'), strong: t('p2Strong') },
              { text: t('p3'), strong: t('p3Strong') },
              { text: t('p4'), strong: t('p4Strong') },
            ] as const
          ).map(({ text, strong }, i) => {
            const parts = text.split(strong)
            return (
              <p key={i} className="text-[16px] text-muted leading-[1.85] font-light mb-5">
                {parts[0]}
                <strong className="text-text font-medium">{strong}</strong>
                {parts[1]}
              </p>
            )
          })}

          <div className="text-[12px] font-semibold tracking-[0.1em] uppercase text-muted mt-8 mb-4">
            {t('techLabel')}
          </div>
          <div ref={skillsRef} className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-[13px] font-medium text-text bg-card border border-border px-3.5 py-1.5 rounded-full transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-px cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div ref={cardRef}>
          <ProfileCard />
        </div>
      </div>
    </section>
  )
}
