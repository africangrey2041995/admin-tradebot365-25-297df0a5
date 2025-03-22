
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, UserX, UserCheck, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [timePeriod, setTimePeriod] = useState<string>("today");
  
  // Get the appropriate new users count based on selected time period
  const getNewUsersCount = () => {
    switch (timePeriod) {
      case "today":
        return newUsersToday;
      case "week":
        return newUsersThisWeek;
      case "month":
        return newUsersThisMonth;
      default:
        return newUsersToday;
    }
  };
  
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
              <div className="text-yellow-400 text-sm">Tạm Khóa</div>
              <div className="text-2xl font-semibold">{inactiveUsers}</div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 text-white p-5">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-zinc-400 text-sm font-medium">Người dùng mới</div>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-32 h-8 bg-zinc-800 border-zinc-700 text-white text-xs">
                <SelectValue placeholder="Chọn thời gian" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="week">7 ngày qua</SelectItem>
                <SelectItem value="month">Tháng qua</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-4xl font-bold text-blue-400">{getNewUsersCount()}</div>
          <div className="pt-2">
            <div className="text-blue-400 text-sm">Tỷ lệ tăng trưởng</div>
            <div className="text-2xl font-semibold flex items-center">
              <TrendingUp className="w-5 h-5 mr-1 text-green-400" />
              <span className="text-green-400">+{(getNewUsersCount() / totalUsers * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
