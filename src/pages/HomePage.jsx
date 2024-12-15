import React from 'react'
import { motion } from 'framer-motion'
import Slider from '../components/Slider'

function HomePage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="main-content home-page">
        <h1>Welcome to Nicks Collectible Store!</h1>
        <p>Check out our popular items:</p>
        <div className="slider-wrapper">
          <Slider />
        </div>
        <br />
        <h2>About us:</h2>
        <p>Nicks Collectible Store started out as a school project while Nick was in school for software development.<br /> Making a e-commerce website
            was a project that Nick had to do and he decided to make a collectible store site.<br /> As the project continued Nick decided to make it a real shop. About Us page coming soon...
        </p>
      </div>
    </motion.div>
  )
}

export default HomePage
