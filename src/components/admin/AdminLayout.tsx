
import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAdmin } from '@/hooks/use-admin';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { toast } from 'sonner';
import AdminSidebar from './layout/AdminSidebar';
import AdminHeader from './layout/AdminHeader';

const AdminLayout: React.FC = () => {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  // Debug logs
  console.log("AdminLayout rendered");
  console.log("Admin status:", { isAdmin, loading });
  console.log("Current location:", location.pathname);

  // Redirect non-admin users
  useEffect(() => {
    console.log("AdminLayout useEffect - isAdmin:", isAdmin, "loading:", loading);
    if (!loading && !isAdmin) {
      console.log("User is not admin, redirecting to home");
      toast.error("Bạn không có quyền truy cập vào trang quản trị.");
      navigate('/');
    }
  }, [isAdmin, loading, navigate]);

  // Show loading state while checking admin status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500 border-r-2 border-b-2 border-zinc-700 mx-auto mb-4"></div>
          <p className="text-zinc-400">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // If not admin after loading is complete, don't render anything
  if (!isAdmin) {
    console.log("Not rendering AdminLayout because user is not admin");
    return null;
  }

  console.log("Rendering AdminLayout content - user is admin");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Admin Sidebar */}
        <Sidebar className="border-r border-zinc-800">
          <AdminSidebar />
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex flex-col flex-1 h-screen overflow-y-auto bg-zinc-950">
          {/* Top Bar */}
          <AdminHeader />
          
          {/* Admin Content */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
