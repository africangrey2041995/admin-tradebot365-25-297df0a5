
import React from 'react';
import SidebarNav from './SidebarNav';
import Header from './Header';
import { useUser } from '@/hooks/use-user';
import { Navigate } from 'react-router-dom';

interface UserLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const UserLayout: React.FC<UserLayoutProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { isAuthenticated, loading } = useUser();
  
  // If authentication is required but user is not authenticated
  if (requireAuth && !loading && !isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <SidebarNav />
        
        <main className="flex-1 overflow-y-auto bg-[#0c0c0c] p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
