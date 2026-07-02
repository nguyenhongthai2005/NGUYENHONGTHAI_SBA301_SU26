/**
 * Ex04ThemePage.jsx – Trang bài 4: Theme Switcher
 */
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import ThemeNavbar from '../components/theme/ThemeNavbar'
import ThemedCard from '../components/theme/ThemedCard'
import ThemedButton from '../components/theme/ThemedButton'
import ThemedInput from '../components/theme/ThemedInput'

function ThemePageContent() {
  const { colors } = useTheme()

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
      }}
    >
      <ThemeNavbar />
      <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ marginTop: 0 }}>Content Area</h2>
        <ThemedCard title="Card 1: Input">
          <p style={{ color: colors.textMuted }}>Đây là ví dụ về ThemedInput.</p>
          <ThemedInput placeholder="Nhập văn bản..." />
        </ThemedCard>

        <ThemedCard title="Card 2: Buttons">
          <p style={{ color: colors.textMuted }}>Đây là ví dụ về ThemedButton.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <ThemedButton variant="primary">Primary Action</ThemedButton>
            <ThemedButton variant="outline">Secondary Action</ThemedButton>
          </div>
        </ThemedCard>
      </div>
    </div>
  )
}

export default function Ex04ThemePage() {
  return (
    <ThemeProvider>
      <ThemePageContent />
    </ThemeProvider>
  )
}
