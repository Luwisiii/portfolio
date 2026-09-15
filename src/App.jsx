import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FeaturedProjects } from './components/FeaturedProjects'
import { Experience } from './components/Experience'
import { Capstone } from './components/Capstone'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedProjects />
        <Experience />
        <Capstone />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
