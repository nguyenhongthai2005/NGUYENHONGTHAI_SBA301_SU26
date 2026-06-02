import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { products } from '../../../data/products';

export default function ProductList() {
  return (
    <Container className="mt-4" data-testid="product-list-page">
      <h4 className="mb-4">🛍️ Danh Sách Sản Phẩm</h4>

      <Row className="g-3">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: 160, objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Badge bg="info" className="mb-2 align-self-start">
                  {product.category}
                </Badge>
                <Card.Title style={{ fontSize: '0.9rem' }}>{product.name}</Card.Title>
                <div className="fw-bold text-danger mb-auto">
                  {product.price.toLocaleString('vi-VN')}đ
                </div>

                <Button
                  as={Link}
                  to={`/products/${product.id}`}
                  variant="outline-primary"
                  size="sm"
                  className="mt-2"
                  data-testid={`product-link-${product.id}`}
                >
                  Xem Chi Tiết
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
