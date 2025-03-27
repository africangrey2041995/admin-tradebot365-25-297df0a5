import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  ArrowLeftRight, 
  Briefcase, 
  Edit, 
  Check, 
  X 
} from 'lucide-react';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { PropBot } from '@/types/bot';

export interface BotMetadataProps {
  createdDate: string;
  lastUpdated: string;
  exchange?: string;
  propFirm?: string;
  onUpdate: (updatedData: Partial<PropBot>) => void;
}

const BotMetadata: React.FC<BotMetadataProps> = ({ 
  createdDate, 
  lastUpdated, 
  exchange, 
  propFirm, 
  onUpdate 
}) => {
  const [editedPropFirm, setEditedPropFirm] = useState(propFirm || '');
  const [editedExchange, setEditedExchange] = useState(exchange || '');
  const [propFirmPopoverOpen, setPropFirmPopoverOpen] = useState(false);
  const [exchangePopoverOpen, setExchangePopoverOpen] = useState(false);

  const handleSavePropFirm = () => {
    if (!editedPropFirm) return; // Prevent empty values
    onUpdate({ propFirm: editedPropFirm });
    setPropFirmPopoverOpen(false);
    toast.success("Đã cập nhật Prop Firm");
  };

  const handleSaveExchange = () => {
    if (!editedExchange) return; // Prevent empty values
    onUpdate({ exchange: editedExchange });
    setExchangePopoverOpen(false);
    toast.success("Đã cập nhật sàn giao dịch");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="group relative">
        <p className="text-xs text-gray-400 mb-1 flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          Ngày tạo
        </p>
        <p className="text-sm text-white">{createdDate}</p>
      </div>
      <div className="group relative">
        <p className="text-xs text-gray-400 mb-1 flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          Cập nhật
        </p>
        <p className="text-sm text-white">{lastUpdated}</p>
      </div>
      
      <div className="group relative">
        <p className="text-xs text-gray-400 mb-1 flex items-center">
          <ArrowLeftRight className="w-3 h-3 mr-1" />
          Sàn giao dịch
        </p>
        <div className="flex items-center">
          <p className="text-sm text-white font-medium">{editedExchange || 'Không xác định'}</p>
          <Popover open={exchangePopoverOpen} onOpenChange={setExchangePopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Sàn giao dịch</h4>
                <Select value={editedExchange} onValueChange={setEditedExchange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn sàn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Binance">Binance</SelectItem>
                    <SelectItem value="Bybit">Bybit</SelectItem>
                    <SelectItem value="KuCoin">KuCoin</SelectItem>
                    <SelectItem value="OKX">OKX</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setExchangePopoverOpen(false)}
                  >
                    <X className="h-3 w-3 mr-1" /> Hủy
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSaveExchange}
                  >
                    <Check className="h-3 w-3 mr-1" /> Lưu
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="group relative">
        <p className="text-xs text-gray-400 mb-1 flex items-center">
          <Briefcase className="w-3 h-3 mr-1" />
          Prop Firm
        </p>
        <div className="flex items-center">
          <p className="text-sm text-white font-medium">{editedPropFirm || 'Không xác định'}</p>
          <Popover open={propFirmPopoverOpen} onOpenChange={setPropFirmPopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Prop Firm</h4>
                <Select value={editedPropFirm} onValueChange={setEditedPropFirm}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn Prop Firm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FTMO">FTMO</SelectItem>
                    <SelectItem value="Coinstrat Pro">Coinstrat Pro</SelectItem>
                    <SelectItem value="The 5%ers">The 5%ers</SelectItem>
                    <SelectItem value="Earn2Trade">Earn2Trade</SelectItem>
                    <SelectItem value="TopstepTrader">TopstepTrader</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPropFirmPopoverOpen(false)}
                  >
                    <X className="h-3 w-3 mr-1" /> Hủy
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSavePropFirm}
                  >
                    <Check className="h-3 w-3 mr-1" /> Lưu
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default BotMetadata;
