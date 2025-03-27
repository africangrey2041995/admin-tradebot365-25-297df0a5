
import React from 'react';
import { Menu, Bell, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigation } from '@/hooks/useNavigation';

interface AdminHeaderProps {
  toggleSidebar: () => void;
  title?: string;
  children?: React.ReactNode;
  errorCount?: number;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  toggleSidebar,
  title = 'Admin Dashboard',
  children,
  errorCount = 0
}) => {
  const { navigateTo } = useNavigation();

  const handleLogout = () => {
    // Handle logout logic here
    alert('Đăng xuất');
  };

  const handleViewProfile = () => {
    navigateTo('/admin/profile');
  };

  const handleViewErrors = () => {
    // Redirect to signal tracking where errors can be filtered
    navigateTo('/admin/user-bots');
  };

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            <Menu />
          </Button>
          <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {children}
          
          {errorCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleViewErrors}
              className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 hover:text-red-400"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              {errorCount} lỗi
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-white relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleViewProfile}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
