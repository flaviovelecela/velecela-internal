import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase-config'; // Adjust path as necessary
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);  // Update loading state when auth state is confirmed
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Or some other loading indicator
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
