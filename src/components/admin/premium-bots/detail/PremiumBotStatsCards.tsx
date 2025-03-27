
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Người Dùng Đăng Ký</CardTitle>
          <Users className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{registeredUsers}</div>
          <p className="text-xs text-zinc-400">
            Số người dùng đang sử dụng bot này
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tài Khoản Giao Dịch</CardTitle>
          <Briefcase className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{tradingAccounts}</div>
          <p className="text-xs text-zinc-400">
            Tài khoản giao dịch đang kết nối
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tín Hiệu Đã Xử Lý</CardTitle>
          <Activity className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{processedSignals}</div>
          <p className="text-xs text-zinc-400">
            Tổng số tín hiệu bot đã xử lý
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumBotStatsCards;
