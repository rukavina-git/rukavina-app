import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import AboutSection from '@/components/sections/about/AboutSection'
import type { Locale } from '@/lib/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale: locale as Locale, namespace: 'AboutPage' })
  return { title: t('metaTitle') }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <div className="pt-[80px]">
      <AboutSection />
    </div>
  )
}
