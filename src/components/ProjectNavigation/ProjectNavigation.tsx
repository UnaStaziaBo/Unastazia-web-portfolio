import { projects } from '../../data/projects'
import './ProjectNavigation.css'

export function ProjectNavigation() {
  return <nav className="project-nav" aria-label="Projects">{projects.map((project, index) => <a href={`#${project.id}`} key={project.id} className={index === 0 ? 'is-active' : ''}>{index === 0 && <i aria-hidden="true" />}<span>{project.number}</span>{project.title}</a>)}<a className="connect" href="#contact">▢&nbsp; Let&apos;s connect</a></nav>
}
