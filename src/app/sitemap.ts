import type { MetadataRoute } from 'next'
import { routing } from '@/lib/i18n/routing'
import { languageAlternates, siteUrl } from '@/lib/seo'

const paths = ['', '/privacy']

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path ? 0.3 : 1,
      alternates: { languages: languageAlternates(path) },
    })),
  )
}
