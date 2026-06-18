import { Table, Button, Badge, Image } from 'react-bootstrap';

const OrchidTable = ({ orchids, onEdit, onDelete }) => {
  if (!orchids || orchids.length === 0) {
    return <div className="alert alert-info mt-3">No orchids found. Please add some!</div>;
  }

  return (
    <Table striped bordered hover responsive className="mt-3 align-middle">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Natural</th>
          <th>Attractive</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orchids.map((o, index) => (
          <tr key={o.orchidId}>
            <td>{index + 1}</td>
            <td className="text-center">
              {o.orchidURL ? (
                <Image
                  src={o.orchidURL}
                  alt={o.orchidName}
                  thumbnail
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <span className="text-muted">N/A</span>
              )}
            </td>
            <td className="fw-bold">{o.orchidName}</td>
            <td>{o.orchidCategory}</td>
            <td>
              <Badge bg={o.isNatural ? 'success' : 'secondary'}>
                {o.isNatural ? 'Yes' : 'No'}
              </Badge>
            </td>
            <td>
              <Badge bg={o.isAttractive ? 'warning' : 'light'} text={o.isAttractive ? 'dark' : 'dark'}>
                {o.isAttractive ? 'Yes' : 'No'}
              </Badge>
            </td>
            <td>
              <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {o.orchidDescription}
              </div>
            </td>
            <td>
              <div className="d-flex gap-2">
                <Button variant="outline-primary" size="sm" onClick={() => onEdit(o.orchidId)}>
                  Edit
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(o.orchidId)}>
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrchidTable;
