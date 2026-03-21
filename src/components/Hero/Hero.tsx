import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

const socials = [
  { label: 'GH', href: 'https://github.com/abdulazizuv1', title: 'GitHub' },
  { label: 'IG', href: 'https://www.instagram.com/abz_uv', title: 'Instagram' },
  { label: 'TG', href: 'https://t.me/abz_uv', title: 'Telegram' },
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
      <div className="hero__bg">
        <div className="hero__bg-layer" />
      </div>

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
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              title={s.title}
            >
              {s.label}
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
