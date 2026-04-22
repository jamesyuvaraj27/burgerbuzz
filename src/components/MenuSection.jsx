import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuItems, burgerCategories } from '../data/menuData'
import BurgerCard from './BurgerCard'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(m => m.category === activeCategory)

  const handleCustomize = (item) => {
    document.querySelector('#customizer')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="menu" className="section" style={{ position: 'relative', zIndex: 6 }}>
      {/* BG glow */}
      <div className="glow-orb" style={{
        width: 700,
        height: 700,
        background: 'radial-gradient(circle, rgba(255,179,71,0.05) 0%, transparent 70%)',
        top: '30%',
        right: '-150px',
      }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
          <div className="section-overline" style={{ justifyContent: 'center' }}>
            Our Menu
          </div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Crafted for Every{' '}
            <span className="gradient-text" style={{ fontStyle: 'italic' }}>Craving</span>
          </h2>
          <p style={{ color: 'var(--cream-muted)', maxWidth: 500, margin: '0 auto', fontSize: 16 }}>
            From flame-grilled classics to gourmet premium creations — every burger is a story.
          </p>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          marginBottom: 50,
          flexWrap: 'wrap',
        }}>
          {burgerCategories.map((cat) => {
            const active = cat === activeCategory
            const emoji = { All: '🍔', Classic: '⭐', Premium: '👑', Chicken: '🍗', Veggie: '🌱' }[cat]
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-full)',
                  background: active
                    ? 'linear-gradient(135deg, #FF6B35, #FFB347)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? 'transparent' : 'var(--border-subtle)'}`,
                  color: active ? '#080808' : 'var(--cream-muted)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 11,
                  fontWeight: active ? 700 : 400,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: active ? '0 4px 20px rgba(255,107,53,0.3)' : 'none',
                }}
              >
                {emoji} {cat}
              </motion.button>
            )
          })}
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 28,
            }}
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <BurgerCard item={item} onCustomize={handleCustomize} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 11,
            color: 'var(--cream-dim)',
            letterSpacing: 2,
          }}>
            ALL PRICES INCLUSIVE OF TAXES · SUBJECT TO AVAILABILITY
          </p>
        </div>
      </div>
    </section>
  )
}
