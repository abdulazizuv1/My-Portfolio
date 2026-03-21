import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Nav.css'

const links = ['Work', 'Leadership', 'Stats', 'Contact']

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 2.2 }
    )
  }, [])

  // Scroll shrink
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Magnetic CTA
  useEffect(() => {
    const btn = ctaRef.current
    if (!btn) return

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const radius = 60

      if (dist < radius) {
        const strength = (1 - dist / radius) * 8
        gsap.to(btn, { x: dx * strength / dist, y: dy * strength / dist, duration: 0.3 })
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5 })
      }
    }

    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5 })

    window.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav ref={navRef} className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          A<span className="highlight">V</span>
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}>
              <button
                className="nav-link"
                onClick={() => scrollTo(l)}
                style={{ background: 'none', border: 'none', fontFamily: 'inherit' }}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <a
          ref={ctaRef}
          href="mailto:abdulazizvaliev5075@gmail.com"
          className="nav-cta"
        >
          Hire Me
        </a>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <button
            key={l}
            className="mobile-link"
            style={{ background: 'none', border: 'none' }}
            onClick={() => scrollTo(l)}
          >
            {l}
          </button>
        ))}
      </div>
    </>
  )
}
