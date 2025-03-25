
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart2, Pencil, Save, X, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface BotPerformanceCardProps {
  performance: {
    lastMonth: string;
    allTime: string;
  };
  onUpdate: (performance: { lastMonth: string; allTime: string }) => void;
  colorScheme?: 'blue' | 'green' | 'purple' | 'red' | 'default';
}

const BotPerformanceCard: React.FC<BotPerformanceCardProps> = ({
  performance,
  onUpdate,
  colorScheme = 'default'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerformance, setEditedPerformance] = useState({
    lastMonth: performance.lastMonth,
    allTime: performance.allTime
  });

  const colorSchemeClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      border: 'border-blue-200 dark:border-blue-800/30'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/10',
      border: 'border-green-200 dark:border-green-800/30'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/10',
      border: 'border-purple-200 dark:border-purple-800/30'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/10',
      border: 'border-red-200 dark:border-red-800/30'
    },
    default: {
      bg: 'bg-slate-50 dark:bg-slate-900/10',
      border: 'border-slate-200 dark:border-slate-800/30'
    }
  };
  
  const colors = colorSchemeClasses[colorScheme];

  const handleStartEditing = () => {
    setEditedPerformance({
      lastMonth: performance.lastMonth,
      allTime: performance.allTime
    });
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    // Update parent component
    onUpdate(editedPerformance);
    
    // Exit edit mode
    setIsEditing(false);
    
    toast.success('Đã cập nhật dữ liệu hiệu suất');
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center">
          <BarChart2 className="h-4 w-4 mr-2 text-blue-500" />
          Hiệu suất
        </CardTitle>
        {!isEditing ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleStartEditing}
            className="h-8"
          >
            <Pencil className="h-4 w-4 mr-1" />
            Chỉnh sửa
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCancelEditing}
              className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <X className="h-4 w-4 mr-1" />
              Hủy
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSaveChanges}
              className="h-8 text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20"
            >
              <Save className="h-4 w-4 mr-1" />
              Lưu
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {!isEditing ? (
            <>
              <div className={`p-4 rounded-md ${colors.bg} ${colors.border} border`}>
                <div className="text-sm text-slate-600 dark:text-slate-400">Hiệu suất tháng trước</div>
                <div className="text-2xl font-bold mt-1 flex items-center">
                  {performance.lastMonth}
                  <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                </div>
              </div>
              
              <div className={`p-4 rounded-md ${colors.bg} ${colors.border} border`}>
                <div className="text-sm text-slate-600 dark:text-slate-400">Hiệu suất từ đầu</div>
                <div className="text-2xl font-bold mt-1 flex items-center">
                  {performance.allTime}
                  <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Hiệu suất tháng trước
                </label>
                <Input
                  value={editedPerformance.lastMonth}
                  onChange={(e) => setEditedPerformance({
                    ...editedPerformance,
                    lastMonth: e.target.value
                  })}
                  placeholder="Ví dụ: +18.5%"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Hiệu suất từ đầu
                </label>
                <Input
                  value={editedPerformance.allTime}
                  onChange={(e) => setEditedPerformance({
                    ...editedPerformance,
                    allTime: e.target.value
                  })}
                  placeholder="Ví dụ: +125.4%"
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BotPerformanceCard;
