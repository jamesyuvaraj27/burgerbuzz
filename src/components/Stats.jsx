import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const stats = [
  { value: 50000, suffix: '+', label: 'Burgers Served', sub: 'and counting...' },
  { value: 16, suffix: '', label: 'Menu Items', sub: 'Beef, Chicken & Veggie' },
  { value: 4.9, suffix: '★', label: 'Avg Rating', sub: 'On Zomato & Swiggy' },
  { value: 2019, suffix: '', label: 'Founded', sub: 'Guntur, Andhra Pradesh' },
]

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section style={{ position: 'relative', zIndex: 6, padding: '0 0 var(--section-pad)' }}>
      <div className="container">
        <div
          ref={ref}
          style={{
            background: 'linear-gradient(135deg, rgba(255,107,53,0.08) 0%, rgba(18,18,18,0.9) 50%, rgba(255,179,71,0.06) 100%)',
            border: '1px solid rgba(255,107,53,0.15)',
            borderRadius: 24,
            padding: 'clamp(40px, 5vw, 70px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 40,
            position: 'relative',
            overflow: 'hidden',
          }}
          className="stats-grid"
        >
          {/* Background gradient */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '80%',
            height: '200%',
            background: 'radial-gradient(ellipse, rgba(255,107,53,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {stats.map((s, i) => (
            <div key={i} style={{
              textAlign: 'center',
              position: 'relative',
              padding: '20px 10px',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }} className="stat-item">
              <div style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: 'clamp(40px, 5vw, 70px)',
                background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
                marginBottom: 8,
              }}>
                {inView ? (
                  <CountUp
                    end={s.value}
                    duration={2.5}
                    delay={i * 0.2}
                    decimals={s.value % 1 !== 0 ? 1 : 0}
                  />
                ) : '0'}
                {s.suffix}
              </div>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--cream)',
                marginBottom: 6,
              }}>{s.label}</div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                letterSpacing: 1,
                color: 'var(--cream-dim)',
              }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .stat-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .stat-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.05) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
