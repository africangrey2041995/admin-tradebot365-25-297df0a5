import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CircuitBoard, Users, Link2, Radio, Settings, Menu, X, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

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
    path: '/accounts',
    label: 'Tài Khoản',
    icon: <Users className="h-5 w-5" />
  },
  {
    path: '/connections',
    label: 'Kết Nối',
    icon: <Link2 className="h-5 w-5" />
  },
  {
    path: '/signals',
    label: 'Nhật Ký Tín Hiệu',
    icon: <Radio className="h-5 w-5" />
  }
];

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/e2df3904-13a1-447b-8f10-5d6f6439dc6b.png" 
        alt="Trade Bot 365 Logo" 
        className="h-8 w-8" 
      />
      <span className="text-xl font-bold text-white">Trade Bot <span className="text-tradebot">365</span></span>
    </div>
  );

  const NavLinks = () => (
    <>
      {routes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-base",
            location.pathname === route.path
              ? "bg-primary text-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          )}
          onClick={isMobile ? closeMobileMenu : undefined}
        >
          {route.icon}
          <span>{route.label}</span>
          {location.pathname === route.path && (
            <ChevronRight className="ml-auto h-5 w-5" />
          )}
        </Link>
      ))}
    </>
  );

  return (
    <>
      {isMobile ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-background border-b">
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
                className="fixed top-[60px] left-0 right-0 z-30 bg-zinc-900 p-4 border-b flex flex-col gap-2"
              >
                <NavLinks />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="h-[60px]"></div> {/* Spacer for fixed header */}
        </>
      ) : (
        <aside className="fixed inset-y-0 left-0 z-30 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
          <div className="p-6">
            <Logo />
          </div>
          
          <div className="px-3 py-2 flex-1 overflow-auto flex flex-col gap-1">
            <NavLinks />
          </div>
          
          <div className="p-4 border-t border-zinc-800">
            <Button variant="outline" size="sm" className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200" onClick={() => {}}>
              <Settings className="h-4 w-4 mr-2" />
              Cài Đặt
            </Button>
          </div>
        </aside>
      )}
    </>
  );
};

export default Navigation;
