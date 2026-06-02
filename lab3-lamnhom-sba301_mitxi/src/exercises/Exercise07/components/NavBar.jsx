import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">⚛️ SBA301</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <NavLink
              to="/"
              data-testid="nav-home"
              className={({ isActive }) => (isActive ? 'nav-link active fw-bold' : 'nav-link')}
              end
            >
              Trang Chủ
            </NavLink>
            <NavLink
              to="/about"
              data-testid="nav-about"
              className={({ isActive }) => (isActive ? 'nav-link active fw-bold' : 'nav-link')}
            >
              Giới Thiệu
            </NavLink>
            <NavLink
              to="/contact"
              data-testid="nav-contact"
              className={({ isActive }) => (isActive ? 'nav-link active fw-bold' : 'nav-link')}
            >
              Liên Hệ
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
