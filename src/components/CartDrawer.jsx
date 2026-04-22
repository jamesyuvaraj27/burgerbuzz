import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const iconButton = {
  width: 34,
  height: 34,
  borderRadius: 8,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--cream)',
  fontSize: 15,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen } = useCart()

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setIsOpen])

  useEffect(() => {
    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const previousTouchAction = body.style.touchAction

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth
      body.style.overflow = 'hidden'
      body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : previousPaddingRight
      body.style.touchAction = 'none'
      body.classList.add('cart-open')
    }

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
      body.style.touchAction = previousTouchAction
      body.classList.remove('cart-open')
    }
  }, [isOpen])

  const browseMenu = () => {
    setIsOpen(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.46)',
              zIndex: 400,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            aria-label="Cart"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(420px, 100vw)',
              height: '100dvh',
              maxHeight: '100dvh',
              background: 'rgba(14,14,14,0.82)',
              backdropFilter: 'blur(24px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
              borderLeft: '1px solid rgba(255,107,53,0.2)',
              zIndex: 401,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '-18px 0 60px rgba(0,0,0,0.32)',
            }}
          >
            <header style={{
              padding: '22px 24px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255,107,53,0.06)',
              flexShrink: 0,
            }}>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: 24,
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

              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="cart-quiet-button"
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 10,
                      color: '#ff7c70',
                      letterSpacing: 1,
                      cursor: 'pointer',
                      background: 'rgba(231,76,60,0.1)',
                      border: '1px solid rgba(231,76,60,0.28)',
                      borderRadius: 8,
                      padding: '6px 10px',
                    }}
                  >
                    Clear all
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Close cart"
                  onClick={() => setIsOpen(false)}
                  className="cart-icon-button"
                  style={iconButton}
                >
                  x
                </button>
              </div>
            </header>

            <div style={{
              flex: '1 1 auto',
              minHeight: 0,
              height: '100%',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              scrollBehavior: 'smooth',
              scrollbarGutter: 'stable both-edges',
              WebkitOverflowScrolling: 'touch',
              padding: '12px 0',
            }}>
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    style={{
                      minHeight: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '60px 24px',
                      textAlign: 'center',
                      gap: 16,
                    }}
                  >
                    <div style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 22,
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
                      maxWidth: 280,
                    }}>
                      Add something from the menu to get started.
                    </p>
                    <button
                      type="button"
                      onClick={browseMenu}
                      className="btn-primary"
                      style={{ fontSize: 12, padding: '12px 24px' }}
                    >
                      Browse Menu
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.cartId}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.24 }}
                      style={{
                        display: 'flex',
                        gap: 14,
                        padding: '14px 20px',
                        minHeight: 98,
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        alignItems: 'flex-start',
                        background: 'rgba(255,255,255,0.015)',
                      }}
                    >
                      <div style={{
                        width: 68,
                        height: 68,
                        borderRadius: 10,
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,107,53,0.16)',
                      }}>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Bebas Neue, cursive',
                            fontSize: 22,
                            color: 'var(--amber)',
                          }}>
                            BB
                          </div>
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: 15,
                          fontWeight: 600,
                          color: 'var(--cream)',
                          marginBottom: 3,
                          lineHeight: 1.3,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {item.name}
                        </div>

                        {item.customDetails && (
                          <div style={{
                            fontFamily: 'Space Mono, monospace',
                            fontSize: 9,
                            color: 'var(--amber)',
                            letterSpacing: 0.5,
                            marginBottom: 4,
                            lineHeight: 1.5,
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

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 8,
                        }}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '30px minmax(26px, auto) 30px',
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: 8,
                            border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                          }}>
                            <button
                              type="button"
                              aria-label={`Decrease ${item.name}`}
                              onClick={() => updateQty(item.cartId, -1)}
                              className="cart-qty-button"
                            >
                              -
                            </button>
                            <span style={{
                              fontFamily: 'Space Mono, monospace',
                              fontSize: 13,
                              color: 'var(--cream)',
                              minWidth: 26,
                              textAlign: 'center',
                            }}>
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase ${item.name}`}
                              onClick={() => updateQty(item.cartId, 1)}
                              className="cart-qty-button"
                            >
                              +
                            </button>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{
                              fontFamily: 'Bebas Neue, cursive',
                              fontSize: 22,
                              color: 'var(--gold)',
                            }}>
                              ₹{item.price * item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${item.name}`}
                              onClick={() => removeItem(item.cartId)}
                              className="cart-remove-button"
                            >
                              x
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <footer style={{
                padding: '20px 24px 22px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(12,12,12,0.72)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14 }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--cream-dim)' }}>
                      Subtotal ({count} items)
                    </span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--cream-muted)' }}>
                      ₹{total}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14 }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--cream-dim)' }}>
                      Packing charges
                    </span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#2ECC71' }}>
                      Free
                    </span>
                  </div>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700 }}>
                      Total
                    </span>
                    <span style={{
                      fontFamily: 'Bebas Neue, cursive',
                      fontSize: 36,
                      color: 'var(--gold)',
                      lineHeight: 1,
                    }}>
                      ₹{total}
                    </span>
                  </div>
                </div>

                <p style={{
                  margin: 0,
                  padding: '12px 0 0',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--cream)',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: 1.45,
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}>
                  Review your CART and call the Waiter to place the Order — ₹{total}
                </p>
              </footer>
            )}

            <style>{`
              .cart-icon-button,
              .cart-quiet-button,
              .cart-qty-button,
              .cart-remove-button {
                transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.2s ease;
              }

              .cart-icon-button:hover,
              .cart-quiet-button:hover,
              .cart-qty-button:hover {
                background: rgba(255,107,53,0.12) !important;
                border-color: rgba(255,107,53,0.28) !important;
              }

              .cart-icon-button:active,
              .cart-quiet-button:active,
              .cart-qty-button:active,
              .cart-remove-button:active {
                transform: translateY(1px);
              }

              .cart-qty-button {
                width: 30px;
                height: 30px;
                background: transparent;
                border: 0;
                color: var(--amber);
                font-size: 17px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .cart-remove-button {
                width: 28px;
                height: 28px;
                border-radius: 7px;
                background: rgba(231,76,60,0.1);
                border: 1px solid rgba(231,76,60,0.24);
                color: #ff7c70;
                font-size: 13px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .cart-remove-button:hover {
                background: rgba(231,76,60,0.18);
                border-color: rgba(231,76,60,0.36);
              }
            `}</style>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
