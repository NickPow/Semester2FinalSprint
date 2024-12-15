import React, { useContext } from 'react'
import { CartContext } from '../CartContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function CartPage() {
  const { cart, setCart, removeFromCart } = useContext(CartContext)

  const updateQuantity = (id, increment) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) + increment
        return {...item, quantity: newQty > 0 ? newQty : 1}
      }
      return item
    }))
  }

  const subtotal = cart.reduce((a,c)=>a+c.price*(c.quantity||1),0)
  const tax = subtotal * 0.07
  const total = subtotal + tax

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="main-content cart-page">
        <h2>Your Cart</h2>
        {cart.length===0 && <p>Cart is empty</p>}
        {cart.length>0 && (
          <>
            <div className="product-list">
              {cart.map(i => (
                <div key={i.id} className="cart-item-row">
                  <div className="info" style={{display:'flex',alignItems:'center'}}>
                    <img src={i.image} alt={i.name} />
                    <div>
                      <h4>{i.name}</h4>
                      <p>${i.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <button onClick={()=>updateQuantity(i.id, -1)}>-</button>
                    <span>{i.quantity || 1}</span>
                    <button onClick={()=>updateQuantity(i.id, 1)}>+</button>
                    <button onClick={()=>removeFromCart(i.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="totals">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <h3>Total: ${total.toFixed(2)}</h3>
              <Link to="/checkout" className="button">Proceed to Checkout</Link>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default CartPage
