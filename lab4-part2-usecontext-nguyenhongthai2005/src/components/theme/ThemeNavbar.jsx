/**
 * ThemeNavbar.jsx – Thanh chọn theme (Bài 4)
 */
import { useTheme } from '../../context/ThemeContext'
import { THEME_MODES, THEME_LABELS } from '../../data/themeConfig'

export default function ThemeNavbar() {
  const { mode, resolvedTheme, colors, changeMode } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div>
        <strong>Theme Switcher</strong>
        <span style={{ marginLeft: '12px', fontSize: '14px', color: colors.textMuted }}>
          Current: {resolvedTheme}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {THEME_MODES.map((m) => {
          const isActive = m === mode
          return (
            <button
              key={m}
              onClick={() => changeMode(m)}
              style={{
                padding: '8px 16px',
                border: `1px solid ${isActive ? colors.primary : colors.border}`,
                backgroundColor: isActive ? colors.primary : colors.background,
                color: isActive ? colors.primaryText : colors.text,
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: isActive ? 'bold' : 'normal',
              }}
              aria-label={THEME_LABELS[m]}
            >
              {m === 'light' ? 'Sáng' : m === 'dark' ? 'Tối' : 'Hệ thống'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
