/**
 * FormField.jsx – Input field tái sử dụng cho form đăng ký (Bài 3)
 *
 * Props:
 *   - name        : string – tên field
 *   - label       : string – nhãn hiển thị
 *   - type        : string – loại input ('text' | 'email' | 'password'), mặc định 'text'
 *   - placeholder : string – placeholder text
 */
import { useFormContext } from '../../context/FormContext'

export default function FormField({ name, label, type = 'text', placeholder }) {
  const { state, dispatch } = useFormContext()

  const value = state.values[name]
  const error = state.errors[name]
  const touched = state.touched[name]

  const showError = touched && error

  const handleChange = (e) => {
    dispatch({ type: 'CHANGE', field: name, value: e.target.value })
  }

  const handleBlur = () => {
    dispatch({ type: 'BLUR', field: name })
  }

  const borderColor = showError ? 'red' : (touched && !error ? 'green' : '#ccc')

  return (
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          width: '100%',
          padding: '8px',
          border: `1px solid ${borderColor}`,
          borderRadius: '4px',
          boxSizing: 'border-box',
        }}
      />
      {showError && (
        <span style={{ color: 'red', fontSize: '13px' }}>{error}</span>
      )}
    </div>
  )
}
