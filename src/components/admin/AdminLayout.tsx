import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAdmin } from '@/hooks/use-admin';
import { useClerk } from '@clerk/clerk-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarSeparator,
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
  ArrowLeft,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TradeBotLogo from '@/components/common/TradeBotLogo';

const AdminLayout = () => {
  const { isAdmin, isSuperAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useClerk();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Redirect non-admin users
  React.useEffect(() => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Truy cập bị từ chối",
        description: "Bạn không có quyền truy cập vào trang quản trị.",
      });
      navigate('/');
    }
  }, [isAdmin, navigate, toast]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in');
  };

  const handleReturnToApp = () => {
    navigate('/');
    
    toast({
      title: "Quay lại ứng dụng chính",
      description: "Bạn đã thoát khỏi hệ thống quản trị viên.",
      duration: 3000,
    });
  };

  if (!isAdmin) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Admin Sidebar */}
        <Sidebar className="border-r border-zinc-800">
          <SidebarContent className="bg-[#0a0a0a] text-white h-full">
            <div className={cn("flex justify-center items-center py-4")}>
              <div className="flex flex-col items-center">
                <TradeBotLogo size={isMobile ? "medium" : "large"} className="mx-auto" />
                <span className="text-xs font-medium text-amber-500 mt-1">Admin Panel</span>
              </div>
            </div>
            
            <SidebarSeparator className="bg-zinc-800" />
            
            <div className="mt-6 px-4 mb-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleReturnToApp}
                className="w-full text-xs border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-white"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Quay lại ứng dụng
              </Button>
            </div>
            
            <SidebarSeparator className="bg-zinc-800 my-4" />
            
            <SidebarGroup>
              <SidebarGroupLabel>Quản lý chung</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/admin')}>
                      <Link to="/admin">
                        <BarChart3 className="h-4 w-4" />
                        <span>Tổng quan</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/admin/users')}>
                      <Link to="/admin/users">
                        <Users className="h-4 w-4" />
                        <span>Quản lý người dùng</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/admin/bots')}>
                      <Link to="/admin/bots">
                        <Bot className="h-4 w-4" />
                        <span>Quản lý Bot</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Super Admin only section */}
                  {isSuperAdmin && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive('/admin/admin-management')}>
                        <Link to="/admin/admin-management">
                          <ShieldCheck className="h-4 w-4" />
                          <span>Quản lý Admin</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Hệ thống</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/admin/database')}>
                      <Link to="/admin/database">
                        <Database className="h-4 w-4" />
                        <span>Cơ sở dữ liệu</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/admin/logs')}>
                      <Link to="/admin/logs">
                        <FileText className="h-4 w-4" />
                        <span>Nhật ký hệ thống</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Thông báo</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/admin/notifications')}>
                      <Link to="/admin/notifications">
                        <Bell className="h-4 w-4" />
                        <span>Quản lý thông báo</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/admin/email')}>
                      <Link to="/admin/email">
                        <Mail className="h-4 w-4" />
                        <span>Mẫu email</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Tài khoản</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/admin/settings')}>
                      <Link to="/admin/settings">
                        <Settings className="h-4 w-4" />
                        <span>Cài đặt hệ thống</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleSignOut}>
                      <LogOut className="h-4 w-4" />
                      <span>Đăng xuất</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex flex-col flex-1 h-screen overflow-y-auto bg-zinc-950">
          {/* Top Bar */}
          <div className="h-14 border-b border-zinc-800 bg-zinc-900 flex items-center px-4">
            <SidebarTrigger className="mr-4 text-zinc-400" />
            <h1 className="text-lg font-medium text-white">Hệ thống quản trị Trade Bot 365</h1>
          </div>
          
          {/* Admin Content */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
