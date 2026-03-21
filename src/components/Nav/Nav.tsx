import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { getLenis } from '../../hooks/useLenis'
import './Nav.css'

const links = ['Work', 'Leadership', 'Stats', 'Contact']

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuOpenRef = useRef(false)
  const isClosingRef = useRef(false)

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 2.2 }
    )
    // Set initial menu position off-screen
    if (menuRef.current) gsap.set(menuRef.current, { x: '100%' })
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
        const strength = ((1 - dist / radius) * 8)
        gsap.to(btn, { x: (dx * strength) / dist, y: (dy * strength) / dist, duration: 0.3 })
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

  // Click-outside handler (re-registers when menu opens)
  useEffect(() => {
    if (!menuOpen) return

    const handle = (e: Event) => {
      const target = e.target as Node
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !(target as Element).closest('[data-hamburger]')
      ) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handle)
    document.addEventListener('touchstart', handle)
    return () => {
      document.removeEventListener('mousedown', handle)
      document.removeEventListener('touchstart', handle)
    }
  }, [menuOpen])

  // Escape key (persistent)
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [])

  const openMenu = () => {
    if (isClosingRef.current) return
    menuOpenRef.current = true
    setMenuOpen(true)
    document.body.style.overflow = 'hidden'
    gsap.to(menuRef.current, { x: '0%', duration: 0.4, ease: 'power3.out' })
  }

  const closeMenu = () => {
    if (!menuOpenRef.current || isClosingRef.current) return
    isClosingRef.current = true
    gsap.to(menuRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        menuOpenRef.current = false
        setMenuOpen(false)
        document.body.style.overflow = ''
        isClosingRef.current = false
      },
    })
  }

  const scrollTo = (id: string) => {
    closeMenu()
    const el = document.getElementById(id.toLowerCase())
    if (el) {
      const lenis = getLenis()
      lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' })
    }
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

        <div className="nav-right">
          <ThemeToggle />
          <a
            ref={ctaRef}
            href="mailto:abdulazizvaliev5075@gmail.com"
            className="nav-cta"
          >
            Hire Me
          </a>
        </div>

        <button
          data-hamburger
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div ref={menuRef} className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
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
