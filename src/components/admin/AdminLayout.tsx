
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebarNav from './sidebar/AdminSidebarNav';
import AdminHeader from './AdminHeader';
import { UserSearch } from 'lucide-react';
import { Button } from '../ui/button';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useErrorStats } from '@/hooks/useErrorStats';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Lấy thống kê lỗi từ hook
  const { totalErrors, isLoading: errorStatsLoading } = useErrorStats();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserSearch = () => {
    navigate(ADMIN_ROUTES.USERS);
  };

  // Kiểm tra xem đây có phải là trang dashboard không
  const isDashboard = location.pathname === ADMIN_ROUTES.DASHBOARD;

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-black text-white">
        <div className="flex h-screen w-full">
          {/* Sidebar */}
          <div className={`${isSidebarOpen ? 'w-64' : 'w-0 -ml-64'} transition-all duration-300 ease-in-out h-screen`}>
            <AdminSidebarNav />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col max-h-screen overflow-hidden bg-zinc-950">
            <AdminHeader 
              toggleSidebar={toggleSidebar} 
              title="Admin Dashboard" 
              errorCount={totalErrors}
            >
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleUserSearch}
                className="ml-auto"
              >
                <UserSearch className="mr-2 h-4 w-4" />
                Tìm kiếm người dùng
              </Button>
            </AdminHeader>
            
            <main className="flex-1 overflow-y-auto p-6">
              {/* Wrap the Outlet with an ErrorBoundary for safety */}
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
