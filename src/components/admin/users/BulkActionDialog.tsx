
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Package, XCircle, UserX } from 'lucide-react';
import { toast } from "sonner";

type BulkAction = 'activate' | 'deactivate' | 'delete' | 'premium' | 'basic' | null;

interface BulkActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUsersCount: number;
  bulkAction: BulkAction;
  onConfirm: () => void;
}

export function BulkActionDialog({ 
  open, 
  onOpenChange, 
  selectedUsersCount, 
  bulkAction, 
  onConfirm 
}: BulkActionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onConfirm();
      
      // The success toast is now handled in the parent component
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thực hiện hành động hàng loạt!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDialogContent = () => {
    switch (bulkAction) {
      case 'activate':
        return {
          title: "Kích hoạt người dùng",
          description: `Bạn có chắc chắn muốn kích hoạt ${selectedUsersCount} người dùng đã chọn không?`,
          icon: <CheckCircle className="h-12 w-12 text-green-500 mb-2" />,
          confirmLabel: "Kích hoạt",
          confirmClass: "bg-green-600 hover:bg-green-700",
        };
      case 'deactivate':
        return {
          title: "Khóa người dùng",
          description: `Bạn có chắc chắn muốn khóa ${selectedUsersCount} người dùng đã chọn không?`,
          icon: <XCircle className="h-12 w-12 text-amber-500 mb-2" />,
          confirmLabel: "Khóa tài khoản",
          confirmClass: "bg-amber-600 hover:bg-amber-700",
        };
      case 'delete':
        return {
          title: "Xóa người dùng",
          description: `Bạn có chắc chắn muốn xóa ${selectedUsersCount} người dùng đã chọn không? Hành động này không thể hoàn tác.`,
          icon: <UserX className="h-12 w-12 text-red-500 mb-2" />,
          confirmLabel: "Xóa",
          confirmClass: "bg-red-600 hover:bg-red-700",
        };
      case 'premium':
        return {
          title: "Nâng cấp lên Premium",
          description: `Bạn có chắc chắn muốn nâng cấp ${selectedUsersCount} người dùng đã chọn lên gói Premium không?`,
          icon: <Package className="h-12 w-12 text-amber-500 mb-2" />,
          confirmLabel: "Nâng cấp",
          confirmClass: "bg-amber-600 hover:bg-amber-700",
        };
      case 'basic':
        return {
          title: "Chuyển sang gói Basic",
          description: `Bạn có chắc chắn muốn chuyển ${selectedUsersCount} người dùng đã chọn sang gói Basic không?`,
          icon: <Package className="h-12 w-12 text-blue-500 mb-2" />,
          confirmLabel: "Chuyển đổi",
          confirmClass: "bg-blue-600 hover:bg-blue-700",
        };
      default:
        return {
          title: "Xác nhận hành động",
          description: "Xác nhận thực hiện hành động với các người dùng đã chọn?",
          icon: <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />,
          confirmLabel: "Xác nhận",
          confirmClass: "bg-zinc-600 hover:bg-zinc-700",
        };
    }
  };

  const content = getDialogContent();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader className="flex flex-col items-center text-center">
          {content.icon}
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex space-x-2 sm:space-x-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-zinc-700 text-white"
          >
            Hủy
          </Button>
          <Button 
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={content.confirmClass}
          >
            {isLoading ? 'Đang xử lý...' : content.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
