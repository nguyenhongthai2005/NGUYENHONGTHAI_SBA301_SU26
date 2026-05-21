import {
  Container,
  Card,
  Badge,
} from "react-bootstrap";

function About() {
  return (
    <Container
      className="py-5"
      style={{ maxWidth: "700px" }}
    >
      <Card className="shadow p-4">
        <h2 className="mb-3">
          Giới thiệu
        </h2>

        <p>
          Đây là project React Blog App
          sử dụng:
        </p>

        <div className="d-flex gap-2">
          <Badge bg="primary">
            React
          </Badge>

          <Badge bg="success">
            React Router
          </Badge>

          <Badge bg="dark">
            Bootstrap
          </Badge>
        </div>
      </Card>
    </Container>
  );
}

export default About;