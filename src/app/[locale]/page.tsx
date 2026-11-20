import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/sections/hero/Hero'
import Work from '@/components/sections/work/Work'
import { sections } from '@/lib/site'

// Hero, then section shells; each later step of the homepage-v2 plan fills one in.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <Hero />
      <Work />
      {sections
        .filter((id) => id !== 'work')
        .map((id) => (
          <section key={id} id={id} />
        ))}
    </>
  )
}
