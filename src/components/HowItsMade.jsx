import { motion } from 'framer-motion'
import { howItsMade } from '../data/menuData'

export default function HowItsMade() {
  return (
    <section className="section" style={{
      position: 'relative',
      zIndex: 6,
      overflow: 'hidden',
      background: 'rgba(10,10,10,0.5)',
    }}>
      {/* Decorative lines */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: 1,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(255,107,53,0.1) 20%, rgba(255,107,53,0.1) 80%, transparent 100%)',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} className="center-line" />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 80 }} className="reveal">
          <div className="section-overline" style={{ justifyContent: 'center' }}>The Craft</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            How We Make{' '}
            <span className="gradient-text" style={{ fontStyle: 'italic' }}>Magic</span>
          </h2>
          <p style={{ color: 'var(--cream-muted)', maxWidth: 480, margin: '0 auto', fontSize: 16 }}>
            Every Burger Buzz creation goes through four sacred steps of craftsmanship.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {howItsMade.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: 60,
                alignItems: 'center',
                direction: i % 2 !== 0 ? 'rtl' : 'ltr',
              }}
              className="step-grid"
            >
              {/* Text */}
              <div style={{ direction: 'ltr' }}>
                <div style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: 100,
                  color: `${step.color}15`,
                  lineHeight: 0.9,
                  marginBottom: 8,
                }}>{step.step}</div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 11,
                  letterSpacing: 3,
                  color: step.color,
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}>Step {step.step}</div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}>
                  {step.title}
                </h3>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 12,
                  color: step.color,
                  letterSpacing: 1,
                  marginBottom: 16,
                }}>{step.subtitle}</div>
                <p style={{
                  color: 'var(--cream-muted)',
                  lineHeight: 1.8,
                  fontSize: 16,
                  maxWidth: 450,
                }}>
                  {step.description}
                </p>
              </div>

              {/* Image */}
              <div style={{
                borderRadius: 24,
                overflow: 'hidden',
                height: 340,
                position: 'relative',
                border: `1px solid ${step.color}25`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 60px ${step.color}10`,
              }}>
                <img
                  src={step.image}
                  alt={step.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Color overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, ${step.color}15 0%, transparent 60%)`,
                }} />
                {/* Step number watermark */}
                <div style={{
                  position: 'absolute',
                  bottom: 16,
                  right: 20,
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: 60,
                  color: 'rgba(255,255,255,0.1)',
                  lineHeight: 1,
                }}>{step.step}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .step-grid { grid-template-columns: 1fr !important; direction: ltr !important; gap: 30px !important; }
          .center-line { display: none; }
        }
      `}</style>
    </section>
  )
}
