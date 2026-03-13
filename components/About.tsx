'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

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
  const { t } = useLang()

  return (
    <section id="about" style={{ position: 'relative', zIndex: 1 }}>
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
            {t.about.label}
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            {t.about.title}
          </h2>
        </motion.div>

        <div
          className="about-grid"
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) clamp(300px, 30vw, 420px)', gap: '3.5rem', alignItems: 'start' }}
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
              {t.about.role}
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
              {t.about.tagline}
            </div>

            <div>
              <p style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'var(--muted)', lineHeight: 1.9, fontWeight: 300, marginBottom: '1.1rem' }}>
                {t.about.bio1}
              </p>
              <p style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'var(--muted)', lineHeight: 1.9, fontWeight: 300, marginBottom: '1.1rem' }}>
                {t.about.bio2}
              </p>
              <p style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'var(--muted)', lineHeight: 1.9, fontWeight: 300 }}>
                {t.about.bio3}
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
            className="about-card"
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
                {t.about.role}
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
              {t.about.location}
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
              {t.about.remote}
            </div>

            <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.07)' }} />

            <a
              href="mailto:ivan@rukavina.app"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-fira-code)',
                fontSize: '0.75rem',
                color: 'var(--muted)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              <Mail size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              {t.about.email}
            </a>

            <a
              href="https://www.linkedin.com/in/ivan-karlo-rukavina"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-fira-code)',
                fontSize: '0.75rem',
                color: 'var(--muted)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              <Linkedin size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              {t.about.linkedin}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
