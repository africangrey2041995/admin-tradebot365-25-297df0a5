
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
import { Loader2, Unlock } from 'lucide-react';
import { toast } from 'sonner';

interface UnlockAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
    email: string;
    status: string;
  };
  onStatusChange?: (status: 'active' | 'inactive' | 'suspended') => void;
}

export function UnlockAccountDialog({ open, onOpenChange, user, onStatusChange }: UnlockAccountDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUnlockAccount = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, make API call to unlock the account
      // await fetch(`/api/users/${user.id}/unlock`, {
      //   method: 'POST',
      // });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (onStatusChange) {
        onStatusChange('active');
      }
      
      toast.success(`Tài khoản người dùng ${user.name} đã được mở khóa thành công`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi mở khóa tài khoản người dùng');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Unlock className="h-5 w-5 text-green-500" />
            Mở khóa tài khoản người dùng
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Bạn có chắc chắn muốn mở khóa tài khoản của <span className="font-semibold text-white">{user.name}</span>?
            <br />
            Người dùng sẽ có thể đăng nhập và sử dụng dịch vụ sau khi tài khoản được mở khóa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleUnlockAccount();
            }}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              'Xác nhận mở khóa tài khoản'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
