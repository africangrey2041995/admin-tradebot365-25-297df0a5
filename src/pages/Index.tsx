
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PropTradingPromo from '@/components/dashboard/PropTradingPromo';
import ActivityOverview from '@/components/dashboard/ActivityOverview';
import SystemStats from '@/components/dashboard/SystemStats';
import PremiumBotsPromo from '@/components/dashboard/PremiumBotsPromo';
import BetaTag from '@/components/common/BetaTag';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { useAdminNavigation } from '@/hooks/useAdminNavigation';
import { useAdmin } from '@/hooks/use-admin';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  const { isAdmin } = useAdmin();
  const { navigateToAdmin } = useAdminNavigation();
  
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

  // Debug button for admin navigation
  const handleTestAdminNavigation = () => {
    console.log("Test admin navigation button clicked");
    navigateToAdmin();
  };

  return (
    <MainLayout title="Bảng Điều Khiển">
      <motion.div 
        className={`mb-3 ${isMobile ? 'px-0.5' : 'mb-6'} flex justify-center`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`inline-flex items-center gap-1.5 ${isMobile ? 'px-2 py-1' : 'px-3 py-1.5 sm:px-4 sm:py-2'} rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800`}>
          <BetaTag />
          <span className={`text-amber-800 dark:text-amber-400 ${isMobile ? 'text-2xs truncate max-w-[230px]' : 'text-xs sm:text-sm'}`}>
            Đây là phiên bản beta, một số tính năng có thể chưa hoàn thiện.
          </span>
        </div>
      </motion.div>
      
      {/* Debug Admin Button */}
      {isAdmin && (
        <div className="mb-6 flex justify-center">
          <Button 
            onClick={handleTestAdminNavigation}
            variant="outline" 
            className="bg-amber-950/30 border-amber-900 text-amber-400 hover:bg-amber-900 hover:text-amber-200"
          >
            <Shield className="mr-2 h-4 w-4" />
            Test Admin Navigation
          </Button>
        </div>
      )}
      
      <div className={`space-y-${isMobile ? '3' : '6'}`}>
        <PropTradingPromo />
        <PremiumBotsPromo />
        <ActivityOverview dashboardStats={dashboardStats} />
        <SystemStats dashboardStats={dashboardStats} />
      </div>
    </MainLayout>
  );
};

export default Index;
