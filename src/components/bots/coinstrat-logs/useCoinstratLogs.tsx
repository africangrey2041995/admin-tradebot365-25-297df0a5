
import { useState, useEffect, useCallback, useRef } from 'react';
import { CoinstratSignal } from '@/types/signal';
import { normalizeUserId, validateUserId } from '@/utils/normalizeUserId';
import { useSafeLoading } from '@/hooks/useSafeLoading';
import { useAdmin } from '@/hooks/use-admin';

interface UseCoinstratLogsProps {
  botId: string;
  userId: string;
  initialData?: CoinstratSignal[];
  refreshTrigger?: boolean;
  skipLoadingState?: boolean; // New prop to skip internal loading state management
}

interface UseCoinstratLogsResult {
  logs: CoinstratSignal[];
  error: Error | null;
  loading: boolean;
  fetchLogs: () => void;
}

/**
 * Custom hook to fetch and process Coinstrat signal logs
 * 
 * @param botId ID of the bot (BOT-XXX, PREMIUM-XXX, PROP-XXX)
 * @param userId ID of the user, should follow the USR-XXX format
 * @param initialData Optional initial data to use instead of fetching
 * @param refreshTrigger Trigger to refresh logs when changed
 * @param skipLoadingState Skip internal loading state management if true
 * @returns Logs data, loading state, error and refresh function
 */
export const useCoinstratLogs = ({
  botId,
  userId,
  initialData = [],
  refreshTrigger = false,
  skipLoadingState = false
}: UseCoinstratLogsProps): UseCoinstratLogsResult => {
  // Use our safe loading hook instead of raw useState
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 3000,
    debugComponent: 'CoinstratLogs',
    minLoadingDurationMs: 500, // Ensure a minimum loading time to avoid flickering
    skipLoading: skipLoadingState // Skip loading state management if requested
  });
  
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const fetchInProgressRef = useRef(false);
  
  // Get admin status from useAdmin hook
  const { isAdmin } = useAdmin();

  const fetchLogs = useCallback(() => {
    // Prevent multiple concurrent fetchLogs calls
    if (fetchInProgressRef.current) {
      console.log('CoinstratLogs - Fetch already in progress, skipping duplicate request');
      return;
    }
    
    fetchInProgressRef.current = true;
    
    // For non-admin users, validate userId format
    if (!isAdmin && !validateUserId(userId)) {
      console.warn(`CoinstratLogs - Invalid userId format: ${userId}, should be in format USR-XXX`);
      // We still proceed but with a warning
    }
    
    console.log(`CoinstratLogs - Fetching logs for ${isAdmin ? 'admin' : `userId: ${userId}`} (normalized: ${normalizeUserId(userId)}), botId: ${botId}`);
    console.log(`CoinstratLogs - Admin status: ${isAdmin ? 'Yes' : 'No'}`);
    
    // Only change loading state if we're not already loading and not skipping loading state
    if (!skipLoadingState) {
      startLoading();
    }
    setError(null);
    
    try {
      // Normalize the input userId for consistent comparison
      const normalizedInputUserId = normalizeUserId(userId);
      console.log(`CoinstratLogs - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
      
      // If initialData is provided, filter and use it (with reduced delay)
      if (initialData && initialData.length > 0) {
        // Use a shorter timeout (or no timeout) for initial data to reduce flickering
        setTimeout(() => {
          try {
            // For admin users, don't filter by userId - show all logs
            const filteredLogs = isAdmin 
              ? initialData 
              : initialData.filter(log => {
                  // Check both processed and failed accounts with normalized comparison
                  const hasProcessedAccountsForUser = log.processedAccounts.some(account => {
                    if (!account.userId) {
                      console.warn(`CoinstratLogs - Processed account ${account.accountId} is missing userId`);
                      return false;
                    }
                    return normalizeUserId(account.userId) === normalizedInputUserId;
                  });
                  
                  const hasFailedAccountsForUser = log.failedAccounts.some(account => {
                    if (!account.userId) {
                      console.warn(`CoinstratLogs - Failed account ${account.accountId} is missing userId`);
                      return false;
                    }
                    return normalizeUserId(account.userId) === normalizedInputUserId;
                  });
                  
                  return hasProcessedAccountsForUser || hasFailedAccountsForUser;
                });
            
            console.log(`CoinstratLogs - Filtered logs from initialData: ${filteredLogs.length} of ${initialData.length} ${isAdmin ? '(admin: showing all)' : ''}`);
            setLogs(filteredLogs);
          } catch (err) {
            console.error('Error filtering initialData logs:', err);
            setError(err instanceof Error ? err : new Error('Failed to filter logs data'));
            setLogs([]);
          } finally {
            if (!skipLoadingState) {
              stopLoading();
            }
            fetchInProgressRef.current = false;
          }
        }, 300); // Reduced delay for initialData
        return;
      }
      
      // Otherwise use mock data
      setTimeout(() => {
        try {
          // Same mock data as before
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
                  userId: 'USR-001', // Standardized format with dash
                  name: 'Binance Spot Account',
                  timestamp: new Date().toISOString(),
                  status: 'success'
                },
                {
                  accountId: 'ACC-002',
                  userId: 'USR-001', // Standardized format with dash
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
                  userId: 'USR-001', // Standardized format with dash
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
                  userId: 'USR-002', // Standardized format with dash
                  name: 'FTX Account',
                  timestamp: new Date(Date.now() - 7200000).toISOString(),
                  reason: 'Invalid account configuration',
                  errorCode: 'ACC_CONFIG_ERROR',
                  status: 'failed'
                },
                {
                  accountId: 'ACC-004',
                  userId: 'USR-001', // Standardized format with dash
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
            // For admin users, don't filter by userId - show all logs
            const filteredLogs = isAdmin
              ? mockLogs
              : mockLogs.filter(log => {
                  // Check processed accounts with normalized comparison
                  const hasProcessedAccountsForUser = log.processedAccounts.some(account => {
                    if (!account.userId) {
                      console.warn(`CoinstratLogs - Processed account ${account.accountId} is missing userId`);
                      return false;
                    }
                    
                    const normalizedAccountUserId = normalizeUserId(account.userId);
                    const match = normalizedAccountUserId === normalizedInputUserId;
                    console.log(`CoinstratLogs - Processed account - Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
                    return match;
                  });
                  
                  // Check failed accounts with normalized comparison
                  const hasFailedAccountsForUser = log.failedAccounts.some(account => {
                    if (!account.userId) {
                      console.warn(`CoinstratLogs - Failed account ${account.accountId} is missing userId`);
                      return false;
                    }
                    
                    const normalizedAccountUserId = normalizeUserId(account.userId);
                    const match = normalizedAccountUserId === normalizedInputUserId;
                    console.log(`CoinstratLogs - Failed account - Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
                    return match;
                  });
                  
                  return hasProcessedAccountsForUser || hasFailedAccountsForUser;
                });
            
            console.log(`CoinstratLogs - Filtered logs from mockData: ${filteredLogs.length} of ${mockLogs.length} ${isAdmin ? '(admin: showing all)' : ''}`);
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
          if (!skipLoadingState) {
            stopLoading();
          }
          fetchInProgressRef.current = false;
        }
      }, 500); // Reduced from 800ms to 500ms
    } catch (error) {
      console.error('Error in fetchLogs:', error);
      setError(error instanceof Error ? error : new Error('An unexpected error occurred fetching logs'));
      setLogs([]);
      if (!skipLoadingState) {
        stopLoading();
      }
      fetchInProgressRef.current = false;
    }
  }, [botId, userId, initialData, startLoading, stopLoading, isAdmin, skipLoadingState]);

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
