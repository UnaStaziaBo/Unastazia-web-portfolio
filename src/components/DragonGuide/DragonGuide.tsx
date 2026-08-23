import dragonGuide from '../../assets/dragon.png'
import './DragonGuide.css'

export function DragonGuide() { return <aside className="dragon-guide" aria-label="Your dragon guide"><p>I&apos;ll guide<br />you!</p><img src={dragonGuide} alt="A friendly dragon guide" /></aside> }
