'use client'

import { useRef } from 'react'

type Props = { label: string; links: { href: string; text: string }[] }

// Phone menu (E1 mobile, Figma 511:3034). A plain <details>, so it opens without JS; the
// script only closes it after a link is followed and on Escape.
export default function MobileMenu({ label, links }: Props) {
  const ref = useRef<HTMLDetailsElement>(null)
  const close = () => ref.current?.removeAttribute('open')

  return (
    <details
      ref={ref}
      className="group relative md:hidden"
      onKeyDown={(e) => {
        if (e.key === 'Escape' && ref.current?.open) {
          close()
          ref.current.querySelector('summary')?.focus()
        }
      }}
    >
      <summary
        aria-label={label}
        className="grid size-11 cursor-pointer list-none place-content-center gap-1.5 [&::-webkit-details-marker]:hidden"
      >
        <span className="block h-0.5 w-5 rounded-[1px] bg-ink transition-transform duration-200 group-open:translate-y-1 group-open:rotate-45" />
        <span className="block h-0.5 w-5 rounded-[1px] bg-ink transition-transform duration-200 group-open:-translate-y-1 group-open:-rotate-45" />
      </summary>
      <nav
        aria-label={label}
        className="absolute top-[52px] right-0 grid min-w-[200px] origin-top-right rounded-xl border border-border bg-bg p-2 shadow-[0_12px_24px_rgb(22_20_16/0.1)]"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={close}
            className="rounded-lg px-3.5 py-3 text-base font-medium text-ink hover:bg-bg-alt"
          >
            {link.text}
          </a>
        ))}
      </nav>
    </details>
  )
}
