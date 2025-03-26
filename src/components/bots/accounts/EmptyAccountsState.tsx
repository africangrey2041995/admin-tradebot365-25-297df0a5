
import React from 'react';
import BotEmptyState from '../common/BotEmptyState';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyAccountsStateProps {
  onRefresh?: () => void;
  botType?: 'premium' | 'prop' | 'user';
  onAddAccount?: () => void;
}

const EmptyAccountsState: React.FC<EmptyAccountsStateProps> = ({ 
  onRefresh,
  botType = 'user',
  onAddAccount
}) => {
  return (
    <BotEmptyState
      botType={botType}
      dataType="accounts"
      onRefresh={onRefresh}
      actionLabel={onAddAccount ? "Thêm tài khoản" : undefined}
      onAction={onAddAccount}
    />
  );
};

export default EmptyAccountsState;
