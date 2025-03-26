import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface BotStatsCardProps {
  stats: {
    totalTrades: number;
    winRate: string;
    profitFactor: number;
    sharpeRatio: number;
    currentDrawdown: string;
  };
}
const BotStatsCard: React.FC<BotStatsCardProps> = ({
  stats
}) => {
  return <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
        <CardTitle className="text-lg font-medium">Mục Tiêu Bot</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-600 dark:text-gray-300">Số Giao Dịch</span>
            <span className="font-semibold text-gray-900 dark:text-white">{stats.totalTrades}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-600 dark:text-gray-300">Tỷ Lệ Thắng</span>
            <span className="font-semibold text-green-600 dark:text-green-400">{stats.winRate}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-600 dark:text-gray-300">Hệ Số Lợi Nhuận</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.profitFactor}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-600 dark:text-gray-300">Tỷ Lệ Sharpe</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.sharpeRatio}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-600 dark:text-gray-300">Drawdown Hiện Tại</span>
            <span className="font-semibold text-red-600 dark:text-red-400">{stats.currentDrawdown}</span>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default BotStatsCard;