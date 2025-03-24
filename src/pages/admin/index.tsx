
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Redirects from /admin/index to /admin/prop-bots
 * This aligns with the routing structure where AdminLayout uses Outlet
 */
const AdminIndexPage = () => {
  // Simply redirect to the prop-bots page when accessing /admin directly
  return <Navigate to="/admin/prop-bots" replace />;
};

export default AdminIndexPage;
