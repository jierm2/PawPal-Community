import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If there is no user, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
}
export default ProtectedRoute;


