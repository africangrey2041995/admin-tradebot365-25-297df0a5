
import React from 'react';
import BotEmptyState from '../common/BotEmptyState';

interface EmptySignalLogsProps {
  onRefresh?: () => void;
  botType?: 'premium' | 'prop' | 'user';
}

const EmptySignalLogs: React.FC<EmptySignalLogsProps> = ({ 
  onRefresh,
  botType = 'user'
}) => {
  return (
    <BotEmptyState
      botType={botType}
      dataType="logs"
      onRefresh={onRefresh}
    />
  );
};

export default EmptySignalLogs;
