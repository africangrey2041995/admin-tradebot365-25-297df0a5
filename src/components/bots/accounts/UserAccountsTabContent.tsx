
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TabHeader from '../details/tabs/TabHeader';
import { getCardClassName, getCardHeaderClassName } from '../details/tabs/TabStyles';
import { Account } from '@/types';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import UserHierarchicalAccountsTable from './UserHierarchicalAccountsTable';
import { UserBotAccountDialog } from './dialogs';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

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
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);

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

  const handleAddAccount = (formData: any) => {
    console.log('Adding account:', formData);
    addAccount({
      cspAccountId: `acc-${Date.now()}`, // Generate a temporary ID
      ...formData
    } as Account);
    setIsAddAccountDialogOpen(false);
  };

  return (
    <Card className={getCardClassName(botType)}>
      <CardHeader className={getCardHeaderClassName(botType)}>
        <div className="flex justify-between items-center w-full">
          <TabHeader title={title} description={description} botType={botType} />
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            onClick={() => setIsAddAccountDialogOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            <span>Thêm Tài Khoản</span>
          </Button>
        </div>
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

        <UserBotAccountDialog
          open={isAddAccountDialogOpen}
          onOpenChange={setIsAddAccountDialogOpen}
          botId={botId}
          onAddAccount={handleAddAccount}
        />
      </CardContent>
    </Card>
  );
};

export default UserAccountsTabContent;
