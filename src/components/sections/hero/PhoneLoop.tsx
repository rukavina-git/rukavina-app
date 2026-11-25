'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { heroStaticSlide, type HeroSlide } from '@/lib/data/heroSlides'
import {
  GovernmentScreen,
  PaymentsScreen,
  type GovernmentScreenText,
  type PaymentsScreenText,
} from './HeroScreens'

type Slide = HeroSlide & { href: string; name: string; alt: string }

type Props = {
  slides: Slide[]
  screens: { 'government-platform': GovernmentScreenText; 'payments-app': PaymentsScreenText }
  labels: { region: string; pause: string; play: string; browse: string; show: string[] }
}

// How long each slide stays. The active bar's fill animation drives the timing: when it
// ends, the next slide comes in. Pausing freezes the fill, so timing and indicator agree.
const SLIDE_MS = 5000
// Horizontal travel that counts as a swipe, and the most a tap may move.
const SWIPE_PX = 40
const TAP_PX = 10

// Tilted phone (E1, Figma 511:2819). The tilt is static: depth, not motion. Tap or Enter
// pauses (WCAG 2.2.2), keyboard focus pauses too, swipe, drag or the arrow keys change project, the bars jump to one.
export default function PhoneLoop({ slides, screens, labels }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const [index, setIndex] = useState(heroStaticSlide)
  // null until mounted: no rotation before we know the motion preference.
  const [motion, setMotion] = useState<'full' | 'reduced' | null>(null)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [onScreen, setOnScreen] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setMotion(query.matches ? 'reduced' : 'full')
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
  const step = (by: number) => setIndex((i) => (i + by + slides.length) % slides.length)
  const togglePause = () => {
    if (rotating) setUserPaused((p) => !p)
  }

  const onPointerDown = (e: PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: PointerEvent) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1)
    else if (Math.abs(dx) < TAP_PX && Math.abs(dy) < TAP_PX) togglePause()
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      step(e.key === 'ArrowRight' ? 1 : -1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      togglePause()
    }
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="hero-stage mx-auto grid w-full max-w-[360px] justify-items-center"
    >
      <div
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className="relative aspect-[256/496] w-[216px] rounded-[14%/7.2%] bg-device px-[2.7%] py-[4.7%] shadow-[0_2px_4px_rgb(22_20_16/0.12),0_14px_28px_rgb(22_20_16/0.12),25px_44px_80px_-10px_rgb(22_20_16/0.22)] [transform:perspective(1400px)_rotateY(-15deg)_rotateX(7deg)_rotateZ(-3.4deg)] md:w-[256px]"
      >
        {/* The control sits over the screen as a sibling of the slides, so the slides and the
            live region stay readable (a button's children are presentational). */}
        <button
          type="button"
          aria-label={!rotating ? labels.browse : userPaused ? labels.play : labels.pause}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (start.current = null)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="absolute inset-0 z-20 cursor-grab touch-pan-y rounded-[14%/7.2%]! select-none focus-visible:outline-offset-[6px] active:cursor-grabbing"
        />
        <span
          aria-hidden="true"
          className={`absolute top-[5%] right-[8%] z-10 grid size-8 place-items-center rounded-full bg-ink/70 transition-[opacity,transform] duration-200 ${
            userPaused && rotating ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <span className="h-3 w-2.5 border-x-[3px] border-white" />
        </span>
        <div
          aria-live={rotating && !paused ? 'off' : 'polite'}
          className="relative h-full w-full overflow-hidden rounded-[11.5%/6%] bg-white"
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
                className={`absolute inset-0 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  active ? 'opacity-100' : 'scale-[1.03] opacity-0'
                }`}
              >
                {slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 768px) 242px, 204px"
                    priority={i === heroStaticSlide}
                    draggable={false}
                    className="object-cover"
                  />
                ) : slide.id === 'government-platform' ? (
                  <GovernmentScreen label={slide.alt} text={screens['government-platform']} />
                ) : (
                  <PaymentsScreen label={slide.alt} text={screens['payments-app']} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-7 h-[26px] w-[220px] rounded-[50%] bg-ink/[0.14] blur-[14px]"
      />

      <div className="mt-2 grid justify-items-center">
        {slides.map((slide, i) => {
          const active = i === index
          return (
            <a
              key={slide.id}
              href={slide.href}
              aria-hidden={!active}
              inert={!active}
              className={`link-draw inline-flex min-h-11 items-center gap-2 text-ui font-medium text-ink transition-opacity duration-500 [grid-area:1/1] ${
                active ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {slide.name}
              <span aria-hidden="true">→</span>
            </a>
          )
        })}
      </div>

      <div className="flex justify-center gap-2">
        {slides.map((slide, i) => {
          const active = i === index
          return (
            <button
              key={slide.id}
              type="button"
              aria-label={labels.show[i]}
              aria-current={active ? 'true' : undefined}
              onClick={() => setIndex(i)}
              className="flex h-11 w-11 cursor-pointer items-center"
            >
              <span className="relative block h-[3px] w-full overflow-hidden rounded-[2px] bg-field">
                {active &&
                  (rotating ? (
                    <span
                      key={index}
                      onAnimationEnd={() => step(1)}
                      style={{
                        animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                      className="absolute inset-0 origin-left bg-ink"
                    />
                  ) : (
                    <span className="absolute inset-0 bg-ink" />
                  ))}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
