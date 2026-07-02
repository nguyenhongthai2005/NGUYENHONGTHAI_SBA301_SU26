import { useEffect, useState } from 'react'
import { Alert, Table, Container } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { getUsers } from '../services/userService'

export default function UserListPage() {
  const { state } = useAuth()
  const { user } = state
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user?.role === 'admin') {
      getUsers().then(data => setUsers(data))
    }
  }, [user])

  if (user?.role !== 'admin') {
    return (
      <Container className="py-5">
        <Alert variant="danger" data-testid="access-denied">
          Bạn không có quyền truy cập
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h3 className="mb-4">Danh sách người dùng</h3>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td>
                <span className={`badge bg-${u.role === 'admin' ? 'danger' : 'secondary'}`}>
                  {u.role}
                </span>
              </td>
              <td>
                <span className={`badge bg-${u.status === 'active' ? 'success' : 'warning text-dark'}`}>
                  {u.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
