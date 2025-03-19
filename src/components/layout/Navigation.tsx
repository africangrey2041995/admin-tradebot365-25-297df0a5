
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CircuitBoard, 
  Users, 
  Menu, 
  X, 
  ChevronDown, 
  Settings, 
  Sparkles,
  Bell,
  LogOut,
  UserCircle,
  Shield,
  Wallet,
  HelpCircle,
  Search,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const routes = [
  {
    path: '/',
    label: 'Bảng Điều Khiển',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    path: '/bots',
    label: 'Quản Lý Bot',
    icon: <CircuitBoard className="h-5 w-5" />
  },
  {
    path: '/premium-bots',
    label: 'Premium Bots',
    icon: <Sparkles className="h-5 w-5" />,
    children: [
      {
        path: '/premium-bots',
        label: 'Khám Phá Premium Bots'
      },
      {
        path: '/integrated-premium-bots',
        label: 'Premium Bots Đã Tích Hợp'
      }
    ]
  },
  {
    path: '/accounts',
    label: 'Tài Khoản',
    icon: <Users className="h-5 w-5" />
  }
];

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubmenu = (path: string) => {
    if (openSubmenu === path) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(path);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const Logo = () => (
    <div className={cn(
      "flex items-center justify-center",
      isCollapsed ? "w-12" : "w-full"
    )}>
      <img 
        src="/lovable-uploads/e2df3904-13a1-447b-8f10-5d6f6439dc6b.png" 
        alt="Trade Bot 365 Logo" 
        className={cn(
          "object-contain",
          isCollapsed ? "h-14 w-auto" : "h-16 w-auto"
        )} 
      />
    </div>
  );

  const isRouteActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    
    const route = routes.find(r => r.path === path);
    if (route?.children) {
      return route.children.some(child => location.pathname === child.path);
    }
    
    return location.pathname.startsWith(path);
  };

  const NavLinks = () => (
    <div className="flex flex-col w-full space-y-0.5">
      {routes.map((route) => {
        const isActive = isRouteActive(route.path);
        
        if (route.children && !isCollapsed) {
          const isSubmenuOpen = openSubmenu === route.path || isActive;
          
          return (
            <div key={route.path} className="w-full flex flex-col">
              <Collapsible
                open={isSubmenuOpen}
                onOpenChange={() => toggleSubmenu(route.path)}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm w-full",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-white hover:bg-zinc-700/70 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-lg",
                      isActive ? "bg-primary text-white" : "text-white bg-zinc-700/50"
                    )}>
                      {route.icon}
                    </div>
                    <span>{route.label}</span>
                    <ChevronDown className={cn(
                      "ml-auto h-4 w-4 transition-transform",
                      isSubmenuOpen ? "rotate-180" : "rotate-0"
                    )} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-12 space-y-1 mt-1">
                  {route.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        location.pathname === child.path
                          ? "bg-primary/5 text-primary"
                          : "text-white/80 hover:bg-zinc-700/50 hover:text-white"
                      )}
                      onClick={isMobile ? closeMobileMenu : undefined}
                    >
                      {child.label}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          );
        } else if (route.children && isCollapsed) {
          return (
            <div key={route.path} className="relative group w-full">
              <Link
                to={route.path}
                className={cn(
                  "flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-white hover:bg-zinc-700/70 hover:text-white"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-lg",
                  isActive ? "bg-primary text-white" : "text-white bg-zinc-700/50"
                )}>
                  {route.icon}
                </div>
              </Link>
              <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
                <div className="bg-zinc-800 py-2 px-3 rounded-lg shadow-lg border border-zinc-700/50 min-w-48">
                  <div className="font-medium text-white text-sm mb-2">{route.label}</div>
                  <div className="space-y-1">
                    {route.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          location.pathname === child.path
                            ? "bg-primary/10 text-primary"
                            : "text-white/80 hover:bg-zinc-700/50 hover:text-white"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        return (
          <div key={route.path} className="w-full">
            <Link
              to={route.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-white hover:bg-zinc-700/70 hover:text-white"
              )}
              onClick={isMobile ? closeMobileMenu : undefined}
            >
              <div className={cn(
                "flex items-center justify-center w-9 h-9 rounded-lg",
                isActive ? "bg-primary text-white" : "text-white bg-zinc-700/50"
              )}>
                {route.icon}
              </div>
              {(!isCollapsed || isMobile) && (
                <span>{route.label}</span>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );

  // Completely redesigned UserMenu based on the reference image
  const UserMenu = () => (
    <div className="flex items-center gap-4">
      {/* Search Bar */}
      <div className="relative hidden md:flex items-center">
        <Input 
          type="text" 
          placeholder="Search..." 
          className="w-44 lg:w-56 h-9 pl-9 bg-white/5 border-zinc-700/30 text-white rounded-lg text-sm focus-visible:ring-primary"
        />
        <Search className="absolute left-2.5 h-4 w-4 text-zinc-400" />
      </div>
      
      {/* Language Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/5 border border-zinc-700/30 text-white hover:bg-white/10 hover:text-primary">
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-zinc-800 border-zinc-700/50 text-white p-1 rounded-lg">
          <DropdownMenuItem className="rounded-md hover:bg-zinc-700 focus:bg-zinc-700 cursor-pointer">English</DropdownMenuItem>
          <DropdownMenuItem className="rounded-md hover:bg-zinc-700 focus:bg-zinc-700 cursor-pointer">Tiếng Việt</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Theme Toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full bg-white/5 border border-zinc-700/30 text-white hover:bg-white/10 hover:text-primary"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      
      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative rounded-full bg-white/5 border border-zinc-700/30 text-white hover:bg-white/10 hover:text-primary"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <Badge variant="destructive" className="h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                3
              </Badge>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 bg-zinc-800 border-zinc-700/50 text-white p-2 rounded-lg">
          <DropdownMenuLabel className="px-2 py-1.5 text-sm">Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-700/50" />
          <div className="max-h-[300px] overflow-auto py-1 space-y-1">
            <DropdownMenuItem className="px-2 py-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 cursor-pointer">
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <CircuitBoard className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Bot #1 đã hoàn thành giao dịch</p>
                  <p className="text-xs text-zinc-400">2 phút trước</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 cursor-pointer">
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tài khoản mới đã được thêm</p>
                  <p className="text-xs text-zinc-400">10 phút trước</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 cursor-pointer">
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Có một hoạt động đáng ngờ</p>
                  <p className="text-xs text-zinc-400">30 phút trước</p>
                </div>
              </div>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator className="bg-zinc-700/50" />
          <div className="px-2 py-1 text-center">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 w-full rounded-md">
              Xem tất cả thông báo
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* User Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:bg-white/5 rounded-lg p-1.5 pr-3 border border-zinc-700/30"
          >
            <Avatar className="h-8 w-8 border border-primary/30">
              <AvatarImage src="/lovable-uploads/533c01d2-dd33-455c-9480-10be9e71e6e3.png" alt="Admin" />
              <AvatarFallback className="bg-primary/20 text-primary font-medium">AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium text-white">Founder</span>
              <span className="text-xs text-zinc-400">Admin</span>
            </div>
            <ChevronDown className="h-4 w-4 text-zinc-400 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-64 bg-zinc-800 border-zinc-700/50 text-white p-2 rounded-lg"
        >
          <div className="px-2 py-2 flex items-center gap-3 border-b border-zinc-700/50 mb-1">
            <Avatar className="h-12 w-12 border-2 border-primary/30">
              <AvatarImage src="/lovable-uploads/533c01d2-dd33-455c-9480-10be9e71e6e3.png" alt="Admin" />
              <AvatarFallback className="bg-primary/20 text-primary font-medium">AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">Founder</span>
              <span className="text-xs text-zinc-400">founder@tradebot365.com</span>
            </div>
          </div>
          
          <div className="py-1 space-y-1">
            <DropdownMenuItem className="flex items-center gap-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 px-2 py-2 cursor-pointer">
              <UserCircle className="h-4 w-4 text-zinc-400" />
              <span>Hồ sơ của tôi</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center gap-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 px-2 py-2 cursor-pointer">
              <Settings className="h-4 w-4 text-zinc-400" />
              <span>Cài đặt</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center gap-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 px-2 py-2 cursor-pointer">
              <Wallet className="h-4 w-4 text-zinc-400" />
              <span>Thanh toán</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center gap-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 px-2 py-2 cursor-pointer">
              <Shield className="h-4 w-4 text-zinc-400" />
              <span>Bảo mật</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center gap-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 px-2 py-2 cursor-pointer">
              <HelpCircle className="h-4 w-4 text-zinc-400" />
              <span>Trợ giúp & hỗ trợ</span>
            </DropdownMenuItem>
          </div>
          
          <DropdownMenuSeparator className="bg-zinc-700/50" />
          
          <DropdownMenuItem 
            className="flex items-center gap-2 rounded-md hover:bg-red-500/10 focus:bg-red-500/10 px-2 py-2 text-red-400 cursor-pointer mt-1"
            onClick={() => {
              window.location.href = '/sign-in';
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 shadow-lg">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/e2df3904-13a1-447b-8f10-5d6f6439dc6b.png" 
                alt="Trade Bot 365 Logo" 
                className="h-12 w-auto object-contain" 
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full bg-white/5 border border-zinc-700/30 text-white hover:bg-white/10 hover:text-primary"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5">
                  <Badge variant="destructive" className="h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                    3
                  </Badge>
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0">
                    <Avatar className="h-8 w-8 border border-primary/30">
                      <AvatarImage src="/lovable-uploads/533c01d2-dd33-455c-9480-10be9e71e6e3.png" alt="Admin" />
                      <AvatarFallback className="bg-primary/20 text-primary font-medium">AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-zinc-800 border-zinc-700/50 text-white p-2 rounded-lg">
                  <div className="px-2 py-2 flex flex-col items-center gap-2 border-b border-zinc-700/50 mb-1">
                    <Avatar className="h-14 w-14 border-2 border-primary/30">
                      <AvatarImage src="/lovable-uploads/533c01d2-dd33-455c-9480-10be9e71e6e3.png" alt="Admin" />
                      <AvatarFallback className="bg-primary/20 text-primary font-medium">AD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold">Founder</span>
                      <span className="text-xs text-zinc-400">Admin</span>
                    </div>
                  </div>
                  
                  <div className="py-1 space-y-1">
                    <DropdownMenuItem className="flex items-center gap-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 px-2 py-2 cursor-pointer">
                      <UserCircle className="h-4 w-4 text-zinc-400" />
                      <span>Hồ sơ</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center gap-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 px-2 py-2 cursor-pointer">
                      <Settings className="h-4 w-4 text-zinc-400" />
                      <span>Cài đặt</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center gap-2 rounded-md hover:bg-zinc-700 focus:bg-zinc-700 px-2 py-2 cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-zinc-400" />
                      <span>Trợ giúp</span>
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator className="bg-zinc-700/50" />
                  
                  <DropdownMenuItem 
                    className="flex items-center gap-2 rounded-md hover:bg-red-500/10 focus:bg-red-500/10 px-2 py-2 text-red-400 cursor-pointer mt-1"
                    onClick={() => {
                      window.location.href = '/sign-in';
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                className="bg-white/5 border border-zinc-700/30 text-white hover:bg-white/10 hover:text-primary rounded-lg shadow-md"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed top-[60px] left-0 right-0 z-30 bg-zinc-900 p-4 border-b border-zinc-800 shadow-lg flex flex-col gap-2"
              >
                <div className="pb-4 mb-2 border-b border-zinc-800">
                  <div className="relative">
                    <Input 
                      type="text" 
                      placeholder="Search..." 
                      className="w-full h-10 pl-9 bg-zinc-800/70 border-zinc-700/30 text-white rounded-lg"
                    />
                    <Search className="absolute top-3 left-3 h-4 w-4 text-zinc-400" />
                  </div>
                </div>
                <NavLinks />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="h-[60px]"></div>
        </>
      ) : (
        <>
          <aside className={cn(
            "fixed inset-y-0 left-0 z-30 border-r border-zinc-700/50 flex flex-col shadow-lg transition-all duration-300 ease-in-out bg-zinc-900",
            isCollapsed ? "w-[70px]" : "w-64"
          )}>
            <div className="p-4 border-b border-zinc-700/50 flex items-center justify-between">
              <Logo />
              {!isCollapsed && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-zinc-800" 
                  onClick={toggleSidebar}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              {isCollapsed && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-[-12px] top-6 bg-primary text-white rounded-full border-2 border-zinc-900 w-6 h-6 shadow-lg hover:shadow-primary/30 transition-all duration-300" 
                  onClick={toggleSidebar}
                >
                  <ChevronDown className={cn("h-3 w-3 transition-all duration-300", isCollapsed && "rotate-90")} />
                </Button>
              )}
            </div>
            
            <div className={cn(
              "px-3 py-4 flex-1 overflow-auto flex flex-col",
              isCollapsed && "px-2"
            )}>
              <NavLinks />
            </div>
          </aside>
          
          <div className={cn(
            "fixed top-0 right-0 z-20 border-b border-zinc-700/30 bg-zinc-900 shadow-md transition-all duration-300 ease-in-out px-6 py-3",
            isCollapsed ? "left-[70px]" : "left-64"
          )}>
            <div className="flex items-center justify-between h-12">
              <div className="text-lg font-medium text-white">
                {routes.find(route => route.path === location.pathname)?.label || 
                routes.flatMap(route => route.children || []).find(child => child.path === location.pathname)?.label ||
                "Bảng Điều Khiển"}
              </div>
              
              <UserMenu />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
