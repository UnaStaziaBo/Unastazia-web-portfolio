import { useEffect, useRef, useState } from 'react'
import debugImage from '../../assets/aicognito/plugin-debug.png'
import explainImage from '../../assets/aicognito/plugin-explain.png'
import modifyImage from '../../assets/aicognito/plugin-modify.png'
import newImage from '../../assets/aicognito/plugin-new.png'
import voiceImage from '../../assets/aicognito/plugin-voice.png'
import './AiCognitoWorkbench.css'

const modes = [
  { name: 'New', image: newImage, loadingLabel: 'Planning next step...', completeLabel: 'Plan ready ✓', alt: 'AiCognito New mode suggesting improvements for a Java method' },
  { name: 'Modify', image: modifyImage, loadingLabel: 'Preparing change...', completeLabel: 'Change prepared ✓', alt: 'AiCognito Modify mode showing Java code impact and a suggested fix' },
  { name: 'Debug', image: debugImage, loadingLabel: 'Analyzing code...', completeLabel: 'Issue found ✓', alt: 'AiCognito Debug mode showing analysis and a suggested Java fix' },
  { name: 'Explain', image: explainImage, loadingLabel: 'Reading context...', completeLabel: 'Context ready ✓', alt: 'AiCognito Explain mode explaining the selected Java method' },
  { name: 'Voice', image: voiceImage, loadingLabel: 'Listening...', completeLabel: 'Voice ready ✓', alt: 'AiCognito Voice mode explaining a Java method and its fix' },
] as const

type ModeName = (typeof modes)[number]['name']

function transitionDuration() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 120 : 430
}

export function AiCognitoWorkbench() {
  const [activeName, setActiveName] = useState<ModeName>('Debug')
  const [visibleName, setVisibleName] = useState<ModeName>('Debug')
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState('AI ready')
  const [showSuccess, setShowSuccess] = useState(false)
  const transitionTimer = useRef<number | undefined>(undefined)
  const readyTimer = useRef<number | undefined>(undefined)
  const active = modes.find((mode) => mode.name === activeName) ?? modes[2]
  const visible = modes.find((mode) => mode.name === visibleName) ?? modes[2]

  useEffect(() => () => {
    window.clearTimeout(transitionTimer.current)
    window.clearTimeout(readyTimer.current)
  }, [])

  const selectMode = (modeName: ModeName) => {
    const mode = modes.find((item) => item.name === modeName) ?? modes[2]
    window.clearTimeout(transitionTimer.current)
    window.clearTimeout(readyTimer.current)
    setActiveName(mode.name)
    setStatus(mode.loadingLabel)
    setShowSuccess(false)
    setIsProcessing(true)

    transitionTimer.current = window.setTimeout(() => {
      setVisibleName(mode.name)
      setIsProcessing(false)
      setStatus(mode.completeLabel)
      setShowSuccess(true)
      readyTimer.current = window.setTimeout(() => {
        setStatus('AI ready')
        setShowSuccess(false)
      }, 880)
    }, transitionDuration())
  }

  return <section className={`aicognito-workbench aicognito-workbench--${activeName.toLowerCase()} ${isProcessing ? 'is-processing' : ''} ${showSuccess ? 'has-success' : ''}`} aria-label="AiCognito interactive developer workstation">
    <div className="workbench-aura" aria-hidden="true" />
    <div className="workbench-corner workbench-corner--northwest" aria-hidden="true" /><div className="workbench-corner workbench-corner--southeast" aria-hidden="true" />
    <div className="workbench-header"><strong>AiCognito</strong><span className="workbench-status" aria-live="polite"><i aria-hidden="true" />{status}</span>{activeName === 'Voice' && isProcessing && <span className="voice-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>}</div>
    <div className="workbench-actions" role="group" aria-label="Try AiCognito modes">{modes.map((mode) => <button type="button" key={mode.name} aria-pressed={activeName === mode.name} onClick={() => selectMode(mode.name)}>{mode.name}</button>)}</div>
    <p className="workbench-hint">Choose how AiCognito helps</p>
    <div className="workbench-screen">
      <img key={visible.name} src={visible.image} alt={visible.alt} loading="lazy" decoding="async" />
      {isProcessing && <div className="workbench-analysis" aria-hidden="true"><span>{active.loadingLabel}</span>{activeName === 'Debug' && <><i className="analysis-code-focus" /><i className="analysis-connector" /><b>Logic issue</b></>}{activeName === 'Voice' && <div className="analysis-wave"><i /><i /><i /><i /><i /></div>}</div>}
      {showSuccess && activeName === 'Debug' && <div className="workbench-sparks" aria-hidden="true"><span>{'{}'}</span><span>✦</span></div>}
      {showSuccess && activeName === 'Explain' && <span className="workbench-explain-spark" aria-hidden="true">&lt;/&gt;</span>}
    </div>
  </section>
}
