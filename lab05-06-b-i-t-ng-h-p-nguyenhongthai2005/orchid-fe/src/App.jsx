import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrchidProvider } from './context/OrchidContext';

import AppNavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddOrchidPage from './pages/AddOrchidPage';
import EditOrchidPage from './pages/EditOrchidPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <OrchidProvider>
          <AppNavBar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes */}
            <Route 
              path="/add" 
              element={
                <ProtectedRoute>
                  <AddOrchidPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <ProtectedRoute>
                  <EditOrchidPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </OrchidProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
