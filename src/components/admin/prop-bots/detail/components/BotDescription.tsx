
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Check, X } from 'lucide-react';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from '@/components/ui/popover';
import { toast } from 'sonner';
import { PropBot } from '@/types/bot';

interface BotDescriptionProps {
  description: string;
  onUpdate: (updatedData: Partial<PropBot>) => void;
}

const BotDescription: React.FC<BotDescriptionProps> = ({ 
  description, 
  onUpdate 
}) => {
  const [editedDescription, setEditedDescription] = useState(description);
  const [descriptionPopoverOpen, setDescriptionPopoverOpen] = useState(false);

  const handleSaveDescription = () => {
    onUpdate({ description: editedDescription });
    setDescriptionPopoverOpen(false);
    toast.success("Đã cập nhật mô tả");
  };

  return (
    <div className="group relative mb-4">
      <p className="text-gray-100">{editedDescription}</p>
      <Popover open={descriptionPopoverOpen} onOpenChange={setDescriptionPopoverOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
          >
            <Edit className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Mô tả Bot</h4>
            <textarea 
              className="w-full p-2 rounded text-sm bg-gray-800 border border-gray-700 text-white"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setDescriptionPopoverOpen(false)}
              >
                <X className="h-3 w-3 mr-1" /> Hủy
              </Button>
              <Button 
                size="sm" 
                onClick={handleSaveDescription}
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

export default BotDescription;
