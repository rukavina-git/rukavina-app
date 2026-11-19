'use client'

import { useEffect, useState, type ReactNode } from 'react'

type Parts = { days: number; hours: number; minutes: number; seconds: number }

function partsUntil(target: number, now: number): Parts | null {
  const ms = target - now
  if (ms <= 0) return null
  const total = Math.floor(ms / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

const pad = (n: number): string => n.toString().padStart(2, '0')

export default function Countdown({ target }: { target: string }): ReactNode {
  const targetMs = Date.parse(target)
  // null until mounted, so server and client render the same markup
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const parts = now === null ? null : partsUntil(targetMs, now)
  const done = now !== null && parts === null

  if (done) {
    return <p className="countdown-done">Launching any moment now.</p>
  }

  const units: Array<[string, string]> = [
    [parts ? String(parts.days) : '–', parts?.days === 1 ? 'day' : 'days'],
    [parts ? pad(parts.hours) : '––', 'hours'],
    [parts ? pad(parts.minutes) : '––', 'min'],
    [parts ? pad(parts.seconds) : '––', 'sec'],
  ]

  return (
    <div className="countdown" aria-hidden="true">
      {units.map(([value, label]) => (
        <div className="unit" key={label}>
          <span className="value">{value}</span>
          <span className="label">{label}</span>
        </div>
      ))}
    </div>
  )
}
