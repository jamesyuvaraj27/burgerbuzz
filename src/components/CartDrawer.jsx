import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen } = useCart()

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setIsOpen])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('cart-open')
    } else {
      document.body.classList.remove('cart-open')
    }
    return () => document.body.classList.remove('cart-open')
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              zIndex: 300,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* ── Drawer ── */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(420px, 100vw)',
              zIndex: 301,
              /* flex column — header + scroll items + fixed footer */
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              /* semi-transparent so burger bg shows through */
              background: 'rgba(10, 10, 10, 0.88)',
              backdropFilter: 'blur(28px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
              borderLeft: '1px solid rgba(255, 107, 53, 0.18)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            {/* ── Header — never scrolls ── */}
            <div style={{
              padding: '18px 20px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255, 107, 53, 0.06)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>🛒</span>
                <div>
                  <div style={{
                    fontFamily: 'Bebas Neue, cursive',
                    fontSize: 20,
                    letterSpacing: 3,
                    color: 'var(--cream)',
                  }}>
                    YOUR CART
                  </div>
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 10,
                    color: 'var(--amber)',
                    letterSpacing: 1,
                  }}>
                    {count} {count === 1 ? 'item' : 'items'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 10,
                      color: '#E74C3C',
                      letterSpacing: 1,
                      cursor: 'pointer',
                      background: 'rgba(231,76,60,0.08)',
                      border: '1px solid rgba(231,76,60,0.18)',
                      borderRadius: 8,
                      padding: '5px 10px',
                    }}
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--cream)',
                    fontSize: 15,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── Items list — SCROLLABLE, isolated ── */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                overscrollBehavior: 'contain',
                minHeight: 0, /* CRITICAL: flex child must have min-height:0 to scroll */
              }}
            >
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '60px 24px',
                      textAlign: 'center',
                      gap: 16,
                    }}
                  >
                    <span style={{ fontSize: 52 }}>🍔</span>
                    <div style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 20,
                      fontStyle: 'italic',
                      color: 'var(--cream-muted)',
                    }}>
                      Your cart is empty
                    </div>
                    <p style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 14,
                      color: 'var(--cream-dim)',
                      lineHeight: 1.6,
                    }}>
                      Add delicious burgers from the menu to get started!
                    </p>
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        setTimeout(() => {
                          document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
                        }, 100)
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '11px 22px',
                        background: 'var(--amber)',
                        color: '#080808',
                        fontFamily: 'Space Mono, monospace',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        borderRadius: 100,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Browse Menu 🍔
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <CartItem
                      key={item.cartId}
                      item={item}
                      onRemove={removeItem}
                      onUpdateQty={updateQty}
                    />
                  ))
                )}
              </AnimatePresence>

              {/* Bottom padding so last item isn't flush against footer */}
              {items.length > 0 && <div style={{ height: 8 }} />}
            </div>

            {/* ── Footer — FIXED at bottom, never scrolls ── */}
            {items.length > 0 && (
              <CartFooter total={total} count={count} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── Cart Item Row ── */
function CartItem({ item, onRemove, onUpdateQty }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0, padding: 0, overflow: 'hidden' }}
      transition={{ duration: 0.22 }}
      style={{
        display: 'flex',
        gap: 12,
        padding: '14px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        alignItems: 'flex-start',
      }}
    >
      {/* Image */}
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 10,
        overflow: 'hidden',
        flexShrink: 0,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,107,53,0.12)',
      }}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
          }}>
            🍔
          </div>
        )}
      </div>

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--cream)',
          marginBottom: 2,
          lineHeight: 1.3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {item.name}
        </div>

        {item.customDetails && (
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: 'var(--amber)',
            letterSpacing: 0.3,
            marginBottom: 4,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {item.customDetails}
          </div>
        )}

        {item.category && (
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: 'var(--cream-dim)',
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            {item.category}
          </div>
        )}

        {/* Qty + price */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}>
          {/* Qty stepper */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}>
            <button
              onClick={() => onUpdateQty(item.cartId, -1)}
              style={{
                width: 28,
                height: 28,
                background: 'transparent',
                border: 'none',
                color: 'var(--amber)',
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,53,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              −
            </button>
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 12,
              color: 'var(--cream)',
              minWidth: 24,
              textAlign: 'center',
            }}>
              {item.qty}
            </span>
            <button
              onClick={() => onUpdateQty(item.cartId, +1)}
              style={{
                width: 28,
                height: 28,
                background: 'transparent',
                border: 'none',
                color: 'var(--amber)',
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,53,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              +
            </button>
          </div>

          {/* Price + remove */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: 20,
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ₹{item.price * item.qty}
            </span>
            <button
              onClick={() => onRemove(item.cartId)}
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: 'rgba(231,76,60,0.07)',
                border: '1px solid rgba(231,76,60,0.18)',
                color: '#E74C3C',
                fontSize: 11,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(231,76,60,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(231,76,60,0.07)'}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Cart Footer with PASSIVE CTA ── */
function CartFooter({ total, count }) {
  return (
    <div
      style={{
        padding: '16px 20px 20px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255, 107, 53, 0.04)',
        flexShrink: 0, /* never shrink — always anchored at bottom */
      }}
    >
      {/* Price breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: 'var(--cream-dim)',
          }}>
            Subtotal ({count} {count === 1 ? 'item' : 'items'})
          </span>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: 'var(--cream-muted)',
          }}>
            ₹{total}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: 'var(--cream-dim)',
          }}>
            Packing charges
          </span>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: '#2ECC71',
          }}>
            Free
          </span>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '2px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 17,
            fontWeight: 700,
            color: 'var(--cream)',
          }}>
            Total
          </span>
          <span style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: 34,
            background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}>
            ₹{total}
          </span>
        </div>
      </div>

      {/*
        ── PASSIVE CTA PARAGRAPH ──
        • Pure <p> — no button, no form, no onClick side effects
        • Click does absolutely nothing (no-op handler)
        • No state change, no toast, no navigation, no cart mutation
        • Visually prominent via typography, NOT elevation or fill
      */}
      <p
        onClick={() => { /* intentionally empty — no-op */ }}
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.6,
          textAlign: 'center',
          color: 'var(--cream-muted)',
          cursor: 'pointer',
          padding: '14px 16px',
          borderRadius: 12,
          border: '1px solid rgba(255,107,53,0.2)',
          background: 'rgba(255,107,53,0.06)',
          margin: 0,
          userSelect: 'none',
          /* no transition, no hover effect — intentionally passive */
        }}
      >
        Review your{' '}
        <span style={{
          fontFamily: 'Bebas Neue, cursive',
          fontSize: 16,
          letterSpacing: 2,
          background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          CART
        </span>
        {' '}and call the Waiter to place the Order{' '}
        <span style={{
          fontFamily: 'Bebas Neue, cursive',
          fontSize: 16,
          color: 'var(--amber)',
          WebkitTextFillColor: 'var(--amber)',
        }}>
          — ₹{total}
        </span>
      </p>
    </div>
  )
}