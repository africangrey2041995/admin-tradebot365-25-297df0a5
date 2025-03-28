
import React, { useState, useEffect } from 'react';
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
import { Loader2, Calendar } from 'lucide-react';
import { SubscriptionStatus } from '@/types/subscription';
import { format, addMonths, addDays, addYears } from 'date-fns';
import { vi } from 'date-fns/locale';

interface BulkActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
  action: 'cancel' | 'renew' | 'change-status';
  onConfirm: (newStatus?: SubscriptionStatus, renewalPeriods?: number) => void;
  isProcessing: boolean;
  status?: SubscriptionStatus;
  setStatus?: (status: SubscriptionStatus) => void;
  currentPeriod?: 'monthly' | 'quarterly' | 'yearly';
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
  currentPeriod = 'monthly', // Mặc định nếu không có
}) => {
  const [renewalPeriods, setRenewalPeriods] = useState<number>(1);
  const [estimatedEndDate, setEstimatedEndDate] = useState<Date | null>(null);

  useEffect(() => {
    // Tính ngày ước tính khi mở dialog gia hạn
    if (action === 'renew') {
      calculateEstimatedEndDate(1);
    }
  }, [action, open]);

  const calculateEstimatedEndDate = (periods: number) => {
    // Tính ngày kết thúc ước tính dựa trên ngày hiện tại
    const currentDate = new Date();
    let newDate: Date;

    switch (currentPeriod) {
      case 'monthly':
        newDate = addMonths(currentDate, periods);
        break;
      case 'quarterly':
        newDate = addMonths(currentDate, periods * 3);
        break;
      case 'yearly':
        newDate = addYears(currentDate, periods);
        break;
      default:
        newDate = addDays(currentDate, 30 * periods);
    }

    setEstimatedEndDate(newDate);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const periods = parseInt(e.target.value);
    setRenewalPeriods(periods);
    calculateEstimatedEndDate(periods);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'dd/MM/yyyy', { locale: vi });
  };

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

  const getPeriodLabel = () => {
    switch (currentPeriod) {
      case 'monthly':
        return 'tháng';
      case 'quarterly':
        return 'quý';
      case 'yearly':
        return 'năm';
      default:
        return 'kỳ';
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
            
            {action === 'renew' && (
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="bulk-renewal-periods" className="block text-sm font-medium mb-1">
                    Số kỳ gia hạn:
                  </label>
                  <select 
                    id="bulk-renewal-periods" 
                    value={renewalPeriods}
                    onChange={handlePeriodChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 12].map(period => (
                      <option key={period} value={period}>
                        {period} {getPeriodLabel()}
                        {period > 1 ? '' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                
                {estimatedEndDate && (
                  <div className="bg-zinc-800 p-3 rounded-md border border-zinc-700">
                    <div className="flex items-center text-zinc-400 mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">Ước tính ngày hết hạn:</span>
                    </div>
                    <p className="font-medium text-green-400">{formatDate(estimatedEndDate)}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Lưu ý: Đây là ngày ước tính dựa trên ngày hiện tại, ngày chính xác sẽ tùy thuộc vào ngày hết hạn hiện tại của từng đăng ký.
                    </p>
                  </div>
                )}
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
              if (action === 'renew') {
                onConfirm(undefined, renewalPeriods);
              } else if (action === 'change-status') {
                onConfirm(status);
              } else {
                onConfirm();
              }
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
