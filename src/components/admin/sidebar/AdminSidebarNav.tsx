
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  Database,
  Scroll,
  Bell,
  Mail,
  Settings,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import TradeBotLogo from '@/components/common/TradeBotLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import NavGroup from '@/components/layout/sidebar/NavGroup';
import NavMenuItem from '@/components/layout/sidebar/NavMenuItem';

const AdminSidebarNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const navigateToUser = () => {
    navigate("/");
  };

  return (
    <Sidebar className="border-r border-zinc-800">
      <SidebarContent className="bg-zinc-900 text-white h-full">
        {/* Logo */}
        <div className={cn(
          "flex justify-center items-center bg-zinc-900",
          isMobile ? "py-4" : "py-6 px-4"
        )}>
          <TradeBotLogo 
            size={isMobile ? "medium" : "large"} 
            className="mx-auto"
            showBetaTag={true}
          />
        </div>
        
        <SidebarSeparator className="bg-zinc-800" />
        
        {/* Admin Navigation */}
        <NavGroup label="Quản trị viên">
          <NavMenuItem 
            path="/admin" 
            label="Bảng điều khiển" 
            icon={LayoutDashboard} 
            isActive={isActive('/admin') && location.pathname === '/admin'} 
          />
          <NavMenuItem 
            path="/admin/users" 
            label="Người dùng" 
            icon={Users} 
            isActive={isActive('/admin/users')} 
          />
        </NavGroup>
        
        {/* Premium Section */}
        <NavGroup label="Premium">
          <NavMenuItem 
            path="/admin/premium-bots" 
            label="Bot Premium" 
            icon={Sparkles} 
            isActive={isActive('/admin/premium-bots')} 
          />
          <NavMenuItem 
            path="/admin/prop-bots" 
            label="Bot Prop Trading" 
            icon={TrendingUp} 
            isActive={isActive('/admin/prop-bots')} 
          />
          <NavMenuItem 
            path="/admin/user-bots" 
            label="Bot Người dùng" 
            icon={Users} 
            isActive={isActive('/admin/user-bots')} 
          />
          <NavMenuItem 
            path="/admin/packages" 
            label="Gói dịch vụ" 
            icon={Package} 
            isActive={isActive('/admin/packages')} 
          />
        </NavGroup>
        
        {/* System */}
        <NavGroup label="Hệ thống">
          <NavMenuItem 
            path="/admin/database" 
            label="Cơ sở dữ liệu" 
            icon={Database} 
            isActive={isActive('/admin/database')} 
          />
          <NavMenuItem 
            path="/admin/logs" 
            label="Nhật ký" 
            icon={Scroll} 
            isActive={isActive('/admin/logs')} 
          />
          <NavMenuItem 
            path="/admin/notifications" 
            label="Thông báo" 
            icon={Bell} 
            isActive={isActive('/admin/notifications')} 
          />
          <NavMenuItem 
            path="/admin/email" 
            label="Email" 
            icon={Mail} 
            isActive={isActive('/admin/email')} 
          />
        </NavGroup>
        
        {/* Settings */}
        <NavGroup label="Cài đặt">
          <NavMenuItem 
            path="/admin/settings" 
            label="Cài đặt hệ thống" 
            icon={Settings} 
            isActive={isActive('/admin/settings')} 
          />
          <NavMenuItem 
            path="/admin/admin-management" 
            label="Quản lý admin" 
            icon={ShieldAlert} 
            isActive={isActive('/admin/admin-management')} 
          />
        </NavGroup>
      </SidebarContent>
      
      {/* Navigation Footer */}
      <SidebarFooter className="bg-zinc-900 border-t border-zinc-800 p-2">
        <button
          onClick={navigateToUser}
          className={cn(
            "flex w-full items-center px-3 py-2 text-sm rounded-md transition-colors",
            "text-green-400 hover:text-white hover:bg-green-700/50"
          )}
        >
          <LayoutDashboard className="h-5 w-5 mr-3" />
          <span>Quay lại giao diện người dùng</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebarNav;
