import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoginForm from '../components/LoginForm'

function LoginPage() {
  const { state } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/')
    }
  }, [state.isAuthenticated, navigate])

  return <LoginForm />
}

export default LoginPage
