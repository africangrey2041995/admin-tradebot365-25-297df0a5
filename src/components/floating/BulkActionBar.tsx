
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, WifiOff, X } from 'lucide-react';

export interface BulkActionBarProps {
  selectedCount: number;
  onClose: () => void;
  onConnectAll: () => void;
  onDisconnectAll: () => void;
  isProcessing?: boolean;
}

const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  onClose,
  onConnectAll,
  onDisconnectAll,
  isProcessing = false
}) => {
  if (selectedCount === 0) return null;
  
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-4 w-auto min-w-[360px]">
      <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
        {selectedCount} API {selectedCount === 1 ? 'key' : 'keys'} đã chọn
      </Badge>
      
      <div className="flex-1 flex items-center gap-2 justify-end">
        <Button 
          size="sm" 
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={onConnectAll}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          Kết nối tất cả
        </Button>
        
        <Button 
          size="sm" 
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={onDisconnectAll}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <WifiOff className="h-4 w-4 mr-1" />
          )}
          Ngắt kết nối tất cả
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-white hover:bg-slate-700"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BulkActionBar;
