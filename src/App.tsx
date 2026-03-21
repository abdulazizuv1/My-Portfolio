import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'

const Leadership = lazy(() => import('./components/Leadership/Leadership'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Stats = lazy(() => import('./components/Stats/Stats'))
const Footer = lazy(() => import('./components/Footer/Footer'))

// ─── Page Loader ───────────────────────────────────────────────────────────────
function PageLoader({ onDone }: { onDone: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate() {
        if (countRef.current) countRef.current.textContent = Math.round(obj.val) + '%'
      },
      onComplete() {
        gsap.to(loaderRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.7,
          ease: 'power3.inOut',
          delay: 0.15,
          onComplete: onDone,
        })
      },
    })
  }, [])

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-bg)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        clipPath: 'inset(0 0 0% 0)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          color: 'var(--color-text)',
          letterSpacing: '0.05em',
        }}
      >
        A<span style={{ background: 'var(--color-accent)', color: 'var(--color-bg)', padding: '0 6px' }}>V</span>
      </div>
      <span
        ref={countRef}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--color-muted)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        0%
      </span>
    </div>
  )
}

// ─── Custom Cursor ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
      }
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 7}px, ${ringY - 7}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '48px'
        ringRef.current.style.height = '48px'
        ringRef.current.style.marginLeft = '-17px'
        ringRef.current.style.marginTop = '-17px'
        ringRef.current.style.mixBlendMode = 'exclusion'
        ringRef.current.style.background = 'var(--color-accent)'
        ringRef.current.style.border = 'none'
      }
    }

    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '14px'
        ringRef.current.style.height = '14px'
        ringRef.current.style.marginLeft = '0'
        ringRef.current.style.marginTop = '0'
        ringRef.current.style.mixBlendMode = 'normal'
        ringRef.current.style.background = 'transparent'
        ringRef.current.style.border = '1.5px solid var(--color-accent)'
      }
    }

    const bindLinks = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    bindLinks()

    const mo = new MutationObserver(bindLinks)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '14px',
          height: '14px',
          border: '1.5px solid var(--color-accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 100000,
          transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease, margin 0.25s ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--color-accent)',
          pointerEvents: 'none',
          zIndex: 100001,
          willChange: 'transform',
        }}
      />
    </>
  )
}

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${progress}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: '0%',
        background: 'var(--color-accent)',
        zIndex: 9999,
        pointerEvents: 'none',
        transformOrigin: 'left',
      }}
    />
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()

  return (
    <>
      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}
      <ScrollProgress />
      <CustomCursor />

      <main>
        <Nav />
        <Hero />
        <Suspense fallback={null}>
          <Leadership />
          <Projects />
          <Stats />
          <Footer />
        </Suspense>
      </main>
    </>
  )
}
