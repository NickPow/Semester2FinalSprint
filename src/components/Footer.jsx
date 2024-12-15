import React from 'react'
import { motion } from 'framer-motion'

function Footer() {
  return (
    <motion.footer initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="footer">
      <p>&copy; {new Date().getFullYear()} Nicks Collectible Store</p>
    </motion.footer>
  )
}

export default Footer
