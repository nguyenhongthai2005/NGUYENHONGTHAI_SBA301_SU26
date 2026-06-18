import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useOrchid } from '../context/OrchidContext';
import OrchidTable from '../components/OrchidTable';
import OrchidCard from '../components/OrchidCard';
import ConfirmModal from '../components/ConfirmModal';

const HomePage = () => {
  const { orchids, loading, error, fetchOrchids, removeOrchid } = useOrchid();
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchOrchids();
  }, [fetchOrchids]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    const target = orchids.find(o => o.orchidId === id);
    if (target) setDeleteTarget(target);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeOrchid(deleteTarget.orchidId);
      setDeleteTarget(null);
    } catch (err) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-primary fw-bold">DASHBOARD</h2>
        <Button variant="success" onClick={() => navigate('/add')} className="shadow-sm">
          ➕ Add Orchid
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-end mb-3">
        <ButtonGroup size="sm">
          <Button 
            variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
            onClick={() => setViewMode('table')}
          >
            Table View
          </Button>
          <Button 
            variant={viewMode === 'card' ? 'primary' : 'outline-primary'}
            onClick={() => setViewMode('card')}
          >
            Card View
          </Button>
        </ButtonGroup>
      </div>

      {loading && orchids.length === 0 ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading orchids...</p>
        </div>
      ) : (
        <>
          {viewMode === 'table' ? (
            <OrchidTable 
              orchids={orchids} 
              onEdit={handleEdit} 
              onDelete={handleDeleteClick} 
            />
          ) : (
            <Row xs={1} md={3} lg={4} className="g-4">
              {orchids && orchids.length > 0 ? orchids.map(o => (
                <Col key={o.orchidId}>
                  <OrchidCard 
                    orchid={o} 
                    onEdit={handleEdit} 
                    onDelete={handleDeleteClick} 
                  />
                </Col>
              )) : (
                <Col xs={12}>
                  <Alert variant="info">No orchids found. Please add some!</Alert>
                </Col>
              )}
            </Row>
          )}
        </>
      )}

      <ConfirmModal
        show={!!deleteTarget}
        onHide={() => !deleting && setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        orchidName={deleteTarget?.orchidName}
        loading={deleting}
      />
    </Container>
  );
};

export default HomePage;
