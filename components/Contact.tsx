'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

type FormState = {
  name: string
  email: string
  subject: string
  phone: string
  message: string
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '0.75rem',
  padding: '0.85rem 1rem',
  fontFamily: 'var(--font-outfit)',
  fontSize: '0.9rem',
  color: 'var(--text)',
  fontWeight: 300,
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s, background 0.2s',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-fira-code)',
  fontSize: '0.62rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--subtle)',
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(95,111,255,0.4)'
    e.currentTarget.style.background = 'rgba(95,111,255,0.04)'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      let recaptchaToken = ''

      if (siteKey && typeof window !== 'undefined' && window.grecaptcha) {
        await new Promise<void>((resolve) => window.grecaptcha.ready(resolve))
        recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'contact' })
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptchaToken }),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', phone: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Failed to send message. Please try again.')
    }
  }

  return (
    <section id="contact" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ padding: '7rem 2rem', maxWidth: 680, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-fira-code)',
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1rem',
              display: 'block',
            }}
          >
            Get in touch
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '0.75rem',
            }}
          >
            Let&apos;s Work Together
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7, marginBottom: '0.5rem' }}>
            Have a project in mind or want to explore what&apos;s possible? Send a message and I&apos;ll get back to you within 24 hours.
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--accent)', fontFamily: 'var(--font-fira-code)', letterSpacing: '0.02em' }}>
            First consultation is complimentary.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Field label="Name">
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={set('name')}
                onFocus={onFocus}
                onBlur={onBlur}
                required
                style={{ ...inputStyle }}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={set('email')}
                onFocus={onFocus}
                onBlur={onBlur}
                required
                style={{ ...inputStyle }}
              />
            </Field>
          </div>

          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Field label="Subject">
              <input
                type="text"
                placeholder="What's this about?"
                value={form.subject}
                onChange={set('subject')}
                onFocus={onFocus}
                onBlur={onBlur}
                required
                style={{ ...inputStyle }}
              />
            </Field>
            <Field
              label={
                <>
                  Phone{' '}
                  <span style={{ color: 'var(--faint)', fontSize: '0.58rem', letterSpacing: '0.08em' }}>OPTIONAL</span>
                </>
              }
            >
              <input
                type="tel"
                placeholder="+1 234 567 890"
                value={form.phone}
                onChange={set('phone')}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{ ...inputStyle }}
              />
            </Field>
          </div>

          <Field label="Message">
            <textarea
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={set('message')}
              onFocus={onFocus}
              onBlur={onBlur}
              required
              style={{ ...inputStyle, minHeight: 140, resize: 'none' }}
            />
          </Field>

          {status === 'error' && (
            <div style={{ fontSize: '0.85rem', color: '#f87171', fontFamily: 'var(--font-fira-code)' }}>
              {errorMsg}
            </div>
          )}
          {status === 'success' && (
            <div style={{ fontSize: '0.85rem', color: 'var(--green)', fontFamily: 'var(--font-fira-code)' }}>
              Message sent! I&apos;ll get back to you within 24 hours.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              background: 'var(--accent)',
              color: '#fff',
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '0.75rem',
              padding: '1rem 2rem',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
              boxShadow: '0 0 24px rgba(95,111,255,0.25)',
              marginTop: '0.25rem',
            }}
            onMouseEnter={(e) => {
              if (status === 'loading') return
              const el = e.currentTarget
              el.style.background = '#4a5aee'
              el.style.boxShadow = '0 0 32px rgba(95,111,255,0.4)'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'var(--accent)'
              el.style.boxShadow = '0 0 24px rgba(95,111,255,0.25)'
              el.style.transform = 'translateY(0)'
            }}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
            {status !== 'loading' && <Send size={16} />}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
