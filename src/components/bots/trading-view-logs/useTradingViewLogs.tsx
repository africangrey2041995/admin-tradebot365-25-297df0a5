
import { useState, useCallback, useEffect } from 'react';
import { TradingViewSignal } from '@/types';
import { useSafeLoading } from '@/hooks/useSafeLoading';

// Mock data for testing
const mockLogs: TradingViewSignal[] = [
  {
    id: 'tv-signal-1',
    action: 'ENTER_LONG',
    instrument: 'BTCUSDT',
    timestamp: new Date().toISOString(),
    signalToken: 'token123',
    maxLag: '3600',
    investmentType: 'contract',
    amount: '1',
    status: 'Processed'
  },
  {
    id: 'tv-signal-2',
    action: 'EXIT_LONG',
    instrument: 'ETHUSDT',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    signalToken: 'token123',
    maxLag: '3600',
    investmentType: 'contract',
    amount: '0.5',
    status: 'Processed'
  },
  {
    id: 'tv-signal-3',
    action: 'ENTER_SHORT',
    instrument: 'SOLUSDT',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    signalToken: 'token123',
    maxLag: '3600',
    investmentType: 'contract',
    amount: '10',
    status: 'Failed',
    errorMessage: 'Insufficient balance'
  }
];

interface UseTradingViewLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  initialData?: TradingViewSignal[];
  skipLoadingState?: boolean;
}

export const useTradingViewLogs = ({ 
  botId, 
  userId, 
  refreshTrigger = false,
  initialData,
  skipLoadingState = false
}: UseTradingViewLogsProps) => {
  const [logs, setLogs] = useState<TradingViewSignal[]>(initialData || []);
  const [error, setError] = useState<Error | null>(null);
  
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 10000,
    minLoadingDurationMs: 500,
    debugComponent: 'TradingViewLogs',
    skipLoadingState
  });
  
  const fetchLogs = useCallback(() => {
    console.log(`Fetching TradingView logs for bot ${botId} and user ${userId}`);
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
        console.error('Error fetching TradingView logs:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch TradingView logs'));
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
