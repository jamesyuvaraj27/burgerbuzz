import { motion } from 'framer-motion'
import { offers } from '../data/menuData'
import toast from 'react-hot-toast'

export default function Offers() {
  return (
    <section id="offers" className="section" style={{ position: 'relative', zIndex: 6, overflow: 'hidden' }}>
      <div className="glow-orb" style={{
        width: 800,
        height: 800,
        background: 'radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
          <div className="section-overline" style={{ justifyContent: 'center' }}>Special Deals</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            <span className="gradient-text">Offers</span> You Can't Resist
          </h2>
          <p style={{ color: 'var(--cream-muted)', maxWidth: 460, margin: '0 auto', fontSize: 16 }}>
            More burger, more value. Curated deals for every occasion.
          </p>
        </div>

        {/* Offers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(18px)',
                border: `1px solid ${offer.color}25`,
                borderRadius: 20,
                padding: '28px 28px 24px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 40px ${offer.color}08`,
              }}
            >
              {/* Gradient corner accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 120,
                height: 120,
                background: `radial-gradient(circle at top right, ${offer.color}20 0%, transparent 70%)`,
                borderRadius: '0 20px 0 0',
                pointerEvents: 'none',
              }} />

              {/* Tag badge */}
              <div style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: `${offer.color}20`,
                border: `1px solid ${offer.color}40`,
                color: offer.color,
                fontFamily: 'Space Mono, monospace',
                fontSize: 9,
                letterSpacing: 1.5,
                padding: '4px 10px',
                borderRadius: 20,
                textTransform: 'uppercase',
              }}>
                {offer.tag}
              </div>

              {/* Icon */}
              <div style={{ fontSize: 40, marginBottom: 16, lineHeight: 1 }}>{offer.icon}</div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 8,
                paddingRight: 80,
              }}>{offer.title}</h3>

              {/* Description */}
              <p style={{
                fontSize: 14,
                color: 'var(--cream-muted)',
                lineHeight: 1.6,
                marginBottom: 22,
              }}>{offer.description}</p>

              {/* Price / savings row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 16,
                borderTop: `1px solid ${offer.color}15`,
              }}>
                <div>
                  {offer.price ? (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{
                        fontFamily: 'Bebas Neue, cursive',
                        fontSize: 36,
                        color: offer.color,
                      }}>₹{offer.price}</span>
                      {offer.originalPrice && (
                        <span style={{ fontSize: 14, color: 'var(--cream-dim)', textDecoration: 'line-through' }}>
                          ₹{offer.originalPrice}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span style={{
                      fontFamily: 'Bebas Neue, cursive',
                      fontSize: 36,
                      color: offer.color,
                    }}>
                      {typeof offer.savings === 'string' ? offer.savings : ''}
                    </span>
                  )}
                  {offer.savings && typeof offer.savings === 'number' && (
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 10,
                      color: '#2ECC71',
                      letterSpacing: 1,
                    }}>
                      SAVE ₹{offer.savings}
                    </div>
                  )}
                </div>

                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => toast.success(`"${offer.title}" deal activated! 🎉`, {
                    style: { background: '#111', color: '#FFF3E0', border: `1px solid ${offer.color}60`, fontFamily: 'Space Mono, monospace', fontSize: '12px' }
                  })}
                  style={{
                    background: offer.color,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '10px 20px',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Grab Deal →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom notice */}
        <div style={{
          textAlign: 'center',
          marginTop: 40,
          padding: '20px 30px',
          background: 'rgba(255,179,71,0.05)',
          border: '1px solid rgba(255,179,71,0.15)',
          borderRadius: 14,
          maxWidth: 600,
          margin: '40px auto 0',
        }}>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 11,
            color: 'var(--gold)',
            letterSpacing: 2,
          }}>
            ⭐ LOYALTY PROGRAM COMING SOON — Earn Buzz Points on every order!
          </span>
        </div>
      </div>
    </section>
  )
}
