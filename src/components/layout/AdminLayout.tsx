
import React from 'react';
import { SidebarNav } from './SidebarNav';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200 dark:border-zinc-800 hidden md:block">
        <SidebarNav />
      </div>
      
      {/* Main content area */}
      <div className="flex-1">
        <main className="p-6">
          <div className={cn(
            "bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-700 p-6"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
