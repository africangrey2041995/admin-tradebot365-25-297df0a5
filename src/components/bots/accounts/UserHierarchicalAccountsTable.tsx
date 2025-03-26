
import React, { useState } from 'react';
import { useAccountFiltering } from '../hooks/useAccountFiltering';
import { organizeAccounts } from './utils/accountTransformUtils';
import { Account } from '@/types';
import AccountsHeader from './components/AccountsHeader';
import AccountsFilter from './AccountsFilter';
import LoadingAccounts from './LoadingAccounts';
import ErrorState from './ErrorState';
import EmptyAccountsState from './EmptyAccountsState';
import AddAccountDialog from './components/AddAccountDialog';
import { toast } from 'sonner';
import CSPAccountCard from './components/CSPAccountCard';

interface UserHierarchicalAccountsTableProps {
  accounts: Account[];
  isLoading?: boolean;
  error?: Error | null;
  onRefresh: () => void;
  onAddAccount: (account: Account) => void;
  onEditAccount: (account: Account) => void;
  onDeleteAccount: (accountId: string) => void;
  onToggleStatus: (accountId: string) => void;
  botType?: 'premium' | 'prop' | 'user';
}

const UserHierarchicalAccountsTable = ({
  accounts,
  isLoading = false,
  error = null,
  onRefresh,
  onAddAccount,
  onEditAccount,
  onDeleteAccount,
  onToggleStatus,
  botType = 'user'
}: UserHierarchicalAccountsTableProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Transform flat accounts into hierarchical structure
  const cspAccounts = organizeAccounts(accounts);
  
  // Use our filtering hook
  const { filters, filteredAccounts, handleFilterChange } = useAccountFiltering(cspAccounts);
  
  if (isLoading) {
    return <LoadingAccounts message="Đang tải tài khoản..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRefresh} />;
  }

  if (!accounts || accounts.length === 0) {
    return (
      <>
        <EmptyAccountsState 
          onRefresh={onRefresh} 
          botType={botType} 
          onAddAccount={() => setIsAddDialogOpen(true)} 
        />
        
        <AddAccountDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAddAccount={onAddAccount}
        />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <AccountsHeader 
        onAddAccount={() => setIsAddDialogOpen(true)} 
        onRefresh={onRefresh} 
      />
      
      <AccountsFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <div className="space-y-4">
        {filteredAccounts.map(cspAccount => (
          <CSPAccountCard
            key={cspAccount.cspAccountId}
            cspAccount={cspAccount}
            onEdit={(account: Account) => onEditAccount(account)}
            onDelete={(accountId: string) => onDeleteAccount(accountId)}
            onToggleStatus={(accountId: string) => onToggleStatus(accountId)}
          />
        ))}
      </div>
      
      <AddAccountDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddAccount={onAddAccount}
      />
    </div>
  );
};

export default UserHierarchicalAccountsTable;
