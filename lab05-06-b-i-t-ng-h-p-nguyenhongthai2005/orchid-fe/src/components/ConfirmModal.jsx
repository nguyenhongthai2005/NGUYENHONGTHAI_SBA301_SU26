import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const ConfirmModal = ({ show, onHide, onConfirm, title, body, loading }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={!loading} centered>
      <Modal.Header closeButton={!loading}>
        <Modal.Title>{title || 'Xác nhận'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body || 'Bạn có chắc chắn muốn thực hiện hành động này?'}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Hủy
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Đang xóa...
            </>
          ) : (
            'Xóa'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
