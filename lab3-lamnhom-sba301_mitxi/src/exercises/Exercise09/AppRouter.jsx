import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';

export default function AppRouter() {
  return (
    <MemoryRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>📰 Blog Lập Trình</Navbar.Brand>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </MemoryRouter>
  );
}
