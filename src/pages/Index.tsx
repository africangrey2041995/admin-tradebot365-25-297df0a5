
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PropTradingPromo from '@/components/dashboard/PropTradingPromo';
import ActivityOverview from '@/components/dashboard/ActivityOverview';
import SystemStats from '@/components/dashboard/SystemStats';
import PremiumBotsPromo from '@/components/dashboard/PremiumBotsPromo';
import BetaTag from '@/components/common/BetaTag';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const Index = () => {
  const isMobile = useIsMobile();
  
  // Mock statistics for demonstration
  const dashboardStats = {
    totalBots: 5,
    activeBots: 3,
    todayActiveBots: 2,
    totalAccounts: 12,
    connectedAccounts: 8,
    todayConnectedAccounts: 5,
    todaySignals: 8,
    pendingSignals: 3,
    processedSignals: 5,
    failedSignals: 0,
    monthlyOrders: 398
  };

  return (
    <MainLayout title="Bảng Điều Khiển">
      <motion.div 
        className={`mb-4 ${isMobile ? 'px-1' : 'mb-6'} flex justify-center`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`inline-flex items-center gap-2 ${isMobile ? 'px-2 py-1' : 'px-3 py-1.5 sm:px-4 sm:py-2'} rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800`}>
          <BetaTag />
          <span className={`text-amber-800 dark:text-amber-400 ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}>
            Đây là phiên bản beta, một số tính năng có thể chưa hoàn thiện.
          </span>
        </div>
      </motion.div>
      
      <div className={`space-y-${isMobile ? '4' : '6'}`}>
        <PropTradingPromo />
        <PremiumBotsPromo />
        <ActivityOverview dashboardStats={dashboardStats} />
        <SystemStats dashboardStats={dashboardStats} />
      </div>
    </MainLayout>
  );
};

export default Index;
