import './HeroGoldenThread.css'

type HeroGoldenThreadProps = {
  phase: 'idle' | 'playing' | 'complete'
  isCtaActive: boolean
}

const threadPath = 'M 622 604 C 694 566 758 606 746 674 C 735 726 643 734 659 786 C 678 853 764 838 812 955'

export function HeroGoldenThread({ phase, isCtaActive }: HeroGoldenThreadProps) {
  return <svg className={`hero-golden-thread is-${phase}${isCtaActive ? ' is-cta-active' : ''}`} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <filter id="hero-thread-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="3.4" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="hero-spark-glow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="4" /></filter>
    </defs>
    <path className="hero-golden-thread__base" d={threadPath} pathLength="1" />
    <path id="hero-golden-thread-path" className="hero-golden-thread__draw" d={threadPath} pathLength="1" filter="url(#hero-thread-glow)" />
    <circle className="hero-golden-thread__spark-glow" cx="622" cy="604" r="8" filter="url(#hero-spark-glow)" />
    <circle className="hero-golden-thread__spark" cx="622" cy="604" r="3.1" />
    {phase === 'playing' && <circle className="hero-golden-thread__guide" r="3.2">
      <animateMotion dur="820ms" begin="1.24s" fill="freeze" path={threadPath} />
    </circle>}
    <circle className="hero-golden-thread__handoff" cx="812" cy="955" r="3.4" />
  </svg>
}
