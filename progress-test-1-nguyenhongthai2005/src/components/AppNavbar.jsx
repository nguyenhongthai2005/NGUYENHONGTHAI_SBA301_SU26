import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AppNavbar() {
  const { state, dispatch } = useAuth()
  const { user } = state

  if (!user) return null

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Dashboard</Nav.Link>
            {user.role === 'admin' && (
              <Nav.Link as={NavLink} to="/users">Quản lý Users</Nav.Link>
            )}
          </Nav>
          <Navbar.Text className="me-3">
            Signed in as: {user.name}
          </Navbar.Text>
          <Button variant="outline-light" size="sm" onClick={() => dispatch({ type: 'LOGOUT' })}>
            Đăng xuất
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
