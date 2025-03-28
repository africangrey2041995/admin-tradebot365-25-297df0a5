
import { useState, useEffect, useCallback, useRef } from 'react';
import { TradingViewSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

// Create a consistent mock data generator with seed-based randomness
const createMockTradeViewLogs = (seed = 123): TradingViewSignal[] => {
  // Use the seed to create deterministic "random" values
  const pseudoRandom = (n: number) => {
    return ((seed * 9301 + 49297) % 233280) / 233280;
  };

  // Generate different bot types for variety
  const botTypes = ['MY', 'PRE', 'PROP'];
  const getBotId = (index: number) => {
    // Special case for index 0-2: Always create MY-001 to ensure data is available
    if (index < 3) {
      return 'MY-001';
    }
    
    const type = botTypes[(index % botTypes.length)];
    const num = String(1000 + Math.floor(index / botTypes.length)).substring(1);
    return `${type}-${num}`;
  };

  // Create a set of common user IDs that will always be included
  const commonUserIds = ['USR-001', 'USR-002', 'USR-003'];

  return Array(15)
    .fill(null)
    .map((_, index) => {
      // Generate consistent bot ID for this signal
      const botId = getBotId(index);
      
      // Use common user IDs for first several entries to ensure they have data
      // This ensures MY-001 bot always has signals for USR-001
      const userId = index < 3 ? commonUserIds[index % commonUserIds.length] : `USR-${1000 + index % 10}`;
      
      // Use consistent values based on index for stable rendering
      const actionIndex = Math.floor(pseudoRandom(index * 1) * 4);
      const instrumentIndex = Math.floor(pseudoRandom(index * 2) * 4);
      const statusIndex = Math.floor(pseudoRandom(index * 3) * 4);
      
      // Ensure timestamps are stable and don't change on every render
      const timeOffset = index * 3600000; // Each entry 1 hour apart
      const timestamp = new Date(Date.now() - timeOffset).toISOString();
      
      return {
        id: `TV-${1000 + index}`,
        action: ['ENTER_LONG', 'EXIT_LONG', 'ENTER_SHORT', 'EXIT_SHORT'][actionIndex] as any,
        instrument: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'][instrumentIndex],
        timestamp: timestamp,
        signalToken: botId, // Use botId directly as the signalToken for easier filtering
        maxLag: (Math.floor(pseudoRandom(index * 4) * 5) + 1) * 60 + '',
        investmentType: 'contract',
        amount: (pseudoRandom(index * 5) * 0.5 + 0.01).toFixed(3),
        status: ['Processed', 'Pending', 'Failed', 'Sent'][statusIndex],
        processingTime: Math.floor(pseudoRandom(index * 6) * 5000) + '',
        errorMessage: pseudoRandom(index * 7) > 0.8 ? 'Connection timeout or symbol issues' : undefined,
        botId: botId, // Set the botId property explicitly 
        userId: userId, // Consistent userId format
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
  
  // Cache the mock data to prevent regeneration on every render
  const mockDataRef = useRef<TradingViewSignal[]>([]);
  
  // Use our safe loading hook
  const { loading, startLoading, stopLoading } = useSafeLoading({
    debugComponent: 'TradingViewLogs',
    skipLoadingState,
    minLoadingDurationMs: 500 // Add minimum loading time to prevent flicker
  });
  
  // Track the last fetch time to prevent rapid refreshes
  const lastFetchTimeRef = useRef(0);
  
  const fetchLogs = useCallback(() => {
    try {
      // Implement debounce - prevent fetching if last fetch was less than 1 second ago
      const now = Date.now();
      if (now - lastFetchTimeRef.current < 1000) {
        console.log('TradingViewLogs - Fetch throttled, too recent');
        return;
      }
      
      lastFetchTimeRef.current = now;
      startLoading();
      console.log(`Fetching TradingView logs for botId: ${botId}, userId: ${userId}`);
      
      // In a real app, we would fetch data from API here
      setTimeout(() => {
        try {
          // Generate mock data only once and cache it
          if (mockDataRef.current.length === 0) {
            mockDataRef.current = initialData || createMockTradeViewLogs();
            console.log(`Generated ${mockDataRef.current.length} TradingView logs`);
          }
          
          const allLogs = mockDataRef.current;
          
          // Filter logs based on botId and/or userId
          let filteredLogs = [...allLogs];
          
          if (botId) {
            console.log(`Filtering TradingView logs by botId: ${botId}`);
            
            // More flexible filtering that checks multiple fields
            filteredLogs = filteredLogs.filter(log => {
              const signalToken = log.signalToken?.toLowerCase() || '';
              const logBotId = log.botId?.toLowerCase() || '';
              const targetBotId = botId.toLowerCase();
              
              return signalToken === targetBotId || 
                     logBotId === targetBotId ||
                     signalToken.includes(targetBotId) ||
                     logBotId.includes(targetBotId);
            });
            
            console.log(`After botId filtering: ${filteredLogs.length} logs remaining`);
          }
          
          if (userId) {
            console.log(`Filtering TradingView logs by userId: ${userId}`);
            
            // Replace URL check with pure logic based on userId
            const isEmptyUserId = !userId || userId.trim() === '';
            
            if (!isEmptyUserId) {
              // More flexible user ID filtering
              filteredLogs = filteredLogs.filter(log => {
                const logUserId = log.userId?.toLowerCase() || '';
                const targetUserId = userId.toLowerCase();
                
                return logUserId === targetUserId || logUserId.includes(targetUserId);
              });
            }
            
            console.log(`After userId filtering: ${filteredLogs.length} logs remaining`);
          }
          
          console.log(`TradingView logs filtered: ${filteredLogs.length} results for botId: ${botId}, userId: ${userId}`);
          
          // Introduce a slight delay to stabilize UI
          setTimeout(() => {
            setLogs(filteredLogs);
            setError(null);
            stopLoading();
          }, 300);
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
