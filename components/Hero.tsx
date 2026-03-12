'use client'

import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

// LCP-safe variant: text is immediately visible (opacity: 1) so crawlers and
// Lighthouse see it on first paint. Only the vertical slide animates.
const fadeUpLCP = (delay = 0) => ({
  initial: { opacity: 1, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const stats = [
  { val: 'On-time delivery', label: 'Commitment' },
  { val: '100k+', label: 'Users reached' },
  { val: '10+', label: 'Projects shipped' },
]

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1rem, 3vw, 2rem) clamp(4rem, 7vw, 7rem)',
        zIndex: 1,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, width: '100%' }}>
        {/* Available badge */}
        <motion.div {...fadeUp(0.1)} style={{ marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-fira-code)',
              fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              background: 'rgba(95,111,255,0.08)',
              border: '1px solid rgba(95,111,255,0.2)',
              borderRadius: '2rem',
              padding: '0.35rem 0.9rem',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--green)',
                boxShadow: '0 0 6px var(--green)',
                animation: 'pulse 2s ease-in-out infinite',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            Available for work
          </div>
        </motion.div>

        {/* H1 — uses fadeUpLCP so opacity is 1 from first paint (LCP fix) */}
        <motion.h1
          {...fadeUpLCP(0.2)}
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ color: 'var(--text)', display: 'block' }}>Bring your idea.</span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Leave with a product.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
            color: 'var(--muted)',
            fontWeight: 300,
            lineHeight: 1.75,
            maxWidth: 520,
            margin: '0 auto 2.5rem',
          }}
        >
          Mobile apps, web solutions, and technical consulting — delivered on time, with clear communication from start to finish.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.4)}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          <a
            href="#contact"
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#fff',
              background: 'var(--accent)',
              borderRadius: '0.75rem',
              padding: '0.85rem 1.8rem',
              boxShadow: '0 0 24px rgba(95,111,255,0.3)',
              transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#4a5aee'
              el.style.boxShadow = '0 0 36px rgba(95,111,255,0.45)'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'var(--accent)'
              el.style.boxShadow = '0 0 24px rgba(95,111,255,0.3)'
              el.style.transform = 'translateY(0)'
            }}
          >
            Get in Touch
          </a>
          <a
            href="#portfolio"
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'var(--accent)',
              background: 'rgba(95,111,255,0.08)',
              border: '1px solid rgba(95,111,255,0.25)',
              borderRadius: '0.75rem',
              padding: '0.85rem 1.8rem',
              transition: 'background 0.2s, border-color 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(95,111,255,0.15)'
              el.style.borderColor = 'rgba(95,111,255,0.4)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(95,111,255,0.08)'
              el.style.borderColor = 'rgba(95,111,255,0.25)'
            }}
          >
            See My Work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.5)}>
          <div
            className="hero-stats"
            style={{
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1rem',
              overflow: 'hidden',
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '0.9rem 1.8rem',
                  textAlign: 'center',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(95,111,255,0.05)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
              >
                <div style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                  {s.val}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-fira-code)',
                    fontSize: 'clamp(0.55rem, 0.8vw, 0.65rem)',
                    color: 'var(--subtle)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: '0.2rem',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
