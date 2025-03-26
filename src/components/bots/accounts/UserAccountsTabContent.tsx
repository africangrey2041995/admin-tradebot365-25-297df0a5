
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TabHeader from '../details/tabs/TabHeader';
import { getCardClassName, getCardHeaderClassName } from '../details/tabs/TabStyles';
import { Account } from '@/types';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import UserHierarchicalAccountsTable from './UserHierarchicalAccountsTable';
import AccountManagementDialog from './AccountManagementDialog';
import { useState } from 'react';

interface UserAccountsTabContentProps {
  botId: string;
  userId: string;
  botType: 'premium' | 'prop' | 'user';
  title: string;
  description: string;
  accountsData?: Account[];
  isLoading?: boolean;
}

const UserAccountsTabContent: React.FC<UserAccountsTabContentProps> = ({
  botId,
  userId,
  botType,
  title,
  description,
  accountsData,
  isLoading = false
}) => {
  // Dialogs state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Use the bot accounts hook to get data
  const {
    accounts,
    loading,
    error,
    handleRefresh,
    addAccount,
    updateAccount,
    deleteAccount,
    toggleAccountStatus,
    isAddingAccount,
    isUpdatingAccount
  } = useBotAccounts(botId, userId, accountsData || [], botType);

  // Handle adding a new account
  const handleAddAccount = () => {
    setSelectedAccount(null);
    setIsAddDialogOpen(true);
  };

  // Handle editing an account
  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
    setIsEditDialogOpen(true);
  };

  // Handle form submissions
  const handleAddSubmit = (formData: any) => {
    addAccount(formData);
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (formData: any) => {
    updateAccount(formData);
    setIsEditDialogOpen(false);
  };

  return (
    <Card className={getCardClassName(botType)}>
      <CardHeader className={getCardHeaderClassName(botType)}>
        <TabHeader title={title} description={description} botType={botType} />
      </CardHeader>
      <CardContent>
        <UserHierarchicalAccountsTable 
          accounts={accounts}
          isLoading={loading || isLoading}
          error={error}
          onRefresh={handleRefresh}
          onAddAccount={handleAddAccount}
          onEditAccount={handleEditAccount}
          onDeleteAccount={deleteAccount}
          onToggleStatus={toggleAccountStatus}
          botType={botType}
        />
        
        {/* Add Account Dialog */}
        <AccountManagementDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddSubmit}
          mode="add"
          isSubmitting={isAddingAccount}
        />
        
        {/* Edit Account Dialog */}
        <AccountManagementDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          account={selectedAccount}
          onSubmit={handleEditSubmit}
          mode="edit"
          isSubmitting={isUpdatingAccount}
        />
      </CardContent>
    </Card>
  );
};

export default UserAccountsTabContent;
