
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TabHeader from './TabHeader';
import { getCardClassName, getCardHeaderClassName } from './TabStyles';
import BotAccountsTable from '@/components/bots/BotAccountsTable';

interface AccountsTabContentProps {
  botId: string;
  userId: string;
  botType: 'premium' | 'prop' | 'user';
  title: string;
}

const AccountsTabContent: React.FC<AccountsTabContentProps> = ({
  botId,
  userId,
  botType,
  title
}) => {
  return (
    <Card className={getCardClassName(botType)}>
      <CardHeader className={getCardHeaderClassName(botType)}>
        <TabHeader title={title} botType={botType} />
      </CardHeader>
      <CardContent>
        <BotAccountsTable 
          botId={botId} 
          userId={userId} 
          showAddButton={false} 
        />
      </CardContent>
    </Card>
  );
};

export default AccountsTabContent;
