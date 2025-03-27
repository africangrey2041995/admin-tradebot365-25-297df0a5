
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
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
    email: string;
  };
  onUserDeleted?: () => void;
}

export function DeleteUserDialog({ open, onOpenChange, user, onUserDeleted }: DeleteUserDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDeleteUser = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, make API call to delete the user
      // await fetch(`/api/users/${user.id}`, {
      //   method: 'DELETE',
      // });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (onUserDeleted) {
        onUserDeleted();
      }
      
      toast.success(`Người dùng ${user.name} đã được xóa thành công`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi xóa người dùng');
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
            <Trash2 className="h-5 w-5 text-red-500" />
            Xóa người dùng
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Bạn có chắc chắn muốn xóa người dùng <span className="font-semibold text-white">{user.name}</span>?
            <br />
            Hành động này không thể hoàn tác và tất cả dữ liệu liên quan đến người dùng này sẽ bị xóa vĩnh viễn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDeleteUser();
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
              'Xác nhận xóa'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
