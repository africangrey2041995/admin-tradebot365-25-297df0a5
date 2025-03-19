
import React from 'react';
import UserProfileSection from './UserProfileSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navigation = () => {
  const isMobile = useIsMobile();

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 shadow-sm">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isMobile && <SidebarTrigger />}
          {/* Logo or other elements */}
        </div>
        
        {/* User profile section */}
        <UserProfileSection />
      </div>
    </header>
  );
};

export default Navigation;
