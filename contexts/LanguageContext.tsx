'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import en from '@/messages/en.json'
import hr from '@/messages/hr.json'

type Lang = 'en' | 'hr'
type Messages = typeof en

const messages: Record<Lang, Messages> = { en, hr }

function detectDefaultLang(): Lang {
  if (typeof navigator === 'undefined') return 'en'
  const langs = [navigator.language, ...(navigator.languages || [])].map(l => l.toLowerCase())
  if (langs.some(l => /^(hr|bs|sr)/.test(l))) return 'hr'
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (['Europe/Zagreb', 'Europe/Sarajevo', 'Europe/Belgrade'].includes(tz)) return 'hr'
  return 'en'
}

const LanguageContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: Messages
}>({ lang: 'en', setLang: () => {}, t: en })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('language') as Lang | null
    setLangState(stored ?? detectDefaultLang())
    setMounted(true)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('language', l)
  }

  if (!mounted) return null

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: messages[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
