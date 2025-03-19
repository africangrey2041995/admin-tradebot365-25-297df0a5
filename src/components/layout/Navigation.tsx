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
  HelpCircle
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

  const UserMenu = () => (
    <div className="flex items-center space-x-3">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-zinc-400 hover:text-white bg-gradient-to-b from-zinc-800/50 to-zinc-800/90 rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40"></span>
            <Badge className="h-5 w-5 rounded-full bg-primary text-[10px] text-white flex items-center justify-center border-none shadow-lg shadow-primary/30">
              3
            </Badge>
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-3 hover:bg-gradient-to-b from-zinc-800/50 to-zinc-800/90 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 px-3 py-2.5 rounded-full border border-zinc-700/40 ml-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-primary/20 shadow-lg shadow-primary/10">
                  <AvatarImage src="/lovable-uploads/533c01d2-dd33-455c-9480-10be9e71e6e3.png" alt="Admin" className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40 text-white font-semibold">TB</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-bold text-white">Founder</span>
                  <span className="text-xs text-zinc-400">Admin</span>
                </div>
                <ChevronDown className="h-4 w-4 text-zinc-400 ml-1" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-700/50 p-1.5 rounded-xl shadow-xl shadow-black/30 backdrop-blur-sm"
          >
            <DropdownMenuLabel className="text-primary/90 px-3 py-2 font-bold">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700/50" />
            
            <div className="p-2 space-y-1">
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer text-white px-3 py-2.5 rounded-lg group transition-all duration-200">
                <div className="mr-2 h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                  <UserCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer text-white px-3 py-2.5 rounded-lg group transition-all duration-200">
                <div className="mr-2 h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <span>Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer text-white px-3 py-2.5 rounded-lg group transition-all duration-200">
                <div className="mr-2 h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span>Security</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer text-white px-3 py-2.5 rounded-lg group transition-all duration-200">
                <div className="mr-2 h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <span>Billing</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer text-white px-3 py-2.5 rounded-lg group transition-all duration-200">
                <div className="mr-2 h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Help Center</span>
              </DropdownMenuItem>
            </div>
            
            <DropdownMenuSeparator className="bg-zinc-700/50" />
            
            <div className="p-2">
              <DropdownMenuItem 
                className="hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer text-white px-3 py-2.5 rounded-lg group transition-all duration-200"
                onClick={() => {
                  window.location.href = '/sign-in';
                }}
              >
                <div className="mr-2 h-8 w-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                  <LogOut className="h-4 w-4 text-red-500" />
                </div>
                <span className="text-red-500">Logout</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
              <UserMenu />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                className="bg-gradient-to-b from-zinc-800/50 to-zinc-800/90 text-white hover:bg-zinc-700 rounded-lg shadow-md"
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
            "fixed top-0 right-0 z-20 border-b border-zinc-700/30 bg-gradient-to-r from-zinc-900/70 to-zinc-900/90 shadow-md transition-all duration-300 ease-in-out px-6 py-3 backdrop-blur-md",
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
