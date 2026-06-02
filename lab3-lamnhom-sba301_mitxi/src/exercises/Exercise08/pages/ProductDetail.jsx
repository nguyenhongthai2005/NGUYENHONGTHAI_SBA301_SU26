import { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../../data/products';

export default function ProductDetail() {
  // TODO 1: Lấy `id` từ URL params bằng hook useParams()
  //         Lưu ý: id từ params là string, cần chuyển sang số khi so sánh
  const { id } = useParams();

  // TODO 2: Khai báo biến `navigate` bằng hook useNavigate()
  const navigate = useNavigate();

  // TODO 3: Tìm `product` trong mảng products có id === Number(id)
  const product = products.find((item) => item.id === Number(id));

  // TODO 4: Nếu không tìm thấy product, navigate đến '/404'
  useEffect(() => {
    if (id && !product) {
      navigate('/404');
    }
  }, [id, product, navigate]);

  if (!product) {
    return null;
  }

  return (
    <Container className="mt-4" data-testid="product-detail">
      <Button
        variant="outline-secondary"
        className="mb-4"
        data-testid="back-btn"
        onClick={() => { navigate(-1); }}
      >
        ← Quay Lại
      </Button>

      <Row className="g-4">
        <Col md={5}>
          <Card.Img src={product.image} style={{ borderRadius: 8 }} />
        </Col>
        <Col md={7}>
          <h2>{product.name}</h2>
          <Badge bg="info" className="mb-3">{product.category}</Badge>
          <h3 className="text-danger">{product.price.toLocaleString('vi-VN')}đ</h3>
          <ListGroup variant="flush" className="mt-3">
            <ListGroup.Item>⭐ Đánh giá: {product.rating}/5</ListGroup.Item>
            <ListGroup.Item>📦 Còn hàng: {product.stock} sản phẩm</ListGroup.Item>
            <ListGroup.Item>🏷️ Danh mục: {product.category}</ListGroup.Item>
          </ListGroup>
          <Button variant="primary" size="lg" className="mt-4">
            Thêm vào giỏ hàng
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
