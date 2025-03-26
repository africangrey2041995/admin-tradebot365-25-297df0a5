
import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { Account } from '@/types';

interface AccountsTabProps {
  accounts: Account[];
  botId: string | undefined;
  onRefresh: () => void;
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
}

const AccountsTab: React.FC<AccountsTabProps> = ({
  accounts,
  botId,
  onRefresh,
  onEdit,
  onDelete,
  onToggleConnection
}) => {
  // Export data headers
  const accountsExportHeaders = ['Tên tài khoản', 'Email', 'API', 'Loại tài khoản', 'Trạng thái', 'Số dư'];

  // Memoized accounts export data
  const accountsExportData = React.useMemo(() => {
    return accounts.map(account => [
      account.cspAccountName || '', 
      account.cspUserEmail || '', 
      account.apiName || '', 
      account.tradingAccountType || '', 
      account.status || '', 
      account.tradingAccountBalance || ''
    ]);
  }, [accounts]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <CardTitle>Tài Khoản Kết Nối</CardTitle>
          <ExportDataDropdown 
            data={accountsExportData} 
            headers={accountsExportHeaders} 
            fileName={`premium-bot-${botId}-accounts`} 
          />
        </div>
        <CardDescription className="mb-6">
          Quản lý tài khoản người dùng được kết nối với Premium Bot
        </CardDescription>
        
        <HierarchicalAccountsTable 
          accounts={accounts} 
          onRefresh={onRefresh} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onToggleConnection={onToggleConnection} 
        />
      </CardContent>
    </Card>
  );
};

export default AccountsTab;
