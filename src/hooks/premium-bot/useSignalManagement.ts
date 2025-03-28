
import { useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';

export const useSignalManagement = (botId: string, userId: string, isAdminView: boolean = false) => {
  // Add a ref to track last refresh time
  const lastRefreshTimeRef = useRef(0);
  
  const {
    tradingViewLogs,
    coinstratLogs,
    loading: logsLoading,
    availableUsers,
    refreshLogs
  } = useCombinedSignalLogs({
    botId,
    userId,
    isAdminView
  });

  const processedSignalsCount = coinstratLogs.length;

  // Wrap refreshLogs with a cooldown mechanism
  const refreshSignalLogs = useCallback(() => {
    const now = Date.now();
    // Prevent refreshing if last refresh was less than 3 seconds ago
    if (now - lastRefreshTimeRef.current > 3000) {
      lastRefreshTimeRef.current = now;
      refreshLogs();
      toast.success("Signal logs refreshed");
    }
  }, [refreshLogs]);

  return {
    tradingViewLogs,
    coinstratLogs,
    logsLoading,
    availableUsers,
    processedSignalsCount,
    refreshSignalLogs
  };
};
