import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // lưu lỗi từng field
  const [errors, setErrors] = useState({});

  // alert thành công
  const [success, setSuccess] = useState(false);

  // validate email
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // validate realtime
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Vui lòng nhập họ tên!";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Vui lòng nhập email!";
        } else if (!isValidEmail(value)) {
          error = "Email không đúng định dạng!";
        }
        break;

      case "password":
        if (!value.trim()) {
          error = "Vui lòng nhập mật khẩu!";
        } else if (value.length < 6) {
          error = "Mật khẩu phải từ 6 ký tự!";
        }
        break;

      case "confirmPassword":
        if (!value.trim()) {
          error = "Vui lòng xác nhận mật khẩu!";
        } else if (value !== formData.password) {
          error = "Mật khẩu xác nhận không khớp!";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // xử lý input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // update form
    setFormData({
      ...formData,
      [name]: value,
    });

    // validate realtime
    const errorMessage = validateField(name, value);

    setErrors({
      ...errors,
      [name]: errorMessage,
    });

    // ẩn success khi đang sửa
    setSuccess(false);
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    // validate toàn bộ
    Object.keys(formData).forEach((field) => {
      const error = validateField(
        field,
        formData[field]
      );

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    // nếu không còn lỗi
    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card
        className="shadow-lg border-0 p-4"
        style={{
          width: "450px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center text-primary mb-4 fw-bold">
          Đăng Ký Tài Khoản
        </h2>

        {/* alert success */}
        {success && (
          <Alert variant="success" className="text-center">
            ✅ Đăng ký thành công!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Họ tên */}
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>

            <Form.Control
              type="text"
              name="fullName"
              placeholder="Nhập họ tên"
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={!!errors.fullName}
            />

            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>

            <Form.Control
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />

            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-4">
            <Form.Label>Xác nhận mật khẩu</Form.Label>

            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
            />

            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 fw-bold py-2"
          >
            Đăng Ký
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default RegisterForm;