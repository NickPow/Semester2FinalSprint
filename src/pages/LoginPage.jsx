import React, { useState, useContext } from 'react'
import { AuthContext } from '../AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function LoginPage() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const { login } = useContext(AuthContext)
  const [error,setError]=useState(null)
  const navigate=useNavigate()

  const handleLogin=async()=>{
    try{
      await login(username,password)
      navigate('/account')
    }catch(e){
      setError(e.message)
    }
  }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="main-content auth-page">
        <h2>Login</h2>
        {error&&<p style={{color:'red'}}>{error}</p>}
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button onClick={handleLogin}>Login</button>
        <p style={{marginTop:'10px'}}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage
