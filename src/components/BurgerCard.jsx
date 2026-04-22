import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

function SpiceIndicator({ level }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: 9, opacity: i <= level ? 1 : 0.2 }}>🌶️</span>
      ))}
    </div>
  )
}

export default function BurgerCard({ item, onCustomize }) {
  const [hovered, setHovered] = useState(false)
  const [flash, setFlash] = useState(false)
  const { addItem } = useCart()
  const flashTimer = useRef(null)

  const handleAdd = useCallback((e) => {
    // Stop propagation — do NOT scroll, navigate, or affect parent
    e.stopPropagation()
    e.preventDefault()

    addItem({
      // Use name+price as logical key so same item increments qty
      cartId: `menu-${item.id}-${item.name}`,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      customDetails: null,
    })

    // Visual flash feedback only — no toast, no navigation
    if (flashTimer.current) clearTimeout(flashTimer.current)
    setFlash(true)
    flashTimer.current = setTimeout(() => setFlash(false), 900)
  }, [addItem, item])

  const handleCustomize = useCallback((e) => {
    e.stopPropagation()
    if (onCustomize) onCustomize(item)
    // Scroll to customizer without affecting cart state
    document.querySelector('#customizer')?.scrollIntoView({ behavior: 'smooth' })
  }, [onCustomize, item])

  const discount = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        /* semi-transparent card so burger bg shows through */
        background: hovered
          ? 'rgba(20, 20, 20, 0.82)'
          : 'rgba(14, 14, 14, 0.75)',
        backdropFilter: 'blur(16px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
        border: `1px solid ${hovered ? 'rgba(255,107,53,0.28)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 'var(--card-radius)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered
          ? '0 16px 60px rgba(0,0,0,0.55), 0 0 40px rgba(255,107,53,0.1)'
          : '0 6px 32px rgba(0,0,0,0.4)',
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {/* Badge */}
      {item.badge && (
        <div style={{
          position: 'absolute', top: 12, left: 12, zIndex: 3,
          background: item.badgeColor || 'var(--amber)',
          color: '#fff',
          fontFamily: 'Space Mono, monospace',
          fontSize: 9, fontWeight: 700, letterSpacing: 1,
          padding: '3px 9px', borderRadius: 6, textTransform: 'uppercase',
        }}>
          {item.badge}
        </div>
      )}

      {/* Discount */}
      {discount > 0 && (
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 3,
          background: 'rgba(46,204,113,0.88)',
          color: '#fff',
          fontFamily: 'Space Mono, monospace',
          fontSize: 9, fontWeight: 700,
          padding: '3px 8px', borderRadius: 6,
        }}>
          -{discount}%
        </div>
      )}

      {/* Image */}
      <div style={{
        height: 210,
        overflow: 'hidden',
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
      }}>
        <motion.img
          src={item.image}
          alt={item.name}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,8,0.65) 0%, transparent 55%)',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 20px' }}>
        {/* Name row */}
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', marginBottom: 7, gap: 10,
        }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 17, fontWeight: 700,
            color: 'var(--cream)', lineHeight: 1.3, flex: 1,
          }}>
            {item.name}
          </h3>
          <div
            className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}
            style={{ marginTop: 3, flexShrink: 0 }}
          />
        </div>

        {/* Description */}
        <p style={{
          fontSize: 12, color: 'var(--cream-dim)', lineHeight: 1.6,
          marginBottom: 12,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.description}
        </p>

        {/* Meta row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 10, marginBottom: 14, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: 'var(--gold)', fontSize: 12 }}>★</span>
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 11, color: 'var(--gold)',
            }}>{item.rating}</span>
            <span style={{ fontSize: 10, color: 'var(--cream-dim)' }}>
              ({item.reviews})
            </span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 12 }}>·</span>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10, color: 'var(--cream-dim)',
          }}>
            {item.calories} kcal
          </span>
          {item.spiceLevel > 0 && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 12 }}>·</span>
              <SpiceIndicator level={item.spiceLevel} />
            </>
          )}
        </div>

        {/* Price + actions */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
            <span style={{
              fontFamily: 'Bebas Neue, cursive', fontSize: 28,
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span style={{
                fontSize: 13, color: 'var(--cream-dim)',
                textDecoration: 'line-through',
              }}>
                ₹{item.originalPrice}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 7 }}>
            {/* Customize button */}
            <button
              onClick={handleCustomize}
              style={{
                padding: '7px 12px',
                background: 'transparent',
                border: '1px solid rgba(255,107,53,0.28)',
                borderRadius: 9,
                color: 'var(--amber)',
                fontFamily: 'Space Mono, monospace',
                fontSize: 9, letterSpacing: 1,
                cursor: 'pointer',
                transition: 'background 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,53,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Custom
            </button>

            {/* Add to cart — flash green on success, returns to normal */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              style={{
                padding: '7px 14px',
                background: flash
                  ? 'linear-gradient(135deg, #2ECC71, #27AE60)'
                  : 'linear-gradient(135deg, #FF6B35, #FFB347)',
                color: '#080808',
                borderRadius: 9,
                fontFamily: 'Space Mono, monospace',
                fontSize: 9, fontWeight: 700, letterSpacing: 1,
                cursor: 'pointer',
                transition: 'background 0.25s',
                border: 'none',
                display: 'flex', alignItems: 'center', gap: 5,
                willChange: 'transform',
              }}
            >
              {flash ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Added
                </>
              ) : (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}