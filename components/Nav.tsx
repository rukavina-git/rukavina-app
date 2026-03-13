'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const langOptions = [
  { code: 'en' as const, flag: '🇬🇧', label: 'English' },
  { code: 'hr' as const, flag: '🇭🇷', label: 'Hrvatski' },
]

const links = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

function detectDefaultLang(): 'en' | 'hr' {
  const nav = typeof navigator !== 'undefined' ? navigator.language : ''
  return /^(hr|bs|sr)/i.test(nav) ? 'hr' : 'en'
}

export default function Nav() {
  const [lang, setLang] = useState<'en' | 'hr'>('en')
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('language') as 'en' | 'hr' | null
    setLang(stored ?? detectDefaultLang())
  }, [])

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function switchLang(l: 'en' | 'hr') {
    setLang(l)
    localStorage.setItem('language', l)
    setOpen(false)
  }

  const current = langOptions.find((o) => o.code === lang)!

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(6,6,9,0.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0 clamp(1rem, 3vw, 2rem)',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 1200, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Logo */}
      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
        IKR<span style={{ color: 'var(--accent)' }}>.</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex" style={{ gap: '2rem' }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{ fontSize: 'clamp(0.8rem, 0.9vw, 0.875rem)', color: 'var(--muted)', fontWeight: 400, transition: 'color 0.2s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)')}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Right side: Language Picker + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Language dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-fira-code), monospace',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.3rem 0.4rem',
              borderRadius: '0.4rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
          >
            <span>{current.flag}</span>
            <span>{current.code}</span>
            <ChevronDown size={11} style={{ opacity: 0.6, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          {open && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: 0,
                background: 'rgba(15,15,26,0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                overflow: 'hidden',
                minWidth: 130,
                zIndex: 200,
              }}
            >
              {langOptions.map((opt) => {
                const active = lang === opt.code
                return (
                  <button
                    key={opt.code}
                    onClick={() => switchLang(opt.code)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      fontFamily: 'var(--font-fira-code), monospace',
                      fontSize: '0.75rem',
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: active ? 'var(--accent)' : 'var(--muted)',
                      textAlign: 'left',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(95,111,255,0.08)'
                      if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                      if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'
                    }}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* CTA */}
        <a
        href="#contact"
        className="nav-cta"
        style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          color: '#fff',
          background: 'var(--accent)',
          borderRadius: '2rem',
          padding: '0.45rem 1.1rem',
          transition: 'background 0.2s, box-shadow 0.2s',
          boxShadow: '0 0 16px rgba(95,111,255,0.25)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = '#4a5aee'
          el.style.boxShadow = '0 0 24px rgba(95,111,255,0.4)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = 'var(--accent)'
          el.style.boxShadow = '0 0 16px rgba(95,111,255,0.25)'
        }}
      >
        Get in Touch
        </a>
      </div>

      </div>
    </nav>
  )
}
