
import React, { useState } from 'react';
import UserProfileSection from './UserProfileSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { Search, Globe, Bell, BellDot, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navigation = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Bot #1 đã hoàn thành giao dịch', read: false },
    { id: 2, text: 'Cập nhật mới cho Premium Bots', read: false },
    { id: 3, text: 'Tài khoản cần được xác minh', read: true },
  ]);

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setHasNotifications(false);
  };

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 shadow-sm">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isMobile && <SidebarTrigger />}
          <Link to="/" className="flex items-center">
            {/* Image removed */}
          </Link>
        </div>
        
        {/* Middle section with search bar and language selector */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70" />
            <Input 
              placeholder="Tìm kiếm..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select defaultValue="vi">
            <SelectTrigger className="w-[100px] h-9 flex gap-1">
              <Globe className="h-4 w-4" />
              <SelectValue placeholder="Ngôn ngữ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Notification bell for mobile */}
        <div className="md:hidden flex items-center mr-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                {unreadCount > 0 ? (
                  <>
                    <BellDot className="h-5 w-5" />
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
                    >
                      {unreadCount}
                    </Badge>
                  </>
                ) : (
                  <Bell className="h-5 w-5" />
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
        
        {/* User profile section with notification bell for desktop */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  {unreadCount > 0 ? (
                    <>
                      <BellDot className="h-5 w-5" />
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
                      >
                        {unreadCount}
                      </Badge>
                    </>
                  ) : (
                    <Bell className="h-5 w-5" />
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
          <UserProfileSection />
        </div>
      </div>

      {/* Mobile search and language selector */}
      {isMobile && (
        <div className="px-4 py-2 border-b border-slate-200 dark:border-zinc-800 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70" />
            <Input 
              placeholder="Tìm kiếm..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select defaultValue="vi">
            <SelectTrigger className="w-[80px] h-9">
              <Globe className="h-4 w-4 mr-1" />
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </header>
  );
};

export default Navigation;
