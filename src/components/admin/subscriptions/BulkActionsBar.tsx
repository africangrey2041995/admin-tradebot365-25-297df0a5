
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle, X, Edit } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onCancel: () => void;
  onRenew: () => void;
  onChangeStatus: () => void;
  onClearSelection: () => void;
  isProcessing: boolean;
}

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  onCancel,
  onRenew,
  onChangeStatus,
  onClearSelection,
  isProcessing,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 w-auto max-w-3xl">
      <div className="bg-zinc-700 px-2 py-1 rounded text-sm">
        {selectedCount} đăng ký đã chọn
      </div>
      
      <div className="flex-1 flex items-center gap-2 justify-end">
        <Button 
          size="sm" 
          variant="outline"
          className="border-zinc-700 bg-zinc-700/50"
          onClick={onChangeStatus}
          disabled={isProcessing}
        >
          <Edit className="h-4 w-4 mr-1" />
          Đổi trạng thái
        </Button>
        
        <Button 
          size="sm" 
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={onRenew}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          Gia hạn
        </Button>
        
        <Button 
          size="sm" 
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={onCancel}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <AlertCircle className="h-4 w-4 mr-1" />
          )}
          Hủy đăng ký
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-white hover:bg-zinc-700"
          onClick={onClearSelection}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;
