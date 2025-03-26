
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { USER_ROUTES } from '@/constants/routes';
import NotFoundOrUnauthorized from '@/components/bots/details/NotFoundOrUnauthorized';
import LoadingBotDetail from '@/components/bots/details/LoadingBotDetail';
import { useBotAuthorization } from '@/hooks/useBotAuthorization';
import { useChartData } from '@/hooks/useChartData';
import { useBotStatistics } from '@/hooks/useBotStatistics';
import { useIntegratedBot } from '@/hooks/useIntegratedBot';
import PropBotOverviewTab from '@/components/bots/details/prop/PropBotOverviewTab';
import PropTradingBotTabs from '@/components/bots/details/prop/PropTradingBotTabs';
import { Account } from '@/types';

// Update user ID format to use the standardized 'USR-001' format with dash
const CURRENT_USER_ID = 'USR-001'; 

const IntegratedPropBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  
  // Use the hooks to manage logic
  const { isLoading, isAuthorized, bot } = useBotAuthorization({ 
    botId, 
    userId: CURRENT_USER_ID 
  });
  
  const { selectedPeriod, setSelectedPeriod, chartData } = useChartData();
  const { tradePerformanceData, statisticsData } = useBotStatistics();
  
  // Use specific hook for integrated bot management
  const { 
    activeTab, 
    setActiveTab, 
    refreshLoading, 
    mockAccounts, 
    mockLogs, 
    refreshTabData 
  } = useIntegratedBot("overview");

  // Filter accounts to only show those belonging to the current user
  const userAccounts = React.useMemo(() => {
    // In a real implementation, we would filter accounts by user ID
    // For now, we'll just return the mock accounts
    return mockAccounts;
  }, [mockAccounts]);

  const goBack = () => {
    navigate(USER_ROUTES.INTEGRATED_PREMIUM_BOTS);
  };

  if (isLoading) {
    return <LoadingBotDetail />;
  }

  if (!isAuthorized || !bot) {
    return (
      <NotFoundOrUnauthorized 
        backPath={USER_ROUTES.INTEGRATED_PREMIUM_BOTS}
        onBack={goBack}
      />
    );
  }

  // Mock challenge data (would come from API in a real implementation)
  const challengeData = {
    phase: "Challenge Phase 1",
    progress: 68,
    accountBalance: "$10,000",
    profitTarget: "$1,000 (10%)",
    maxDrawdown: "5%",
    daysRemaining: "14 days",
    description: "Tiến độ hoàn thành để chuyển sang giai đoạn tiếp theo"
  };

  // Mock stats data
  const botStats = {
    totalTrades: 56,
    winRate: "64%",
    profitFactor: 1.8,
    sharpeRatio: 1.6,
    currentDrawdown: "2.3%"
  };

  // Mock bot info
  const botInfo = {
    createdDate: "2023-09-15",
    lastUpdated: "2023-11-22",
    botId: "PROP001"
  };

  // Challenge rules
  const challengeRules = [
    "Minimum 10 trading days required",
    "Maximum daily drawdown: 4%",
    "Maximum total drawdown: 8%",
    "Profit target: 10% to advance to next phase",
    "No weekend trading allowed",
    "No holding positions overnight",
    "Maximum position size: 2% of account"
  ];

  // Prepare the overview content
  const overviewContent = (
    <PropBotOverviewTab 
      challengeData={challengeData}
      botStats={botStats}
      botInfo={botInfo}
      challengeRules={challengeRules}
    />
  );

  return (
    <MainLayout title={`Chi Tiết Prop Trading Bot: ${bot.name}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate(USER_ROUTES.INTEGRATED_PREMIUM_BOTS)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <span className="hover:underline cursor-pointer" onClick={() => navigate(USER_ROUTES.INTEGRATED_PREMIUM_BOTS)}>
              Prop Trading Bot
            </span>
            <span className="mx-2">›</span>
            <span className="hover:underline cursor-pointer">
              Coinstrat Pro
            </span>
            <span className="mx-2">›</span>
            <span className="text-slate-800 dark:text-white">
              {challengeData.phase}
            </span>
          </div>
        </div>
        
        {/* Main Tabs Component */}
        <PropTradingBotTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userId={CURRENT_USER_ID}
          botId={botId || ""}
          refreshLoading={refreshLoading}
          accounts={userAccounts}
          logs={mockLogs}
          overviewContent={overviewContent}
          refreshTabData={refreshTabData}
        />
      </motion.div>
    </MainLayout>
  );
};

export default IntegratedPropBotDetail;
