
import { useState, useEffect, useCallback } from 'react';
import { TradingViewSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/useSafeLoading';

// Mock data for trading view logs
const mockTradingViewLogs: TradingViewSignal[] = [
  {
    id: 'TV-SIG-001',
    action: 'ENTER_LONG',
    instrument: 'BTC/USDT',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    signalToken: 'token123',
    maxLag: '10s',
    investmentType: 'crypto',
    amount: '0.01',
    status: 'Processed',
    source: 'TradingView',
    accountName: 'Primary Trading Account'
  },
  {
    id: 'TV-SIG-002',
    action: 'EXIT_LONG',
    instrument: 'BTC/USDT',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    signalToken: 'token456',
    maxLag: '10s',
    investmentType: 'crypto',
    amount: '0.01',
    status: 'Processed',
    source: 'TradingView',
    accountName: 'Primary Trading Account'
  },
  {
    id: 'TV-SIG-003',
    action: 'ENTER_SHORT',
    instrument: 'ETH/USDT',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    signalToken: 'token789',
    maxLag: '10s',
    investmentType: 'crypto',
    amount: '0.15',
    status: 'Pending',
    source: 'TradingView',
    accountName: 'Secondary Trading Account'
  },
  {
    id: 'TV-SIG-004',
    action: 'EXIT_SHORT',
    instrument: 'ETH/USDT',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    signalToken: 'tokenABC',
    maxLag: '10s',
    investmentType: 'crypto',
    amount: '0.15',
    status: 'Failed',
    source: 'TradingView',
    accountName: 'Secondary Trading Account',
    errorMessage: 'Network timeout'
  }
];

// More realistic interface for the hook
interface UseTradingViewLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean;
  initialData?: TradingViewSignal[];
}

export const useTradingViewLogs = ({
  botId,
  userId,
  refreshTrigger = false,
  skipLoadingState = false,
  initialData
}: UseTradingViewLogsProps) => {
  const [logs, setLogs] = useState<TradingViewSignal[]>(initialData || []);
  const [error, setError] = useState<Error | null>(null);
  
  // Use the safeLoading hook with improved settings
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 5000, // 5 seconds timeout
    debugComponent: 'TradingViewLogs',
    skipLoading: skipLoadingState, // Skip loading if requested
    minLoadingDurationMs: 300 // Ensure minimum loading duration to prevent flicker
  });

  // Fetch logs function - simulates API call
  const fetchLogs = useCallback(() => {
    if (!skipLoadingState) {
      startLoading();
    }
    
    setError(null);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        console.log(`Fetching TradingView logs for bot ${botId} and user ${userId}`);
        
        // Here you would normally make an API call
        // For now, just use mock data
        setLogs(mockTradingViewLogs);
        
        if (!skipLoadingState) {
          stopLoading();
        }
      } catch (err) {
        console.error('Error fetching TradingView logs:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch logs'));
        if (!skipLoadingState) {
          stopLoading();
        }
      }
    }, 600);
  }, [botId, userId, startLoading, stopLoading, skipLoadingState]);

  // Initial fetch
  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      fetchLogs();
    }
  }, [fetchLogs, initialData]);

  // Handle refresh trigger
  useEffect(() => {
    if (refreshTrigger) {
      fetchLogs();
    }
  }, [refreshTrigger, fetchLogs]);

  return { logs, loading, error, fetchLogs };
};
