import { useState } from 'react'
import debugImage from '../../assets/aicognito/plugin-debug.png'
import explainImage from '../../assets/aicognito/plugin-explain.png'
import modifyImage from '../../assets/aicognito/plugin-modify.png'
import newImage from '../../assets/aicognito/plugin-new.png'
import voiceImage from '../../assets/aicognito/plugin-voice.png'
import './AiCognitoPreview.css'

const capabilities = [
  { name: 'New', image: newImage, description: 'Get the next steps for improving the selected code.', alt: 'AiCognito New mode suggesting improvements for a Java method' },
  { name: 'Modify', image: modifyImage, description: 'See the impact, risks and suggested improvements.', alt: 'AiCognito Modify mode showing Java code impact and a suggested fix' },
  { name: 'Debug', image: debugImage, description: 'Find the problem and generate a focused fix.', alt: 'AiCognito Debug mode showing analysis and a suggested Java fix' },
  { name: 'Explain', image: explainImage, description: 'Understand what the code does and why it fails.', alt: 'AiCognito Explain mode explaining the selected Java method' },
  { name: 'Voice', image: voiceImage, description: 'Ask AiCognito about your code using voice.', alt: 'AiCognito Voice mode explaining a Java method and its fix' },
] as const

export function AiCognitoPreview() {
  const [activeName, setActiveName] = useState<(typeof capabilities)[number]['name']>('New')
  const active = capabilities.find((capability) => capability.name === activeName) ?? capabilities[0]

  return <section className="aicognito-preview" aria-label="AiCognito feature walkthrough"><header><strong>AiCognito</strong><span>Live demo</span></header><div className="aicognito-actions" role="group" aria-label="AiCognito capabilities">{capabilities.map((capability) => <button type="button" key={capability.name} aria-pressed={activeName === capability.name} onClick={() => setActiveName(capability.name)}>{capability.name}</button>)}</div><p className="aicognito-description">{active.description}</p><div className="aicognito-screen"><img key={active.name} src={active.image} alt={active.alt} loading={activeName === 'New' ? 'eager' : 'lazy'} /></div></section>
}
