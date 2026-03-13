'use client'

import { Mail } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1 }}>
      <div
        className="footer-inner"
        style={{
          padding: '1.75rem 2rem',
          maxWidth: 1000,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-fira-code)',
              fontSize: '0.65rem',
              color: 'var(--muted)',
              letterSpacing: '0.06em',
            }}
          >
            © 2026 Ivan Karlo Rukavina. {t.footer.rights}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-fira-code)',
              fontSize: '0.55rem',
              color: 'var(--faint)',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
            }}
          >
            {t.footer.recaptcha}{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--faint)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              {t.footer.privacy}
            </a>
            {' '}{t.footer.recaptchaAnd}{' '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--faint)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              {t.footer.terms}
            </a>
            {t.footer.recaptchaEnd ? <>{' '}{t.footer.recaptchaEnd}</> : null}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="mailto:ivankarlo.rukavina@gmail.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--muted)',
              fontSize: '0.78rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <Mail size={14} />
            {t.about.email}
          </a>

          <a
            href="https://linkedin.com/in/rukavina"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--muted)',
              fontSize: '0.78rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            {t.about.linkedin}
          </a>
        </div>
      </div>
    </footer>
  )
}
