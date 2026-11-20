'use client'

import { useSyncExternalStore } from 'react'

// Consent for Google reCAPTCHA, the only third party that can set cookies on this site.
// The choice is kept in localStorage (strictly necessary: it only remembers the answer).

export type Consent = 'granted' | 'denied' | null

const KEY = 'rukavina-consent'
const CHANGE = 'rukavina:consent'
const OPEN = 'rukavina:consent-open'

function read(): Consent {
  try {
    const value = window.localStorage.getItem(KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function setConsent(value: 'granted' | 'denied') {
  // Withdrawn after reCAPTCHA already loaded: a script can't be unloaded, so start the page fresh.
  const reload =
    value === 'denied' &&
    (read() ?? memory) === 'granted' &&
    document.querySelector('script[src*="recaptcha/api.js"]') !== null
  try {
    window.localStorage.setItem(KEY, value)
  } catch {
    // Private mode or blocked storage: the choice holds for this page view only.
    memory = value
  }
  if (reload) {
    window.location.reload()
    return
  }
  window.dispatchEvent(new Event(CHANGE))
}

let memory: Consent = null

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE, onChange)
    window.removeEventListener('storage', onChange)
  }
}

// `undefined` on the server and before hydration, so nothing flashes.
export function useConsent(): Consent | undefined {
  return useSyncExternalStore(
    subscribe,
    () => read() ?? memory,
    () => undefined,
  )
}

// Reopen the banner (footer "Cookie settings").
export function openConsent() {
  window.dispatchEvent(new Event(OPEN))
}

export function onConsentOpen(handler: () => void) {
  window.addEventListener(OPEN, handler)
  return () => window.removeEventListener(OPEN, handler)
}
