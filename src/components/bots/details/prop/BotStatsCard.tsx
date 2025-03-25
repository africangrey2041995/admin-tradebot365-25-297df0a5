
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface BotStatsCardProps {
  stats: {
    totalTrades: number;
    winRate: string;
    profitFactor: number;
    sharpeRatio: number;
  };
}

const BotStatsCard: React.FC<BotStatsCardProps> = ({ stats }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800">
      <CardContent className="p-6">
        <h3 className="font-medium mb-3 text-lg">Chỉ số Bot</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">Tổng giao dịch</span>
            <span className="font-medium">{stats.totalTrades}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">Tỷ lệ thắng</span>
            <span className="font-medium">{stats.winRate}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">Hệ số lợi nhuận</span>
            <span className="font-medium">{stats.profitFactor}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600 dark:text-gray-400">Tỷ lệ Sharpe</span>
            <span className="font-medium">{stats.sharpeRatio}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotStatsCard;
