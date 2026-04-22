import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

function SpiceIndicator({ level }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: 10, opacity: i <= level ? 1 : 0.2 }}>🌶️</span>
      ))}
    </div>
  )
}

export default function BurgerCard({ item, onCustomize }) {
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCart()

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem({
      cartId: `menu-${item.id}`,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      customDetails: null,
    })
  }

  const discount = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(18px)',
        border: `1px solid ${hovered ? 'rgba(255,107,53,0.25)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--card-radius)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        position: 'relative',
      }}
    >
      {item.badge && (
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 3,
          background: item.badgeColor || 'var(--amber)',
          color: '#fff', fontFamily: 'Space Mono, monospace',
          fontSize: 9, fontWeight: 700, letterSpacing: 1,
          padding: '4px 10px', borderRadius: 6, textTransform: 'uppercase',
        }}>{item.badge}</div>
      )}
      {discount > 0 && (
        <div style={{
          position: 'absolute', top: 14, right: 14, zIndex: 3,
          background: 'rgba(46,204,113,0.9)', color: '#fff',
          fontFamily: 'Space Mono, monospace', fontSize: 9, fontWeight: 700,
          padding: '4px 8px', borderRadius: 6,
        }}>-{discount}%</div>
      )}

      <div style={{ height: 220, overflow: 'hidden', position: 'relative', background: 'var(--bg-elevated)' }}>
        <motion.img
          src={item.image} alt={item.name}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)',
        }} />
      </div>

      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8, gap: 10 }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700,
            color: 'var(--cream)', lineHeight: 1.3, flex: 1,
          }}>{item.name}</h3>
          <div className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`} style={{ marginTop: 3, flexShrink: 0 }} />
        </div>

        <p style={{
          fontSize: 13, color: 'var(--cream-dim)', lineHeight: 1.6, marginBottom: 14,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{item.description}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ color: 'var(--gold)', fontSize: 13 }}>★</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--gold)' }}>{item.rating}</span>
            <span style={{ fontSize: 11, color: 'var(--cream-dim)' }}>({item.reviews})</span>
          </div>
          <span style={{ color: 'var(--border-subtle)', fontSize: 12 }}>·</span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--cream-dim)' }}>{item.calories} kcal</span>
          {item.spiceLevel > 0 && (
            <><span style={{ color: 'var(--border-subtle)', fontSize: 12 }}>·</span>
            <SpiceIndicator level={item.spiceLevel} /></>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{
              fontFamily: 'Bebas Neue, cursive', fontSize: 30,
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>₹{item.price}</span>
            {item.originalPrice && (
              <span style={{ fontSize: 14, color: 'var(--cream-dim)', textDecoration: 'line-through' }}>₹{item.originalPrice}</span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onCustomize && onCustomize(item)}
              style={{
                padding: '8px 14px', background: 'transparent',
                border: '1px solid rgba(255,107,53,0.3)', borderRadius: 10,
                color: 'var(--amber)', fontFamily: 'Space Mono, monospace',
                fontSize: 10, letterSpacing: 1, cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >Custom</button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAdd}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                color: '#080808', borderRadius: 10,
                fontFamily: 'Space Mono, monospace', fontSize: 10, fontWeight: 700,
                letterSpacing: 1, cursor: 'pointer', transition: 'background 0.3s',
                border: 'none', display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              + Add
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
