import type { Metadata } from 'next'
import { Outfit, Fira_Code } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Background from '@/components/Background'
import CookieConsent from '@/components/CookieConsent'
import { LanguageProvider } from '@/contexts/LanguageContext'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ivan Karlo Rukavina — Senior Software Engineer',
  description:
    'Freelance senior software engineer specializing in Android development, web solutions, and architecture consulting. Based in Split, Croatia. Working globally.',
  metadataBase: new URL('https://rukavina.app'),
  alternates: { canonical: '/' },
  // TODO: when launching, remove this robots block entirely (Next.js defaults to indexable)
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Ivan Karlo Rukavina — Senior Software Engineer',
    description:
      'Freelance senior software engineer specializing in Android development, web solutions, and architecture consulting. Based in Split, Croatia. Working globally.',
    url: 'https://rukavina.app',
    siteName: 'rukavina.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable}`}>
      <body>
        <Background />
        <LanguageProvider>
          {children}
          <CookieConsent />
        </LanguageProvider>
{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  )
}
