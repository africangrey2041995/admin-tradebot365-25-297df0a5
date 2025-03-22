
import React, { ReactNode } from 'react';
import { SidebarNav } from './SidebarNav';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-64 flex-col border-r">
        <SidebarNav />
      </div>
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
