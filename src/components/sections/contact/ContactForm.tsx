'use client'

import { useRef, useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import {
  contactLimits,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactFields,
} from '@/lib/contact'
import { site } from '@/lib/site'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

type Status = 'idle' | 'sending' | 'error' | 'sent'

// Loaded on the first focus inside the form, not with the page (decision 0009).
// One shared load; a failed load (blocker, offline) is forgotten so the next submit retries
// and fails fast instead of waiting on events that already fired.
let recaptchaLoad: Promise<void> | null = null

function loadRecaptcha(): Promise<void> {
  if (!siteKey) return Promise.resolve()
  if (recaptchaLoad) return recaptchaLoad
  recaptchaLoad = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      script.remove()
      recaptchaLoad = null
      reject(new Error('recaptcha'))
    }
    document.head.appendChild(script)
  })
  return recaptchaLoad
}

async function recaptchaToken(): Promise<string> {
  if (!siteKey) return ''
  await loadRecaptcha()
  const grecaptcha = window.grecaptcha
  if (!grecaptcha) throw new Error('recaptcha')
  await new Promise<void>((resolve) => grecaptcha.ready(resolve))
  return grecaptcha.execute(siteKey, { action: 'contact' })
}

const inputClass =
  'block w-full rounded-[10px] border bg-surface px-4 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-danger'

export default function ContactForm() {
  const t = useTranslations('Contact.form')
  const [fields, setFields] = useState<ContactFields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const startedAt = useRef<number | null>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  }

  const onFirstFocus = () => {
    if (startedAt.current !== null) return
    startedAt.current = Date.now()
    loadRecaptcha().catch(() => {})
  }

  const update = (field: ContactField) => (value: string) => {
    setFields((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const found = validateContact(fields)
    setErrors(found)
    const first = (['name', 'email', 'message'] as const).find((f) => found[f])
    if (first) {
      refs[first].current?.focus()
      return
    }

    setStatus('sending')
    try {
      // The server drops anything faster than minFillMs as a bot; a quick human (autofill,
      // paste) waits out the rest instead of losing the message.
      const elapsed = Date.now() - (startedAt.current ?? Date.now())
      if (elapsed < contactLimits.minFillMs) {
        await new Promise((r) => setTimeout(r, contactLimits.minFillMs - elapsed + 100))
      }
      const token = await recaptchaToken()
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          website: honeypot.current?.value ?? '',
          elapsed: Date.now() - (startedAt.current ?? Date.now()),
          token,
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-[10px] border border-border bg-surface p-6 md:p-8">
        {/* Focused on mount: the button that had focus is gone, and this gets it announced. */}
        <p
          tabIndex={-1}
          ref={(el) => el?.focus()}
          className="text-h4 font-semibold text-ink focus:outline-none"
        >
          {t('sentTitle')}
        </p>
        <p className="mt-2 text-body text-ink-soft">{t('sentText')}</p>
      </div>
    )
  }

  const errorText = (field: ContactField) => {
    const error = errors[field]
    return error ? t(`errors.${field}.${error}`, { min: contactLimits.messageMin }) : null
  }

  const field = (name: ContactField, input: React.ReactNode) => {
    const error = errorText(name)
    return (
      <div>
        <label htmlFor={`contact-${name}`} className="block text-ui font-medium text-ink">
          {t(`${name}.label`)}
        </label>
        <div className="mt-2">{input}</div>
        {error && (
          <p id={`contact-${name}-error`} className="mt-2 text-small text-danger">
            {error}
          </p>
        )}
      </div>
    )
  }

  const a11y = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  })

  return (
    <form noValidate onSubmit={onSubmit} onFocus={onFirstFocus} className="grid gap-[18px]">
      {field(
        'name',
        <input
          {...a11y('name')}
          ref={refs.name}
          type="text"
          autoComplete="name"
          required
          maxLength={contactLimits.name}
          value={fields.name}
          onChange={(e) => update('name')(e.target.value)}
          className={`${inputClass} h-[52px] ${errors.name ? '' : 'border-field'}`}
        />,
      )}
      {field(
        'email',
        <input
          {...a11y('email')}
          ref={refs.email}
          type="email"
          autoComplete="email"
          required
          maxLength={contactLimits.email}
          placeholder={t('email.placeholder')}
          value={fields.email}
          onChange={(e) => update('email')(e.target.value)}
          className={`${inputClass} h-[52px] ${errors.email ? '' : 'border-field'}`}
        />,
      )}
      {field(
        'message',
        <textarea
          {...a11y('message')}
          ref={refs.message}
          required
          rows={5}
          maxLength={contactLimits.messageMax}
          placeholder={t('message.placeholder')}
          value={fields.message}
          onChange={(e) => update('message')(e.target.value)}
          className={`${inputClass} min-h-[150px] resize-y py-3 ${errors.message ? '' : 'border-field'}`}
        />,
      )}

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input ref={honeypot} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex min-h-[49px] cursor-pointer items-center rounded-[10px] bg-accent px-6 text-base font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-accent-strong active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? t('sending') : t('send')}
        </button>

        <div aria-live="polite">
          {status === 'error' && (
            <p className="mt-3 text-small text-danger">
              {t.rich('error', {
                email: () => (
                  <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                    {site.email}
                  </a>
                ),
              })}
            </p>
          )}
        </div>

        <p className="mt-4 max-w-[520px] text-caption text-muted">
          {t.rich('recaptcha', {
            privacy: (chunks) => (
              <a
                href="https://policies.google.com/privacy"
                className="underline underline-offset-2 hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
            terms: (chunks) => (
              <a
                href="https://policies.google.com/terms"
                className="underline underline-offset-2 hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    </form>
  )
}
