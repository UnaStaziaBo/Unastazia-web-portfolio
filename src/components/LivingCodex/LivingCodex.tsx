import { useEffect, useRef, useState } from 'react'
import './LivingCodex.css'
import './LivingCodex.override.css'
import './LivingCodex.polish.css'

type CodexState = 'closed' | 'opening' | 'open' | 'video'

type LivingCodexProps = {
  logo: string
  title: string
  youtubeId: string
}

const particles = ['✦', '•', '</>', '·', '{}']

function motionDuration() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 180 : 720
}

export function LivingCodex({ logo, title, youtubeId }: LivingCodexProps) {
  const [state, setState] = useState<CodexState>('closed')
  const openingTimer = useRef<number | undefined>(undefined)
  const isOpen = state !== 'closed'
  const isVideo = state === 'video'
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`

  useEffect(() => () => window.clearTimeout(openingTimer.current), [])

  const openCodex = () => {
    window.clearTimeout(openingTimer.current)
    setState('opening')
    openingTimer.current = window.setTimeout(() => setState('open'), motionDuration())
  }

  const closeCodex = () => {
    window.clearTimeout(openingTimer.current)
    setState('closed')
  }

  return <section className={`living-codex living-codex--${state}`} aria-label={`${title} interactive book`}>
    <div className="living-codex__shadow" aria-hidden="true" />
    <div className="living-codex__aura" aria-hidden="true" />
    <div className="living-codex__particles" aria-hidden="true">{particles.map((particle, index) => <span className={`codex-particle codex-particle--${index + 1}`} key={`${particle}-${index}`}>{particle}</span>)}</div>

    <div className="codex-closed-book" aria-hidden={isOpen} inert={isOpen}>
      <div className="codex-book__page-block" aria-hidden="true" />
      <div className="codex-book__spine" aria-hidden="true" />
      <div className="codex-book__cover">
        <img src={logo} alt="TMTP logo featuring structured nodes, code and an open book" loading="lazy" decoding="async" />
        <button type="button" onClick={openCodex}>Open book <b>→</b></button>
      </div>
    </div>

    {isOpen && <div className={`codex-open-book ${isVideo ? 'is-folded' : ''}`} aria-hidden={state === 'opening' || isVideo} inert={state === 'opening' || isVideo}>
      <div className="codex-page codex-page--learning">
        <span className="book-eyebrow">How it works</span>
        <h3>Structured<br />learning</h3>
        <p className="learning-intro">A clear path from basics to mastery.</p>
        <ol className="learning-path"><li><b>01</b><i className="learning-node" aria-hidden="true" /><span className="learning-step__icon" aria-hidden="true">◫</span><span><strong>Learn</strong><small>Understand the concept.</small></span></li><li><b>02</b><i className="learning-node" aria-hidden="true" /><span className="learning-step__icon" aria-hidden="true">&lt;/&gt;</span><span><strong>Solve</strong><small>Work through a real problem.</small></span></li><li><b>03</b><i className="learning-node" aria-hidden="true" /><span className="learning-step__icon" aria-hidden="true">⌘</span><span><strong>Practice</strong><small>Build confidence by doing.</small></span></li><li><b>04</b><i className="learning-node" aria-hidden="true" /><span className="learning-step__icon" aria-hidden="true">↗</span><span><strong>Progress</strong><small>See your skills grow.</small></span></li></ol>
      </div>
      <div className="codex-spread__spine" aria-hidden="true" />
      <div className="codex-page codex-page--demo">
        <button className="book-close" type="button" onClick={closeCodex}>Close ×</button>
        <span className="book-eyebrow">Project demo</span>
        <img className="demo-logo" src={logo} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <h3>See TMTP<br />in action</h3>
        <p>Watch how the platform turns structured problems into a learning journey.</p>
        <button className="demo-preview" type="button" onClick={() => setState('video')}><span className="demo-preview__play" aria-hidden="true">▶</span><strong>Watch demo <b>→</b></strong></button>
      </div>
    </div>}

    {isVideo && <div className="codex-video">
      <div className="codex-video__bar"><button type="button" onClick={() => setState('open')}>← Back to book</button><span>TMTP · Product demo</span></div>
      <iframe src={embedUrl} title={`${title} product demo`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
    </div>}
  </section>
}
