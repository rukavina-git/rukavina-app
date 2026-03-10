'use client'

import { motion } from 'framer-motion'

const skills = [
  'Android / Kotlin',
  'Jetpack Compose',
  'Next.js',
  'React',
  'System Architecture',
  'REST APIs',
  'Firebase',
  'Architecture Consulting',
]

export default function About() {
  return (
    <section id="about" style={{ position: 'relative', zIndex: 1 }}>
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
            Who I am
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            About
          </h2>
        </motion.div>

        <div
          className="about-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '3.5rem', alignItems: 'start' }}
        >
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.3rem',
                letterSpacing: '-0.01em',
              }}
            >
              Senior Software Engineer
            </div>
            <div
              style={{
                fontFamily: 'var(--font-fira-code)',
                fontSize: '0.72rem',
                color: 'var(--accent)',
                letterSpacing: '0.06em',
                marginBottom: '2rem',
                lineHeight: 1.6,
              }}
            >
              Solutions that ship. Clear communication. Delivered on time.
            </div>

            <div>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.9, fontWeight: 300, marginBottom: '1.1rem' }}>
                I hold a{' '}
                <strong style={{ color: '#b8b8cc', fontWeight: 600 }}>Master&apos;s degree in Computer Science</strong>{' '}
                and have spent my career building software where quality isn&apos;t optional. Government-scale platforms,
                high-security systems, and applications trusted by hundreds of thousands of users.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.9, fontWeight: 300, marginBottom: '1.1rem' }}>
                My work spans{' '}
                <strong style={{ color: '#b8b8cc', fontWeight: 600 }}>native Android development</strong>,{' '}
                <strong style={{ color: '#b8b8cc', fontWeight: 600 }}>web solutions for businesses</strong>, and{' '}
                <strong style={{ color: '#b8b8cc', fontWeight: 600 }}>architecture consulting</strong>. Whether you need a
                production-grade mobile app, a website for your restaurant or shop, or a second opinion on your system
                design, I build and advise with the same standard.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.9, fontWeight: 300 }}>
                I take on projects where I can genuinely deliver. When I commit to something, I see it through. On time,
                with clear communication the whole way.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {skills.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-fira-code)',
                    fontSize: '0.65rem',
                    color: '#9090b8',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.35rem',
                    padding: '0.3rem 0.75rem',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1.5rem',
              padding: '2.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(95,111,255,0.12), transparent 70%)',
                top: -60,
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
              }}
            />

            {/* Avatar */}
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(95,111,255,0.2), rgba(167,139,250,0.1))',
                border: '1px solid rgba(95,111,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#9090cc',
                letterSpacing: '0.05em',
                position: 'relative',
                zIndex: 1,
              }}
            >
              IKR
            </div>

            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Ivan Karlo Rukavina
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-fira-code)',
                  fontSize: '0.65rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                Senior Software Engineer
              </div>
            </div>

            <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.07)' }} />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-fira-code)',
                fontSize: '0.75rem',
                color: 'var(--muted)',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ color: 'var(--accent)' }}>◎</span>
              Split, Croatia
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-fira-code)',
                fontSize: '0.75rem',
                color: 'var(--muted)',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ color: 'var(--accent)' }}>✦</span>
              Remote · Worldwide
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
