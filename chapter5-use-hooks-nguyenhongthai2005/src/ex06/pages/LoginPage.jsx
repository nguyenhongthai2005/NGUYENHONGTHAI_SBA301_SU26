import { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button, Alert, Modal } from 'react-bootstrap'
import { userData } from '../data/userData'

const initialState = {
  values: {
    username: '',
    password: '',
  },
  errors: {},
  touched: {},
  submitted: false,
}

function validate(values) {
  const errors = {}

  if (!values.username.trim()) {
    errors.username = 'Vui lòng nhập username'
  }

  if (!values.password.trim()) {
    errors.password = 'Vui lòng nhập mật khẩu'
  }

  const matchedUser = userData.find(
    user => user.username === values.username && user.password === values.password
  )

  if (values.username.trim() && values.password.trim() && !matchedUser) {
    errors.general = 'Sai username hoặc password'
  }

  return errors
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const updatedValues = {
        ...state.values,
        [action.payload.field]: action.payload.value,
      }

      return {
        ...state,
        values: updatedValues,
        touched: {
          ...state.touched,
          [action.payload.field]: true,
        },
        errors: validate(updatedValues),
      }
    }
    case 'SUBMIT': {
      const errors = validate(state.values)
      return {
        ...state,
        errors,
        touched: {
          username: true,
          password: true,
        },
        submitted: true,
      }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function LoginPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const matchedUser = userData.find(
    user => user.username === state.values.username && user.password === state.values.password
  )

  function handleChange(e) {
    const { name, value } = e.target
    dispatch({ type: 'SET_FIELD', payload: { field: name, value } })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: 'SUBMIT' })

    if (matchedUser) {
      setShowModal(true)
    }
  }

  function handleContinue() {
    setShowModal(false)
    navigate('/home')
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="shadow-sm" style={{ width: '100%', maxWidth: 420 }}>
        <Card.Header className="bg-primary text-white">
          <strong>Đăng nhập</strong>
        </Card.Header>
        <Card.Body>
          {state.errors.general && (
            <Alert variant="danger" className="py-2">
              {state.errors.general}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={state.values.username}
                onChange={handleChange}
                isInvalid={!!state.errors.username}
                placeholder="Nhập username"
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={state.values.password}
                onChange={handleChange}
                isInvalid={!!state.errors.password}
                placeholder="Nhập mật khẩu"
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" className="w-100">Đăng nhập</Button>
              <Button
                type="button"
                variant="secondary"
                className="w-100"
                onClick={() => dispatch({ type: 'RESET' })}
              >
                Reset
              </Button>
            </div>
          </Form>

          <div className="mt-3 text-muted small">
            Dữ liệu user đang được đọc từ <code>src/ex06/data/userData.js</code>.
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Chào <strong>{matchedUser?.fullName || 'Admin'}</strong>! Bạn đã đăng nhập thành công.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleContinue}>
            Vào trang chủ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
