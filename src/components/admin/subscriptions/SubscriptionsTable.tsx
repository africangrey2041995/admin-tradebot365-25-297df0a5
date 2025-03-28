
import React from 'react';
import { DataTable } from '@/components/ui/data-table';
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
  onViewDetails: (subscription: UserSubscription) => void;
  onViewUser?: (userId: string) => void;
  selectedRows: string[];
  onSelectedRowsChange: (rows: string[]) => void;
}

export const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  subscriptions,
  isLoading,
  error,
  onEdit,
  onCancel,
  onRenew,
  onViewDetails,
  onViewUser,
  selectedRows,
  onSelectedRowsChange
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

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (value: string) => <span className="font-mono text-xs text-zinc-400">{value}</span>
    },
    {
      accessorKey: 'userId',
      header: 'Người dùng',
      cell: (value: string, row: UserSubscription) => (
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 pl-0 text-primary"
          onClick={() => onViewUser && onViewUser(row.userId)}
        >
          <User className="h-3.5 w-3.5" />
          {value}
        </Button>
      )
    },
    {
      accessorKey: 'packageId',
      header: 'Gói dịch vụ',
      cell: (value: string) => <span className="font-medium">{value}</span>
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: (value: string) => <SubscriptionStatusBadge status={value as any} />
    },
    {
      accessorKey: 'currentPeriod',
      header: 'Chu kỳ',
      cell: (value: string) => (
        <>
          {value === 'monthly' && 'Hàng tháng'}
          {value === 'quarterly' && 'Hàng quý'}
          {value === 'yearly' && 'Hàng năm'}
        </>
      )
    },
    {
      accessorKey: 'startDate',
      header: 'Ngày bắt đầu',
      cell: (value: string) => formatDate(value)
    },
    {
      accessorKey: 'endDate',
      header: 'Ngày kết thúc',
      cell: (value: string) => formatDate(value)
    },
    {
      accessorKey: 'timeLeft',
      header: 'Thời gian còn lại',
      cell: (_: any, row: UserSubscription) => (
        <span>
          {row.status === 'active' ? renderTimeLeft(row.endDate) : '-'}
        </span>
      )
    },
    {
      accessorKey: 'autoRenew',
      header: 'Tự động gia hạn',
      cell: (value: boolean) => (
        <>
          {value ? (
            <span className="text-green-500">Có</span>
          ) : (
            <span className="text-red-500">Không</span>
          )}
        </>
      )
    },
    {
      accessorKey: 'actions',
      header: 'Tác vụ',
      cell: (_: any, row: UserSubscription) => (
        <div className="text-right">
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
                onClick={() => onViewDetails(row)}
              >
                <Info className="mr-2 h-4 w-4" />
                <span>Xem chi tiết</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="focus:bg-zinc-800 cursor-pointer" 
                onClick={() => onEdit(row)}
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Chỉnh sửa</span>
              </DropdownMenuItem>
              
              {row.status === 'active' && (
                <DropdownMenuItem 
                  className="focus:bg-zinc-800 text-red-500 focus:text-red-500 cursor-pointer"
                  onClick={() => onCancel(row)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  <span>Hủy đăng ký</span>
                </DropdownMenuItem>
              )}
              
              {(row.status === 'expired' || row.status === 'cancelled') && (
                <DropdownMenuItem 
                  className="focus:bg-zinc-800 text-green-500 focus:text-green-500 cursor-pointer"
                  onClick={() => onRenew(row)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  <span>Gia hạn</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={subscriptions}
      isLoading={isLoading}
      error={error}
      emptyMessage="Không tìm thấy đăng ký nào."
      onRowClick={(row) => onViewDetails(row)}
      selectable={true}
      selectedRows={selectedRows}
      onSelectedRowsChange={onSelectedRowsChange}
      rowIdentifier="id"
    />
  );
};
