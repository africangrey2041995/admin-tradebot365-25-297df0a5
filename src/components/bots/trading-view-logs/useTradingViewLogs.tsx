
import { useState, useEffect, useCallback } from 'react';
import { TradingViewLog } from '@/types/signal';
import { useSafeLoading } from '@/hooks/useSafeLoading';

interface UseTradingViewLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean; // Add ability to skip internal loading state
}

interface UseTradingViewLogsResult {
  logs: TradingViewLog[];
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
  const [logs, setLogs] = useState<TradingViewLog[]>([]);
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
        // Mock data for development
        const mockLogs: TradingViewLog[] = [
          {
            id: 'TV-12345',
            originalSignalId: '123456',
            timestamp: new Date().toISOString(),
            source: 'TradingView Alert',
            content: 'Buy BTCUSDT at market price',
            action: 'BUY',
            symbol: 'BTCUSDT',
            price: '50000',
            status: 'Processed',
            parsedData: {
              action: 'BUY',
              symbol: 'BTCUSDT',
              price: '50000',
              stopLoss: '49000',
              takeProfit: '51000',
            }
          },
          {
            id: 'TV-12346',
            originalSignalId: '123457',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            source: 'TradingView Alert',
            content: 'Sell ETHUSDT at market price',
            action: 'SELL',
            symbol: 'ETHUSDT',
            price: '3000',
            status: 'Processed',
            parsedData: {
              action: 'SELL',
              symbol: 'ETHUSDT',
              price: '3000',
              stopLoss: '3100',
              takeProfit: '2900',
            }
          },
          {
            id: 'TV-12347',
            originalSignalId: '123458',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            source: 'TradingView Alert',
            content: 'Invalid signal format',
            status: 'Failed',
            errorMessage: 'Could not parse signal format',
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
