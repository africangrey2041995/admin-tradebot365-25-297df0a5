
import React from 'react';
import TradeDetails from '@/components/bots/details/TradeDetails';
import BotInformation from '@/components/bots/details/BotInformation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  refreshLoading,
  onRefresh,
  statisticsData,
  bot
}) => {
  // Custom Stats Component to show only statistics
  const StatsDisplay = () => (
    <Card>
      <CardHeader>
        <CardTitle>Chi tiết giao dịch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
          {statisticsData.map((stat: any, index: number) => (
            <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 dark:bg-zinc-800/50 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {stat.name}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* PerformanceOverview removed */}
        
        {/* Replace TradeDetails with just statistics */}
        <StatsDisplay />
      </div>

      <div className="space-y-6">
        <BotInformation 
          botType={bot.type}
          exchange={bot.exchange || ''}
          minCapital={bot.minCapital}
          integrationDate={bot.createdDate}
        />
        
        {/* Performance stats removed as requested */}
      </div>
    </div>
  );
};

export default PremiumBotOverviewTab;
