
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PremiumBot } from "@/types";

interface PremiumBotStatsCardsProps {
  bots: PremiumBot[];
}

export const PremiumBotStatsCards: React.FC<PremiumBotStatsCardsProps> = ({ bots }) => {
  const totalBots = bots.length;
  const activeBots = bots.filter(bot => bot.status === 'active').length;
  const inactiveBots = bots.filter(bot => bot.status === 'inactive' || bot.status === 'maintenance').length;
  const totalUsers = bots.reduce((sum, bot) => sum + (bot.users || 0), 0);
  const positivePerformance = bots.filter(bot => bot.profit && parseFloat(bot.profit) > 0).length;
  const averageProfit = (bots.reduce((sum, bot) => sum + (bot.profit ? parseFloat(bot.profit) : 0), 0) / totalBots).toFixed(1) + '%';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="border-zinc-800 bg-zinc-900/80 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <p className="text-zinc-400 text-sm">Tổng Bot</p>
              <h3 className="text-3xl font-bold mt-1">{totalBots}</h3>
              <div className="flex justify-between space-x-6 mt-4">
                <div>
                  <p className="text-green-400 text-xs">Hoạt động</p>
                  <p className="text-xl font-medium">{activeBots}</p>
                </div>
                <div>
                  <p className="text-yellow-400 text-xs">Không hoạt động</p>
                  <p className="text-xl font-medium">{inactiveBots}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-zinc-800 bg-zinc-900/80 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <p className="text-zinc-400 text-sm">Tài khoản</p>
              <h3 className="text-3xl font-bold mt-1">{totalUsers}</h3>
              <div className="mt-4">
                <p className="text-zinc-400 text-xs">Bình quân mỗi bot</p>
                <p className="text-xl font-medium">{(totalUsers / totalBots).toFixed(1)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-zinc-800 bg-zinc-900/80 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <p className="text-zinc-400 text-sm">Hiệu suất</p>
              <h3 className={`text-3xl font-bold mt-1 ${parseFloat(averageProfit) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {averageProfit}
              </h3>
              <div className="mt-4">
                <p className="text-zinc-400 text-xs">Bot hiệu quả</p>
                <p className="text-xl font-medium">{positivePerformance} / {totalBots}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
