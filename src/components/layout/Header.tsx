import { useLocale, useTranslations } from 'next-intl'
import { site } from '@/lib/site'
import LanguageSwitch from './LanguageSwitch'

const navItems = ['work', 'services', 'about'] as const

export default function Header() {
  const t = useTranslations('Header')
  const locale = useLocale()
  const home = `/${locale}`

  return (
    <header className="sticky top-0 z-50 bg-bg">
      <div className="px-page mx-auto flex h-[70px] max-w-page items-center justify-between gap-4 md:h-[84px]">
        <a href={home} className="text-ui font-semibold whitespace-nowrap text-ink md:text-base">
          {site.name}
        </a>

        <div className="flex items-center gap-4 md:gap-8">
          <nav aria-label={t('nav')} className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((id) => (
                <li key={id}>
                  <a
                    href={`${home}#${id}`}
                    className="text-ui font-medium text-ink hover:underline hover:underline-offset-4"
                  >
                    {t(id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitch />
          <a
            href={`${home}#contact`}
            className="rounded-lg bg-accent px-3.5 py-2 text-small font-medium whitespace-nowrap text-white transition-colors hover:bg-ink md:px-[18px] md:py-2.5 md:text-ui"
          >
            {t('contact')}
          </a>
        </div>
      </div>
    </header>
  )
}
