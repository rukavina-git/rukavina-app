import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/sections/hero/Hero'
import Work from '@/components/sections/work/Work'
import HowIWork from '@/components/sections/how-i-work/HowIWork'
import About from '@/components/sections/about/About'
import Services from '@/components/sections/services/Services'

// Homepage in section order (decision 0008). Empty shells are filled by later plan steps.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <Hero />
      <Work />
      <HowIWork />
      <About />
      <Services />
      <section id="contact" />
    </>
  )
}
