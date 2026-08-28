import { useState } from 'react'
import './MirrorExperience.css'

type MirrorState = 'teaser' | 'loading' | 'active'

const storyUrl = 'https://mirror.unastazia.com/'

export function MirrorExperience() {
  const [state, setState] = useState<MirrorState>('teaser')
  const enterStory = () => setState('loading')

  return <section className={`mirror-experience is-${state}`} aria-label="Mirror interactive story">
    <div className="mirror-chrome"><strong>Mirror</strong><span>• Story experience</span><a href={storyUrl} target="_blank" rel="noopener noreferrer">Open full story ↗</a>{state !== 'teaser' && <button type="button" onClick={() => setState('teaser')}>Exit story ×</button>}</div>
    {state === 'teaser' && <div className="mirror-teaser"><i className="mirror-light mirror-light-one" /><i className="mirror-light mirror-light-two" /><div><p>MIRROR</p><span>The internet reflects what we create.</span><strong>Every story begins with a choice.</strong><button type="button" onClick={enterStory}>Make a choice <b>→</b></button><small>Interactive story</small></div></div>}
    {state !== 'teaser' && <><iframe src={storyUrl} title="Mirror interactive story" loading="lazy" tabIndex={state === 'active' ? 0 : -1} onLoad={() => setState('active')} /><div className="mirror-loading" aria-live="polite"><strong>Opening Mirror...</strong><span>Your story is about to begin.</span></div></>}
  </section>
}
