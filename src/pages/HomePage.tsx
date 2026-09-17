import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Expertise } from '../components/sections/Expertise'
import { Participation } from '../components/sections/Participation'
import { Projects } from '../components/sections/Projects'
import { Experience } from '../components/sections/Experience'
import { Services } from '../components/sections/Services'
import { Contact } from '../components/sections/Contact'
import { BackToTop } from '../components/ui/BackToTop'
import { useScrollToHash } from '../hooks/useScrollToHash'

export function HomePage() {
  useScrollToHash()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Participation />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}