import portrait from '../../assets/me.png'
import cv from '../../assets/Anastasiia-Borodina-Software-Engineer-CV.pdf'
import background from '../../backgrounds/background_8.png'
import './ContactFooter.css'

export function ContactFooter() {
  return <footer className="contact-footer" id="contact" data-journey-anchor="footer" style={{ '--footer-background': `url(${background})`, backgroundAttachment: 'fixed' } as React.CSSProperties}>
    <img className="footer-portrait" src={portrait} alt="Anastasiia Borodina" />
    <section className="footer-invitation" id="about">
      <p>Let&apos;s create something<br />amazing together <span aria-hidden="true"></span></p>
      <p className="footer-availability"><span aria-hidden="true">●</span> Open to Software Engineer / Software Developer roles and internships</p>
      <small>Made with <b aria-hidden="true">♥</b> and a lot of ☕</small>
    </section>
    <section className="footer-contact">
      <p>Have a role, project or collaboration in mind? I&apos;d love to hear from you</p>
      <div className="footer-actions">
        <a className="footer-button" href="mailto:una.stazia.bo@gmail.com">Email me <span aria-hidden="true">→</span></a>
        <a className="footer-cv-button" href={cv} download="Anastasiia-Borodina-Software-Engineer-CV.pdf" aria-label="Download Anastasiia Borodina's CV">Download CV <span aria-hidden="true">↓</span></a>
      </div>
    </section>
    <address className="footer-details">
      <a href="mailto:una.stazia.bo@gmail.com" aria-label="Email Anastasiia Borodina">✉&nbsp; una.stazia.bo@gmail.com</a>
      <span>⌖&nbsp; Žilina, Slovakia · Local|Remote</span>
      <nav className="footer-links" aria-label="Professional links">
        <a href="https://www.linkedin.com/in/anastasiia-borodina-411255398" target="_blank" rel="noopener noreferrer" aria-label="Anastasiia Borodina on LinkedIn">in</a>
        <a href="https://github.com/UnaStaziaBo" target="_blank" rel="noopener noreferrer" aria-label="Anastasiia Borodina on GitHub">GH</a>
        <a className="footer-portfolio-link" href="https://learn.unastazia.com" target="_blank" rel="noopener noreferrer">learn.unastazia.com <span aria-hidden="true">↗</span></a>
      </nav>
    </address>
  </footer>
}
