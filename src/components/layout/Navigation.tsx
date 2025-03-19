
import React from 'react';
import UserProfileSection from './UserProfileSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const isMobile = useIsMobile();

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 shadow-sm">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isMobile && <SidebarTrigger />}
          {/* Logo removed from here */}
          <Link to="/" className="flex items-center">
            {/* Image removed */}
          </Link>
        </div>
        
        {/* User profile section */}
        <UserProfileSection />
      </div>
    </header>
  );
};

export default Navigation;
