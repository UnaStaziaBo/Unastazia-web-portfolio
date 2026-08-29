import type { ReactNode } from 'react'
import './KnowledgePortal.css'

export type PortalState = 'dormant' | 'awakening' | 'active'

type KnowledgePortalProps = {
  children: ReactNode
  state: PortalState
}

const particles = ['✦', '•', '01', '·', 'A', '✦', '{}', '•']

export function KnowledgePortal({ children, state }: KnowledgePortalProps) {
  return <div className={`knowledge-portal knowledge-portal--${state}`}>
    <div className="knowledge-portal__glow" aria-hidden="true" />
    <div className="knowledge-portal__frame" aria-hidden="true"><i className="portal-corner portal-corner--northwest" /><i className="portal-corner portal-corner--northeast" /><i className="portal-corner portal-corner--southwest" /><i className="portal-corner portal-corner--southeast" /></div>
    <div className="knowledge-portal__viewport">{children}</div>
    <div className="knowledge-portal__foliage" aria-hidden="true"><i /><i /><i /><b /></div>
    <div className="knowledge-portal__particles" aria-hidden="true">{particles.map((particle, index) => <span className={`portal-particle portal-particle--${index + 1}`} key={`${particle}-${index}`}>{particle}</span>)}</div>
    {state === 'active' && <p className="knowledge-portal__status" aria-live="polite"><span aria-hidden="true">✦</span> AI System · active</p>}
  </div>
}
