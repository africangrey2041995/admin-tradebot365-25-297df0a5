
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import { Account } from '@/types';
import AccountsHeader from './components/AccountsHeader';
import AddAccountDialog from './AddAccountDialog';

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
  accountsData,
  isLoading = false
}) => {
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  
  const handleRefresh = () => {
    console.log('Refreshing accounts for bot:', botId);
    // Here you would typically trigger a data refresh
  };

  const handleAddAccount = (accountData: any) => {
    console.log('Adding account to bot:', botId, accountData);
    // Here you would handle the account addition logic
    setIsAddAccountDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="px-6 pt-6 pb-0">
          <AccountsHeader 
            onAddAccount={() => setIsAddAccountDialogOpen(true)} 
            onRefresh={handleRefresh} 
          />
        </CardHeader>
        <CardContent className="p-6">
          <BotAccountsTable 
            botId={botId} 
            userId={userId} 
            initialData={accountsData}
            botType={botType}
          />
        </CardContent>
      </Card>
      
      <AddAccountDialog 
        open={isAddAccountDialogOpen}
        onOpenChange={setIsAddAccountDialogOpen}
        botId={botId}
        onAddAccount={handleAddAccount}
        botType={botType}
      />
    </>
  );
};

export default UserAccountsTabContent;
