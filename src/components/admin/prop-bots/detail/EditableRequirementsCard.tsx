
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleAlert, Pencil, Save, X, Trash, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface EditableRequirementsCardProps {
  requirements: string[];
  onUpdate: (requirements: string[]) => void;
}

const EditableRequirementsCard: React.FC<EditableRequirementsCardProps> = ({ 
  requirements, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequirements, setEditedRequirements] = useState<string[]>([...requirements]);
  const [newRequirement, setNewRequirement] = useState('');

  const handleStartEditing = () => {
    setEditedRequirements([...requirements]);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setNewRequirement('');
  };

  const handleSaveChanges = () => {
    // Filter out any empty requirements
    const filteredRequirements = editedRequirements.filter(req => req.trim() !== '');
    
    // Update parent component
    onUpdate(filteredRequirements);
    
    // Exit edit mode
    setIsEditing(false);
    setNewRequirement('');
    
    toast.success('Đã cập nhật yêu cầu của bot');
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...editedRequirements];
    updatedRequirements[index] = value;
    setEditedRequirements(updatedRequirements);
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim() === '') return;
    
    setEditedRequirements([...editedRequirements, newRequirement]);
    setNewRequirement('');
  };

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = [...editedRequirements];
    updatedRequirements.splice(index, 1);
    setEditedRequirements(updatedRequirements);
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center">
          <CircleAlert className="h-4 w-4 mr-2 text-amber-500" />
          Yêu cầu
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
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
            {requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {editedRequirements.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={requirement}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  placeholder="Nhập yêu cầu bot"
                  className="flex-1"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveRequirement(index)}
                  className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <div className="flex gap-2 pt-2">
              <Input 
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Thêm yêu cầu mới"
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={handleAddRequirement}
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

export default EditableRequirementsCard;
