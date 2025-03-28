
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Edit, 
  XCircle, 
  RefreshCw, 
  Info, 
  User 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { SubscriptionStatusBadge } from './SubscriptionStatusBadge';
import { UserSubscription } from '@/types/subscription';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getDaysRemaining } from '@/types/subscription';

interface SubscriptionsTableProps {
  subscriptions: UserSubscription[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (subscription: UserSubscription) => void;
  onCancel: (subscription: UserSubscription) => void;
  onRenew: (subscription: UserSubscription) => void;
  onViewUser?: (userId: string) => void;
}

export const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  subscriptions,
  isLoading,
  error,
  onEdit,
  onCancel,
  onRenew,
  onViewUser
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
    } catch (e) {
      return 'Không hợp lệ';
    }
  };

  const renderTimeLeft = (endDate: string) => {
    const days = getDaysRemaining(endDate);
    if (days <= 0) return 'Đã hết hạn';
    if (days === 1) return 'Còn 1 ngày';
    return `Còn ${days} ngày`;
  };

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Lỗi khi tải dữ liệu đăng ký
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead className="text-zinc-400">ID</TableHead>
            <TableHead className="text-zinc-400">Người dùng</TableHead>
            <TableHead className="text-zinc-400">Gói dịch vụ</TableHead>
            <TableHead className="text-zinc-400">Trạng thái</TableHead>
            <TableHead className="text-zinc-400">Chu kỳ</TableHead>
            <TableHead className="text-zinc-400">Ngày bắt đầu</TableHead>
            <TableHead className="text-zinc-400">Ngày kết thúc</TableHead>
            <TableHead className="text-zinc-400">Thời gian còn lại</TableHead>
            <TableHead className="text-zinc-400">Tự động gia hạn</TableHead>
            <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center">
                <div className="flex justify-center items-center">
                  <RefreshCw className="h-6 w-6 animate-spin text-primary mr-2" />
                  <span className="text-muted-foreground">Đang tải...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <TableRow key={subscription.id} className="border-zinc-800">
                <TableCell className="font-mono text-xs text-zinc-400">{subscription.id}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 pl-0 text-primary"
                    onClick={() => onViewUser && onViewUser(subscription.userId)}
                  >
                    <User className="h-3.5 w-3.5" />
                    {subscription.userId}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{subscription.packageId}</TableCell>
                <TableCell>
                  <SubscriptionStatusBadge status={subscription.status} />
                </TableCell>
                <TableCell>
                  {subscription.currentPeriod === 'monthly' && 'Hàng tháng'}
                  {subscription.currentPeriod === 'quarterly' && 'Hàng quý'}
                  {subscription.currentPeriod === 'yearly' && 'Hàng năm'}
                </TableCell>
                <TableCell>{formatDate(subscription.startDate)}</TableCell>
                <TableCell>{formatDate(subscription.endDate)}</TableCell>
                <TableCell>
                  {subscription.status === 'active' ? renderTimeLeft(subscription.endDate) : '-'}
                </TableCell>
                <TableCell>
                  {subscription.autoRenew ? (
                    <span className="text-green-500">Có</span>
                  ) : (
                    <span className="text-red-500">Không</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
                      <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-zinc-800" />
                      <DropdownMenuItem 
                        className="focus:bg-zinc-800 cursor-pointer" 
                        onClick={() => onEdit(subscription)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      
                      {subscription.status === 'active' && (
                        <DropdownMenuItem 
                          className="focus:bg-zinc-800 text-red-500 focus:text-red-500 cursor-pointer"
                          onClick={() => onCancel(subscription)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Hủy đăng ký</span>
                        </DropdownMenuItem>
                      )}
                      
                      {(subscription.status === 'expired' || subscription.status === 'cancelled') && (
                        <DropdownMenuItem 
                          className="focus:bg-zinc-800 text-green-500 focus:text-green-500 cursor-pointer"
                          onClick={() => onRenew(subscription)}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          <span>Gia hạn</span>
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuItem 
                        className="focus:bg-zinc-800 cursor-pointer"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        <span>Xem chi tiết</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                Không tìm thấy kết quả phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
