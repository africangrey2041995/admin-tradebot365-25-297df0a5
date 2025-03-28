
import React from 'react';
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
import { UserSubscription } from '@/types/subscription';

interface RenewSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: UserSubscription | null;
  onConfirm: () => void;
  isRenewing: boolean;
}

export const RenewSubscriptionDialog: React.FC<RenewSubscriptionDialogProps> = ({
  open,
  onOpenChange,
  subscription,
  onConfirm,
  isRenewing,
}) => {
  if (!subscription) return null;

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
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            Đóng
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
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
