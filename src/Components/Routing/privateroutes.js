import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ requiredRole }) => {
  const { currentUser, userRoles, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;  // Optionally, show a loading spinner
  }

  if (!currentUser) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  if (requiredRole && !userRoles?.includes(requiredRole)) {
    return <div>Access Denied. You don't have the required role.</div>;  // Access denied
  }

  return <Outlet />;  // Render the child routes
};

export default PrivateRoute;
