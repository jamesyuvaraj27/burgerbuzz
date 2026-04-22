import { motion } from 'framer-motion'

const items = [
  '🍔 Classic Buzz', '⭐ Wagyu Boss', '🔥 Spicy Inferno',
  '🏆 Award Winning', '🌱 Plant-Based Options', '🥇 #1 in Andhra Pradesh',
  '💯 Fresh Daily', '🍟 Loaded Fries', '🎉 Weekend Combos',
  '🥩 100% Fresh Beef', '🧀 Premium Cheese', '🎓 Student Special',
]

const ticker = [...items, ...items, ...items]

export default function Marquee() {
  return (
    <div style={{
      background: 'var(--amber)',
      overflow: 'hidden',
      padding: '14px 0',
      position: 'relative',
      zIndex: 6,
    }}>
      <motion.div
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap' }}
      >
        {ticker.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: 18,
              letterSpacing: 3,
              color: '#080808',
              padding: '0 28px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {item}
            <span style={{ opacity: 0.3 }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
