
import { useState, useEffect, useCallback } from 'react';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';
import { useTradingViewLogs } from '@/components/bots/trading-view-logs/useTradingViewLogs';
import { useCoinstratLogs } from '@/components/bots/coinstrat-logs/useCoinstratLogs';

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
  // Use both hooks for fetching different log types
  const {
    logs: tradingViewLogs,
    loading: tvLoading,
    error: tvError,
    fetchLogs: fetchTvLogs
  } = useTradingViewLogs({
    botId,
    userId,
    refreshTrigger
  });

  const {
    logs: coinstratLogs,
    loading: csLoading,
    error: csError,
    fetchLogs: fetchCsLogs
  } = useCoinstratLogs({
    botId,
    userId,
    refreshTrigger
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
    fetchTvLogs();
    fetchCsLogs();
  }, [fetchTvLogs, fetchCsLogs]);

  // Combine loading states
  const loading = tvLoading || csLoading;
  
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
