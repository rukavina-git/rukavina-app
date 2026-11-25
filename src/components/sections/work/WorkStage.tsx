'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export type StageProject = {
  id: string
  anchor: string
  name: string
  tag: string | null
  summary: string
  part: string
  partShort: string
  stack: string
  alt: string
  picture: { src: string; width: number; height: number }
  links: { href: string; text: string }[]
}

type Props = { projects: StageProject[]; labels: { myPart: string; ticks: string } }

// Each text block is as tall as the pinned picture, so one project fills the stage at a time.
const block = 'lg:min-h-[min(70vh,720px)]'
// The pinned picture sits centred in the viewport.
const pinTop = 'lg:top-[calc(50vh-min(35vh,360px))]'

// Pinned Work stage. The project whose text crosses the middle of the viewport is the active
// one: its picture shows, its tick lights, and the other texts step back to the muted colour
// (not opacity: muted keeps 4.5:1). Below lg nothing is pinned or dimmed.
export default function WorkStage({ projects, labels }: Props) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    // A one-pixel band across the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(refs.current.indexOf(entry.target as HTMLElement))
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const total = String(projects.length).padStart(2, '0')
  const current = projects[active]

  return (
    <div className="mt-8 lg:mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
      <div>
        {projects.map((project, i) => {
          const dim = i !== active
          return (
            <article
              key={project.id}
              id={project.anchor}
              ref={(el) => {
                refs.current[i] = el
              }}
              aria-labelledby={`${project.anchor}-title`}
              className={`${block} flex flex-col justify-center pb-16 lg:scroll-mt-[calc(50vh-min(35vh,360px))]! lg:py-8 ${
                dim ? 'lg:[&_.dim]:text-muted' : ''
              }`}
            >
              <div className="mb-6 rounded-2xl bg-accent-soft p-[6%] lg:hidden">
                <Image
                  src={project.picture.src}
                  alt={project.alt}
                  width={project.picture.width}
                  height={project.picture.height}
                  sizes="(min-width: 768px) 640px, calc(100vw - 40px)"
                  className="h-auto w-full rounded-[10px]"
                />
              </div>
              <h3
                id={`${project.anchor}-title`}
                className="dim text-[1.625rem] leading-[1.15] font-semibold tracking-[-0.02em] text-ink transition-colors duration-400 md:text-[2.125rem]"
              >
                {project.name}
              </h3>
              {project.tag && (
                <span className="mt-2.5 w-max rounded border border-border px-2 py-0.5 text-caption font-medium text-muted">
                  {project.tag}
                </span>
              )}
              <p className="dim mt-5 max-w-[34em] text-body text-pretty text-ink-soft transition-colors duration-400">
                {project.summary}
              </p>
              <p className="dim mt-5 text-ui font-semibold text-ink transition-colors duration-400">
                {labels.myPart}
              </p>
              <p className="dim mt-1 max-w-[34em] text-body text-pretty text-ink-soft transition-colors duration-400 max-md:hidden">
                {project.part}
              </p>
              <p className="dim mt-1 text-[0.9375rem] leading-[1.5] text-ink-soft md:hidden">
                {project.partShort}
              </p>
              <p className="mt-4 text-small text-muted">{project.stack}</p>
              {project.links.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-x-6">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-base font-medium text-accent underline underline-offset-4 hover:text-ink"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          )
        })}
      </div>

      <div className="hidden lg:block">
        <div
          className={`sticky ${pinTop} h-[min(70vh,720px)] overflow-hidden rounded-[20px] bg-accent-soft shadow-[0_2px_4px_rgb(22_20_16/0.06),0_12px_24px_rgb(22_20_16/0.07),0_40px_80px_-10px_rgb(22_20_16/0.12)]`}
        >
          <p
            aria-hidden="true"
            className="absolute top-[18px] left-6 z-10 text-small font-medium text-accent tabular-nums"
          >
            {String(active + 1).padStart(2, '0')} / {total}
            <span className="ml-4">{current.name}</span>
          </p>
          {projects.map((project, i) => (
            <div
              key={project.id}
              aria-hidden={i !== active}
              className={`absolute inset-0 grid place-items-center p-[6%] transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={project.picture.src}
                alt={project.alt}
                width={project.picture.width}
                height={project.picture.height}
                sizes="(min-width: 1440px) 640px, 45vw"
                className="h-auto w-full rounded-xl"
              />
            </div>
          ))}
          <nav aria-label={labels.ticks} className="absolute top-2 right-1 z-10 grid">
            {projects.map((project, i) => (
              <a
                key={project.id}
                href={`#${project.anchor}`}
                aria-label={project.name}
                aria-current={i === active ? 'true' : undefined}
                className="group grid h-11 w-11 place-items-center"
              >
                <span
                  className={`h-[18px] w-1 rounded-sm transition-colors duration-300 ${
                    i === active ? 'bg-accent' : 'bg-field group-hover:bg-muted'
                  }`}
                />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
