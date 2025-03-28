
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserSubscription } from '@/types/subscription';
import { Receipt, CalendarCheck, AlertCircle, CalendarX, Loader2 } from 'lucide-react';

interface SubscriptionsStatsCardsProps {
  subscriptions: UserSubscription[];
  isLoading: boolean;
}

export const SubscriptionsStatsCards: React.FC<SubscriptionsStatsCardsProps> = ({
  subscriptions,
  isLoading
}) => {
  // Tính toán thống kê
  const activeCount = subscriptions.filter(sub => sub.status === 'active').length;
  const pendingCount = subscriptions.filter(sub => sub.status === 'pending').length;
  const expiredCount = subscriptions.filter(sub => sub.status === 'expired').length;
  const cancelledCount = subscriptions.filter(sub => sub.status === 'cancelled').length;
  
  const totalCount = subscriptions.length;
  
  // Thống kê theo package
  const packageCounts = subscriptions.reduce((acc, sub) => {
    acc[sub.packageId] = (acc[sub.packageId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Thống kê theo period
  const periodCounts = subscriptions.reduce((acc, sub) => {
    acc[sub.currentPeriod] = (acc[sub.currentPeriod] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang tải...
              </CardTitle>
              <CardDescription className="text-zinc-400">Đang tải dữ liệu thống kê</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Receipt className="h-4 w-4 mr-2 text-primary" />
            Tổng gói đăng ký
          </CardTitle>
          <CardDescription className="text-zinc-400">Tất cả đăng ký trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCount}</div>
          <div className="text-xs text-zinc-400 mt-1">
            {Object.entries(packageCounts).map(([pkg, count], index) => (
              <span key={pkg}>
                {pkg}: {count}
                {index < Object.entries(packageCounts).length - 1 ? ' | ' : ''}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <CalendarCheck className="h-4 w-4 mr-2 text-green-500" />
            Đang hoạt động
          </CardTitle>
          <CardDescription className="text-zinc-400">Đăng ký đang được sử dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCount}</div>
          <div className="text-xs text-zinc-400 mt-1">
            {Object.entries(periodCounts).map(([period, count], index) => (
              <span key={period}>
                {period === 'monthly' ? 'Hàng tháng' : period === 'quarterly' ? 'Hàng quý' : 'Hàng năm'}: {count}
                {index < Object.entries(periodCounts).length - 1 ? ' | ' : ''}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
            Chờ xác nhận / Hết hạn
          </CardTitle>
          <CardDescription className="text-zinc-400">Cần xử lý</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingCount + expiredCount}</div>
          <div className="text-xs text-zinc-400 mt-1">
            Chờ xác nhận: {pendingCount} | Hết hạn: {expiredCount}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <CalendarX className="h-4 w-4 mr-2 text-red-500" />
            Đã hủy
          </CardTitle>
          <CardDescription className="text-zinc-400">Đăng ký đã bị hủy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cancelledCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};
