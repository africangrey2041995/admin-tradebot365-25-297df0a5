
import { useState, useCallback, useEffect } from 'react';
import { CoinstratSignal } from '@/types';
import { useSafeLoading } from '@/hooks/useSafeLoading';

// Mock data for testing
const mockLogs: CoinstratSignal[] = [
  {
    id: 'cs-signal-1',
    originalSignalId: 'tv-signal-1',
    action: 'ENTER_LONG',
    instrument: 'BTCUSDT',
    timestamp: new Date().toISOString(),
    signalToken: 'token123',
    maxLag: '3600',
    investmentType: 'contract',
    amount: '1',
    status: 'Processed',
    processedAccounts: [
      {
        accountId: 'account-1',
        name: 'Main Account',
        timestamp: new Date().toISOString(),
        status: 'success',
        userId: 'user-1'
      }
    ],
    failedAccounts: []
  },
  {
    id: 'cs-signal-2',
    originalSignalId: 'tv-signal-2',
    action: 'EXIT_LONG',
    instrument: 'ETHUSDT',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    signalToken: 'token123',
    maxLag: '3600',
    investmentType: 'contract',
    amount: '0.5',
    status: 'Processed',
    processedAccounts: [
      {
        accountId: 'account-1',
        name: 'Main Account',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'success',
        userId: 'user-1'
      }
    ],
    failedAccounts: []
  },
  {
    id: 'cs-signal-3',
    originalSignalId: 'tv-signal-3',
    action: 'ENTER_SHORT',
    instrument: 'SOLUSDT',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    signalToken: 'token123',
    maxLag: '3600',
    investmentType: 'contract',
    amount: '10',
    status: 'Failed',
    processedAccounts: [],
    failedAccounts: [
      {
        accountId: 'account-1',
        name: 'Main Account',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'failed',
        reason: 'Insufficient balance',
        userId: 'user-1'
      }
    ],
    errorMessage: 'Insufficient balance'
  }
];

interface UseCoinstratLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  initialData?: CoinstratSignal[];
  skipLoadingState?: boolean;
}

export const useCoinstratLogs = ({ 
  botId, 
  userId, 
  refreshTrigger = false,
  initialData,
  skipLoadingState = false
}: UseCoinstratLogsProps) => {
  const [logs, setLogs] = useState<CoinstratSignal[]>(initialData || []);
  const [error, setError] = useState<Error | null>(null);
  
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 10000,
    minLoadingDurationMs: 500,
    debugComponent: 'CoinstratLogs',
    skipLoadingState
  });
  
  const fetchLogs = useCallback(() => {
    console.log(`Fetching Coinstrat logs for bot ${botId} and user ${userId}`);
    startLoading();
    
    // Simulate API call
    setTimeout(() => {
      try {
        // In a real application, this would be an API call
        // For now, we'll just use mock data
        const fetchedLogs = [...mockLogs];
        setLogs(fetchedLogs);
        setError(null);
        stopLoading();
      } catch (err) {
        console.error('Error fetching Coinstrat logs:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch Coinstrat logs'));
        stopLoading();
      }
    }, 1000);
  }, [botId, userId, startLoading, stopLoading]);
  
  // Initial fetch when component mounts
  useEffect(() => {
    if (!initialData) {
      fetchLogs();
    }
  }, [fetchLogs, initialData]);
  
  // Fetch when refreshTrigger changes
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
