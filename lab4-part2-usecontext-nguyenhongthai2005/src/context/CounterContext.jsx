import { createContext, useContext, useState } from 'react'

/**
 * CounterContext.jsx – Context quản lý state đếm (Bài 1)
 *
 * Tạo CounterContext với:
 * - count: số đếm
 * - increment, decrement, reset: các hàm thay đổi count
 *
 * Export: CounterProvider, useCounter
 */

const CounterContext = createContext()

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  const value = { count, increment, decrement, reset }

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  )
}

export function useCounter() {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider')
  }
  return context
}
