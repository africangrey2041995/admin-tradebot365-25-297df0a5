
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { USER_ROUTES } from '@/constants/routes';
import { toast } from 'sonner';
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

// Tạo một hằng số để lưu trữ ID người dùng hiện tại
// Trong ứng dụng thực tế, giá trị này sẽ được lấy từ context auth
const CURRENT_USER_ID = 'USR-001';

const IntegratedPremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sử dụng các hooks được tách ra để quản lý logic
  const { isLoading, isAuthorized, bot } = useBotAuthorization({ 
    botId, 
    userId: CURRENT_USER_ID 
  });
  
  const { selectedPeriod, setSelectedPeriod, chartData } = useChartData();
  const { tradePerformanceData, statisticsData } = useBotStatistics();

  const refreshTabData = () => {
    setIsLoading(true);
    // Mô phỏng API call bằng bộ hẹn giờ
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "connected-accounts" ? "Tài khoản kết nối" : "Coinstrat Logs"
      }`);
    }, 1000);
  };

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
          isLoading={isLoading}
          onRefresh={refreshTabData}
        />

        <TradeDetails 
          tradeData={tradePerformanceData}
          statData={statisticsData}
          isLoading={isLoading}
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
          isLoading={isLoading}
          overviewContent={overviewContent}
          // Đối với premium bot, sử dụng label "TB365 ID" cho cột ID
          signalSourceLabel="TB365 ID"
        />
      </div>
    </MainLayout>
  );
};

export default IntegratedPremiumBotDetail;
