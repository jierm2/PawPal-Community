import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Initialize as null
  const [mongoDBUser, setMongoDBUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false); // Set initial loading state to false

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch MongoDB user data using the email
        try {
          const email = encodeURIComponent(user.email);
          const response = await fetch(`http://localhost:9001/api/users?email=${email}`);
          const userData = await response.json();
          setMongoDBUser(userData.data); // Adjust this based on your API response
        } catch (error) {
          console.error("Failed to fetch user data from MongoDB", error);
        }
      } else {
        setMongoDBUser(null);
      }
      setLoading(false); // Set loading to false after user state is determined
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    mongoDBUser
  };

  if (loading) {
    // Return a loading indicator or null
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
