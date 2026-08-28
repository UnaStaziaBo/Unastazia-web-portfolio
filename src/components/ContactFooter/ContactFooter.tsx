import portrait from '../../assets/me.png'
import dragon from '../../assets/dragon.png'
import background from '../../backgrounds/background_8.png'
import './ContactFooter.css'

export function ContactFooter() {
  return <footer className="contact-footer" id="contact" style={{ '--footer-background': `url(${background})`, backgroundAttachment: 'fixed' } as React.CSSProperties}>
    <img className="footer-portrait" src={portrait} alt="Anastasiia Borodina" />
    <section className="footer-invitation" id="about"><p>Let&apos;s create something<br />amazing together <span>♥</span></p><small>Made with <b>♥</b> and a lot of coffee ☕</small></section>
    <section className="footer-contact" id="skills"><p>Have a project in mind or just<br />want to say hi? Write me!</p><a className="footer-button" href="mailto:hello@example.com">Say hello&nbsp; →</a></section>
    <address><a href="mailto:anastasiia@example.com">✉&nbsp; anastasiia@example.com</a><span>⌖&nbsp; Slovakia / Remote</span><div><a href="https://www.linkedin.com" aria-label="LinkedIn">in</a><a href="https://www.behance.net" aria-label="Behance">Bē</a><a href="https://github.com" aria-label="GitHub">●</a></div></address>
    <img className="footer-dragon" src={dragon} alt="Friendly dragon guide waving goodbye" />
  </footer>
}
