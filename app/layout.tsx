import type { Metadata } from 'next'
import { Outfit, Fira_Code } from 'next/font/google'
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
  title: 'Freelance Software Engineer — Mobile Apps, Web & Consulting',
  description: 'Senior Software Engineer specializing in native Android development, web solutions for businesses, and architecture consulting. Based in Split, Croatia. Available for freelance work.',
  keywords: ['Android developer', 'Kotlin', 'mobile app development', 'web solutions', 'software architect', 'freelance', 'Split', 'Croatia'],
  authors: [{ name: 'Ivan Karlo Rukavina' }],
  openGraph: {
    type: 'website',
    url: 'https://rukavina.app',
    title: 'Freelance Software Engineer — Mobile Apps, Web & Consulting',
    description: 'Native Android apps, web solutions, and architecture consulting. Based in Split, Croatia.',
    siteName: 'Ivan Karlo Rukavina',
    images: [{ url: 'img/og-image.png', width: 1200, height: 630, alt: 'Ivan Karlo Rukavina — Senior Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Software Engineer — Mobile Apps, Web & Consulting',
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
  icons: {
    icon: '/favicon.svg',
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
      </body>
    </html>
  )
}
