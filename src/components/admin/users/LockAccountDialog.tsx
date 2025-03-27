
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
import { Loader2, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface LockAccountDialogProps {
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

export function LockAccountDialog({ open, onOpenChange, user, onStatusChange }: LockAccountDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const isActive = user.status === 'active';

  const handleLockAccount = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, make API call to lock the account
      // await fetch(`/api/users/${user.id}/lock`, {
      //   method: 'POST',
      // });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (onStatusChange) {
        onStatusChange('suspended');
      }
      
      toast.success(`Tài khoản người dùng ${user.name} đã được khóa thành công`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi khóa tài khoản người dùng');
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
            <Lock className="h-5 w-5 text-red-500" />
            Khóa tài khoản người dùng
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Bạn có chắc chắn muốn khóa tài khoản của <span className="font-semibold text-white">{user.name}</span>?
            <br />
            Người dùng sẽ không thể đăng nhập hoặc sử dụng dịch vụ cho đến khi tài khoản được mở khóa.
            <br /><br />
            <span className="text-red-400">Hành động này có thể ảnh hưởng nghiêm trọng đến trải nghiệm của người dùng và cần được thực hiện một cách thận trọng.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleLockAccount();
            }}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              'Xác nhận khóa tài khoản'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
