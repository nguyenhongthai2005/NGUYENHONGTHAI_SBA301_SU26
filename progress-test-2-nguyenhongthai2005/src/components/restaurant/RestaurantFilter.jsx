import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

/**
 * RestaurantFilter — form lọc danh sách restaurant.
 *
 * Props:
 *   categories  {Array}     danh sách category [{ id, name }]
 *   onFilter    {Function}  callback(filterParams) khi user click Filter
 *               filterParams = { name: string, category: string }
 */
function RestaurantFilter({ categories = [], onFilter }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onFilter) onFilter({ name, category })
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Row className="g-2 align-items-end">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter restaurant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button type="button" variant="primary" onClick={handleSubmit}>Filter</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default RestaurantFilter
