import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';
function PublicRoute({ children }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    // If there is no user, redirect to login
    return <Navigate to="/settings" />;
  }

  return children;
}
export default PublicRoute;


