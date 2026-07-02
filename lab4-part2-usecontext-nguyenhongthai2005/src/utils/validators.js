/**
 * validators.js – Hàm validate cho từng field của form đăng ký (Bài 3)
 *
 * @param {string} name       - tên field
 * @param {string} value      - giá trị hiện tại của field
 * @param {object} allValues  - toàn bộ values của form (dùng cho confirmPassword)
 * @returns {string}          - thông báo lỗi, hoặc '' nếu hợp lệ
 */
export function validateField(name, value, allValues = {}) {
  switch (name) {
    case 'fullName':
      if (!value || value.trim() === '') return 'Họ và tên không được để trống'
      if (value.trim().length < 3) return 'Họ và tên phải có ít nhất 3 ký tự'
      return ''

    case 'email':
      if (!value || value.trim() === '') return 'Email không được để trống'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Email không hợp lệ, sai định dạng'
      return ''

    case 'password':
      if (!value || value === '') return 'Mật khẩu không được để trống'
      if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự'
      if (!/[A-Z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ hoa'
      if (!/[0-9]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ số'
      return ''

    case 'confirmPassword':
      if (!value || value === '') return 'Xác nhận mật khẩu không được để trống'
      if (value !== allValues.password) return 'Mật khẩu xác nhận không khớp'
      return ''

    default:
      return ''
  }
}
