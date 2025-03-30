
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { Account } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCw, UserPlus, Link, Link2Off } from 'lucide-react';
import BulkActionBar from '@/components/floating/BulkActionBar';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import { toast } from 'sonner';

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

  // State for bulk selection
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'connect' | 'disconnect' | null>(null);

  // Bulk action handlers
  const clearSelectedAccounts = () => {
    setSelectedAccounts([]);
  };

  const openConfirmDialog = (action: 'connect' | 'disconnect') => {
    setConfirmAction(action);
    setIsConfirmDialogOpen(true);
  };

  const handleBulkAction = () => {
    if (!confirmAction) return;
    
    setIsBulkProcessing(true);
    
    // Xử lý hàng loạt tài khoản
    const processAccounts = async () => {
      for (const accountId of selectedAccounts) {
        await new Promise(resolve => setTimeout(resolve, 300)); // Giả lập thời gian xử lý
        onToggleConnection(accountId);
      }
      
      setIsBulkProcessing(false);
      setSelectedAccounts([]);
      
      const actionText = confirmAction === 'connect' ? 'kết nối' : 'ngắt kết nối';
      toast.success(`Đã ${actionText} ${selectedAccounts.length} tài khoản thành công`);
      
      setIsConfirmDialogOpen(false);
      setConfirmAction(null);
    };
    
    processAccounts();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <CardTitle>Tài Khoản Kết Nối</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-gray-600 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm mới
            </Button>
            <ExportDataDropdown 
              data={accountsExportData} 
              headers={accountsExportHeaders} 
              fileName={`premium-bot-${botId}-accounts`} 
            />
          </div>
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
          selectedAccounts={selectedAccounts}
          onToggleSelect={(accountId) => {
            setSelectedAccounts(prev => 
              prev.includes(accountId) 
                ? prev.filter(id => id !== accountId) 
                : [...prev, accountId]
            );
          }}
        />

        {/* Bulk Action Bar */}
        <BulkActionBar
          selectedCount={selectedAccounts.length}
          onClose={clearSelectedAccounts}
          onConnectAll={() => openConfirmDialog('connect')}
          onDisconnectAll={() => openConfirmDialog('disconnect')}
          isProcessing={isBulkProcessing}
        />

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
          title={confirmAction === 'connect' ? 'Kết nối tất cả tài khoản' : 'Ngắt kết nối tất cả tài khoản'}
          description={`Bạn có chắc chắn muốn ${confirmAction === 'connect' ? 'kết nối' : 'ngắt kết nối'} ${selectedAccounts.length} tài khoản đã chọn?`}
          confirmText={confirmAction === 'connect' ? 'Kết nối tất cả' : 'Ngắt kết nối tất cả'}
          onConfirm={handleBulkAction}
          isProcessing={isBulkProcessing}
          variant={confirmAction === 'connect' ? 'info' : 'warning'}
        />
      </CardContent>
    </Card>
  );
};

export default AccountsTab;
