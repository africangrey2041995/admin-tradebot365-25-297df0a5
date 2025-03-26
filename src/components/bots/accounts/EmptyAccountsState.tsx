
import React from 'react';
import BotEmptyState from '../common/BotEmptyState';

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
