import { useTranslations } from 'next-intl'
import { projects } from '@/lib/data/projects'
import { projectAnchor } from '@/lib/site'
import WorkStage, { type StageProject } from './WorkStage'

// Work (E1, Figma 511:2807 + stage states 511:3284). From lg the picture is pinned beside the
// text and swaps per project; on smaller screens each project shows its own picture.
export default function Work() {
  const t = useTranslations('Work')

  const items: StageProject[] = projects.map((project) => {
    const key = `projects.${project.id}` as const
    return {
      id: project.id,
      anchor: projectAnchor(project.id),
      name: t(`${key}.name`),
      tag: project.tag ? t(`tags.${project.tag}`) : null,
      summary: t(`${key}.summary`),
      part: t(`${key}.part`),
      partShort: t(`${key}.partShort`),
      stack: t(`${key}.stack`),
      alt: t(`${key}.alt`),
      picture: project.picture,
      links: project.links.map((link) => ({ href: link.href, text: t(`links.${link.label}`) })),
    }
  })

  return (
    <section id="work" aria-labelledby="work-title" className="px-page mx-auto max-w-page">
      <h2
        id="work-title"
        className="pt-10 text-[2rem] leading-[1.1] font-semibold tracking-[-0.02em] text-ink md:pt-16 md:text-[2.75rem]"
      >
        {t('title')}
      </h2>
      <WorkStage projects={items} labels={{ myPart: t('myPart'), ticks: t('ticks') }} />
    </section>
  )
}
