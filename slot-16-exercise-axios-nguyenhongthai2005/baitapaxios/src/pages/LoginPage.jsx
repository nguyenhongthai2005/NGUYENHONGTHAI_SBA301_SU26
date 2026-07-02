import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { UserCircle } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Đã đăng nhập thì chuyển hướng vào trang quản lý
  useEffect(() => {
    if (currentUser) {
      navigate('/users');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/users');
    }
  };

  return (
    <div className="login-bg d-flex align-items-center min-vh-100 bg-light">
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <UserCircle size={64} className="text-primary mb-3" />
                  <h3 className="fw-bold">Đăng nhập</h3>
                  <p className="text-muted">Hệ thống Quản lý Người dùng</p>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      isInvalid={!!error}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={!!error}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {error}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit" disabled={loading} className="fw-semibold">
                      {loading ? 'Đang xác thực...' : 'Đăng nhập'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
