
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TabHeader from './TabHeader';
import { getCardClassName, getCardHeaderClassName } from './TabStyles';
import { Account } from '@/types';

interface AccountsTabContentProps {
  botId: string;
  userId: string;
  botType: 'premium' | 'prop' | 'user';
  title: string;
  description: string;
  accountsData?: Account[];
}

const AccountsTabContent: React.FC<AccountsTabContentProps> = ({
  botId,
  userId,
  botType,
  title,
  description,
  accountsData
}) => {
  return (
    <Card className={getCardClassName(botType)}>
      <CardHeader className={getCardHeaderClassName(botType)}>
        <TabHeader title={title} description={description} botType={botType} />
      </CardHeader>
      <CardContent>
        <BotAccountsTable 
          botId={botId} 
          userId={userId} 
          initialData={accountsData}
          botType={botType}
        />
      </CardContent>
    </Card>
  );
};

export default AccountsTabContent;
