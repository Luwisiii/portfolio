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

function App() {
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
    </>
  )
}

export default App
