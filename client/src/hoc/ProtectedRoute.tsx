import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'context/auth';

const ProtectedRoute: React.FC = (props) => {
  const { authState } = React.useContext(AuthContext);

  if (!authState) return <Navigate to="/signin" />;

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ProtectedRoute;
