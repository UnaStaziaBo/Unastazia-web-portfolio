import { useEffect, useRef, useState } from 'react'
import './MirrorExperience.css'

type MirrorState = 'teaser' | 'loading' | 'active'

const storyUrl = 'https://mirror.unastazia.com/'

export function MirrorExperience() {
  const [state, setState] = useState<MirrorState>('teaser')
  const [hasEntered, setHasEntered] = useState(false)
  const mirrorRef = useRef<HTMLElement>(null)
  const enterStory = () => setState('loading')

  useEffect(() => {
    const mirror = mirrorRef.current
    if (!mirror || !('IntersectionObserver' in window)) {
      setHasEntered(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setHasEntered(true)
      observer.disconnect()
    }, { threshold: 0.2 })

    observer.observe(mirror)
    return () => observer.disconnect()
  }, [])

  return <section ref={mirrorRef} className={`mirror-experience is-${state} ${hasEntered ? 'has-entered' : ''}`} aria-label="Mirror interactive story">
    <div className="mirror-contact-shadow" aria-hidden="true" />
    <div className="mirror-glass">
      <div className="mirror-utility"><a href={storyUrl} target="_blank" rel="noopener noreferrer">Open full story ↗</a>{state !== 'teaser' && <button type="button" onClick={() => setState('teaser')}>Exit story ×</button>}</div>
      {state === 'teaser' && <div className="mirror-teaser"><div><p>MIRROR</p><span>The internet reflects what we create.</span><strong>Every story begins with a choice.</strong><button type="button" onClick={enterStory}>Make a choice <b>→</b></button><small>Interactive story</small></div></div>}
      {state !== 'teaser' && <><iframe src={storyUrl} title="Mirror interactive story" loading="lazy" tabIndex={state === 'active' ? 0 : -1} onLoad={() => setState('active')} /><div className="mirror-loading" aria-live="polite"><strong>Opening Mirror...</strong><span>Your story is about to begin.</span></div></>}
    </div>
    <i className="mirror-glint" aria-hidden="true" /><i className="mirror-sparkle" aria-hidden="true">✦</i><span className="mirror-engraving" aria-hidden="true">M</span>
  </section>
}
