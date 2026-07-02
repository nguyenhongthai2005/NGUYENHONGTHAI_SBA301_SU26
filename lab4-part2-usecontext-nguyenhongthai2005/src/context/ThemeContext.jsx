/**
 * ThemeContext.jsx – Context quản lý theme (Bài 4)
 */
import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { themes, STORAGE_KEY } from '../data/themeConfig'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'system'
  })

  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      setSystemPrefersDark(e.matches)
    }

    // fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  const resolvedTheme = mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode
  const colors = themes[resolvedTheme]

  const changeMode = (newMode) => {
    setMode(newMode)
    localStorage.setItem(STORAGE_KEY, newMode)
  }

  const value = useMemo(
    () => ({
      mode,
      resolvedTheme,
      colors,
      changeMode,
    }),
    [mode, resolvedTheme, colors]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error('useTheme phải được dùng bên trong ThemeProvider')
  }
  return context
}

export default ThemeContext
