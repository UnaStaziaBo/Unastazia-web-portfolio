import { useCallback, useEffect, useRef, useState } from 'react'
import { LiveProjectPreview } from '../LiveProjectPreview/LiveProjectPreview'
import { KnowledgePortal, type PortalState } from '../KnowledgePortal/KnowledgePortal'
import { LiveGamePreview } from '../LiveGamePreview/LiveGamePreview'
import { DragonTrial, type TrialState } from '../DragonTrial/DragonTrial'
import { LivingCodex } from '../LivingCodex/LivingCodex'
import tmtpLogo from '../../assets/tmtp/tmtp-logo.webp'
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

  return <article className={`project-chapter ${project.number === '07' ? 'project-finale' : ''}`} id={project.id} data-journey-anchor={project.id} style={{ '--chapter-background': `url(${background})`, backgroundAttachment: project.number === '07' ? 'fixed' : undefined } as React.CSSProperties}>
    <div className="chapter-content"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>{project.id === 'tmtp' && <><p className="tmtp-credit">Co-created with <a href="https://www.linkedin.com/in/steve-michira-97a280339/" target="_blank" rel="noopener noreferrer">Steve Michira</a></p><p className="tmtp-links"><a href="https://github.com/UnaStaziaBo/TMTP-project-aware-AI-mentor-for-developers" target="_blank" rel="noopener noreferrer"></a><span aria-hidden="true">·</span><a href="https://codethegiant.vercel.app/" target="_blank" rel="noopener noreferrer">Website</a></p></>}{project.id === 'mirror' && <p className="tmtp-credit">Co-created with <a href="https://www.linkedin.com/in/artur-paulouski/" target="_blank" rel="noopener noreferrer">Artur Paulouski</a></p>}{project.id === 'steptolife' && <p className="tmtp-credit">Co-created with <a href="https://www.linkedin.com/in/ivan-pavlenko-413936229/" target="_blank" rel="noopener noreferrer">Ivan Pavlenko</a> <span aria-hidden="true">·</span> <a href="https://github.com/WarpFoxHub" target="_blank" rel="noopener noreferrer">GitHub</a></p>}<a href={project.id === 'ai-system' ? 'https://github.com/UnaStaziaBo/Intelligent-Learning-System' : project.id === 'tmtp' ? 'https://github.com/UnaStaziaBo/TMTP-project-aware-AI-mentor-for-developers' : project.id === 'mirror' ? 'https://github.com/UnaStaziaBo/Mirror---interactive-social-media-simulator' : project.id === 'steptolife' ? 'https://github.com/UnaStaziaBo/StepToLife' : '#contact'} target={project.id === 'ai-system' || project.id === 'tmtp' || project.id === 'mirror' || project.id === 'steptolife' ? '_blank' : undefined} rel={project.id === 'ai-system' || project.id === 'tmtp' || project.id === 'mirror' || project.id === 'steptolife' ? 'noopener noreferrer' : undefined}>View case study <span>↗</span></a></div>
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

  return <article className="project-chapter project-chapter--volans" id={project.id} data-journey-anchor={project.id} style={{ '--chapter-background': `url(${background})` } as React.CSSProperties}>
    <div className="volans-chapter-marker"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p></div>
    <DragonTrial state={trialState}><LiveGamePreview title={project.title} playerUrl="https://html-classic.itch.zone/html/17040245/Volans-Sort-browser4/index.html?v=1782755762" externalUrl="https://unastaziabo.itch.io/volans-sort-puzzle-game" variant="dragon-trial" onPlayStateChange={handlePlayStateChange} /></DragonTrial>
    <div className="chapter-content volans-project-info"><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
    <a className="volans-case-link" href="https://github.com/UnaStaziaBo/Volans-Sort" target="_blank" rel="noopener noreferrer">View case study <span>↗</span></a>
  </article>
}

function AiCognitoChapter({ project, background }: Props) {
  return <article className="project-chapter project-chapter--aicognito" id={project.id} data-journey-anchor={project.id} style={{ '--chapter-background': `url(${background})` } as React.CSSProperties}>
    <AiCognitoWorkbench />
    <div className="chapter-content aicognito-project-info"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><a className="aicognito-case-link" href="https://github.com/UnaStaziaBo/AiCognito-Intellij-Plugin" target="_blank" rel="noopener noreferrer">View case study <span>↗</span></a></div>
  </article>
}

function NedaChapter({ project, background }: Props) {
  return <article className="project-chapter project-chapter--neda" id={project.id} data-journey-anchor={project.id} style={{ '--chapter-background': `url(${background})` } as React.CSSProperties}>
    <NedaExperience />
    <div className="chapter-content neda-project-info"><p className="chapter-number">{project.number}</p><p className="chapter-type">{project.type}</p><h2>{project.title}</h2><p className="chapter-description">{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="neda-team"><p>Built with the ITCats team</p><ul><li><strong>Ivan Pavlenko</strong><span className="neda-team-links"><a href="https://www.linkedin.com/in/ivan-pavlenko-413936229/" target="_blank" rel="noopener noreferrer" aria-label="Ivan Pavlenko on LinkedIn">in</a><a href="https://github.com/WarpFoxHub" target="_blank" rel="noopener noreferrer" aria-label="Ivan Pavlenko on GitHub">GH</a></span></li><li><strong>Artem Kriaskov</strong><span className="neda-team-links"><a href="https://www.linkedin.com/in/artem-kriaskov-821ab0386/" target="_blank" rel="noopener noreferrer" aria-label="Artem Kriaskov on LinkedIn">in</a><a href="https://github.com/Smed3" target="_blank" rel="noopener noreferrer" aria-label="Artem Kriaskov on GitHub">GH</a></span></li><li><strong>Anastasiia Khoriakova</strong><span className="neda-team-links"><a href="https://www.linkedin.com/in/anastasiia-khoriakova-1511b432b/" target="_blank" rel="noopener noreferrer" aria-label="Anastasiia Khoriakova on LinkedIn">in</a><a href="https://github.com/AsyaAsyushkina" target="_blank" rel="noopener noreferrer" aria-label="Anastasiia Khoriakova on GitHub">GH</a></span></li></ul></div><a className="neda-case-link" href="https://github.com/UnaStaziaBo/NEDA-Natural-Electronic-Devices-Advisor" target="_blank" rel="noopener noreferrer">View case study <span>↗</span></a></div>
  </article>
}
