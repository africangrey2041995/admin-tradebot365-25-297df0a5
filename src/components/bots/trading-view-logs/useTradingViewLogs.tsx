
import { useState, useEffect, useCallback } from 'react';
import { TradingViewSignal } from '@/types/signal';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

// Create a sample data set with proper ID formats and consistent data for common bot IDs
const createMockTradeViewLogs = (): TradingViewSignal[] => {
  // Generate different bot types for variety
  const botTypes = ['MY', 'PRE', 'PROP'];
  const getBotId = (index: number) => {
    // Special case for index 0-2: Always create MY-001 to ensure data is available
    if (index < 3) {
      return 'MY-001';
    }
    
    const type = botTypes[(index % botTypes.length)];
    const num = String(1000 + Math.floor(index / botTypes.length)).substring(1);
    return `${type}-${num}`;
  };

  // Create a set of common user IDs that will always be included
  const commonUserIds = ['USR-001', 'USR-002', 'USR-003'];

  return Array(15)
    .fill(null)
    .map((_, index) => {
      // Generate consistent bot ID for this signal
      const botId = getBotId(index);
      
      // Use common user IDs for first several entries to ensure they have data
      // This ensures MY-001 bot always has signals for USR-001
      const userId = index < 3 ? commonUserIds[index % commonUserIds.length] : `USR-${1000 + index % 10}`;
      
      return {
        id: `TV-${1000 + index}`,
        action: ['ENTER_LONG', 'EXIT_LONG', 'ENTER_SHORT', 'EXIT_SHORT'][Math.floor(Math.random() * 4)] as any,
        instrument: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'][Math.floor(Math.random() * 4)],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
        signalToken: botId, // Use botId directly as the signalToken for easier filtering
        maxLag: (Math.floor(Math.random() * 5) + 1) * 60 + '',
        investmentType: 'contract',
        amount: (Math.random() * 0.5 + 0.01).toFixed(3),
        status: ['Processed', 'Pending', 'Failed', 'Sent'][Math.floor(Math.random() * 4)],
        processingTime: Math.floor(Math.random() * 5000) + '',
        errorMessage: Math.random() > 0.8 ? 'Connection timeout or symbol issues' : undefined,
        botId: botId, // Set the botId property explicitly 
        userId: userId, // Consistent userId format
      };
    });
};

interface UseTradingViewLogsProps {
  botId?: string;
  userId?: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean;
  initialData?: TradingViewSignal[];
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
  initialData
}: UseTradingViewLogsProps): UseTradingViewLogsResult => {
  const [logs, setLogs] = useState<TradingViewSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Use our safe loading hook
  const { loading, startLoading, stopLoading } = useSafeLoading({
    debugComponent: 'TradingViewLogs',
    skipLoadingState
  });
  
  const fetchLogs = useCallback(() => {
    try {
      startLoading();
      console.log(`Fetching TradingView logs for botId: ${botId}, userId: ${userId}`);
      
      // In a real app, we would fetch data from API here
      setTimeout(() => {
        try {
          const allLogs = initialData || createMockTradeViewLogs();
          console.log(`Generated ${allLogs.length} TradingView logs`);
          
          // Filter logs based on botId and/or userId
          let filteredLogs = [...allLogs];
          
          if (botId) {
            console.log(`Filtering TradingView logs by botId: ${botId}`);
            
            // More flexible filtering that checks multiple fields
            filteredLogs = filteredLogs.filter(log => {
              const signalToken = log.signalToken?.toLowerCase() || '';
              const logBotId = log.botId?.toLowerCase() || '';
              const targetBotId = botId.toLowerCase();
              
              return signalToken === targetBotId || 
                     logBotId === targetBotId ||
                     signalToken.includes(targetBotId) ||
                     logBotId.includes(targetBotId);
            });
            
            console.log(`After botId filtering: ${filteredLogs.length} logs remaining`);
          }
          
          if (userId) {
            console.log(`Filtering TradingView logs by userId: ${userId}`);
            
            // Check if we're in admin view to modify behavior
            const isAdminView = window.location.pathname.includes('/admin/');
            
            if (isAdminView) {
              // In admin view, we want to show all logs for the bot, regardless of user
              console.log('Admin view detected, showing all user logs for this bot');
            } else {
              // More flexible user ID filtering
              filteredLogs = filteredLogs.filter(log => {
                const logUserId = log.userId?.toLowerCase() || '';
                const targetUserId = userId.toLowerCase();
                
                return logUserId === targetUserId || logUserId.includes(targetUserId);
              });
            }
            
            console.log(`After userId filtering: ${filteredLogs.length} logs remaining`);
          }
          
          console.log(`TradingView logs filtered: ${filteredLogs.length} results for botId: ${botId}, userId: ${userId}`);
          
          // Debug log some sample data if available
          if (filteredLogs.length > 0) {
            console.log('Sample TradingView log:', JSON.stringify(filteredLogs[0]));
          } else {
            console.log('No filtered TradingView logs found. Check botId and userId filtering.');
          }
          
          setLogs(filteredLogs);
          setError(null);
          stopLoading();
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
