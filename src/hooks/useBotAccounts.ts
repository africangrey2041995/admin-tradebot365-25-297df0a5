
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Account } from '@/types';
import { useSafeLoading } from '@/hooks/useSafeLoading';
import { normalizeUserId } from '@/utils/normalizeUserId';
import { useNavigate } from 'react-router-dom';

// Mock data for bot accounts with standardized userId format
const mockAccounts: Account[] = [
  {
    cspAccountId: 'ACC001',
    cspAccountName: 'Trading Account 1',
    userAccount: 'Primary Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccount: '4056629',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$500',
    status: 'Connected',
    createdDate: new Date(2023, 5, 15).toISOString(),
    lastUpdated: new Date(2023, 11, 20).toISOString(),
    cspUserId: 'USR-001' // Standardized to USR-001 format with dash
  },
  {
    cspAccountId: 'ACC002',
    cspAccountName: 'Trading Account 2',
    userAccount: 'Secondary Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccount: '4056789',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$1000',
    status: 'Connected',
    createdDate: new Date(2023, 6, 22).toISOString(),
    lastUpdated: new Date(2023, 10, 5).toISOString(),
    cspUserId: 'USR-001' // Standardized to USR-001 format with dash
  },
  {
    cspAccountId: 'ACC003',
    cspAccountName: 'Demo Account',
    userAccount: 'Test Account',
    cspUserEmail: 'test@example.com',
    apiName: 'Coinbase API',
    apiId: 'API002',
    tradingAccount: '4044856',
    tradingAccountType: 'Demo',
    tradingAccountBalance: '$10000',
    status: 'Disconnected',
    createdDate: new Date(2023, 7, 10).toISOString(),
    lastUpdated: new Date(2023, 9, 18).toISOString(),
    cspUserId: 'USR-002' // Standardized to USR-002 format with dash
  },
];

export function useBotAccounts(botId: string, userId: string, initialData: Account[] = []) {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Use our safe loading hook instead of raw useState
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 3000,
    initialState: true,
    debugComponent: 'BotAccountsTable'
  });

  const fetchAccounts = useCallback(() => {
    console.log(`BotAccountsTable - Fetching accounts for userId: ${userId}`);
    startLoading();
    setError(null);
    
    try {
      setTimeout(() => {
        try {
          if (!userId) {
            console.error('BotAccountsTable - No userId provided for filtering accounts');
            stopLoading();
            setAccounts([]);
            return;
          }
          
          // Use normalizeUserId utility
          const normalizedInputUserId = normalizeUserId(userId);
          console.log(`BotAccountsTable - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
          
          // Log all available userIds for debugging
          const availableUserIds = initialData.length > 0 
            ? initialData.map(acc => `${acc.cspUserId} (normalized: ${normalizeUserId(acc.cspUserId)})`)
            : mockAccounts.map(acc => `${acc.cspUserId} (normalized: ${normalizeUserId(acc.cspUserId)})`);
          
          console.log(`BotAccountsTable - Available userIds: ${availableUserIds.join(', ')}`);
          
          try {
            if (initialData && initialData.length > 0) {
              console.log(`BotAccountsTable - Using initialData, before filtering: ${initialData.length} accounts`);
              
              // Use normalized comparison with our utility
              const filteredAccounts = initialData.filter(account => {
                const normalizedAccountUserId = normalizeUserId(account.cspUserId);
                const match = normalizedAccountUserId === normalizedInputUserId;
                console.log(`Comparing: ${account.cspUserId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
                return match;
              });
              
              console.log(`BotAccountsTable - Filtered accounts from initialData: ${filteredAccounts.length}`);
              setAccounts(filteredAccounts);
            } else {
              console.log(`BotAccountsTable - Using mockData, before filtering: ${mockAccounts.length} accounts`);
              
              // Use normalized comparison with our utility
              const filteredAccounts = mockAccounts.filter(account => {
                const normalizedAccountUserId = normalizeUserId(account.cspUserId);
                const match = normalizedAccountUserId === normalizedInputUserId;
                console.log(`Comparing: ${account.cspUserId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
                return match;
              });
              
              console.log(`BotAccountsTable - Filtered accounts from mockData: ${filteredAccounts.length}`);
              setAccounts(filteredAccounts);
            }
          } catch (filterErr) {
            console.error('Error filtering accounts:', filterErr);
            setError(filterErr instanceof Error ? filterErr : new Error('Error filtering accounts data'));
            setAccounts([]);
          }
        } catch (innerError) {
          console.error('Error processing accounts data:', innerError);
          setError(innerError instanceof Error ? innerError : new Error('An error occurred while processing accounts'));
          setAccounts([]);
        } finally {
          // Always set loading to false regardless of success or error
          stopLoading();
        }
      }, 800);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      stopLoading();
    }
  }, [botId, userId, initialData, startLoading, stopLoading]);

  const handleRefresh = () => {
    toast.info('Refreshing accounts data...');
    fetchAccounts();
  };

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
