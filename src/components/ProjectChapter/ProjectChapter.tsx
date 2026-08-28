import type { projects } from '../../data/projects'
import './ProjectChapter.css'

type Project = (typeof projects)[number]

type Props = { project: Project; background: string }

export function ProjectChapter({ project, background }: Props) {
  return <article className="project-chapter" id={project.id} style={{ '--chapter-background': `url(${background})` } as React.CSSProperties}>
    <div className="chapter-content"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><a href="#contact">View case study <span>↗</span></a></div>
    <div className="chapter-preview" aria-label={`${project.title} project preview`}><div className="preview-top"><i /><i /><i /></div><strong>{project.title}</strong><p>Project experience</p><div className="preview-lines"><i /><i /><i /></div></div>
  </article>
}
