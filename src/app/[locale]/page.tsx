import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import Hero from '@/components/sections/hero/Hero'
import ServicesGrid from '@/components/sections/services/ServicesGrid'
import HowItWorks from '@/components/sections/shared/HowItWorks'
import WorkGrid from '@/components/sections/work/WorkGrid'
import AboutSection from '@/components/sections/about/AboutSection'

function HomeCTA() {
  const t = useTranslations('HomeCTA')
  return (
    <section className="py-24 px-[5%] bg-bg-alt text-center">
      <h2
        className="font-bold tracking-[-0.03em] leading-[1.1] mb-4"
        style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
      >
        {t('title')}
      </h2>
      <p className="text-[16px] text-muted font-light mb-10">{t('sub')}</p>
      <Link
        href="/contact"
        className="inline-flex items-center bg-accent text-white text-[15px] font-medium px-[30px] py-[13px] rounded-lg transition-all duration-300 hover:bg-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,58,75,0.25)] no-underline"
      >
        {t('cta')}
      </Link>
    </section>
  )
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <Hero />
      <ServicesGrid teaser />
      <HowItWorks />
      <WorkGrid teaser />
      <AboutSection teaser />
      <HomeCTA />
    </>
  )
}
