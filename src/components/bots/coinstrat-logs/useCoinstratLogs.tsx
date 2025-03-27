
import { useState, useEffect, useCallback } from 'react';
import { CoinstratSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

// Create a sample data set
const createMockCoinstratLogs = (): CoinstratSignal[] => {
  return Array(10)
    .fill(null)
    .map((_, index) => ({
      id: `CS-${2000 + index}`,
      originalSignalId: `TV-${1000 + Math.floor(Math.random() * 15)}`,
      action: ['ENTER_LONG', 'EXIT_LONG', 'ENTER_SHORT', 'EXIT_SHORT'][Math.floor(Math.random() * 4)] as any,
      instrument: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'][Math.floor(Math.random() * 4)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      signalToken: `TradingView_Bot_${Math.floor(Math.random() * 5) + 1}`,
      maxLag: (Math.floor(Math.random() * 5) + 1) * 60 + '',
      investmentType: 'contract',
      amount: (Math.random() * 0.5 + 0.01).toFixed(3),
      status: ['Processed', 'Pending', 'Failed', 'Sent'][Math.floor(Math.random() * 4)],
      errorMessage: Math.random() > 0.8 ? 'Account funding insufficient' : undefined,
      botId: `BOT-${1000 + Math.floor(Math.random() * 5)}`,
      userId: `USR-${2000 + Math.floor(Math.random() * 10)}`,
      processedAccounts: Array(Math.floor(Math.random() * 3))
        .fill(null)
        .map((_, i) => ({
          accountId: `ACC-${3000 + i}`,
          name: `Account ${3000 + i}`,
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString(),
          status: Math.random() > 0.2 ? 'success' : 'failed',
          userId: `USR-${2000 + Math.floor(Math.random() * 10)}`,
        })),
      failedAccounts: Array(Math.floor(Math.random() * 2))
        .fill(null)
        .map((_, i) => ({
          accountId: `ACC-${4000 + i}`,
          name: `Account ${4000 + i}`,
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString(),
          reason: 'Insufficient funds or connection timeout',
          status: 'failed',
          userId: `USR-${2000 + Math.floor(Math.random() * 10)}`,
        })),
    }));
};

interface UseCoinstratLogsProps {
  botId?: string;
  userId?: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean;
}

interface UseCoinstratLogsResult {
  logs: CoinstratSignal[];
  loading: boolean;
  error: Error | null;
  fetchLogs: () => void;
}

export const useCoinstratLogs = ({
  botId,
  userId,
  refreshTrigger = false,
  skipLoadingState = false
}: UseCoinstratLogsProps): UseCoinstratLogsResult => {
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Use our safe loading hook
  const { loading, startLoading, stopLoading } = useSafeLoading({
    debugComponent: 'CoinstratLogs',
    skipLoadingState
  });
  
  const fetchLogs = useCallback(() => {
    try {
      startLoading();
      
      // In a real app, we would fetch data from API here
      setTimeout(() => {
        try {
          const allLogs = createMockCoinstratLogs();
          
          // Filter logs based on botId and/or userId
          let filteredLogs = [...allLogs];
          
          if (botId) {
            filteredLogs = filteredLogs.filter(log => log.botId === botId);
          }
          
          if (userId) {
            // For Coinstrat logs, we need to check if userId is in processedAccounts or failedAccounts
            filteredLogs = filteredLogs.filter(log => {
              // Check if userId matches the log's userId
              if (log.userId === userId) return true;
              
              // Check if userId is in processedAccounts
              const inProcessedAccounts = log.processedAccounts.some(account => account.userId === userId);
              if (inProcessedAccounts) return true;
              
              // Check if userId is in failedAccounts
              const inFailedAccounts = log.failedAccounts.some(account => account.userId === userId);
              return inFailedAccounts;
            });
          }
          
          setLogs(filteredLogs);
          setError(null);
          stopLoading();
        } catch (err) {
          console.error('Error processing Coinstrat logs:', err);
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          stopLoading();
        }
      }, 1000);
    } catch (err) {
      console.error('Error fetching Coinstrat logs:', err);
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
