import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/sections/hero/Hero'
import Work from '@/components/sections/work/Work'
import About from '@/components/sections/about/About'
import Contact from '@/components/sections/contact/Contact'
import Services from '@/components/sections/services/Services'

// Homepage in section order (E1, decision 0010): hero, pinned Work stage, then plain scroll.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <About />
      <Contact />
    </>
  )
}
