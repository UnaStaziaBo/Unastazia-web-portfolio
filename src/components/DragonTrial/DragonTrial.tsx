import type { ReactNode } from 'react'
import './DragonTrial.css'

export type TrialState = 'dormant' | 'activating' | 'active'

type DragonTrialProps = {
  children: ReactNode
  state: TrialState
}

const marks = ['◇', '○', '△', '·', '◇']

export function DragonTrial({ children, state }: DragonTrialProps) {
  return <div className={`dragon-trial dragon-trial--${state}`}>
    <div className="dragon-trial__light" aria-hidden="true" />
    <div className="dragon-trial__reflection" aria-hidden="true" />
    <div className="dragon-trial__altar" aria-hidden="true"><i /><i /><i /></div>
    <div className="dragon-trial__screen">{children}</div>
    <div className="dragon-trial__moss" aria-hidden="true"><i /><i /><i /><b /></div>
    <div className="dragon-trial__marks" aria-hidden="true">{marks.map((mark, index) => <span className={`trial-mark trial-mark--${index + 1}`} key={`${mark}-${index}`}>{mark}</span>)}</div>
    {state === 'active' && <p className="dragon-trial__status" aria-live="polite"><span aria-hidden="true">●</span> Volans Sort · trial active</p>}
  </div>
}
