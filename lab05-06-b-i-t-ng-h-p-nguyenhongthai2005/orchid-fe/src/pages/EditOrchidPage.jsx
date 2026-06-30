import React, { useState, useEffect } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrchid } from '../context/OrchidContext';
import OrchidForm from '../components/OrchidForm';
import { getOrchidById } from '../utils/orchidApi';

const EditOrchidPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editOrchid } = useOrchid();
  
  const [initialData, setInitialData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch initial data based on URL ID
  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        const data = await getOrchidById(id);
        setInitialData(data);
      } catch (err) {
        setError('Không thể tải thông tin Orchid hoặc Orchid không tồn tại.');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchOrchid();
  }, [id]);

  const handleSubmit = async (formData) => {
    setError('');
    setSubmitLoading(true);
    try {
      await editOrchid(id, formData);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật Orchid.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Chỉnh sửa Hoa Lan (ID: {id})</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {initialData && (
        <div className="bg-light p-4 rounded shadow-sm">
          <OrchidForm 
            initialData={initialData} 
            onSubmit={handleSubmit} 
            loading={submitLoading} 
          />
        </div>
      )}
    </Container>
  );
};

export default EditOrchidPage;
