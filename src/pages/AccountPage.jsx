import React, { useContext, useState } from 'react'
import { AuthContext } from '../AuthContext'
import { motion } from 'framer-motion'
import { updateUser } from '../api'

function AccountPage() {
  const { user, logout, setUser } = useContext(AuthContext)
  const [oldPassword, setOldPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [address, setAddress] = useState(user.address || '')
  const [city, setCity] = useState(user.city || '')
  const [province, setProvince] = useState(user.province || '')
  const [postal, setPostal] = useState(user.postal || '')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleUpdate = async () => {
    setError(null)
    setMessage(null)
    try {
      const updatedUser = await updateUser(user.id, oldPassword, newUsername, newPassword, address, city, province, postal)
      setUser(updatedUser)
      setMessage('User information updated successfully!')
      setOldPassword('')
      setNewUsername('')
      setNewPassword('')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="main-content account-page">
        <h2>My Account</h2>
        <p>Username: {user.username}</p>
        <p>Address: {user.address || 'Not provided'}</p>
        <p>City: {user.city || 'Not provided'}</p>
        <p>Province: {user.province || 'Not provided'}</p>
        <p>Postal Code: {user.postal || 'Not provided'}</p>
        <button onClick={logout}>Logout</button>

        <h3 style={{marginTop:'20px'}}>Update Account Info</h3>
        {message && <p style={{color:'green'}}>{message}</p>}
        {error && <p style={{color:'red'}}>{error}</p>}

        <input 
          type="password" 
          placeholder="Current Password" 
          value={oldPassword} 
          onChange={e=>setOldPassword(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="New Username (optional)" 
          value={newUsername} 
          onChange={e=>setNewUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="New Password (optional)" 
          value={newPassword} 
          onChange={e=>setNewPassword(e.target.value)}
        />
        
        <h4 style={{marginTop:'20px'}}>Shipping Info</h4>
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={e=>setAddress(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="City" 
          value={city} 
          onChange={e=>setCity(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Province" 
          value={province} 
          onChange={e=>setProvince(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Postal Code" 
          value={postal} 
          onChange={e=>setPostal(e.target.value)}
        />

        <button onClick={handleUpdate}>Update</button>
      </div>
    </motion.div>
  )
}

export default AccountPage
