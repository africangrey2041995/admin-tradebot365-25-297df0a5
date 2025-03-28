
import { useState, useEffect, useCallback } from 'react';
import { TradingViewSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

// Create a sample data set with proper ID formats
const createMockTradeViewLogs = (): TradingViewSignal[] => {
  // Generate different bot types for variety
  const botTypes = ['MY', 'PRE', 'PROP'];
  const getBotId = (index: number) => {
    const type = botTypes[index % botTypes.length];
    const num = String(1000 + Math.floor(index / botTypes.length)).substring(1);
    return `${type}-${num}`;
  };

  return Array(15)
    .fill(null)
    .map((_, index) => {
      // Generate consistent bot ID for this signal
      const botId = getBotId(Math.floor(index / 3));
      
      return {
        id: `TV-${1000 + index}`,
        action: ['ENTER_LONG', 'EXIT_LONG', 'ENTER_SHORT', 'EXIT_SHORT'][Math.floor(Math.random() * 4)] as any,
        instrument: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'][Math.floor(Math.random() * 4)],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
        signalToken: botId, // Use botId directly as the signalToken for easier filtering
        maxLag: (Math.floor(Math.random() * 5) + 1) * 60 + '',
        investmentType: 'contract',
        amount: (Math.random() * 0.5 + 0.01).toFixed(3),
        status: ['Processed', 'Pending', 'Failed', 'Sent'][Math.floor(Math.random() * 4)],
        processingTime: Math.floor(Math.random() * 5000) + '',
        errorMessage: Math.random() > 0.8 ? 'Connection timeout or symbol issues' : undefined,
        botId: botId, // Set the botId property explicitly
        userId: `USR-${1000 + index % 10}`, // Consistent userId format
      };
    });
};

interface UseTradingViewLogsProps {
  botId?: string;
  userId?: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean;
  initialData?: TradingViewSignal[];
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
  skipLoadingState = false,
  initialData
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
          const allLogs = initialData || createMockTradeViewLogs();
          
          // Filter logs based on botId and/or userId
          let filteredLogs = [...allLogs];
          
          if (botId) {
            console.log(`Filtering TradingView logs by botId: ${botId}`);
            // Filter by signalToken (which should contain the botId) or by the botId property directly
            filteredLogs = filteredLogs.filter(log => 
              log.signalToken === botId || 
              log.botId === botId
            );
          }
          
          if (userId) {
            console.log(`Filtering TradingView logs by userId: ${userId}`);
            // Filter by userId
            filteredLogs = filteredLogs.filter(log => log.userId === userId);
          }
          
          console.log(`TradingView logs filtered: ${filteredLogs.length} results for botId: ${botId}, userId: ${userId}`);
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
