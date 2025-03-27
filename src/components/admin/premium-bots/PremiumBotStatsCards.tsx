
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumBot } from "@/types";
import { BotStatus } from '@/constants/botTypes';
import { Zap, Users, Activity } from 'lucide-react';

interface PremiumBotStatsCardsProps {
  bots: PremiumBot[];
}

export const PremiumBotStatsCards: React.FC<PremiumBotStatsCardsProps> = ({ bots }) => {
  const totalBots = bots.length;
  const activeBots = bots.filter(bot => bot.status === BotStatus.ACTIVE).length;
  const inactiveBots = bots.filter(bot => bot.status === BotStatus.INACTIVE || bot.status === BotStatus.MAINTENANCE).length;
  const totalUsers = bots.reduce((sum, bot) => sum + (bot.users || 0), 0);
  const positivePerformance = bots.filter(bot => bot.profit && parseFloat(bot.profit) > 0).length;
  const averageProfit = (bots.reduce((sum, bot) => sum + (bot.profit ? parseFloat(bot.profit) : 0), 0) / totalBots).toFixed(1) + '%';

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tổng Bot</CardTitle>
          <Zap className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalBots}</div>
          <p className="text-xs text-zinc-400">
            {activeBots} bot đang hoạt động, {inactiveBots} tạm dừng
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tổng tài khoản</CardTitle>
          <Users className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalUsers}</div>
          <p className="text-xs text-zinc-400">
            Bình quân {(totalUsers / totalBots).toFixed(1)} tài khoản mỗi bot
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Hiệu suất tổng</CardTitle>
          <Activity className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${parseFloat(averageProfit) > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {averageProfit}
          </div>
          <p className="text-xs text-zinc-400">
            {positivePerformance} / {totalBots} bot có hiệu suất dương
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
