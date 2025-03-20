
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import TradeBotLogo from '@/components/common/TradeBotLogo';
import UserProfileSection from './UserProfileSection';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const FixedNavigation = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <div className="sticky top-0 z-40 h-16 bg-white dark:bg-zinc-900 shadow-sm border-b border-slate-200 dark:border-zinc-800 flex items-center px-4">
      {/* Toggle menu button for mobile */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="mr-2 block sm:hidden"
      >
        {collapsed ? <Menu /> : <X />}
      </Button>

      {/* Logo for mobile and title for desktop */}
      <div className="flex items-center mr-4">
        {isMobile ? (
          <TradeBotLogo size="small" showBetaTag={true} />
        ) : (
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white hidden md:block">
            {getTitleFromPathname(location.pathname)}
          </h1>
        )}
      </div>

      <div className="flex-1" />

      {/* User profile section */}
      <UserProfileSection />
    </div>
  );
};

// Helper function to get title from pathname
function getTitleFromPathname(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'Bảng Điều Khiển';
    case '/bots':
      return 'Bots';
    case '/accounts':
      return 'Tài Khoản';
    case '/premium-bots':
      return 'Premium Bots';
    case '/prop-trading-bots':
      return 'Prop Trading Bots';
    case '/integrated-premium-bots':
      return 'Premium Bots Đã Tích Hợp';
    case '/integrated-prop-bots':
      return 'Prop Trading Bots Đã Tích Hợp';
    case '/settings':
      return 'Cài Đặt';
    case '/profile':
      return 'Hồ Sơ';
    default:
      if (pathname.startsWith('/bots/'))
        return 'Chi Tiết Bot';
      if (pathname.startsWith('/accounts/'))
        return 'Chi Tiết Tài Khoản';
      if (pathname.startsWith('/premium-bots/'))
        return 'Chi Tiết Premium Bot';
      if (pathname.startsWith('/prop-trading-bots/'))
        return 'Chi Tiết Prop Trading Bot';
      return 'Trade Bot 365';
  }
}

export default FixedNavigation;
