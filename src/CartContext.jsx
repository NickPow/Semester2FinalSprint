import React, { createContext, useEffect, useState } from 'react'
import { getCart, addCartItem, removeCartItem } from './api'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    getCart().then(setCart)
  }, [])

  const addToCart = async (product) => {
    const newItem = await addCartItem({ ...product, quantity: 1 })
    setCart([...cart, newItem])
    // Show notification
    setNotification("Item added to cart!")
    setTimeout(() => setNotification(null), 3000)
  }

  const removeFromCart = async (id) => {
    await removeCartItem(id)
    setCart(cart.filter(i => i.id !== id))
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, notification }}>
      {children}
    </CartContext.Provider>
  )
}
