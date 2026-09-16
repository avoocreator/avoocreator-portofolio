import TargetCursor from './components/ui/TargetCursor'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Expertise } from './components/sections/Expertise'
import { Approach } from './components/sections/Approach'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Services } from './components/sections/Services'
import { Contact } from './components/sections/Contact'
import { BackToTop } from './components/ui/BackToTop'

function App() {
  return (
    <div className="min-h-screen">
      <TargetCursor
        targetSelector=".cursor-target, [data-hover]"
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#F4F3EF"
        cursorColorOnTarget="#E2661F"
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Approach />
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

export default App
