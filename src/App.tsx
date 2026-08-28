import { Hero } from './components/Hero/Hero'
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
  return <main><Hero /><section className="chapters" aria-label="Portfolio projects">{projects.map((project, index) => <ProjectChapter key={project.id} project={project} background={chapterBackgrounds[index]} />)}</section><section className="about-section" id="about"><p>Creative developer · Problem solver · Based in Slovakia</p><h2>Every good project starts with a curious question.</h2></section><section className="skills-section" id="skills"><p className="label">Skills</p><p>React · TypeScript · Java · UX/UI · AI integration · Product thinking</p></section><footer id="contact"><p className="label">Let&apos;s connect</p><h2>Let&apos;s create something amazing together.</h2><a href="mailto:hello@example.com">Say hello&nbsp; ↗</a></footer></main>
}

export default App
