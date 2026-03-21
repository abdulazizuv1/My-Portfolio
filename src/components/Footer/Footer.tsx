import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '../../hooks/useLenis'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

const navLinks = ['Work', 'Leadership', 'Stats', 'Contact']
const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/abdulazizuv1' },
  { label: 'Instagram', href: 'https://www.instagram.com/abz_uv' },
  { label: 'Telegram', href: 'https://t.me/abz_uv' },
]

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) {
      const lenis = getLenis()
      lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    const lenis = getLenis()
    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee scroll drive
      gsap.to(marqueeRef.current, {
        x: '-25%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Email entrance
      gsap.fromTo(
        emailRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1] as unknown as string,
          scrollTrigger: {
            trigger: emailRef.current,
            start: 'top 90%',
          },
        }
      )

      // Columns stagger
      gsap.fromTo(
        '.footer__col',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: [0.16, 1, 0.3, 1] as unknown as string,
          scrollTrigger: {
            trigger: '.footer__cols',
            start: 'top 90%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={sectionRef} id="contact" className="footer">
      {/* Big scrolling headline */}
      <div className="footer__marquee-wrap">
        <div ref={marqueeRef} className="footer__marquee-inner">
          {[0, 1].map((i) => (
            <span key={i} className="footer__big-text">
              <span className="solid">LET'S&nbsp;</span>
              <span className="outline">BUILD&nbsp;</span>
              <span className="solid">LET'S&nbsp;</span>
              <span className="outline">BUILD&nbsp;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Email */}
      <div className="footer__email-wrap">
        <a
          ref={emailRef}
          href="mailto:abdulazizvaliev5075@gmail.com"
          className="footer__email"
        >
          <span>abdulazizvaliev5075@gmail.com</span>
        </a>
      </div>

      {/* Columns */}
      <div className="footer__cols">
        <div className="footer__col">
          <p className="footer__col-title">Navigation</p>
          <ul className="footer__col-list">
            {navLinks.map((l) => (
              <li key={l}>
                <button className="footer__col-link" onClick={() => scrollTo(l)}>
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <p className="footer__col-title">Social</p>
          <ul className="footer__col-list">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__col-link"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col footer__colophon">
          <p className="footer__col-title">Colophon</p>
          <p>
            Built with React, Vue&nbsp;3, GSAP &amp; Tailwind CSS v4.<br />
            Fonts: Bebas Neue · DM Sans · Playfair Display.<br />
            © {new Date().getFullYear()} Abdulaziz Valiyev
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bar">
        <span className="footer__copy">© {new Date().getFullYear()} Abdulaziz Valiyev</span>
        <button className="footer__top-btn" onClick={scrollToTop}>
          ↑ Back to top
        </button>
      </div>
    </footer>
  )
}
