
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

interface CancelSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: UserSubscription | null;
  onConfirm: () => void;
  isCancelling: boolean;
}

export const CancelSubscriptionDialog: React.FC<CancelSubscriptionDialogProps> = ({
  open,
  onOpenChange,
  subscription,
  onConfirm,
  isCancelling,
}) => {
  if (!subscription) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận hủy đăng ký</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Bạn có chắc chắn muốn hủy đăng ký {subscription.id} của người dùng {subscription.userId}? 
            Hành động này sẽ dừng quá trình gia hạn và người dùng sẽ mất quyền truy cập vào dịch vụ sau 
            khi kết thúc thời hạn hiện tại.
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
            disabled={isCancelling}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isCancelling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang hủy...
              </>
            ) : (
              'Xác nhận hủy'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
