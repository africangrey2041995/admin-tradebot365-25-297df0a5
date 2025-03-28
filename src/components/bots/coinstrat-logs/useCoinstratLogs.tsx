
import { useState, useEffect, useCallback, useRef } from 'react';
import { CoinstratSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

// Create a consistent mock data generator with seed-based randomness
const createMockCoinstratLogs = (seed = 456): CoinstratSignal[] => {
  // Use the seed to create deterministic "random" values
  const pseudoRandom = (n: number) => {
    return ((seed * 9301 + 49297 * n) % 233280) / 233280;
  };

  // Generate different bot types for variety
  const botTypes = ['MY', 'PRE', 'PROP'];
  const getBotId = (index: number) => {
    // Special case for index 0-2: Always create MY-001 to ensure data is available
    if (index < 3) {
      return 'MY-001';
    }
    
    const type = botTypes[index % botTypes.length];
    const num = String(1000 + Math.floor(index / botTypes.length)).substring(1);
    return `${type}-${num}`;
  };

  // Create a set of common user IDs that will always be included
  const commonUserIds = ['USR-001', 'USR-002', 'USR-003'];
  
  // Create matching originalSignalIds for the first few signals to ensure they match
  // with TradingView logs
  const commonOriginalSignalIds = ['TV-1000', 'TV-1001', 'TV-1002'];

  // Mock implementation for CoinstratSignal logs
  return Array(10).fill(null).map((_, index) => {
    // Generate consistent bot ID for this signal - first few are always MY-001
    const botId = getBotId(index);
    
    // For the first few entries, use common originalSignalIds to match with TradingView logs
    const originalSignalId = index < 3 ? commonOriginalSignalIds[index] : `TV-${1000 + Math.floor(pseudoRandom(index) * 5)}`;
    
    // Use common user IDs for first several entries to ensure they have data
    const userId = index < 3 ? commonUserIds[index % commonUserIds.length] : `USR-${1000 + index % 10}`;
    
    // Use deterministic values for stable rendering
    const actionIndex = Math.floor(pseudoRandom(index * 2) * 4);
    const instrumentIndex = Math.floor(pseudoRandom(index * 3) * 4);
    const statusIndex = Math.floor(pseudoRandom(index * 4) * 3);
    
    // Ensure timestamps are stable
    const timeOffset = index * 3600000; // Each entry 1 hour apart
    const timestamp = new Date(Date.now() - timeOffset).toISOString();
    
    // Determine number of processed and failed accounts
    const numProcessed = Math.floor(pseudoRandom(index * 5) * 3) + 1;
    const shouldHaveFailed = pseudoRandom(index * 6) > 0.7;
    const numFailed = shouldHaveFailed ? Math.floor(pseudoRandom(index * 7) * 2) + 1 : 0;
    
    return {
      id: `CS-${1000 + index}`,
      originalSignalId: originalSignalId,
      action: ['ENTER_LONG', 'EXIT_LONG', 'ENTER_SHORT', 'EXIT_SHORT'][actionIndex] as any,
      instrument: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'][instrumentIndex],
      timestamp: timestamp,
      amount: (pseudoRandom(index * 8) * 0.5 + 0.01).toFixed(3),
      status: ['Processed', 'Pending', 'Failed'][statusIndex],
      processingTime: Math.floor(pseudoRandom(index * 9) * 5000) + '',
      errorMessage: pseudoRandom(index * 10) > 0.8 ? 'Connection timeout or symbol issues' : undefined,
      processedAccounts: Array(numProcessed).fill(null).map((_, i) => ({
        accountId: `ACC-${2000 + i}`,
        userId: i === 0 ? userId : `USR-${1000 + i % 10}`, // First account always uses our target userId
        status: 'success',
        name: `Account ${2000 + i}`,
        timestamp: new Date(Date.now() - Math.floor(pseudoRandom(index * 11 + i) * 3600000)).toISOString()
      })),
      failedAccounts: numFailed ? Array(numFailed).fill(null).map((_, i) => ({
        accountId: `ACC-${3000 + i}`,
        userId: i === 0 ? userId : `USR-${1000 + i % 10}`, // First account always uses our target userId
        status: 'failed',
        name: `Account ${3000 + i}`,
        timestamp: new Date(Date.now() - Math.floor(pseudoRandom(index * 12 + i) * 3600000)).toISOString(),
        reason: 'API key expired or invalid configuration'
      })) : [],
      signalToken: botId, // Use botId as the signalToken for easier filtering
      maxLag: `${Math.floor(pseudoRandom(index * 13) * 10) + 1}s`,
      investmentType: 'crypto'
    };
  });
};

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

export const useCoinstratLogs = ({
  botId,
  userId,
  refreshTrigger = false,
  skipLoadingState = false,
  initialData
}: UseCoinstratLogsProps): UseCoinstratLogsResult => {
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Cache the mock data to prevent regeneration on every render
  const mockDataRef = useRef<CoinstratSignal[]>([]);
  
  // Use our safe loading hook
  const { loading, startLoading, stopLoading } = useSafeLoading({
    debugComponent: 'CoinstratLogs',
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
        console.log('CoinstratLogs - Fetch throttled, too recent');
        return;
      }
      
      lastFetchTimeRef.current = now;
      startLoading();
      console.log(`Fetching Coinstrat logs for botId: ${botId}, userId: ${userId}`);
      
      // In a real app, we would fetch data from API here
      setTimeout(() => {
        try {
          // Generate mock data only once and cache it
          if (mockDataRef.current.length === 0) {
            mockDataRef.current = initialData || createMockCoinstratLogs();
            console.log(`Generated ${mockDataRef.current.length} Coinstrat logs`);
          }
          
          // Use initialData if provided, otherwise use cached mock data
          const allLogs = mockDataRef.current;
          console.log(`Using ${allLogs.length} Coinstrat logs`);
          
          // Filter logs based on botId and/or userId
          let filteredLogs = [...allLogs];
          
          if (botId) {
            console.log(`Filtering Coinstrat logs by botId: ${botId}`);
            
            // More flexible filtering for botId
            filteredLogs = filteredLogs.filter(log => {
              const signalToken = log.signalToken?.toLowerCase() || '';
              const targetBotId = botId.toLowerCase();
              
              return signalToken === targetBotId || 
                     signalToken.includes(targetBotId) ||
                     log.originalSignalId.toLowerCase().includes(targetBotId);
            });
            
            console.log(`After botId filtering: ${filteredLogs.length} logs remaining`);
          }
          
          if (userId) {
            console.log(`Filtering Coinstrat logs by userId: ${userId}`);
            
            // Replace URL check with simple empty check
            const isEmptyUserId = !userId || userId.trim() === '';
            
            if (!isEmptyUserId) {
              // Filter by userId across processed and failed accounts
              filteredLogs = filteredLogs.filter(log => {
                const hasUserInProcessed = log.processedAccounts.some(
                  account => account.userId?.toLowerCase() === userId.toLowerCase()
                );
                
                const hasUserInFailed = log.failedAccounts.some(
                  account => account.userId?.toLowerCase() === userId.toLowerCase()
                );
                
                return hasUserInProcessed || hasUserInFailed;
              });
            }
            
            console.log(`After userId filtering: ${filteredLogs.length} logs remaining`);
          }
          
          console.log(`Coinstrat logs filtered: ${filteredLogs.length} results for botId: ${botId}, userId: ${userId}`);
          
          // Introduce a slight delay to stabilize UI
          setTimeout(() => {
            setLogs(filteredLogs);
            setError(null);
            stopLoading();
          }, 300);
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
