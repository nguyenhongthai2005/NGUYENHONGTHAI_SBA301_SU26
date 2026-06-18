import { useState } from 'react';
import { Container, Breadcrumb, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useOrchid } from '../context/OrchidContext';
import OrchidForm from '../components/OrchidForm';

const AddOrchidPage = () => {
  const { addOrchid } = useOrchid();
  const navigate = useNavigate();
  
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data) => {
    setSaving(true);
    setErrorMsg('');
    try {
      await addOrchid(data);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setErrorMsg(error.message || 'Lỗi khi thêm mới');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: '720px' }}>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Orchid</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="mb-4 fw-bold">Add New Orchid</h2>

      {success && <Alert variant="success">Thêm mới thành công! Đang chuyển về trang chủ...</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      {!success && (
        <OrchidForm 
          submitLabel="Add Orchid" 
          onSubmit={handleSubmit} 
          loading={saving} 
        />
      )}
    </Container>
  );
};

export default AddOrchidPage;
