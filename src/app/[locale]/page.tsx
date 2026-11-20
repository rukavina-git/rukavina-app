import { setRequestLocale } from 'next-intl/server'
import { sections } from '@/lib/site'

// Section shells; each later step of the homepage-v2 plan fills one in.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      {sections.map((id) => (
        <section key={id} id={id} />
      ))}
    </>
  )
}
