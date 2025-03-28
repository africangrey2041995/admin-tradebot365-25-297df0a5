
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Settings,
  Receipt
} from 'lucide-react';

interface AdminSidebarProps {
  collapsed: boolean;
}

const SidebarLink = ({ 
  to, 
  icon: Icon, 
  label, 
  collapsed 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  collapsed: boolean;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
          "hover:bg-zinc-800",
          isActive ? "bg-zinc-800 text-white" : "text-zinc-400"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-zinc-400")} />
          {!collapsed && <span>{label}</span>}
        </>
      )}
    </NavLink>
  );
};

export function AdminSidebar({ collapsed }: AdminSidebarProps) {
  return (
    <div className={cn(
      "h-screen flex flex-col bg-zinc-900",
      collapsed ? "w-16" : "w-64",
      "fixed left-0 top-0 z-20 transition-all duration-300"
    )}>
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        {!collapsed && (
          <span className="font-semibold text-white">Admin Dashboard</span>
        )}
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <nav className="flex flex-col gap-1 p-2">
          <SidebarLink
            to="/admin/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/admin/users"
            icon={Users}
            label="Quản lý người dùng"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/admin/packages"
            icon={Package}
            label="Quản lý gói dịch vụ"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/admin/subscriptions"
            icon={Receipt}
            label="Quản lý đăng ký"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/admin/settings"
            icon={Settings}
            label="Cài đặt hệ thống"
            collapsed={collapsed}
          />
        </nav>
      </ScrollArea>
    </div>
  );
}
