'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  // Listen for consent changes made in the same tab (e.g. from the banner)
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'var(--surface)',
            borderTop: '1px solid var(--border)',
            padding: '1rem 2rem',
          }}
        >
          <div className="cookie-inner">
            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--muted)',
                fontWeight: 300,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              This site uses cookies to improve your experience and for security purposes.
            </p>
            <div className="cookie-buttons">
              <button
                onClick={() => choose('accepted')}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: '0.6rem',
                  padding: '0.55rem 1.4rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Accept
              </button>
              <button
                onClick={() => choose('declined')}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  color: 'var(--muted)',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '0.6rem',
                  padding: '0.55rem 1.4rem',
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
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
