export interface Project {
  slug: string
  name: string
  client: string
  type: 'android' | 'web'
  shortDesc: string
  longDesc: string
  tags: string[]
  url?: string
  isNDA: boolean
  thumbLabel: string
  thumbGradient: string
}

export const projects: Project[] = [
  {
    slug: 'government-security-app',
    name: 'Government Android Platform',
    client: 'Government client · NDA',
    type: 'android',
    shortDesc:
      'Security application for a government agency. Biometrics, encrypted storage, MRZ document scanning, geospatial maps, and a hardened architecture designed to pass government-grade security review.',
    longDesc:
      'Built for a government agency under strict security requirements. The application handles biometric authentication, encrypted local storage, MRZ document scanning via Anyline SDK, and geospatial data rendering with ArcGIS. Architecture was designed to pass a government-grade security audit. Project was delivered under NDA.',
    tags: ['Kotlin', 'Hilt', 'ArcGIS SDK', 'Anyline SDK', 'Security'],
    isNDA: true,
    thumbLabel: 'GOV',
    thumbGradient: 'from-[#1B2B35] to-[#2A4A5C]',
  },
  {
    slug: 'restaurant-web',
    name: 'Restaurant Website',
    client: 'Client · Croatia',
    type: 'web',
    shortDesc:
      'Custom web presence for a local hospitality business — menu, reservations info, gallery, and multilingual support. Mobile-first, fast-loading, optimised for local search.',
    longDesc:
      'A fully custom restaurant website built from scratch. Mobile-first design with focus on page speed and local SEO. Multilingual support for Croatian and English visitors. Includes dynamic menu, gallery, and reservation info sections.',
    tags: ['Next.js', 'TypeScript', 'i18n', 'SEO', 'Mobile-first'],
    isNDA: false,
    thumbLabel: 'WEB',
    thumbGradient: 'from-[#E4DED0] to-[#CEC5B0]',
  },
  {
    slug: 'business-site',
    name: 'Business Brochure Site',
    client: 'Client · Croatia',
    type: 'web',
    shortDesc:
      'Clean, performant website for a small business — services overview, contact form, accessibility-first design. Built for long-term maintainability, not just launch day.',
    longDesc:
      'A brochure site for a local service business. Prioritised accessibility, Core Web Vitals, and maintainability. The client can update content without touching code. Deployed on Vercel with CI/CD.',
    tags: ['Next.js', 'TypeScript', 'Accessibility', 'Performance', 'Vercel'],
    isNDA: false,
    thumbLabel: 'WEB',
    thumbGradient: 'from-[#D0DED8] to-[#B0CEC4]',
  },
]
