import { useTranslations } from 'next-intl'
import { site } from '@/lib/site'

const link = 'hover:text-ink hover:underline hover:underline-offset-4'

function Dot() {
  return (
    <span aria-hidden="true" className="px-1.5">
      ·
    </span>
  )
}

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="border-t border-border">
      <div className="px-page mx-auto flex max-w-page flex-col gap-3 pt-7 pb-9 text-small text-muted md:flex-row md:items-start md:justify-between">
        <p>
          {site.name}
          <Dot />
          {t('location')}
        </p>
        <p>
          <a href={`mailto:${site.email}`} className={link}>
            {site.email}
          </a>
          <Dot />
          <a href={site.linkedin} className={link} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Dot />
          <a href={site.github} className={link} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
