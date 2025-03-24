
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { cn } from '@/lib/utils';

/**
 * AdminLayout component
 * This layout is used for all admin pages
 */
const AdminLayout: React.FC = () => {
  // Use dark mode colors based on the image provided
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
    </div>
  );
};

export default AdminLayout;
