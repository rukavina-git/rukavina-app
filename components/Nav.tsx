'use client'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
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
        padding: '0 2rem',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
        IKR<span style={{ color: 'var(--accent)' }}>.</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 400, transition: 'color 0.2s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)')}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#contact"
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
    </nav>
  )
}
