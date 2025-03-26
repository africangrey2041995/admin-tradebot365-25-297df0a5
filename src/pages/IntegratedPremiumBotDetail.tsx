
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { USER_ROUTES } from '@/constants/routes';
import BotDetailHeader from '@/components/bots/details/BotDetailHeader';
import NotFoundOrUnauthorized from '@/components/bots/details/NotFoundOrUnauthorized';
import LoadingBotDetail from '@/components/bots/details/LoadingBotDetail';
import PremiumBotTabs from '@/components/bots/details/premium/PremiumBotTabs';
import PremiumBotOverviewTab from '@/components/bots/details/premium/PremiumBotOverviewTab';
import { usePremiumBotDetail } from '@/hooks/usePremiumBotDetail';
import { BotType } from '@/constants/botTypes';
import BotDescription from '@/components/bots/details/BotDescription';
import FeaturesList from '@/components/bots/details/FeaturesList';

// Update user ID format to use the standardized 'USR-001' format with dash
const CURRENT_USER_ID = 'USR-001';

const IntegratedPremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  
  // Use our custom hook to manage the premium bot data and states
  const {
    activeTab,
    setActiveTab,
    refreshLoading,
    isLoading,
    isAuthorized,
    bot,
    selectedPeriod,
    setSelectedPeriod,
    chartData,
    tradePerformanceData,
    statisticsData,
    refreshTabData,
    coinstratLogs,
    logsLoading,
    accounts
  } = usePremiumBotDetail(botId, CURRENT_USER_ID);

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

  // Create a simplified bot object that matches the expected type
  // Using explicit type annotation to fix the error
  const simplifiedBot: {
    type: 'premium' | 'prop' | 'user';
    exchange: string;
    minCapital: string;
    createdDate: string;
    performanceLastMonth: string;
    performanceAllTime: string;
  } = {
    type: bot.type === BotType.PREMIUM_BOT ? 'premium' : 'user',
    exchange: bot.exchange || '',
    minCapital: bot.minCapital,
    createdDate: bot.createdDate,
    performanceLastMonth: bot.performanceLastMonth,
    performanceAllTime: bot.performanceAllTime,
  };

  return (
    <MainLayout title={`Bot tích hợp: ${bot.name}`}>
      <div className="space-y-6">
        <BotDetailHeader 
          botName={bot.name}
          botId={bot.botId}
          risk={bot.risk}
          backPath={USER_ROUTES.INTEGRATED_PREMIUM_BOTS}
        />

        {/* Add Description and Features cards before tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BotDescription 
            description={bot.description} 
            pairs={bot.pairs || []}
          />
          <FeaturesList 
            features={bot.features || []}
          />
        </div>

        <PremiumBotTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userId={CURRENT_USER_ID}
          botId={botId || ""}
          onRefresh={refreshTabData}
          isLoading={refreshLoading}
          overviewContent={
            <PremiumBotOverviewTab
              period={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              chartData={chartData}
              refreshLoading={refreshLoading}
              onRefresh={refreshTabData}
              tradePerformanceData={tradePerformanceData}
              statisticsData={statisticsData}
              bot={simplifiedBot}
            />
          }
          accountsData={accounts}
          logsData={coinstratLogs}
          logsLoading={logsLoading}
          signalSourceLabel="TB365 ID"
        />
      </div>
    </MainLayout>
  );
};

export default IntegratedPremiumBotDetail;
