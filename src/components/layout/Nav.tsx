'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/lib/i18n/navigation'

export default function Nav() {
  const t = useTranslations('Nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/services', label: t('services') },
    { href: '/work', label: t('work') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-[5%] flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? 'py-[14px] border-b border-border bg-bg/90 backdrop-blur-[14px]'
          : 'py-5 border-b border-transparent bg-bg/90 backdrop-blur-[14px]'
      }`}
    >
      <Link
        href="/"
        className="text-[17px] font-bold text-text tracking-[-0.01em] no-underline"
      >
        rukavina<span className="text-warm">.</span>app
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map(({ href, label }) => (
          <li key={href} className="relative">
            <Link
              href={href}
              className="text-[14px] font-medium text-muted no-underline transition-colors duration-300 hover:text-text pb-0.5 group"
            >
              {label}
              <span className="absolute bottom-[-2px] left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-2 ml-2">
          <Link
            href={pathname}
            locale="en"
            className={`text-[13px] font-medium transition-colors duration-300 ${
              locale === 'en' ? 'text-text' : 'text-muted hover:text-text'
            }`}
          >
            {t('toggleEn')}
          </Link>
          <span className="text-border text-[13px]">|</span>
          <Link
            href={pathname}
            locale="hr"
            className={`text-[13px] font-medium transition-colors duration-300 ${
              locale === 'hr' ? 'text-text' : 'text-muted hover:text-text'
            }`}
          >
            {t('toggleHr')}
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="bg-accent text-white text-[14px] font-medium px-5 py-[9px] rounded-[6px] transition-colors duration-300 hover:bg-dark no-underline"
          >
            {t('cta')}
          </Link>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label="Toggle menu"
        className="md:hidden flex flex-col gap-[5px] p-2"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span
          className={`block w-5 h-[1.5px] bg-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg border-b border-border shadow-lg md:hidden">
          <ul className="list-none flex flex-col px-[5%] py-6 gap-5">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[16px] font-medium text-text no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3 pt-2 border-t border-border">
              <Link
                href={pathname}
                locale="en"
                className={`text-[14px] font-medium ${locale === 'en' ? 'text-text' : 'text-muted'}`}
                onClick={() => setMenuOpen(false)}
              >
                {t('toggleEn')}
              </Link>
              <span className="text-border">|</span>
              <Link
                href={pathname}
                locale="hr"
                className={`text-[14px] font-medium ${locale === 'hr' ? 'text-text' : 'text-muted'}`}
                onClick={() => setMenuOpen(false)}
              >
                {t('toggleHr')}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="inline-block bg-accent text-white text-[14px] font-medium px-5 py-[10px] rounded-[6px] no-underline"
                onClick={() => setMenuOpen(false)}
              >
                {t('cta')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
