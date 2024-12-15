import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import { CartContext } from '../CartContext'
import { motion } from 'framer-motion'
import Notification from './Notification'

function Header() {
  const { user } = useContext(AuthContext)
  const { notification } = useContext(CartContext)

  return (
    <motion.header initial={{y:-50, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.5}} className="header">
      <div className="title">Nicks Collectible Store</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/cards">Cards</Link>
      </nav>
      <div className="extra-links">
        <Link to="/cart">Cart</Link>
        {user ? <Link to="/account">Account</Link> : <Link to="/login">Login</Link>}
      </div>
      <Notification message={notification} />
    </motion.header>
  )
}

export default Header
