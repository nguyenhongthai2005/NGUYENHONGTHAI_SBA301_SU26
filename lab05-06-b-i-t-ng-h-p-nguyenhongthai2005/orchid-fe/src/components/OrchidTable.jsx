import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrchidTable = ({ orchids, onDeleteClick }) => {
  const { token, user } = useAuth();

  const isLoggedIn = !!token;
  
  let isAdmin = false;
  if (user) {
    const authorities = user.authorities || user.roles || user.role || [];
    if (Array.isArray(authorities) && authorities.length > 0) {
      const roleStr = typeof authorities[0] === 'object' ? authorities[0].authority : authorities[0];
      isAdmin = roleStr === 'ROLE_ADMIN' || roleStr === 'ADMIN';
    } else if (typeof authorities === 'string') {
      isAdmin = authorities === 'ROLE_ADMIN' || authorities === 'ADMIN';
    }
  }

  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Tên Orchid</th>
          <th>Loại</th>
          <th>Tự nhiên</th>
          <th>Đẹp</th>
          {isLoggedIn && <th>Hành động</th>}
        </tr>
      </thead>
      <tbody>
        {orchids && orchids.length > 0 ? (
          orchids.map((orchid) => (
            <tr key={orchid.orchidId}>
              <td>{orchid.orchidId}</td>
              <td>{orchid.orchidName}</td>
              <td>{orchid.orchidCategory}</td>
              <td>
                {orchid.isNatural ? (
                  <Badge bg="success">Có</Badge>
                ) : (
                  <Badge bg="secondary">Không</Badge>
                )}
              </td>
              <td>
                {orchid.isAttractive ? (
                  <Badge bg="primary">Có</Badge>
                ) : (
                  <Badge bg="secondary">Không</Badge>
                )}
              </td>
              {isLoggedIn && (
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    as={Link}
                    to={`/edit/${orchid.orchidId}`}
                  >
                    Sửa
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDeleteClick(orchid.orchidId)}
                    >
                      Xóa
                    </Button>
                  )}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={isLoggedIn ? 6 : 5} className="text-center py-4">
              Không có dữ liệu
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default OrchidTable;
