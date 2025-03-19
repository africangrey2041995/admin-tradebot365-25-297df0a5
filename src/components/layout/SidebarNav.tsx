
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInput,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { 
  Home, 
  CircuitBoard, 
  Users, 
  Sparkles, 
  Search,
  Globe,
  Bell,
  BellDot,
  X,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SidebarNav = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Bot #1 đã hoàn thành giao dịch', read: false },
    { id: 2, text: 'Cập nhật mới cho Premium Bots', read: false },
    { id: 3, text: 'Tài khoản cần được xác minh', read: true },
  ]);
  
  // Main navigation items
  const mainNavItems = [
    { icon: Home, label: 'Bảng Điều Khiển', path: '/' },
    { icon: CircuitBoard, label: 'Quản Lý Bot', path: '/bots' },
    { icon: Users, label: 'Quản Lý Tài Khoản', path: '/accounts' },
  ];
  
  // Premium features navigation items
  const premiumItems = [
    { icon: Sparkles, label: 'Premium Bots', path: '/premium-bots' },
  ];
  
  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setHasNotifications(false);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <img 
          src="/lovable-uploads/68a402c1-5eae-4c56-a88f-7135d455c4f9.png" 
          alt="Trade Bot 365" 
          className="h-12 w-auto mx-auto my-4" 
        />
        
        {/* Search bar */}
        <div className="px-3 mb-2">
          <SidebarInput 
            placeholder="Tìm kiếm..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search className="h-4 w-4 opacity-70" />}
          />
        </div>

        {/* Language and notifications */}
        <div className="px-3 mb-2 flex items-center justify-between">
          <Select defaultValue="vi">
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue placeholder="Ngôn ngữ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                {unreadCount > 0 ? (
                  <>
                    <BellDot className="h-4 w-4" />
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
                    >
                      {unreadCount}
                    </Badge>
                  </>
                ) : (
                  <Bell className="h-4 w-4" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 max-h-[400px] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Thông báo</h3>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllNotifications} className="text-xs">
                    Đánh dấu tất cả đã đọc
                  </Button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  Không có thông báo
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b flex justify-between items-start hover:bg-muted transition-colors ${notification.read ? 'opacity-70' : 'bg-accent/5'}`}
                    >
                      <span className="text-sm">{notification.text}</span>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Tổng Quan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={item.label}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Premium</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {premiumItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={item.label}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
