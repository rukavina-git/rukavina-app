import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        {/* Each component renders its own <section id="..."> internally */}
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
      <ScrollToTop />
    </>
  )
}
