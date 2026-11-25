import { useLocale, useTranslations } from 'next-intl'
import { site } from '@/lib/site'
import LanguageSwitch from './LanguageSwitch'
import MobileMenu from './MobileMenu'

const navItems = ['work', 'services', 'about'] as const

// Sticky glass header (decision 0010: Liquid Glass on the header only). From md the nav sits
// inline; on phones it moves into MobileMenu beside the Get in touch button.
export default function Header() {
  const t = useTranslations('Header')
  const locale = useLocale()
  const home = `/${locale}`

  return (
    <header className="sticky top-0 z-50 bg-bg/75 backdrop-blur-md backdrop-saturate-150">
      <div className="px-page mx-auto flex h-[70px] max-w-page items-center justify-between gap-4 md:h-[84px]">
        <a href={home} className="tap-target text-ui font-semibold whitespace-nowrap text-ink md:text-base">
          {site.name}
        </a>

        <div className="flex items-center gap-2 md:gap-8">
          <nav aria-label={t('nav')} className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((id) => (
                <li key={id}>
                  <a
                    href={`${home}#${id}`}
                    className="link-draw inline-flex min-h-11 items-center text-ui font-medium text-ink"
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
            className="tap-target rounded-lg bg-accent px-3.5 py-2 text-small font-medium whitespace-nowrap text-white transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-accent-strong active:scale-[0.97] md:px-[18px] md:py-2.5 md:text-ui"
          >
            {t('contact')}
          </a>
          <MobileMenu
            label={t('menu')}
            links={navItems.map((id) => ({ href: `${home}#${id}`, text: t(id) }))}
          />
        </div>
      </div>
    </header>
  )
}
