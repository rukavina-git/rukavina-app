import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Hanken_Grotesk } from 'next/font/google'
import { routing, type Locale } from '@/lib/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '../globals.css'

import type { AbstractIntlMessages } from 'next-intl'

const messageLoaders: Record<Locale, () => Promise<AbstractIntlMessages>> = {
  en: () =>
    import('../../../messages/en.json').then((m) => m.default as unknown as AbstractIntlMessages),
  hr: () =>
    import('../../../messages/hr.json').then((m) => m.default as unknown as AbstractIntlMessages),
}

const hanken = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ivan Karlo Rukavina — Software Engineer',
  description:
    'Senior software engineer specialising in web and mobile development and systems architecture. Based in Split, Croatia.',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await messageLoaders[locale as Locale]()
  const t = await getTranslations({ locale, namespace: 'Header' })

  return (
    <html lang={locale} className={hanken.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
          >
            {t('skip')}
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
