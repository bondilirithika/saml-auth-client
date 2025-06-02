// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;