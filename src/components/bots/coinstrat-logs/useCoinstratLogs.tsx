import { useState, useEffect, useCallback } from 'react';
import { CoinstratSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

interface UseCoinstratLogsProps {
  botId?: string;
  userId?: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean;
  initialData?: CoinstratSignal[];
}

interface UseCoinstratLogsResult {
  logs: CoinstratSignal[];
  loading: boolean;
  error: Error | null;
  fetchLogs: () => void;
}

// Create a sample data set
const createMockCoinstratLogs = (): CoinstratSignal[] => {
  // Mock implementation for CoinstratSignal logs
  return Array(10).fill(null).map((_, index) => ({
    id: `CS-${1000 + index}`,
    originalSignalId: `TV-${1000 + Math.floor(Math.random() * 5)}`,
    action: ['ENTER_LONG', 'EXIT_LONG', 'ENTER_SHORT', 'EXIT_SHORT'][Math.floor(Math.random() * 4)] as any,
    instrument: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'][Math.floor(Math.random() * 4)],
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
    amount: (Math.random() * 0.5 + 0.01).toFixed(3),
    status: ['Processed', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
    processingTime: Math.floor(Math.random() * 5000) + '',
    errorMessage: Math.random() > 0.8 ? 'Connection timeout or symbol issues' : undefined,
    processedAccounts: Array(Math.floor(Math.random() * 3)).fill(null).map((_, i) => ({
      accountId: `ACC-${2000 + i}`,
      userId: `USR-${2000 + Math.floor(Math.random() * 10)}`,
      status: 'success',
      errorMessage: '',
      name: `Account ${2000 + i}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
    })),
    failedAccounts: Math.random() > 0.7 ? Array(Math.floor(Math.random() * 2)).fill(null).map((_, i) => ({
      accountId: `ACC-${3000 + i}`,
      userId: `USR-${2000 + Math.floor(Math.random() * 10)}`,
      status: 'failed',
      errorMessage: 'Insufficient balance',
      name: `Account ${3000 + i}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
    })) : [],
    signalToken: `Token-${1000 + index}`,
    maxLag: `${Math.floor(Math.random() * 10) + 1}s`,
    investmentType: 'crypto'
  }));
};

export const useCoinstratLogs = ({
  botId,
  userId,
  refreshTrigger = false,
  skipLoadingState = false,
  initialData
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
          // Use initialData if provided, otherwise create mock data
          const allLogs = initialData || createMockCoinstratLogs();
          
          // Filter logs based on botId and/or userId
          let filteredLogs = [...allLogs];
          
          if (botId) {
            // Filter by botId if provided
            filteredLogs = filteredLogs.filter(log => log.originalSignalId.includes(botId));
          }
          
          if (userId) {
            // Filter by userId across processed and failed accounts
            filteredLogs = filteredLogs.filter(log => {
              const hasUserInProcessed = log.processedAccounts.some(
                account => account.userId === userId
              );
              
              const hasUserInFailed = log.failedAccounts.some(
                account => account.userId === userId
              );
              
              return hasUserInProcessed || hasUserInFailed;
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
  }, [botId, userId, startLoading, stopLoading, initialData]);
  
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
