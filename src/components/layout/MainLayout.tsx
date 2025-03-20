
import React from 'react';
import FixedNavigation from './FixedNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from './SidebarNav';
import BetaTag from '../common/BetaTag';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex w-full">
        {/* Sidebar */}
        <SidebarNav />
        
        <div className="flex-1 flex flex-col">
          {/* Navigation at top */}
          <FixedNavigation />
          
          <main className={cn(
            isMobile 
              ? "px-2 pb-4 pt-2" 
              : "px-6 py-6",
            "transition-all duration-300 ease-in-out overflow-x-hidden"
          )}>
            <div className="container mx-auto max-w-7xl">
              {title && !isMobile && (
                <motion.div 
                  className="flex items-center gap-2 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
                    {title}
                  </h1>
                  <BetaTag />
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={cn(
                  "bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-700",
                  isMobile ? "p-3" : "p-6"
                )}
              >
                {children}
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
