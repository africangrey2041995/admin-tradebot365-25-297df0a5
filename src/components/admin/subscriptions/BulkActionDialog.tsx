
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';
import { SubscriptionStatus } from '@/types/subscription';

interface BulkActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
  action: 'cancel' | 'renew' | 'change-status';
  onConfirm: (newStatus?: SubscriptionStatus) => void;
  isProcessing: boolean;
  status?: SubscriptionStatus;
  setStatus?: (status: SubscriptionStatus) => void;
}

export const BulkActionDialog: React.FC<BulkActionDialogProps> = ({
  open,
  onOpenChange,
  count,
  action,
  onConfirm,
  isProcessing,
  status,
  setStatus,
}) => {
  const getTitle = () => {
    switch (action) {
      case 'cancel':
        return 'Hủy đăng ký hàng loạt';
      case 'renew':
        return 'Gia hạn đăng ký hàng loạt';
      case 'change-status':
        return 'Thay đổi trạng thái hàng loạt';
      default:
        return 'Xác nhận thao tác hàng loạt';
    }
  };

  const getDescription = () => {
    switch (action) {
      case 'cancel':
        return `Bạn có chắc chắn muốn hủy ${count} đăng ký đã chọn? Hành động này sẽ hủy quá trình gia hạn tự động và người dùng sẽ mất quyền truy cập vào dịch vụ sau khi kết thúc thời hạn hiện tại.`;
      case 'renew':
        return `Bạn có chắc chắn muốn gia hạn ${count} đăng ký đã chọn? Hành động này sẽ gia hạn gói dịch vụ hiện tại cho người dùng theo chu kỳ tương ứng.`;
      case 'change-status':
        return `Bạn có chắc chắn muốn thay đổi trạng thái của ${count} đăng ký đã chọn? Hành động này sẽ cập nhật trạng thái của tất cả các đăng ký đã chọn.`;
      default:
        return `Bạn có chắc chắn muốn thực hiện thao tác này với ${count} đăng ký đã chọn?`;
    }
  };

  const getButtonText = () => {
    switch (action) {
      case 'cancel':
        return isProcessing ? 'Đang hủy...' : 'Xác nhận hủy';
      case 'renew':
        return isProcessing ? 'Đang gia hạn...' : 'Xác nhận gia hạn';
      case 'change-status':
        return isProcessing ? 'Đang cập nhật...' : 'Xác nhận thay đổi';
      default:
        return isProcessing ? 'Đang xử lý...' : 'Xác nhận';
    }
  };

  const getButtonClass = () => {
    switch (action) {
      case 'cancel':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'renew':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'change-status':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      default:
        return 'bg-primary hover:bg-primary/90';
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            {getDescription()}
            
            {action === 'change-status' && setStatus && (
              <div className="mt-4">
                <label htmlFor="status-select" className="block text-sm font-medium mb-1">
                  Chọn trạng thái mới:
                </label>
                <select
                  id="status-select"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as SubscriptionStatus)}
                >
                  <option value="active">Đang hoạt động</option>
                  <option value="expired">Đã hết hạn</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            Đóng
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm(action === 'change-status' ? status : undefined);
            }}
            disabled={isProcessing}
            className={getButtonClass()}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {getButtonText()}
              </>
            ) : (
              getButtonText()
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BulkActionDialog;
