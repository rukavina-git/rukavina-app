import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // TODO: replace with the "live" version below when launching
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: 'https://rukavina.app/sitemap.xml',
  }

  // --- Live version (uncomment and delete the block above) ---
  // return {
  //   rules: {
  //     userAgent: '*',
  //     allow: '/',
  //   },
  //   sitemap: 'https://rukavina.app/sitemap.xml',
  // }
}
