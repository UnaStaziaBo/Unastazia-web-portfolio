import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import dragon from '../../assets/dragon.png'
import './GoldenJourney.css'

type Point = { x: number; y: number }

type JourneyAnchor = {
  id: string
  color: string
  point: Point
  dragonStop?: Point
  dragonFacing?: 'left' | 'right'
}

type Route = {
  d: string
  height: number
  anchors: JourneyAnchor[]
}

type AnchorDefinition = {
  id: string
  color: string
  target?: string
  avoidArtifact?: string
  side?: 'left' | 'right' | 'center'
  yFactor?: number
  dragon?: { x: number; y: number; facing: 'left' | 'right' }
}

const anchorDefinitions: AnchorDefinition[] = [
  { id: 'hero', color: '#f6d473' },
  { id: 'ai-system', color: '#d4cf80', target: '.knowledge-portal', side: 'right', yFactor: .52 },
  { id: 'volans-sort', color: '#e4bc70', target: '.dragon-trial', side: 'right', yFactor: .62, dragon: { x: -.13, y: .79, facing: 'right' } },
  { id: 'tmtp', color: '#bdb0df', target: '.living-codex', avoidArtifact: '.living-codex', side: 'center', yFactor: .42 },
  { id: 'aicognito', color: '#c2a8d9', target: '.aicognito-workbench', side: 'right', yFactor: .56, dragon: { x: -.16, y: .74, facing: 'right' } },
  { id: 'mirror', color: '#ddb1c4', target: '.mirror-experience', avoidArtifact: '.mirror-experience', side: 'center', yFactor: .5, dragon: { x: 1.04, y: .64, facing: 'left' } },
  { id: 'neda', color: '#eab6b4', target: '.neda-artifact', side: 'right', yFactor: .47, dragon: { x: -.16, y: .73, facing: 'right' } },
  { id: 'steptolife', color: '#f6d473', avoidArtifact: '.steptolife-experience', side: 'center' },
  { id: 'footer', color: '#f6d473', target: '.footer-button', side: 'center', yFactor: .5 },
]

const desktopPadding = 26
const mobileBreakpoint = 800

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function createSmoothPath(points: Point[], viewportWidth: number) {
  if (!points.length) return ''
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  let path = `M ${points[0].x} ${points[0].y}`

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index]
    const start = points[index]
    const end = points[index + 1]
    const next = points[index + 2] ?? end
    const controlOne = { x: clamp(start.x + (end.x - previous.x) / 6, 8, viewportWidth - 8), y: start.y + (end.y - previous.y) / 6 }
    const controlTwo = { x: clamp(end.x - (next.x - start.x) / 6, 8, viewportWidth - 8), y: end.y - (next.y - start.y) / 6 }

    path += ` C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, ${end.x} ${end.y}`
  }

  return path
}

function getStepToLifeTarget() {
  return document.querySelector<HTMLElement>('.stl-route-waypoints button[aria-current="step"], .stl-route-waypoints button, .stl-choice-grid button')
}

function getAnchorElement(id: string, target?: string) {
  if (id === 'steptolife') return getStepToLifeTarget() ?? document.querySelector<HTMLElement>('#steptolife')
  if (id === 'hero') return document.querySelector<HTMLElement>('[data-journey-anchor="hero"]')
  if (id === 'footer') return document.querySelector<HTMLElement>(target ?? '[data-journey-anchor="footer"]')
  return document.querySelector<HTMLElement>(target ?? `#${id}`)
}

function getDocumentPoint(element: HTMLElement, definition: AnchorDefinition, viewportWidth: number, isMobile: boolean): Point {
  const rect = element.getBoundingClientRect()
  const top = rect.top + window.scrollY

  if (definition.id === 'hero') {
    return { x: viewportWidth * .812, y: top + rect.height * .955 }
  }

  if (isMobile) {
    return { x: 16, y: top + rect.height * .46 }
  }

  const y = top + rect.height * (definition.yFactor ?? .5)
  const side = definition.side ?? 'center'
  const x = side === 'left'
    ? rect.left - 12
    : side === 'right'
      ? rect.right + 12
      : rect.left + rect.width * .5

  return { x: clamp(x, desktopPadding, viewportWidth - desktopPadding), y }
}

function getDragonStop(element: HTMLElement, definition: AnchorDefinition, viewportWidth: number, isMobile: boolean): Point | undefined {
  if (!definition.dragon || isMobile) return undefined

  const rect = element.getBoundingClientRect()
  const x = rect.left + rect.width * definition.dragon.x
  const y = rect.top + window.scrollY + rect.height * definition.dragon.y

  return { x: clamp(x, 36, viewportWidth - 132), y }
}

function getGradientStops(anchors: JourneyAnchor[], height: number) {
  const stops: Array<{ offset: number; color: string }> = [{ offset: 0, color: '#f6d473' }]

  anchors.slice(1, -1).forEach((anchor) => {
    const range = 54 / height
    const position = anchor.point.y / height
    stops.push({ offset: clamp(position - range, 0, 1), color: '#f6d473' })
    stops.push({ offset: clamp(position, 0, 1), color: anchor.color })
    stops.push({ offset: clamp(position + range, 0, 1), color: '#f6d473' })
  })

  stops.push({ offset: 1, color: '#f6d473' })
  return stops.sort((first, second) => first.offset - second.offset)
}

function getArtifactDetour(selector: string | undefined, viewportWidth: number, isMobile: boolean): Point[] | undefined {
  if (!selector || isMobile) return undefined

  const artifact = document.querySelector<HTMLElement>(selector)
  if (!artifact) return undefined

  const rect = artifact.getBoundingClientRect()
  const clearance = 38
  const x = clamp(rect.right + clearance, desktopPadding, viewportWidth - desktopPadding)
  const top = rect.top + window.scrollY - clearance
  const bottom = rect.bottom + window.scrollY + clearance

  return [{ x, y: top }, { x, y: bottom }]
}

export function GoldenJourney() {
  const [route, setRoute] = useState<Route>({ d: '', height: 0, anchors: [] })
  const [activeStop, setActiveStop] = useState<JourneyAnchor | undefined>(undefined)
  const pathRef = useRef<SVGPathElement>(null)
  const progressPathRef = useRef<SVGPathElement>(null)
  const lightRef = useRef<SVGGElement>(null)
  const destinationRef = useRef<SVGTextElement>(null)
  const routeRef = useRef(route)
  const pathLengthRef = useRef(0)
  const activeAnchorRef = useRef('hero')
  const progressRef = useRef(0)
  const resizeFrame = useRef<number | undefined>(undefined)
  const scrollFrame = useRef<number | undefined>(undefined)

  useEffect(() => {
    routeRef.current = route
  }, [route])

  const drawProgress = (progress: number) => {
    const path = pathRef.current
    const progressPath = progressPathRef.current
    const length = pathLengthRef.current
    if (!path || !progressPath || !length) return

    progressPath.style.strokeDasharray = `${length}`
    progressPath.style.strokeDashoffset = `${length * (1 - progress)}`

    const point = path.getPointAtLength(Math.max(0.5, length * progress))
    lightRef.current?.setAttribute('transform', `translate(${point.x} ${point.y})`)
    lightRef.current?.setAttribute('opacity', progress > 0 ? '1' : '.74')
    destinationRef.current?.setAttribute('opacity', progress > .985 ? '1' : '.44')
  }

  const updateScrollState = () => {
    const currentRoute = routeRef.current
    if (currentRoute.anchors.length < 2) return

    const lead = window.scrollY + window.innerHeight * .53
    const first = currentRoute.anchors[0].point.y
    const final = currentRoute.anchors[currentRoute.anchors.length - 1].point.y
    const progress = clamp((lead - first) / Math.max(1, final - first), 0, 1)
    progressRef.current = progress
    drawProgress(progress)

    const currentAnchor = currentRoute.anchors.reduce((last, anchor) => anchor.point.y <= lead ? anchor : last, currentRoute.anchors[0])
    if (currentAnchor.id === activeAnchorRef.current) return

    activeAnchorRef.current = currentAnchor.id
    setActiveStop(currentAnchor.dragonStop ? currentAnchor : undefined)
  }

  const measureRoute = () => {
    const viewportWidth = document.documentElement.clientWidth
    const footer = document.querySelector<HTMLElement>('[data-journey-anchor="footer"]')
    const pageHeight = footer
      ? footer.getBoundingClientRect().bottom + window.scrollY
      : Math.max(document.documentElement.clientHeight, window.innerHeight)
    const isMobile = viewportWidth <= mobileBreakpoint
    const anchors = anchorDefinitions.flatMap((definition) => {
      const element = getAnchorElement(definition.id, definition.target)
      if (!element) return []

      const point = getDocumentPoint(element, definition, viewportWidth, isMobile)
      const dragonStop = getDragonStop(element, definition, viewportWidth, isMobile)
      return [{ id: definition.id, color: definition.color, point, dragonStop, dragonFacing: definition.dragon?.facing }]
    })

    if (anchors.length < 2) return

    const orderedAnchors = anchors.sort((first, second) => first.point.y - second.point.y)
    const pathPoints = orderedAnchors.flatMap((anchor) => {
      const definition = anchorDefinitions.find((item) => item.id === anchor.id)
      return getArtifactDetour(definition?.avoidArtifact, viewportWidth, isMobile) ?? [anchor.point]
    })

    setRoute({ d: createSmoothPath(pathPoints, viewportWidth), height: pageHeight, anchors: orderedAnchors })
  }

  useLayoutEffect(() => {
    if (!route.d || !pathRef.current) return

    pathLengthRef.current = pathRef.current.getTotalLength()
    drawProgress(progressRef.current)
  }, [route.d])

  useEffect(() => {
    const scheduleMeasure = () => {
      if (resizeFrame.current) window.cancelAnimationFrame(resizeFrame.current)
      resizeFrame.current = window.requestAnimationFrame(measureRoute)
    }

    const scheduleScroll = () => {
      if (scrollFrame.current) return
      scrollFrame.current = window.requestAnimationFrame(() => {
        scrollFrame.current = undefined
        updateScrollState()
      })
    }

    const main = document.querySelector('main')
    const observed = anchorDefinitions.flatMap((definition) => [
      getAnchorElement(definition.id, definition.target),
      definition.avoidArtifact ? document.querySelector<HTMLElement>(definition.avoidArtifact) : undefined,
    ]).filter((element): element is HTMLElement => Boolean(element))
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(scheduleMeasure) : undefined
    const stepToLife = document.querySelector('#steptolife')
    const stepToLifeObserver = stepToLife && 'MutationObserver' in window ? new MutationObserver(scheduleMeasure) : undefined
    if (main && resizeObserver) resizeObserver.observe(main)
    observed.forEach((element) => resizeObserver?.observe(element))
    if (stepToLifeObserver && stepToLife) stepToLifeObserver.observe(stepToLife, { childList: true, subtree: true })

    scheduleMeasure()
    window.addEventListener('resize', scheduleMeasure, { passive: true })
    window.addEventListener('orientationchange', scheduleMeasure)
    window.addEventListener('scroll', scheduleScroll, { passive: true })
    document.fonts?.ready.then(scheduleMeasure).catch(() => undefined)

    return () => {
      if (resizeFrame.current) window.cancelAnimationFrame(resizeFrame.current)
      if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current)
      resizeObserver?.disconnect()
      stepToLifeObserver?.disconnect()
      window.removeEventListener('resize', scheduleMeasure)
      window.removeEventListener('orientationchange', scheduleMeasure)
      window.removeEventListener('scroll', scheduleScroll)
    }
  }, [])

  useEffect(() => {
    updateScrollState()
  }, [route])

  if (!route.d) return null

  const finalAnchor = route.anchors[route.anchors.length - 1]
  const gradientStops = getGradientStops(route.anchors, route.height)
  const dragonStyle = activeStop?.dragonStop ? {
    left: `${activeStop.dragonStop.x}px`,
    top: `${activeStop.dragonStop.y}px`,
  } : undefined

  return <aside className="golden-journey" style={{ height: `${route.height}px` }} aria-hidden="true">
    <svg className="golden-journey__svg" viewBox={`0 0 ${document.documentElement.clientWidth} ${route.height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="golden-journey-gradient" x1="0" y1="0" x2="0" y2={route.height} gradientUnits="userSpaceOnUse">
          {gradientStops.map((stop, index) => <stop key={`${stop.offset}-${index}`} offset={`${stop.offset * 100}%`} stopColor={stop.color} />)}
        </linearGradient>
        <filter id="golden-journey-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.4" /></filter>
        <filter id="golden-journey-light-glow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <path className="golden-journey__path golden-journey__path--base" d={route.d} pathLength="1" />
      <path className="golden-journey__path golden-journey__path--glow" d={route.d} filter="url(#golden-journey-glow)" />
      <path ref={progressPathRef} className="golden-journey__path golden-journey__path--progress" d={route.d} />
      <g ref={lightRef} className="golden-journey__light">
        <circle className="golden-journey__light-glow" r="8" filter="url(#golden-journey-light-glow)" />
        <circle className="golden-journey__light-core" r="3.4" />
      </g>
      <text ref={destinationRef} className="golden-journey__destination" x={finalAnchor.point.x} y={finalAnchor.point.y + 5} textAnchor="middle">✦</text>
      <path ref={pathRef} className="golden-journey__path-measure" d={route.d} />
    </svg>
    {activeStop?.dragonStop && <img key={activeStop.id} className={`golden-journey__dragon ${activeStop.dragonFacing === 'left' ? 'is-facing-left' : ''}`} src={dragon} alt="" style={dragonStyle} />}
  </aside>
}
