import React from 'react';
import { Navigate } from 'react-router-dom';

const NonProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');  

  if (token) {
    return <Navigate to="/home" replace />;  
  }

  return element;  
};

export default NonProtectedRoute;
