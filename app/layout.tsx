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
  metadataBase: new URL('https://rukavina.app'),
  title: 'Ivan Karlo Rukavina — Senior Software Engineer',
  description: 'Senior Software Engineer specializing in native Android development, web solutions for businesses, and architecture consulting. Based in Split, Croatia. Available for freelance work.',
  keywords: ['Android developer', 'Kotlin', 'mobile app development', 'web solutions', 'software architect', 'freelance', 'Split', 'Croatia'],
  authors: [{ name: 'Ivan Karlo Rukavina' }],
  openGraph: {
    type: 'website',
    url: 'https://rukavina.app',
    title: 'Ivan Karlo Rukavina — Senior Software Engineer',
    description: 'Native Android apps, web solutions, and architecture consulting. Based in Split, Croatia.',
    siteName: 'Ivan Karlo Rukavina',
    images: [{ url: 'img/og-image.png', width: 1200, height: 630, alt: 'Ivan Karlo Rukavina — Senior Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivan Karlo Rukavina — Senior Software Engineer',
    description: 'Native Android apps, web solutions, and architecture consulting.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rukavina.app',
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
