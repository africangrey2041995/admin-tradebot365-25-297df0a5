
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BotRiskLevel, BotStatus, BOT_STATUS_DISPLAY } from '@/constants/botTypes';
import { BarChart4, Briefcase, Calendar, ArrowLeftRight, DollarSign, Percent } from 'lucide-react';

interface PropBotInfoCardProps {
  botId: string;
  description: string;
  createdDate: string;
  lastUpdated: string;
  performanceLastMonth: string;
  performanceAllTime: string;
  propFirm?: string;
  exchange?: string;
  status: BotStatus;
  risk: BotRiskLevel;
  colorScheme?: string;
  minCapital?: string;
  maxDrawdown?: string;
  challengeDuration?: string;
}

const PropBotInfoCard: React.FC<PropBotInfoCardProps> = ({
  botId,
  description,
  createdDate,
  lastUpdated,
  performanceLastMonth,
  performanceAllTime,
  propFirm,
  exchange,
  status,
  risk,
  colorScheme = 'green',
  minCapital,
  maxDrawdown,
  challengeDuration
}) => {
  const getColorSchemeClasses = () => {
    switch (colorScheme) {
      case 'blue': return 'bg-blue-500/10 border-blue-500/30';
      case 'green': return 'bg-green-500/10 border-green-500/30';
      case 'red': return 'bg-red-500/10 border-red-500/30';
      case 'purple': return 'bg-purple-500/10 border-purple-500/30';
      default: return 'bg-slate-500/10 border-slate-500/30';
    }
  };

  const getStatusColorClass = () => {
    switch (status) {
      case BotStatus.ACTIVE: return 'bg-green-500';
      case BotStatus.INACTIVE: return 'bg-slate-500';
      case BotStatus.MAINTENANCE: return 'bg-blue-500';
      case BotStatus.ERROR: return 'bg-red-500';
      case BotStatus.SUSPENDED: return 'bg-orange-500';
      default: return 'bg-slate-500';
    }
  };

  const formatPerformance = (perf: string) => {
    if (perf.startsWith('+')) {
      return <span className="text-green-500">{perf}</span>;
    } else if (perf.startsWith('-')) {
      return <span className="text-red-500">{perf}</span>;
    }
    return <span>{perf}</span>;
  };

  return (
    <Card className="border-gray-700 bg-gray-800/50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {/* Bot Avatar */}
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getColorSchemeClasses()}`}>
            <BarChart4 className="w-8 h-8 text-white" />
          </div>
          
          {/* Bot Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white">{botId}</h3>
              <div className={`w-3 h-3 rounded-full ${getStatusColorClass()}`}></div>
              <span className="text-sm text-gray-400">{BOT_STATUS_DISPLAY[status]}</span>
            </div>
            
            <p className="text-gray-300 mb-4">{description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Ngày tạo
                </p>
                <p className="text-sm">{createdDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Cập nhật
                </p>
                <p className="text-sm">{lastUpdated}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <ArrowLeftRight className="w-3 h-3 mr-1" />
                  Sàn giao dịch
                </p>
                <p className="text-sm">{exchange || 'Không xác định'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Briefcase className="w-3 h-3 mr-1" />
                  Prop Firm
                </p>
                <p className="text-sm">{propFirm || 'Không xác định'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-700/30 p-3 rounded-md">
                <p className="text-xs text-gray-400 mb-1">Hiệu suất tháng trước</p>
                <p className="text-xl font-bold">{formatPerformance(performanceLastMonth)}</p>
              </div>
              <div className="bg-gray-700/30 p-3 rounded-md">
                <p className="text-xs text-gray-400 mb-1">Hiệu suất tổng</p>
                <p className="text-xl font-bold">{formatPerformance(performanceAllTime)}</p>
              </div>
            </div>
            
            {/* Thông tin Prop Trading */}
            {(minCapital || maxDrawdown || challengeDuration) && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {minCapital && (
                  <div className="bg-gray-700/30 p-3 rounded-md">
                    <p className="text-xs text-gray-400 mb-1 flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Vốn tối thiểu
                    </p>
                    <p className="text-sm font-medium">{minCapital}</p>
                  </div>
                )}
                
                {maxDrawdown && (
                  <div className="bg-gray-700/30 p-3 rounded-md">
                    <p className="text-xs text-gray-400 mb-1 flex items-center">
                      <Percent className="w-3 h-3 mr-1" />
                      Drawdown tối đa
                    </p>
                    <p className="text-sm font-medium">{maxDrawdown}</p>
                  </div>
                )}
                
                {challengeDuration && (
                  <div className="bg-gray-700/30 p-3 rounded-md">
                    <p className="text-xs text-gray-400 mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Thời gian thử thách
                    </p>
                    <p className="text-sm font-medium">{challengeDuration}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropBotInfoCard;
