import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/sections/hero/Hero'
import Work from '@/components/sections/work/Work'
import HowIWork from '@/components/sections/how-i-work/HowIWork'
import About from '@/components/sections/about/About'
import Contact from '@/components/sections/contact/Contact'
import Services from '@/components/sections/services/Services'

// Homepage in section order (decision 0008; Karlo 2026-11-20: What I take on moved up to follow
// Work, matching the header nav. Light and warm bands alternate).
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <About />
      <HowIWork />
      <Contact />
    </>
  )
}
