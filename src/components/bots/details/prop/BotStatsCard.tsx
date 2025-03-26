
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, TrendingUp, ArrowUpRight, AlertTriangle, Calendar } from 'lucide-react';

export interface BotStatsCardProps {
  stats: {
    totalTrades: number;
    winRate: string;
    profitFactor: number;
    sharpeRatio: number;
    currentDrawdown: string;
  };
  createdDate?: string;
  lastUpdated?: string;
  botId?: string;
}

const BotStatsCard: React.FC<BotStatsCardProps> = ({ 
  stats,
  createdDate,
  lastUpdated,
  botId
}) => {
  if (!stats) {
    return (
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Thống Kê Bot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Đang tải dữ liệu thống kê...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Thống Kê Bot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Tổng số giao dịch
              </div>
              <div className="text-xl font-bold">{stats.totalTrades}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> Tỷ lệ thắng
              </div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">{stats.winRate}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Profit Factor
              </div>
              <div className="text-xl font-bold">{stats.profitFactor}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Sharpe Ratio
              </div>
              <div className="text-xl font-bold">{stats.sharpeRatio}</div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Rút vốn hiện tại
            </div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">{stats.currentDrawdown}</div>
          </div>
          
          {(createdDate || lastUpdated || botId) && (
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
              <div className="grid grid-cols-1 gap-2">
                {createdDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> Ngày tạo
                    </span>
                    <span className="font-medium">{createdDate}</span>
                  </div>
                )}
                
                {lastUpdated && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> Cập nhật lần cuối
                    </span>
                    <span className="font-medium">{lastUpdated}</span>
                  </div>
                )}
                
                {botId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Bot ID</span>
                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {botId}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BotStatsCard;
