import React, { useContext } from 'react'
import { CartContext } from '../CartContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)
  return (
    <motion.div className="product-card" whileHover={{ scale:1.02 }}>
      <div className="info" style={{display:'flex',alignItems:'center'}}>
        <img src={product.image} alt={product.name}/>
        <div>
          <h4>{product.name}</h4>
          <p>${product.price.toFixed(2)}</p>
          <Link to={`/product/${product.id}`}>View Details</Link>
        </div>
      </div>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </motion.div>
  )
}

export default ProductCard
