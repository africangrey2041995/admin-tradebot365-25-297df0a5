
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTradingViewLogs } from './trading-view-logs/useTradingViewLogs';
import LogsTable from './trading-view-logs/LogsTable';
import LoadingState from './trading-view-logs/LoadingState';
import ErrorState from './trading-view-logs/ErrorState';

interface TradingViewLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  botType?: 'premium' | 'prop' | 'user';
  isLoading?: boolean;
  initialData?: any[];
  signalSourceLabel?: string;
}

const TradingViewLogs: React.FC<TradingViewLogsProps> = ({ 
  botId, 
  userId, 
  refreshTrigger = false,
  botType = 'user',
  isLoading: externalLoading,
  initialData,
  signalSourceLabel = "TradingView ID"
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Pass skipLoadingState to use the external loading state if provided
  const { logs, loading: internalLoading, error, fetchLogs } = useTradingViewLogs({
    botId,
    userId,
    refreshTrigger,
    initialData, // Pass initial data if provided
    skipLoadingState: externalLoading !== undefined
  });

  // Use external loading state if provided, otherwise use internal loading state
  const loading = externalLoading !== undefined ? externalLoading : internalLoading;
  
  const handleRefresh = () => {
    fetchLogs();
  };

  if (loading) {
    return <LoadingState botType={botType} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} />;
  }

  if (logs.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">No TradingView logs found for this bot.</p>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          Refresh Logs
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <LogsTable 
        logs={logs}
        selectedId={selectedId}
        onSelectId={setSelectedId}
        onRefresh={handleRefresh}
        signalSourceLabel={signalSourceLabel}
      />
    </div>
  );
};

export default TradingViewLogs;
