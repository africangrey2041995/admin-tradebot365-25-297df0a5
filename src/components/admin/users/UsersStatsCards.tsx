
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

type UsersStatsCardsProps = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  newUsersThisMonth: number;
};

export const UsersStatsCards = ({ 
  totalUsers, 
  activeUsers, 
  inactiveUsers, 
  suspendedUsers,
  newUsersThisMonth
}: UsersStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardContent className="p-6">
          <p className="text-zinc-400 text-sm">Tổng người dùng</p>
          <h2 className="text-4xl font-bold mt-2 mb-4">{totalUsers}</h2>
          
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-green-500">Hoạt động</p>
              <p className="text-2xl font-semibold mt-1">{activeUsers}</p>
            </div>
            <div>
              <p className="text-yellow-500">Không hoạt động</p>
              <p className="text-2xl font-semibold mt-1">{inactiveUsers}</p>
            </div>
            <div>
              <p className="text-red-500">Đã khóa</p>
              <p className="text-2xl font-semibold mt-1">{suspendedUsers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardContent className="p-6">
          <p className="text-zinc-400 text-sm">Người dùng mới</p>
          <h2 className="text-4xl font-bold mt-2 mb-4">{newUsersThisMonth}</h2>
          
          <div>
            <p className="text-zinc-400 text-sm">Tháng này</p>
            <p className="text-2xl font-semibold mt-1 text-green-500">+{Math.round((newUsersThisMonth/totalUsers)*100)}%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
