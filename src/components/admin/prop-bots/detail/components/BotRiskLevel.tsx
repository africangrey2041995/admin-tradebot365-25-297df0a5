
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Check, X } from 'lucide-react';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BotRiskLevel as RiskLevelEnum } from '@/constants/botTypes';
import { toast } from 'sonner';
import { PropBot } from '@/types/bot';

interface BotRiskLevelProps {
  risk: string;
  onUpdate: (updatedData: Partial<PropBot>) => void;
}

const BotRiskLevel: React.FC<BotRiskLevelProps> = ({ 
  risk, 
  onUpdate 
}) => {
  const [editedRisk, setEditedRisk] = useState(risk as RiskLevelEnum);
  const [riskPopoverOpen, setRiskPopoverOpen] = useState(false);

  const handleSaveRisk = () => {
    onUpdate({ risk: editedRisk });
    setRiskPopoverOpen(false);
    toast.success("Đã cập nhật mức độ rủi ro");
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-sm text-gray-300">Mức độ rủi ro:</span>
      <Badge variant="outline" className={editedRisk === RiskLevelEnum.LOW ? 'bg-green-500/20 text-green-400' : 
                                        editedRisk === RiskLevelEnum.MEDIUM ? 'bg-amber-500/20 text-amber-400' : 
                                        'bg-red-500/20 text-red-400'}>
        {editedRisk === RiskLevelEnum.LOW ? 'Thấp' : 
         editedRisk === RiskLevelEnum.MEDIUM ? 'Trung bình' : 'Cao'}
      </Badge>
      <Popover open={riskPopoverOpen} onOpenChange={setRiskPopoverOpen}>
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
            <h4 className="font-medium text-sm">Mức độ rủi ro</h4>
            <Select value={editedRisk} onValueChange={(value) => setEditedRisk(value as RiskLevelEnum)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn mức độ rủi ro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={RiskLevelEnum.LOW}>Thấp</SelectItem>
                <SelectItem value={RiskLevelEnum.MEDIUM}>Trung bình</SelectItem>
                <SelectItem value={RiskLevelEnum.HIGH}>Cao</SelectItem>
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

export default BotRiskLevel;
