import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { USER_ROUTES } from '@/constants/routes';
import BotDetailHeader from '@/components/bots/details/BotDetailHeader';
import NotFoundOrUnauthorized from '@/components/bots/details/NotFoundOrUnauthorized';
import LoadingBotDetail from '@/components/bots/details/LoadingBotDetail';
import PerformanceOverview from '@/components/bots/details/PerformanceOverview';
import TradeDetails from '@/components/bots/details/TradeDetails';
import BotInformation from '@/components/bots/details/BotInformation';
import PerformanceStats from '@/components/bots/details/PerformanceStats';
import BotDetailTabs from '@/components/bots/details/BotDetailTabs';
import { useBotAuthorization } from '@/hooks/useBotAuthorization';
import { useChartData } from '@/hooks/useChartData';
import { useBotStatistics } from '@/hooks/useBotStatistics';
import { useIntegratedBot } from '@/hooks/useIntegratedBot';

// Update user ID format to use the standardized 'USR-001' format with dash
const CURRENT_USER_ID = 'USR-001'; 

const IntegratedPropBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  
  // Sử dụng các hooks được tách ra để quản lý logic
  const { isLoading, isAuthorized, bot } = useBotAuthorization({ 
    botId, 
    userId: CURRENT_USER_ID 
  });
  
  const { selectedPeriod, setSelectedPeriod, chartData } = useChartData();
  const { tradePerformanceData, statisticsData } = useBotStatistics();
  
  // Sử dụng hook riêng cho quản lý tab và dữ liệu
  const { 
    activeTab, 
    setActiveTab, 
    refreshLoading, 
    mockAccounts, 
    mockLogs, 
    refreshTabData 
  } = useIntegratedBot();

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

  // Tạo nội dung cho tab Overview
  const overviewContent = (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PerformanceOverview 
          period={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          chartData={chartData}
          isLoading={refreshLoading}
          onRefresh={refreshTabData}
        />

        <TradeDetails 
          tradeData={tradePerformanceData}
          statData={statisticsData}
          isLoading={refreshLoading}
          onRefresh={refreshTabData}
        />
      </div>

      <div className="space-y-6">
        <BotInformation 
          botType={bot.type}
          exchange={bot.exchange || ''}
          minCapital={bot.minCapital}
          integrationDate={bot.createdDate}
        />

        <PerformanceStats 
          lastMonthPerformance={bot.performanceLastMonth}
          allTimePerformance={bot.performanceAllTime}
        />
      </div>
    </div>
  );

  return (
    <MainLayout title={`Bot tích hợp: ${bot.name}`}>
      <div className="space-y-6">
        <BotDetailHeader 
          botName={bot.name}
          botId={bot.botId || bot.id}
          risk={bot.risk}
          backPath={USER_ROUTES.INTEGRATED_PREMIUM_BOTS}
        />

        <BotDetailTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userId={CURRENT_USER_ID}
          botId={botId || ""}
          onRefresh={refreshTabData}
          isLoading={refreshLoading}
          overviewContent={overviewContent}
          accountsData={mockAccounts}
          logsData={mockLogs}
          // Đối với prop bot, sử dụng label "TB365 ID" cho cột ID
          signalSourceLabel="TB365 ID"
          botType="prop" // Add the required botType prop
        />
      </div>
    </MainLayout>
  );
};

export default IntegratedPropBotDetail;
