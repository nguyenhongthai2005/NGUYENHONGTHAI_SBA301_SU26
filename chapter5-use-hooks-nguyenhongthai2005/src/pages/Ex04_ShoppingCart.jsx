/**
 * Bài 4 – Shopping Cart (useReducer)
 * =====================================
 * Mục tiêu: Giỏ hàng với thêm / xóa / thay đổi số lượng / xóa toàn bộ.
 *
 * Chạy test: npm test -- Ex04
 */
import { useReducer } from 'react'
import { Card, Button, Table, Badge, Row, Col } from 'react-bootstrap'

// Danh sách sản phẩm mẫu (không cần sửa)
const PRODUCTS = [
  { id: 1, name: 'Áo thun',   price: 150_000 },
  { id: 2, name: 'Quần jean', price: 350_000 },
  { id: 3, name: 'Giày vải',  price: 280_000 },
]

// ─────────────────────────────────────────────
// TODO 1: Định nghĩa initialState
//   { items: [] }
//   (mỗi item: { id, name, price, qty })
// ─────────────────────────────────────────────
const initialState = { items: [] } // TODO 1

// ─────────────────────────────────────────────
// TODO 2: Viết reducer(state, action)
//
//   Case 'ADD_ITEM':
//     - action.payload = product { id, name, price }
//     - Nếu sản phẩm đã có trong items → tăng qty lên 1
//       (dùng .map() để cập nhật phần tử khớp id)
//     - Nếu chưa có → thêm { ...product, qty: 1 } vào items
//
//   Case 'REMOVE_ITEM':
//     - action.payload = id sản phẩm
//     - Lọc bỏ item có id khớp
//
//   Case 'UPDATE_QTY':
//     - action.payload = { id, qty } (qty là số mới)
//     - Nếu qty <= 0 thì xóa item đó (tương tự REMOVE_ITEM)
//     - Nếu qty > 0  thì cập nhật qty
//
//   Case 'CLEAR_CART':
//     - Trả về initialState
// ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      }
    case 'UPDATE_QTY':
      if (action.payload.qty <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        }
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item
        ),
      }
    case 'CLEAR_CART':
      return initialState
    default:
      return state
  }
}

export default function Ex04_ShoppingCart() {
  // TODO 3: Gọi useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(reducer, initialState) // TODO 3: thay bằng useReducer

  // ─────────────────────────────────────────────
  // TODO 4: Tính derived state
  //   total     = tổng (item.price * item.qty) của tất cả items
  //   itemCount = tổng qty của tất cả items
  // ─────────────────────────────────────────────
  const total = state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const itemCount = state.items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <Card className="mx-auto" style={{ maxWidth: 650 }}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <strong>Bài 4 – Shopping Cart</strong>
        {/* TODO 5: Hiển thị itemCount */}
        <Badge bg="danger" data-testid="item-count">{itemCount}</Badge>
      </Card.Header>
      <Card.Body>

        {/* Danh sách sản phẩm */}
        <h6>Sản phẩm</h6>
        <Row className="mb-4">
          {PRODUCTS.map(p => (
            <Col key={p.id} xs={4}>
              <Card>
                <Card.Body className="p-2 text-center">
                  <div><strong>{p.name}</strong></div>
                  <div className="text-muted small">{p.price.toLocaleString()}đ</div>
                  {/* TODO 6: onClick dispatch ADD_ITEM với payload = p */}
                  <Button
                    size="sm"
                    className="mt-1"
                    data-testid={`btn-add-${p.id}`}
                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}
                  >
                    + Thêm
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Bảng giỏ hàng */}
        <h6>Giỏ hàng</h6>
        <Table size="sm" bordered data-testid="cart-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* TODO 7: Render state.items.map(item => ...)
                        Mỗi hàng có:
                        - data-testid={`cart-row-${item.id}`}
                        - Input số lượng: data-testid={`qty-input-${item.id}`}
                          onChange dispatch UPDATE_QTY
                        - Nút xóa: data-testid={`btn-remove-${item.id}`}
                          onClick dispatch REMOVE_ITEM
            */}
            {state.items.map(item => (
              <tr key={item.id} data-testid={`cart-row-${item.id}`}>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}đ</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={item.qty}
                    data-testid={`qty-input-${item.id}`}
                    onChange={(e) => dispatch({
                      type: 'UPDATE_QTY',
                      payload: { id: item.id, qty: Number(e.target.value) },
                    })}
                  />
                </td>
                <td>{(item.price * item.qty).toLocaleString()}đ</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    data-testid={`btn-remove-${item.id}`}
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Tổng tiền + Clear */}
        <div className="d-flex justify-content-between align-items-center">
          {/* TODO 8: Hiển thị total.toLocaleString() */}
          <strong data-testid="cart-total">Tổng: {total.toLocaleString()}đ</strong>
          {/* TODO 9: onClick dispatch CLEAR_CART */}
          <Button
            variant="outline-danger"
            size="sm"
            data-testid="btn-clear-cart"
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
          >
            Xóa giỏ hàng
          </Button>
        </div>

      </Card.Body>
    </Card>
  )
}
