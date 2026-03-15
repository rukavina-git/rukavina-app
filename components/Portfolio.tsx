'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Smartphone, Shield, Globe, Cpu, type LucideIcon } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const arrowStyle = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  flexShrink: 0,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  cursor: 'pointer',
  color: 'var(--text)',
  transition: 'background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s',
}

type Project = {
  Icon: LucideIcon
  cat: string
  badge: string
  badgeType: 'nda' | 'client'
  title: string
  desc: string
  tags: string[]
}

const variants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: -dir * 48, opacity: 0 }),
}

export default function Portfolio() {
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const projects: Project[] = [
    {
      Icon: Smartphone,
      cat: 'Android · Mobile',
      badge: 'NDA',
      badgeType: 'nda',
      title: t.portfolio.p1title,
      desc: t.portfolio.p1desc,
      tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Hilt', 'Coroutines'],
    },
    {
      Icon: Shield,
      cat: 'Android · Fintech',
      badge: 'NDA',
      badgeType: 'nda',
      title: t.portfolio.p2title,
      desc: t.portfolio.p2desc,
      tags: ['Kotlin', 'NFC', 'Cryptography', 'gRPC', 'Blockchain'],
    },
    {
      Icon: Globe,
      cat: 'Web · CMS',
      badge: 'Client',
      badgeType: 'client',
      title: t.portfolio.p3title,
      desc: t.portfolio.p3desc,
      tags: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Vercel'],
    },
    {
      Icon: Cpu,
      cat: 'AI · Automation',
      badge: 'NDA',
      badgeType: 'nda',
      title: t.portfolio.p4title,
      desc: t.portfolio.p4desc,
      tags: ['Python', 'OpenAI API', 'REST', 'Firebase'],
    },
  ]

  const N = projects.length

  const prev = () => {
    setDir(-1)
    setIndex((i) => (i - 1 + N) % N)
  }

  const next = () => {
    setDir(1)
    setIndex((i) => (i + 1) % N)
  }

  const goTo = (i: number) => {
    setDir(i > index ? 1 : -1)
    setIndex(i)
  }

  const p = projects[index]

  // Drag / swipe
  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef(false)

  const onDragStart = useCallback((clientX: number) => {
    dragStartX.current = clientX
    isDragging.current = true
  }, [])

  const onDragEnd = useCallback((clientX: number) => {
    if (!isDragging.current || dragStartX.current === null) return
    isDragging.current = false
    const delta = clientX - dragStartX.current
    if (delta < -50) next()
    else if (delta > 50) prev()
    dragStartX.current = null
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="portfolio" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 3vw, 2rem)', maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-fira-code)',
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1rem',
              display: 'block',
            }}
          >
            {t.portfolio.label}
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '0.75rem',
            }}
          >
            {t.portfolio.title}
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--subtle)',
              fontWeight: 300,
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {t.portfolio.nda}
          </p>
        </motion.div>

        {/* Slider */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Left arrow — desktop only */}
          <button
            className="hidden md:flex"
            onClick={prev}
            aria-label="Previous project"
            style={arrowStyle}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'var(--accent)'
              el.style.borderColor = 'var(--accent)'
              el.style.color = '#fff'
              el.style.transform = 'scale(1.06)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(255,255,255,0.08)'
              el.style.borderColor = 'rgba(255,255,255,0.12)'
              el.style.color = 'var(--text)'
              el.style.transform = 'scale(1)'
            }}
          >
            <ChevronLeft size={18} />
          </button>

        <div
          className="portfolio-slider-box"
          style={{ flex: 1, overflow: 'visible', borderRadius: '1.5rem', height: 'clamp(300px, 35vw, 480px)', cursor: 'grab', userSelect: 'none' }}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onMouseLeave={(e) => { if (isDragging.current) onDragEnd(e.clientX) }}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="portfolio-slide-motion"
              style={{ height: '100%' }}
            >
              <div
                className="portfolio-slide"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  overflow: 'hidden',
                  height: '100%',
                  alignItems: 'stretch',
                }}
              >
                {/* Visual half */}
                <div
                  className="slide-visual"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <p.Icon
                    size={64}
                    style={{
                      color: 'var(--accent)',
                      filter: 'drop-shadow(0 0 24px rgba(95,111,255,0.4))',
                      position: 'relative',
                      zIndex: 1,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: 'var(--font-fira-code)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {p.cat}
                  </div>
                </div>

                {/* Content half */}
                <div className="slide-content" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Badge row */}
                    <div style={{ marginBottom: '1.2rem' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-fira-code)',
                          fontSize: '0.6rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.7rem',
                          borderRadius: '0.3rem',
                          width: 'fit-content',
                          ...(p.badgeType === 'nda'
                            ? { color: '#f87171', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)' }
                            : { color: '#60a5fa', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)' }),
                        }}
                      >
                        {p.badge}
                      </div>
                    </div>
                    <div
                      className="slide-title"
                      style={{
                        fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
                        fontWeight: 800,
                        color: 'var(--text)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.25,
                        marginBottom: '0.9rem',
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      className="slide-desc"
                      style={{
                        fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                        color: 'var(--muted)',
                        lineHeight: 1.8,
                        fontWeight: 300,
                      }}
                    >
                      {p.desc}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '1.25rem' }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-fira-code)',
                          fontSize: '0.68rem',
                          color: '#9090b8',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '0.35rem',
                          padding: '0.3rem 0.7rem',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

          {/* Right arrow — desktop only */}
          <button
            className="hidden md:flex"
            onClick={next}
            aria-label="Next project"
            style={arrowStyle}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'var(--accent)'
              el.style.borderColor = 'var(--accent)'
              el.style.color = '#fff'
              el.style.transform = 'scale(1.06)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(255,255,255,0.08)'
              el.style.borderColor = 'rgba(255,255,255,0.12)'
              el.style.color = 'var(--text)'
              el.style.transform = 'scale(1)'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (i !== index) (e.currentTarget.firstElementChild as HTMLElement).style.background = 'rgba(95,111,255,0.4)'
              }}
              onMouseLeave={(e) => {
                if (i !== index) (e.currentTarget.firstElementChild as HTMLElement).style.background = 'rgba(255,255,255,0.12)'
              }}
            >
              <span
                style={{
                  width: i === index ? 22 : 6,
                  height: 6,
                  borderRadius: i === index ? 3 : '50%',
                  background: i === index ? 'var(--accent)' : 'rgba(255,255,255,0.12)',
                  display: 'block',
                  transition: 'all 0.3s',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
