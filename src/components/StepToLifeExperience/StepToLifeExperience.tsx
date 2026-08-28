import { useState } from 'react'
import originalStartGif from '../../assets/steptolife/original-start.gif'
import './StepToLifeExperience.css'
import './StepToLifeExperience.override.css'

type StepToLifeView = 'choose' | 'path' | 'complete'
type PathType = 'career' | 'documents' | 'housing' | 'support'

const paths: Record<PathType, { label: string; prompt: string; steps: string[]; note: string }> = {
  career: { label: 'Career', prompt: 'Find a job', steps: ['Understand your situation', 'Prepare your CV', 'Find opportunities', 'Prepare to communicate', 'Take the next step'], note: 'The original build’s Find a Job path introduces support for resumes, searching and interviews.' },
  documents: { label: 'Documents', prompt: 'Handle paperwork', steps: ['Understand requirements', 'Prepare your documents', 'Plan the application', 'Communicate clearly', 'Track the next action'], note: 'The original prototype presents Documents as a planned support category; this roadmap shows the intended guided process.' },
  housing: { label: 'Housing', prompt: 'Find a place to live', steps: ['Understand your options', 'Define your needs', 'Prepare documents', 'Contact support', 'Move forward with confidence'], note: 'The original prototype presents Housing as a planned support category; this roadmap shows the intended guided process.' },
  support: { label: 'Daily life', prompt: 'Access local support', steps: ['Share what you need', 'Understand local help', 'Prepare key phrases', 'Choose your next action', 'Feel more at home'], note: 'The original prototype presents Slovak Language support as a planned category; this roadmap shows the intended guided process.' },
}

const devpostUrl = 'https://devpost.com/software/steptolife'

export function StepToLifeExperience() {
  const [view, setView] = useState<StepToLifeView>('choose')
  const [path, setPath] = useState<PathType>('career')
  const [activeStep, setActiveStep] = useState(0)
  const currentPath = paths[path]
  const choosePath = (nextPath: PathType) => { setPath(nextPath); setActiveStep(0); setView('path') }
  const continuePath = () => { if (activeStep === currentPath.steps.length - 1) { setView('complete') } else { setActiveStep((step) => step + 1) } }

  return <section className={`steptolife-experience is-${view}`} aria-label="StepToLife pathfinder demo">
    <header className="stl-chrome"><span className="stl-dots" aria-hidden="true"><i /><i /><i /></span><strong>StepToLife</strong><span>{view === 'complete' ? 'Path found' : 'Find your path'}</span></header>
    {view === 'choose' && <div className="stl-choose"><p className="stl-eyebrow">Find your path</p><h3>You&apos;ve just arrived in Slovakia.<br />What do you need help with first?</h3><div>{(Object.keys(paths) as PathType[]).map((type) => <button type="button" key={type} onClick={() => choosePath(type)}><b>{paths[type].label}</b><span>{paths[type].prompt} <i>→</i></span></button>)}</div></div>}
    {view === 'path' && <div className="stl-path"><div className="stl-path-header"><div><p>{currentPath.label}</p><h3>Your path</h3></div><button type="button" onClick={() => setView('choose')}>Change path</button></div><div className="stl-path-body"><ol>{currentPath.steps.map((step, index) => <li key={step} className={index < activeStep ? 'complete' : index === activeStep ? 'current' : ''}><button type="button" aria-current={index === activeStep ? 'step' : undefined} onClick={() => setActiveStep(index)}><i>{index < activeStep ? '✓' : index === activeStep ? '●' : index === currentPath.steps.length - 1 ? '✦' : '○'}</i><span>{step}</span></button></li>)}</ol><div className="stl-media"><span>From the original build</span><img src={originalStartGif} alt="StepToLife original interface showing its job, documents, Slovak language and housing support choices" loading="lazy" /><p><b>{currentPath.steps[activeStep]}</b>{currentPath.note}</p></div></div><button className="stl-continue" type="button" onClick={continuePath}>{activeStep === currentPath.steps.length - 1 ? 'Complete my path' : 'Continue'} <b>→</b></button></div>}
    {view === 'complete' && <div className="stl-complete"><i>✦</i><p>You found your path</p><span>Starting somewhere new feels easier when you know what comes next.</span><div><button type="button" onClick={() => { setActiveStep(0); setView('choose') }}>Explore another path ↺</button><a href={devpostUrl} target="_blank" rel="noopener noreferrer">View original project ↗</a></div><small>Hackathon project ✦</small></div>}
  </section>
}
