
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import {
  Users,
  Bot,
  BarChart3,
  Settings,
  Database,
  Mail,
  Bell,
  LogOut,
  FileText,
  ShieldCheck,
  Crown,
  Briefcase,
  UserCircle,
  AlertTriangle,
  Package
} from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

interface NavItemProps {
  path: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ path, icon, label, badge, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === path || location.pathname.startsWith(`${path}/`);

  if (onClick) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton onClick={onClick}>
          {icon}
          <span>{label}</span>
          {badge && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 ml-auto text-xs font-medium">
              {badge}
            </span>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={path}>
          {icon}
          <span>{label}</span>
          {badge && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 ml-auto text-xs font-medium">
              {badge}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const AdminNavItems: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in');
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Quản lý chung</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <NavItem 
              path="/admin" 
              icon={<BarChart3 className="h-4 w-4" />} 
              label="Tổng quan" 
            />
            
            <NavItem 
              path="/admin/users" 
              icon={<Users className="h-4 w-4" />} 
              label="Quản lý người dùng" 
            />

            <NavItem 
              path="/admin/packages" 
              icon={<Package className="h-4 w-4" />} 
              label="Quản lý gói dịch vụ" 
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>Quản lý Bot</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <NavItem 
              path="/admin/premium-bots" 
              icon={<Crown className="h-4 w-4" />} 
              label="Premium Bots" 
            />
            
            <NavItem 
              path="/admin/prop-bots" 
              icon={<Briefcase className="h-4 w-4" />} 
              label="Prop Trading Bots" 
            />
            
            <NavItem 
              path="/admin/user-bots" 
              icon={<UserCircle className="h-4 w-4" />} 
              label="Bot người dùng" 
            />

            <NavItem 
              path="/admin/bot-errors" 
              icon={<AlertTriangle className="h-4 w-4" />} 
              label="Quản lý lỗi Bot" 
              badge={8}
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>Hệ thống</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <NavItem 
              path="/admin/database" 
              icon={<Database className="h-4 w-4" />} 
              label="Cơ sở dữ liệu" 
            />
            
            <NavItem 
              path="/admin/logs" 
              icon={<FileText className="h-4 w-4" />} 
              label="Nhật ký hệ thống" 
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>Thông báo</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <NavItem 
              path="/admin/notifications" 
              icon={<Bell className="h-4 w-4" />} 
              label="Quản lý thông báo" 
            />
            
            <NavItem 
              path="/admin/email" 
              icon={<Mail className="h-4 w-4" />} 
              label="Mẫu email" 
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>Tài khoản</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <NavItem 
              path="/admin/settings" 
              icon={<Settings className="h-4 w-4" />} 
              label="Cài đặt hệ thống" 
            />
            
            <NavItem 
              path="/admin/admin-management" 
              icon={<ShieldCheck className="h-4 w-4" />} 
              label="Quản lý Admin" 
            />
            
            <NavItem 
              icon={<LogOut className="h-4 w-4" />} 
              label="Đăng xuất" 
              path="" 
              onClick={handleSignOut}
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default AdminNavItems;
