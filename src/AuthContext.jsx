import React, { createContext, useState, useEffect } from 'react'
import { loginUser } from './api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('authUser')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('authToken'))

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('authUser', JSON.stringify(user))
      localStorage.setItem('authToken', token)
    } else {
      localStorage.removeItem('authUser')
      localStorage.removeItem('authToken')
    }
  }, [user, token])

  const login = async (username, password) => {
    const { user: u, token: t } = await loginUser(username, password)
    setUser(u)
    setToken(t)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
