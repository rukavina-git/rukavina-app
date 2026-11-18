import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import WorkGrid from '@/components/sections/work/WorkGrid'
import type { Locale } from '@/lib/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale: locale as Locale, namespace: 'WorkPage' })
  return { title: t('metaTitle') }
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <div className="pt-[80px]">
      <WorkGrid />
    </div>
  )
}
