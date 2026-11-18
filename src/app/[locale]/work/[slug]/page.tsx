import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import { projects } from '@/lib/data/projects'
import Tag from '@/components/ui/Tag'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return { title: `${project.name} — rukavina.app` }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const isLight = project.thumbGradient.includes('#E4') || project.thumbGradient.includes('#D0')

  return (
    <div className="pt-[100px]">
      <div className="py-24 px-[5%]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[13px] text-muted font-medium no-underline mb-10 transition-colors duration-300 hover:text-text"
        >
          ← Back to work
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">
          <div>
            <div className="text-[11px] text-muted font-medium uppercase tracking-[0.07em] mb-3">
              {project.client}
            </div>
            <h1 className="text-[40px] font-bold tracking-[-0.03em] leading-[1.1] text-text mb-6">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
            <p className="text-[16px] text-muted leading-[1.85] font-light">{project.longDesc}</p>

            {project.isNDA && (
              <div className="mt-8 px-5 py-4 bg-bg-alt border border-border rounded-xl text-[14px] text-muted font-light">
                This project was built under a non-disclosure agreement. Limited public information is available.
              </div>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 bg-accent text-white text-[15px] font-medium px-[30px] py-[13px] rounded-lg transition-all duration-300 hover:bg-dark no-underline"
              >
                View live site →
              </a>
            )}
          </div>

          <div>
            <div
              className={`h-[260px] rounded-xl flex items-center justify-center bg-gradient-to-br ${project.thumbGradient} overflow-hidden`}
            >
              <span
                className={`text-[80px] font-bold tracking-[-0.04em] opacity-[0.13] ${
                  isLight ? 'text-dark' : 'text-white'
                }`}
              >
                {project.thumbLabel}
              </span>
            </div>

            <div className="mt-6 bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.07em] text-muted font-medium mb-1">Type</div>
                <div className="text-[14px] font-medium text-text capitalize">{project.type}</div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-[11px] uppercase tracking-[0.07em] text-muted font-medium mb-1">Status</div>
                <div className="text-[14px] font-medium text-text">
                  {project.isNDA ? 'Delivered — under NDA' : 'Delivered'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
