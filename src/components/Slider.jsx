import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import popularItems from '../data/PopularItems'

function Slider() {
  return (
    <div className="slider">
      {popularItems.map(item => (
        <motion.div key={item.id} className="slider-item" whileHover={{ scale:1.05 }}>
          <Link to={`/product/${item.id}`}>
            <img src={item.image} alt={item.name}/>
            <h3>{item.name}</h3>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default Slider
