
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import AccountsTable from './accounts/AccountsTable';
import LoadingAccounts from './accounts/LoadingAccounts';
import EmptyAccountsState from './accounts/EmptyAccountsState';
import ErrorState from './accounts/ErrorState';
import { useBotAccounts } from '@/hooks/useBotAccounts';

interface BotAccountsTableProps {
  botId: string;
  userId: string;
  initialData?: any[];
  refreshTrigger?: boolean;
  botType?: 'premium' | 'prop' | 'user';
}

const BotAccountsTable = ({ 
  botId, 
  userId, 
  initialData = [], 
  refreshTrigger = false,
  botType = 'user'
}: BotAccountsTableProps) => {
  const { 
    accounts, 
    loading, 
    error, 
    fetchAccounts, 
    handleRefresh 
  } = useBotAccounts(botId, userId, initialData);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (refreshTrigger) {
      console.log('BotAccountsTable - Refresh triggered from parent');
      fetchAccounts();
    }
  }, [refreshTrigger, fetchAccounts]);

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
