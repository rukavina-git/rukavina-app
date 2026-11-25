// Facts used across the site. Not copy: names and URLs, same in every locale.
export const site = {
  name: 'Ivan Karlo Rukavina',
  email: 'ivankarlo@rukavina.app',
  linkedin: 'https://www.linkedin.com/in/rukavina/',
  github: 'https://github.com/rukavina-git',
} as const

// Anchor id of a project's row in the Work section.
export const projectAnchor = (id: string) => `work-${id}`
