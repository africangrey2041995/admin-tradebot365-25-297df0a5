
import React from 'react';
import Navigation from './Navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <div className="fixed top-0 z-50 w-full">
        <Navigation />
      </div>
      
      <main className={cn(
        isMobile 
          ? "px-4 pb-6 pt-20" // Added padding top for fixed navbar 
          : "ml-64 pt-20",    // Set a fixed padding top for the navbar height
        "transition-all duration-300 ease-in-out"
      )}>
        <div className="container mx-auto max-w-7xl px-4 py-6">
          {title && !isMobile && (
            <motion.h1 
              className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h1>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-zinc-700"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
