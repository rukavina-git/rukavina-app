'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import ProjectCard from './ProjectCard'
import { projects, type Project } from '@/lib/data/projects'

interface WorkGridProps {
  teaser?: boolean
}

export default function WorkGrid({ teaser = false }: WorkGridProps) {
  const t = useTranslations('WorkSection')
  const [filter, setFilter] = useState<'all' | 'android' | 'web'>('all')
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const displayed: Project[] = teaser
    ? projects.slice(0, 3)
    : filter === 'all'
      ? projects
      : projects.filter((p) => p.type === filter)

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

        {!teaser && (
          <div className="flex gap-2 mb-10">
            {(
              [
                { key: 'all', label: t('filterAll') },
                { key: 'android', label: t('filterAndroid') },
                { key: 'web', label: t('filterWeb') },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`text-[13px] font-medium px-4 py-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                  filter === key
                    ? 'bg-accent text-white border-accent'
                    : 'bg-card text-muted border-border hover:border-accent hover:text-accent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayed.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {teaser && (
        <div className="mt-10">
          <Link
            href="/work"
            className="text-[14px] font-semibold text-accent no-underline transition-colors duration-300 hover:text-dark"
          >
            {t('cta')} →
          </Link>
        </div>
      )}
    </section>
  )
}
