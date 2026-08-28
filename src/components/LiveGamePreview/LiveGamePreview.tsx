import { useState } from 'react'
import './LiveGamePreview.css'

type LiveGamePreviewProps = { playerUrl: string; externalUrl: string; title: string }

export function LiveGamePreview({ playerUrl, externalUrl, title }: LiveGamePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  return <div className={`live-game-preview ${isPlaying ? 'is-playing' : ''}`}>
    <div className="game-browser-chrome"><span className="game-browser-dots" aria-hidden="true"><i /><i /><i /></span><a href={externalUrl} target="_blank" rel="noopener noreferrer">Open on itch.io ↗</a>{isPlaying && <button type="button" onClick={() => setIsPlaying(false)}>Exit game ×</button>}</div>
    <iframe className="game-frame" src={playerUrl} title={`${title} playable game`} loading="lazy" allow="autoplay; fullscreen; gamepad" allowFullScreen tabIndex={isPlaying ? 0 : -1} onLoad={() => setHasLoaded(true)} />
    {!isPlaying && <div className="game-preview-overlay"><div><p>{title}</p><span>A fantasy puzzle game</span><button type="button" onClick={() => setIsPlaying(true)}>Play the game <b>→</b></button><small>Playable directly in the portfolio</small></div></div>}
    {isPlaying && !hasLoaded && <div className="game-loading" aria-live="polite"><strong>Loading Volans Sort...</strong><span>Preparing the dragons ✦</span></div>}
    {isPlaying && hasLoaded && <span className="game-status">Game active</span>}
  </div>
}
