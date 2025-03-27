
import React from 'react';
import { DollarSign, ChartBar, Calendar, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PropBot } from '@/types/bot';

interface BotChallengeInfoProps {
  minCapital?: string;
  potentialProfit?: string;
  maxDrawdown?: string;
  challengeDuration?: string;
  onUpdate?: (updatedData: Partial<PropBot>) => void;
}

const BotChallengeInfo: React.FC<BotChallengeInfoProps> = ({
  minCapital,
  potentialProfit,
  maxDrawdown,
  challengeDuration,
  onUpdate = () => {}
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-2">Thông tin thử thách</h3>
      <Separator className="mb-3 bg-gray-700" />
      
      <div className="space-y-2">
        {minCapital && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-sm">
              Vốn tối thiểu: <span className="font-medium">{minCapital}</span>
            </span>
          </div>
        )}
        
        {potentialProfit && (
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm">
              Lợi nhuận dự kiến: <span className="font-medium">{potentialProfit}</span>
            </span>
          </div>
        )}
        
        {maxDrawdown && (
          <div className="flex items-center gap-2">
            <ChartBar className="w-4 h-4 text-red-400" />
            <span className="text-sm">
              Drawdown tối đa: <span className="font-medium">{maxDrawdown}</span>
            </span>
          </div>
        )}
        
        {challengeDuration && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-sm">
              Thời gian thử thách: <span className="font-medium">{challengeDuration}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotChallengeInfo;
