import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';

const OrchidForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    orchidName: '',
    orchidCategory: '',
    isNatural: false,
    isAttractive: false,
    orchidDescription: '',
    orchidURL: '',
  });

  // Sync state when initialData is available (useful for Edit Page)
  useEffect(() => {
    if (initialData) {
      setFormData({
        orchidName: initialData.orchidName || '',
        orchidCategory: initialData.orchidCategory || '',
        isNatural: initialData.isNatural || false,
        isAttractive: initialData.isAttractive || false,
        orchidDescription: initialData.orchidDescription || '',
        orchidURL: initialData.orchidURL || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="orchidName">
          <Form.Label>Tên Orchid</Form.Label>
          <Form.Control
            required
            type="text"
            name="orchidName"
            value={formData.orchidName}
            onChange={handleChange}
            placeholder="Nhập tên Orchid"
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="orchidCategory">
          <Form.Label>Loại Orchid</Form.Label>
          <Form.Control
            required
            type="text"
            name="orchidCategory"
            value={formData.orchidCategory}
            onChange={handleChange}
            placeholder="Nhập thể loại"
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="isNatural">
          <Form.Check
            type="switch"
            id="custom-switch-natural"
            name="isNatural"
            label="Tự nhiên (Natural)"
            checked={formData.isNatural}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="isAttractive">
          <Form.Check
            type="switch"
            id="custom-switch-attractive"
            name="isAttractive"
            label="Đẹp (Attractive)"
            checked={formData.isAttractive}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="orchidURL">
        <Form.Label>URL Hình ảnh</Form.Label>
        <Form.Control
          type="url"
          name="orchidURL"
          value={formData.orchidURL}
          onChange={handleChange}
          placeholder="Nhập link ảnh (http://...)"
        />
        {/* Image Preview */}
        {formData.orchidURL && (
          <div className="mt-3">
            <p className="text-muted mb-1"><small>Xem trước ảnh:</small></p>
            <Image 
              src={formData.orchidURL} 
              alt="Orchid Preview" 
              thumbnail 
              style={{ maxHeight: '200px', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }}
              onLoad={(e) => { e.target.style.display = 'inline-block'; }}
            />
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-4" controlId="orchidDescription">
        <Form.Label>Mô tả chi tiết</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="orchidDescription"
          value={formData.orchidDescription}
          onChange={handleChange}
          placeholder="Nhập mô tả..."
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Lưu Orchid'}
      </Button>
    </Form>
  );
};

export default OrchidForm;
