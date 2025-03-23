
import React from 'react';
import BotEmptyState from '../common/BotEmptyState';

interface EmptyAccountsStateProps {
  onRefresh?: () => void;
  botType?: 'premium' | 'prop' | 'user';
}

const EmptyAccountsState: React.FC<EmptyAccountsStateProps> = ({ 
  onRefresh,
  botType = 'user'
}) => {
  return (
    <BotEmptyState
      botType={botType}
      dataType="accounts"
      onRefresh={onRefresh}
    />
  );
};

export default EmptyAccountsState;
