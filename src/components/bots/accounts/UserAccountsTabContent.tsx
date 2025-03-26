
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TabHeader from '../details/tabs/TabHeader';
import { getCardClassName, getCardHeaderClassName } from '../details/tabs/TabStyles';
import { Account } from '@/types';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import UserHierarchicalAccountsTable from './UserHierarchicalAccountsTable';

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
  // Use the bot accounts hook to get data
  const {
    accounts,
    loading,
    error,
    handleRefresh,
    addAccount,
    updateAccount,
    deleteAccount,
    toggleAccountStatus
  } = useBotAccounts(botId, userId, accountsData || [], botType);

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
          onEditAccount={updateAccount}
          onDeleteAccount={deleteAccount}
          onToggleStatus={toggleAccountStatus}
          botType={botType}
        />
      </CardContent>
    </Card>
  );
};

export default UserAccountsTabContent;
