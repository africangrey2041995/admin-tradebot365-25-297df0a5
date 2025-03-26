
import React, { useState, useMemo } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { Account } from '@/types';
import { toast } from 'sonner';
import EmptyAccountsState from './EmptyAccountsState';
import LoadingAccounts from './LoadingAccounts';
import ErrorState from './ErrorState';
import AccountsFilter from './AccountsFilter';
import { organizeAccounts } from './utils/accountTransformUtils';
import { useAccountFiltering } from './hooks/useAccountFiltering';
import CSPAccountCard from './components/CSPAccountCard';

interface UserHierarchicalAccountsTableProps {
  accounts: Account[];
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
  onAddAccount?: (account: Account) => void;
  onEditAccount?: (account: Account) => void;
  onDeleteAccount?: (accountId: string) => void;
  onToggleStatus?: (accountId: string) => void;
  botType?: 'premium' | 'prop' | 'user';
}

const UserHierarchicalAccountsTable: React.FC<UserHierarchicalAccountsTableProps> = ({
  accounts,
  isLoading,
  error,
  onRefresh,
  onAddAccount,
  onEditAccount,
  onDeleteAccount,
  onToggleStatus,
  botType = 'user'
}) => {
  // Transform flat accounts list into hierarchical structure
  const organizedAccounts = useMemo(() => organizeAccounts(accounts), [accounts]);
  
  // Filter accounts based on user input
  const { filteredAccounts, handleFilterChange } = useAccountFiltering(organizedAccounts);
  
  // Calculate total number of trading accounts
  const totalTradingAccounts = useMemo(() => accounts.length, [accounts]);

  // Handle edit, delete, and toggle status actions
  const handleEdit = (account: Account) => {
    if (onEditAccount) {
      onEditAccount(account);
    } else {
      toast.info("Edit functionality will be implemented");
    }
  };

  const handleDelete = (accountId: string) => {
    if (onDeleteAccount) {
      onDeleteAccount(accountId);
    } else {
      toast.info(`Delete account ${accountId} functionality will be implemented`);
    }
  };

  const handleToggleStatus = (accountId: string) => {
    if (onToggleStatus) {
      onToggleStatus(accountId);
    } else {
      toast.info(`Toggle connection for ${accountId} functionality will be implemented`);
    }
  };

  // Create a wrapper function that doesn't need an argument
  const handleAddAccount = () => {
    if (onAddAccount) {
      // Since we're in EmptyAccountsState, we don't have an account to pass
      // We'll let the Dialog handle creating the account
      toast.info("Opening add account dialog");
    }
  };

  // Render appropriate UI based on loading/error state
  if (isLoading) {
    return <LoadingAccounts message="Đang tải tài khoản..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRefresh} />;
  }

  if (!accounts || accounts.length === 0) {
    return (
      <EmptyAccountsState 
        onRefresh={onRefresh} 
        botType={botType} 
        onAddAccount={handleAddAccount} 
      />
    );
  }

  return (
    <div className="space-y-4">
      <AccountsFilter 
        onFilterChange={handleFilterChange}
        totalAccounts={totalTradingAccounts}
      />

      <Accordion type="multiple" className="w-full space-y-2">
        {filteredAccounts.map((cspAccount) => (
          <CSPAccountCard
            key={cspAccount.cspAccountId}
            cspAccount={cspAccount}
            accounts={accounts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default UserHierarchicalAccountsTable;
