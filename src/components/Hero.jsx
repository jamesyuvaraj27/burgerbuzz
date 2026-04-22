import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const TOTAL_FRAMES = 240
const IMAGE_PATH = '/burgerpics/ezgif-frame-'
const IMAGE_EXT = '.jpg'

function padNum(n) {
  return String(n).padStart(3, '0')
}

export default function Hero() {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const frameRef = useRef(0)
  const ctxRef = useRef(null)
  const rafRef = useRef(null)
  const targetFrameRef = useRef(0)

  function renderFrame(idx) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = ctxRef.current
    if (!ctx) return
    const i = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(idx)))
    const img = imagesRef.current[i]
    if (!img || !img.complete || !img.naturalWidth) return

    const dpr = window.devicePixelRatio || 1
    const cw = canvas.width / dpr
    const ch = canvas.height / dpr
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // object-fit: cover — fills the canvas, crops edges
    const imgRatio = img.naturalWidth / img.naturalHeight
    const canvasRatio = cw / ch
    let dw, dh, dx, dy
    if (canvasRatio > imgRatio) {
      dw = cw
      dh = cw / imgRatio
    } else {
      dh = ch
      dw = ch * imgRatio
    }
    dx = (cw - dw) / 2
    dy = (ch - dh) / 2
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  function resizeCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctxRef.current = canvas.getContext('2d')
    ctxRef.current.scale(dpr, dpr)
    renderFrame(frameRef.current)
  }

  function startLerpLoop() {
    const loop = () => {
      const diff = targetFrameRef.current - frameRef.current
      if (Math.abs(diff) > 0.25) {
        frameRef.current += diff * 0.1
        renderFrame(frameRef.current)
      } else if (frameRef.current !== targetFrameRef.current) {
        frameRef.current = targetFrameRef.current
        renderFrame(frameRef.current)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }

  function onScroll() {
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (maxScroll <= 0) return
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
    targetFrameRef.current = progress * (TOTAL_FRAMES - 1)
  }

  useEffect(() => {
    resizeCanvas()

    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resizeCanvas, 100)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    // also listen to orientationchange on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(resizeCanvas, 200)
    })

    startLerpLoop()

    // Preload — prioritize frames 1-10 first for fast first paint
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `${IMAGE_PATH}${padNum(i)}${IMAGE_EXT}`
      img.onload = () => {
        if (i <= 3) renderFrame(0)
      }
      imagesRef.current[i - 1] = img
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* ── Fixed canvas background — stays behind all content as you scroll ── */}
      <div
        className="hero-canvas-fixed"
        style={{ overflow: 'hidden' }}
      >
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 'min(65vmin, 500px)',
          height: 'min(65vmin, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, rgba(255,179,71,0.06) 40%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'glowPulse 4s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
      </div>

      {/* ── Hero section — full viewport, content always visible ── */}
      <section
        id="hero"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          height: '100dvh',
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
          overflow: 'hidden',
        }}
      >
        <motion.div
          id="hero-text-block"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          style={{
            textAlign: 'center',
            pointerEvents: 'none',
            padding: '0 clamp(16px, 5vw, 40px)',
            width: '100%',
            maxWidth: 700,
          }}
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(9px, 2.5vw, 11px)',
              letterSpacing: 'clamp(3px, 1.5vw, 6px)',
              textTransform: 'uppercase',
              color: 'var(--amber)',
              marginBottom: 'clamp(14px, 3vw, 24px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
          >
            <span style={{ width: 24, height: 1, background: 'var(--amber)', display: 'block', flexShrink: 0 }} />
            Premium Gourmet Experience
            <span style={{ width: 24, height: 1, background: 'var(--amber)', display: 'block', flexShrink: 0 }} />
          </motion.div>

          {/* Main title */}
          <h1
            className="hero-title-display"
            style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: 'clamp(72px, 18vw, 200px)',
              lineHeight: 0.88,
              letterSpacing: 'clamp(2px, 1vw, 6px)',
              marginBottom: 0,
            }}
          >
            <span style={{ display: 'block', color: 'var(--cream)' }}>BURGER</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>BUZZ</span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(13px, 3vw, 22px)',
              color: 'rgba(255,243,224,0.65)',
              marginTop: 'clamp(12px, 2vw, 20px)',
              letterSpacing: 1,
              lineHeight: 1.5,
            }}
          >
            Handcrafted with passion. Assembled to perfection.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              marginTop: 'clamp(20px, 4vw, 36px)',
              flexWrap: 'wrap',
            }}
          >
            <button
              className="btn-primary"
              style={{ pointerEvents: 'all' }}
              onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Menu 🍔
            </button>
            <button
              className="btn-outline"
              style={{ pointerEvents: 'all' }}
              onClick={() => document.querySelector('#customizer')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Build Your Burger
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(20px, 5vh, 40px)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            width: 1, height: 50,
            background: 'linear-gradient(to bottom, transparent, var(--amber), transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9, letterSpacing: 3,
            textTransform: 'uppercase', color: 'var(--cream-dim)',
          }}>Scroll to Explore</span>
        </motion.div>
      </section>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%,-50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%,-50%) scale(1.1); }
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </>
  )
}