import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section" style={{ position: 'relative', zIndex: 6, overflow: 'hidden' }}>
      {/* Background glow */}
      <div className="glow-orb" style={{
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)',
        top: '50%',
        left: '-100px',
        transform: 'translateY(-50%)',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }} className="about-grid">

          {/* Left: Image collage */}
          <div className="reveal-left" style={{ position: 'relative', height: 560 }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '70%',
              height: '65%',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"
                alt="Signature burger"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.4) 0%, transparent 50%)',
              }} />
            </div>

            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '60%',
              height: '55%',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              border: '2px solid rgba(255,107,53,0.2)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                alt="Kitchen craft"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '52%',
                left: '60%',
                background: 'rgba(8,8,8,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,107,53,0.3)',
                borderRadius: 16,
                padding: '16px 22px',
                textAlign: 'center',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: 40,
                background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
              }}>2019</div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 9,
                letterSpacing: 2,
                color: 'rgba(255,243,224,0.5)',
                marginTop: 4,
              }}>EST. GUNTUR, AP</div>
            </motion.div>
          </div>

          {/* Right: Text content */}
          <div className="reveal-right">
            <div className="section-overline">Our Story</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              Born in Guntur,<br />
              <em style={{ fontStyle: 'italic' }}>Made for the World</em>
            </h2>
            <p style={{
              color: 'var(--cream-muted)',
              lineHeight: 1.8,
              fontSize: 16,
              marginBottom: 20,
            }}>
              Burger Buzz started as a dream in a tiny kitchen in Guntur, Andhra Pradesh. 
              Our founder, a self-taught chef obsessed with the perfect burger, spent two 
              years perfecting the art before opening our first outlet in 2019.
            </p>
            <p style={{
              color: 'var(--cream-muted)',
              lineHeight: 1.8,
              fontSize: 16,
              marginBottom: 36,
            }}>
              Today, every burger we serve is a testament to that obsession — fresh beef 
              ground daily, buns baked every morning, sauces crafted from scratch. We don't 
              take shortcuts because <strong style={{ color: 'var(--cream)' }}>you deserve the best.</strong>
            </p>

            {/* Values */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🌿', text: 'Farm-fresh ingredients sourced locally every morning' },
                { icon: '🔥', text: 'Flame-grilled at 450°C for the perfect char and juiciness' },
                { icon: '❤️', text: 'Every burger handcrafted by our trained Burger Artists' },
              ].map((v, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{
                    fontSize: 22,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,107,53,0.1)',
                    borderRadius: 10,
                    flexShrink: 0,
                  }}>{v.icon}</span>
                  <span style={{ color: 'var(--cream-muted)', fontSize: 15 }}>{v.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-grid > div:first-child { height: 280px !important; }
        }
      `}</style>
    </section>
  )
}
