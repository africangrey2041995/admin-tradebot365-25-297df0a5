
import React from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebarNav from './sidebar/AdminSidebarNav';

/**
 * AdminLayout component
 * This layout is used for all admin pages
 */
const AdminLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-zinc-950 flex w-full">
        {/* Admin Sidebar Navigation */}
        <AdminSidebarNav />
        
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col p-6">
            {/* Admin content */}
            <main className={cn(
              "rounded-lg",
              "transition-all duration-300 ease-in-out"
            )}>
              <Outlet />
            </main>
          </div>
        </div>
        <Toaster position="top-right" theme="dark" />
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
