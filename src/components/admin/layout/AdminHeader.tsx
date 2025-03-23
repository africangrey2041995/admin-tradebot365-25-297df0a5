
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const AdminHeader: React.FC = () => {
  return (
    <div className="h-14 border-b border-zinc-800 bg-zinc-900 flex items-center px-4">
      <SidebarTrigger className="mr-4 text-zinc-400" />
      <h1 className="text-lg font-medium text-white">Hệ thống quản trị Trade Bot 365</h1>
    </div>
  );
};

export default AdminHeader;
