import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert, Container } from 'react-bootstrap';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, user } = useAuth();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user is decoded and there's a required role, check if they have it
  // Depending on JWT payload format, roles might be in an array or a single string
  // For Spring Security, authorities/roles are usually something like [{ authority: "ROLE_ADMIN" }] or similar
  // Adjust this check according to how your BE encodes it. 
  // We'll assume the role is simply in a string or array that we can check against.
  if (requiredRole && user) {
    let hasRole = false;
    
    // We parse roles based on typical spring boot JWT payloads
    // Sometimes it's user.role, user.roles, or user.authorities
    const authorities = user.authorities || user.roles || user.role || [];
    
    if (Array.isArray(authorities)) {
        // If it's an array of objects (like { authority: "ROLE_ADMIN" })
        if (authorities.length > 0 && typeof authorities[0] === 'object') {
            hasRole = authorities.some(auth => auth.authority === requiredRole);
        } else {
            // Array of strings
            hasRole = authorities.includes(requiredRole);
        }
    } else if (typeof authorities === 'string') {
        hasRole = authorities === requiredRole;
    }

    if (!hasRole) {
      return (
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>Lỗi 403 - Forbidden</Alert.Heading>
            <p>Bạn không có quyền truy cập vào trang này.</p>
          </Alert>
        </Container>
      );
    }
  }

  return children;
};

export default ProtectedRoute;
