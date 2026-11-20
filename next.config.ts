import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')

// June pages now live as homepage sections.
const oldPages = [
  ['services', 'services'],
  ['work', 'work'],
  ['work/:slug', 'work'],
  ['about', 'about'],
  ['contact', 'contact'],
] as const

const nextConfig: NextConfig = {
  // Fonts read from disk by the Open Graph image route.
  outputFileTracingIncludes: {
    '/[locale]/opengraph-image': ['./src/assets/fonts/**'],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  async redirects() {
    return oldPages.flatMap(([path, section]) => [
      { source: `/:locale(en|hr)/${path}`, destination: `/:locale#${section}`, permanent: true },
      { source: `/${path}`, destination: `/en#${section}`, permanent: true },
    ])
  },
}

export default withNextIntl(nextConfig)
