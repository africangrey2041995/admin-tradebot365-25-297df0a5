
import React from 'react';
import NavGroup from './sidebar/NavGroup';
import NavMenuItem from './sidebar/NavMenuItem';
import CollapsibleMenuItem from './sidebar/CollapsibleMenuItem';
import { 
  LayoutDashboard, Bot, AlertTriangle, Users, 
  Settings, Briefcase, LineChart, ShieldCheck, Database
} from 'lucide-react';
import { User, UserRole } from '@/types';
import { USER_ROUTES, ADMIN_ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/hooks/use-admin';

// Mock current user - this would come from auth context in a real app
const CURRENT_USER: Partial<User> = {
  id: 'USR-001',
  role: 'user' as UserRole, // Type assertion to UserRole
  // isAdmin defined through hook now
};

const SidebarNav = () => {
  // Use the admin hook to determine if user is admin
  const { isAdmin } = useAdmin();
  
  console.log("Is admin:", isAdmin);
  
  // Show admin sidebar if user is admin
  if (isAdmin) {
    return (
      <aside className="hidden lg:flex w-[260px] border-r border-slate-200 dark:border-zinc-800 flex-col h-screen fixed left-0 top-0 bg-white dark:bg-zinc-950 z-30">
        <div className="p-6">
          <h1 className="text-xl font-semibold flex items-center">
            <Bot className="inline-block mr-2 h-5 w-5 text-green-500" /> 
            <span>TradingBot</span>
            <span className="text-green-500">Admin</span>
          </h1>
        </div>
        
        <div className="overflow-y-auto flex-1 py-4">
          <NavGroup title="Dashboard">
            <NavMenuItem icon={<LayoutDashboard size={18} />} href={ADMIN_ROUTES.DASHBOARD} label="Dashboard" />
          </NavGroup>
          
          <NavGroup title="Management">
            <NavMenuItem icon={<Users size={18} />} href={ADMIN_ROUTES.USERS} label="Người dùng" />
            <NavMenuItem icon={<Bot size={18} />} href={ADMIN_ROUTES.BOTS} label="Tất cả Bot" />
            <NavMenuItem icon={<AlertTriangle size={18} />} href={ADMIN_ROUTES.BOT_ERRORS} label="Lỗi Bot" />
            
            <CollapsibleMenuItem 
              icon={<LineChart size={18} />} 
              label="Bot Marketplace"
              items={[
                { href: ADMIN_ROUTES.PREMIUM_BOTS, label: "Premium Bots" },
                { href: ADMIN_ROUTES.PROP_BOTS, label: "Prop Trading Bots" },
                { href: ADMIN_ROUTES.USER_BOTS, label: "User Bots" }
              ]}
            />
            
            <NavMenuItem icon={<Briefcase size={18} />} href={ADMIN_ROUTES.PACKAGES} label="Gói dịch vụ" />
          </NavGroup>
          
          <NavGroup title="System">
            <NavMenuItem icon={<Database size={18} />} href={ADMIN_ROUTES.DATABASE} label="Database" />
            <NavMenuItem icon={<AlertTriangle size={18} />} href={ADMIN_ROUTES.LOGS} label="Logs" />
            <NavMenuItem icon={<Settings size={18} />} href={ADMIN_ROUTES.SETTINGS} label="Cài đặt" />
            <NavMenuItem icon={<ShieldCheck size={18} />} href={ADMIN_ROUTES.ADMIN_MANAGEMENT} label="Quản lý Admin" />
          </NavGroup>
        </div>
      </aside>
    );
  }
  
  // User sidebar
  return (
    <aside className="hidden lg:flex w-[260px] border-r border-slate-200 dark:border-zinc-800 flex-col h-screen fixed left-0 top-0 bg-white dark:bg-zinc-950 z-30">
      <div className="p-6">
        <h1 className="text-xl font-semibold flex items-center">
          <Bot className="inline-block mr-2 h-5 w-5 text-green-500" /> 
          <span>TradingBot</span>
        </h1>
      </div>
      
      <div className="overflow-y-auto flex-1 py-4">
        <NavGroup title="Tổng quan">
          <NavMenuItem icon={<LayoutDashboard size={18} />} href={USER_ROUTES.HOME} label="Dashboard" />
        </NavGroup>
        
        <NavGroup title="Bot của tôi">
          <NavMenuItem icon={<Bot size={18} />} href={USER_ROUTES.BOTS} label="Bot Người Dùng" />
          <NavMenuItem icon={<Bot size={18} />} href={USER_ROUTES.INTEGRATED_PREMIUM_BOTS} label="Bot Premium Đã Tích Hợp" />
          <NavMenuItem icon={<Bot size={18} />} href={USER_ROUTES.INTEGRATED_PROP_BOTS} label="Prop Trading Đã Tích Hợp" />
          <NavMenuItem icon={<AlertTriangle size={18} />} href={USER_ROUTES.BOT_ERRORS} label="Quản Lý Lỗi Bot" />
        </NavGroup>
        
        <NavGroup title="Marketplace">
          <NavMenuItem icon={<LineChart size={18} />} href={USER_ROUTES.PREMIUM_BOTS} label="Premium Bots" />
          <NavMenuItem icon={<LineChart size={18} />} href={USER_ROUTES.PROP_BOTS} label="Prop Trading Bots" />
        </NavGroup>
        
        <NavGroup title="Tài khoản">
          <NavMenuItem icon={<Users size={18} />} href={USER_ROUTES.ACCOUNTS} label="Tài khoản giao dịch" />
          <NavMenuItem icon={<Settings size={18} />} href={USER_ROUTES.SETTINGS} label="Cài đặt" />
        </NavGroup>
      </div>
    </aside>
  );
};

export default SidebarNav;
