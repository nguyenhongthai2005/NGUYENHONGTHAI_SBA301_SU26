import { Container, Row, Col, Card, Badge, Button, Nav } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { blogPosts, blogCategories } from '../../../data/blogPosts';

const ALL_CATEGORY = 'Tất cả';

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || ALL_CATEGORY;

  const filteredPosts = activeCategory === ALL_CATEGORY
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  const handleCategoryChange = (category) => {
    if (category === ALL_CATEGORY) {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">📰 Blog Lập Trình</h4>

      <Nav className="mb-4 flex-wrap gap-2" data-testid="category-nav">
        {blogCategories.map((cat) => (
          <Nav.Item key={cat}>
            <Button
              variant={activeCategory === cat ? 'primary' : 'outline-primary'}
              size="sm"
              data-testid={`blog-category-${cat}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </Button>
          </Nav.Item>
        ))}
      </Nav>

      <div className="mb-3 text-muted" data-testid="active-category">
        Danh mục: {activeCategory} · {filteredPosts.length} bài viết
      </div>

      <Row className="g-4">
        {filteredPosts.length === 0 && (
          <Col>
            <p>Không có bài viết nào trong danh mục này.</p>
          </Col>
        )}

        {filteredPosts.map((post) => (
          <Col key={post.id} md={6} lg={4}>
            <Card data-testid={`blog-post-${post.id}`} className="h-100 shadow-sm">
              <Card.Img variant="top" src={post.image} style={{ height: 180, objectFit: 'cover' }} />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Badge bg="info">{post.category}</Badge>
                  <small className="text-muted">{post.date}</small>
                </div>
                <Card.Title style={{ fontSize: '1rem' }}>{post.title}</Card.Title>
                <Card.Text className="text-muted" style={{ fontSize: '0.85rem' }}>
                  {post.excerpt}
                </Card.Text>
                <small className="text-muted">✍️ {post.author}</small>
              </Card.Body>
              <Card.Footer>
                <Button
                  as={Link}
                  to={`/blog/${post.id}`}
                  variant="outline-primary"
                  size="sm"
                  data-testid={`blog-link-${post.id}`}
                >
                  Đọc Tiếp →
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
