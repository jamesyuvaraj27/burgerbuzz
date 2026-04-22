import { useState } from 'react'
import { motion } from 'framer-motion'
import { snacks, drinks } from '../data/menuData'
import { useCart } from '../context/CartContext'

function SnackCard({ item }) {
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCart()

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(18px)',
        border: `1px solid ${hovered ? 'rgba(255,179,71,0.25)' : 'var(--border-subtle)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? '0 16px 50px rgba(0,0,0,0.5)' : 'var(--shadow-card)',
      }}
    >
      <div style={{ height: 160, overflow: 'hidden', background: 'var(--bg-elevated)', position: 'relative' }}>
        <motion.img
          src={item.image}
          alt={item.name}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 60%)',
        }} />
        <div className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}
          style={{ position: 'absolute', top: 10, right: 10 }} />
      </div>

      <div style={{ padding: '16px 18px 18px' }}>
        <h4 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 6,
        }}>{item.name}</h4>
        <p style={{
          fontSize: 12,
          color: 'var(--cream-dim)',
          lineHeight: 1.5,
          marginBottom: 14,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{item.description}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: 26,
            background: 'linear-gradient(135deg, #FFB347, #FF6B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>₹{item.price}</span>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => {
              addItem({ cartId: `snack-${item.id}`, name: item.name, price: item.price, image: item.image, category: 'Snack' })
            }}
            style={{
              background: 'rgba(255,179,71,0.12)',
              border: '1px solid rgba(255,179,71,0.3)',
              borderRadius: 10,
              padding: '7px 14px',
              color: 'var(--gold)',
              fontFamily: 'Space Mono, monospace',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              cursor: 'pointer',
            }}
          >+ ADD</motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Snacks() {
  return (
    <section className="section" style={{ position: 'relative', zIndex: 6 }}>
      <div className="container">
        {/* Snacks */}
        <div style={{ marginBottom: 80 }}>
          <div className="reveal" style={{ marginBottom: 44 }}>
            <div className="section-overline">Sides & Snacks</div>
            <h2 className="section-title">
              Perfect <span className="gradient-text" style={{ fontStyle: 'italic' }}>Sidekicks</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 22,
          }}>
            {snacks.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <SnackCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Drinks */}
        <div>
          <div className="reveal" style={{ marginBottom: 36 }}>
            <div className="section-overline">Drinks</div>
            <h2 className="section-title">
              Wash It <span className="gradient-text" style={{ fontStyle: 'italic' }}>Down</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 14,
          }}>
            {drinks.map((drink, i) => (
              <motion.button
                key={drink.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                addItem({ cartId: `drink-${drink.id}`, name: drink.name, price: drink.price, image: null, category: 'Drink' })
              }}
                style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 14,
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(52,152,219,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>{drink.image}</div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--cream)',
                  marginBottom: 6,
                }}>{drink.name}</div>
                <div style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: 20,
                  color: '#3498DB',
                }}>₹{drink.price}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
