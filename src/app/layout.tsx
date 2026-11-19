import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Hanken_Grotesk } from 'next/font/google'
import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rukavina.app'),
  title: 'Ivan Karlo Rukavina · Senior software engineer',
  description:
    'Senior software engineer based in Split, Croatia. A new site is on its way; until then, get in touch by email.',
  openGraph: {
    title: 'Ivan Karlo Rukavina · Senior software engineer',
    description: 'A new site is on its way. Until then, get in touch by email.',
    url: 'https://rukavina.app',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F5F0',
}

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en" className={hanken.variable}>
      <body>{children}</body>
    </html>
  )
}
