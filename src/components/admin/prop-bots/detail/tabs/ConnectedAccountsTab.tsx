
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Account } from '@/types';
import ExportDataDropdown from '../ExportDataDropdown';
import HierarchicalAccountsTable from '../components/HierarchicalAccountsTable';

interface ConnectedAccountsTabProps {
  connectedAccounts: Account[];
  onRefresh: () => void;
  botId: string;
}

const ConnectedAccountsTab: React.FC<ConnectedAccountsTabProps> = ({
  connectedAccounts,
  onRefresh,
  botId
}) => {
  // Handler for account actions
  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
    // In a real implementation, this would open an edit dialog
  };

  const handleDeleteAccount = (accountId: string) => {
    console.log("Delete account:", accountId);
    // In a real implementation, this would show a confirmation dialog
  };

  const handleToggleConnection = (accountId: string) => {
    console.log("Toggle connection:", accountId);
    // In a real implementation, this would make an API call
  };

  // Headers for export
  const accountsExportHeaders = ['Tên tài khoản', 'Email', 'API', 'Loại tài khoản', 'Trạng thái', 'Số dư'];
  
  // Prepare export data for accounts
  const accountsExportData = connectedAccounts.map(account => [
    account.cspAccountName || '',
    account.cspUserEmail || '',
    account.apiName || '',
    account.tradingAccountType || '',
    account.status || '',
    account.tradingAccountBalance || ''
  ]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-end mb-4">
          <ExportDataDropdown 
            data={accountsExportData}
            headers={accountsExportHeaders}
            fileName={`prop-bot-${botId}-accounts`}
          />
        </div>
        {connectedAccounts && connectedAccounts.length > 0 ? (
          <HierarchicalAccountsTable 
            accounts={connectedAccounts}
            onRefresh={onRefresh}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
            onToggleConnection={handleToggleConnection}
          />
        ) : (
          <div className="text-center py-10 text-gray-500">
            No connected accounts found for this bot.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectedAccountsTab;
