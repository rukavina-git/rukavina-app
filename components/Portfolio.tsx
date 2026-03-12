'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const arrowStyle = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  flexShrink: 0,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  cursor: 'pointer',
  color: 'var(--muted)',
  transition: 'background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s',
}

const projects = [
  {
    icon: '📱',
    cat: 'Android · Mobile',
    badge: 'NDA',
    badgeType: 'nda' as const,
    title: 'Government-Scale Android Platform',
    desc: 'Large-scale Android application serving hundreds of thousands of users across a national government agency. Modular, multi-team codebase with offline-first capabilities and strict security requirements.',
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Hilt', 'Room'],
  },
  {
    icon: '🔧',
    cat: 'Android · Mobile',
    badge: 'NDA',
    badgeType: 'nda' as const,
    title: 'Field Service Management App',
    desc: 'Native Android app for a field service company managing technicians, job assignments, and real-time status updates. Offline mode built for areas with poor connectivity.',
    tags: ['Kotlin', 'WorkManager', 'Google Maps SDK', 'SQLite'],
  },
  {
    icon: '🤖',
    cat: 'AI · Backend',
    badge: 'NDA',
    badgeType: 'nda' as const,
    title: 'AI Document Processor',
    desc: "LLM pipeline integrated into a B2B SaaS product to automate document classification and data extraction. Reduced manual processing time significantly for the client's operations team.",
    tags: ['Python', 'OpenAI API', 'REST', 'Firebase'],
  },
  {
    icon: '🌐',
    cat: 'Web · CMS',
    badge: 'Client',
    badgeType: 'client' as const,
    title: 'Restaurant Web Presence',
    desc: 'Complete web presence for a local restaurant — custom site, menu CMS, reservation integration, managed hosting. Built to be maintained without any technical expertise.',
    tags: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Vercel'],
  },
]

const variants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: -dir * 48, opacity: 0 }),
}

export default function Portfolio() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
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
      <div style={{ padding: '7rem 2rem', maxWidth: 1000, margin: '0 auto' }}>
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
            Selected Work
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '0.75rem',
            }}
          >
            Portfolio
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
            Most work is under NDA. Descriptions cover the problem solved and tech used — client names withheld.
          </p>
        </motion.div>

        {/* Slider */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Left arrow — desktop only */}
          <button
            className="hidden md:flex"
            onClick={prev}
            style={arrowStyle}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(95,111,255,0.15)'
              el.style.borderColor = 'rgba(95,111,255,0.35)'
              el.style.color = '#c0c8ff'
              el.style.transform = 'scale(1.06)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(255,255,255,0.05)'
              el.style.borderColor = 'rgba(255,255,255,0.1)'
              el.style.color = 'var(--muted)'
              el.style.transform = 'scale(1)'
            }}
          >
            <ChevronLeft size={18} />
          </button>

        <div
          className="portfolio-slider-box"
          style={{ flex: 1, overflow: 'hidden', borderRadius: '1.5rem', height: 485, cursor: 'grab', userSelect: 'none' }}
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
                }}
              >
                {/* Visual half */}
                <div
                  className="slide-visual"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderRight: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '3rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: 280,
                      height: 280,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(95,111,255,0.1), transparent 65%)',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                  <div style={{ fontSize: '4rem', opacity: 0.45, position: 'relative', zIndex: 1 }}>{p.icon}</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-fira-code)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--faint)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {p.cat}
                  </div>
                </div>

                {/* Content half */}
                <div className="slide-content" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div
                    style={{
                      display: 'inline-block',
                      marginBottom: '1.2rem',
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
                  <div
                    className="slide-title"
                    style={{
                      fontSize: '1.35rem',
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
                      fontSize: '0.9rem',
                      color: 'var(--muted)',
                      lineHeight: 1.8,
                      fontWeight: 300,
                      marginBottom: '1.4rem',
                    }}
                  >
                    {p.desc}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {p.tags.map((t) => (
                      <span
                        key={t}
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
                        {t}
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
            style={arrowStyle}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(95,111,255,0.15)'
              el.style.borderColor = 'rgba(95,111,255,0.35)'
              el.style.color = '#c0c8ff'
              el.style.transform = 'scale(1.06)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(255,255,255,0.05)'
              el.style.borderColor = 'rgba(255,255,255,0.1)'
              el.style.color = 'var(--muted)'
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
              style={{
                width: i === index ? 22 : 6,
                height: 6,
                borderRadius: i === index ? 3 : '50%',
                background: i === index ? 'var(--accent)' : 'rgba(255,255,255,0.12)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (i !== index) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(95,111,255,0.4)'
              }}
              onMouseLeave={(e) => {
                if (i !== index) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
