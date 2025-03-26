
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserBot } from '@/types';
import { BotStatus } from '@/constants/botTypes';
import { Bot, Users, Briefcase } from 'lucide-react';

interface UserBotStatsCardsProps {
  bots: UserBot[];
}

export const UserBotStatsCards: React.FC<UserBotStatsCardsProps> = ({ bots }) => {
  // Calculate stats from data
  const totalBots = bots.length;
  const activeBots = bots.filter(bot => bot.status === BotStatus.ACTIVE).length;
  const inactiveBots = totalBots - activeBots;
  const totalAccounts = bots.reduce((sum, bot) => sum + bot.accounts, 0);
  const avgAccountsPerBot = totalBots > 0 ? Math.round((totalAccounts / totalBots) * 10) / 10 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tổng User Bots</CardTitle>
          <Bot className="h-4 w-4 text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalBots}</div>
          <p className="text-xs text-zinc-400">
            {activeBots} đang hoạt động, {inactiveBots} tạm dừng
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tổng tài khoản</CardTitle>
          <Briefcase className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalAccounts}</div>
          <p className="text-xs text-zinc-400">
            Tài khoản giao dịch đã tích hợp
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Trung bình</CardTitle>
          <Users className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{avgAccountsPerBot}</div>
          <p className="text-xs text-zinc-400">
            Tài khoản/Bot
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
