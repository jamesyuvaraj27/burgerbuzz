import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }) {
  const [pct, setPct] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    let current = 0
    // Simulate a loading sequence
    const intervals = [
      { target: 30, speed: 20 },
      { target: 60, speed: 30 },
      { target: 85, speed: 40 },
      { target: 100, speed: 20 },
    ]
    let phaseIdx = 0

    const tick = () => {
      const phase = intervals[phaseIdx]
      if (!phase) return
      current = Math.min(current + 1, phase.target)
      setPct(current)
      if (current >= phase.target) {
        phaseIdx++
        if (phaseIdx >= intervals.length) {
          setTimeout(() => {
            setHiding(true)
            setTimeout(onComplete, 800)
          }, 400)
          return
        }
      }
      setTimeout(tick, phase.speed)
    }
    setTimeout(tick, 200)
  }, [])

  return (
    <div
      className="preloader"
      style={{
        opacity: hiding ? 0 : 1,
        visibility: hiding ? 'hidden' : 'visible',
        transition: 'opacity 0.8s cubic-bezier(0.19,1,0.22,1), visibility 0.8s',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Spinning rings */}
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 48 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            position: 'absolute',
            inset: i * 20,
            borderRadius: '50%',
            border: '1px solid transparent',
            borderTopColor: i === 0 ? '#FF6B35' : i === 1 ? '#FFB347' : 'rgba(255,107,53,0.3)',
            animation: `spin ${1.5 - i * 0.3}s linear infinite ${i % 2 === 1 ? 'reverse' : ''}`,
          }} />
        ))}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          animation: 'burgerBounce 1s ease-in-out infinite',
        }}>
          🍔
        </div>
      </div>

      {/* Brand */}
      <div style={{
        fontFamily: 'Bebas Neue, cursive',
        fontSize: 48,
        letterSpacing: 12,
        background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 8,
      }}>
        BURGER BUZZ
      </div>

      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: 11,
        letterSpacing: 4,
        color: 'rgba(255,243,224,0.4)',
        textTransform: 'uppercase',
        marginBottom: 32,
      }}>
        Crafting your experience...
      </div>

      {/* Progress bar */}
      <div style={{ width: 260, textAlign: 'center' }}>
        <div style={{
          height: 2,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 10,
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #FF6B35, #FFB347)',
            borderRadius: 2,
            transition: 'width 0.15s ease',
          }} />
        </div>
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 11,
          color: 'rgba(255,243,224,0.35)',
          letterSpacing: 2,
        }}>
          {pct}%
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes burgerBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
