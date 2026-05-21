import {
  Container,
  Card,
  Button,
  Alert,
} from "react-bootstrap";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { posts } from "../data/posts";

function PostDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const post = posts.find(
    (p) => p.id === Number(id)
  );

  if (!post) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Không tìm thấy bài viết!
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button
        className="mb-3"
        variant="secondary"
        onClick={() => navigate(-1)}
      >
        Quay lại
      </Button>

      <Card className="shadow">
        <Card.Body>
          <h2>{post.title}</h2>

          <p className="text-muted">
            {post.author} - {post.date}
          </p>

          <p>{post.body}</p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostDetail;