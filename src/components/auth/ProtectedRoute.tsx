
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserContext';
import { USER_ROUTES } from '@/constants/routes';

interface ProtectedRouteProps {
  children: ReactNode;
  requiresAdmin?: boolean;
  requiresSuperAdmin?: boolean;
  requiresPremium?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresAdmin = false,
  requiresSuperAdmin = false,
  requiresPremium = false,
}) => {
  const { userId, isAdmin, isSuperAdmin, isPremiumUser } = useUserContext();

  // Check if user is authenticated
  if (!userId) {
    return <Navigate to={USER_ROUTES.SIGN_IN} replace />;
  }

  // Check if route requires admin privileges
  if (requiresAdmin && !isAdmin) {
    return <Navigate to={USER_ROUTES.HOME} replace />;
  }

  // Check if route requires super admin privileges
  if (requiresSuperAdmin && !isSuperAdmin) {
    return <Navigate to={USER_ROUTES.HOME} replace />;
  }

  // Check if route requires premium subscription
  if (requiresPremium && !isPremiumUser) {
    return <Navigate to={USER_ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
