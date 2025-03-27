
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle2, Loader2, Lock } from 'lucide-react';
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

interface UserStatusToggleProps {
  userId: string;
  initialStatus: 'active' | 'inactive' | 'suspended';
  onStatusChange?: (status: 'active' | 'inactive' | 'suspended') => void;
}

export function UserStatusToggle({ userId, initialStatus, onStatusChange }: UserStatusToggleProps) {
  const [status, setStatus] = React.useState<'active' | 'inactive' | 'suspended'>(initialStatus);
  const [isLoading, setIsLoading] = React.useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [pendingStatus, setPendingStatus] = React.useState<'active' | 'inactive' | 'suspended' | null>(null);

  const handleToggleClick = (newStatus: 'active' | 'inactive' | 'suspended') => {
    // Don't allow toggling if user is suspended
    if (status === 'suspended') {
      toast.error('Tài khoản đã bị khóa. Vui lòng mở khóa tài khoản trước khi thay đổi trạng thái.');
      return;
    }
    
    setPendingStatus(newStatus);
    setConfirmDialogOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatus) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, make API call to update user status
      // await fetch(`/api/users/${userId}/status`, {
      //   method: 'PUT',
      //   body: JSON.stringify({ status: pendingStatus }),
      // });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStatus(pendingStatus);
      if (onStatusChange) {
        onStatusChange(pendingStatus);
      }
      
      toast.success(`Trạng thái người dùng đã được thay đổi thành ${pendingStatus === 'active' ? 'Hoạt động' : 'Không hoạt động'}`);
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi cập nhật trạng thái người dùng');
      console.error(error);
    } finally {
      setIsLoading(false);
      setConfirmDialogOpen(false);
      setPendingStatus(null);
    }
  };

  // Update local state when initialStatus changes (e.g., when account is locked)
  React.useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const isActive = status === 'active';
  const isSuspended = status === 'suspended';

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-sm font-medium">Trạng thái tài khoản</div>
          <div className="text-xs text-muted-foreground">
            {isSuspended ? (
              <span className="text-red-500">Tài khoản đã bị khóa</span>
            ) : isActive ? (
              'Tài khoản đang hoạt động'
            ) : (
              'Tài khoản bị vô hiệu hóa'
            )}
          </div>
        </div>
        <Switch
          checked={isActive}
          disabled={isLoading || isSuspended}
          onCheckedChange={(checked) => handleToggleClick(checked ? 'active' : 'inactive')}
        />
      </div>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {pendingStatus === 'active' ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Kích hoạt tài khoản người dùng
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Vô hiệu hóa tài khoản người dùng
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              {pendingStatus === 'active'
                ? 'Bạn có chắc chắn muốn kích hoạt tài khoản này? Người dùng sẽ có thể đăng nhập và sử dụng tất cả các tính năng được cấp phép.'
                : 'Bạn có chắc chắn muốn vô hiệu hóa tài khoản này? Người dùng sẽ không thể đăng nhập hoặc sử dụng dịch vụ cho đến khi được kích hoạt lại.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
              onClick={() => setPendingStatus(null)}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmStatusChange();
              }}
              className={pendingStatus === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : pendingStatus === 'active' ? (
                'Xác nhận kích hoạt'
              ) : (
                'Xác nhận vô hiệu hóa'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
