import { createContext, useContext, useState } from 'react'
import USERS from '../data/users'

/**
 * AuthContext.jsx – Context quản lý trạng thái đăng nhập (Bài 2)
 *
 * Quản lý: user, loading, error
 * Hàm: login(), logout()
 *
 * Export: AuthProvider, useAuth
 */

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (email, password) => {
    setLoading(true)
    setError('')

    // Giả lập API call 800ms
    await new Promise(resolve => setTimeout(resolve, 800))

    const foundUser = USERS.find(u => u.email === email && u.password === password)

    if (foundUser) {
      setUser(foundUser)
      setLoading(false)
    } else {
      setError('Email hoặc mật khẩu không đúng.')
      setUser(null)
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setError('')
  }

  const value = { user, loading, error, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
