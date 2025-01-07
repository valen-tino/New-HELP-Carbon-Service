import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
}

const UserRoute: React.FC<Props> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== 'user') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default UserRoute;