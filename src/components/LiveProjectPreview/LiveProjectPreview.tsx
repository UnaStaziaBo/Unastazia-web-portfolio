import { useState } from 'react'
import './LiveProjectPreview.css'

type LiveProjectPreviewProps = { url: string; title: string }

export function LiveProjectPreview({ url, title }: LiveProjectPreviewProps) {
  const [isInteractive, setIsInteractive] = useState(false)

  return <div className={`live-project-preview ${isInteractive ? 'is-interactive' : ''}`}>
    <div className="live-browser-chrome"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><a href={url} target="_blank" rel="noreferrer">Open full project ↗</a>{isInteractive && <button type="button" onClick={() => setIsInteractive(false)}>Exit preview ×</button>}</div>
    <iframe className="live-project-frame" src={url} title={`${title} interactive demo`} loading="lazy" tabIndex={isInteractive ? 0 : -1} />
    <div className="live-preview-overlay"><div><p>Explore {title}</p><span>Interact with the real project</span><button type="button" onClick={() => setIsInteractive(true)}>Start exploring <b>→</b></button><small>Click to interact</small></div></div>
  </div>
}
