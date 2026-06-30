import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppNavBar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  // Extract role for display if user is logged in
  let displayRole = '';
  if (user) {
    const authorities = user.authorities || user.roles || user.role || [];
    if (Array.isArray(authorities) && authorities.length > 0) {
      displayRole = typeof authorities[0] === 'object' ? authorities[0].authority : authorities[0];
    } else if (typeof authorities === 'string') {
      displayRole = authorities;
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Orchid Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {token && (
              <Nav.Link as={Link} to="/add">Add Orchid</Nav.Link>
            )}
          </Nav>
          <Nav>
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                <Nav.Link as={Link} to="/signup">Đăng ký</Nav.Link>
              </>
            ) : (
              <>
                <Navbar.Text className="me-3">
                  Signed in as: {user?.sub || 'User'} {displayRole ? `(${displayRole})` : ''}
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={logout}>Đăng xuất</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
