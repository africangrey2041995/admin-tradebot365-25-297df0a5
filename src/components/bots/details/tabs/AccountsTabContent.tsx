
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TabHeader from './TabHeader';
import { getCardClassName, getCardHeaderClassName } from './TabStyles';
import { Account } from '@/types';
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';

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
  // Handle account operations for admin hierarchical view
  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
    // Implementation would go here
  };

  const handleDeleteAccount = (accountId: string) => {
    console.log("Delete account:", accountId);
    // Implementation would go here
  };

  const handleToggleConnection = (accountId: string) => {
    console.log("Toggle connection:", accountId);
    // Implementation would go here
  };

  const handleRefresh = () => {
    console.log("Refreshing accounts data");
    // Implementation would go here
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
            accounts={accountsData || []}
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
