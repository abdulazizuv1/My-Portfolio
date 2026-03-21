import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '../../hooks/useLenis'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

const navLinks = ['Work', 'Leadership', 'Stats', 'Contact']
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/abdulazizuv1', Icon: GithubIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/abz_uv', Icon: InstagramIcon },
  { label: 'Telegram', href: 'https://t.me/abz_uv', Icon: TelegramIcon },
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
                  className="footer__col-link footer__col-link--social"
                >
                  <s.Icon />
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
