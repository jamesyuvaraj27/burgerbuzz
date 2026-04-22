import { motion } from 'framer-motion'

const footerLinks = {
  Menu: ['Classic Burgers', 'Premium Burgers', 'Chicken Burgers', 'Veggie Options', 'Sides & Snacks', 'Drinks'],
  Experience: ['Build Your Burger', 'Offers & Deals', 'Loyalty Program', 'About Us', 'Our Story', 'Careers'],
  Connect: ['Zomato', 'Swiggy', 'Instagram', 'Facebook', 'WhatsApp', 'Contact Us'],
}

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(6,6,6,0.74)',
      backdropFilter: 'blur(18px)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      position: 'relative',
      zIndex: 6,
      overflow: 'hidden',
    }}>
      {/* Top footer */}
      <div className="container" style={{ padding: '70px clamp(20px,4vw,60px) 50px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 50,
          marginBottom: 60,
        }} className="footer-grid">
          {/* Brand col */}
          <div>
            <div style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: 40,
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: 4,
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ WebkitTextFillColor: 'initial', fontSize: 30 }}>🍔</span>
              BURGER BUZZ
            </div>
            <p style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 15,
              color: 'var(--cream-muted)',
              marginBottom: 20,
              lineHeight: 1.6,
            }}>
              Handcrafted with passion. Assembled to perfection. Guntur's most loved burger experience.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {['📸', '📘', '💬', '🛵', '🍽️'].map((icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'var(--amber)',
                marginBottom: 20,
              }}>{category}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <button
                    key={link}
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 14,
                      color: 'var(--cream-dim)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'color 0.2s',
                      padding: 0,
                      background: 'none',
                      border: 'none',
                    }}
                    onMouseEnter={e => e.target.style.color = '#FF6B35'}
                    onMouseLeave={e => e.target.style.color = 'var(--cream-dim)'}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Address bar */}
        <div style={{
          background: 'rgba(255,107,53,0.05)',
          border: '1px solid rgba(255,107,53,0.1)',
          borderRadius: 14,
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>📍</span>
            <div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                fontSize: 15,
                color: 'var(--cream)',
              }}>MG Road, Guntur, Andhra Pradesh — 522001</div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                color: 'var(--amber)',
                letterSpacing: 1,
              }}>MON–SUN: 11:00 AM – 11:00 PM</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>📞</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--cream-muted)' }}>+91 98765 43210</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>✉️</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--cream-muted)' }}>hello@burgerbuzz.in</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 11,
            color: 'var(--cream-dim)',
            letterSpacing: 0.5,
          }}>
            © 2025 Burger Buzz, Guntur. All rights reserved.
          </div>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 11,
            color: 'var(--cream-dim)',
          }}>
            Made with ❤️ & 🍔 in Andhra Pradesh
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 30px !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
