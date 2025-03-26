
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart4 } from 'lucide-react';

interface PerformanceCardProps {
  performanceLastMonth: string;
  performanceAllTime: string;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  performanceLastMonth,
  performanceAllTime
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiệu suất</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white dark:bg-zinc-800/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-500">Hiệu suất tháng này</span>
          </div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
            {performanceLastMonth}
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <BarChart4 className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-500">Hiệu suất tổng thời gian</span>
          </div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
            {performanceAllTime}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(PerformanceCard);
