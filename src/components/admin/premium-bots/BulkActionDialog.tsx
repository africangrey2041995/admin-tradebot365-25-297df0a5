
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BulkActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBotsCount: number;
  bulkAction: 'activate' | 'deactivate' | null;
  onConfirm: () => void;
}

export const BulkActionDialog: React.FC<BulkActionDialogProps> = ({
  open,
  onOpenChange,
  selectedBotsCount,
  bulkAction,
  onConfirm
}) => {
  const actionText = bulkAction === 'activate' ? 'kích hoạt' : 'tạm dừng';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>Xác nhận thao tác hàng loạt</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {`Bạn đang thực hiện ${actionText} ${selectedBotsCount} premium bot đã chọn.`}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-zinc-700 text-zinc-400">
            Hủy
          </Button>
          <Button 
            onClick={onConfirm} 
            className={bulkAction === 'activate' ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
