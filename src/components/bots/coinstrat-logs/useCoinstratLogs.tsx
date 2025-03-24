import { useState, useEffect, useCallback } from 'react';
import { CoinstratSignal } from '@/types/signal';
import { normalizeUserId } from '@/utils/normalizeUserId';
import { useSafeLoading } from '@/hooks/useSafeLoading';

interface UseCoinstratLogsProps {
  botId: string;
  userId: string;
  initialData?: CoinstratSignal[];
  refreshTrigger?: boolean;
}

interface UseCoinstratLogsResult {
  logs: CoinstratSignal[];
  error: Error | null;
  loading: boolean;
  fetchLogs: () => void;
}

export const useCoinstratLogs = ({
  botId,
  userId,
  initialData = [],
  refreshTrigger = false
}: UseCoinstratLogsProps): UseCoinstratLogsResult => {
  // Use our safe loading hook instead of raw useState
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 3000,
    debugComponent: 'CoinstratLogs'
  });
  
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchLogs = useCallback(() => {
    console.log(`CoinstratLogs - Fetching logs for userId: ${userId}, botId: ${botId}`);
    startLoading();
    setError(null);
    
    try {
      // Normalize the input userId for consistent comparison
      const normalizedInputUserId = normalizeUserId(userId);
      console.log(`CoinstratLogs - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
      
      // If initialData is provided, filter and use it
      if (initialData && initialData.length > 0) {
        try {
          const filteredLogs = initialData.filter(log => {
            // Check both processed and failed accounts with normalized comparison
            const hasProcessedAccountsForUser = log.processedAccounts.some(account => 
              normalizeUserId(account.userId) === normalizedInputUserId
            );
            
            const hasFailedAccountsForUser = log.failedAccounts.some(account => 
              normalizeUserId(account.userId) === normalizedInputUserId
            );
            
            return hasProcessedAccountsForUser || hasFailedAccountsForUser;
          });
          
          console.log(`CoinstratLogs - Filtered logs from initialData: ${filteredLogs.length} of ${initialData.length}`);
          setLogs(filteredLogs);
        } catch (err) {
          console.error('Error filtering initialData logs:', err);
          setError(err instanceof Error ? err : new Error('Failed to filter logs data'));
          setLogs([]);
        } finally {
          stopLoading();
        }
        return;
      }
      
      // Otherwise use mock data
      setTimeout(() => {
        try {
          const mockLogs: CoinstratSignal[] = [
            {
              id: 'CSP-78952364',
              originalSignalId: 'SIG001',
              action: 'ENTER_LONG',
              instrument: 'BTCUSDT',
              timestamp: new Date().toISOString(),
              signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
              maxLag: '5s',
              investmentType: 'crypto',
              amount: '1.5',
              status: 'Processed',
              processedAccounts: [
                {
                  accountId: 'ACC-001',
                  userId: 'USR-001', // Standardized to USR-001 format with dash
                  name: 'Binance Spot Account',
                  timestamp: new Date().toISOString(),
                  status: 'success'
                },
                {
                  accountId: 'ACC-002',
                  userId: 'USR-001', // Standardized to USR-001 format with dash
                  name: 'Coinstart Pro Account',
                  timestamp: new Date().toISOString(),
                  status: 'success'
                }
              ],
              failedAccounts: []
            },
            {
              id: 'CSP-78956789',
              originalSignalId: 'SIG002',
              action: 'EXIT_LONG',
              instrument: 'ETHUSDT',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
              maxLag: '5s',
              investmentType: 'crypto',
              amount: '2.3',
              status: 'Processed',
              processedAccounts: [
                {
                  accountId: 'ACC-001',
                  userId: 'USR-001', // Standardized to USR-001 format with dash
                  name: 'Binance Spot Account',
                  timestamp: new Date(Date.now() - 3600000).toISOString(),
                  status: 'success'
                }
              ],
              failedAccounts: []
            },
            {
              id: 'CSP-78959012',
              originalSignalId: 'SIG003',
              action: 'ENTER_SHORT',
              instrument: 'SOLUSDT',
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
              maxLag: '5s',
              investmentType: 'crypto',
              amount: '3.7',
              status: 'Failed',
              processedAccounts: [],
              failedAccounts: [
                {
                  accountId: 'ACC-003',
                  userId: 'USR-002', // Standardized to USR-002 format with dash
                  name: 'FTX Account',
                  timestamp: new Date(Date.now() - 7200000).toISOString(),
                  reason: 'Invalid account configuration',
                  errorCode: 'ACC_CONFIG_ERROR',
                  status: 'failed'
                },
                {
                  accountId: 'ACC-004',
                  userId: 'USR-001', // Standardized to USR-001 format with dash
                  name: 'Bybit Account',
                  timestamp: new Date(Date.now() - 7200000).toISOString(),
                  reason: 'API key expired',
                  errorCode: 'API_KEY_EXPIRED',
                  status: 'failed'
                }
              ],
              errorMessage: 'Invalid account configuration'
            },
          ];
          
          try {
            const filteredLogs = mockLogs.filter(log => {
              // Check processed accounts with normalized comparison
              const hasProcessedAccountsForUser = log.processedAccounts.some(account => {
                const normalizedAccountUserId = normalizeUserId(account.userId);
                const match = normalizedAccountUserId === normalizedInputUserId;
                console.log(`CoinstratLogs - Processed account - Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
                return match;
              });
              
              // Check failed accounts with normalized comparison
              const hasFailedAccountsForUser = log.failedAccounts.some(account => {
                const normalizedAccountUserId = normalizeUserId(account.userId);
                const match = normalizedAccountUserId === normalizedInputUserId;
                console.log(`CoinstratLogs - Failed account - Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
                return match;
              });
              
              return hasProcessedAccountsForUser || hasFailedAccountsForUser;
            });
            
            console.log(`CoinstratLogs - Filtered logs from mockData: ${filteredLogs.length} of ${mockLogs.length}`);
            setLogs(filteredLogs);
          } catch (filterErr) {
            console.error('Error filtering mock logs data:', filterErr);
            setError(filterErr instanceof Error ? filterErr : new Error('Failed to filter mock logs data'));
            setLogs([]);
          }
        } catch (mockErr) {
          console.error('Error processing mock logs:', mockErr);
          setError(mockErr instanceof Error ? mockErr : new Error('Failed to process mock logs data'));
          setLogs([]);
        } finally {
          stopLoading();
        }
      }, 800);
    } catch (error) {
      console.error('Error in fetchLogs:', error);
      setError(error instanceof Error ? error : new Error('An unexpected error occurred fetching logs'));
      setLogs([]);
      stopLoading();
    }
  }, [botId, userId, initialData, startLoading, stopLoading]);

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
    error,
    loading,
    fetchLogs
  };
};
