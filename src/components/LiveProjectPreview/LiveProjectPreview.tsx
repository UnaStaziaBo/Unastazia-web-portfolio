import { useEffect, useState } from 'react'
import './LiveProjectPreview.css'

type LiveProjectPreviewProps = {
  url: string
  title: string
  variant?: 'default' | 'knowledge-portal'
  onInteractionChange?: (isInteractive: boolean) => void
}

export function LiveProjectPreview({ url, title, variant = 'default', onInteractionChange }: LiveProjectPreviewProps) {
  const [isInteractive, setIsInteractive] = useState(false)
  const isKnowledgePortal = variant === 'knowledge-portal'

  useEffect(() => {
    onInteractionChange?.(isInteractive)
  }, [isInteractive, onInteractionChange])

  return <div className={`live-project-preview live-project-preview--${variant} ${isInteractive ? 'is-interactive' : ''}`}>
    <div className="live-browser-chrome"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><a href={url} target="_blank" rel="noreferrer">Open full project ↗</a>{isInteractive && <button type="button" onClick={() => setIsInteractive(false)}>{isKnowledgePortal ? 'Exit portal ×' : 'Exit preview ×'}</button>}</div>
    <iframe className="live-project-frame" src={url} title={`${title} interactive demo`} loading="lazy" tabIndex={isInteractive ? 0 : -1} />
    <div className="live-preview-overlay"><div>{isKnowledgePortal && <small className="live-preview-kicker">Discovery I</small>}<p>{isKnowledgePortal ? 'The Knowledge Portal' : `Explore ${title}`}</p><span>{isKnowledgePortal ? 'Explore the real AI System.' : 'Interact with the real project'}</span><button type="button" onClick={() => setIsInteractive(true)}>{isKnowledgePortal ? 'Start' : 'Start exploring'} <b>→</b></button><small className="live-preview-hint">Click to interact</small></div></div>
  </div>
}
