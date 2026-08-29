import { useEffect, useState } from 'react'
import './LiveGamePreview.css'

type LiveGamePreviewProps = {
  playerUrl: string
  externalUrl: string
  title: string
  variant?: 'default' | 'dragon-trial'
  onPlayStateChange?: (isPlaying: boolean) => void
}

export function LiveGamePreview({ playerUrl, externalUrl, title, variant = 'default', onPlayStateChange }: LiveGamePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const isDragonTrial = variant === 'dragon-trial'

  useEffect(() => {
    onPlayStateChange?.(isPlaying)
  }, [isPlaying, onPlayStateChange])

  return <div className={`live-game-preview live-game-preview--${variant} ${isPlaying ? 'is-playing' : ''}`}>
    <div className="game-browser-chrome"><span className="game-browser-dots" aria-hidden="true"><i /><i /><i /></span><a href={externalUrl} target="_blank" rel="noopener noreferrer">Open on itch.io ↗</a>{isPlaying && <button type="button" onClick={() => setIsPlaying(false)}>{isDragonTrial ? 'Leave trial ×' : 'Exit game ×'}</button>}</div>
    <iframe className="game-frame" src={playerUrl} title={`${title} playable game`} loading="lazy" allow="autoplay; fullscreen; gamepad" allowFullScreen tabIndex={isPlaying ? 0 : -1} onLoad={() => setHasLoaded(true)} />
    {(isDragonTrial || !isPlaying) && <div className="game-preview-overlay" aria-hidden={isPlaying} inert={isPlaying}><div>{isDragonTrial && <small className="game-preview-kicker">Game II</small>}<p>{isDragonTrial ? "The Dragon's Trial" : title}</p><span>{isDragonTrial ? 'Strategy. Magic. Dragons. Think before you move.' : 'A fantasy puzzle game'}</span><button type="button" onClick={() => setIsPlaying(true)}>{isDragonTrial ? 'Begin the trial' : 'Play the game'} <b>→</b></button><small className="game-preview-hint">Playable directly in the portfolio</small></div></div>}
    {isPlaying && !hasLoaded && <div className="game-loading" aria-live="polite"><strong>Loading Volans Sort...</strong><span>Preparing the dragons ✦</span></div>}
    {isPlaying && hasLoaded && !isDragonTrial && <span className="game-status">Game active</span>}
  </div>
}
