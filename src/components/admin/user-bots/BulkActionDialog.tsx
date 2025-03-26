
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
} from "@/components/ui/alert-dialog";
import { Play, Pause, Trash2 } from "lucide-react";

interface BulkActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  action: 'activate' | 'deactivate' | 'delete' | null;
  onConfirm: () => void;
}

export const BulkActionDialog: React.FC<BulkActionDialogProps> = ({
  open,
  onOpenChange,
  selectedCount,
  action,
  onConfirm
}) => {
  // Early return if no action is selected
  if (!action) return null;
  
  const titles = {
    activate: "Kích hoạt hàng loạt",
    deactivate: "Tạm dừng hàng loạt",
    delete: "Xóa hàng loạt"
  };
  
  const descriptions = {
    activate: `Bạn có chắc chắn muốn kích hoạt ${selectedCount} User Bot đã chọn không?`,
    deactivate: `Bạn có chắc chắn muốn tạm dừng ${selectedCount} User Bot đã chọn không?`,
    delete: `Bạn có chắc chắn muốn xóa ${selectedCount} User Bot đã chọn không? Hành động này không thể hoàn tác.`
  };
  
  const icons = {
    activate: <Play className="h-5 w-5 text-green-500" />,
    deactivate: <Pause className="h-5 w-5 text-yellow-500" />,
    delete: <Trash2 className="h-5 w-5 text-red-500" />
  };
  
  const buttonLabels = {
    activate: "Kích hoạt",
    deactivate: "Tạm dừng",
    delete: "Xóa"
  };
  
  const buttonColors = {
    activate: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    deactivate: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
    delete: "bg-red-600 hover:bg-red-700 focus:ring-red-500"
  };
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {icons[action]}
            <span>{titles[action]}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            {descriptions[action]}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction 
            className={`text-white ${buttonColors[action]}`}
            onClick={onConfirm}
          >
            {buttonLabels[action]}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
