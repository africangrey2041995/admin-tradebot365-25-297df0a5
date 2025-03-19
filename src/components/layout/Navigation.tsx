import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CircuitBoard, Users, Menu, X, ChevronDown, Settings, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const Logo = () => (
    <div className={cn(
      "flex items-center justify-center",
      isCollapsed ? "w-10" : "w-full"
    )}>
      <img 
        src="/lovable-uploads/e2df3904-13a1-447b-8f10-5d6f6439dc6b.png" 
        alt="Trade Bot 365 Logo" 
        className="h-12 w-auto object-contain" 
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
    <>
      {routes.map((route) => {
        const isActive = isRouteActive(route.path);
        
        if (route.children && !isMobile && !isCollapsed) {
          return (
            <NavigationMenu key={route.path} className="w-full">
              <NavigationMenuList className="w-full">
                <NavigationMenuItem className="w-full">
                  <Link
                    to={route.path}
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
                    {isActive && (
                      <div className="ml-auto">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    )}
                  </Link>
                  {route.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg ml-12 mt-1 text-sm font-medium transition-colors",
                        location.pathname === child.path
                          ? "bg-primary/5 text-primary"
                          : "text-white/80 hover:bg-zinc-700/50 hover:text-white"
                      )}
                      onClick={isMobile ? closeMobileMenu : undefined}
                    >
                      {child.label}
                    </Link>
                  ))}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          );
        }
        
        return (
          <React.Fragment key={route.path}>
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
              {isActive && !isCollapsed && !isMobile && route.children && (
                <div className="ml-auto">
                  <ChevronDown className="h-4 w-4" />
                </div>
              )}
            </Link>
            
            {isMobile && isActive && route.children && (
              <div className="ml-12 space-y-1 mt-1">
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
                    onClick={closeMobileMenu}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );

  return (
    <>
      {isMobile ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-800 border-b shadow-sm">
            <div className="flex items-center">
              <Logo />
            </div>
            <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed top-[60px] left-0 right-0 z-30 bg-white dark:bg-zinc-900 p-4 border-b shadow-md flex flex-col gap-2"
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
            "fixed inset-y-0 left-0 z-30 border-r border-zinc-700/50 flex flex-col shadow-md transition-all duration-300 ease-in-out bg-zinc-900",
            isCollapsed ? "w-[70px]" : "w-64"
          )}>
            <div className="p-4 border-b border-zinc-700/50 flex items-center justify-between">
              <Logo />
              {!isCollapsed && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white" 
                  onClick={toggleSidebar}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              {isCollapsed && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-[-12px] top-6 bg-primary text-white rounded-full border-2 border-zinc-900 w-6 h-6" 
                  onClick={toggleSidebar}
                >
                  <ChevronDown className={cn("h-3 w-3 transition-all duration-300", isCollapsed && "rotate-90")} />
                </Button>
              )}
            </div>
            
            <div className={cn(
              "px-3 py-4 flex-1 overflow-auto flex flex-col gap-1",
              isCollapsed && "px-2"
            )}>
              <NavLinks />
            </div>
            
            <div className="p-3 border-t border-zinc-700/50">
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "w-full hover:bg-primary hover:text-white text-white border-zinc-700/50 bg-transparent",
                  isCollapsed && "p-0 flex justify-center items-center h-10 w-10"
                )} 
                onClick={() => {}}
              >
                <Settings className="h-4 w-4 mr-2" />
                {!isCollapsed && "Cài Đặt"}
              </Button>
            </div>
          </aside>
          
          <div className={cn(
            "fixed top-0 right-0 z-20 border-b border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm transition-all duration-300 ease-in-out px-6 py-3",
            isCollapsed ? "left-[70px]" : "left-64"
          )}>
            <div className="flex items-center justify-between h-12">
              <div className="text-lg font-medium text-slate-800 dark:text-white">
                {routes.find(route => route.path === location.pathname)?.label || 
                routes.flatMap(route => route.children || []).find(child => child.path === location.pathname)?.label ||
                "Bảng Điều Khiển"}
              </div>
              <div className="flex items-center gap-2">
                {/* Add user profile or other header items here */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
