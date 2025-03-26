
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Account } from '@/types';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { toast } from 'sonner';
import BotAccountsTable from '@/components/bots/BotAccountsTable';

interface AccountsTabContentProps {
  botId: string;
  userId: string;
  botType: 'premium' | 'prop' | 'user';
  title: string;
  description: string;
  accountsData?: Account[];
  isAdmin?: boolean;
  isLoading?: boolean; // Add this property to fix the error
}

const AccountsTabContent: React.FC<AccountsTabContentProps> = ({
  botId,
  userId,
  botType,
  title,
  description,
  accountsData,
  isAdmin = false,
  isLoading = false // Add default value
}) => {
  const { 
    accounts, 
    loading, 
    handleRefresh,
    updateAccount,
    deleteAccount,
    toggleAccountStatus
  } = useBotAccounts(botId, userId, accountsData);

  // Use the loading state from either the prop or the hook
  const isDataLoading = isLoading || loading;

  // Prepare export data for the accounts
  const accountsExportData = accounts.map(account => [
    account.cspAccountName || '',
    account.cspUserEmail || '',
    account.apiName || '',
    account.tradingAccountType || '',
    account.status || '',
    account.tradingAccountBalance || ''
  ]);

  const accountsExportHeaders = [
    'Tên tài khoản',
    'Email',
    'API',
    'Loại tài khoản',
    'Trạng thái',
    'Số dư'
  ];

  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
    updateAccount(account);
  };

  const handleDeleteAccount = (accountId: string) => {
    console.log("Delete account:", accountId);
    deleteAccount(accountId);
  };

  const handleToggleConnection = (accountId: string) => {
    console.log("Toggle connection:", accountId);
    toggleAccountStatus(accountId);
  };

  // Use HierarchicalAccountsTable for admin routes and BotAccountsTable for user routes
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isAdmin ? (
          <>
            <div className="flex justify-end mb-4">
              <ExportDataDropdown 
                data={accountsExportData}
                headers={accountsExportHeaders}
                fileName={`${botType}-bot-${botId}-accounts`}
              />
            </div>
            <HierarchicalAccountsTable 
              accounts={accounts}
              onRefresh={handleRefresh}
              onEdit={handleEditAccount}
              onDelete={handleDeleteAccount}
              onToggleConnection={handleToggleConnection}
            />
          </>
        ) : (
          <BotAccountsTable 
            botId={botId} 
            userId={userId} 
            initialData={accounts}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AccountsTabContent;
