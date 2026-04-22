import { useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import Lenis from '@studio-freight/lenis'
import { CartProvider, useCart } from './context/CartContext'
import CartDrawer from './components/CartDrawer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Stats from './components/Stats'
import MenuSection from './components/MenuSection'
import Popular from './components/Popular'
import HowItsMade from './components/HowItsMade'
import Offers from './components/Offers'
import Snacks from './components/Snacks'
import Facts from './components/Facts'
import Customizer from './components/Customizer'
import Testimonials from './components/Testimonials'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function AppInner() {
  const lenisRef = useRef(null)
  const { isOpen } = useCart()

  // Smooth scroll - disabled when cart is open to avoid conflict
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    })
    lenisRef.current = lenis
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    if (isOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [isOpen])

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = parseFloat(e.target.dataset.delay || 0)
            setTimeout(() => e.target.classList.add('visible'), delay * 1000)
          }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111', color: '#FFF3E0',
            border: '1px solid rgba(255,107,53,0.3)',
            fontFamily: 'Space Mono, monospace', fontSize: '12px',
          },
        }}
      />
      <CartDrawer />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <MenuSection />
        <Popular />
        <HowItsMade />
        <Offers />
        <Snacks />
        <Facts />
        <Customizer />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}
