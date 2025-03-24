
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from 'lucide-react';

interface BotStatsCardProps {
  stats: {
    totalTrades: number;
    winRate: string;
    profitFactor: number;
    sharpeRatio: number;
    currentDrawdown: string;
  };
}

const BotStatsCard: React.FC<BotStatsCardProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <BarChart2 className="h-4 w-4 mr-2 text-blue-500" />
          Thống kê Bot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-1">
          <span className="text-sm text-muted-foreground">Tổng giao dịch:</span>
          <span className="font-medium">{stats.totalTrades}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-1">
          <span className="text-sm text-muted-foreground">Tỷ lệ thắng:</span>
          <span className="font-medium">{stats.winRate}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-1">
          <span className="text-sm text-muted-foreground">Profit Factor:</span>
          <span className="font-medium">{stats.profitFactor}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-1">
          <span className="text-sm text-muted-foreground">Sharpe Ratio:</span>
          <span className="font-medium">{stats.sharpeRatio}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Drawdown hiện tại:</span>
          <span className="font-medium">{stats.currentDrawdown}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotStatsCard;
