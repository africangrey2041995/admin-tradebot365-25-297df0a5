
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
  
  // Use a stable isAdminView value that won't cause unnecessary re-renders
  const isAdminViewRef = useRef(isAdminView);
  // Update the ref if the prop changes
  useEffect(() => {
    isAdminViewRef.current = isAdminView;
    console.log(`useSignalManagement - isAdminView updated to: ${isAdminView}`);
  }, [isAdminView]);
  
  const {
    tradingViewLogs: fetchedTradingViewLogs,
    coinstratLogs: fetchedCoinstratLogs,
    loading: logsLoading,
    availableUsers,
    refreshLogs
  } = useCombinedSignalLogs({
    botId,
    userId,
    isAdminView: isAdminViewRef.current
  });

  // Log signal counts for debugging
  useEffect(() => {
    console.log(`Signal counts - TV: ${fetchedTradingViewLogs.length}, CS: ${fetchedCoinstratLogs.length}, Admin view: ${isAdminViewRef.current}`);
  }, [fetchedTradingViewLogs.length, fetchedCoinstratLogs.length]);

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

  // Wrap refreshLogs with a debounce mechanism
  const refreshSignalLogs = useCallback(() => {
    const now = Date.now();
    
    // Prevent refreshing if last refresh was less than 3 seconds ago
    // or if a refresh is already in progress
    if (now - lastRefreshTimeRef.current > 3000 && !isRefreshingRef.current) {
      lastRefreshTimeRef.current = now;
      isRefreshingRef.current = true;
      
      console.log(`Refreshing signals for botId: ${botId}, userId: ${userId}, isAdminView: ${isAdminViewRef.current}`);
      
      // Attempt the refresh
      refreshLogs();
      
      // Show toast only once
      toast.success("Signal logs refreshed");
      
      // Reset the refreshing flag after a reasonable timeout
      setTimeout(() => {
        isRefreshingRef.current = false;
      }, 2000);
    } else {
      console.log('Signal refresh throttled - too recent or already in progress');
    }
  }, [refreshLogs, botId, userId]);

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
