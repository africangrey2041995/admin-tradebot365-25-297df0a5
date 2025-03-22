
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import DashboardCard from '@/components/dashboard/DashboardCard';
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <DashboardCard 
        title="Tổng người dùng" 
        icon={<Users className="h-5 w-5" />}
        color="primary"
      >
        <div className="mt-2">
          <h2 className="text-3xl font-bold">{totalUsers}</h2>
          <div className="flex justify-between mt-4 text-sm">
            <div>
              <p className="text-green-500 font-medium">Hoạt động</p>
              <p className="text-xl font-semibold mt-1">{activeUsers}</p>
            </div>
            <div>
              <p className="text-yellow-500 font-medium">Không hoạt động</p>
              <p className="text-xl font-semibold mt-1">{inactiveUsers}</p>
            </div>
            <div>
              <p className="text-red-500 font-medium">Đã khóa</p>
              <p className="text-xl font-semibold mt-1">{suspendedUsers}</p>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard 
        title="Người dùng mới trong tháng" 
        icon={<UserPlus className="h-5 w-5" />}
        color="success"
      >
        <div className="mt-2">
          <h2 className="text-3xl font-bold">{newUsersThisMonth}</h2>
          <p className="text-sm text-green-500 flex items-center mt-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            {Math.round((newUsersThisMonth/totalUsers)*100)}% so với tổng số
          </p>
        </div>
      </DashboardCard>
      
      <DashboardCard 
        title="Người dùng mới trong tuần" 
        icon={<UserPlus className="h-5 w-5" />}
        color="info"
      >
        <div className="mt-2">
          <h2 className="text-3xl font-bold">{newUsersThisWeek}</h2>
          <p className="text-sm text-blue-500 flex items-center mt-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            {Math.round((newUsersThisWeek/newUsersThisMonth)*100)}% so với tháng này
          </p>
        </div>
      </DashboardCard>
      
      <DashboardCard 
        title="Người dùng mới hôm nay" 
        icon={<UserPlus className="h-5 w-5" />}
        color="warning"
      >
        <div className="mt-2">
          <h2 className="text-3xl font-bold">{newUsersToday}</h2>
          <p className="text-sm text-yellow-500 mt-2">
            Người dùng mới nhất trong 24 giờ qua
          </p>
        </div>
      </DashboardCard>
    </div>
  );
};
