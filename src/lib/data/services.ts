export interface Service {
  id: string
  number: string
  slug: string
  nameKey: string
  descKey: string
}

export const services: Service[] = [
  { id: '01', number: '01', slug: 'mobile-development', nameKey: 'ServicesSection.01.name', descKey: 'ServicesSection.01.desc' },
  { id: '02', number: '02', slug: 'web-solutions', nameKey: 'ServicesSection.02.name', descKey: 'ServicesSection.02.desc' },
  { id: '03', number: '03', slug: 'architecture-consulting', nameKey: 'ServicesSection.03.name', descKey: 'ServicesSection.03.desc' },
  { id: '04', number: '04', slug: 'ai-integration', nameKey: 'ServicesSection.04.name', descKey: 'ServicesSection.04.desc' },
]
