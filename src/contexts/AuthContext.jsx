import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const userData = localStorage.getItem('userData')
    
    if (isLoggedIn === 'true' && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userData', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userData')
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

