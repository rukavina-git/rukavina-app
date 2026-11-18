import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Locale } from '@/lib/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale: locale as Locale, namespace: 'ServicesPage' })
  return { title: t('metaTitle') }
}

const serviceDetails = [
  {
    number: '01',
    bullets: [
      'Native Android development in Kotlin from architecture through Play Store delivery',
      'Experience with Hilt, MVVM, Clean Architecture, and complex SDK integrations',
      'Government-grade security: biometrics, encrypted storage, MRZ scanning, geospatial data',
      'Full project ownership or augmenting an existing team',
    ],
  },
  {
    number: '02',
    bullets: [
      'Custom-built websites and web applications — no templates',
      'Focus on performance, Core Web Vitals, and SEO from day one',
      'TypeScript, React, Next.js — or whatever stack fits the job',
      'Multilingual and accessibility-first where needed',
    ],
  },
  {
    number: '03',
    bullets: [
      'System design and architecture review for new or existing products',
      'Tech stack selection with honest trade-off analysis',
      'Codebase audits — identifying risk areas and actionable improvements',
      'Short-term engagements or ongoing technical advisory',
    ],
  },
  {
    number: '04',
    bullets: [
      'LLM integration into existing web or mobile products',
      'On-device ML for Android (TFLite, MLKit)',
      'Smart automation and data pipelines',
      'Practical scope — only features users will actually notice',
    ],
  },
]

function ServicesPageContent() {
  const t = useTranslations('ServicesSection')
  const pt = useTranslations('ServicesPage')

  return (
    <div className="pt-[100px]">
      <div className="py-24 px-[5%]">
        <SectionLabel>{t('label')}</SectionLabel>
        <h1
          className="font-bold tracking-[-0.03em] leading-[1.06] max-w-[700px] mb-6"
          style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
        >
          {pt('title')}
        </h1>
        <p className="text-[18px] text-muted max-w-[500px] font-light leading-[1.75] mb-16">
          {pt('sub')}
        </p>

        <div className="flex flex-col gap-16">
          {serviceDetails.map(({ number, bullets }, idx) => (
            <div
              key={number}
              className={`grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start pb-16 ${
                idx < serviceDetails.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div>
                <div className="text-[13px] text-muted mb-4 font-normal">{number}</div>
                <h2 className="text-[32px] font-bold tracking-[-0.02em] text-text mb-4 leading-[1.15]">
                  {t(`${number as '01' | '02' | '03' | '04'}.name`)}
                </h2>
                <p className="text-[16px] text-muted leading-[1.75] font-light">
                  {t(`${number as '01' | '02' | '03' | '04'}.desc`)}
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:pt-[44px]">
                {bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <span className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full bg-warm" />
                    <span className="text-[15px] text-muted font-light leading-[1.7]">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-[17px] text-muted font-light mb-8 max-w-[400px] mx-auto">
            Not sure which service fits? Just describe what you need.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-accent text-white text-[15px] font-medium px-[30px] py-[13px] rounded-lg transition-all duration-300 hover:bg-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,58,75,0.25)] no-underline"
          >
            {pt('cta')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ServicesPageContent />
}
