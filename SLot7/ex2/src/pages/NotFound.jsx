import {
  Container,
  Button,
} from "react-bootstrap";

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="text-center py-5">
      <h1>404</h1>

      <p>Trang không tồn tại</p>

      <Button as={Link} to="/">
        Về trang chủ
      </Button>
    </Container>
  );
}

export default NotFound;