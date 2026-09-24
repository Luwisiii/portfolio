import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FeaturedProjects } from './components/FeaturedProjects'
import { Experience } from './components/Experience'
import { SupportingWork } from './components/SupportingWork'
import { Capstone } from './components/Capstone'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Terminal, TerminalHint } from './components/Terminal'
import { Achievements } from './components/Achievements'
import { Reward } from './components/Reward'

function App() {
  // shared links like /#top: jump to the section, then drop the hash from the URL
  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
    history.replaceState(null, '', location.pathname + location.search)
    el?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedProjects />
        <Experience />
        <SupportingWork />
        <Capstone />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Terminal />
      <TerminalHint />
      <Achievements />
      <Reward />
    </>
  )
}

export default App
