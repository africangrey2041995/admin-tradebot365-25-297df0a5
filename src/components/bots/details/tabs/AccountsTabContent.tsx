
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TabHeader from './TabHeader';
import { getCardClassName, getCardHeaderClassName } from './TabStyles';
import { Account } from '@/types';
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import { toast } from 'sonner';

interface AccountsTabContentProps {
  botId: string;
  userId: string;
  botType: 'premium' | 'prop' | 'user';
  title: string;
  description: string;
  accountsData?: Account[];
  isLoading?: boolean;
  isAdminView?: boolean;
}

const AccountsTabContent: React.FC<AccountsTabContentProps> = ({
  botId,
  userId,
  botType,
  title,
  description,
  accountsData,
  isLoading = false,
  isAdminView = false
}) => {
  // Use the bot accounts hook to get data for both admin and user views
  const {
    accounts,
    handleRefresh,
    updateAccount,
    deleteAccount,
    toggleAccountStatus,
    hierarchicalAccounts, // Use the transformed hierarchical data
    hierarchicalData
  } = useBotAccounts(botId, userId, accountsData || [], botType);

  // Handle account operations for admin hierarchical view
  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
    toast.info(`Editing account: ${account.cspAccountName}`);
    updateAccount(account);
  };

  const handleDeleteAccount = (accountId: string) => {
    console.log("Delete account:", accountId);
    toast.info(`Deleting account: ${accountId}`);
    deleteAccount(accountId);
  };

  const handleToggleConnection = (accountId: string) => {
    console.log("Toggle connection:", accountId);
    toast.info(`Toggling connection for account: ${accountId}`);
    toggleAccountStatus(accountId);
  };

  return (
    <Card className={getCardClassName(botType)}>
      <CardHeader className={getCardHeaderClassName(botType)}>
        <TabHeader title={title} description={description} botType={botType} />
      </CardHeader>
      <CardContent>
        {isAdminView ? (
          // Use hierarchical view for admin
          <HierarchicalAccountsTable 
            accounts={accounts}
            onRefresh={handleRefresh}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
            onToggleConnection={handleToggleConnection}
          />
        ) : (
          // Use regular accounts table for user view
          <BotAccountsTable 
            botId={botId} 
            userId={userId} 
            initialData={accountsData}
            botType={botType}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AccountsTabContent;
