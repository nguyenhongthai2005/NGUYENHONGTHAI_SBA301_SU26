import { AuthProvider, useAuth } from '../context/AuthContext'
import AuthNavbar from '../components/auth/AuthNavbar'
import LoginForm from '../components/auth/LoginForm'
import Dashboard from '../components/auth/Dashboard'

/**
 * Ex02LoginPage.jsx – Trang bài 2: Login Form
 *
 * Bọc trong AuthProvider.
 * Render AuthNavbar luôn, chuyển đổi giữa LoginForm và Dashboard theo user state.
 */

function PageContent() {
  const { user } = useAuth()

  return (
    <div className="ex02-login-page">
      <h1>Bài 2 – Login Form</h1>
      <AuthNavbar />
      {user ? <Dashboard /> : <LoginForm />}
    </div>
  )
}

export default function Ex02LoginPage() {
  return (
    <AuthProvider>
      <PageContent />
    </AuthProvider>
  )
}
