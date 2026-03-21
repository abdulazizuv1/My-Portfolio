import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

export default function CyberpunkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let animId: number
    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const isLight = () => document.documentElement.classList.contains('theme-light')

    // ── Layer 1: Scanlines ──
    let scanY = 0

    // ── Layer 2: Grid ──
    let gridOffset = 0

    // ── Layer 3: Glitch ──
    interface GlitchRect { y: number; height: number; opacity: number; until: number }
    let glitchRects: GlitchRect[] = []
    let nextGlitch = Date.now() + 2000 + Math.random() * 3000
    let globalGlitchDx = 0
    let globalGlitchUntil = 0
    let nextGlobalGlitch = Date.now() + 8000 + Math.random() * 2000

    // ── Layer 4: Particles ──
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }))

    let mouseX = -9999
    let mouseY = -9999

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', onMouseMove)

    // ── Layer 5: HUD ──
    const hudLines = [
      'SYS::ONLINE', 'NET_LAT: 12ms', 'ID: 0x4F2A', 'PKT: 2048',
      'AUTH: VALID', 'UPTIME: 99.9%', 'MEM: 72%',
    ]
    let hudLine1 = hudLines[0]
    let hudLine2 = hudLines[1]
    let lastHudUpdate = Date.now()
    let sigBars = [3, 5, 4, 3, 5]
    let nextSigUpdate = Date.now() + 800

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      const light = isLight()
      // Dark mode: neon lime. Light mode: near-black for contrast on white
      const pColor = light ? '13, 13, 13' : '232, 255, 0'
      const now = Date.now()

      // ── Layer 1: Scanlines (dark mode only) ──
      if (!light) {
        scanY = (scanY + 0.5) % 3
        for (let y = scanY; y < h; y += 3) {
          ctx.fillStyle = `rgba(232, 255, 0, 0.03)`
          ctx.fillRect(0, y, w, 1)
        }
      }

      // ── Layer 2: Neon Grid ──
      gridOffset = (gridOffset + 0.004) % 1
      // Light mode: visible dark grid; dark mode: subtle lime grid
      const gridOpacity = light ? 0.12 : 0.07
      ctx.strokeStyle = `rgba(${pColor}, ${gridOpacity})`
      ctx.lineWidth = 1

      const horizon = h * 0.42
      const numH = 10
      for (let i = 0; i <= numH; i++) {
        const t = ((i / numH) + gridOffset) % 1
        const y = horizon + (h - horizon) * (t * t)
        const spread = 0.2 + t * 0.8
        ctx.beginPath()
        ctx.moveTo(w / 2 - (w / 2) * spread, y)
        ctx.lineTo(w / 2 + (w / 2) * spread, y)
        ctx.stroke()
      }

      const numV = 14
      for (let i = 0; i <= numV; i++) {
        const t = i / numV
        const xBottom = w * t
        const xTop = w / 2 + (xBottom - w / 2) * 0.06
        ctx.beginPath()
        ctx.moveTo(xTop, horizon)
        ctx.lineTo(xBottom, h)
        ctx.stroke()
      }

      // ── Layer 3: Glitch rects ──
      if (now > nextGlitch) {
        glitchRects.push({
          y: Math.random() * h,
          height: 2 + Math.random() * 6,
          opacity: light ? 0.06 + Math.random() * 0.08 : 0.15 + Math.random() * 0.25,
          until: now + 60 + Math.random() * 60,
        })
        nextGlitch = now + 2000 + Math.random() * 3000
      }

      if (now > nextGlobalGlitch) {
        globalGlitchDx = (Math.random() - 0.5) * 8
        globalGlitchUntil = now + 80
        nextGlobalGlitch = now + 8000 + Math.random() * 4000
      }

      const activeGlitchDx = now < globalGlitchUntil ? globalGlitchDx : 0

      glitchRects = glitchRects.filter((r) => now < r.until)
      for (const r of glitchRects) {
        ctx.fillStyle = `rgba(${pColor}, ${r.opacity})`
        ctx.fillRect(0, r.y, w, r.height)
      }

      // ── Layer 4: Particle network ──
      // Light mode: darker, more visible particles; dark mode: lime glow
      const pOpacity = light ? 0.35 : 0.5

      // Find nearest 15 to mouse
      const withDist = particles.map((p, i) => ({
        i,
        d: Math.hypot(p.x - mouseX, p.y - mouseY),
      }))
      withDist.sort((a, b) => a.d - b.d)
      const nearSet = new Set(withDist.slice(0, 15).map((d) => d.i))

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (nearSet.has(i) && mouseX > -100) {
          p.vx += (mouseX - p.x) * 0.00008
          p.vy += (mouseY - p.y) * 0.00008
        }

        const speed = Math.hypot(p.vx, p.vy)
        if (speed > 1.2) {
          p.vx = (p.vx / speed) * 1.2
          p.vy = (p.vy / speed) * 1.2
        }

        p.x += p.vx + activeGlitchDx * 0.05
        p.y += p.vy

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${pColor}, ${pOpacity})`
        ctx.fill()
      }

      // Connect nearby particles
      const lineMax = light ? 0.15 : 0.22
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${pColor}, ${(1 - dist / 120) * lineMax})`
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // ── Layer 5: HUD readouts ──
      if (now > lastHudUpdate + 1500) {
        const idx = Math.floor(Math.random() * hudLines.length)
        hudLine1 = hudLines[idx]
        hudLine2 = hudLines[(idx + 1) % hudLines.length]
        lastHudUpdate = now
      }

      if (now > nextSigUpdate) {
        sigBars = sigBars.map(() => 1 + Math.floor(Math.random() * 5))
        nextSigUpdate = now + 800
      }

      const hudOpacity = light ? 0.3 : 0.4
      ctx.font = '10px monospace'
      ctx.fillStyle = `rgba(${pColor}, ${hudOpacity})`
      ctx.fillText(hudLine1, 16, 26)
      ctx.fillText(hudLine2, 16, 40)

      const bx = w - 65
      const by = h - 18
      for (let i = 0; i < sigBars.length; i++) {
        const bh = sigBars[i] * 4
        ctx.fillStyle = `rgba(${pColor}, ${hudOpacity})`
        ctx.fillRect(bx + i * 11, by - bh, 7, bh)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}
