import { motion } from 'framer-motion'
import { popular } from '../data/menuData'
import { useCart } from '../context/CartContext'

export default function Popular() {
  const { addItem } = useCart()
  return (
    <section id="popular" className="section" style={{
      background: 'linear-gradient(to bottom, rgba(8,8,8,0.36) 0%, rgba(13,13,13,0.58) 50%, rgba(8,8,8,0.36) 100%)',
      position: 'relative',
      zIndex: 6,
      overflow: 'hidden',
    }}>
      {/* Background text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        fontFamily: 'Bebas Neue, cursive',
        fontSize: 'clamp(120px, 20vw, 280px)',
        color: 'rgba(255,107,53,0.03)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        letterSpacing: 20,
        userSelect: 'none',
      }}>POPULAR</div>

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
          <div className="section-overline" style={{ justifyContent: 'center' }}>
            Fan Favorites
          </div>
          <h2 className="section-title" style={{ marginBottom: 8 }}>
            Most <span className="gradient-text" style={{ fontStyle: 'italic' }}>Popular</span> Today
          </h2>
          <p style={{ color: 'var(--cream-muted)', fontSize: 15 }}>
            Based on real-time orders from Burger Buzz Guntur
          </p>
        </div>

        {/* Big popular cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {popular.map((p, i) => (
            <motion.div
              key={p.rank}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ scale: 1.01 }}
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                gap: 0,
                borderRadius: 24,
                overflow: 'hidden',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(18px)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
                minHeight: 280,
                cursor: 'pointer',
              }}
              className="popular-card"
            >
              {/* Image (right side on odd) */}
              {i % 2 !== 0 && (
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: 260 }}>
                  <img
                    src={p.item.image}
                    alt={p.item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 60%)',
                  }} />
                </div>
              )}

              {/* Content */}
              <div style={{
                padding: 'clamp(30px,4vw,50px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 16,
                position: 'relative',
              }}>
                {/* Rank */}
                <div style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: 120,
                  color: 'rgba(255,107,53,0.06)',
                  position: 'absolute',
                  top: -10,
                  right: 30,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}>#{p.rank}</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    fontFamily: 'Bebas Neue, cursive',
                    fontSize: 48,
                    background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}>#{p.rank}</span>
                  {p.item.badge && (
                    <span style={{
                      background: p.item.badgeColor,
                      color: '#fff',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 9,
                      padding: '4px 10px',
                      borderRadius: 6,
                      letterSpacing: 1,
                    }}>{p.item.badge}</span>
                  )}
                </div>

                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}>
                  {p.item.name}
                </h3>

                <p style={{
                  color: 'var(--cream-muted)',
                  fontSize: 14,
                  lineHeight: 1.7,
                  maxWidth: 400,
                }}>
                  {p.item.description}
                </p>

                <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{
                      fontFamily: 'Bebas Neue, cursive',
                      fontSize: 38,
                      background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>₹{p.item.price}</span>
                    {p.item.originalPrice && (
                      <span style={{ fontSize: 14, color: 'var(--cream-dim)', textDecoration: 'line-through', marginLeft: 8 }}>
                        ₹{p.item.originalPrice}
                      </span>
                    )}
                  </div>

                  <div style={{
                    background: 'rgba(255,107,53,0.1)',
                    border: '1px solid rgba(255,107,53,0.2)',
                    borderRadius: 10,
                    padding: '8px 14px',
                  }}>
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 10,
                      color: 'var(--amber)',
                      letterSpacing: 1,
                    }}>{p.ordersToday} orders today</div>
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 9,
                      color: '#2ECC71',
                    }}>{p.trend}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--gold)', fontSize: 14 }}>★</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: 'var(--gold)' }}>
                      {p.item.rating}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--cream-dim)' }}>({p.item.reviews})</span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', marginTop: 8 }}
                  onClick={() => addItem({ cartId: `menu-${p.item.id}`, name: p.item.name, price: p.item.price, image: p.item.image, category: p.item.category })}
                >
                  Order Now — ₹{p.item.price}
                </motion.button>
              </div>

              {/* Image (left side on even) */}
              {i % 2 === 0 && (
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: 260 }}>
                  <img
                    src={p.item.image}
                    alt={p.item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to left, rgba(8,8,8,0.5) 0%, transparent 60%)',
                  }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .popular-card { grid-template-columns: 1fr !important; }
          .popular-card > div:last-child { min-height: 220px !important; }
        }
      `}</style>
    </section>
  )
}
