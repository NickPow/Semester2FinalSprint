import React, { useState } from 'react'
import { registerUser } from '../api'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function RegisterPage() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const navigate=useNavigate()

  const handleRegister=async()=>{
    try{
      await registerUser(username,password)
      navigate('/login')
    }catch(e){
      setError(e.message)
    }
  }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="main-content auth-page">
        <h2>Register</h2>
        {error&&<p style={{color:'red'}}>{error}</p>}
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button onClick={handleRegister}>Register</button>
      </div>
    </motion.div>
  )
}

export default RegisterPage
