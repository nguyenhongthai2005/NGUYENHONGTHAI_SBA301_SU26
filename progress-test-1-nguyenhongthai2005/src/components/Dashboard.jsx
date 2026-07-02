import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { state, dispatch } = useAuth()
  const { user } = state

  if (!user) return null

  return (
    <Card className="p-4 shadow-sm" style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h3 className="mb-4">Xin chào, {user.name}</h3>
      <div className="mb-4">
        <strong>Vai trò: </strong>
        <Badge bg={user.role === 'admin' ? 'danger' : 'success'}>
          {user.role}
        </Badge>
      </div>

      <div className="d-flex gap-2">
        {user.role === 'admin' && (
          <Link to="/users" className="btn btn-outline-primary">
            Xem danh sách Users
          </Link>
        )}
        <Button variant="danger" onClick={() => dispatch({ type: 'LOGOUT' })}>
          Đăng xuất
        </Button>
      </div>
    </Card>
  )
}
