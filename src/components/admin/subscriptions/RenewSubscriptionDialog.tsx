
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
import { UserSubscription } from '@/types/subscription';
import { format, addMonths, addDays, addYears } from 'date-fns';
import { vi } from 'date-fns/locale';

interface RenewSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: UserSubscription | null;
  onConfirm: (renewalPeriods: number) => void;
  isRenewing: boolean;
}

export const RenewSubscriptionDialog: React.FC<RenewSubscriptionDialogProps> = ({
  open,
  onOpenChange,
  subscription,
  onConfirm,
  isRenewing,
}) => {
  const [renewalPeriods, setRenewalPeriods] = useState<number>(1);
  const [newEndDate, setNewEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (subscription) {
      calculateNewEndDate(1);
    }
  }, [subscription]);

  if (!subscription) return null;

  const calculateNewEndDate = (periods: number) => {
    // Tính ngày kết thúc mới dựa trên chu kỳ hiện tại và số kỳ gia hạn
    const currentEndDate = new Date(subscription.endDate);
    let newDate: Date;

    switch (subscription.currentPeriod) {
      case 'monthly':
        newDate = addMonths(currentEndDate, periods);
        break;
      case 'quarterly':
        newDate = addMonths(currentEndDate, periods * 3);
        break;
      case 'yearly':
        newDate = addYears(currentEndDate, periods);
        break;
      default:
        newDate = addDays(currentEndDate, 30 * periods);
    }

    setNewEndDate(newDate);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const periods = parseInt(e.target.value);
    setRenewalPeriods(periods);
    calculateNewEndDate(periods);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'dd/MM/yyyy', { locale: vi });
  };

  const getPeriodLabel = () => {
    switch (subscription.currentPeriod) {
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
          <AlertDialogTitle>Xác nhận gia hạn đăng ký</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Bạn có chắc chắn muốn gia hạn đăng ký {subscription.id} của người dùng {subscription.userId}? 
            Hành động này sẽ gia hạn gói dịch vụ hiện tại cho người dùng theo chu kỳ {
              subscription.currentPeriod === 'monthly' ? 'hàng tháng' :
              subscription.currentPeriod === 'quarterly' ? 'hàng quý' : 'hàng năm'
            }.
          </AlertDialogDescription>
          
          <div className="mt-4 space-y-4">
            <div className="grid gap-2">
              <label htmlFor="renewal-periods" className="text-sm font-medium text-white">
                Số kỳ gia hạn:
              </label>
              <select 
                id="renewal-periods" 
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
            
            <div className="bg-zinc-800 p-3 rounded-md border border-zinc-700">
              <div className="flex items-center text-zinc-400 mb-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Thông tin gia hạn:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-zinc-400">Ngày kết thúc hiện tại:</p>
                  <p className="font-medium">{format(new Date(subscription.endDate), 'dd/MM/yyyy', { locale: vi })}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Ngày kết thúc mới:</p>
                  <p className="font-medium text-green-400">{newEndDate ? formatDate(newEndDate) : '--/--/----'}</p>
                </div>
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            Đóng
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm(renewalPeriods);
            }}
            disabled={isRenewing}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {isRenewing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang gia hạn...
              </>
            ) : (
              'Xác nhận gia hạn'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RenewSubscriptionDialog;
