
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Save, X, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface EditableDescriptionCardProps {
  description: string;
  onUpdate: (description: string) => void;
}

const EditableDescriptionCard: React.FC<EditableDescriptionCardProps> = ({ 
  description, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleStartEditing = () => {
    setEditedDescription(description);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    // Update parent component
    onUpdate(editedDescription);
    
    // Exit edit mode
    setIsEditing(false);
    
    toast.success('Đã cập nhật mô tả bot');
  };

  return (
    <Card className="border border-neutral-200 dark:border-neutral-800">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center">
          <FileText className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
          Giới thiệu Bot
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
        {!isEditing ? (
          <div className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
            {description || "Chưa có mô tả cho bot này."}
          </div>
        ) : (
          <Textarea 
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Nhập mô tả chi tiết về bot..."
            className="min-h-[150px] resize-y"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EditableDescriptionCard;
