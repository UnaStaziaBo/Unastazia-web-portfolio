import { useCallback, useEffect, useRef, useState } from 'react'
import { LiveProjectPreview } from '../LiveProjectPreview/LiveProjectPreview'
import { KnowledgePortal, type PortalState } from '../KnowledgePortal/KnowledgePortal'
import { LiveGamePreview } from '../LiveGamePreview/LiveGamePreview'
import { DragonTrial, type TrialState } from '../DragonTrial/DragonTrial'
import { LivingCodex } from '../LivingCodex/LivingCodex'
import tmtpLogo from '../../assets/tmtp/tmtp-logo.png'
import { AiCognitoWorkbench } from '../AiCognitoWorkbench/AiCognitoWorkbench'
import { MirrorExperience } from '../MirrorExperience/MirrorExperience'
import { NedaExperience } from '../NedaExperience/NedaExperience'
import { StepToLifeExperience } from '../StepToLifeExperience/StepToLifeExperience'
import './ProjectChapter.css'
import './VolansSortChapter.css'
import './AiCognitoChapter.css'
import './NedaChapter.css'

type Project = { number: string; title: string; id: string; type: string; description: string; tags: readonly string[] }

type Props = { project: Project; background: string }

export function ProjectChapter({ project, background }: Props) {
  if (project.id === 'volans-sort') return <VolansSortChapter project={project} background={background} />
  if (project.id === 'aicognito') return <AiCognitoChapter project={project} background={background} />
  if (project.id === 'neda') return <NedaChapter project={project} background={background} />

  return <article className={`project-chapter ${project.number === '07' ? 'project-finale' : ''}`} id={project.id} style={{ '--chapter-background': `url(${background})`, backgroundAttachment: project.number === '07' ? 'fixed' : undefined } as React.CSSProperties}>
    <div className="chapter-content"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><a href="#contact">View case study <span>↗</span></a></div>
    {project.id === 'ai-system' ? <AiSystemPortal title={project.title} /> : project.id === 'tmtp' ? <LivingCodex youtubeId="imx2xqSUQhk" title={project.title} logo={tmtpLogo} /> : project.id === 'mirror' ? <MirrorExperience /> : project.id === 'steptolife' ? <StepToLifeExperience /> : <div className="chapter-preview" aria-label={`${project.title} project preview`}><div className="preview-top"><i /><i /><i /></div><strong>{project.title}</strong><p>Project experience</p><div className="preview-lines"><i /><i /><i /></div></div>}
  </article>
}

function AiSystemPortal({ title }: { title: string }) {
  const [portalState, setPortalState] = useState<PortalState>('dormant')
  const awakeningTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(awakeningTimer.current), [])

  const handleInteractionChange = useCallback((nextIsInteractive: boolean) => {
    window.clearTimeout(awakeningTimer.current)

    if (!nextIsInteractive) {
      setPortalState('dormant')
      return
    }

    setPortalState('awakening')
    awakeningTimer.current = window.setTimeout(() => setPortalState('active'), 720)
  }, [])

  return <KnowledgePortal state={portalState}><LiveProjectPreview title={title} url="https://learn.unastazia.com/" variant="knowledge-portal" onInteractionChange={handleInteractionChange} /></KnowledgePortal>
}

function VolansSortChapter({ project, background }: Props) {
  const [trialState, setTrialState] = useState<TrialState>('dormant')
  const activationTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(activationTimer.current), [])

  const handlePlayStateChange = useCallback((isPlaying: boolean) => {
    window.clearTimeout(activationTimer.current)

    if (!isPlaying) {
      setTrialState('dormant')
      return
    }

    setTrialState('activating')
    activationTimer.current = window.setTimeout(() => setTrialState('active'), 700)
  }, [])

  return <article className="project-chapter project-chapter--volans" id={project.id} style={{ '--chapter-background': `url(${background})` } as React.CSSProperties}>
    <div className="volans-chapter-marker"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p></div>
    <DragonTrial state={trialState}><LiveGamePreview title={project.title} playerUrl="https://html-classic.itch.zone/html/17040245/Volans-Sort-browser4/index.html?v=1782755762" externalUrl="https://unastaziabo.itch.io/volans-sort-puzzle-game" variant="dragon-trial" onPlayStateChange={handlePlayStateChange} /></DragonTrial>
    <div className="chapter-content volans-project-info"><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
    <a className="volans-case-link" href="#contact">View case study <span>↗</span></a>
  </article>
}

function AiCognitoChapter({ project, background }: Props) {
  return <article className="project-chapter project-chapter--aicognito" id={project.id} style={{ '--chapter-background': `url(${background})` } as React.CSSProperties}>
    <AiCognitoWorkbench />
    <div className="chapter-content aicognito-project-info"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><p className="aicognito-try-hint"><span aria-hidden="true"></span></p></div>
    <a className="aicognito-case-link" href="#contact">View case study <span>↗</span></a>
  </article>
}

function NedaChapter({ project, background }: Props) {
  return <article className="project-chapter project-chapter--neda" id={project.id} style={{ '--chapter-background': `url(${background})` } as React.CSSProperties}>
    <NedaExperience />
    <div className="chapter-content neda-project-info"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><p className="neda-ask-hint"><span aria-hidden="true"></span></p></div>
    <a className="neda-case-link" href="#contact">View case study <span>↗</span></a>
  </article>
}
