
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Account } from '@/types';
import { useSafeLoading } from '@/hooks/useSafeLoading';
import { normalizeUserId, validateUserId } from '@/utils/normalizeUserId';
import { useNavigate } from 'react-router-dom';

/**
 * Mock data for bot accounts with standardized userId format (USR-XXX)
 */
const mockAccounts: Account[] = [
  {
    cspAccountId: 'ACC001',
    cspAccountName: 'Trading Account 1',
    userAccount: 'Primary Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccountNumber: '4056629',
    tradingAccountId: '40819726',
    tradingAccountType: 'HEDGED',
    tradingAccountBalance: '$500',
    status: 'Connected',
    createdDate: new Date(2023, 5, 15).toISOString(),
    lastUpdated: new Date(2023, 11, 20).toISOString(),
    cspUserId: 'USR-001',
    isLive: false
  },
  {
    cspAccountId: 'ACC002',
    cspAccountName: 'Trading Account 2',
    userAccount: 'Secondary Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccountNumber: '4056789',
    tradingAccountId: '40819727',
    tradingAccountType: 'HEDGED',
    tradingAccountBalance: '$1000',
    status: 'Connected',
    createdDate: new Date(2023, 6, 22).toISOString(),
    lastUpdated: new Date(2023, 10, 5).toISOString(),
    cspUserId: 'USR-001',
    isLive: true
  },
  {
    cspAccountId: 'ACC003',
    cspAccountName: 'Demo Account',
    userAccount: 'Test Account',
    cspUserEmail: 'test@example.com',
    apiName: 'Coinbase API',
    apiId: 'API002',
    tradingAccountNumber: '4044856',
    tradingAccountId: '40819728',
    tradingAccountType: 'NETTED',
    tradingAccountBalance: '$10000',
    status: 'Disconnected',
    createdDate: new Date(2023, 7, 10).toISOString(),
    lastUpdated: new Date(2023, 9, 18).toISOString(),
    cspUserId: 'USR-002',
    isLive: false
  },
];

interface UseBotAccountsProps {
  botId: string;
  userId: string;
  initialData?: Account[];
}

interface UseBotAccountsReturn {
  accounts: Account[];
  loading: boolean;
  error: Error | null;
  fetchAccounts: () => void;
  handleRefresh: () => void;
  handleViewUserDetails: () => void;
}

/**
 * Hook to manage and fetch bot account data
 * 
 * @param botId Bot ID (BOT-XXX, PREMIUM-XXX, PROP-XXX)
 * @param userId User ID (normalized to USR-XXX)
 * @param initialData Initial account data (optional)
 * @returns Account data and management functions
 */
export function useBotAccounts(
  botId: string, 
  userId: string, 
  initialData: Account[] = []
): UseBotAccountsReturn {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 3000,
    initialState: true,
    debugComponent: 'BotAccountsTable'
  });

  // Filter accounts based on normalized userId
  const filterAccountsByUserId = useCallback((accountsData: Account[], normalizedUserId: string) => {
    return accountsData.filter(account => {
      if (!account.cspUserId) {
        console.warn(`BotAccountsTable - Account ${account.cspAccountId} is missing cspUserId`);
        return false;
      }
      
      const normalizedAccountUserId = normalizeUserId(account.cspUserId);
      const match = normalizedAccountUserId === normalizedUserId;
      console.log(`Comparing: ${account.cspUserId} (${normalizedAccountUserId}) with ${userId} (${normalizedUserId}) - Match: ${match}`);
      return match;
    });
  }, [userId]);

  // Fetch accounts data
  const fetchAccounts = useCallback(() => {
    // Validate userId before processing
    if (!validateUserId(userId)) {
      console.warn(`BotAccountsTable - Invalid userId format: ${userId}, should be in format USR-XXX`);
      // We still proceed but with a warning
    }
    
    console.log(`BotAccountsTable - Fetching accounts for userId: ${userId} (normalized: ${normalizeUserId(userId)})`);
    startLoading();
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      try {
        if (!userId) {
          console.error('BotAccountsTable - No userId provided for filtering accounts');
          setAccounts([]);
          return;
        }
        
        // Use normalizeUserId for standardization
        const normalizedInputUserId = normalizeUserId(userId);
        console.log(`BotAccountsTable - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
        
        // Log available userIds for debugging
        const dataSource = initialData.length > 0 ? initialData : mockAccounts;
        const availableUserIds = dataSource.map(acc => 
          `${acc.cspUserId} (normalized: ${normalizeUserId(acc.cspUserId)})`
        );
        
        console.log(`BotAccountsTable - Available userIds: ${availableUserIds.join(', ')}`);
        
        // Filter accounts based on normalized userId
        let filteredAccounts: Account[] = [];
        
        if (initialData && initialData.length > 0) {
          console.log(`BotAccountsTable - Using initialData, before filtering: ${initialData.length} accounts`);
          filteredAccounts = filterAccountsByUserId(initialData, normalizedInputUserId);
          console.log(`BotAccountsTable - Filtered accounts from initialData: ${filteredAccounts.length}`);
        } else {
          console.log(`BotAccountsTable - Using mockData, before filtering: ${mockAccounts.length} accounts`);
          filteredAccounts = filterAccountsByUserId(mockAccounts, normalizedInputUserId);
          console.log(`BotAccountsTable - Filtered accounts from mockData: ${filteredAccounts.length}`);
        }
        
        setAccounts(filteredAccounts);
      } catch (err) {
        console.error('Error processing accounts data:', err);
        setError(err instanceof Error ? err : new Error('An error occurred while processing accounts'));
        setAccounts([]);
      } finally {
        stopLoading();
      }
    }, 800);
  }, [botId, userId, initialData, startLoading, stopLoading, filterAccountsByUserId]);

  // Handle refresh action
  const handleRefresh = () => {
    toast.info('Refreshing accounts data...');
    fetchAccounts();
  };

  // Handle view user details action
  const handleViewUserDetails = () => {
    try {
      navigate('/profile');
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Error navigating to profile');
    }
  };

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    handleRefresh,
    handleViewUserDetails
  };
}
