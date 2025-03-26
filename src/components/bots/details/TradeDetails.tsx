import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface TradeData {
  name: string;
  profit: number;
  trades: number;
}

interface StatData {
  name: string;
  value: string;
  icon: React.ReactNode;
}

interface TradeDetailsProps {
  tradeData: TradeData[];
  statData: StatData[];
  isLoading: boolean;
  onRefresh: () => void;
}

const TradeDetails: React.FC<TradeDetailsProps> = ({
  statData,
  isLoading,
  onRefresh,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Chi tiết giao dịch</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onRefresh} 
          disabled={isLoading}
          className="h-8 w-8"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {/* Chart removed, keeping only the statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 mb-2">
          {statData.map((stat, index) => (
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
};

export default TradeDetails;
