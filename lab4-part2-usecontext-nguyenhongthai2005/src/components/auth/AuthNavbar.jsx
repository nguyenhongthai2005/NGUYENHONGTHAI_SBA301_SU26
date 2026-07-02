import { useAuth } from '../../context/AuthContext'

/**
 * AuthNavbar.jsx – Thanh điều hướng hiển thị thông tin đăng nhập (Bài 2)
 *
 * Hiển thị tên user + nút đăng xuất nếu đã login
 * Hiển thị "Chưa đăng nhập" nếu chưa
 */
export default function AuthNavbar() {
  const { user, logout } = useAuth()

  return (
    <div className="auth-navbar">
      {user ? (
        <div>
          <span>{user.name}</span>
          <button onClick={logout}>Đăng xuất</button>
        </div>
      ) : (
        <span>Chưa đăng nhập</span>
      )}
    </div>
  )
}
