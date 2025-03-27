
import React, { useState } from 'react';
import { DollarSign, ChartBar, Calendar, TrendingUp, Edit2, Save, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PropBot } from '@/types/bot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface BotChallengeInfoProps {
  minCapital?: string;
  potentialProfit?: string;
  maxDrawdown?: string;
  challengeDuration?: string;
  onUpdate?: (updatedData: Partial<PropBot>) => void;
  isAdmin?: boolean;
}

const BotChallengeInfo: React.FC<BotChallengeInfoProps> = ({
  minCapital,
  potentialProfit,
  maxDrawdown,
  challengeDuration,
  onUpdate = () => {},
  isAdmin = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    minCapital: minCapital || '',
    potentialProfit: potentialProfit || '',
    maxDrawdown: maxDrawdown || '',
    challengeDuration: challengeDuration || ''
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Discard changes
      setEditValues({
        minCapital: minCapital || '',
        potentialProfit: potentialProfit || '',
        maxDrawdown: maxDrawdown || '',
        challengeDuration: challengeDuration || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onUpdate({
      minCapital: editValues.minCapital,
      potentialProfit: editValues.potentialProfit,
      maxDrawdown: editValues.maxDrawdown,
      challengeDuration: editValues.challengeDuration
    });
    setIsEditing(false);
    toast.success("Thông tin thử thách đã được cập nhật");
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Thông tin thử thách</h3>
        {isAdmin && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleEditToggle}
            className="h-8 px-2"
          >
            {isEditing ? (
              <X className="h-4 w-4 text-red-500" />
            ) : (
              <Edit2 className="h-4 w-4 text-blue-500" />
            )}
          </Button>
        )}
      </div>
      <Separator className="mb-3 bg-gray-700" />
      
      <div className="space-y-2">
        {isEditing ? (
          // Editing mode
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400 flex-shrink-0" />
                <div className="flex-grow">
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                    Vốn tối thiểu
                  </label>
                  <Input
                    name="minCapital"
                    value={editValues.minCapital}
                    onChange={handleInputChange}
                    className="h-8 text-sm"
                    placeholder="Ví dụ: $5,000"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div className="flex-grow">
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                    Lợi nhuận dự kiến
                  </label>
                  <Input
                    name="potentialProfit"
                    value={editValues.potentialProfit}
                    onChange={handleInputChange}
                    className="h-8 text-sm"
                    placeholder="Ví dụ: 10%"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ChartBar className="w-4 h-4 text-red-400 flex-shrink-0" />
                <div className="flex-grow">
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                    Drawdown tối đa
                  </label>
                  <Input
                    name="maxDrawdown"
                    value={editValues.maxDrawdown}
                    onChange={handleInputChange}
                    className="h-8 text-sm"
                    placeholder="Ví dụ: 5%"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div className="flex-grow">
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                    Thời gian thử thách
                  </label>
                  <Input
                    name="challengeDuration"
                    value={editValues.challengeDuration}
                    onChange={handleInputChange}
                    className="h-8 text-sm"
                    placeholder="Ví dụ: 30 ngày"
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button 
                  size="sm" 
                  onClick={handleSave}
                  className="h-8"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </>
        ) : (
          // View mode
          <>
            {minCapital && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  Vốn tối thiểu: <span className="font-medium text-gray-900 dark:text-white">{minCapital}</span>
                </span>
              </div>
            )}
            
            {potentialProfit && (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  Lợi nhuận dự kiến: <span className="font-medium text-gray-900 dark:text-white">{potentialProfit}</span>
                </span>
              </div>
            )}
            
            {maxDrawdown && (
              <div className="flex items-center gap-2">
                <ChartBar className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  Drawdown tối đa: <span className="font-medium text-gray-900 dark:text-white">{maxDrawdown}</span>
                </span>
              </div>
            )}
            
            {challengeDuration && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  Thời gian thử thách: <span className="font-medium text-gray-900 dark:text-white">{challengeDuration}</span>
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BotChallengeInfo;
