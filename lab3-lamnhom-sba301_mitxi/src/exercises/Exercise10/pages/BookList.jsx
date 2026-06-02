import { useState } from 'react';
import { Container, Row, Col, Table, Button, Badge, Form, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getBooksFromStorage, saveBooksToStorage } from '../utils/storage';
import { genres } from '../../../data/books';

export default function BookList() {
  // TODO 1: Khai báo state `books` với giá trị khởi tạo = getBooksFromStorage()
  const [books, setBooks] = useState(getBooksFromStorage());

  // TODO 2: Khai báo state `searchQuery` với giá trị khởi tạo là ''
  const [searchQuery, setSearchQuery] = useState('');

  // TODO 3: Khai báo state `selectedGenre` với giá trị khởi tạo là 'Tất cả'
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');

  // TODO 4: Khai báo `navigate` bằng useNavigate()
  const navigate = useNavigate();

  // TODO 5: Tính biến `filteredBooks`:
  //         - Bắt đầu từ `books`
  //         - Nếu selectedGenre !== 'Tất cả': lọc theo genre
  //         - Nếu searchQuery không rỗng: lọc theo title (không phân biệt hoa thường)
  const filteredBooks = books.filter((book) => {
    const matchGenre = selectedGenre === 'Tất cả' || book.genre === selectedGenre;
    const matchSearch = book.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchGenre && matchSearch;
  });

  // TODO 6: Khai báo hàm `deleteBook(id)`:
  //         - Hiện window.confirm('Bạn có chắc muốn xóa sách này?')
  //         - Nếu đồng ý: lọc bỏ sách có id, cập nhật state books VÀ gọi saveBooksToStorage
  const deleteBook = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sách này?')) {
      const updated = books.filter((book) => book.id !== id);
      setBooks(updated);
      saveBooksToStorage(updated);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="mb-0">📋 Danh Sách Sách</h4>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            data-testid="add-book-btn"
            onClick={() => navigate('/books/new')}
          >
            + Thêm Sách
          </Button>
        </Col>
      </Row>

      <Row className="mb-3 g-2">
        <Col md={5}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Tìm kiếm theo tên sách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="search-books"
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            data-testid="genre-filter"
          >
            {genres.map((g) => <option key={g}>{g}</option>)}
          </Form.Select>
        </Col>
        <Col xs="auto" className="align-self-center">
          <Badge bg="secondary">
            {filteredBooks.length} sách
          </Badge>
        </Col>
      </Row>

      {filteredBooks.length === 0 && (
        <Alert variant="info">Không tìm thấy sách phù hợp.</Alert>
      )}

      <Table striped bordered hover responsive data-testid="book-table">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Tên Sách</th>
            <th>Tác Giả</th>
            <th>Thể Loại</th>
            <th>Năm</th>
            <th>Giá</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={book.id} data-testid={`book-row-${book.id}`}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td><Badge bg="info">{book.genre}</Badge></td>
              <td>{book.year}</td>
              <td>{book.price.toLocaleString('vi-VN')}đ</td>
              <td>
                <Badge bg={book.available ? 'success' : 'danger'}>
                  {book.available ? 'Còn hàng' : 'Hết hàng'}
                </Badge>
              </td>
              <td>
                <Button size="sm" variant="outline-info" as={Link}
                  to={`/books/${book.id}`} className="me-1"
                  data-testid={`view-book-${book.id}`}>Xem</Button>
                <Button size="sm" variant="outline-warning" as={Link}
                  to={`/books/edit/${book.id}`} className="me-1"
                  data-testid={`edit-book-${book.id}`}>Sửa</Button>
                <Button size="sm" variant="outline-danger"
                  data-testid={`delete-book-${book.id}`}
                  onClick={() => deleteBook(book.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
