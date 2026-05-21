
import {
  Container,
  Card,
  Button,
} from "react-bootstrap";

import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="py-5">
      <Card className="text-center p-5 bg-primary text-white">
        <h1>React Blog App</h1>

        <p>Blog học React Router và Bootstrap</p>

        <Button
          as={Link}
          to="/posts"
          variant="light"
        >
          Xem bài viết
        </Button>
      </Card>
    </Container>
  );
}

export default Home;