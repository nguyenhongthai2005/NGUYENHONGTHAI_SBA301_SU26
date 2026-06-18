import { useState, useEffect } from 'react';
import { Container, Breadcrumb, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useOrchid } from '../context/OrchidContext';
import * as api from '../utils/orchidApi';
import OrchidForm from '../components/OrchidForm';

const EditOrchidPage = () => {
  const { id } = useParams();
  const { editOrchid } = useOrchid();
  const navigate = useNavigate();
  
  const [orchid, setOrchid] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getOrchidById(id);
        setOrchid(data);
      } catch (error) {
        setErrorMsg('Không tìm thấy hoa lan này hoặc có lỗi xảy ra.');
      } finally {
        setFetching(false);
      }
    };
    loadData();
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    setErrorMsg('');
    try {
      await editOrchid(id, data);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setErrorMsg(error.message || 'Lỗi khi cập nhật');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: '720px' }}>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Orchid #{id}</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="mb-4 fw-bold">Edit Orchid</h2>

      {success && <Alert variant="success">Cập nhật thành công! Đang chuyển về trang chủ...</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      {fetching ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading orchid data...</p>
        </div>
      ) : (
        orchid && !success && (
          <OrchidForm 
            initialData={orchid}
            submitLabel="Update Orchid" 
            onSubmit={handleSubmit} 
            loading={saving} 
          />
        )
      )}
    </Container>
  );
};

export default EditOrchidPage;
