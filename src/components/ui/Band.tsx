import type { ReactNode } from 'react'

// Warm full-width band: heading left (360px), content right from lg; stacked below.
type Props = {
  id: string
  title: string
  // Figma: 44px for "How I work", 40px for "What I take on".
  titleSize: 'h2' | 'h2-sm'
  className?: string
  children: ReactNode
}

export default function Band({ id, title, titleSize, className = '', children }: Props) {
  const titleId = `${id}-title`
  return (
    <section id={id} aria-labelledby={titleId} className={`bg-bg-alt ${className}`}>
      <div className="px-page mx-auto grid max-w-page gap-6 py-16 md:py-24 lg:grid-cols-[360px_minmax(0,904px)] lg:gap-12 lg:py-28">
        <h2
          id={titleId}
          className={`font-semibold tracking-[-0.03em] text-ink ${
            titleSize === 'h2'
              ? 'text-[2rem] leading-[1.2] md:text-h2'
              : 'text-[2rem] leading-[1.2] md:text-[2.5rem]'
          }`}
        >
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  )
}
