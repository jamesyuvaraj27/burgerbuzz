import { motion } from 'framer-motion'
import { burgerFacts } from '../data/menuData'

export default function Facts() {
  return (
    <section className="section" style={{
      background: 'linear-gradient(to bottom, rgba(8,8,8,0.36) 0%, rgba(12,12,12,0.56) 50%, rgba(8,8,8,0.36) 100%)',
      position: 'relative',
      zIndex: 6,
      overflow: 'hidden',
    }}>
      {/* Large background text */}
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -20,
        fontFamily: 'Bebas Neue, cursive',
        fontSize: 'clamp(100px, 18vw, 220px)',
        color: 'rgba(255,107,53,0.025)',
        whiteSpace: 'nowrap',
        letterSpacing: 10,
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>WHY BUZZ</div>

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 70 }} className="reveal">
          <div className="section-overline" style={{ justifyContent: 'center' }}>Why Choose Us</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            The Buzz <span className="gradient-text" style={{ fontStyle: 'italic' }}>Difference</span>
          </h2>
          <p style={{ color: 'var(--cream-muted)', maxWidth: 480, margin: '0 auto', fontSize: 16 }}>
            We're not just a burger joint. We're an obsession with quality, craft, and taste.
          </p>
        </div>

        {/* Facts grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 22,
        }} className="facts-grid">
          {burgerFacts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(18px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 20,
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)'
                e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Background accent */}
              <div style={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                background: 'radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                fontSize: 36,
                marginBottom: 18,
                width: 64,
                height: 64,
                background: 'rgba(255,107,53,0.08)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,107,53,0.12)',
              }}>
                {fact.icon}
              </div>

              {/* Stat */}
              <div style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: 34,
                background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: 2,
                marginBottom: 4,
                lineHeight: 1,
              }}>{fact.stat}</div>

              <h4 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 10,
              }}>{fact.title}</h4>

              <p style={{
                fontSize: 13,
                color: 'var(--cream-dim)',
                lineHeight: 1.6,
              }}>{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .facts-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .facts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
