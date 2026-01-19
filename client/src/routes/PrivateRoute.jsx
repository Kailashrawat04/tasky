import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  // Ideally, we should also decode the token to check the role.
  // For now, we'll just check if the token exists to protect the route.
  // A robust implementation would parse the JWT payload.

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute