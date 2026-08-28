import { Hero } from './components/Hero/Hero'
import { ContactFooter } from './components/ContactFooter/ContactFooter'
import { ProjectChapter } from './components/ProjectChapter/ProjectChapter'
import { projects } from './data/projects'
import background2 from './backgrounds/background_2.png'
import background3 from './backgrounds/background_3.png'
import background4 from './backgrounds/background_4.png'
import background5 from './backgrounds/background_5.png'
import background6 from './backgrounds/background_6.png'
import background7 from './backgrounds/background_7.png'
import background8 from './backgrounds/background_8.png'
import './App.css'

const chapterBackgrounds = [background2, background3, background4, background5, background6, background7, background8]

function App() {
  return <main><Hero /><section className="chapters" aria-label="Portfolio projects">{projects.map((project, index) => <ProjectChapter key={project.id} project={project} background={chapterBackgrounds[index]} />)}</section><ContactFooter /></main>
}

export default App
