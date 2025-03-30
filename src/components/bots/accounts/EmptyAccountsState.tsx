
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, PlusCircle, DatabaseIcon } from 'lucide-react';

interface EmptyAccountsStateProps {
  onRefresh: () => void;
  onAddAccount?: () => void;
  botType?: 'premium' | 'prop' | 'user';
}

const EmptyAccountsState: React.FC<EmptyAccountsStateProps> = ({ 
  onRefresh, 
  onAddAccount,
  botType = 'user'
}) => {
  const getBotTypeLabel = () => {
    switch (botType) {
      case 'premium':
        return 'Premium Bot';
      case 'prop':
        return 'Prop Trading Bot';
      case 'user':
        return 'Bot';
      default:
        return 'Bot';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
      <DatabaseIcon className="h-12 w-12 text-slate-400 dark:text-slate-600 mb-4" />
      <h3 className="text-lg font-medium mb-2">Chưa có tài khoản nào</h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
        Bạn chưa kết nối tài khoản nào với {getBotTypeLabel()} này. 
        Hãy thêm tài khoản để bắt đầu sử dụng Bot.
      </p>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={onRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Làm mới
        </Button>
        
        {onAddAccount && (
          <Button 
            onClick={onAddAccount}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Thêm tài khoản
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyAccountsState;
