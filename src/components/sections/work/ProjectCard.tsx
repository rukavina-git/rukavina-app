import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import type { Project } from '@/lib/data/projects'
import Tag from '@/components/ui/Tag'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('WorkSection')
  const isLight = project.thumbGradient.includes('#E4') || project.thumbGradient.includes('#D0')

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 hover:-translate-y-[5px] hover:border-accent hover:shadow-[0_16px_40px_rgba(27,58,75,0.12)] flex flex-col">
      {/* Thumbnail */}
      <div className="h-[176px] relative overflow-hidden">
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${project.thumbGradient} transition-transform duration-500 hover:scale-[1.06]`}
        >
          <span
            className={`text-[52px] font-bold tracking-[-0.04em] opacity-[0.13] ${
              isLight ? 'text-dark' : 'text-white'
            }`}
          >
            {project.thumbLabel}
          </span>
        </div>
        <span
          className={`absolute top-3.5 left-3.5 z-10 text-[11px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-[4px] ${
            project.type === 'android'
              ? 'bg-white/18 text-white'
              : 'bg-accent/10 text-accent'
          }`}
        >
          {project.type === 'android' ? 'Android' : 'Web'}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[11px] text-muted font-medium uppercase tracking-[0.07em] mb-2.5">
          {project.client}
        </div>
        <div className="text-[17px] font-bold tracking-[-0.01em] mb-1.5">
          {project.name}
        </div>
        <p className="text-[14px] text-muted leading-[1.65] font-light mb-4 flex-1">
          {project.shortDesc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        {project.isNDA ? (
          <span className="text-[12px] text-muted font-normal">{t('limitedInfo')}</span>
        ) : project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-accent no-underline inline-flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-2.5"
          >
            {t('viewSite')}
          </a>
        ) : (
          <Link
            href={`/work/${project.slug}`}
            className="text-[13px] font-semibold text-accent no-underline inline-flex items-center gap-1.5 transition-[gap] duration-300 hover:gap-2.5"
          >
            View project →
          </Link>
        )}
      </div>
    </div>
  )
}
