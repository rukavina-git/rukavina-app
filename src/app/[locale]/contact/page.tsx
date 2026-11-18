import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/sections/contact/ContactForm'
import FAQAccordion from '@/components/sections/contact/FAQAccordion'
import type { Locale } from '@/lib/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale: locale as Locale, namespace: 'ContactPage' })
  return { title: t('metaTitle') }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <div className="pt-[80px]">
      <ContactForm />
      <FAQAccordion />
    </div>
  )
}
