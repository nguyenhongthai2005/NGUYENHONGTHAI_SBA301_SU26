/**
 * ThemedButton.jsx – Nút bấm áp dụng màu từ context (Bài 4)
 */
import { useTheme } from '../../context/ThemeContext'

export default function ThemedButton({ children, onClick, variant = 'primary' }) {
  const { colors } = useTheme()

  const isPrimary = variant === 'primary'

  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        border: isPrimary ? 'none' : `1px solid ${colors.primary}`,
        backgroundColor: isPrimary ? colors.primary : 'transparent',
        color: isPrimary ? colors.primaryText : colors.primary,
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      {children}
    </button>
  )
}
