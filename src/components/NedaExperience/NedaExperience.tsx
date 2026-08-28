import { useState } from 'react'
import accessibilityImage from '../../assets/neda/accessibility.png'
import accountImage from '../../assets/neda/account.png'
import chatImage from '../../assets/neda/chat.png'
import companyImage from '../../assets/neda/company.png'
import './NedaExperience.css'

type NedaView = 'chat' | 'recommendation' | 'original'
type DemoStep = 'category' | 'budget' | 'priority'

const originalScreens = [
  { name: 'Chat', image: chatImage, description: 'AI-powered recommendations through conversation.', alt: 'NEDA chatbot recommending technology based on a user budget' },
  { name: 'Accessibility', image: accessibilityImage, description: 'Personalized accessibility settings for different users.', alt: 'NEDA accessibility settings with font size and page color controls' },
  { name: 'Account', image: accountImage, description: 'Personal and business account onboarding.', alt: 'NEDA personal and business account registration interface' },
  { name: 'Company', image: companyImage, description: 'Company verification and environmental impact tools.', alt: 'NEDA environmental impact company verification interface' },
] as const

const categoryOptions = ['Laptop', 'Smartphone', 'Development setup', "I'm not sure"] as const
const budgetOptions = ['Under €800', 'Under €1500', 'Premium'] as const
const priorityOptions = ['Development', 'Design', 'Everyday use'] as const

export function NedaExperience() {
  const [view, setView] = useState<NedaView>('chat')
  const [step, setStep] = useState<DemoStep>('category')
  const [choice, setChoice] = useState('')
  const [budget, setBudget] = useState('')
  const [priority, setPriority] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeScreen, setActiveScreen] = useState<(typeof originalScreens)[number]['name']>('Chat')

  const continueTo = (next: DemoStep | 'recommendation') => {
    setIsTyping(true)
    window.setTimeout(() => { setIsTyping(false); if (next === 'recommendation') { setView('recommendation') } else { setStep(next) } }, 650)
  }
  const selectCategory = (value: (typeof categoryOptions)[number]) => { setChoice(value); if (value === 'Laptop') { continueTo('budget') } else { continueTo('recommendation') } }
  const restart = () => { setView('chat'); setStep('category'); setChoice(''); setBudget(''); setPriority(''); setIsTyping(false) }
  const activeOriginal = originalScreens.find((screen) => screen.name === activeScreen) ?? originalScreens[0]

  return <section className="neda-experience" aria-label="NEDA interactive portfolio demo">
    <header className="neda-chrome"><span className="neda-dots" aria-hidden="true"><i /><i /><i /></span><strong>NEDA</strong><span className="neda-mode">{view === 'original' ? 'Original build' : 'Ask'}</span></header>
    {view === 'chat' && <div className="neda-chat"><div className="neda-chat-head"><strong>NEDA ✦</strong><span>{step === 'category' ? '● ○ ○' : step === 'budget' ? '● ● ○' : '● ● ●'}</span></div><div className="neda-messages"><p className="neda-message">Hi! Tell me what you&apos;re looking for and I&apos;ll help you choose the right tech.</p>{choice && <p className="neda-user">{choice === 'Laptop' ? "I'm looking for a laptop." : choice}</p>}{step !== 'category' && !isTyping && <p className="neda-message">{step === 'budget' ? "What's your budget?" : 'Got it. What matters most?'}</p>}{isTyping && <p className="neda-typing"><i /> <i /> <i /></p>}</div>{!isTyping && <div className="neda-quick-replies">{step === 'category' && categoryOptions.map((option) => <button type="button" key={option} onClick={() => selectCategory(option)}>{option}</button>)}{step === 'budget' && budgetOptions.map((option) => <button type="button" key={option} onClick={() => { setBudget(option); continueTo('priority') }}>{option}</button>)}{step === 'priority' && priorityOptions.map((option) => <button type="button" key={option} onClick={() => { setPriority(option); continueTo('recommendation') }}>{option}</button>)}</div>}<small>Interactive demo · scripted portfolio reconstruction</small></div>}
    {view === 'recommendation' && <div className="neda-recommendation"><div><span>✦ NEDA recommends</span><h3>{choice === 'Laptop' ? 'Developer laptop setup' : `${choice || 'Technology'} starter setup`}</h3><dl>{budget && <><dt>Budget</dt><dd>{budget}</dd></>}<dt>Priorities</dt><dd>{priority || 'Practicality'} · Performance · Portability</dd></dl><p>Look for:</p><ul><li>16GB+ RAM</li><li>Modern multi-core CPU</li><li>SSD storage</li><li>Good battery life</li></ul><button type="button" onClick={() => setView('original')}>See the original NEDA <b>→</b></button><button className="neda-restart" type="button" onClick={restart}>Ask again ↺</button></div></div>}
    {view === 'original' && <div className="neda-original"><div className="neda-original-tabs" role="group" aria-label="Original NEDA product areas">{originalScreens.map((screen) => <button type="button" key={screen.name} aria-pressed={activeScreen === screen.name} onClick={() => setActiveScreen(screen.name)}>{screen.name}</button>)}</div><p>{activeOriginal.description}</p><div className="neda-screen"><img key={activeOriginal.name} src={activeOriginal.image} alt={activeOriginal.alt} loading="lazy" /></div><div className="neda-original-footer"><span>From idea → prototype ✦</span><a href="https://devpost.com/software/itcats-01" target="_blank" rel="noopener noreferrer">View on Devpost ↗</a><button type="button" onClick={restart}>← Ask NEDA</button></div></div>}
  </section>
}
