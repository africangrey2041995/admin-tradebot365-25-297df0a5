
// Since the Navigation component is a read-only file, 
// I'll create a wrapper component that uses our new UserProfileSection
// and has a fixed position at the top of the screen.

<lov-write file_path="src/components/layout/FixedNavigation.tsx">
import React from 'react';
import Navigation from './Navigation';
import UserProfileSection from './UserProfileSection';
import { useIsMobile } from '@/hooks/use-mobile';

const FixedNavigation = () => {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 right-0 left-0 h-16 z-50 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 shadow-sm">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex-1">
          {/* Logo or other elements */}
        </div>
        
        {/* User profile section */}
        <UserProfileSection />
      </div>
    </header>
  );
};

export default FixedNavigation;
