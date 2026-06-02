import { useState } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);

  const decrement = () => setCount((c) => Math.max(0, c - 1));

  const reset = () => setCount(0);

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <Card className="text-center shadow-sm">
          <Card.Header as="h4" className="bg-primary text-white">
            Bộ Đếm
          </Card.Header>

          <Card.Body>
            <h1 className="display-1 fw-bold" data-testid="counter-value">{count}</h1>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button
                variant="danger"
                size="lg"
                data-testid="decrement-btn"
                onClick={decrement}
              >
                −
              </Button>

              <Button
                variant="secondary"
                size="lg"
                data-testid="reset-btn"
                onClick={reset}
              >
                Reset
              </Button>

              <Button
                variant="success"
                size="lg"
                data-testid="increment-btn"
                onClick={increment}
              >
                +
              </Button>
            </div>
          </Card.Body>

          <Card.Footer>
            {count >= 10 ? (
              <Badge bg="danger" data-testid="counter-status">
                Cao
              </Badge>
            ) : count > 0 ? (
              <Badge bg="success" data-testid="counter-status">
                Đang chạy
              </Badge>
            ) : (
              <Badge bg="secondary" data-testid="counter-status">
                Bắt đầu
              </Badge>
            )}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}
