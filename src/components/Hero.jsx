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
    const cw = canvas.width / (window.devicePixelRatio || 1)
    const ch = canvas.height / (window.devicePixelRatio || 1)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const ratio = img.naturalWidth / img.naturalHeight
    const cratio = cw / ch
    let dw, dh
    if (cratio > ratio) { dh = ch; dw = dh * ratio }
    else { dw = cw; dh = dw / ratio }
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
  }

  function resizeCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctxRef.current = canvas.getContext('2d')
    ctxRef.current.scale(dpr, dpr)
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    renderFrame(frameRef.current)
  }

  function startLerpLoop() {
    const loop = () => {
      const diff = targetFrameRef.current - frameRef.current
      if (Math.abs(diff) > 0.3) {
        frameRef.current += diff * 0.12
        renderFrame(frameRef.current)
      } else {
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
    const handleResize = () => resizeCanvas()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    startLerpLoop()
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `${IMAGE_PATH}${padNum(i)}${IMAGE_EXT}`
      img.onload = () => { if (i === 1) renderFrame(0) }
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
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        pointerEvents: 'none', background: 'var(--bg-deep)',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '65vmin', height: '65vmin', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, rgba(255,179,71,0.06) 40%, transparent 70%)',
          filter: 'blur(60px)', animation: 'glowPulse 4s ease-in-out infinite',
        }} />
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      <section id="hero" style={{
        position: 'relative', height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5,
      }}>
        <motion.div
          id="hero-text-block"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          style={{ textAlign: 'center', pointerEvents: 'none', padding: '0 20px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: 6,
              textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            }}
          >
            <span style={{ width: 30, height: 1, background: 'var(--amber)', display: 'block' }} />
            Premium Gourmet Experience
            <span style={{ width: 30, height: 1, background: 'var(--amber)', display: 'block' }} />
          </motion.div>
          <h1 style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: 'clamp(80px, 16vw, 200px)',
            lineHeight: 0.88, letterSpacing: 4, marginBottom: 0,
          }}>
            <span style={{ display: 'block', color: 'var(--cream)' }}>BURGER</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>BUZZ</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{
              fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
              fontSize: 'clamp(14px, 2vw, 22px)', color: 'rgba(255,243,224,0.65)',
              marginTop: 20, letterSpacing: 1,
            }}
          >Handcrafted with passion. Assembled to perfection.</motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}
          >
            <button className="btn-primary" style={{ pointerEvents: 'all' }}
              onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Menu 🍔
            </button>
            <button className="btn-outline" style={{ pointerEvents: 'all' }}
              onClick={() => document.querySelector('#customizer')?.scrollIntoView({ behavior: 'smooth' })}>
              Build Your Burger
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{
            position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, pointerEvents: 'none',
          }}
        >
          <div style={{
            width: 1, height: 60,
            background: 'linear-gradient(to bottom, transparent, var(--amber), transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--cream-dim)' }}>
            Scroll to Explore
          </span>
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
