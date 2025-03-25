
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/sonner";

/**
 * AdminLayout component
 * This layout is used for all admin pages
 */
const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex flex-col p-6">
        {/* Admin content */}
        <main className={cn(
          "rounded-lg",
          "transition-all duration-300 ease-in-out"
        )}>
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" theme="dark" />
    </div>
  );
};

export default AdminLayout;
