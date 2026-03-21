import { useEffect, useRef, useState, useCallback } from 'react'
import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard.vue'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'YES English Center',
    description:
      'Scalable educational platform for 100+ students. Full-stack with Firebase Auth, role-based dashboards, mock IELTS testing system, GPT-4 writing evaluation, and multi-layer caching. Handles ~7,800 Firestore reads weekly.',
    tech: ['React', 'Firebase', 'GPT-4', 'Node.js', 'IndexedDB', 'Service Worker'],
    liveUrl: 'https://yescenter.uz',
    accent: '#E8FF00',
    image: '/images/yes.png',
  },
  {
    title: 'Maqom FIMMI School',
    description:
      'Government school website built with responsive design, SEO optimisation, and performance tuning. Delivered as a paid government contract with full production deployment.',
    tech: ['HTML', 'CSS', 'JavaScript', 'SEO', 'Performance'],
    liveUrl: 'https://maqom-fimmi.uz',
    accent: '#FF3D3D',
    image: '/images/maqom.png',
  },
  {
    title: 'Quva BMSM-13',
    description:
      'Professional school website with modern responsive design and optimised performance, deployed for a government educational institution.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    liveUrl: 'https://quva-bmsm-13.uz',
    accent: '#00CFFF',
    image: '/images/bmsm.png',
  },
]

function VueCardMount({
  data,
  isActive,
}: {
  data: (typeof projects)[0]
  isActive: boolean
}) {
  const elRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<ReturnType<typeof createApp> | null>(null)

  useEffect(() => {
    if (!elRef.current) return
    if (appRef.current) appRef.current.unmount()
    const app = createApp(ProjectCard, { ...data, isActive })
    app.mount(elRef.current)
    appRef.current = app
    return () => {
      appRef.current?.unmount()
      appRef.current = null
    }
  }, [isActive])

  return <div ref={elRef} style={{ display: 'contents' }} />
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, idx))
    setActive(clamped)
    const track = trackRef.current
    if (!track) return
    const card = track.children[clamped] as HTMLElement
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 40, behavior: 'smooth' })
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(active + 1)
      if (e.key === 'ArrowLeft') goTo(active - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, goTo])

  // ScrollTrigger pin
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      })

      gsap.fromTo(
        '.projects__header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1] as unknown as string,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="projects">
      <div className="projects__header">
        <span className="projects__label">02 / Selected Work</span>
        <h2 className="projects__title">
          Built for <em>real</em> impact
        </h2>
      </div>

      <div className="projects__carousel">
        <div ref={trackRef} className="projects__track">
          {projects.map((p, i) => (
            <VueCardMount key={p.title} data={p} isActive={i === active} />
          ))}
        </div>

        <div className="projects__nav">
          <button
            className="projects__arrow"
            onClick={() => goTo(active - 1)}
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            className="projects__arrow"
            onClick={() => goTo(active + 1)}
            aria-label="Next project"
          >
            →
          </button>
          <div className="projects__dots" role="tablist" aria-label="Project slides">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`projects__dot ${i === active ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                aria-selected={i === active}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
