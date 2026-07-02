import db from '../../db.json'

const USERS = db.users

/**
 * Tìm user hợp lệ theo username và password.
 * Chỉ trả về user nếu credentials đúng VÀ status === 'active'.
 * @param {string} username
 * @param {string} password
 * @returns {Object|null}
 */
export function findUser(username, password) {
  // kiểm tra rỗng → return null
  if (!username || !password) {
    return null
  }

  // tìm user khớp username, password
  const user = USERS.find(u => u.username === username && u.password === password)

  // Nếu không tìm thấy
  if (!user) {
    return null
  }

  // Nếu tài khoản không active
  if (user.status !== 'active') {
    return null
  }

  // return user nếu tìm thấy và thoả mãn các điều kiện
  return user
}
