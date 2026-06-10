import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { getRestaurantById } from '../services/restaurantService'
import { MESSAGES } from '../constants/messages'

/**
 * RestaurantDetailPage — Screen 3: Xem chi tiết restaurant.
 *
 * Chức năng:
 *  1. Đọc :id từ URL params
 *  2. Gọi API lấy chi tiết restaurant
 *  3. Hiển thị đầy đủ thông tin: Name, Owner, Category, Price range, Address, Open Date
 *  4. Hiển thị MS05 nếu API lỗi
 */
function RestaurantDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    // TODO: Gọi loadRestaurant() khi id thay đổi
    loadRestaurant()
  }, [id])

  async function loadRestaurant() {
    try {
      const data = await getRestaurantById(id)
      setRestaurant(data)
    } catch (error) {
      setErrorMsg(MESSAGES.MS05)
    }
  }

  return (
    <>
      <Header />
      <Container className="my-4">
        <h4>VIEW DETAILS</h4>

        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        {restaurant && (
          <Card className="p-3">
            <Card.Body>
              <Row className="mb-2">
                <Col md={3}><strong>Restaurant Name:</strong></Col>
                <Col>{restaurant.name}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={3}><strong>Owner name:</strong></Col>
                <Col>{restaurant.owner}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={3}><strong>Category:</strong></Col>
                <Col>{restaurant.category}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={3}><strong>Price range (đ):</strong></Col>
                <Col>
                  {restaurant.priceFrom?.toLocaleString()} – {restaurant.priceTo?.toLocaleString()}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={3}><strong>Address:</strong></Col>
                <Col>{restaurant.address}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={3}><strong>Open Date:</strong></Col>
                <Col>{restaurant.openDate}</Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        <Button variant="secondary" className="mt-3" onClick={() => navigate('/')}>
          Back
        </Button>
      </Container>
      <Footer />
    </>
  )
}

export default RestaurantDetailPage
