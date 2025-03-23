
import React from 'react';
import PerformanceOverview from '@/components/bots/details/PerformanceOverview';
import TradeDetails from '@/components/bots/details/TradeDetails';
import BotInformation from '@/components/bots/details/BotInformation';
import PerformanceStats from '@/components/bots/details/PerformanceStats';

interface PremiumBotOverviewTabProps {
  period: string;
  onPeriodChange: (period: string) => void;
  chartData: any;
  refreshLoading: boolean;
  onRefresh: () => void;
  tradePerformanceData: any;
  statisticsData: any;
  bot: {
    type: 'premium' | 'prop' | 'user';
    exchange?: string;
    minCapital: string;
    createdDate: string;
    performanceLastMonth: string;
    performanceAllTime: string;
  };
}

const PremiumBotOverviewTab: React.FC<PremiumBotOverviewTabProps> = ({
  period,
  onPeriodChange,
  chartData,
  refreshLoading,
  onRefresh,
  tradePerformanceData,
  statisticsData,
  bot
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PerformanceOverview 
          period={period}
          onPeriodChange={onPeriodChange}
          chartData={chartData}
          isLoading={refreshLoading}
          onRefresh={onRefresh}
        />

        <TradeDetails 
          tradeData={tradePerformanceData}
          statData={statisticsData}
          isLoading={refreshLoading}
          onRefresh={onRefresh}
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
};

export default PremiumBotOverviewTab;
