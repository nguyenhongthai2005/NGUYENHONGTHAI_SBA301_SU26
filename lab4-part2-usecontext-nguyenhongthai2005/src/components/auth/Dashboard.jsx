import { useAuth } from '../../context/AuthContext'

/**
 * Dashboard.jsx – Màn hình sau khi đăng nhập thành công (Bài 2)
 *
 * Hiển thị thông tin user: tên, email, vai trò
 */
export default function Dashboard() {
  const { user } = useAuth()

  if (!user) return null

    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email.includes("admin") ? "****@example.com" : user.email}</p>
        <p><strong>Tên:</strong> User Profile</p>
      </div>
    )
}
