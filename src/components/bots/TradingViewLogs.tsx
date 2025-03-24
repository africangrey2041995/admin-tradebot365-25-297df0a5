
import React from 'react';
import { toast } from 'sonner';
import BotEmptyState from './common/BotEmptyState';
import LoadingState from './trading-view-logs/LoadingState';
import ErrorState from './trading-view-logs/ErrorState';
import LogsTable from './trading-view-logs/LogsTable';
import { useTradingViewLogs } from './trading-view-logs/useTradingViewLogs';

interface TradingViewLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  botType?: 'premium' | 'prop' | 'user';
}

const TradingViewLogs: React.FC<TradingViewLogsProps> = ({ 
  botId, 
  userId, 
  refreshTrigger = false,
  botType = 'user'
}) => {
  const { logs, error, loading, fetchLogs } = useTradingViewLogs({
    botId,
    userId,
    refreshTrigger
  });

  const handleRefresh = () => {
    toast.info('Refreshing logs...');
    fetchLogs();
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} />;
  }

  if (logs.length === 0) {
    return (
      <BotEmptyState
        botType={botType}
        dataType="logs"
        onRefresh={handleRefresh}
        title="Không có TradingView logs"
        message="Chưa có log TradingView nào được ghi nhận cho bot này"
      />
    );
  }

  return <LogsTable logs={logs} onRefresh={handleRefresh} />;
};

export default TradingViewLogs;
