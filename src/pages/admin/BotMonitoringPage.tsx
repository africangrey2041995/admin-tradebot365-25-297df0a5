
import React from 'react';
import BotMonitoring from '@/components/admin/monitoring/BotMonitoringPage';
import { useAdmin } from '@/hooks/use-admin';
import { Navigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';

/**
 * Trang giám sát Bot dành cho Admin 
 */
const BotMonitoringPage: React.FC = () => {
  const { isAdmin, isSuperAdmin } = useAdmin();
  
  // Nếu không phải admin, chuyển hướng về trang dashboard
  if (!isAdmin) {
    return <Navigate to={ADMIN_ROUTES.DASHBOARD} replace />;
  }
  
  return <BotMonitoring />;
};

export default BotMonitoringPage;
