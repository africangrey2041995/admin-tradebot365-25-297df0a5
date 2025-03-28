
import { useState, useEffect, useCallback, useRef } from 'react';
import { TradingViewSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';
import { getMockTradingViewLogs } from './mockData';

interface UseTradingViewLogsProps {
  botId?: string;
  userId?: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean;
  initialData?: TradingViewSignal[];
  isAdminView?: boolean; // Add admin view flag
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
  initialData,
  isAdminView = false // Default to false
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
      console.log(`Fetching TradingView logs for botId: ${botId}, userId: ${userId}, isAdminView: ${isAdminView}`);
      
      // In a real app, we would fetch data from API here
      setTimeout(() => {
        try {
          // Generate mock data only once and cache it
          if (mockDataRef.current.length === 0) {
            mockDataRef.current = initialData || getMockTradingViewLogs(botId);
            console.log(`Loaded ${mockDataRef.current.length} TradingView logs for botId: ${botId}`);
          }
          
          const allLogs = mockDataRef.current;
          
          // Filter logs based on botId and/or userId
          let filteredLogs = [...allLogs];
          
          // Only apply userId filter if provided AND not in admin view
          if (userId && !isAdminView) {
            console.log(`Filtering TradingView logs by userId: ${userId}`);
            
            // Check if userId is empty
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
          } else if (isAdminView) {
            console.log(`Admin view: Not filtering by userId, showing all logs for botId: ${botId}`);
          }
          
          console.log(`TradingView logs filtered: ${filteredLogs.length} results for botId: ${botId}, userId: ${userId}, isAdminView: ${isAdminView}`);
          
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
  }, [botId, userId, startLoading, stopLoading, initialData, isAdminView]);
  
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
