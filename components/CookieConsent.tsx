'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'

const STORAGE_KEY = 'cookie_consent'

export type ConsentValue = 'accepted' | 'declined' | null

export function useCookieConsent(): ConsentValue {
  const [consent, setConsent] = useState<ConsentValue>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored)
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue
      setConsent(stored)
    }
    window.addEventListener('cookie_consent_change', handler)
    return () => window.removeEventListener('cookie_consent_change', handler)
  }, [])

  return consent
}

export default function CookieConsent() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  const choose = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value)
    window.dispatchEvent(new Event('cookie_consent_change'))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            bottom: 24,
            left: 0,
            right: 0,
            margin: '0 auto',
            width: 'calc(100vw - 48px)',
            maxWidth: 860,
            zIndex: 1000,
            background: '#0F0F1A',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            padding: '1.25rem 1.75rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(95,111,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <p
            style={{
              flex: 1,
              minWidth: 200,
              fontSize: '0.875rem',
              color: 'var(--muted)',
              fontWeight: 300,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {t.cookies.text}{' '}
            <Link
              href="/privacy"
              style={{ color: 'var(--muted)', textDecoration: 'underline' }}
            >
              {t.privacy.link}
            </Link>
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
            <button
              onClick={() => choose('accepted')}
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#fff',
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '0.6rem',
                padding: '0.65rem 1.6rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              {t.cookies.accept}
            </button>
            <button
              onClick={() => choose('declined')}
              style={{
                fontSize: '0.875rem',
                fontWeight: 400,
                color: 'var(--muted)',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '0.6rem',
                padding: '0.65rem 1.6rem',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.color = 'var(--muted)'
              }}
            >
              {t.cookies.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
