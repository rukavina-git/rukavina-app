import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { projects, type Project } from '@/lib/data/projects'
import { projectAnchor } from '@/lib/site'

// Work index (Figma 331:685 + 336:1216): picture left, text right from lg; stacked below.
// Phones show the short "my part" only (mobile rows 335:1047–335:1119).
export default function Work() {
  const t = useTranslations('Work')

  return (
    <section id="work" aria-labelledby="work-title" className="px-page mx-auto max-w-page">
      <h2
        id="work-title"
        className="pt-7 pb-2.5 text-[2.5rem] leading-[1.3] font-semibold tracking-[-0.03em] text-ink md:pt-24 md:pb-6 md:text-[3.5rem] lg:pt-40"
      >
        {t('title')}
      </h2>
      <ul className="border-b border-border">
        {projects.map((project) => (
          <Row key={project.id} project={project} />
        ))}
      </ul>
    </section>
  )
}

function Row({ project }: { project: Project }) {
  const t = useTranslations('Work')
  const key = `projects.${project.id}` as const
  const muted = project.tag === 'wip'

  return (
    <li
      id={projectAnchor(project.id)}
      className="grid gap-3 border-t border-border pt-5 pb-[22px] md:gap-6 md:py-9 lg:grid-cols-[360px_minmax(0,700px)] lg:gap-12"
    >
      <Picture project={project} alt={project.picture ? t(`${key}.alt`) : ''} slot={t('slot')} />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-x-3">
          <h3
            className={`text-h4 font-semibold md:text-h3 ${muted ? 'text-muted' : 'text-ink'}`}
          >
            {t(`${key}.name`)}
          </h3>
          {project.tag && (
            <span className="rounded border border-border px-2 py-[3px] text-caption font-medium text-muted">
              {t(`tags.${project.tag}`)}
            </span>
          )}
        </div>

        {muted ? (
          <p className="mt-3 text-[0.9375rem] leading-[1.5] text-muted md:text-[1.1875rem]">
            {t(`${key}.summary`)}
          </p>
        ) : (
          <>
            <p className="mt-3 text-[0.9375rem] leading-[1.5] text-ink-soft md:hidden">
              {t(`${key}.partShort`)}
            </p>
            <div className="hidden md:block">
              <p className="mt-3 text-[1.1875rem] leading-[1.5] text-ink-soft">
                {t(`${key}.summary`)}
              </p>
              <p className="mt-3 text-body leading-[1.55] text-ink-soft">
                <strong className="mr-1.5 font-semibold text-ink">{t('myPart')}</strong>{' '}
                {t(`${key}.part`)}
              </p>
            </div>
            <p className="mt-3 text-caption font-medium text-muted md:text-small">
              {t(`${key}.stack`)}
            </p>
          </>
        )}

        {project.links.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-x-6 md:mt-2">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-base font-medium text-accent underline underline-offset-4 hover:text-ink"
                >
                  {t(`links.${link.label}`)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

function Picture({ project, alt, slot }: { project: Project; alt: string; slot: string }) {
  const frame = 'aspect-[360/225] w-full max-w-[480px] overflow-hidden rounded-lg lg:max-w-none'

  if (!project.picture) {
    return (
      <div
        className={`${frame} flex items-center justify-center border border-dashed border-faint text-ui text-muted`}
      >
        {slot}
      </div>
    )
  }

  return (
    <div className={`${frame} bg-bg-alt`}>
      <Image
        src={project.picture.src}
        alt={alt}
        width={project.picture.width}
        height={project.picture.height}
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 480px, calc(100vw - 40px)"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
