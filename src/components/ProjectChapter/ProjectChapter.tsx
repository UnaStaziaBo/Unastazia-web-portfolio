import { LiveProjectPreview } from '../LiveProjectPreview/LiveProjectPreview'
import { LiveGamePreview } from '../LiveGamePreview/LiveGamePreview'
import { ProjectVideoPreview } from '../ProjectVideoPreview/ProjectVideoPreview'
import { AiCognitoPreview } from '../AiCognitoPreview/AiCognitoPreview'
import { MirrorExperience } from '../MirrorExperience/MirrorExperience'
import { NedaExperience } from '../NedaExperience/NedaExperience'
import { StepToLifeExperience } from '../StepToLifeExperience/StepToLifeExperience'
import './ProjectChapter.css'

type Project = { number: string; title: string; id: string; type: string; description: string; tags: readonly string[] }

type Props = { project: Project; background: string }

export function ProjectChapter({ project, background }: Props) {
  return <article className={`project-chapter ${project.number === '07' ? 'project-finale' : ''}`} id={project.id} style={{ '--chapter-background': `url(${background})`, backgroundAttachment: project.number === '07' ? 'fixed' : undefined } as React.CSSProperties}>
    <div className="chapter-content"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><a href="#contact">View case study <span>↗</span></a></div>
    {project.id === 'ai-system' ? <LiveProjectPreview title={project.title} url="https://learn.unastazia.com/" /> : project.id === 'volans-sort' ? <LiveGamePreview title={project.title} playerUrl="https://html-classic.itch.zone/html/17040245/Volans-Sort-browser4/index.html?v=1782755762" externalUrl="https://unastaziabo.itch.io/volans-sort-puzzle-game" /> : project.id === 'tmtp' ? <ProjectVideoPreview youtubeId="imx2xqSUQhk" title={project.title} /> : project.id === 'aicognito' ? <AiCognitoPreview /> : project.id === 'mirror' ? <MirrorExperience /> : project.id === 'neda' ? <NedaExperience /> : project.id === 'steptolife' ? <StepToLifeExperience /> : <div className="chapter-preview" aria-label={`${project.title} project preview`}><div className="preview-top"><i /><i /><i /></div><strong>{project.title}</strong><p>Project experience</p><div className="preview-lines"><i /><i /><i /></div></div>}
  </article>
}
