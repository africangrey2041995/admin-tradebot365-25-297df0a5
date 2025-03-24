
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropBot } from '@/types';
import { BotStatus } from '@/constants/botTypes';

interface PropBotStatsCardsProps {
  bots: PropBot[];
}

export const PropBotStatsCards: React.FC<PropBotStatsCardsProps> = ({ bots }) => {
  // Calculate stats from data
  const totalBots = bots.length;
  const totalAccounts = bots.reduce((sum, bot) => sum + bot.users, 0);
  const activeBots = bots.filter(bot => bot.status === BotStatus.ACTIVE).length;
  const performanceRate = Math.round((activeBots / totalBots) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tổng Prop Bots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalBots}</div>
          <p className="text-xs text-zinc-400">
            {activeBots} bot đang hoạt động, {totalBots - activeBots} tạm dừng
          </p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tổng tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalAccounts}</div>
          <p className="text-xs text-zinc-400">
            Tài khoản người dùng đang sử dụng prop bots
          </p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Hiệu suất tổng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">{performanceRate}%</div>
          <p className="text-xs text-zinc-400">
            Tỷ lệ bots đang hoạt động hiệu quả
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
