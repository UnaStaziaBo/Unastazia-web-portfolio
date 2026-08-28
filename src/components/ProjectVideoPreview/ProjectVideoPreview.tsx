import { useState } from 'react'
import './ProjectVideoPreview.css'

type ProjectVideoPreviewProps = { youtubeId: string; title: string; label?: string }

export function ProjectVideoPreview({ youtubeId, title, label = 'Product demo' }: ProjectVideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`

  return <div className={`project-video-preview ${isPlaying ? 'is-playing' : ''}`}>
    <div className="video-browser-chrome"><span className="video-browser-dots" aria-hidden="true"><i /><i /><i /></span><span>{title} demo</span></div>
    {isPlaying ? <iframe src={embedUrl} title={`${title} product demo`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <div className="video-poster"><img src={thumbnail} alt="TMTP product demo preview" /><div className="video-shade" /><span className="video-label">{title}<small>{label}</small></span><div className="video-play"><button type="button" aria-label={`Play ${title} product demo`} onClick={() => setIsPlaying(true)}>▶</button><strong>Watch {title} in action</strong><small>See how developers solve, learn and level up.</small></div></div>}
  </div>
}
