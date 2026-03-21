import { useState, useEffect, useRef } from 'react'
import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LeadershipCard from './LeadershipCard.vue'
import LeadershipModal from './LeadershipModal'
import './Leadership.css'

gsap.registerPlugin(ScrollTrigger)

const roles = [
  {
    index: 1,
    cardId: 'yosh-turizm',
    role: 'Manager for Initiatives',
    org: 'Yosh Turizm Elchilari',
    dates: '2025 — Present',
    description:
      'Led cultural content initiatives, coordinating teams and programs to promote youth tourism and cultural exchange across Uzbekistan with Yosh Turizm Elchilari team.',
    skills: ['Leadership', 'Cultural Content', 'Team Management', 'Programs'],
  },
  {
    index: 2,
    cardId: 'mun',
    role: 'SIFMUN Organiser & MUN Participant',
    org: 'Model United Nations',
    dates: '2024 — Present',
    description:
      'Organised the SIFMUN conference and participated as a delegate at TIIAME MUN, developing skills in diplomacy, public speaking, and international policy debate.',
    skills: ['Public Speaking', 'Diplomacy', 'Event Organisation', 'Research'],
  },
  {
    index: 3,
    cardId: 'startup-club',
    role: 'Chief Technology Officer',
    org: 'Start-Up Club',
    dates: '2026 — Present',
    description:
      'Leading the technical vision of the startup club, mentoring members on full-stack development, and overseeing product architecture and delivery.',
    skills: ['Full-Stack', 'Mentoring', 'Architecture', 'Product', 'Leadership'],
  },
]

const marqueeItems = [
  'Leadership', 'Initiative', 'Technology', 'Diplomacy',
  'Cultural Content', 'Public Speaking', 'Innovation', 'Strategy',
]

function VueCardMount({
  data,
  onCardClick,
}: {
  data: typeof roles[0]
  onCardClick: (id: string) => void
}) {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elRef.current) return
    const app = createApp(LeadershipCard, {
      ...data,
      onCardClick: (id: string) => onCardClick(id),
    })
    app.mount(elRef.current)
    return () => app.unmount()
  }, [])

  return <div ref={elRef} onClick={() => onCardClick(data.cardId)} style={{ cursor: 'pointer' }} />
}

export default function Leadership() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: [0.16, 1, 0.3, 1] as unknown as string,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      gsap.fromTo(
        '.leadership__title',
        { y: 60, opacity: 0 },
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
    <>
      <section ref={sectionRef} id="leadership" className="leadership">
        <div className="leadership__header">
          <h2 className="leadership__title">Leadership</h2>
          <span className="leadership__counter">01</span>
        </div>

        <div className="leadership__marquee-wrap">
          <div className="leadership__marquee">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="leadership__marquee-item">{item}</span>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="leadership__grid">
          {roles.map((role) => (
            <VueCardMount key={role.index} data={role} onCardClick={setActiveId} />
          ))}
        </div>
      </section>

      <LeadershipModal activeId={activeId} onClose={() => setActiveId(null)} />
    </>
  )
}
