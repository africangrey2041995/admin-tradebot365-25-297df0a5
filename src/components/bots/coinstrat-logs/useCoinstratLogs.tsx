
import { useState, useEffect, useCallback, useRef } from 'react';
import { CoinstratSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';
import { getMockCoinstratLogs } from './mockData';

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
            mockDataRef.current = initialData || getMockCoinstratLogs(botId);
            console.log(`Loaded ${mockDataRef.current.length} Coinstrat logs for botId: ${botId}`);
          }
          
          // Use initialData if provided, otherwise use cached mock data
          const allLogs = mockDataRef.current;
          console.log(`Using ${allLogs.length} Coinstrat logs`);
          
          // Filter logs based on userId if provided
          let filteredLogs = [...allLogs];
          
          if (userId) {
            console.log(`Filtering Coinstrat logs by userId: ${userId}`);
            
            // Check if userId is empty
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
