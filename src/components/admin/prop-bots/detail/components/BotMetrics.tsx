
import React from 'react';
import { Users, Activity } from 'lucide-react';

export interface BotMetricsProps {
  performanceLastMonth?: string;
  performanceAllTime?: string;
  colorScheme?: 'default' | 'red' | 'blue' | 'green' | 'purple';
  connectedAccounts: number;
  processedSignals: number;
}

const BotMetrics: React.FC<BotMetricsProps> = ({ 
  performanceLastMonth,
  performanceAllTime,
  colorScheme = 'default',
  connectedAccounts, 
  processedSignals 
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
        <p className="text-xs text-gray-400 mb-1 flex items-center">
          <Users className="w-3 h-3 mr-1" />
          Tài khoản kết nối
        </p>
        <div className="flex items-center">
          <p className="text-xl font-bold text-white">{connectedAccounts}</p>
        </div>
      </div>
      
      <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
        <p className="text-xs text-gray-400 mb-1 flex items-center">
          <Activity className="w-3 h-3 mr-1" />
          Tín hiệu đã xử lý
        </p>
        <div className="flex items-center">
          <p className="text-xl font-bold text-white">{processedSignals}</p>
        </div>
      </div>

      {performanceLastMonth && (
        <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
          <p className="text-xs text-gray-400 mb-1">
            Hiệu suất tháng gần đây
          </p>
          <div className="flex items-center">
            <p className="text-xl font-bold text-white">{performanceLastMonth}</p>
          </div>
        </div>
      )}

      {performanceAllTime && (
        <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
          <p className="text-xs text-gray-400 mb-1">
            Hiệu suất tổng thể
          </p>
          <div className="flex items-center">
            <p className="text-xl font-bold text-white">{performanceAllTime}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotMetrics;
