
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PropTradingPromo from '@/components/dashboard/PropTradingPromo';
import ActivityOverview from '@/components/dashboard/ActivityOverview';
import SystemStats from '@/components/dashboard/SystemStats';
import PremiumBotsPromo from '@/components/dashboard/PremiumBotsPromo';
import BetaTag from '@/components/common/BetaTag';
import { useIsMobile } from '@/hooks/use-mobile';

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
      <div className={`mb-4 ${isMobile ? '' : 'mb-6'} flex justify-center`}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <BetaTag />
          <span className="text-amber-800 dark:text-amber-400 text-xs sm:text-sm">
            Đây là phiên bản beta, một số tính năng có thể chưa hoàn thiện.
          </span>
        </div>
      </div>
      <PropTradingPromo />
      <PremiumBotsPromo />
      <ActivityOverview dashboardStats={dashboardStats} />
      <SystemStats dashboardStats={dashboardStats} />
    </MainLayout>
  );
};

export default Index;
