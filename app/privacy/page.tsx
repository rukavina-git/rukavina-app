'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { useLang } from '@/contexts/LanguageContext'

const EMAIL = 'ivankarlo@rukavina.app'

const emailLink = (
  <a
    href={`mailto:${EMAIL}`}
    style={{ color: 'var(--accent)', textDecoration: 'none' }}
    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
  >
    {EMAIL}
  </a>
)

const content: Record<'en' | 'hr', { title: string; subtitle: string; back: string; sections: { heading: string; body: ReactNode }[] }> = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'Last updated: March 14, 2026',
    back: '← Back',
    sections: [
      {
        heading: 'Who is responsible for this site',
        body: <>This website is operated by Ivan Karlo Rukavina, a freelance software engineer based in Split, Croatia. Contact: {emailLink}</>,
      },
      {
        heading: 'Contact form',
        body: 'When you submit the contact form, your name, email address, and message (and optionally phone number and subject) are collected. This data is transmitted via Resend and delivered directly to my email inbox. It is not stored in any database, not shared with third parties, and is used only to respond to your inquiry.',
      },
      {
        heading: 'reCAPTCHA',
        body: "This site uses Google reCAPTCHA v3 to protect the contact form from spam. reCAPTCHA collects hardware and software information and sends it to Google for analysis. Google's use of this data is governed by their Privacy Policy and Terms of Service.",
      },
      {
        heading: 'Cookies',
        body: 'This site uses no cookies by default. If you accept optional cookies via the cookie banner, no cookies are currently set (analytics are not active). You can change your choice at any time by clearing your browser data.',
      },
      {
        heading: 'Your rights (GDPR)',
        body: <>If you are located in the EU/EEA, you have the right to access, correct, or request deletion of any personal data you have submitted via the contact form. To exercise these rights, contact {emailLink}.</>,
      },
      {
        heading: 'Data retention',
        body: 'Contact form submissions are retained only as long as necessary to respond to your inquiry and are subject to standard email retention practices.',
      },
      {
        heading: 'Changes to this policy',
        body: 'This policy may be updated occasionally. The date at the top of the page reflects the latest revision.',
      },
    ],
  },
  hr: {
    title: 'Pravila privatnosti',
    subtitle: 'Zadnja izmjena: 14. ožujka 2026.',
    back: '← Natrag',
    sections: [
      {
        heading: 'Tko je odgovoran za ovu stranicu',
        body: <>Ovu stranicu vodi Ivan Karlo Rukavina, freelance softverski inženjer iz Splita, Hrvatska. Kontakt: {emailLink}</>,
      },
      {
        heading: 'Kontaktni obrazac',
        body: 'Kada pošaljete kontaktni obrazac, prikupljaju se vaše ime, e-mail adresa i poruka (te opcionalno broj telefona i tema). Ovi podaci se prenose putem Resenda i dostavljaju izravno na moj e-mail. Ne pohranjuju se ni u jednoj bazi podataka, ne dijele se s trećim stranama i koriste se isključivo za odgovor na vaš upit.',
      },
      {
        heading: 'reCAPTCHA',
        body: 'Ova stranica koristi Google reCAPTCHA v3 za zaštitu kontaktnog obrasca od neželjenih poruka. reCAPTCHA prikuplja informacije o hardveru i softveru i šalje ih Googleu na analizu. Googleova upotreba tih podataka regulirana je njihovim Pravilima privatnosti i Uvjetima korištenja.',
      },
      {
        heading: 'Kolačići',
        body: 'Ova stranica ne koristi kolačiće prema zadanim postavkama. Ako prihvatite neobvezne kolačiće putem obavijesti o kolačićima, trenutno se ne postavljaju nikakvi kolačići (analitika nije aktivna). Svoj odabir možete promijeniti u bilo kojem trenutku brisanjem podataka preglednika.',
      },
      {
        heading: 'Vaša prava (GDPR)',
        body: <>Ako se nalazite u EU/EEA, imate pravo pristupa, ispravka ili brisanja osobnih podataka koje ste poslali putem kontaktnog obrasca. Za ostvarivanje ovih prava kontaktirajte {emailLink}.</>,
      },
      {
        heading: 'Čuvanje podataka',
        body: 'Podaci iz kontaktnog obrasca čuvaju se samo onoliko dugo koliko je potrebno za odgovor na vaš upit i podliježu standardnoj praksi čuvanja e-pošte.',
      },
      {
        heading: 'Izmjene ovih pravila',
        body: 'Ova pravila mogu se povremeno ažurirati. Datum na vrhu stranice odražava posljednju izmjenu.',
      },
    ],
  },
}

export default function PrivacyPage() {
  const { lang } = useLang()
  const c = content[lang]

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '5rem 2rem 4rem',
        background: 'var(--bg, #080810)',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-fira-code)',
            fontSize: '0.8rem',
            color: 'var(--muted)',
            textDecoration: 'none',
            marginBottom: '2.5rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        >
          {c.back}
        </Link>

        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.5rem',
            lineHeight: 1.2,
          }}
        >
          {c.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-fira-code)',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            marginBottom: '3rem',
            letterSpacing: '0.04em',
          }}
        >
          {c.subtitle}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {c.sections.map((section) => (
            <div key={section.heading}>
              <h2
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  marginBottom: '0.5rem',
                }}
              >
                {section.heading}
              </h2>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--muted)',
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
