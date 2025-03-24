
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, AlertTriangle, DollarSign, Goal } from 'lucide-react';

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Goal className="h-5 w-5 mr-2 text-blue-500" />
          {challengeData.phase}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{challengeData.daysRemaining}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {challengeData.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Tiến độ</div>
            <div className="text-sm text-muted-foreground">{challengeData.progress}%</div>
          </div>
          <Progress value={challengeData.progress} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-md border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">
              <DollarSign className="h-4 w-4 mr-1" />
              Balance
            </div>
            <div className="text-lg font-semibold">
              {challengeData.accountBalance}
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-md border border-green-100 dark:border-green-900/30">
            <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium mb-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              Target
            </div>
            <div className="text-lg font-semibold">
              {challengeData.profitTarget}
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-md border border-amber-100 dark:border-amber-900/30">
            <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-medium mb-1">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Max DD
            </div>
            <div className="text-lg font-semibold">
              {challengeData.maxDrawdown}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeProgressCard;
