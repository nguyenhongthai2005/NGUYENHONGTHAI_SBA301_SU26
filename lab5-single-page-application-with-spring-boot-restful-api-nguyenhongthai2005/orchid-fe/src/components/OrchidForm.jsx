import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Image } from 'react-bootstrap';

const EMPTY_FORM = {
  orchidName: '',
  orchidCategory: '',
  isNatural: false,
  isAttractive: false,
  orchidDescription: '',
  orchidURL: ''
};

const OrchidForm = ({ initialData, onSubmit, submitLabel, loading }) => {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-white">
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="orchidName">
          <Form.Label>Orchid Name <span className="text-danger">*</span></Form.Label>
          <Form.Control
            required
            type="text"
            name="orchidName"
            placeholder="E.g., Cattleya trianae"
            value={form.orchidName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="orchidCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="orchidCategory"
            placeholder="Category Name"
            value={form.orchidCategory}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="orchidDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="orchidDescription"
          placeholder="Brief description about this orchid..."
          value={form.orchidDescription}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="orchidURL">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="url"
          name="orchidURL"
          placeholder="https://example.com/image.jpg"
          value={form.orchidURL}
          onChange={handleChange}
        />
        {form.orchidURL && (
          <div className="mt-2">
            <Form.Text className="text-muted d-block mb-1">Image Preview:</Form.Text>
            <Image
              src={form.orchidURL}
              thumbnail
              style={{ maxHeight: '150px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
              onLoad={(e) => { e.target.style.display = 'inline-block'; }}
            />
          </div>
        )}
      </Form.Group>

      <Row className="mb-4">
        <Col md="6">
          <Form.Check
            type="switch"
            id="isNatural"
            name="isNatural"
            label="Is Natural?"
            checked={form.isNatural}
            onChange={handleChange}
          />
        </Col>
        <Col md="6">
          <Form.Check
            type="switch"
            id="isAttractive"
            name="isAttractive"
            label="Is Attractive?"
            checked={form.isAttractive}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Đang lưu...' : submitLabel}
        </Button>
      </div>
    </Form>
  );
};

export default OrchidForm;
