'use client'

import { useSyncExternalStore } from 'react'

// Cookie notice. The site uses only necessary cookies (Google reCAPTCHA on the contact form),
// so the notice informs and has no choice to make. Karlo, 2026-11-20 (option 1).
// "Seen" is kept in localStorage: it only remembers that the notice was closed.
//
// BEFORE ADDING ANY NON-NECESSARY COOKIE OR TRACKER (analytics, pixels, embeds that track):
// this notice is no longer enough. Switch to a real choice ("Only necessary" / "Accept all")
// that blocks the tracker until consent, and update the copy and the privacy page.
// The gated version exists in git: commit 53cdb19.

const KEY = 'rukavina-cookie-notice'
const CHANGE = 'rukavina:cookie-notice'

let memory = false

function read(): boolean {
  try {
    return window.localStorage.getItem(KEY) === 'seen' || memory
  } catch {
    return memory
  }
}

export function dismissNotice() {
  memory = true
  try {
    window.localStorage.setItem(KEY, 'seen')
  } catch {
    // Private mode or blocked storage: hidden for this page view only.
  }
  window.dispatchEvent(new Event(CHANGE))
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE, onChange)
    window.removeEventListener('storage', onChange)
  }
}

// `undefined` on the server and before hydration, so the notice never flashes for returning visitors.
export function useNoticeSeen(): boolean | undefined {
  return useSyncExternalStore(subscribe, read, () => undefined)
}
