
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PropTradingPromo from '@/components/dashboard/PropTradingPromo';
import ActivityOverview from '@/components/dashboard/ActivityOverview';
import SystemStats from '@/components/dashboard/SystemStats';
import PremiumBotsPromo from '@/components/dashboard/PremiumBotsPromo';
import SystemOverview from '@/components/dashboard/SystemOverview';
import BotPerformanceChart from '@/components/dashboard/BotPerformanceChart';

const Index = () => {
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

  // Mock performance data for the chart
  const performanceData = {
    weekly: [
      { name: 'Mon', value: 2.3 },
      { name: 'Tue', value: -1.2 },
      { name: 'Wed', value: 3.5 },
      { name: 'Thu', value: 2.8 },
      { name: 'Fri', value: 1.9 },
      { name: 'Sat', value: -0.5 },
      { name: 'Sun', value: 1.2 },
    ],
    monthly: [
      { name: 'Jan', value: 8.5 },
      { name: 'Feb', value: 6.3 },
      { name: 'Mar', value: -2.1 },
      { name: 'Apr', value: 4.7 },
      { name: 'May', value: 10.2 },
      { name: 'Jun', value: 8.1 },
      { name: 'Jul', value: 3.5 },
      { name: 'Aug', value: -1.2 },
      { name: 'Sep', value: 5.8 },
      { name: 'Oct', value: 12.5 },
      { name: 'Nov', value: 9.3 },
      { name: 'Dec', value: 7.5 },
    ],
    yearly: [
      { name: '2019', value: 15.5 },
      { name: '2020', value: -8.3 },
      { name: '2021', value: 22.1 },
      { name: '2022', value: 12.7 },
      { name: '2023', value: 18.2 },
    ],
  };

  return (
    <MainLayout title="Bảng Điều Khiển">
      <PropTradingPromo />
      <ActivityOverview dashboardStats={dashboardStats} />
      <div className="mb-8">
        <BotPerformanceChart data={performanceData} />
      </div>
      <SystemStats dashboardStats={dashboardStats} />
      <PremiumBotsPromo />
      <SystemOverview />
    </MainLayout>
  );
};

export default Index;
