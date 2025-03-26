
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';

export const useSignalManagement = (botId: string, userId: string) => {
  const {
    tradingViewLogs,
    coinstratLogs,
    loading: logsLoading,
    availableUsers,
    refreshLogs
  } = useCombinedSignalLogs({
    botId,
    userId
  });

  const processedSignalsCount = coinstratLogs.length;

  const refreshSignalLogs = useCallback(() => {
    refreshLogs();
    toast.success("Signal logs refreshed");
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
