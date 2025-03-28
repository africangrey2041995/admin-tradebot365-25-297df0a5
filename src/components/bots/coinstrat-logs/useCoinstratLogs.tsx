
import { useState, useEffect, useCallback } from 'react';
import { CoinstratSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

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

// Create a sample data set with proper ID formats and consistent data for common bot IDs
const createMockCoinstratLogs = (): CoinstratSignal[] => {
  // Generate different bot types for variety
  const botTypes = ['MY', 'PRE', 'PROP'];
  const getBotId = (index: number) => {
    // Special case for index 0-2: Always create MY-001 to ensure data is available
    if (index < 3) {
      return 'MY-001';
    }
    
    const type = botTypes[index % botTypes.length];
    const num = String(1000 + Math.floor(index / botTypes.length)).substring(1);
    return `${type}-${num}`;
  };

  // Create a set of common user IDs that will always be included
  const commonUserIds = ['USR-001', 'USR-002', 'USR-003'];
  
  // Create matching originalSignalIds for the first few signals to ensure they match
  // with TradingView logs
  const commonOriginalSignalIds = ['TV-1000', 'TV-1001', 'TV-1002'];

  // Mock implementation for CoinstratSignal logs
  return Array(10).fill(null).map((_, index) => {
    // Generate consistent bot ID for this signal - first few are always MY-001
    const botId = getBotId(index);
    
    // For the first few entries, use common originalSignalIds to match with TradingView logs
    const originalSignalId = index < 3 ? commonOriginalSignalIds[index] : `TV-${1000 + Math.floor(Math.random() * 5)}`;
    
    // Use common user IDs for first several entries to ensure they have data
    const userId = index < 3 ? commonUserIds[index % commonUserIds.length] : `USR-${1000 + index % 10}`;
    
    return {
      id: `CS-${1000 + index}`,
      originalSignalId: originalSignalId,
      action: ['ENTER_LONG', 'EXIT_LONG', 'ENTER_SHORT', 'EXIT_SHORT'][Math.floor(Math.random() * 4)] as any,
      instrument: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'][Math.floor(Math.random() * 4)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      amount: (Math.random() * 0.5 + 0.01).toFixed(3),
      status: ['Processed', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
      processingTime: Math.floor(Math.random() * 5000) + '',
      errorMessage: Math.random() > 0.8 ? 'Connection timeout or symbol issues' : undefined,
      processedAccounts: Array(Math.floor(Math.random() * 3)).fill(null).map((_, i) => ({
        accountId: `ACC-${2000 + i}`,
        userId: i === 0 ? userId : `USR-${1000 + i % 10}`, // First account always uses our target userId
        status: 'success',
        name: `Account ${2000 + i}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
      })),
      failedAccounts: Math.random() > 0.7 ? Array(Math.floor(Math.random() * 2)).fill(null).map((_, i) => ({
        accountId: `ACC-${3000 + i}`,
        userId: i === 0 ? userId : `USR-${1000 + i % 10}`, // First account always uses our target userId
        status: 'failed',
        name: `Account ${3000 + i}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
        reason: 'API key expired or invalid configuration'
      })) : [],
      signalToken: botId, // Use botId as the signalToken for easier filtering
      maxLag: `${Math.floor(Math.random() * 10) + 1}s`,
      investmentType: 'crypto'
    };
  });
};

export const useCoinstratLogs = ({
  botId,
  userId,
  refreshTrigger = false,
  skipLoadingState = false,
  initialData
}: UseCoinstratLogsProps): UseCoinstratLogsResult => {
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Use our safe loading hook
  const { loading, startLoading, stopLoading } = useSafeLoading({
    debugComponent: 'CoinstratLogs',
    skipLoadingState
  });
  
  const fetchLogs = useCallback(() => {
    try {
      startLoading();
      console.log(`Fetching Coinstrat logs for botId: ${botId}, userId: ${userId}`);
      
      // In a real app, we would fetch data from API here
      setTimeout(() => {
        try {
          // Use initialData if provided, otherwise create mock data
          const allLogs = initialData || createMockCoinstratLogs();
          console.log(`Generated ${allLogs.length} Coinstrat logs`);
          
          // Filter logs based on botId and/or userId
          let filteredLogs = [...allLogs];
          
          if (botId) {
            console.log(`Filtering Coinstrat logs by botId: ${botId}`);
            
            // More flexible filtering for botId
            filteredLogs = filteredLogs.filter(log => {
              const signalToken = log.signalToken?.toLowerCase() || '';
              const targetBotId = botId.toLowerCase();
              
              return signalToken === targetBotId || 
                     signalToken.includes(targetBotId) ||
                     log.originalSignalId.toLowerCase().includes(targetBotId);
            });
            
            console.log(`After botId filtering: ${filteredLogs.length} logs remaining`);
          }
          
          if (userId) {
            console.log(`Filtering Coinstrat logs by userId: ${userId}`);
            
            // Check if we're in admin view to modify behavior
            const isAdminView = window.location.pathname.includes('/admin/');
            
            if (isAdminView) {
              // In admin view, we might want to show all logs for the bot
              console.log('Admin view detected, showing all user logs for this bot');
            } else {
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
          
          // Debug log some sample data if available
          if (filteredLogs.length > 0) {
            console.log('Sample Coinstrat log:', JSON.stringify(filteredLogs[0]));
          } else {
            console.log('No filtered Coinstrat logs found. Check botId and userId filtering.');
          }
          
          setLogs(filteredLogs);
          setError(null);
          stopLoading();
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
