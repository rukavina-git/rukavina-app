'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCookieConsent } from './CookieConsent'

export default function ScrollToTop() {
  const [scrolled, setScrolled] = useState(false)
  const consent = useCookieConsent()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hide while the cookie banner is showing (consent === null means not yet decided)
  const visible = scrolled && consent !== null

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="md:hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 200,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#5F6FFF',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(95,111,255,0.4)',
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
