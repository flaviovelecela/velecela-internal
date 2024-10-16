import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserRoles } from './userRoles';  // Note: This function now fetches the "role" field

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState([]);  // Still keeping userRoles as an array for consistency

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const roles = await getUserRoles(user.uid);  // Fetch "role" field (singular)
          console.log("Fetched user roles:", roles);  // Debugging line
          setUserRoles(roles);  // Set userRoles to the fetched roles
        } catch (error) {
          console.error("Error fetching user roles:", error);
        }
      } else {
        setUserRoles([]);  // Reset to an empty array if no user is logged in
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRoles,  // Still provide userRoles (array) to the rest of the app
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
