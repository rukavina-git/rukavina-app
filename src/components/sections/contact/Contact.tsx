import { useTranslations } from 'next-intl'
import { site } from '@/lib/site'
import ContactForm from './ContactForm'

const link = 'hover:underline hover:underline-offset-4'

// "Let's talk", Figma 331:828. Phones: text first, form below.
export default function Contact() {
  const t = useTranslations('Contact')

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-page mx-auto max-w-page">
      <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,520px)_minmax(0,620px)] lg:justify-between lg:py-28">
        <div>
          <h2
            id="contact-title"
            className="text-[2.75rem] leading-[1.1] font-semibold tracking-[-0.04em] text-ink md:text-[4.5rem] md:leading-[1.3]"
          >
            {t('title')}
          </h2>
          <p className="mt-5 max-w-[500px] text-body leading-[1.55] text-ink-soft md:text-[1.25rem]">
            {t('intro')}
          </p>
          <p className="mt-8 text-base font-medium text-ink md:mt-11">
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
            <span aria-hidden="true" className="px-1.5">
              ·
            </span>
            <a href={site.linkedin} className={link} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <span aria-hidden="true" className="px-1.5">
              ·
            </span>
            <a href={site.github} className={link} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
          <p className="mt-2 text-ui text-muted">{t('facts')}</p>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
