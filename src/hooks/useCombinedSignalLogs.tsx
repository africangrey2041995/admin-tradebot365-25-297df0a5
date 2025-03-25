
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

  const refreshLogs = useCallback(() => {
    // Prevent concurrent fetches
    if (fetchInProgressRef.current) {
      console.log('CombinedSignalLogs - Fetch already in progress, skipping duplicate request');
      return;
    }
    
    fetchInProgressRef.current = true;
    startLoading();
    
    // Start a safety timeout to prevent infinite loading
    const safetyTimeout = setTimeout(() => {
      if (fetchInProgressRef.current) {
        console.warn('CombinedSignalLogs - Safety timeout reached, forcing loading state reset');
        stopLoading();
        fetchInProgressRef.current = false;
      }
    }, 10000);
    
    // Call both fetch functions
    fetchTvLogs();
    fetchCsLogs();
    
    // Use a more reliable approach to detect completion
    let tvDone = false;
    let csDone = false;
    
    // Set up a check interval with a counter to ensure we eventually stop waiting
    let checkCount = 0;
    const maxChecks = 40; // 40 checks * 300ms = 12 seconds max wait time
    
    const checkInterval = setInterval(() => {
      checkCount++;
      
      // Check if individual fetches are done
      if (!tvLoading) tvDone = true;
      if (!csLoading) csDone = true;
      
      // Debug log
      console.log(`CombinedSignalLogs - Check ${checkCount}: TV: ${tvDone ? 'done' : 'loading'}, CS: ${csDone ? 'done' : 'loading'}`);
      
      // If both are done or we've reached max checks
      if ((tvDone && csDone) || checkCount >= maxChecks) {
        clearInterval(checkInterval);
        clearTimeout(safetyTimeout);
        
        // Small delay before setting loading to false to ensure UI stability
        setTimeout(() => {
          stopLoading();
          fetchInProgressRef.current = false;
          console.log('CombinedSignalLogs - All fetches complete, loading state cleared');
        }, 300);
      }
    }, 300);
    
    // Clean up interval and timeout if component unmounts during fetch
    return () => {
      clearInterval(checkInterval);
      clearTimeout(safetyTimeout);
    };
  }, [fetchTvLogs, fetchCsLogs, startLoading, stopLoading, tvLoading, csLoading]);

  // Handle refresh trigger
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
