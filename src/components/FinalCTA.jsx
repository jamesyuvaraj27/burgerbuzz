import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function FinalCTA() {
  const { setIsOpen } = useCart()
  return (
    <section className="section" style={{
      position: 'relative',
      zIndex: 6,
      overflow: 'hidden',
      textAlign: 'center',
      background: 'linear-gradient(to bottom, rgba(8,8,8,0.34) 0%, rgba(10,10,10,0.58) 100%)',
    }}>
      {/* Background glow ring */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, rgba(255,107,53,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'ctaPulse 5s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: '1px solid rgba(255,107,53,0.08)',
        pointerEvents: 'none',
        animation: 'ctaRing 8s linear infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 500,
        height: 500,
        borderRadius: '50%',
        border: '1px solid rgba(255,179,71,0.05)',
        pointerEvents: 'none',
        animation: 'ctaRing 12s linear infinite reverse',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="section-overline" style={{ justifyContent: 'center', marginBottom: 24 }}>
            Guntur's Finest
          </div>

          {/* Big emoji */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 80, marginBottom: 24, display: 'inline-block' }}
          >
            🍔
          </motion.div>

          <h2 style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: 'clamp(60px, 12vw, 150px)',
            lineHeight: 0.88,
            letterSpacing: 4,
            marginBottom: 20,
          }}>
            <span style={{ display: 'block', color: 'var(--cream)' }}>READY TO</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>INDULGE?</span>
          </h2>

          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            color: 'var(--cream-muted)',
            maxWidth: 500,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            Come experience Guntur's most loved gourmet burger shop. Dine in, takeaway, or delivery — we've got you covered.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary"
              style={{ padding: '16px 36px', fontSize: 13 }}
              onClick={() => document.querySelector('#customizer')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Build My Burger 🍔
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-outline"
              style={{ padding: '16px 36px', fontSize: 13 }}
              onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Menu
            </motion.button>
          </div>

          {/* Info cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            maxWidth: 700,
            margin: '0 auto',
          }} className="info-grid">
            {[
              { icon: '📍', label: 'Find Us', value: 'MG Road, Guntur, AP', sub: 'Open 11 AM – 11 PM' },
              { icon: '📞', label: 'Call Us', value: '+91 98765 43210', sub: 'For reservations & enquiries' },
              { icon: '🚴', label: 'Delivery', value: 'Zomato & Swiggy', sub: '30–45 min avg delivery' },
            ].map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 16,
                  padding: '20px 16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{info.icon}</div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'var(--amber)',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}>{info.label}</div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--cream)',
                  marginBottom: 4,
                }}>{info.value}</div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 10,
                  color: 'var(--cream-dim)',
                  letterSpacing: 0.5,
                }}>{info.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%,-50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%,-50%) scale(1.08); }
        }
        @keyframes ctaRing {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
