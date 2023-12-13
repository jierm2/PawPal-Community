import React from 'react';
import { useAuth } from '../auth';
import { Navigate, useLocation } from 'react-router-dom';

function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // or return null to render nothing
  }

  if (currentUser && location.pathname !== '/settings') {
    return <Navigate to="/settings" />;
  }

  return children;
}

export default PublicRoute;