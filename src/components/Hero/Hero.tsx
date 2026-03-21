import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CyberpunkCanvas from './CyberpunkCanvas'
import './Hero.css'

const socials = [
  {
    title: 'GitHub',
    href: 'https://github.com/abdulazizuv1',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/abz_uv',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    title: 'Telegram',
    href: 'https://t.me/abz_uv',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const roleRef = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const scrollCtaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.0 })

    // Split headline chars for name
    const nameEl = nameRef.current
    const roleEl = roleRef.current
    if (!nameEl || !roleEl) return

    const splitText = (el: HTMLElement) => {
      const text = el.textContent || ''
      el.innerHTML = text
        .split('')
        .map((c) => (c === ' ' ? '&nbsp;' : `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block;transform:translateY(110%)">${c}</span></span>`))
        .join('')
    }

    splitText(nameEl)
    splitText(roleEl)

    const nameChars = nameEl.querySelectorAll('span > span')
    const roleChars = roleEl.querySelectorAll('span > span')

    tl.to(nameChars, {
      y: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: [0.16, 1, 0.3, 1] as unknown as string,
    })
    .to(roleChars, {
      y: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: [0.16, 1, 0.3, 1] as unknown as string,
    }, '-=0.5')
    .to(subRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.3')
    .to(dividerRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power3.inOut',
    }, '-=0.5')
    .to(bottomRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .to(scrollCtaRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
  }, [])

  return (
    <section ref={sectionRef} id="home" className="hero">
      <CyberpunkCanvas />

      <div className="hero__content">
        <h1 className="hero__headline">
          <span className="hero__line">
            <span ref={nameRef} className="hero__name">Abdulaziz Valiyev</span>
          </span>
          <span className="hero__line" style={{ marginTop: '0.05em' }}>
            <span ref={roleRef} className="hero__role">Leader. Builder.</span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="hero__sub"
          style={{ transform: 'translateY(20px)' }}
        >
          Full-stack web developer and student building scalable products with modern
          JavaScript and Firebase. Passionate about solving real problems through
          technology while preparing for top global universities.
        </p>
      </div>

      <div ref={dividerRef} className="hero__divider" />

      <div ref={bottomRef} className="hero__bottom">
        <div className="hero__socials">
          {socials.map((s) => (
            <a
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              title={s.title}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="hero__circular spin-slow">
          <svg viewBox="0 0 100 100">
            <defs>
              <path
                id="circle-path"
                d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text className="hero__circular-text">
              <textPath href="#circle-path">
                Available for work · Open to collabs · &nbsp;Available for work · Open to collabs ·&nbsp;
              </textPath>
            </text>
          </svg>
          <div className="hero__center-dot" />
        </div>
      </div>

      <div ref={scrollCtaRef} className="hero__scroll-cta bounce-y">
        <span>Scroll</span>
        <div className="hero__scroll-arrow" />
      </div>
    </section>
  )
}
