/**
 * ThemedCard.jsx – Card tái sử dụng áp dụng màu từ context (Bài 4)
 */
import { useTheme } from '../../context/ThemeContext'

export default function ThemedCard({ title, children }) {
  const { colors } = useTheme()

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '16px',
        color: colors.text,
      }}
    >
      {title && <h3 style={{ marginTop: 0, marginBottom: '16px' }}>{title}</h3>}
      {children}
    </div>
  )
}
