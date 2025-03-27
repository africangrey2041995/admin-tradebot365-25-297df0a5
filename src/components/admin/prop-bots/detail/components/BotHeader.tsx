
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Check, X } from 'lucide-react';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BotStatus, BOT_STATUS_DISPLAY } from '@/constants/botTypes';
import { toast } from 'sonner';
import { PropBot } from '@/types/bot';

export interface BotHeaderProps {
  botId: string;
  propFirm?: string;
  exchange?: string;
  status: BotStatus;
  onUpdate: (updatedData: Partial<PropBot>) => void;
}

const BotHeader: React.FC<BotHeaderProps> = ({ 
  botId, 
  propFirm,
  exchange,
  status, 
  onUpdate 
}) => {
  const [editedStatus, setEditedStatus] = useState(status as BotStatus);
  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);

  const getStatusColorClass = () => {
    switch (editedStatus) {
      case BotStatus.ACTIVE: return 'bg-green-500';
      case BotStatus.INACTIVE: return 'bg-slate-500';
      case BotStatus.MAINTENANCE: return 'bg-blue-500';
      case BotStatus.ERROR: return 'bg-red-500';
      case BotStatus.SUSPENDED: return 'bg-orange-500';
      default: return 'bg-slate-500';
    }
  };

  const handleSaveStatus = () => {
    onUpdate({ status: editedStatus });
    setStatusPopoverOpen(false);
    toast.success("Đã cập nhật trạng thái");
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <h3 className="text-lg font-semibold text-white">{botId}</h3>
      
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${getStatusColorClass()}`}></div>
        <span className="text-sm text-gray-200 ml-1">{BOT_STATUS_DISPLAY[editedStatus as BotStatus]}</span>
        
        <Popover open={statusPopoverOpen} onOpenChange={setStatusPopoverOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 ml-1 text-gray-400 hover:text-white"
            >
              <Edit className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Trạng thái Bot</h4>
              <Select value={editedStatus} onValueChange={(value) => setEditedStatus(value as BotStatus)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BotStatus.ACTIVE}>Đang hoạt động</SelectItem>
                  <SelectItem value={BotStatus.INACTIVE}>Không hoạt động</SelectItem>
                  <SelectItem value={BotStatus.MAINTENANCE}>Bảo trì</SelectItem>
                  <SelectItem value={BotStatus.ERROR}>Lỗi</SelectItem>
                  <SelectItem value={BotStatus.SUSPENDED}>Tạm ngưng</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setStatusPopoverOpen(false)}
                >
                  <X className="h-3 w-3 mr-1" /> Hủy
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSaveStatus}
                >
                  <Check className="h-3 w-3 mr-1" /> Lưu
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default BotHeader;
