import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisInstance = lenis

    // Connect Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    // Scroll progress bar
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      const bar = document.getElementById('scroll-progress')
      if (bar) bar.style.width = `${progress * 100}%`
    })

    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
