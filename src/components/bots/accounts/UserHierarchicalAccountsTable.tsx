
import React, { useState, useMemo } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { Account } from '@/types';
import { toast } from 'sonner';
import EmptyAccountsState from './EmptyAccountsState';
import LoadingAccounts from './LoadingAccounts';
import ErrorState from './ErrorState';
import AccountsFilter from './AccountsFilter';
import { organizeAccounts } from './utils/accountTransformUtils';
import { useAccountFiltering } from './hooks/useAccountFiltering';
import CSPAccountCard from './components/CSPAccountCard';
import { Checkbox } from '@/components/ui/checkbox';
import BulkActionBar from '@/components/floating/BulkActionBar';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';

interface UserHierarchicalAccountsTableProps {
  accounts: Account[];
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
  onAddAccount?: (account: Account) => void;
  onEditAccount?: (account: Account) => void;
  onDeleteAccount?: (accountId: string) => void;
  onToggleStatus?: (accountId: string) => void;
  botType?: 'premium' | 'prop' | 'user';
}

const UserHierarchicalAccountsTable: React.FC<UserHierarchicalAccountsTableProps> = ({
  accounts,
  isLoading,
  error,
  onRefresh,
  onAddAccount,
  onEditAccount,
  onDeleteAccount,
  onToggleStatus,
  botType = 'user'
}) => {
  // Transform flat accounts list into hierarchical structure
  const organizedAccounts = useMemo(() => organizeAccounts(accounts), [accounts]);
  
  // Filter accounts based on user input
  const { filteredAccounts, handleFilterChange } = useAccountFiltering(organizedAccounts);
  
  // Calculate total number of trading accounts
  const totalTradingAccounts = useMemo(() => accounts.length, [accounts]);

  // State for bulk selection
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  
  // Confirmation dialog states
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'connect' | 'disconnect' | null>(null);

  // Handle edit, delete, and toggle status actions
  const handleEdit = (account: Account) => {
    if (onEditAccount) {
      onEditAccount(account);
    } else {
      toast.info("Chức năng chỉnh sửa sẽ được triển khai");
    }
  };

  const handleDelete = (accountId: string) => {
    if (onDeleteAccount) {
      onDeleteAccount(accountId);
    } else {
      toast.info(`Xóa tài khoản ${accountId} sẽ được triển khai`);
    }
  };

  const handleToggleStatus = (accountId: string) => {
    if (onToggleStatus) {
      onToggleStatus(accountId);
    } else {
      toast.info(`Chuyển đổi kết nối cho ${accountId} sẽ được triển khai`);
    }
  };

  // Create a wrapper function that doesn't need an argument
  const handleAddAccount = () => {
    toast.info("Mở hộp thoại thêm tài khoản");
  };

  // Bulk actions
  const toggleSelectAccount = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId) 
        : [...prev, accountId]
    );
  };

  const clearSelectedAccounts = () => {
    setSelectedAccounts([]);
  };

  const openConfirmDialog = (action: 'connect' | 'disconnect') => {
    setConfirmAction(action);
    setIsConfirmDialogOpen(true);
  };

  const handleBulkAction = () => {
    if (!confirmAction || !onToggleStatus) return;
    
    setIsBulkProcessing(true);
    
    // Giả lập thời gian xử lý mạng
    const processAccounts = async () => {
      for (const accountId of selectedAccounts) {
        await new Promise(resolve => setTimeout(resolve, 300)); // Giả lập thời gian xử lý mỗi tài khoản
        onToggleStatus(accountId);
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

  // Render appropriate UI based on loading/error state
  if (isLoading) {
    return <LoadingAccounts message="Đang tải tài khoản..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRefresh} />;
  }

  if (!accounts || accounts.length === 0) {
    return (
      <EmptyAccountsState 
        onRefresh={onRefresh} 
        botType={botType} 
        onAddAccount={handleAddAccount} 
      />
    );
  }

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center">
        <AccountsFilter 
          onFilterChange={handleFilterChange}
          totalAccounts={totalTradingAccounts}
        />
        {selectedAccounts.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Đã chọn {selectedAccounts.length} tài khoản
            </span>
          </div>
        )}
      </div>

      <Accordion type="multiple" className="w-full space-y-2">
        {filteredAccounts.map((cspAccount) => (
          <CSPAccountCard
            key={cspAccount.cspAccountId}
            cspAccount={cspAccount}
            accounts={accounts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            selectedAccounts={selectedAccounts}
            onToggleSelect={toggleSelectAccount}
          />
        ))}
      </Accordion>

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
    </div>
  );
};

export default UserHierarchicalAccountsTable;
