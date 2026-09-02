import { useEffect } from 'react'
import { Hero } from './components/Hero/Hero'
import { ContactFooter } from './components/ContactFooter/ContactFooter'
import { DragonGuide } from './components/DragonGuide/DragonGuide'
import { GoldenJourney } from './components/GoldenJourney/GoldenJourney'
import { ProjectChapter } from './components/ProjectChapter/ProjectChapter'
import { projects } from './data/projects'
import background2 from './backgrounds/background_2.webp'
import background3 from './backgrounds/background_3.webp'
import background4 from './backgrounds/background_4.webp'
import background5 from './backgrounds/background_5.webp'
import background6 from './backgrounds/background_6.webp'
import background7 from './backgrounds/background_7.webp'
import background8 from './backgrounds/background_8.webp'
import './App.css'

const chapterBackgrounds = [background2, background3, background4, background5, background6, background7, background8]

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.project-chapter, .contact-footer')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-background-ready')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '900px 0px' })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <main><Hero /><section className="chapters" id="projects" aria-label="Portfolio projects">{projects.map((project, index) => <ProjectChapter key={project.id} project={project} background={chapterBackgrounds[index]} />)}</section><ContactFooter /><GoldenJourney /><DragonGuide /></main>
}

export default App
