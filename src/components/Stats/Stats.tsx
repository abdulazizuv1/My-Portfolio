import { useEffect, useRef } from 'react'
import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StatCounter from './StatCounter.vue'
import './Stats.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { target: 3,    suffix: '+',  label: 'Full Websites Built' },
  { target: 2,    suffix: '+',  label: 'Years Coding' },
  { target: 7800, suffix: '+',  label: 'Firestore Reads / Week' },
  { target: 100,  suffix: '+',  label: 'Students Served' },
  { target: 7.0,  suffix: '',   label: 'IELTS Score', decimals: 1 },
  { target: 5.0,  suffix: '/5', label: 'GPA (9–10th Grade)', decimals: 1 },
]

function VueStatMount({ data }: { data: typeof stats[0] }) {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elRef.current) return
    const app = createApp(StatCounter, data)
    app.mount(elRef.current)
    return () => app.unmount()
  }, [])

  return <div ref={elRef} />
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax bg grid
      gsap.to('.stats__bg-grid', {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Header words reveal
      gsap.fromTo(
        '.stats__word',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: [0.16, 1, 0.3, 1] as unknown as string,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )

      // Grid items reveal
      const cards = gridRef.current?.children
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: [0.16, 1, 0.3, 1] as unknown as string,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="stats" className="stats">
      <div className="stats__bg-grid" />
      <div className="stats__inner">
        <div className="stats__header">
          <span className="stats__word">By the</span>
          <span className="stats__word">Numbers</span>
        </div>
        <div ref={gridRef} className="stats__grid">
          {stats.map((s) => (
            <VueStatMount key={s.label} data={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
