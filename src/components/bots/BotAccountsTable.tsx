
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Account } from '@/types';
import { toast } from 'sonner';
import AccountsTable from './accounts/AccountsTable';
import LoadingAccounts from './accounts/LoadingAccounts';
import EmptyAccountsState from './accounts/EmptyAccountsState';
import ErrorState from './accounts/ErrorState';
import { normalizeUserId } from '@/utils/normalizeUserId';
import { useSafeLoading } from '@/hooks/useSafeLoading';

interface BotAccountsTableProps {
  botId: string;
  userId: string;
  initialData?: Account[];
  refreshTrigger?: boolean;
  botType?: 'premium' | 'prop' | 'user';
}

const mockAccounts: Account[] = [
  {
    id: 'ACC001',
    name: 'Trading Account 1',
    userAccount: 'Primary Account',
    userEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccount: '4056629',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$500',
    status: 'Connected',
    createdDate: new Date(2023, 5, 15).toISOString(),
    lastUpdated: new Date(2023, 11, 20).toISOString(),
    userId: 'USR-001' // Standardized to USR-001 format with dash
  },
  {
    id: 'ACC002',
    name: 'Trading Account 2',
    userAccount: 'Secondary Account',
    userEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccount: '4056789',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$1000',
    status: 'Connected',
    createdDate: new Date(2023, 6, 22).toISOString(),
    lastUpdated: new Date(2023, 10, 5).toISOString(),
    userId: 'USR-001' // Standardized to USR-001 format with dash
  },
  {
    id: 'ACC003',
    name: 'Demo Account',
    userAccount: 'Test Account',
    userEmail: 'test@example.com',
    apiName: 'Coinbase API',
    apiId: 'API002',
    tradingAccount: '4044856',
    tradingAccountType: 'Demo',
    tradingAccountBalance: '$10000',
    status: 'Disconnected',
    createdDate: new Date(2023, 7, 10).toISOString(),
    lastUpdated: new Date(2023, 9, 18).toISOString(),
    userId: 'USR-002' // Standardized to USR-002 format with dash
  },
];

const BotAccountsTable = ({ 
  botId, 
  userId, 
  initialData = [], 
  refreshTrigger = false,
  botType = 'user'
}: BotAccountsTableProps) => {
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
          
          // Use our new normalizeUserId utility
          const normalizedInputUserId = normalizeUserId(userId);
          console.log(`BotAccountsTable - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
          
          // Log all available userIds for debugging
          const availableUserIds = initialData.length > 0 
            ? initialData.map(acc => `${acc.userId} (normalized: ${normalizeUserId(acc.userId)})`)
            : mockAccounts.map(acc => `${acc.userId} (normalized: ${normalizeUserId(acc.userId)})`);
          
          console.log(`BotAccountsTable - Available userIds: ${availableUserIds.join(', ')}`);
          
          try {
            if (initialData && initialData.length > 0) {
              console.log(`BotAccountsTable - Using initialData, before filtering: ${initialData.length} accounts`);
              
              // Use normalized comparison with our utility
              const filteredAccounts = initialData.filter(account => {
                const normalizedAccountUserId = normalizeUserId(account.userId);
                const match = normalizedAccountUserId === normalizedInputUserId;
                console.log(`Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
                return match;
              });
              
              console.log(`BotAccountsTable - Filtered accounts from initialData: ${filteredAccounts.length}`);
              setAccounts(filteredAccounts);
            } else {
              console.log(`BotAccountsTable - Using mockData, before filtering: ${mockAccounts.length} accounts`);
              
              // Use normalized comparison with our utility
              const filteredAccounts = mockAccounts.filter(account => {
                const normalizedAccountUserId = normalizeUserId(account.userId);
                const match = normalizedAccountUserId === normalizedInputUserId;
                console.log(`Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
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

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (refreshTrigger) {
      console.log('BotAccountsTable - Refresh triggered from parent');
      fetchAccounts();
    }
  }, [refreshTrigger, fetchAccounts]);

  const handleViewUserDetails = () => {
    try {
      navigate('/profile');
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Error navigating to profile');
    }
  };

  const handleRefresh = () => {
    toast.info('Refreshing accounts data...');
    fetchAccounts();
  };

  console.log(`BotAccountsTable - Render state: loading=${loading}, accounts=${accounts.length}, error=${error !== null}`);

  if (loading) {
    return <LoadingAccounts message="Đang tải tài khoản..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} />;
  }

  if (!accounts || accounts.length === 0) {
    return <EmptyAccountsState onRefresh={handleRefresh} botType={botType} />;
  }

  return (
    <div>
      <AccountsTable accounts={accounts} />
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Accounts
        </Button>
      </div>
    </div>
  );
};

export default BotAccountsTable;
