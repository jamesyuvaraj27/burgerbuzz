import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { testimonials } from '../data/menuData'

export default function Testimonials() {
  const swiperRef = useRef(null)

  useEffect(() => {
    // Load Swiper dynamically
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
    script.onload = () => {
      if (window.Swiper) {
        new window.Swiper(swiperRef.current, {
          slidesPerView: 1.1,
          spaceBetween: 20,
          centeredSlides: true,
          loop: true,
          autoplay: { delay: 4000, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', clickable: true },
          breakpoints: {
            640: { slidesPerView: 1.5 },
            900: { slidesPerView: 2.2 },
            1200: { slidesPerView: 3 },
          },
        })
      }
    }
    document.head.appendChild(script)
  }, [])

  const renderStars = (n) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < n ? '#FFB347' : 'rgba(255,179,71,0.2)', fontSize: 14 }}>★</span>
    ))

  return (
    <section className="section" style={{ position: 'relative', zIndex: 6, overflow: 'hidden' }}>
      <div className="glow-orb" style={{
        width: 700,
        height: 500,
        background: 'radial-gradient(ellipse, rgba(255,179,71,0.05) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }} />

      <div className="container" style={{ marginBottom: 50 }}>
        <div style={{ textAlign: 'center' }} className="reveal">
          <div className="section-overline" style={{ justifyContent: 'center' }}>Love Letters</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            What Our Fans{' '}
            <span className="gradient-text" style={{ fontStyle: 'italic' }}>Say</span>
          </h2>
          <p style={{ color: 'var(--cream-muted)', maxWidth: 480, margin: '0 auto', fontSize: 16 }}>
            Real reviews from real Burger Buzz lovers in Guntur and beyond.
          </p>
        </div>
      </div>

      {/* Swiper */}
      <div ref={swiperRef} className="swiper" style={{ paddingBottom: 50 }}>
        <div className="swiper-wrapper">
          {testimonials.map((t) => (
            <div key={t.id} className="swiper-slide">
              <div style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(18px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 20,
                padding: '28px 26px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                transition: 'border-color 0.3s',
                margin: '10px 0',
              }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: 2 }}>{renderStars(t.rating)}</div>

                {/* Quote */}
                <div style={{ position: 'relative', flex: 1 }}>
                  <span style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 60,
                    color: 'rgba(255,107,53,0.15)',
                    lineHeight: 0.8,
                    position: 'absolute',
                    top: -8,
                    left: -6,
                  }}>"</span>
                  <p style={{
                    fontSize: 14,
                    color: 'var(--cream-muted)',
                    lineHeight: 1.7,
                    paddingTop: 20,
                    paddingLeft: 4,
                    fontStyle: 'italic',
                  }}>{t.text}</p>
                </div>

                {/* Burger tag */}
                <div style={{
                  background: 'rgba(255,107,53,0.08)',
                  border: '1px solid rgba(255,107,53,0.15)',
                  borderRadius: 8,
                  padding: '6px 12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  alignSelf: 'flex-start',
                }}>
                  <span style={{ fontSize: 12 }}>🍔</span>
                  <span style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 10,
                    color: 'var(--amber)',
                    letterSpacing: 0.5,
                  }}>{t.burger}</span>
                </div>

                {/* User */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(255,107,53,0.3)',
                    }}
                  />
                  <div>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--cream)',
                    }}>{t.name}</div>
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 10,
                      color: 'var(--cream-dim)',
                      letterSpacing: 0.5,
                    }}>{t.location} · {t.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination" style={{ position: 'relative', marginTop: 24 }} />
      </div>

      {/* Aggregate rating */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
            background: 'var(--bg-card)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,179,71,0.15)',
            borderRadius: 20,
            padding: '28px 40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { platform: 'Zomato', rating: '4.8', reviews: '2.1K', color: '#E23744', emoji: '🍽️' },
            { platform: 'Swiggy', rating: '4.7', reviews: '1.8K', color: '#FC8019', emoji: '🛵' },
            { platform: 'Google', rating: '4.9', reviews: '934', color: '#4285F4', emoji: '🔍' },
          ].map((p) => (
            <div key={p.platform} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{p.emoji}</div>
              <div style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: 42,
                color: p.color,
                lineHeight: 1,
              }}>{p.rating}</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--cream)',
                marginTop: 2,
              }}>{p.platform}</div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                color: 'var(--cream-dim)',
              }}>{p.reviews} reviews</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
