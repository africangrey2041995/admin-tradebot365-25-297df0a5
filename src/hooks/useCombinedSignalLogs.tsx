
import { useState, useEffect, useCallback, useRef } from 'react';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';
import { useTradingViewLogs } from '@/components/bots/trading-view-logs/useTradingViewLogs';
import { useCoinstratLogs } from '@/components/bots/coinstrat-logs/useCoinstratLogs';
import { useSafeLoading } from '@/hooks/useSafeLoading';

interface UseCombinedSignalLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
}

interface UseCombinedSignalLogsResult {
  tradingViewLogs: TradingViewSignal[];
  coinstratLogs: CoinstratSignal[];
  loading: boolean;
  error: Error | null;
  refreshLogs: () => void;
  availableUsers: { id: string; name: string }[];
}

export const useCombinedSignalLogs = ({
  botId,
  userId,
  refreshTrigger = false
}: UseCombinedSignalLogsProps): UseCombinedSignalLogsResult => {
  // Use the safeLoading hook with timeout
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 10000, // 10 seconds timeout
    debugComponent: 'CombinedSignalLogs',
    minLoadingDurationMs: 500 // Ensure minimum loading duration to prevent flicker
  });
  
  // Track if fetch is in progress to prevent duplicate requests
  const fetchInProgressRef = useRef(false);
  
  // Use both hooks for fetching different log types with skipLoadingState
  const {
    logs: tradingViewLogs,
    loading: tvLoading,
    error: tvError,
    fetchLogs: fetchTvLogs
  } = useTradingViewLogs({
    botId,
    userId,
    refreshTrigger,
    skipLoadingState: true // Skip internal loading state in the hook
  });

  const {
    logs: coinstratLogs,
    loading: csLoading,
    error: csError,
    fetchLogs: fetchCsLogs
  } = useCoinstratLogs({
    botId,
    userId,
    refreshTrigger,
    skipLoadingState: true // Skip internal loading state in the hook
  });

  const [availableUsers, setAvailableUsers] = useState<{ id: string; name: string }[]>([]);
  
  // Extract unique users from Coinstrat logs
  useEffect(() => {
    const userMap = new Map<string, string>();
    
    coinstratLogs.forEach(log => {
      // Process userIds from processedAccounts
      log.processedAccounts.forEach(account => {
        if (account.userId && !userMap.has(account.userId)) {
          userMap.set(
            account.userId, 
            account.userId.startsWith('USR-') 
              ? `User ${account.userId.split('-')[1]}`
              : account.userId
          );
        }
      });
      
      // Process userIds from failedAccounts
      log.failedAccounts.forEach(account => {
        if (account.userId && !userMap.has(account.userId)) {
          userMap.set(
            account.userId, 
            account.userId.startsWith('USR-') 
              ? `User ${account.userId.split('-')[1]}`
              : account.userId
          );
        }
      });
    });
    
    const users = Array.from(userMap.entries()).map(([id, name]) => ({ id, name }));
    setAvailableUsers(users);
  }, [coinstratLogs]);

  // This is a modified version that better handles the loading state
  const refreshLogs = useCallback(() => {
    // Prevent concurrent fetches
    if (fetchInProgressRef.current) {
      console.log('CombinedSignalLogs - Fetch already in progress, skipping duplicate request');
      return;
    }
    
    fetchInProgressRef.current = true;
    startLoading();
    
    // Create a promise that resolves when both fetches are complete
    Promise.all([
      new Promise<void>(resolve => {
        fetchTvLogs();
        // We're not waiting for the actual completion since these are mock fetches
        // In a real app, these would return Promises we could await
        setTimeout(resolve, 1000);
      }),
      new Promise<void>(resolve => {
        fetchCsLogs();
        // Same here, setting a reasonable timeout
        setTimeout(resolve, 1000);
      })
    ]).then(() => {
      // Both fetches have completed
      stopLoading();
      fetchInProgressRef.current = false;
      console.log('CombinedSignalLogs - All fetches complete, loading state cleared');
    }).catch(error => {
      console.error('Error in refreshLogs:', error);
      stopLoading();
      fetchInProgressRef.current = false;
    });
    
    // Set a maximum timeout as a fallback
    setTimeout(() => {
      if (fetchInProgressRef.current) {
        console.warn('CombinedSignalLogs - Safety timeout reached, forcing loading state reset');
        stopLoading();
        fetchInProgressRef.current = false;
      }
    }, 5000);
  }, [fetchTvLogs, fetchCsLogs, startLoading, stopLoading]);

  // Initial fetch
  useEffect(() => {
    refreshLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botId, userId]);

  // Handle refresh trigger from parent
  useEffect(() => {
    if (refreshTrigger) {
      refreshLogs();
    }
  }, [refreshTrigger, refreshLogs]);

  // Combine error states, prioritizing the first error
  const error = tvError || csError;

  return {
    tradingViewLogs,
    coinstratLogs,
    loading,
    error,
    refreshLogs,
    availableUsers
  };
};
