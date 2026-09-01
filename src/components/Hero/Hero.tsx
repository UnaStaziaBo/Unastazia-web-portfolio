import { useEffect, useRef, useState } from 'react'
import cv from '../../assets/Anastasiia-Borodina-Software-Engineer-CV.pdf'
import portrait from '../../assets/me.png'
import { Header } from '../Header/Header'
import { HeroGoldenThread } from '../HeroGoldenThread/HeroGoldenThread'
import { ProjectNavigation } from '../ProjectNavigation/ProjectNavigation'
import './Hero.css'

type IntroPhase = 'idle' | 'playing' | 'complete'

function startsBelowHero() {
  return typeof window !== 'undefined' && window.scrollY > 24
}

export function Hero() {
  const initiallyComplete = startsBelowHero()
  const [introPhase, setIntroPhase] = useState<IntroPhase>(() => initiallyComplete ? 'complete' : 'idle')
  const [isCtaActive, setIsCtaActive] = useState(false)
  const isCompleteRef = useRef(initiallyComplete)

  useEffect(() => {
    const completeIntro = () => {
      if (isCompleteRef.current) return
      isCompleteRef.current = true
      setIntroPhase('complete')
    }

    if (isCompleteRef.current) return undefined

    const startFrame = window.requestAnimationFrame(() => setIntroPhase('playing'))
    const finishTimer = window.setTimeout(completeIntro, 2200)
    const onScroll = () => {
      if (window.scrollY > 12) completeIntro()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(startFrame)
      window.clearTimeout(finishTimer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <section className="hero" id="top" data-journey-anchor="hero">
    <div className="hero-scene" aria-hidden="true"><div className="cathedral">♜</div></div>
    <Header />
    <div className="hero-copy">
      <p className="hero-role">Software Developer <span aria-hidden="true">✦</span> AI &amp; Data</p>
      <h1>Programmer who enjoys<br />helping people by<br />combining <em className="hero-technology">technology</em><br />and <em className="hero-imagination">imagination</em>.</h1>
      <p className="hero-availability"><span aria-hidden="true">●</span> Open to Software Engineer / Software Developer<br className="hero-availability-break" /> roles and internships</p>
      <div className="hero-actions">
        <a href="#projects" className="scroll-button" onPointerEnter={() => setIsCtaActive(true)} onPointerLeave={() => setIsCtaActive(false)} onFocus={() => setIsCtaActive(true)} onBlur={() => setIsCtaActive(false)}>View my work <span aria-hidden="true">↓</span></a>
        <a className="cv-button" href={cv} download="Anastasiia-Borodina-Software-Engineer-CV.pdf" aria-label="Download Anastasiia Borodina's CV">Download CV <span aria-hidden="true">↓</span></a>
        <a className="contact-link" href="#contact">Contact <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <img className="portrait" src={portrait} alt="Anastasiia Borodina wearing a purple blazer" />
    <ProjectNavigation />
    <HeroGoldenThread phase={introPhase} isCtaActive={isCtaActive} />
  </section>
}
