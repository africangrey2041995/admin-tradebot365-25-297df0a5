
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Users, Target, AlertTriangle, Clock } from 'lucide-react';

interface ChallengeProgressCardProps {
  challengeData: {
    phase: string;
    progress: number;
    accountBalance: string;
    profitTarget: string;
    maxDrawdown: string;
    daysRemaining: string;
    description: string;
  };
}

const ChallengeProgressCard: React.FC<ChallengeProgressCardProps> = ({ challengeData }) => {
  return (
    <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-400">
            Tiến Độ Challenge
          </CardTitle>
        </div>
        <CardDescription className="text-blue-700 dark:text-blue-300">
          {challengeData.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm font-medium text-blue-700 dark:text-blue-300">
              <span>Tiến Độ</span>
              <span>{challengeData.progress}%</span>
            </div>
            <Progress 
              value={challengeData.progress} 
              className="h-2 bg-blue-200 dark:bg-blue-800/50" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-blue-950/30 rounded-lg p-3 border border-blue-100 dark:border-blue-800/20">
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <Users className="h-3 w-3" /> Số Dư Tài Khoản
              </div>
              <div className="text-xl font-bold text-blue-900 dark:text-white">
                {challengeData.accountBalance}
              </div>
            </div>
            <div className="bg-white dark:bg-blue-950/30 rounded-lg p-3 border border-blue-100 dark:border-blue-800/20">
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <Target className="h-3 w-3" /> Mục Tiêu Lợi Nhuận
              </div>
              <div className="text-xl font-bold text-blue-900 dark:text-white">
                {challengeData.profitTarget}
              </div>
            </div>
            <div className="bg-white dark:bg-blue-950/30 rounded-lg p-3 border border-blue-100 dark:border-blue-800/20">
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Rút Vốn Tối Đa
              </div>
              <div className="text-xl font-bold text-blue-900 dark:text-white">
                {challengeData.maxDrawdown}
              </div>
            </div>
            <div className="bg-white dark:bg-blue-950/30 rounded-lg p-3 border border-blue-100 dark:border-blue-800/20">
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Thời Gian Còn Lại
              </div>
              <div className="text-xl font-bold text-blue-900 dark:text-white">
                {challengeData.daysRemaining}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeProgressCard;
