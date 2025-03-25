
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, MoreVertical } from 'lucide-react';
import AccountsTable from './accounts/AccountsTable';
import LoadingAccounts from './accounts/LoadingAccounts';
import EmptyAccountsState from './accounts/EmptyAccountsState';
import ErrorState from './accounts/ErrorState';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import { Account } from '@/types';
import AccountManagementDialog from './accounts/AccountManagementDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';

interface BotAccountsTableProps {
  botId: string;
  userId: string;
  initialData?: any[];
  refreshTrigger?: boolean;
  botType?: 'premium' | 'prop' | 'user';
  showAddAccount?: boolean;
}

const BotAccountsTable = ({ 
  botId, 
  userId, 
  initialData = [], 
  refreshTrigger = false,
  botType = 'user',
  showAddAccount = true
}: BotAccountsTableProps) => {
  const { 
    accounts, 
    loading, 
    error, 
    fetchAccounts, 
    handleRefresh,
    setAccounts 
  } = useBotAccounts(botId, userId, initialData);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (refreshTrigger) {
      console.log('BotAccountsTable - Refresh triggered from parent');
      fetchAccounts();
    }
  }, [refreshTrigger, fetchAccounts]);

  const handleAddAccount = () => {
    setSelectedAccount(null);
    setIsAddDialogOpen(true);
  };

  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
    setIsEditDialogOpen(true);
  };

  const handleToggleAccountStatus = (account: Account) => {
    const newStatus = account.status === 'Connected' ? 'Disconnected' : 'Connected';
    const updatedAccount = { ...account, status: newStatus };
    
    // Update the account in the accounts array
    const updatedAccounts = accounts.map(acc => 
      acc.cspAccountId === account.cspAccountId ? updatedAccount : acc
    );
    
    setAccounts(updatedAccounts);
    toast.success(`Tài khoản đã được ${newStatus === 'Connected' ? 'kết nối' : 'ngắt kết nối'}`);
  };

  const handleDeleteAccount = (account: Account) => {
    // Filter out the account to delete
    const updatedAccounts = accounts.filter(acc => 
      acc.cspAccountId !== account.cspAccountId
    );
    
    setAccounts(updatedAccounts);
    toast.success("Tài khoản đã được xóa");
  };

  const handleAddSubmit = (formData: any) => {
    // Add the new account to the accounts array
    setAccounts([...accounts, formData]);
  };

  const handleEditSubmit = (formData: any) => {
    // Update the account in the accounts array
    const updatedAccounts = accounts.map(acc => 
      acc.cspAccountId === formData.cspAccountId ? formData : acc
    );
    
    setAccounts(updatedAccounts);
  };

  // Prepare account data for export
  const prepareAccountsForExport = () => {
    return accounts.map(account => ({
      'Tên tài khoản': account.cspAccountName,
      'Email': account.cspUserEmail,
      'API': account.apiName,
      'Loại tài khoản': `${account.tradingAccountType} - ${account.isLive ? 'Live' : 'Demo'}`,
      'Trạng thái': account.status,
      'Số dư': account.tradingAccountBalance
    }));
  };

  const accountsExportHeaders = [
    'Tên tài khoản', 'Email', 'API', 'Loại tài khoản', 'Trạng thái', 'Số dư'
  ];

  if (loading) {
    return <LoadingAccounts message="Đang tải tài khoản..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} />;
  }

  if (!accounts || accounts.length === 0) {
    return (
      <>
        <EmptyAccountsState onRefresh={handleRefresh} botType={botType} onAddAccount={handleAddAccount} />
        
        <AccountManagementDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddSubmit}
          mode="add"
        />
      </>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          {showAddAccount && (
            <Button variant="outline" size="sm" onClick={handleAddAccount}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm tài khoản
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        </div>
        
        <ExportDataDropdown 
          data={prepareAccountsForExport()}
          headers={accountsExportHeaders}
          fileName={`bot-${botId}-accounts`}
        />
      </div>
      
      <AccountsTable 
        accounts={accounts} 
        onEdit={handleEditAccount}
        onDelete={handleDeleteAccount}
        onToggleStatus={handleToggleAccountStatus}
      />

      <AccountManagementDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddSubmit}
        mode="add"
      />
      
      <AccountManagementDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        account={selectedAccount}
        onSubmit={handleEditSubmit}
        mode="edit"
      />
    </div>
  );
};

export default BotAccountsTable;
