/**
 * RegistrationForm.jsx – Form đăng ký với validation (Bài 3)
 */
import { useFormContext } from '../../context/FormContext'
import FormField from './FormField'
import { validateField } from '../../utils/validators'

export default function RegistrationForm() {
  const { state, dispatch } = useFormContext()
  const { errors, status } = state

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. Validate toàn bộ field và hiển thị lỗi
    dispatch({ type: 'VALIDATE_ALL' })

    // 2. Kiểm tra xem còn lỗi không
    // Phải tính errors từ values hiện tại thay vì dùng state.errors (chưa cập nhật)
    const { values } = state
    const fields = ['fullName', 'email', 'password', 'confirmPassword']
    const hasErrors = fields.some(
      (field) => validateField(field, values[field], values) !== ''
    )

    if (hasErrors) {
      dispatch({ type: 'SET_STATUS', status: 'error' })
      return
    }

    // 3. Không có lỗi → bắt đầu submit
    dispatch({ type: 'SET_STATUS', status: 'submitting' })

    // 4. Giả lập API call (1000ms)
    setTimeout(() => {
      dispatch({ type: 'SET_STATUS', status: 'success' })
    }, 1000)
  }

  // Khi thành công hiển thị thông báo và nút Đăng ký lại
  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <p style={{ color: 'green', fontSize: '18px', fontWeight: 'bold' }}>
          Đăng ký thành công!
        </p>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Đăng ký lại
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Đăng ký tài khoản</h2>

      <FormField
        name="fullName"
        label="Họ và tên"
        type="text"
        placeholder="Nhập họ và tên"
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="Nhập email"
      />
      <FormField
        name="password"
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu"
      />
      <FormField
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        type="password"
        placeholder="Nhập lại mật khẩu"
      />

      {status === 'error' && (
        <div style={{ color: 'red', marginBottom: '12px', padding: '8px', border: '1px solid red', borderRadius: '4px' }}>
          Vui lòng kiểm tra lại thông tin đăng ký.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{ padding: '10px 20px', cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
      >
        {status === 'submitting' ? 'Đang xử lý...' : 'Đăng ký'}
      </button>
    </form>
  )
}
