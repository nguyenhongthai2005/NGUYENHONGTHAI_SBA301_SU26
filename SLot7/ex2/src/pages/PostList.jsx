import { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Badge,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { posts } from "../data/posts";

function PostList() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredPosts = posts.filter((post) =>
    post.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h2 className="mb-4">Danh sách bài viết</h2>

      <Form.Control
        placeholder="Tìm kiếm bài viết..."
        className="mb-4"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Row>
        {filteredPosts.map((post) => (
          <Col md={4} key={post.id}>
            <Card
              className="mb-4 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/posts/${post.id}`)
              }
            >
              <Card.Body>
                <Badge bg="primary">
                  {post.category}
                </Badge>

                <Card.Title className="mt-2">
                  {post.title}
                </Card.Title>

                <Card.Text>
                  {post.body}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PostList;