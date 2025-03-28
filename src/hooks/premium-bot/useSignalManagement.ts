
import { useCallback, useRef, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

export const useSignalManagement = (botId: string, userId: string, isAdminView: boolean = false) => {
  // Add a ref to track last refresh time
  const lastRefreshTimeRef = useRef(0);
  // Add a ref to store cached signals
  const cachedSignalsRef = useRef<{
    tradingViewLogs: TradingViewSignal[];
    coinstratLogs: CoinstratSignal[];
    timestamp: number;
  }>({
    tradingViewLogs: [],
    coinstratLogs: [],
    timestamp: 0
  });
  
  // Add a ref for tracking if a refresh is in progress
  const isRefreshingRef = useRef(false);
  
  const {
    tradingViewLogs: fetchedTradingViewLogs,
    coinstratLogs: fetchedCoinstratLogs,
    loading: logsLoading,
    availableUsers,
    refreshLogs
  } = useCombinedSignalLogs({
    botId,
    userId,
    isAdminView
  });

  // Use the cached values or update cache if new data is received
  const tradingViewLogs = useMemo(() => {
    if (fetchedTradingViewLogs.length > 0) {
      cachedSignalsRef.current.tradingViewLogs = fetchedTradingViewLogs;
      cachedSignalsRef.current.timestamp = Date.now();
    }
    return cachedSignalsRef.current.tradingViewLogs;
  }, [fetchedTradingViewLogs]);
  
  const coinstratLogs = useMemo(() => {
    if (fetchedCoinstratLogs.length > 0) {
      cachedSignalsRef.current.coinstratLogs = fetchedCoinstratLogs;
      cachedSignalsRef.current.timestamp = Date.now();
    }
    return cachedSignalsRef.current.coinstratLogs;
  }, [fetchedCoinstratLogs]);

  const processedSignalsCount = useMemo(() => 
    coinstratLogs.length, [coinstratLogs]);

  // Wrap refreshLogs with a cooldown mechanism
  const refreshSignalLogs = useCallback(() => {
    const now = Date.now();
    // Prevent refreshing if last refresh was less than 3 seconds ago
    // or if a refresh is already in progress
    if (now - lastRefreshTimeRef.current > 3000 && !isRefreshingRef.current) {
      lastRefreshTimeRef.current = now;
      isRefreshingRef.current = true;
      
      // Attempt the refresh
      refreshLogs();
      
      // Show toast only once
      toast.success("Signal logs refreshed");
      
      // Reset the refreshing flag after a reasonable timeout
      setTimeout(() => {
        isRefreshingRef.current = false;
      }, 2000);
    }
  }, [refreshLogs]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Clean up any pending operations if needed
    };
  }, []);

  return {
    tradingViewLogs,
    coinstratLogs,
    logsLoading,
    availableUsers,
    processedSignalsCount,
    refreshSignalLogs
  };
};
