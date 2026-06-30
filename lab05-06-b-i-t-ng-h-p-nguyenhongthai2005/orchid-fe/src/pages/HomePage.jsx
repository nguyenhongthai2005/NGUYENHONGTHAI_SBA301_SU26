import React, { useEffect, useState } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useOrchid } from '../context/OrchidContext';
import OrchidTable from '../components/OrchidTable';
import ConfirmModal from '../components/ConfirmModal';

const HomePage = () => {
  const { orchids, loading, error, fetchOrchids, removeOrchid } = useOrchid();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchOrchids();
  }, [fetchOrchids]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      await removeOrchid(selectedId);
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
      // Có thể thêm state để hiển thị lỗi xóa ở đây nếu cần
    } finally {
      setIsDeleting(false);
      setSelectedId(null);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Danh sách Hoa Lan (Orchids)</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      ) : (
        <OrchidTable orchids={orchids} onDeleteClick={handleDeleteClick} />
      )}

      <ConfirmModal
        show={showDeleteModal}
        onHide={() => !isDeleting && setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        body="Bạn có chắc chắn muốn xóa loài hoa lan này không? Hành động này không thể hoàn tác."
        loading={isDeleting}
      />
    </Container>
  );
};

export default HomePage;
