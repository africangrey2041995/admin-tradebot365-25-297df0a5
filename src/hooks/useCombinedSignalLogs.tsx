
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';
import { useTradingViewLogs } from '@/components/bots/trading-view-logs/useTradingViewLogs';
import { useCoinstratLogs } from '@/components/bots/coinstrat-logs/useCoinstratLogs';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

interface UseCombinedSignalLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  isAdminView?: boolean; // Added to explicitly detect admin view
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
  refreshTrigger = false,
  isAdminView = false // Default to false
}: UseCombinedSignalLogsProps): UseCombinedSignalLogsResult => {
  // Use the safeLoading hook with timeout and minimum loading time to prevent flicker
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 10000, // 10 seconds timeout
    debugComponent: 'CombinedSignalLogs',
    minLoadingDurationMs: 500 // Ensure minimum loading duration to prevent flicker
  });
  
  // Track if fetch is in progress to prevent duplicate requests
  const fetchInProgressRef = useRef(false);
  
  // Cache for signal logs
  const cachedLogsRef = useRef<{
    tradingViewLogs: TradingViewSignal[];
    coinstratLogs: CoinstratSignal[];
    timestamp: number;
  }>({
    tradingViewLogs: [],
    coinstratLogs: [],
    timestamp: 0
  });
  
  // Store stable refs to props to prevent unnecessary re-renders
  const botIdRef = useRef(botId);
  const userIdRef = useRef(userId);
  const isAdminViewRef = useRef(isAdminView);
  
  // Update refs when props change
  useEffect(() => {
    botIdRef.current = botId;
    userIdRef.current = userId;
    isAdminViewRef.current = isAdminView;
  }, [botId, userId, isAdminView]);
  
  // Track if we should update the UI
  const shouldUpdateUIRef = useRef(true);
  
  console.log(`useCombinedSignalLogs initialized with botId: ${botId}, userId: ${userId}, isAdminView: ${isAdminView}`);
  
  // Use an empty userId when in admin view to get all signals for a bot
  // This is the key fix - in admin view, we want ALL signals for a bot, not filtered by userId
  const effectiveUserId = isAdminViewRef.current ? '' : userIdRef.current;
  
  console.log(`Using effectiveUserId for filtering: ${effectiveUserId} (original: ${userId}, admin view: ${isAdminView})`);
  
  const {
    logs: tvFetchedLogs,
    loading: tvLoading,
    error: tvError,
    fetchLogs: fetchTvLogs
  } = useTradingViewLogs({
    botId: botIdRef.current,
    userId: effectiveUserId,
    refreshTrigger,
    skipLoadingState: true, // Skip internal loading state in the hook
    isAdminView: isAdminViewRef.current // Pass admin view flag to the hook
  });

  const {
    logs: csFetchedLogs,
    loading: csLoading,
    error: csError,
    fetchLogs: fetchCsLogs
  } = useCoinstratLogs({
    botId: botIdRef.current,
    userId: effectiveUserId,
    refreshTrigger,
    skipLoadingState: true, // Skip internal loading state in the hook
    isAdminView: isAdminViewRef.current // Pass admin view flag to the hook
  });

  // Log fetched data for debugging
  useEffect(() => {
    console.log(`TV logs fetched: ${tvFetchedLogs.length}, CS logs fetched: ${csFetchedLogs.length}, admin view: ${isAdminViewRef.current}`);
  }, [tvFetchedLogs.length, csFetchedLogs.length]);

  // Memoize the logs to prevent unnecessary re-renders
  const tradingViewLogs = useMemo(() => {
    // Only update if we have new data and should update UI
    if (tvFetchedLogs.length > 0 && shouldUpdateUIRef.current) {
      cachedLogsRef.current.tradingViewLogs = tvFetchedLogs;
      cachedLogsRef.current.timestamp = Date.now();
    }
    return cachedLogsRef.current.tradingViewLogs;
  }, [tvFetchedLogs]);
  
  const coinstratLogs = useMemo(() => {
    // Only update if we have new data and should update UI
    if (csFetchedLogs.length > 0 && shouldUpdateUIRef.current) {
      cachedLogsRef.current.coinstratLogs = csFetchedLogs;
      cachedLogsRef.current.timestamp = Date.now();
    }
    return cachedLogsRef.current.coinstratLogs;
  }, [csFetchedLogs]);

  const [availableUsers, setAvailableUsers] = useState<{ id: string; name: string }[]>([]);
  
  // Extract unique users from Coinstrat logs - memoized to prevent recalculations
  useEffect(() => {
    // Skip if no logs to process
    if (coinstratLogs.length === 0) return;
    
    const userMap = new Map<string, string>();
    
    // Add current user to the map first
    if (userId) {
      userMap.set(
        userId, 
        userId.startsWith('USR-') 
          ? `User ${userId.split('-')[1]}`
          : userId
      );
    }
    
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
    
    // Add userIds from tradingViewLogs too
    tradingViewLogs.forEach(log => {
      if (log.userId && !userMap.has(log.userId)) {
        userMap.set(
          log.userId,
          log.userId.startsWith('USR-') 
            ? `User ${log.userId.split('-')[1]}`
            : log.userId
        );
      }
    });
    
    // Force add USR-001 to ensure it's always available for testing
    if (!userMap.has('USR-001')) {
      userMap.set('USR-001', 'User 001');
    }
    
    const users = Array.from(userMap.entries()).map(([id, name]) => ({ id, name }));
    setAvailableUsers(users);
  }, [coinstratLogs, tradingViewLogs, userId]);

  // This is a modified version with debounce to prevent multiple refreshes
  const refreshLogs = useCallback(() => {
    console.log(`Refreshing combined logs for botId: ${botIdRef.current}, userId: ${userIdRef.current}, admin view: ${isAdminViewRef.current}`);
    
    // Prevent concurrent fetches
    if (fetchInProgressRef.current) {
      console.log('CombinedSignalLogs - Fetch already in progress, skipping duplicate request');
      return;
    }
    
    fetchInProgressRef.current = true;
    startLoading();
    
    // Temporarily disable UI updates during refresh to prevent flickering
    shouldUpdateUIRef.current = false;
    
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
      setTimeout(() => {
        // Re-enable UI updates after a short delay
        shouldUpdateUIRef.current = true;
        stopLoading();
        fetchInProgressRef.current = false;
        console.log('CombinedSignalLogs - All fetches complete, loading state cleared');
      }, 300); // Small delay to ensure smoother transition
    }).catch(error => {
      console.error('Error in refreshLogs:', error);
      shouldUpdateUIRef.current = true;
      stopLoading();
      fetchInProgressRef.current = false;
    });
    
    // Set a maximum timeout as a fallback
    setTimeout(() => {
      if (fetchInProgressRef.current) {
        console.warn('CombinedSignalLogs - Safety timeout reached, forcing loading state reset');
        shouldUpdateUIRef.current = true;
        stopLoading();
        fetchInProgressRef.current = false;
      }
    }, 5000);
  }, [fetchTvLogs, fetchCsLogs, startLoading, stopLoading]);

  // Initial fetch
  useEffect(() => {
    console.log(`Initial fetch for combined logs, botId: ${botId}, userId: ${userId}, admin view: ${isAdminView}`);
    
    // Load from cache first if available to prevent initial flicker
    if (cachedLogsRef.current.timestamp > 0) {
      // Use cached data
      console.log('Using cached signal logs');
    } else {
      // Fetch new data
      refreshLogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
