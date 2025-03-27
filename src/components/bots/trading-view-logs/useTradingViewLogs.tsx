
import { useState, useEffect, useCallback } from 'react';
import { TradingViewSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

// Create a sample data set
const createMockTradeViewLogs = (): TradingViewSignal[] => {
  return Array(15)
    .fill(null)
    .map((_, index) => ({
      id: `TV-${1000 + index}`,
      action: ['ENTER_LONG', 'EXIT_LONG', 'ENTER_SHORT', 'EXIT_SHORT'][Math.floor(Math.random() * 4)] as any,
      instrument: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'][Math.floor(Math.random() * 4)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      signalToken: `TradingView_Bot_${Math.floor(Math.random() * 5) + 1}`,
      maxLag: (Math.floor(Math.random() * 5) + 1) * 60 + '',
      investmentType: 'contract',
      amount: (Math.random() * 0.5 + 0.01).toFixed(3),
      status: ['Processed', 'Pending', 'Failed', 'Sent'][Math.floor(Math.random() * 4)],
      processingTime: Math.floor(Math.random() * 5000) + '',
      errorMessage: Math.random() > 0.8 ? 'Connection timeout or symbol issues' : undefined,
      botId: `BOT-${1000 + Math.floor(Math.random() * 5)}`,
      userId: `USR-${2000 + Math.floor(Math.random() * 10)}`,
    }));
};

interface UseTradingViewLogsProps {
  botId?: string;
  userId?: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean;
}

interface UseTradingViewLogsResult {
  logs: TradingViewSignal[];
  loading: boolean;
  error: Error | null;
  fetchLogs: () => void;
}

export const useTradingViewLogs = ({
  botId,
  userId,
  refreshTrigger = false,
  skipLoadingState = false
}: UseTradingViewLogsProps): UseTradingViewLogsResult => {
  const [logs, setLogs] = useState<TradingViewSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Use our safe loading hook
  const { loading, startLoading, stopLoading } = useSafeLoading({
    debugComponent: 'TradingViewLogs',
    skipLoadingState
  });
  
  const fetchLogs = useCallback(() => {
    try {
      startLoading();
      
      // In a real app, we would fetch data from API here
      setTimeout(() => {
        try {
          const allLogs = createMockTradeViewLogs();
          
          // Filter logs based on botId and/or userId
          let filteredLogs = [...allLogs];
          
          if (botId) {
            filteredLogs = filteredLogs.filter(log => log.botId === botId);
          }
          
          if (userId) {
            filteredLogs = filteredLogs.filter(log => log.userId === userId);
          }
          
          setLogs(filteredLogs);
          setError(null);
          stopLoading();
        } catch (err) {
          console.error('Error processing TradingView logs:', err);
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          stopLoading();
        }
      }, 1000);
    } catch (err) {
      console.error('Error fetching TradingView logs:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      stopLoading();
    }
  }, [botId, userId, startLoading, stopLoading]);
  
  // Fetch logs on mount and when dependencies change
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);
  
  // Handle refresh trigger from parent
  useEffect(() => {
    if (refreshTrigger) {
      fetchLogs();
    }
  }, [refreshTrigger, fetchLogs]);
  
  return {
    logs,
    loading,
    error,
    fetchLogs
  };
};
