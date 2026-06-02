import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getBooksFromStorage, saveBooksToStorage, getNextId } from '../utils/storage';
import { genres } from '../../../data/books';

const EMPTY_FORM = { title: '', author: '', genre: 'Lập trình', year: '', price: '', available: true };

export default function BookForm() {
  // TODO 1: Lấy `id` từ URL params bằng useParams()
  //         Nếu id tồn tại → đang ở chế độ Edit, ngược lại → Add
  const { id } = useParams();

  // TODO 2: Khai báo `navigate` bằng useNavigate()
  const navigate = useNavigate();

  // TODO 3: Khai báo state `formData` với giá trị khởi tạo EMPTY_FORM
  const [formData, setFormData] = useState(EMPTY_FORM);

  // TODO 4: Khai báo state `error` với giá trị khởi tạo ''
  const [error, setError] = useState('');

  // TODO 5: Dùng useEffect để nạp dữ liệu khi ở chế độ Edit:
  //         - Dependency: [id]
  //         - Nếu id tồn tại: gọi getBooksFromStorage(), tìm book có id === Number(id)
  //         - Nếu tìm thấy: setFormData(book)
  //         - Nếu không tìm thấy: navigate('/books')
  useEffect(() => {
    if (!id) return;
    const books = getBooksFromStorage();
    const book = books.find((item) => item.id === Number(id));
    if (book) {
      setFormData(book);
    } else {
      navigate('/books');
    }
  }, [id, navigate]);

  // TODO 6: Khai báo hàm `handleChange(e)`:
  //         - Xử lý cả input text lẫn checkbox (e.target.type === 'checkbox' dùng e.target.checked)
  //         - Cập nhật formData với field và value tương ứng
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const isEdit = Boolean(id);

  // TODO 7: Khai báo hàm `handleSubmit(e)`:
  //         - Gọi e.preventDefault()
  //         - Validate: title, author, year, price không được rỗng
  //         - year phải là số từ 1900 đến 2025
  //         - price phải là số dương
  //         - Nếu lỗi: setError và return
  //         - Lấy books = getBooksFromStorage()
  //         - Nếu Edit (id tồn tại): cập nhật book trong mảng, saveBooksToStorage
  //         - Nếu Add: thêm book mới với id = getNextId(books), saveBooksToStorage
  //         - navigate('/books')
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = formData.title.trim();
    const author = formData.author.trim();
    const yearValue = Number(formData.year);
    const priceValue = Number(formData.price);

    if (!title || !author || formData.year.toString().trim() === '' || formData.price.toString().trim() === '') {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }

    if (Number.isNaN(yearValue) || yearValue < 1900 || yearValue > 2025) {
      setError('Năm xuất bản phải nằm trong khoảng 1900 đến 2025.');
      return;
    }

    if (Number.isNaN(priceValue) || priceValue <= 0) {
      setError('Giá phải là số dương.');
      return;
    }

    const books = getBooksFromStorage();
    if (isEdit) {
      const updated = books.map((book) => (
        book.id === Number(id) ? { ...book, ...formData, year: yearValue, price: priceValue } : book
      ));
      saveBooksToStorage(updated);
    } else {
      const newBook = {
        ...formData,
        id: getNextId(books),
        year: yearValue,
        price: priceValue,
      };
      saveBooksToStorage([...books, newBook]);
    }

    navigate('/books');
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="shadow-sm" data-testid="book-form">
            <Card.Header className={isEdit ? 'bg-warning' : 'bg-primary text-white'}>
              <h5 className="mb-0">{isEdit ? '✏️ Sửa Sách' : '+ Thêm Sách Mới'}</h5>
            </Card.Header>

            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Tên Sách <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="title"
                    placeholder="Nhập tên sách..."
                    value={formData.title}
                    onChange={handleChange}
                    data-testid="book-title-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tác Giả <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="author"
                    placeholder="Tên tác giả..."
                    value={formData.author}
                    onChange={handleChange}
                    data-testid="book-author-input"
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Thể Loại</Form.Label>
                      <Form.Select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        data-testid="book-genre-select"
                      >
                        {genres.filter((g) => g !== 'Tất cả').map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Năm Xuất Bản <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        name="year"
                        type="number"
                        placeholder="2024"
                        value={formData.year}
                        onChange={handleChange}
                        data-testid="book-year-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Giá (VNĐ) <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    placeholder="150000"
                    value={formData.price}
                    onChange={handleChange}
                    data-testid="book-price-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    name="available"
                    label="Còn hàng"
                    checked={formData.available}
                    onChange={handleChange}
                    data-testid="book-available-check"
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant={isEdit ? 'warning' : 'primary'}
                    data-testid="save-book-btn"
                  >
                    {isEdit ? '💾 Lưu Thay Đổi' : '+ Thêm Sách'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate('/books')}
                    data-testid="cancel-book-btn"
                  >
                    Hủy
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
