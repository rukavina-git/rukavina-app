'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'

export default function ContactForm() {
  const t = useTranslations('Contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const trigger = formRef.current?.parentElement ?? formRef.current
      if (formRef.current) {
        gsap.from(formRef.current, {
          opacity: 0,
          x: -28,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger, start: 'top 78%' },
        })
      }
      if (infoRef.current) {
        gsap.from(infoRef.current, {
          opacity: 0,
          x: 28,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger, start: 'top 78%' },
        })
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setForm({ name: '', email: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'bg-card border border-border rounded-lg px-4 py-3 text-[14px] text-text w-full outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(27,58,75,0.08)]'

  const details = [
    { label: t('details.emailLabel'), value: t('details.emailValue') },
    { label: t('details.locationLabel'), value: t('details.locationValue') },
    { label: t('details.responseLabel'), value: t('details.responseValue') },
  ]

  return (
    <section className="py-24 px-[5%] bg-bg" id="contact">
      <SectionLabel>{t('label')}</SectionLabel>
      <h2
        className="font-bold tracking-[-0.03em] leading-[1.1] mb-14"
        style={{ fontSize: 'clamp(30px, 3.5vw, 46px)' }}
      >
        {t('title')}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        <div ref={formRef}>
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-green-800 text-[15px] font-medium">
              {t('form.success')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-text">{t('form.nameLabel')}</label>
                  <input
                    type="text"
                    required
                    placeholder={t('form.namePlaceholder')}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-text">{t('form.emailLabel')}</label>
                  <input
                    type="email"
                    required
                    placeholder={t('form.emailPlaceholder')}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-text">{t('form.serviceLabel')}</label>
                <select
                  required
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className={inputCls}
                >
                  <option value="">{t('form.servicePlaceholder')}</option>
                  <option value="mobile">{t('form.serviceMobile')}</option>
                  <option value="web">{t('form.serviceWeb')}</option>
                  <option value="arch">{t('form.serviceArch')}</option>
                  <option value="ai">{t('form.serviceAI')}</option>
                  <option value="other">{t('form.serviceOther')}</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-text">{t('form.messageLabel')}</label>
                <textarea
                  required
                  rows={5}
                  placeholder={t('form.messagePlaceholder')}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputCls} resize-vertical min-h-[136px]`}
                />
              </div>

              {status === 'error' && (
                <p className="text-[14px] text-warm">{t('form.error')}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="self-start bg-accent text-white text-[15px] font-medium px-[30px] py-[13px] rounded-lg transition-all duration-300 hover:bg-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,58,75,0.25)] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
              >
                {status === 'sending' ? t('form.sending') : t('form.submit')}
              </button>
            </form>
          )}
        </div>

        <div ref={infoRef}>
          <h3 className="text-[26px] font-bold tracking-[-0.02em] mb-3.5 leading-[1.25]">
            {t('headline')}
          </h3>
          <p className="text-[15px] text-muted leading-[1.75] font-light mb-8">{t('sub')}</p>
          <div className="flex flex-col gap-2.5">
            {details.map(({ label, value }) => (
              <div
                key={label}
                className="px-4 py-3.5 bg-bg-alt rounded-lg border border-border transition-all duration-300 hover:border-accent hover:translate-x-1"
              >
                <div className="text-[11px] uppercase tracking-[0.07em] text-muted font-medium mb-0.5">
                  {label}
                </div>
                <div className="text-[14px] font-medium text-text">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
