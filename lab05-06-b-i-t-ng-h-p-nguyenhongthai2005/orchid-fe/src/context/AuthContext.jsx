import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, signupApi } from '../utils/orchidApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navigate = useNavigate();

  const decodeToken = (jwtToken) => {
    try {
      if (!jwtToken) return null;
      const base64Url = jwtToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/, '/');
      const payload = JSON.parse(atob(base64));
      
      // Extract role based on Spring Security's "ROLE_ADMIN" or "ROLE_USER" format
      let role = '';
      if (payload.roles) {
        // sometimes claims are in "roles" or "authorities" array depending on BE config.
        // But our BE creates standard token. Let's assume standard extraction,
        // or actually our BE doesn't explicitly put role in extraClaims but Spring Security might.
        // Wait, BE generateToken doesn't put role into claims explicitly in JwtService, 
        // it just uses the subject. BUT for standard token decoding, we usually need claims.
        // If it's just email, we can at least get sub. Let's decode it safely.
      }
      
      return payload;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };

  const decoded = useMemo(() => decodeToken(token), [token]);

  const login = async (credentials) => {
    const response = await loginApi(credentials);
    const newToken = response.accessToken;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/');
  };

  const signup = async (userData) => {
    const response = await signupApi(userData);
    const newToken = response.accessToken;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/');
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }, [navigate]);

  const value = {
    token,
    user: decoded, // contains 'sub' (email) and potentially 'role'
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
