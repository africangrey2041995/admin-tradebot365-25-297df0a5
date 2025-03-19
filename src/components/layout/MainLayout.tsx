
import React from 'react';
import Navigation from './Navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className={isMobile ? "px-4 pb-6" : "pl-64 p-6"}>
        {title && (
          <header className="py-6">
            <motion.h1 
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h1>
          </header>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default MainLayout;
