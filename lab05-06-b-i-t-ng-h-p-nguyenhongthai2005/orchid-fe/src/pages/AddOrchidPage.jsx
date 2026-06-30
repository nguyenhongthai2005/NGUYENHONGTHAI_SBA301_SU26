import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useOrchid } from '../context/OrchidContext';
import OrchidForm from '../components/OrchidForm';

const AddOrchidPage = () => {
  const { addOrchid } = useOrchid();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);
    try {
      await addOrchid(formData);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Có lỗi xảy ra khi thêm mới Orchid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Thêm mới Hoa Lan</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="bg-light p-4 rounded shadow-sm">
        <OrchidForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </Container>
  );
};

export default AddOrchidPage;
