
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

interface BotAccountsTableProps {
  botId: string;
  userId: string;
  initialData?: Account[];
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
    userId: 'USR-001'
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
    userId: 'USR-001'
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
    userId: 'USR-002'
  },
];

const BotAccountsTable = ({ botId, userId, initialData = [] }: BotAccountsTableProps) => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = useCallback(() => {
    setLoading(true);
    setError(null);
    
    if (initialData && initialData.length > 0) {
      const filteredAccounts = initialData.filter(account => account.userId === userId);
      setAccounts(filteredAccounts);
      setLoading(false);
      return;
    }
    
    try {
      setTimeout(() => {
        try {
          const filteredAccounts = mockAccounts.filter(account => account.userId === userId);
          setAccounts(filteredAccounts);
          setLoading(false);
        } catch (innerError) {
          console.error('Error processing accounts data:', innerError);
          setError(innerError instanceof Error ? innerError : new Error('An error occurred while processing accounts'));
          setLoading(false);
          toast.error('Error loading account information');
        }
      }, 800);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setLoading(false);
      toast.error('Error fetching account information');
    }
  }, [botId, userId, initialData]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

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

  if (loading) {
    return <LoadingAccounts />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} />;
  }

  if (accounts.length === 0) {
    return <EmptyAccountsState />;
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
