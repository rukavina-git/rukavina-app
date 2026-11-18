import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="bg-dark text-white/45 px-[5%] py-[26px] flex flex-wrap items-center justify-between gap-4 text-[13px]">
      <span className="text-[15px] text-white font-bold">
        rukavina.app
      </span>
      <span>{t('copyright')}</span>
      <div className="flex gap-5">
        <a
          href="https://www.linkedin.com/in/rukavina/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/35 no-underline transition-colors duration-300 hover:text-white"
        >
          {t('linkedin')}
        </a>
        <Link
          href="/privacy"
          className="text-white/35 no-underline transition-colors duration-300 hover:text-white"
        >
          {t('privacy')}
        </Link>
      </div>
    </footer>
  )
}
