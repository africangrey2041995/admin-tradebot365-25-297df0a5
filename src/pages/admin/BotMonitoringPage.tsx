
import React from 'react';
import { useAdmin } from '@/hooks/use-admin';
import { Navigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import AdminBotMonitoring from '@/components/admin/monitoring/BotMonitoringPage';

/**
 * Trang giám sát Bot dành cho Admin 
 */
const AdminBotMonitoringPage: React.FC = () => {
  const { isAdmin, isSuperAdmin } = useAdmin();
  
  // Nếu không phải admin, chuyển hướng về trang dashboard
  if (!isAdmin) {
    return <Navigate to={ADMIN_ROUTES.DASHBOARD} replace />;
  }
  
  return <AdminBotMonitoring />;
};

export default AdminBotMonitoringPage;
