import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { customizerOptions } from '../data/menuData'
import { useCart } from '../context/CartContext'

const STEPS = [
  { key: 'buns', label: 'Choose Bun', icon: '🍞', color: '#FFB347' },
  { key: 'patties', label: 'Choose Patty', icon: '🥩', color: '#FF6B35' },
  { key: 'cheese', label: 'Add Cheese', icon: '🧀', color: '#F39C12' },
  { key: 'sauces', label: 'Pick Sauce', icon: '🫙', color: '#E74C3C' },
  { key: 'toppings', label: 'Add Toppings', icon: '🥬', color: '#2ECC71' },
]
const BASE_PRICE = 199

function OptionChip({ option, selected, onToggle, multi }) {
  const isSelected = multi ? selected.includes(option.id) : selected === option.id
  return (
    <motion.button whileTap={{ scale: 0.95 }} onClick={() => onToggle(option.id)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12,
        background: isSelected ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isSelected ? 'rgba(255,107,53,0.5)' : 'var(--border-subtle)'}`,
        cursor: 'pointer', transition: 'all 0.2s',
        color: isSelected ? 'var(--amber)' : 'var(--cream-muted)',
        boxShadow: isSelected ? '0 0 16px rgba(255,107,53,0.15)' : 'none',
      }}>
      <span style={{ fontSize: 18 }}>{option.emoji}</span>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, color: isSelected ? 'var(--amber)' : 'var(--cream)', lineHeight: 1.2 }}>{option.name}</div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: option.price > 0 ? '#2ECC71' : 'var(--cream-dim)', marginTop: 2 }}>
          {option.price > 0 ? `+₹${option.price}` : 'Free'}
        </div>
      </div>
      {isSelected && <span style={{ marginLeft: 'auto', color: 'var(--amber)', fontSize: 14 }}>✓</span>}
    </motion.button>
  )
}

export default function Customizer() {
  const [step, setStep] = useState(0)
  const [selections, setSelections] = useState({
    buns: 'B1', patties: 'P1', cheese: 'C1', sauces: 'SC1', toppings: ['T1', 'T2'],
  })
  const { addItem } = useCart()

  const currentStep = STEPS[step]
  const options = customizerOptions[currentStep.key]
  const isMulti = currentStep.key === 'toppings'

  const handleToggle = (id) => {
    if (isMulti) {
      setSelections(s => ({
        ...s,
        toppings: s.toppings.includes(id) ? s.toppings.filter(t => t !== id) : [...s.toppings, id],
      }))
    } else {
      setSelections(s => ({ ...s, [currentStep.key]: id }))
    }
  }

  const allOpts = useMemo(() => Object.values(customizerOptions).flat(), [])

  const getOpt = (id) => allOpts.find(o => o.id === id)

  const totalPrice = useMemo(() => {
    let price = BASE_PRICE
    const addP = (id) => { const o = getOpt(id); if (o) price += o.price }
    addP(selections.buns); addP(selections.patties); addP(selections.cheese); addP(selections.sauces)
    selections.toppings.forEach(addP)
    return price
  }, [selections])

  const burgerLayers = useMemo(() => {
    return [
      getOpt(selections.buns),
      getOpt(selections.cheese),
      getOpt(selections.patties),
      ...selections.toppings.map(t => getOpt(t)),
      getOpt(selections.sauces),
    ].filter(Boolean)
  }, [selections])

  // Build a descriptive name from selections
  const customName = useMemo(() => {
    const patty = getOpt(selections.patties)?.name || ''
    const bun = getOpt(selections.buns)?.name || ''
    return `Custom ${patty} on ${bun}`
  }, [selections])

  const customDetails = useMemo(() => {
    const parts = []
    const bun = getOpt(selections.buns)?.name
    const patty = getOpt(selections.patties)?.name
    const cheese = getOpt(selections.cheese)?.name
    const sauce = getOpt(selections.sauces)?.name
    const tops = selections.toppings.map(t => getOpt(t)?.name).filter(Boolean)
    if (bun) parts.push(`Bun: ${bun}`)
    if (patty) parts.push(`Patty: ${patty}`)
    if (cheese && cheese !== 'No Cheese') parts.push(`Cheese: ${cheese}`)
    if (sauce) parts.push(`Sauce: ${sauce}`)
    if (tops.length) parts.push(`Toppings: ${tops.join(', ')}`)
    return parts.join(' · ')
  }, [selections])

  const customCartId = useMemo(() => {
    const toppingsKey = [...selections.toppings].sort().join('-')
    return `custom-${selections.buns}-${selections.patties}-${selections.cheese}-${selections.sauces}-${toppingsKey}`
  }, [selections])

  const handleAddToCart = () => {
    addItem({
      cartId: customCartId,
      name: customName,
      price: totalPrice,
      image: null,
      category: 'Custom Build',
      customDetails,
    })
  }

  return (
    <section id="customizer" className="section" style={{
      position: 'relative', zIndex: 6,
      background: 'linear-gradient(to bottom, rgba(8,8,8,0.35) 0%, rgba(14,14,14,0.58) 100%)',
      overflow: 'hidden',
    }}>
      <div className="glow-orb" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      }} />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
          <div className="section-overline" style={{ justifyContent: 'center' }}>Build Your Burger</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Your Burger, <span className="gradient-text" style={{ fontStyle: 'italic' }}>Your Rules</span>
          </h2>
          <p style={{ color: 'var(--cream-muted)', maxWidth: 480, margin: '0 auto', fontSize: 16 }}>
            Mix and match from our premium ingredients. Every combination is a new experience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 36, alignItems: 'start' }} className="customizer-grid">
          {/* Builder Panel */}
          <div style={{ background: 'var(--bg-card)', backdropFilter: 'blur(18px)', border: '1px solid var(--border-subtle)', borderRadius: 24, padding: 'clamp(24px,3vw,40px)' }}>
            {/* Step tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 32, flexWrap: 'wrap' }}>
              {STEPS.map((s, i) => (
                <button key={s.key} onClick={() => setStep(i)} style={{
                  flex: 1, minWidth: 90, padding: '10px 12px', borderRadius: 12,
                  background: step === i ? s.color : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${step === i ? s.color : 'var(--border-subtle)'}`,
                  color: step === i ? '#080808' : 'var(--cream-muted)',
                  fontFamily: 'Space Mono, monospace', fontSize: 10, fontWeight: 700,
                  letterSpacing: 0.5, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 16, marginBottom: 3 }}>{s.icon}</div>
                  <div>{s.label.split(' ')[1]}</div>
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
                {currentStep.icon} {currentStep.label}
              </h3>
              {isMulti && (
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--cream-dim)', letterSpacing: 1 }}>
                  Select multiple toppings
                </p>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.key}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 32 }}
              >
                {options.map(opt => (
                  <OptionChip key={opt.id} option={opt}
                    selected={isMulti ? selections.toppings : selections[currentStep.key]}
                    onToggle={handleToggle} multi={isMulti}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
                className="btn-outline"
                style={{ opacity: step === 0 ? 0.3 : 1, cursor: step === 0 ? 'not-allowed' : 'pointer' }}>
                ← Back
              </button>
              <div style={{ display: 'flex', gap: 6 }}>
                {STEPS.map((_, i) => (
                  <div key={i} onClick={() => setStep(i)} style={{
                    width: i === step ? 20 : 6, height: 6, borderRadius: 3,
                    background: i <= step ? 'var(--amber)' : 'var(--border-subtle)',
                    transition: 'all 0.3s', cursor: 'pointer',
                  }} />
                ))}
              </div>
              {step < STEPS.length - 1
                ? <button onClick={() => setStep(s => s + 1)} className="btn-primary">Next →</button>
                : <button onClick={handleAddToCart} className="btn-primary">
                    Add to Cart
                  </button>
              }
            </div>
          </div>

          {/* Live Preview Panel */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            backdropFilter: 'blur(18px)', borderRadius: 24, padding: '28px 24px', position: 'sticky', top: 100,
          }}>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, marginBottom: 4, textAlign: 'center' }}>
              Your Burger
            </h4>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <span style={{
                fontFamily: 'Space Mono, monospace', fontSize: 10,
                color: 'var(--amber)', letterSpacing: 1,
              }}>{customName}</span>
            </div>

            {/* Stack visual */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 2, padding: '16px 0', minHeight: 220, justifyContent: 'center',
            }}>
              <AnimatePresence>
                {[...burgerLayers].reverse().map((layer, i) => (
                  <motion.div key={layer.id + i}
                    initial={{ opacity: 0, x: -20, y: -10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '7px 14px',
                      background: 'rgba(255,255,255,0.03)', borderRadius: 10,
                      width: '100%', border: '1px solid rgba(255,255,255,0.04)',
                    }}>
                    <span style={{ fontSize: 18 }}>{layer.emoji}</span>
                    <span style={{ fontSize: 12, color: 'var(--cream-muted)', flex: 1 }}>{layer.name}</span>
                    {layer.price > 0 && (
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#2ECC71' }}>
                        +₹{layer.price}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '14px 0' }} />

            {/* Price breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--cream-dim)' }}>Base Price</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--cream-muted)' }}>₹{BASE_PRICE}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--cream-dim)' }}>Add-ons</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#2ECC71' }}>+₹{totalPrice - BASE_PRICE}</span>
              </div>
              <div style={{ height: 1, background: 'var(--border-subtle)' }} />

              {/* THE PRICE DISPLAY */}
              <div style={{
                background: 'rgba(255,107,53,0.08)',
                border: '1px solid rgba(255,107,53,0.2)',
                borderRadius: 14,
                padding: '14px 16px',
                textAlign: 'center',
                marginTop: 4,
              }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--amber)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                  Price for your burger
                </div>
                <div style={{
                  fontFamily: 'Bebas Neue, cursive', fontSize: 52,
                  background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  lineHeight: 1,
                }}>₹{totalPrice}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'var(--cream-dim)', marginTop: 4 }}>
                  incl. all customizations
                </div>
              </div>
            </div>

            {/* ADD TO CART button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              style={{
                width: '100%', padding: '15px',
                background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                color: '#080808', border: 'none', borderRadius: 14,
                fontFamily: 'Bebas Neue, cursive', fontSize: 20, letterSpacing: 3,
                cursor: 'pointer', transition: 'background 0.3s',
                boxShadow: '0 4px 24px rgba(255,107,53,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              ADD TO CART
            </motion.button>

            <p style={{
              textAlign: 'center', fontFamily: 'Space Mono, monospace',
              fontSize: 10, color: 'var(--cream-dim)', marginTop: 10, letterSpacing: 0.5,
            }}>
              Manual order · We'll call to confirm 📞
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .customizer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
