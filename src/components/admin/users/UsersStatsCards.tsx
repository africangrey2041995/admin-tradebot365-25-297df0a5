
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, UserX, UserCheck, TrendingUp } from "lucide-react";

type UsersStatsCardsProps = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  newUsersThisMonth: number;
  newUsersThisWeek?: number;
  newUsersToday?: number;
};

export const UsersStatsCards = ({ 
  totalUsers, 
  activeUsers, 
  inactiveUsers, 
  suspendedUsers,
  newUsersThisMonth,
  newUsersThisWeek = 1,
  newUsersToday = 0
}: UsersStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card className="bg-zinc-900 border-zinc-800 text-white p-5">
        <div className="space-y-3">
          <div className="text-zinc-400 text-sm font-medium">Tổng người dùng</div>
          <div className="text-4xl font-bold text-white">{totalUsers}</div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <div className="text-green-400 text-sm">Hoạt động</div>
              <div className="text-2xl font-semibold">{activeUsers}</div>
            </div>
            <div>
              <div className="text-yellow-400 text-sm">Không hoạt động</div>
              <div className="text-2xl font-semibold">{inactiveUsers}</div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 text-white p-5">
        <div className="space-y-3">
          <div className="text-zinc-400 text-sm font-medium">Hiệu suất</div>
          <div className="text-4xl font-bold text-green-400">9.6%</div>
          <div className="pt-2">
            <div className="text-green-400 text-sm">Bot hiệu quả</div>
            <div className="text-2xl font-semibold">4 / 5</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
