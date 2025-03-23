
import React from 'react';
import SidebarNav from './SidebarNav';
import Header from './Header';
import { useUser } from '@/hooks/use-user';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';

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
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#0a0a0a]">
        <Header />
        
        <div className="flex flex-1">
          <SidebarNav />
          
          <main className="flex-1 overflow-y-auto bg-[#0a0a0a] p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserLayout;
