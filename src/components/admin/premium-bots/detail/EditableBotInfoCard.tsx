
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface EditableBotInfoCardProps {
  type: string;
  exchange: string;
  minCapital: string;
  subscribers: number;
  createdAt: string;
  updatedAt: string;
  onUpdate: (info: { type: string; exchange: string; minCapital: string }) => void;
}

const EditableBotInfoCard: React.FC<EditableBotInfoCardProps> = ({
  type,
  exchange,
  minCapital,
  subscribers,
  createdAt,
  updatedAt,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    type,
    exchange,
    minCapital
  });

  const handleStartEditing = () => {
    setEditedInfo({
      type,
      exchange,
      minCapital
    });
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    onUpdate(editedInfo);
    setIsEditing(false);
  };

  const handleChange = (field: keyof typeof editedInfo, value: string) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="border border-neutral-200 dark:border-neutral-800">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base">Thông tin Bot</CardTitle>
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
      <CardContent className="space-y-4">
        {!isEditing ? (
          <>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Loại Bot</h3>
              <p>{type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sàn giao dịch</h3>
              <p>{exchange}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Vốn tối thiểu</h3>
              <p>{minCapital}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Số người đăng ký</h3>
              <p>{subscribers}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ngày tạo</h3>
              <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cập nhật lần cuối</h3>
              <p>{new Date(updatedAt).toLocaleDateString()}</p>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Loại Bot
              </label>
              <Input
                value={editedInfo.type}
                onChange={(e) => handleChange('type', e.target.value)}
                placeholder="Premium, Momentum, etc."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Sàn giao dịch
              </label>
              <Input
                value={editedInfo.exchange}
                onChange={(e) => handleChange('exchange', e.target.value)}
                placeholder="Binance, KuCoin, etc."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Vốn tối thiểu
              </label>
              <Input
                value={editedInfo.minCapital}
                onChange={(e) => handleChange('minCapital', e.target.value)}
                placeholder="$1000"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Số người đăng ký</h3>
              <p className="mt-1">{subscribers}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ngày tạo</h3>
              <p className="mt-1">{new Date(createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cập nhật lần cuối</h3>
              <p className="mt-1">{new Date(updatedAt).toLocaleDateString()}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EditableBotInfoCard;
