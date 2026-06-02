import { useState } from 'react';
import {
  Container, Row, Col, Table, Button, Badge, Form,
  Modal, Alert, InputGroup,
} from 'react-bootstrap';
import { initialStudents, classNames, statusOptions } from '../../data/students';

const EMPTY_FORM = { name: '', studentId: '', className: 'SE1701', gpa: '', status: 'Đang học' };

export default function StudentManagement() {
  // TODO 1: Khai báo state `students` với giá trị khởi tạo là initialStudents
  const [students, setStudents] = useState(initialStudents);

  // TODO 2: Khai báo state `showModal` với giá trị khởi tạo là false
  const [showModal, setShowModal] = useState(false);

  // TODO 3: Khai báo state `editingId` với giá trị khởi tạo là null
  //         (null = đang thêm mới, có giá trị = đang sửa)
  const [editingId, setEditingId] = useState(null);

  // TODO 4: Khai báo state `formData` với giá trị khởi tạo là EMPTY_FORM
  const [formData, setFormData] = useState(EMPTY_FORM);

  // TODO 5: Khai báo state `filterClass` với giá trị khởi tạo là 'Tất cả'
  const [filterClass, setFilterClass] = useState('Tất cả');

  // TODO 6: Khai báo state `formError` với giá trị khởi tạo là ''
  const [formError, setFormError] = useState('');

  // TODO 7: Khai báo hàm `openAddModal()`:
  //         - Đặt editingId = null, formData = EMPTY_FORM, formError = '', showModal = true
  const openAddModal = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setFormError('');
    setShowModal(true);
  };

  // TODO 8: Khai báo hàm `openEditModal(student)`:
  //         - Đặt editingId = student.id
  //         - Đặt formData = { name, studentId, className, gpa, status } từ student
  //         - Đặt formError = '', showModal = true
  const openEditModal = (student) => {
    const { name, studentId, className, gpa, status } = student;
    setEditingId(student.id);
    setFormData({ name, studentId, className, gpa, status });
    setFormError('');
    setShowModal(true);
  };

  // TODO 9: Khai báo hàm `handleSave()`:
  //         - Kiểm tra: name, studentId, gpa không được rỗng
  //         - GPA phải là số từ 0.0 đến 4.0 — nếu sai đặt formError và return
  //         - Nếu editingId === null: thêm sinh viên mới với id = Date.now()
  //         - Nếu editingId có giá trị: cập nhật sinh viên có id = editingId
  //         - Đóng modal (showModal = false)
  const handleSave = () => {
    if (!formData.name.trim() || !formData.studentId.trim() || formData.gpa.toString().trim() === '') {
      setFormError('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }

    const gpaValue = Number(formData.gpa);
    if (Number.isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
      setFormError('GPA phải là số từ 0.0 đến 4.0');
      return;
    }

    const studentPayload = {
      name: formData.name.trim(),
      studentId: formData.studentId.trim(),
      className: formData.className,
      gpa: gpaValue,
      status: formData.status,
    };

    if (editingId === null) {
      setStudents(prev => [...prev, { ...studentPayload, id: Date.now() }]);
    } else {
      setStudents(prev => prev.map((student) => (
        student.id === editingId ? { ...student, ...studentPayload } : student
      )));
    }

    setShowModal(false);
    setFormError('');
  };

  // TODO 10: Khai báo hàm `deleteStudent(id)`:
  //          - Hiện window.confirm('Bạn có chắc muốn xóa sinh viên này?')
  //          - Nếu đồng ý: lọc bỏ student có id khỏi mảng students
  const deleteStudent = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sinh viên này?')) {
      setStudents(prev => prev.filter((student) => student.id !== id));
    }
  };

  // TODO 11: Tính biến `filteredStudents`:
  //          - Nếu filterClass === 'Tất cả': trả về toàn bộ students
  //          - Ngược lại: lọc students có className === filterClass
  const filteredStudents = filterClass === 'Tất cả'
    ? students
    : students.filter((student) => student.className === filterClass);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const gpaColor = (gpa) => {
    if (gpa >= 3.6) return 'success';
    if (gpa >= 3.0) return 'primary';
    if (gpa >= 2.0) return 'warning';
    return 'danger';
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="mb-0">🎓 Quản Lý Sinh Viên</h4>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            data-testid="add-student-btn"
            onClick={openAddModal}
          >
            + Thêm sinh viên
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            data-testid="filter-class"
          >
            {classNames.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs="auto" className="align-self-center">
          <Badge bg="secondary" data-testid="student-count">
            {filteredStudents.length} sinh viên
          </Badge>
        </Col>
      </Row>

      <Table striped bordered hover responsive data-testid="student-table">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Họ Tên</th>
            <th>MSSV</th>
            <th>Lớp</th>
            <th>GPA</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id} data-testid={`student-row-${student.id}`}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.studentId}</td>
              <td>{student.className}</td>
              <td>
                <Badge bg={gpaColor(student.gpa)}>{student.gpa}</Badge>
              </td>
              <td>{student.status}</td>
              <td>
                <Button size="sm" variant="outline-warning" className="me-1"
                  data-testid={`edit-btn-${student.id}`}
                  onClick={() => openEditModal(student)}>
                  Sửa
                </Button>
                <Button size="sm" variant="outline-danger"
                  data-testid={`delete-btn-${student.id}`}
                  onClick={() => deleteStudent(student.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Thêm / Sửa Sinh Viên */}
      <Modal
        show={showModal}
        onHide={() => { setShowModal(false); }}
        data-testid="student-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId === null ? 'Thêm Sinh Viên' : 'Sửa Sinh Viên'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {formError && (
            <Alert variant="danger">
              {formError}
            </Alert>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Họ Tên</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                data-testid="modal-name-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>MSSV</Form.Label>
              <Form.Control
                name="studentId"
                value={formData.studentId}
                onChange={handleFormChange}
                data-testid="modal-studentid-input"
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Lớp</Form.Label>
                  <Form.Select
                    name="className"
                    value={formData.className}
                    onChange={handleFormChange}
                    data-testid="modal-class-select"
                  >
                    {classNames.filter((c) => c !== 'Tất cả').map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>GPA</Form.Label>
                  <Form.Control
                    name="gpa"
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    value={formData.gpa}
                    onChange={handleFormChange}
                    data-testid="modal-gpa-input"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                data-testid="modal-status-select"
              >
                {statusOptions.map((s) => <option key={s}>{s}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowModal(false); }}>
            Hủy
          </Button>
          <Button
            variant="primary"
            data-testid="save-student-btn"
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
