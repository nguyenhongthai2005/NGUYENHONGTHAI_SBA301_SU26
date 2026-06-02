import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const EMPTY_FORM = { name: '', email: '', phone: '', age: '' };
const EMPTY_ERRORS = { name: '', email: '', phone: '', age: '' };

export default function RegistrationForm() {
  // TODO 1: Khai báo state `formData` với giá trị khởi tạo là EMPTY_FORM
  const [formData, setFormData] = useState(EMPTY_FORM);

  // TODO 2: Khai báo state `errors` với giá trị khởi tạo là EMPTY_ERRORS
  const [errors, setErrors] = useState(EMPTY_ERRORS);

  // TODO 3: Khai báo state `submitted` với giá trị khởi tạo là false
  const [submitted, setSubmitted] = useState(false);

  // TODO 4: Khai báo hàm `handleChange(e)`:
  //         - Cập nhật formData với field tương ứng e.target.name và giá trị e.target.value
  //         - Xóa lỗi của field đó trong errors (đặt về '')
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // TODO 5: Khai báo hàm `validate()`:
  //         - Kiểm tra từng field và trả về object newErrors:
  //           + name: bắt buộc, ít nhất 2 ký tự
  //           + email: bắt buộc, phải chứa '@' và '.'
  //           + phone: bắt buộc, chỉ gồm chữ số, dài 10 ký tự
  //           + age: bắt buộc, là số, từ 16 đến 60
  //         - Trả về newErrors
  const validate = () => {
    const newErrors = { ...EMPTY_ERRORS };
    const nameValue = formData.name.trim();
    const emailValue = formData.email.trim();
    const phoneValue = formData.phone.trim();
    const ageValue = formData.age.toString().trim();
    const ageNumber = Number(ageValue);

    if (!nameValue) {
      newErrors.name = 'Tên không được để trống';
    } else if (nameValue.length < 2) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự';
    }

    if (!emailValue) {
      newErrors.email = 'Email không được để trống';
    } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!phoneValue) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^\d{10}$/.test(phoneValue)) {
      newErrors.phone = 'Số điện thoại phải là 10 chữ số';
    }

    if (!ageValue) {
      newErrors.age = 'Tuổi không được để trống';
    } else if (Number.isNaN(ageNumber) || !Number.isInteger(ageNumber)) {
      newErrors.age = 'Tuổi phải là số hợp lệ';
    } else if (ageNumber < 16 || ageNumber > 60) {
      newErrors.age = 'Tuổi phải từ 16 đến 60';
    }

    return newErrors;
  };

  // TODO 6: Khai báo hàm `handleSubmit(e)`:
  //         - Gọi e.preventDefault()
  //         - Gọi validate() để lấy newErrors
  //         - Cập nhật state errors = newErrors
  //         - Nếu tất cả các giá trị trong newErrors đều rỗng (''), đặt submitted = true
  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.values(newErrors).every(value => value === '')) {
      setSubmitted(true);
    }
  };

  // TODO 7: Khai báo hàm `handleReset()`:
  //         - Reset formData về EMPTY_FORM
  //         - Reset errors về EMPTY_ERRORS
  //         - Reset submitted về false
  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
    setSubmitted(false);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>

          {submitted && (
            <Alert variant="success" data-testid="success-message">
              Đăng ký thành công! Chào mừng {formData.name}.
              <Button variant="link" onClick={handleReset}>
                Đăng ký tài khoản khác
              </Button>
            </Alert>
          )}

          {!submitted && (
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">📋 Form Đăng Ký</h5>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label>Họ và Tên <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      name="name"
                      placeholder="Nhập họ và tên"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      data-testid="name-input"
                    />
                    <Form.Control.Feedback type="invalid" data-testid="name-error">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      data-testid="email-input"
                    />
                    <Form.Control.Feedback type="invalid" data-testid="email-error">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Số Điện Thoại <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      name="phone"
                      placeholder="0xxxxxxxxx"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      data-testid="phone-input"
                    />
                    <Form.Control.Feedback type="invalid" data-testid="phone-error">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Tuổi <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      name="age"
                      type="number"
                      placeholder="16–60"
                      value={formData.age}
                      onChange={handleChange}
                      isInvalid={!!errors.age}
                      data-testid="age-input"
                    />
                    <Form.Control.Feedback type="invalid" data-testid="age-error">
                      {errors.age}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" variant="success" data-testid="submit-btn">
                      Đăng Ký
                    </Button>
                    <Button type="button" variant="outline-secondary" onClick={handleReset}>
                      Làm Lại
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
