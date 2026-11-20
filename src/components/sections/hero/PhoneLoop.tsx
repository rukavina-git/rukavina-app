'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { heroStaticSlide, type HeroSlide } from '@/lib/data/heroSlides'

type Slide = HeroSlide & { href: string; name: string; caption: string; alt: string }

type Props = {
  slides: Slide[]
  labels: { region: string; pause: string; play: string; show: string[] }
}

// How long each slide stays. The active bar's fill animation drives the timing: when it
// ends, the next slide comes in. Pausing freezes the fill, so timing and indicator agree.
const SLIDE_MS = 5000

export default function PhoneLoop({ slides, labels }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(heroStaticSlide)
  // null until mounted: no rotation before we know the motion preference.
  const [motion, setMotion] = useState<'full' | 'reduced' | null>(null)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [onScreen, setOnScreen] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      setMotion(query.matches ? 'reduced' : 'full')
      if (query.matches) setIndex(heroStaticSlide)
    }
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const rotating = motion === 'full'
  const paused = userPaused || hovered || focused || !onScreen

  const next = () => {
    if (rotating) setIndex((i) => (i + 1) % slides.length)
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="mx-auto w-full max-w-[360px] lg:mt-10"
    >
      {/* Hover and focus pause only here, not on the controls, so Play works on first click. */}
      <div
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
        }}
      >
        <div className="relative mx-auto aspect-[256/496] w-[216px] rounded-[13.75%/7.1%] bg-device shadow-[0_19px_38px_rgb(0_0_0/0.16)] md:w-[256px]">
          <div
            aria-live={rotating && !paused ? 'off' : 'polite'}
            className="absolute top-[2.74%] left-[2.5%] h-[94.52%] w-[95%] overflow-hidden rounded-[11.18%/5.8%] bg-device-screen"
          >
            {slides.map((slide, i) => {
              const active = i === index
              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${slides.length}`}
                  aria-hidden={!active}
                  inert={!active}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${
                    active ? 'opacity-100' : 'scale-[1.03] opacity-0'
                  }`}
                >
                  {slide.image ? (
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="(min-width: 768px) 244px, 206px"
                      priority={i === heroStaticSlide}
                      className="object-cover"
                    />
                  ) : (
                    <PlaceholderScreen label={slide.alt} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-5 grid justify-items-center">
          {slides.map((slide, i) => {
            const active = i === index
            return (
              <a
                key={slide.id}
                href={slide.href}
                aria-hidden={!active}
                inert={!active}
                className={`inline-flex min-h-6 items-center text-center text-ui font-medium text-ink transition-opacity duration-500 [grid-area:1/1] hover:underline hover:underline-offset-4 ${
                  active ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {slide.caption}
              </a>
            )
          })}
        </div>
      </div>

      {/* Indicator and pause control. Hidden with reduced motion: one static slide, nothing to control. */}
      <div className="relative -mt-2 flex justify-center gap-[5px] motion-reduce:hidden">
        {slides.map((slide, i) => {
          const active = i === index
          return (
            <button
              key={slide.id}
              type="button"
              aria-label={labels.show[i]}
              aria-current={active ? 'true' : undefined}
              onClick={() => setIndex(i)}
              className="flex h-11 w-14 cursor-pointer items-center"
            >
              <span className="relative block h-[3px] w-full overflow-hidden rounded-[2px] bg-ink/15">
                {active &&
                  (rotating ? (
                    <span
                      key={index}
                      onAnimationEnd={next}
                      style={{
                        animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                      className="absolute inset-0 origin-left bg-ink/85"
                    />
                  ) : (
                    <span className="absolute inset-0 bg-ink/85" />
                  ))}
              </span>
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? labels.play : labels.pause}
          className="absolute top-0 right-0 flex size-11 cursor-pointer items-center justify-center rounded-full text-ink/70 hover:text-ink"
        >
          {userPaused ? (
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
              <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.3-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
              <rect x="3.5" y="2.5" width="3" height="11" rx="0.8" />
              <rect x="9.5" y="2.5" width="3" height="11" rx="0.8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

// Neutral app screen for projects whose illustration doesn't exist yet. No text, no details.
function PlaceholderScreen({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="flex h-full flex-col gap-3 p-[9%] pt-[14%]">
      <span className="h-2.5 w-1/3 rounded-full bg-white/15" />
      <span className="mt-2 h-5 w-2/3 rounded-full bg-white/20" />
      <span className="mt-3 aspect-[4/3] w-full rounded-2xl bg-white/10" />
      <span className="h-10 w-full rounded-xl bg-white/[0.07]" />
      <span className="h-10 w-full rounded-xl bg-white/[0.07]" />
      <span className="mt-auto h-10 w-full rounded-full bg-accent-soft/30" />
    </div>
  )
}
