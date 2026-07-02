import { Modal, Button } from 'react-bootstrap';

export default function ConfirmDialog({ show, handleClose, handleConfirm, targetName, loading }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc chắn muốn xóa người dùng <strong className="text-danger">{targetName}</strong> không? Hành động này không thể hoàn tác.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Hủy bỏ
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={loading}>
          {loading ? 'Đang xóa...' : 'Đồng ý xóa'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
