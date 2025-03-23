
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import { Account } from '@/types';
import EmptyAccountsState from '@/components/bots/accounts/EmptyAccountsState';
import LoadingAccounts from '@/components/bots/accounts/LoadingAccounts';
import TabHeader from './TabHeader';
import { getCardClassName, getCardHeaderClassName } from './TabStyles';

interface AccountsTabContentProps {
  botId: string;
  userId: string;
  botType: 'premium' | 'prop' | 'user';
  accountsData?: Account[];
  isLoading: boolean;
  title: string;
  description: string;
}

const AccountsTabContent: React.FC<AccountsTabContentProps> = ({
  botId,
  userId,
  botType,
  accountsData,
  isLoading,
  title,
  description
}) => {
  return (
    <Card className={getCardClassName(botType)}>
      <CardHeader className={getCardHeaderClassName(botType)}>
        <TabHeader title={title} description={description} botType={botType} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingAccounts message={`Đang tải tài khoản cho ${botType === 'premium' ? 'Premium Bot' : botType === 'prop' ? 'Prop Trading Bot' : 'bot'}...`} />
        ) : !accountsData || accountsData.length === 0 ? (
          <EmptyAccountsState botType={botType} />
        ) : (
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
