
import { useState, useEffect, useCallback } from 'react';
import { TradingViewSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/useSafeLoading';

interface UseTradingViewLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean; // Add ability to skip internal loading state
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
  const { loading, startLoading, stopLoading } = useSafeLoading({ 
    timeoutMs: 10000,
    minLoadingDurationMs: 500,
    skipLoading: skipLoadingState // Skip loading state if requested
  });

  const fetchLogs = useCallback(() => {
    if (!skipLoadingState) {
      startLoading();
    }
    setError(null);

    // Simulated API call with a delay
    setTimeout(() => {
      try {
        // Mock data for development - ensure we conform to TradingViewSignal interface
        // IMPORTANT: IDs need to match with originalSignalId from Coinstrat signals
        const mockLogs: TradingViewSignal[] = [
          {
            id: 'SIG001', // This matches originalSignalId in Coinstrat signals
            timestamp: new Date().toISOString(),
            source: 'TradingView Alert',
            action: 'ENTER_LONG',
            instrument: 'BTCUSDT',
            amount: '50000',
            status: 'Processed',
            signalToken: 'token123',
            maxLag: '5s',
            investmentType: 'crypto'
          },
          {
            id: 'SIG002', // This matches originalSignalId in Coinstrat signals
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            source: 'TradingView Alert',
            action: 'EXIT_LONG',
            instrument: 'ETHUSDT',
            amount: '3000',
            status: 'Processed',
            signalToken: 'token456',
            maxLag: '5s',
            investmentType: 'crypto'
          },
          {
            id: 'SIG003', // This matches originalSignalId in Coinstrat signals
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            source: 'TradingView Alert',
            status: 'Failed',
            errorMessage: 'Could not parse signal format',
            action: 'ENTER_LONG',
            instrument: 'SOLUSDT',
            signalToken: 'token789',
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '3700', // Add consistent amount value
          },
        ];

        setLogs(mockLogs);
        if (!skipLoadingState) {
          stopLoading();
        }
      } catch (err) {
        console.error('Error fetching TradingView logs:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch TradingView logs'));
        if (!skipLoadingState) {
          stopLoading();
        }
      }
    }, 600);
  }, [botId, userId, startLoading, stopLoading, skipLoadingState]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

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
