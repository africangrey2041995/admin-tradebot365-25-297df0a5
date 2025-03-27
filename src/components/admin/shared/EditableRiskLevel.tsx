
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Check, X, AlertTriangle } from 'lucide-react';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BotRiskLevel } from '@/constants/botTypes';
import { toast } from 'sonner';

interface EditableRiskLevelProps {
  risk: string;
  onUpdate: (newRisk: BotRiskLevel) => void;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const EditableRiskLevel: React.FC<EditableRiskLevelProps> = ({ 
  risk, 
  onUpdate,
  showIcon = true,
  size = 'md',
  className
}) => {
  const [editedRisk, setEditedRisk] = useState(risk as BotRiskLevel);
  const [riskPopoverOpen, setRiskPopoverOpen] = useState(false);

  const handleSaveRisk = () => {
    onUpdate(editedRisk as BotRiskLevel);
    setRiskPopoverOpen(false);
    toast.success("Đã cập nhật mức độ rủi ro");
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case BotRiskLevel.LOW: 
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case BotRiskLevel.MEDIUM: 
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case BotRiskLevel.HIGH: 
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: 
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk.toLowerCase()) {
      case BotRiskLevel.LOW: return 'Thấp';
      case BotRiskLevel.MEDIUM: return 'Trung bình';
      case BotRiskLevel.HIGH: return 'Cao';
      default: return risk;
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'sm': return 'h-5 w-5';
      case 'lg': return 'h-7 w-7';
      default: return 'h-6 w-6';
    }
  };
  
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-2.5 w-2.5';
      case 'lg': return 'h-3.5 w-3.5';
      default: return 'h-3 w-3';
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Badge className={getRiskColor(editedRisk)}>
        {showIcon && <AlertTriangle className={`${getIconSize()} mr-1`} />}
        Rủi ro: {getRiskLabel(editedRisk)}
      </Badge>
      <Popover open={riskPopoverOpen} onOpenChange={setRiskPopoverOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`${getButtonSize()} ml-1 text-gray-400 hover:text-white p-0`}
          >
            <Edit className={getIconSize()} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Mức độ rủi ro</h4>
            <Select value={editedRisk} onValueChange={(value) => setEditedRisk(value as BotRiskLevel)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn mức độ rủi ro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={BotRiskLevel.LOW}>Thấp</SelectItem>
                <SelectItem value={BotRiskLevel.MEDIUM}>Trung bình</SelectItem>
                <SelectItem value={BotRiskLevel.HIGH}>Cao</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setRiskPopoverOpen(false)}
              >
                <X className="h-3 w-3 mr-1" /> Hủy
              </Button>
              <Button 
                size="sm" 
                onClick={handleSaveRisk}
              >
                <Check className="h-3 w-3 mr-1" /> Lưu
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditableRiskLevel;
