import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Popular', href: '#popular' },
  { label: 'Offers', href: '#offers' },
  { label: 'Customize', href: '#customizer' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, setIsOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '10px 0' : '20px 0',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.19,1,0.22,1)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: 'Bebas Neue, cursive', fontSize: 28, letterSpacing: 4,
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              border: 'none', padding: 0,
            }}
          >
            <span style={{ WebkitTextFillColor: 'initial', fontSize: 22 }}>🍔</span>
            BURGER BUZZ
          </button>

          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => handleNav(link.href)}
                style={{
                  fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: 2,
                  textTransform: 'uppercase', color: 'rgba(255,243,224,0.7)',
                  transition: 'color 0.2s', cursor: 'pointer', padding: '4px 0',
                  background: 'none', border: 'none',
                }}
                onMouseEnter={e => e.target.style.color = '#FF6B35'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,243,224,0.7)'}
              >{link.label}</button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px',
                background: count > 0
                  ? 'linear-gradient(135deg, #FF6B35, #FFB347)'
                  : 'rgba(255,255,255,0.06)',
                border: count > 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 100,
                color: count > 0 ? '#080808' : 'var(--cream)',
                fontFamily: 'Space Mono, monospace',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: count > 0 ? '0 4px 20px rgba(255,107,53,0.35)' : 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span className="cart-label">Cart</span>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    background: count > 0 ? 'rgba(8,8,8,0.25)' : 'var(--amber)',
                    color: count > 0 ? '#080808' : '#fff',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    marginLeft: 2,
                  }}
                >{count}</motion.span>
              )}
            </motion.button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none', flexDirection: 'column', gap: 5,
                padding: 6, cursor: 'pointer', background: 'none', border: 'none',
              }}
              className="mobile-toggle"
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 22, height: 2,
                  background: mobileOpen ? (i === 1 ? 'transparent' : '#FF6B35') : '#FFF3E0',
                  display: 'block', borderRadius: 2,
                  transform: mobileOpen
                    ? i === 0 ? 'translateY(7px) rotate(45deg)'
                    : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none'
                    : 'none',
                  transition: 'all 0.3s',
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(8,8,8,0.98)', zIndex: 99,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 28, backdropFilter: 'blur(24px)',
            }}
          >
            <button onClick={() => setMobileOpen(false)} style={{
              position: 'absolute', top: 24, right: 24, fontSize: 28,
              color: 'rgba(255,243,224,0.6)', cursor: 'pointer', background: 'none', border: 'none',
            }}>✕</button>
            {navLinks.map((link, i) => (
              <motion.button key={link.label}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNav(link.href)}
                style={{
                  fontFamily: 'Bebas Neue, cursive', fontSize: 48, letterSpacing: 4,
                  color: '#FFF3E0', cursor: 'pointer', background: 'none', border: 'none',
                }}
              >{link.label}</motion.button>
            ))}
            <motion.button
              className="btn-primary"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              onClick={() => { setMobileOpen(false); setIsOpen(true) }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              🛒 View Cart {count > 0 && `(${count})`}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .cart-label { display: none; }
        }
      `}</style>
    </>
  )
}
