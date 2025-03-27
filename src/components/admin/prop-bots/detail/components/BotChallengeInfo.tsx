
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, Calendar, Edit, Check, X } from 'lucide-react';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from '@/components/ui/popover';
import { toast } from 'sonner';
import { PropBot } from '@/types/bot';

interface BotChallengeInfoProps {
  minCapital?: string;
  challengeDuration?: string;
  onUpdate: (updatedData: Partial<PropBot>) => void;
}

const BotChallengeInfo: React.FC<BotChallengeInfoProps> = ({
  minCapital,
  challengeDuration,
  onUpdate
}) => {
  const [editedMinCapital, setEditedMinCapital] = useState(minCapital || '');
  const [editedChallengeDuration, setEditedChallengeDuration] = useState(challengeDuration || '');
  
  const [minCapitalPopoverOpen, setMinCapitalPopoverOpen] = useState(false);
  const [challengeDurationPopoverOpen, setChallengeDurationPopoverOpen] = useState(false);

  const handleSaveMinCapital = () => {
    onUpdate({ minCapital: editedMinCapital });
    setMinCapitalPopoverOpen(false);
    toast.success("Đã cập nhật vốn tối thiểu");
  };

  const handleSaveChallengeDuration = () => {
    onUpdate({ challengeDuration: editedChallengeDuration });
    setChallengeDurationPopoverOpen(false);
    toast.success("Đã cập nhật thời gian thử thách");
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {minCapital && (
        <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
          <p className="text-xs text-gray-400 mb-1 flex items-center">
            <DollarSign className="w-3 h-3 mr-1" />
            Vốn tối thiểu
          </p>
          <div className="flex items-center">
            <p className="text-sm font-medium text-white">{editedMinCapital}</p>
            <Popover open={minCapitalPopoverOpen} onOpenChange={setMinCapitalPopoverOpen}>
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
                  <h4 className="font-medium text-sm">Vốn tối thiểu</h4>
                  <Input 
                    value={editedMinCapital}
                    onChange={(e) => setEditedMinCapital(e.target.value)}
                    placeholder="Ví dụ: $5,000"
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setMinCapitalPopoverOpen(false)}
                    >
                      <X className="h-3 w-3 mr-1" /> Hủy
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSaveMinCapital}
                    >
                      <Check className="h-3 w-3 mr-1" /> Lưu
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
      
      {challengeDuration && (
        <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
          <p className="text-xs text-gray-400 mb-1 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            Thời gian thử thách
          </p>
          <div className="flex items-center">
            <p className="text-sm font-medium text-white">{editedChallengeDuration}</p>
            <Popover open={challengeDurationPopoverOpen} onOpenChange={setChallengeDurationPopoverOpen}>
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
                  <h4 className="font-medium text-sm">Thời gian thử thách</h4>
                  <Input 
                    value={editedChallengeDuration}
                    onChange={(e) => setEditedChallengeDuration(e.target.value)}
                    placeholder="Ví dụ: 30 ngày"
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setChallengeDurationPopoverOpen(false)}
                    >
                      <X className="h-3 w-3 mr-1" /> Hủy
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSaveChallengeDuration}
                    >
                      <Check className="h-3 w-3 mr-1" /> Lưu
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotChallengeInfo;
