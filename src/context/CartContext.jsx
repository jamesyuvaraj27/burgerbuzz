import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((item) => {
    setItems(prev => {
      const qtyToAdd = item.qty ?? 1
      const existing = prev.find(i => i.cartId === item.cartId)
      if (existing) {
        return prev.map(i =>
          i.cartId === item.cartId ? { ...i, qty: i.qty + qtyToAdd } : i
        )
      }
      return [...prev, { ...item, qty: qtyToAdd }]
    })
  }, [])

  const removeItem = useCallback((cartId) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId))
  }, [])

  const updateQty = useCallback((cartId, delta) => {
    setItems(prev =>
      prev
        .map(i => i.cartId === cartId ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  )
  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  )

  const value = useMemo(() => ({
    items, addItem, removeItem, updateQty, clearCart,
    total, count, isOpen, setIsOpen
  }), [items, addItem, removeItem, updateQty, clearCart, total, count, isOpen])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
