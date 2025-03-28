
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { UserSubscription, SubscriptionStatus } from '@/types/subscription';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DatePicker } from '@/components/ui/date-picker';

interface EditSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: UserSubscription | null;
  onUpdate: (updates: Partial<UserSubscription>) => void;
  isSubmitting: boolean;
}

export const EditSubscriptionDialog: React.FC<EditSubscriptionDialogProps> = ({
  open,
  onOpenChange,
  subscription,
  onUpdate,
  isSubmitting,
}) => {
  const [status, setStatus] = React.useState<SubscriptionStatus>('active');
  const [autoRenew, setAutoRenew] = React.useState(false);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
  
  // Update local state when subscription changes
  React.useEffect(() => {
    if (subscription) {
      setStatus(subscription.status);
      setAutoRenew(subscription.autoRenew);
      setEndDate(subscription.endDate ? new Date(subscription.endDate) : undefined);
    }
  }, [subscription]);

  const handleSubmit = () => {
    const updates: Partial<UserSubscription> = {
      status,
      autoRenew,
    };
    
    if (endDate) {
      updates.endDate = endDate.toISOString();
    }
    
    onUpdate(updates);
  };

  if (!subscription) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa đăng ký</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">ID</Label>
            <div className="col-span-3">
              <code className="bg-zinc-800 px-2 py-1 rounded text-xs">{subscription.id}</code>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Trạng thái</Label>
            <Select 
              value={status} 
              onValueChange={(value) => setStatus(value as SubscriptionStatus)}
            >
              <SelectTrigger className="col-span-3 bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="expired">Đã hết hạn</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">Ngày kết thúc</Label>
            <div className="col-span-3">
              <DatePicker 
                date={endDate} 
                onSelect={setEndDate} 
                className="w-full bg-zinc-800 border-zinc-700" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="autoRenew" className="text-right">Tự động gia hạn</Label>
            <div className="col-span-3 flex items-center">
              <Switch 
                id="autoRenew" 
                checked={autoRenew} 
                onCheckedChange={setAutoRenew} 
              />
              <span className="ml-2 text-sm text-zinc-400">
                {autoRenew ? 'Có' : 'Không'}
              </span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-zinc-700"
          >
            Hủy
          </Button>
          <Button 
            type="button" 
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSubmit}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
