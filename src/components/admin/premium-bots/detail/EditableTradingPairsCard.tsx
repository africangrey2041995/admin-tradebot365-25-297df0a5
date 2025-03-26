
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Save, X, Trash, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface EditableTradingPairsCardProps {
  tradingPairs: string[];
  onUpdate: (tradingPairs: string[]) => void;
}

const EditableTradingPairsCard: React.FC<EditableTradingPairsCardProps> = ({ 
  tradingPairs = [], // Set default empty array to avoid "not iterable" error
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPairs, setEditedPairs] = useState<string[]>([...(Array.isArray(tradingPairs) ? tradingPairs : [])]);
  const [newPair, setNewPair] = useState('');

  const handleStartEditing = () => {
    setEditedPairs([...(Array.isArray(tradingPairs) ? tradingPairs : [])]);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setNewPair('');
  };

  const handleSaveChanges = () => {
    // Filter out any empty pairs
    const filteredPairs = editedPairs.filter(pair => pair.trim() !== '');
    
    // Update parent component
    onUpdate(filteredPairs);
    
    // Exit edit mode
    setIsEditing(false);
    setNewPair('');
    
    toast.success('Đã cập nhật cặp giao dịch');
  };

  const handleAddPair = () => {
    if (newPair.trim() === '') return;
    
    setEditedPairs([...editedPairs, newPair.toUpperCase()]);
    setNewPair('');
  };

  const handleRemovePair = (index: number) => {
    const updatedPairs = [...editedPairs];
    updatedPairs.splice(index, 1);
    setEditedPairs(updatedPairs);
  };

  // Ensure we're working with an array of trading pairs
  const safeTradingPairs = Array.isArray(tradingPairs) ? tradingPairs : [];

  return (
    <Card className="border border-neutral-200 dark:border-neutral-800">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-yellow-600 dark:text-yellow-400" />
          Cặp Giao Dịch
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
          <div className="flex flex-wrap gap-2">
            {safeTradingPairs.length > 0 ? (
              safeTradingPairs.map((pair, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
                  {pair}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Chưa có cặp giao dịch nào.</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {editedPairs.map((pair, index) => (
                <div key={index} className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-0.5 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                  <span className="text-xs font-medium">{pair}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemovePair(index)}
                    className="h-4 w-4 p-0 text-blue-700 hover:text-red-600 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 pt-2">
              <Input 
                value={newPair}
                onChange={(e) => setNewPair(e.target.value)}
                placeholder="BTC/USDT, ETH/USDT, etc."
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={handleAddPair}
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

export default EditableTradingPairsCard;
