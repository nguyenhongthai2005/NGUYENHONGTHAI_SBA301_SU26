/**
 * ThemedInput.jsx – Input áp dụng màu từ context (Bài 4)
 */
import { useTheme } from '../../context/ThemeContext'

export default function ThemedInput({ placeholder }) {
  const { colors } = useTheme()

  return (
    <input
      placeholder={placeholder}
      style={{
        padding: '10px',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background,
        color: colors.text,
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
  )
}
