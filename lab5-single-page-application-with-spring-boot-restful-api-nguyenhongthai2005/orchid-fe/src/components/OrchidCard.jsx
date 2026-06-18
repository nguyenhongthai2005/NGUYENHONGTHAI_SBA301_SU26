import { Card, Button, Badge } from 'react-bootstrap';

const OrchidCard = ({ orchid, onEdit, onDelete }) => {
  return (
    <Card className="h-100 shadow-sm">
      <div style={{ height: '200px', overflow: 'hidden' }}>
        {orchid.orchidURL ? (
          <Card.Img
            variant="top"
            src={orchid.orchidURL}
            alt={orchid.orchidName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
            No Image
          </div>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold text-primary">{orchid.orchidName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{orchid.orchidCategory}</Card.Subtitle>
        
        <div className="mb-3">
          <Badge bg={orchid.isNatural ? 'success' : 'secondary'} className="me-2">
            Natural: {orchid.isNatural ? 'Yes' : 'No'}
          </Badge>
          <Badge bg={orchid.isAttractive ? 'warning' : 'light'} text={orchid.isAttractive ? 'dark' : 'dark'}>
            Attractive: {orchid.isAttractive ? 'Yes' : 'No'}
          </Badge>
        </div>

        <Card.Text className="flex-grow-1" style={{ fontSize: '0.9rem', color: '#555' }}>
          {orchid.orchidDescription && orchid.orchidDescription.length > 100 
            ? orchid.orchidDescription.substring(0, 100) + '...'
            : orchid.orchidDescription}
        </Card.Text>

        <div className="mt-auto d-flex justify-content-between">
          <Button variant="outline-primary" size="sm" onClick={() => onEdit(orchid.orchidId)} className="w-100 me-2">
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(orchid.orchidId)} className="w-100">
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrchidCard;
