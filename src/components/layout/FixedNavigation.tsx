import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import TradeBotLogo from '@/components/common/TradeBotLogo';
import UserProfileSection from './UserProfileSection';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const FixedNavigation = () => {
  const { state, setOpenMobile, openMobile } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Toggle sidebar function for better UX - corrected to use mobile-specific toggle
  const toggleSidebar = () => {
    setOpenMobile(!openMobile);
  };

  return (
    <div className="sticky top-0 z-40 h-14 sm:h-16 bg-white dark:bg-zinc-900 shadow-sm border-b border-slate-200 dark:border-zinc-800 flex items-center px-2 sm:px-4">
      <div className="flex items-center gap-1 flex-1">
        {/* Toggle menu button for mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={cn(
            "h-9 w-9 p-0 block sm:hidden",
            state === "collapsed" ? "text-slate-800 dark:text-white" : "text-slate-800 dark:text-white"
          )}
          aria-label="Toggle sidebar"
        >
          {openMobile ? 
            <X className="h-5 w-5" /> : 
            <Menu className="h-5 w-5" />
          }
        </Button>
        
        {/* Page title moved to the left for desktop */}
        {!isMobile && (
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white truncate max-w-[350px] lg:max-w-none">
            {getTitleFromPathname(location.pathname)}
          </h1>
        )}
      </div>

      {/* Logo centered in the navbar - only visible on mobile */}
      <div className={cn("flex justify-center items-center", isMobile ? "flex-1" : "")}>
        {isMobile && (
          <TradeBotLogo 
            size="large" 
            showBetaTag={false} 
            className="scale-125"
          />
        )}
      </div>

      {/* UserProfileSection moved to the right for desktop */}
      <div className="flex items-center">
        {isMobile ? (
          <UserProfileSection />
        ) : (
          <UserProfileSection />
        )}
      </div>
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
