
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Trash, Check, X, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface EditableChallengeRulesCardProps {
  rules: string[];
  onUpdate: (updatedRules: string[]) => void;
}

const EditableChallengeRulesCard: React.FC<EditableChallengeRulesCardProps> = ({
  rules,
  onUpdate
}) => {
  const [editedRules, setEditedRules] = useState<string[]>(rules);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newRule, setNewRule] = useState('');
  const [ruleToEditIndex, setRuleToEditIndex] = useState<number | null>(null);
  const [editedRuleText, setEditedRuleText] = useState('');
  const [addRulePopoverOpen, setAddRulePopoverOpen] = useState(false);

  const handleAddRule = () => {
    if (newRule.trim()) {
      const updatedRules = [...editedRules, newRule.trim()];
      setEditedRules(updatedRules);
      setNewRule('');
      setAddRulePopoverOpen(false);
    }
  };

  const handleRemoveRule = (index: number) => {
    const updatedRules = editedRules.filter((_, i) => i !== index);
    setEditedRules(updatedRules);
  };

  const handleEditRule = (index: number) => {
    setRuleToEditIndex(index);
    setEditedRuleText(editedRules[index]);
  };

  const handleSaveEditedRule = () => {
    if (ruleToEditIndex !== null && editedRuleText.trim()) {
      const updatedRules = [...editedRules];
      updatedRules[ruleToEditIndex] = editedRuleText.trim();
      setEditedRules(updatedRules);
      setRuleToEditIndex(null);
      setEditedRuleText('');
    }
  };

  const handleCancelEdit = () => {
    setRuleToEditIndex(null);
    setEditedRuleText('');
  };

  const handleSaveAllChanges = () => {
    onUpdate(editedRules);
    setIsEditMode(false);
    toast.success('Đã cập nhật quy tắc challenge');
  };

  const handleCancelAllChanges = () => {
    setEditedRules(rules);
    setIsEditMode(false);
    setRuleToEditIndex(null);
    setEditedRuleText('');
  };

  return (
    <Card className="border border-neutral-200 dark:border-neutral-800">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center">
          <FileText className="h-4 w-4 mr-2 text-primary" />
          Quy tắc Challenge Coinstrat Pro
        </CardTitle>
        {!isEditMode ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditMode(true)}
            className="h-8"
          >
            <Edit className="h-4 w-4 mr-1" /> Chỉnh sửa
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCancelAllChanges}
              className="h-8"
            >
              <X className="h-4 w-4 mr-1" /> Hủy
            </Button>
            <Button 
              size="sm" 
              onClick={handleSaveAllChanges}
              className="h-8"
            >
              <Check className="h-4 w-4 mr-1" /> Lưu
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {editedRules.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                {idx + 1}
              </div>
              
              {ruleToEditIndex === idx ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={editedRuleText}
                    onChange={(e) => setEditedRuleText(e.target.value)}
                    className="flex-1 p-2 text-sm rounded border border-neutral-200 dark:border-neutral-800 bg-transparent"
                  />
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={handleSaveEditedRule}
                    className="h-8 w-8"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={handleCancelEdit}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ) : (
                <div className="flex-1 flex items-start justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                  {isEditMode && (
                    <div className="flex gap-1 ml-2">
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => handleEditRule(idx)}
                        className="h-6 w-6"
                      >
                        <Edit className="h-3 w-3 text-blue-500" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => handleRemoveRule(idx)}
                        className="h-6 w-6"
                      >
                        <Trash className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        
        {isEditMode && (
          <Popover open={addRulePopoverOpen} onOpenChange={setAddRulePopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-1" /> Thêm quy tắc
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Thêm quy tắc mới</h4>
                <textarea 
                  className="w-full p-2 rounded text-sm bg-gray-800 border border-gray-700 text-white"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  placeholder="Nhập quy tắc mới..."
                  rows={3}
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setAddRulePopoverOpen(false)}
                  >
                    <X className="h-3 w-3 mr-1" /> Hủy
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleAddRule}
                  >
                    <Check className="h-3 w-3 mr-1" /> Thêm
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </CardContent>
    </Card>
  );
};

export default EditableChallengeRulesCard;
