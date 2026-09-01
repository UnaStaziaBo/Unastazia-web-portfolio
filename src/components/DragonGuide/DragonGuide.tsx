import { useEffect, useRef, useState } from 'react'
import basicDragon from '../../assets/dragons/Dragon_basic.png'
import dragon01 from '../../assets/dragons/Dragon_1.png'
import dragon02 from '../../assets/dragons/Dragon_2.png'
import dragon03 from '../../assets/dragons/Dragon_3.png'
import dragon04 from '../../assets/dragons/Dragon_4.png'
import dragon05 from '../../assets/dragons/Dragon_5.png'
import dragon06 from '../../assets/dragons/Dragon_6.png'
import dragon07 from '../../assets/dragons/Dragon_7.png'
import './DragonGuide.css'

type ProjectDragon = {
  id: string
  selector: string
  asset: string
  desktop: StopProfile
  tablet: StopProfile
  mobile: StopProfile
}

type StopProfile = { x: number; y: number; width: number }
type MeasuredDragon = ProjectDragon & { left: number; top: number; width: number }
type HeroFlight = { left: number; top: number; midX: number; midY: number; endX: number; endY: number }

const dragonStops: ProjectDragon[] = [
  { id: 'ai-system', selector: '#ai-system', asset: dragon01, desktop: { x: .76, y: .89, width: 238 }, tablet: { x: .83, y: .89, width: 184 }, mobile: { x: .85, y: .9, width: 130 } },
  { id: 'volans-sort', selector: '#volans-sort', asset: dragon02, desktop: { x: .81, y: .89, width: 255 }, tablet: { x: .83, y: .9, width: 198 }, mobile: { x: .85, y: .91, width: 138 } },
  { id: 'tmtp', selector: '#tmtp', asset: dragon03, desktop: { x: .84, y: .92, width: 235 }, tablet: { x: .85, y: .91, width: 180 }, mobile: { x: .85, y: .92, width: 128 } },
  { id: 'aicognito', selector: '#aicognito', asset: dragon04, desktop: { x: .14, y: .9, width: 240 }, tablet: { x: .14, y: .9, width: 184 }, mobile: { x: .14, y: .91, width: 130 } },
  { id: 'mirror', selector: '#mirror', asset: dragon05, desktop: { x: .82, y: .92, width: 260 }, tablet: { x: .84, y: .91, width: 202 }, mobile: { x: .85, y: .92, width: 140 } },
  { id: 'neda', selector: '#neda', asset: dragon06, desktop: { x: .14, y: .9, width: 225 }, tablet: { x: .14, y: .9, width: 174 }, mobile: { x: .14, y: .91, width: 124 } },
  { id: 'steptolife', selector: '#steptolife', asset: dragon07, desktop: { x: .15, y: .9, width: 250 }, tablet: { x: .15, y: .9, width: 192 }, mobile: { x: .14, y: .91, width: 136 } },
]

function getProfile(stop: ProjectDragon, viewportWidth: number) {
  if (viewportWidth <= 800) return stop.mobile
  if (viewportWidth <= 1100) return stop.tablet
  return stop.desktop
}

function measureDragons(viewportWidth: number): MeasuredDragon[] {
  return dragonStops.flatMap((stop) => {
    const section = document.querySelector<HTMLElement>(stop.selector)
    if (!section) return []

    const rect = section.getBoundingClientRect()
    const profile = getProfile(stop, viewportWidth)
    return [{
      ...stop,
      left: rect.left + rect.width * profile.x,
      top: rect.top + window.scrollY + rect.height * profile.y,
      width: profile.width,
    }]
  })
}

export function DragonGuide() {
  const flightWasSkipped = typeof window !== 'undefined' && window.scrollY > 24
  const [height, setHeight] = useState(0)
  const [dragons, setDragons] = useState<MeasuredDragon[]>([])
  const [visibleDragons, setVisibleDragons] = useState<Set<string>>(() => new Set())
  const [heroFlight, setHeroFlight] = useState<HeroFlight | undefined>(undefined)
  const [isHeroFlightComplete, setIsHeroFlightComplete] = useState(flightWasSkipped)
  const observer = useRef<IntersectionObserver | undefined>(undefined)
  const heroFlightComplete = useRef(flightWasSkipped)

  useEffect(() => {
    const measure = () => {
      const viewportWidth = document.documentElement.clientWidth
      setDragons(measureDragons(viewportWidth))
      const footer = document.querySelector<HTMLElement>('[data-journey-anchor="footer"]')
      const brand = document.querySelector<HTMLElement>('.brand')
      const hero = document.querySelector<HTMLElement>('.hero')
      setHeight(footer ? footer.getBoundingClientRect().bottom + window.scrollY : document.documentElement.scrollHeight)

      if (!heroFlightComplete.current && brand && hero) {
        const brandRect = brand.getBoundingClientRect()
        const heroRect = hero.getBoundingClientRect()
        const left = brandRect.right + 48
        const top = brandRect.top + brandRect.height * .5
        setHeroFlight({
          left,
          top,
          midX: heroRect.left + heroRect.width * .75 - left,
          midY: heroRect.top + window.scrollY + heroRect.height * .23 - top,
          endX: heroRect.left + heroRect.width * .622 - left,
          endY: heroRect.top + window.scrollY + heroRect.height * .604 - top,
        })
      }
    }

    const watchSections = () => {
      observer.current?.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        setVisibleDragons((current) => {
          const next = new Set(current)
          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).id
            if (entry.isIntersecting) next.add(id)
            else next.delete(id)
          })
          return next
        })
      }, { rootMargin: '-18% 0px -18%', threshold: .08 })

      dragonStops.forEach((stop) => {
        const section = document.querySelector<HTMLElement>(stop.selector)
        if (section) observer.current?.observe(section)
      })
    }

    const main = document.querySelector('main')
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(measure) : undefined
    if (main && resizeObserver) resizeObserver.observe(main)

    measure()
    watchSections()
    const completeHeroFlightOnScroll = () => {
      if (window.scrollY > 24) {
        heroFlightComplete.current = true
        setIsHeroFlightComplete(true)
      }
    }
    window.addEventListener('resize', measure, { passive: true })
    window.addEventListener('orientationchange', measure)
    window.addEventListener('scroll', completeHeroFlightOnScroll, { passive: true })
    document.fonts?.ready.then(measure).catch(() => undefined)

    return () => {
      resizeObserver?.disconnect()
      observer.current?.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
      window.removeEventListener('scroll', completeHeroFlightOnScroll)
    }
  }, [])

  return <aside className="dragon-guide-layer" style={{ height: `${height}px` }} aria-hidden="true">
    {!isHeroFlightComplete && heroFlight && <img
      className="hero-dragon-flight"
      src={basicDragon}
      alt=""
      onAnimationEnd={() => {
        heroFlightComplete.current = true
        setIsHeroFlightComplete(true)
      }}
      style={{
        left: `${heroFlight.left}px`,
        top: `${heroFlight.top}px`,
        '--hero-mid-x': `${heroFlight.midX}px`,
        '--hero-mid-y': `${heroFlight.midY}px`,
        '--hero-end-x': `${heroFlight.endX}px`,
        '--hero-end-y': `${heroFlight.endY}px`,
      } as React.CSSProperties}
    />}
    {dragons.map((dragon) => <div
      key={dragon.id}
      className={`project-dragon project-dragon--${dragon.id}${visibleDragons.has(dragon.id) ? ' is-visible' : ''}`}
      style={{ left: `${dragon.left}px`, top: `${dragon.top}px`, width: `${dragon.width}px` }}
    >
      <span className="project-dragon__aura" />
      <span className="project-dragon__orbit" />
      <span className="project-dragon__spark project-dragon__spark--one">✦</span>
      <span className="project-dragon__spark project-dragon__spark--two">✦</span>
      <img className="project-dragon__image" src={dragon.asset} alt="" />
    </div>)}
  </aside>
}
