
import React from 'react';
import { 
  SidebarContent,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import AdminSidebarHeader from './AdminSidebarHeader';
import AdminNavItems from './AdminNavItems';

const AdminSidebar: React.FC = () => {
  return (
    <SidebarContent className="bg-[#0a0a0a] text-white h-full">
      <AdminSidebarHeader />
      
      <SidebarSeparator className="bg-zinc-800" />
      
      <SidebarSeparator className="bg-zinc-800 my-4" />
      
      <AdminNavItems />
    </SidebarContent>
  );
};

export default AdminSidebar;
