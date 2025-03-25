
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Save, X, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface EditableFeaturesCardProps {
  features: string[];
  onUpdate: (features: string[]) => void;
}

const EditableFeaturesCard: React.FC<EditableFeaturesCardProps> = ({ 
  features, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeatures, setEditedFeatures] = useState<string[]>([...features]);
  const [newFeature, setNewFeature] = useState('');

  const handleStartEditing = () => {
    setEditedFeatures([...features]);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setNewFeature('');
  };

  const handleSaveChanges = () => {
    // Filter out any empty features
    const filteredFeatures = editedFeatures.filter(feature => feature.trim() !== '');
    
    // Update parent component
    onUpdate(filteredFeatures);
    
    // Exit edit mode
    setIsEditing(false);
    setNewFeature('');
    
    toast.success('Đã cập nhật tính năng bot');
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...editedFeatures];
    updatedFeatures[index] = value;
    setEditedFeatures(updatedFeatures);
  };

  const handleAddFeature = () => {
    if (newFeature.trim() === '') return;
    
    setEditedFeatures([...editedFeatures, newFeature]);
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...editedFeatures];
    updatedFeatures.splice(index, 1);
    setEditedFeatures(updatedFeatures);
  };

  return (
    <Card className="border border-neutral-200 dark:border-neutral-800">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center">
          <Plus className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
          Tính năng Bot
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
          <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {editedFeatures.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Nhập tính năng bot"
                  className="flex-1"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveFeature(index)}
                  className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <div className="flex gap-2 pt-2">
              <Input 
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Thêm tính năng mới"
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={handleAddFeature}
                className="h-10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Thêm
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditableFeaturesCard;
