'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Globe, Bot, Building2, Maximize2, X } from 'lucide-react'

const services = [
  {
    Icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Native Android and iOS apps, or cross-platform. Whichever fits your project, built to ship and built to last.',
    details: [
      'Native Android (Kotlin) or iOS (Swift), built to platform standards',
      'Cross-platform (React Native) when speed to market is the priority',
      'Biometrics, offline mode, maps, push notifications, camera and more',
      'Payments, social login, real-time features, and multi-language support',
      'Google Play and App Store submission and release management',
    ],
  },
  {
    Icon: Globe,
    title: 'Web Solutions for Businesses',
    desc: 'Modern websites for restaurants, shops, studios, and service businesses. Built to be found on Google, with a simple CMS so you can manage it yourself, or I stay on and handle it for you.',
    details: [
      'Custom built, fast, and SEO-ready so customers can find you',
      'CMS included — update your menu, photos, and content yourself, no developer needed',
      'Booking, reservations, contact forms and payment integrations',
      'Domain, DNS, and hosting setup handled end to end',
      'Flexible after launch: self-managed or ongoing support, your choice',
    ],
  },
  {
    Icon: Building2,
    title: 'Architecture & Consulting',
    desc: 'Technical guidance for teams and founders who need to get it right. From a first architecture decision to a full system review.',
    details: [
      'System design from scratch or architecture review of existing systems',
      'Security design, cryptography, secure communication, and compliance',
      'CI/CD pipelines, automated builds, tests, and deployment automation',
      'Translating business needs into clear technical requirements',
      'Code audits and technical due diligence',
      'Available for one-off engagements or ongoing advisory',
    ],
  },
  {
    Icon: Bot,
    title: 'AI Integration',
    desc: 'Practical AI features added to your existing product or workflow. No hype, no promises that don\'t deliver. Just automation and integrations that save your team real time.',
    details: [
      'ChatGPT, Claude, or open-source models integrated into your app',
      'Document processing, data extraction, and classification',
      'Chatbots and assistants built on top of proven LLM APIs',
      'Workflow automation to cut manual, repetitive work',
      'Scoped honestly: you get what actually works, not a science project',
    ],
  },
]

type Service = (typeof services)[0]

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const { Icon, title, desc, details } = service
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'rgba(6,6,9,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0F0F1A',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          maxWidth: 520,
          width: '100%',
          position: 'relative',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(95,111,255,0.08)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--muted)',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
            e.currentTarget.style.color = 'var(--text)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.color = 'var(--muted)'
          }}
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '0.85rem',
            background: 'rgba(95,111,255,0.1)',
            border: '1px solid rgba(95,111,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            marginBottom: '1.5rem',
          }}
        >
          <Icon size={22} />
        </div>

        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
          {title}
        </div>
        <div style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.75rem' }}>
          {desc}
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1.5rem' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {details.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.25 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                fontSize: '0.85rem',
                color: 'var(--muted)',
                lineHeight: 1.65,
                fontWeight: 300,
              }}
            >
              <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.25rem', fontSize: '0.5rem' }}>◆</span>
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

export default function Services() {
  const [activeService, setActiveService] = useState<Service | null>(null)

  return (
    <section id="services" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ padding: '7rem 2rem', maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
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
            What I do
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Services
          </h2>
        </motion.div>

        <div
          className="services-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}
        >
          {services.map((service, i) => {
            const { Icon, title, desc } = service
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: '#0F0F1A',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '1.25rem',
                  padding: '2rem',
                  cursor: 'default',
                  transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(95,111,255,0.3)'
                  el.style.background = 'rgba(95,111,255,0.04)'
                  el.style.boxShadow = '0 8px 32px rgba(95,111,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                  el.style.background = '#0F0F1A'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '0.75rem',
                      background: 'var(--raised)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon size={20} />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setActiveService(service)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'var(--subtle)',
                      transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(95,111,255,0.18)'
                      e.currentTarget.style.borderColor = 'rgba(95,111,255,0.4)'
                      e.currentTarget.style.color = 'var(--accent)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.color = 'var(--subtle)'
                    }}
                    aria-label={`Expand ${title}`}
                  >
                    <Maximize2 size={13} />
                  </motion.button>
                </div>

                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300 }}>
                  {desc}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
