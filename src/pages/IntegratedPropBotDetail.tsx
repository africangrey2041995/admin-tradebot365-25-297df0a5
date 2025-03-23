
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { USER_ROUTES } from '@/constants/routes';
import { toast } from 'sonner';
import { Account } from '@/types';
import { SignalAction, CoinstratSignal } from '@/types/signal';
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

// Mock data cho accounts
const mockAccounts: Account[] = [
  {
    id: 'ACC001',
    name: 'Trading Account 1',
    userAccount: 'Primary Account',
    userEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccount: '4056629',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$500',
    status: 'Connected',
    createdDate: new Date(2023, 5, 15).toISOString(),
    lastUpdated: new Date(2023, 11, 20).toISOString(),
    userId: 'USR-001'
  },
  {
    id: 'ACC002',
    name: 'Trading Account 2',
    userAccount: 'Secondary Account',
    userEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccount: '4056789',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$1000',
    status: 'Connected',
    createdDate: new Date(2023, 6, 22).toISOString(),
    lastUpdated: new Date(2023, 10, 5).toISOString(),
    userId: 'USR-001'
  },
  {
    id: 'ACC003',
    name: 'Demo Account',
    userAccount: 'Test Account',
    userEmail: 'test@example.com',
    apiName: 'Coinbase API',
    apiId: 'API002',
    tradingAccount: '4044856',
    tradingAccountType: 'Demo',
    tradingAccountBalance: '$10000',
    status: 'Disconnected',
    createdDate: new Date(2023, 7, 10).toISOString(),
    lastUpdated: new Date(2023, 9, 18).toISOString(),
    userId: 'USR-002'
  },
];

// Mock data cho logs
const mockLogs: CoinstratSignal[] = [
  {
    id: 'CSP-78952364',
    originalSignalId: 'SIG001',
    action: 'ENTER_LONG' as SignalAction,
    instrument: 'BTCUSDT',
    timestamp: new Date().toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '1.5',
    status: 'Processed',
    processedAccounts: [
      {
        accountId: 'ACC-001',
        userId: 'USR-001',
        name: 'Binance Spot Account',
        timestamp: new Date().toISOString(),
        status: 'success'
      },
      {
        accountId: 'ACC-002',
        userId: 'USR-001',
        name: 'Coinstart Pro Account',
        timestamp: new Date().toISOString(),
        status: 'success'
      }
    ],
    failedAccounts: []
  },
  {
    id: 'CSP-78956789',
    originalSignalId: 'SIG002',
    action: 'EXIT_LONG' as SignalAction,
    instrument: 'ETHUSDT',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '2.3',
    status: 'Processed',
    processedAccounts: [
      {
        accountId: 'ACC-001',
        userId: 'USR-001',
        name: 'Binance Spot Account',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'success'
      }
    ],
    failedAccounts: []
  },
  {
    id: 'CSP-78959012',
    originalSignalId: 'SIG003',
    action: 'ENTER_SHORT' as SignalAction,
    instrument: 'SOLUSDT',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '3.7',
    status: 'Failed',
    processedAccounts: [],
    failedAccounts: [
      {
        accountId: 'ACC-003',
        userId: 'USR-001',
        name: 'FTX Account',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        reason: 'Invalid account configuration',
        errorCode: 'ACC_CONFIG_ERROR',
        status: 'failed'
      },
      {
        accountId: 'ACC-004',
        userId: 'USR-001',
        name: 'Bybit Account',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        reason: 'API key expired',
        errorCode: 'API_KEY_EXPIRED',
        status: 'failed'
      }
    ],
    errorMessage: 'Invalid account configuration'
  },
];

const IntegratedPropBotDetail = () => {
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
          accountsData={mockAccounts}
          logsData={mockLogs}
          // Đối với prop bot, sử dụng label "TB365 ID" cho cột ID
          signalSourceLabel="TB365 ID"
        />
      </div>
    </MainLayout>
  );
};

export default IntegratedPropBotDetail;
