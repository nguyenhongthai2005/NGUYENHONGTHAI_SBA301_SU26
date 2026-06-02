import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, InputGroup, Alert } from 'react-bootstrap';

export default function TodoList() {
  // TODO 1: Khai báo state `todos` là mảng rỗng []
  //         Mỗi todo có cấu trúc: { id: number, text: string, completed: boolean }
  const [todos, setTodos] = useState([]);

  // TODO 2: Khai báo state `inputValue` là chuỗi rỗng ''
  const [inputValue, setInputValue] = useState('');

  // TODO 3: Khai báo hàm `addTodo`:
  //         - Nếu inputValue rỗng (sau trim) thì return sớm
  //         - Thêm todo mới vào mảng: { id: Date.now(), text: inputValue.trim(), completed: false }
  //         - Reset inputValue về ''
  const addTodo = () => {
    const trimmedText = inputValue.trim();
    if (!trimmedText) return;

    setTodos(prevTodos => [
      ...prevTodos,
      { id: Date.now(), text: trimmedText, completed: false },
    ]);
    setInputValue('');
  };

  // TODO 4: Khai báo hàm `toggleTodo(id)`:
  //         - Tìm todo có id tương ứng và đảo ngược trạng thái completed của nó
  //         - Cập nhật lại state todos
  const toggleTodo = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // TODO 5: Khai báo hàm `deleteTodo(id)`:
  //         - Lọc bỏ todo có id khỏi mảng todos
  //         - Cập nhật lại state todos
  const deleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // TODO 6: Tính biến `completedCount` = số todo có completed === true
  const completedCount = todos.filter(todo => todo.completed).length;
  // TODO 7: Tính biến `pendingCount` = số todo có completed === false
  const pendingCount = todos.filter(todo => !todo.completed).length;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">📝 Danh Sách Công Việc</h5>
            </Card.Header>

            <Card.Body>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Nhập công việc mới..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      addTodo();
                    }
                  }}
                  data-testid="todo-input"
                />
                <Button
                  variant="primary"
                  onClick={addTodo}
                  data-testid="add-btn"
                >
                  Thêm
                </Button>
              </InputGroup>

              <div className="d-flex gap-2 mb-3 flex-wrap">
                <Badge bg="primary" data-testid="total-count">
                  Tổng: {todos.length}
                </Badge>
                <Badge bg="success" data-testid="completed-count">
                  Hoàn thành: {completedCount}
                </Badge>
                <Badge bg="warning" text="dark" data-testid="pending-count">
                  Chưa xong: {pendingCount}
                </Badge>
              </div>

              {todos.length === 0 && (
                <Alert variant="info" data-testid="empty-message">
                  Chưa có công việc nào! Hãy thêm việc mới.
                </Alert>
              )}

              <ListGroup>
                {todos.map(todo => (
                  <ListGroup.Item
                    key={todo.id}
                    data-testid={`todo-item-${todo.id}`}
                    className="d-flex align-items-center gap-2"
                  >
                    <Form.Check
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      data-testid={`toggle-${todo.id}`}
                    />
                    <span
                      style={
                        todo.completed
                          ? { textDecoration: 'line-through', color: '#aaa' }
                          : undefined
                      }
                    >
                      {todo.text}
                    </span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-auto"
                      onClick={() => deleteTodo(todo.id)}
                      data-testid={`delete-btn-${todo.id}`}
                    >
                      Xóa
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
