import { useNavigate } from 'react-router-dom'
import { Container, Card, ListGroup, Badge, Button } from 'react-bootstrap'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: 700 }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <strong>Trang chủ</strong>
          <div className="d-flex align-items-center gap-2">
            <Badge bg="success">Đã đăng nhập</Badge>
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => navigate('/')}
            >
              Logout
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <h2 className="mb-3">Chào mừng bạn đến trang chủ</h2>
          <p className="text-muted mb-4">
            Đây là trang đích sau khi đăng nhập thành công.
          </p>

          <ListGroup>
            <ListGroup.Item>✅ Dữ liệu người dùng được lấy từ <code>src/ex06/data/userData.js</code></ListGroup.Item>
            <ListGroup.Item>✅ Login dùng <code>useReducer</code> và dispatch theo action</ListGroup.Item>
            <ListGroup.Item>✅ Sau khi đăng nhập thành công hiển thị modal và chuyển hướng</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}
