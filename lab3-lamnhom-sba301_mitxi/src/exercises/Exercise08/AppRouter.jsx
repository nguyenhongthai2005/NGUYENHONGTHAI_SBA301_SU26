import { MemoryRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

export default function AppRouter() {
  return (
    <MemoryRouter>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            🛍️ Cửa Hàng
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Sản Phẩm
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
}
