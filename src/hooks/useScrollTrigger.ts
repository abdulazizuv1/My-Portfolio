import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  options: {
    y?: number
    x?: number
    opacity?: number
    stagger?: number
    duration?: number
    selector?: string
    once?: boolean
  } = {}
) {
  const {
    y = 60,
    x = 0,
    opacity = 0,
    stagger = 0.07,
    duration = 0.9,
    selector = '.reveal',
    once = true,
  } = options

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = containerRef.current?.querySelectorAll(selector)
      if (!els || els.length === 0) return

      gsap.fromTo(
        els,
        { y, x, opacity, force3D: true },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          stagger,
          ease: [0.16, 1, 0.3, 1] as unknown as string,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])
}
