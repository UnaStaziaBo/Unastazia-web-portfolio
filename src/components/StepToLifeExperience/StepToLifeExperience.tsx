import { useEffect, useRef, useState } from 'react'
import originalStartGif from '../../assets/steptolife/original-start.gif'
import './StepToLifeExperience.css'

type StepToLifeView = 'choose' | 'path' | 'complete'
type PathType = 'career' | 'documents' | 'housing' | 'support'

const paths: Record<PathType, { label: string; prompt: string; steps: string[]; note: string }> = {
  career: { label: 'Career', prompt: 'Find a job', steps: ['Understand your situation', 'Prepare your CV', 'Find opportunities', 'Prepare to communicate', 'Take the next step'], note: 'The original build’s Find a Job path introduces support for resumes, searching and interviews.' },
  documents: { label: 'Documents', prompt: 'Handle paperwork', steps: ['Understand requirements', 'Prepare your documents', 'Plan the application', 'Communicate clearly', 'Track the next action'], note: 'The original prototype presents Documents as a planned support category; this roadmap shows the intended guided process.' },
  housing: { label: 'Housing', prompt: 'Find a place to live', steps: ['Understand your options', 'Define your needs', 'Prepare documents', 'Contact support', 'Move forward with confidence'], note: 'The original prototype presents Housing as a planned support category; this roadmap shows the intended guided process.' },
  support: { label: 'Daily life', prompt: 'Access local support', steps: ['Share what you need', 'Understand local help', 'Prepare key phrases', 'Choose your next action', 'Feel more at home'], note: 'The original prototype presents Slovak Language support as a planned category; this roadmap shows the intended guided process.' },
}

const devpostUrl = 'https://devpost.com/software/steptolife'
const routeDuration = 520

export function StepToLifeExperience() {
  const [view, setView] = useState<StepToLifeView>('choose')
  const [path, setPath] = useState<PathType>('career')
  const [activeStep, setActiveStep] = useState(0)
  const [isRouting, setIsRouting] = useState(false)
  const [routeFrom, setRouteFrom] = useState(0)
  const [routeTo, setRouteTo] = useState(0)
  const routeTimer = useRef<number | undefined>(undefined)
  const currentPath = paths[path]

  useEffect(() => () => window.clearTimeout(routeTimer.current), [])

  const clearRoute = () => {
    window.clearTimeout(routeTimer.current)
    setIsRouting(false)
  }

  const choosePath = (nextPath: PathType) => {
    clearRoute()
    setPath(nextPath)
    setActiveStep(0)
    setRouteFrom(0)
    setRouteTo(0)
    setView('path')
  }

  const travelTo = (nextStep: number) => {
    if (isRouting || nextStep === activeStep) return

    window.clearTimeout(routeTimer.current)
    setRouteFrom(activeStep)
    setRouteTo(nextStep)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveStep(nextStep)
      return
    }

    setIsRouting(true)
    routeTimer.current = window.setTimeout(() => {
      setActiveStep(nextStep)
      setIsRouting(false)
    }, routeDuration)
  }

  const continuePath = () => {
    if (activeStep === currentPath.steps.length - 1) {
      setView('complete')
      return
    }

    travelTo(activeStep + 1)
  }

  const routePosition = (step: number) => {
    const progress = step / (currentPath.steps.length - 1)
    return `calc(18px + ${progress * 100}% - ${progress * 36}px)`
  }

  const completedRouteWidth = () => {
    const progress = activeStep / (currentPath.steps.length - 1)
    return `calc(${progress * 100}% - ${progress * 36}px)`
  }

  return <section className={`steptolife-experience is-${view}${isRouting ? ' is-routing' : ''}`} aria-label="StepToLife pathfinder demo">
    {view === 'choose' && <div className="stl-choose"><p className="stl-eyebrow">Find your path</p><h3>You&apos;ve just arrived in Slovakia.<br />What do you need help with first?</h3><div className="stl-choice-grid">{(Object.keys(paths) as PathType[]).map((type) => <button type="button" key={type} onClick={() => choosePath(type)}><b>{paths[type].label}</b><span>{paths[type].prompt} <i aria-hidden="true">→</i></span></button>)}</div></div>}
    {view === 'path' && <div className="stl-path"><div className="stl-path-header"><div><p>{currentPath.label} route</p><h3>Your journey</h3></div><button type="button" onClick={() => { clearRoute(); setView('choose') }}>Change path</button></div><div className="stl-route-map" aria-label={`${currentPath.label} journey roadmap`}><span className="stl-route-track" aria-hidden="true" /><span className="stl-route-progress" style={{ width: completedRouteWidth() }} aria-hidden="true" />{isRouting && <span className="stl-route-light" style={{ '--route-origin': routePosition(routeFrom), '--route-target': routePosition(routeTo) } as React.CSSProperties} aria-hidden="true" />}<ol className="stl-route-waypoints">{currentPath.steps.map((step, index) => <li key={step} className={index < activeStep ? 'complete' : index === activeStep ? 'current' : ''}><button type="button" aria-current={index === activeStep ? 'step' : undefined} aria-label={`View step ${index + 1}: ${step}`} onClick={() => travelTo(index)}><i aria-hidden="true">{index === currentPath.steps.length - 1 ? '✦' : String(index + 1).padStart(2, '0')}</i><span>{step}</span></button></li>)}</ol></div><p className="stl-active-stage"><b>Step {String(activeStep + 1).padStart(2, '0')}</b><span>{currentPath.steps[activeStep]}</span></p><div className="stl-stage-media" aria-live="polite"><img key={`${path}-${activeStep}`} src={originalStartGif} alt="Original StepToLife interface showing Find a Job, Documents, Slovak Language and Housing support choices" loading="lazy" /></div><p className="stl-stage-caption"><b>{currentPath.steps[activeStep]}.</b> {currentPath.note}</p><button className="stl-continue" type="button" disabled={isRouting} onClick={continuePath}>{activeStep === currentPath.steps.length - 1 ? 'Complete my path' : 'Continue'} <b aria-hidden="true">→</b></button></div>}
    {view === 'complete' && <div className="stl-complete"><i aria-hidden="true">✦</i><p>You found your path</p><span>Starting somewhere new feels easier when you know what comes next.</span><div><button type="button" onClick={() => { setActiveStep(0); setRouteFrom(0); setRouteTo(0); setView('choose') }}>Explore another path ↺</button><a href={devpostUrl} target="_blank" rel="noopener noreferrer">View original project ↗</a></div><small>Hackathon project ✦</small></div>}
  </section>
}
