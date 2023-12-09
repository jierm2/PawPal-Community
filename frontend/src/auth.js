import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [mongoDBUser, setMongoDBUser] = useState(); // State for MongoDB user data

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
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    mongoDBUser 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
