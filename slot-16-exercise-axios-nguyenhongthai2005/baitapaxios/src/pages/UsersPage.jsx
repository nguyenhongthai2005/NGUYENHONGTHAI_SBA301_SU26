import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userApi } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import ConfirmDialog from '../components/ConfirmDialog';
import { Container, Button, Table, Form, InputGroup, Card, Badge, Spinner } from 'react-bootstrap';
import { Search, Plus, Edit, Trash2, LogOut, Shield, User } from 'lucide-react';

export default function UsersPage() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // States for search and filter
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');

  // States for Modals
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Check auth
  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filterRole) params.role = filterRole;
      const { data } = await userApi.getAll(params);
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Lỗi khi tải dữ liệu người dùng');
    } finally {
      setLoading(false);
    }
  }, [filterRole]);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [fetchUsers, currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenAdd = () => {
    setEditUser(null);
    setShowForm(true);
  };

  const handleOpenEdit = (user) => {
    setEditUser(user);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editUser) {
        await userApi.update(editUser.id, { ...editUser, ...formData });
      } else {
        await userApi.create(formData);
      }
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      alert('Có lỗi xảy ra: ' + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    if (currentUser.role === 'User') return; // Không có quyền
    
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      await userApi.patch(user.id, { status: newStatus });
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    } catch (err) {
      alert('Lỗi cập nhật trạng thái: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await userApi.remove(deleteTarget.id);
      setDeleteTarget(null);
      fetchUsers();
    } catch (err) {
      alert('Xóa thất bại: ' + err.message);
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Client-side search
  const filteredUsers = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  if (!currentUser) return null;

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
        <Container>
          <span className="navbar-brand fw-bold">
            <Shield size={24} className="me-2" />
            User Manager
          </span>
          <div className="d-flex align-items-center text-white">
            <User size={20} className="me-2" />
            <span className="me-3">Xin chào, {currentUser.fullName} ({currentUser.role})</span>
            <Button variant="light" size="sm" onClick={handleLogout} className="d-flex align-items-center">
              <LogOut size={16} className="me-1" /> Thoát
            </Button>
          </div>
        </Container>
      </nav>

      <Container>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
              <h4 className="mb-0 fw-bold">Danh sách Người dùng</h4>
              
              {/* Toolbar */}
              <div className="d-flex flex-wrap gap-2">
                <InputGroup style={{ maxWidth: '300px' }}>
                  <InputGroup.Text className="bg-white"><Search size={18} /></InputGroup.Text>
                  <Form.Control
                    placeholder="Tìm tên, email, sđt..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
                
                <Form.Select 
                  style={{ width: '150px' }}
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="">Tất cả vai trò</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                </Form.Select>

                {(currentUser.role === 'Admin' || currentUser.role === 'Manager') && (
                  <Button variant="success" className="d-flex align-items-center" onClick={handleOpenAdd}>
                    <Plus size={18} className="me-1" /> Thêm mới
                  </Button>
                )}
              </div>
            </div>

            {/* Table */}
            {error && <div className="alert alert-danger">{error}</div>}
            
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Họ và Tên</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Vai trò</th>
                      <th>Trạng thái</th>
                      <th className="text-end">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-muted">Không tìm thấy dữ liệu.</td>
                      </tr>
                    ) : (
                      filteredUsers.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td className="fw-semibold">{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>
                            <Badge bg={user.role === 'Admin' ? 'danger' : user.role === 'Manager' ? 'warning' : 'info'}>
                              {user.role}
                            </Badge>
                          </td>
                          <td>
                            <Form.Check 
                              type="switch"
                              id={`status-switch-${user.id}`}
                              checked={user.status === 'active'}
                              onChange={() => handleToggleStatus(user)}
                              disabled={currentUser.role === 'User'}
                              label={user.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                              className={user.status === 'active' ? 'text-success' : 'text-danger'}
                            />
                          </td>
                          <td className="text-end">
                            {(currentUser.role === 'Admin' || currentUser.role === 'Manager') && (
                              <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleOpenEdit(user)}>
                                <Edit size={16} />
                              </Button>
                            )}
                            {currentUser.role === 'Admin' && (
                              <Button variant="outline-danger" size="sm" onClick={() => setDeleteTarget(user)}>
                                <Trash2 size={16} />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Modals */}
      <UserForm 
        show={showForm} 
        handleClose={() => setShowForm(false)} 
        user={editUser}
        onSubmit={handleFormSubmit}
        loading={formLoading}
      />

      <ConfirmDialog
        show={!!deleteTarget}
        handleClose={() => setDeleteTarget(null)}
        handleConfirm={handleDeleteConfirm}
        targetName={deleteTarget?.fullName}
        loading={deleteLoading}
      />
    </div>
  );
}
