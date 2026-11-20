// Facts used across the site. Not copy: names and URLs, same in every locale.
export const site = {
  name: 'Ivan Karlo Rukavina',
  email: 'ivankarlo@rukavina.app',
  linkedin: 'https://www.linkedin.com/in/rukavina/',
  github: 'https://github.com/rukavina-git',
} as const

// Homepage section anchors, in page order.
export const sections = ['work', 'how-i-work', 'about', 'services', 'contact'] as const
export type SectionId = (typeof sections)[number]
