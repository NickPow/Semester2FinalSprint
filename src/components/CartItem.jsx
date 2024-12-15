import React, { useContext } from 'react'
import { CartContext } from '../CartContext'

function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext)
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name}/>
      <div>
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)}</p>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  )
}

export default CartItem
