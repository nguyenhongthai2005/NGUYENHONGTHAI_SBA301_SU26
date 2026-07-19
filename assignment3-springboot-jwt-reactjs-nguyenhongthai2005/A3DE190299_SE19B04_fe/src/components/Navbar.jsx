import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const NavigationBar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">FUMiniHotelSystem</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {user?.role === 'ROLE_CUSTOMER' && (
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link as={Link} to="/history">History</Nav.Link>
                            </>
                        )}
                        {user?.role === 'ROLE_STAFF' && (
                            <>
                                <Nav.Link as={Link} to="/admin/customers">Customers</Nav.Link>
                                <Nav.Link as={Link} to="/admin/rooms">Rooms</Nav.Link>
                                <Nav.Link as={Link} to="/admin/bookings">Bookings</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {user ? (
                            <Button variant="outline-light" onClick={logout}>Logout ({user.email})</Button>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
