import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { CircularProgress } from '@mui/material'; // Import CircularProgress from Material-UI

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const [authenticated, setAuthenticated] = useState(false); // Track authentication status

  useEffect(() => {
    // Delay the authentication check to prevent immediate redirection
    const delay = setTimeout(() => {
      if (!currentUser && !loading) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    }, 1000); // Adjust the delay duration as needed

    return () => clearTimeout(delay); // Clear the timeout on unmount
  }, [currentUser, loading]);

  if (loading || !authenticated) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
  }

  return children;
}

export default ProtectedRoute;
