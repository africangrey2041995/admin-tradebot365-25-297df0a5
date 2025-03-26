
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Activity } from 'lucide-react';

interface PremiumBotStatsCardsProps {
  registeredUsers: number;
  tradingAccounts: number;
  processedSignals: number;
}

const PremiumBotStatsCards: React.FC<PremiumBotStatsCardsProps> = ({
  registeredUsers,
  tradingAccounts,
  processedSignals
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
              <Users className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Người Dùng Đăng Ký</p>
              <h3 className="text-2xl font-bold">{registeredUsers}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
              <Briefcase className="h-6 w-6 text-green-500 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tài Khoản Giao Dịch</p>
              <h3 className="text-2xl font-bold">{tradingAccounts}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
              <Activity className="h-6 w-6 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tín Hiệu Đã Xử Lý</p>
              <h3 className="text-2xl font-bold">{processedSignals}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumBotStatsCards;
