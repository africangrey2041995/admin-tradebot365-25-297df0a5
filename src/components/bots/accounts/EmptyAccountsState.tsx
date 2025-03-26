
import React from 'react';
import { RefreshCw, Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const getTitleByBotType = () => {
    switch (botType) {
      case 'premium':
        return 'Chưa có tài khoản Premium Bot nào';
      case 'prop':
        return 'Chưa có tài khoản Prop Bot nào';
      default:
        return 'Chưa có tài khoản nào được kết nối';
    }
  };

  const getDescriptionByBotType = () => {
    switch (botType) {
      case 'premium':
        return 'Bạn chưa kết nối tài khoản nào với Premium Bot này';
      case 'prop':
        return 'Bạn chưa kết nối tài khoản nào với Prop Bot này';
      default:
        return 'Bạn chưa kết nối tài khoản nào với bot này';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-100 text-orange-600 mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-medium mb-2">{getTitleByBotType()}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {getDescriptionByBotType()}
      </p>
      <div className="flex gap-3">
        {onAddAccount && (
          <Button onClick={onAddAccount}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm tài khoản
          </Button>
        )}
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Làm mới
        </Button>
      </div>
    </div>
  );
};

export default EmptyAccountsState;
