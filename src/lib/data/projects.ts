// Launch projects for the Work section, in page order. Copy lives in messages under
// `Work.projects.<id>`. NDA projects get illustrations only, never screenshots.
export type ProjectId = 'government-platform' | 'payments-app' | 'gym-tracker' | 'adria-va' | 'ai-project'

export type ProjectLink = { label: 'play' | 'github' | 'site'; href: string }

export type Project = {
  id: ProjectId
  tag?: 'nda' | 'wip'
  // null: dashed "image when it ships" slot.
  picture: { src: string; width: number; height: number } | null
  links: ProjectLink[]
}

const landscape = { width: 720, height: 450 }

export const projects: readonly Project[] = [
  {
    id: 'government-platform',
    tag: 'nda',
    picture: { src: '/projects/government-platform.svg', width: 360, height: 225 },
    links: [],
  },
  {
    id: 'payments-app',
    tag: 'nda',
    picture: { src: '/projects/payments-app.svg', width: 360, height: 225 },
    links: [],
  },
  {
    id: 'gym-tracker',
    picture: { src: '/projects/gym-tracker.png', ...landscape },
    links: [
      { label: 'play', href: 'https://play.google.com/store/apps/details?id=com.rukavina.gymbuddy' },
      { label: 'github', href: 'https://github.com/rukavina-git/GymBuddy' },
    ],
  },
  {
    id: 'adria-va',
    picture: { src: '/projects/adria-va.png', ...landscape },
    links: [{ label: 'site', href: 'https://adriava.rukavina.app' }],
  },
  {
    id: 'ai-project',
    tag: 'wip',
    picture: null,
    links: [],
  },
]
